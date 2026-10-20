/**
 * Client-side media compression and IndexedDB storage utility.
 * Supports high-resolution photos and video clips (MP4, WebM, MOV)
 * without hitting localStorage's strict ~5MB quota limit.
 */

const DB_NAME = 'DashainPhotoStore_v2';
const STORE_NAME = 'custom_media';
const OLD_STORE_NAME = 'custom_photos';

export interface CustomMediaItem {
  id: string;
  url: string;
  isVideo: boolean;
  mimeType?: string;
  name?: string;
  blob?: Blob;
}

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(OLD_STORE_NAME)) {
        db.createObjectStore(OLD_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get all custom media (photos & videos) from IndexedDB
export async function getAllCustomMedia(): Promise<Record<string, { url: string; isVideo: boolean }>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records: CustomMediaItem[] = request.result || [];
        const map: Record<string, { url: string; isVideo: boolean }> = {};

        for (const item of records) {
          if (item.blob) {
            try {
              const blobUrl = URL.createObjectURL(item.blob);
              map[item.id] = { url: blobUrl, isVideo: !!item.isVideo };
            } catch {
              map[item.id] = { url: item.url, isVideo: !!item.isVideo };
            }
          } else {
            map[item.id] = { url: item.url, isVideo: !!item.isVideo };
          }
        }
        resolve(map);
      };

      request.onerror = () => {
        resolve({});
      };
    });
  } catch {
    // Fallback to safe localStorage
    const fallback = getSafeLocalStorageJSON<Record<string, { url: string; isVideo: boolean }>>(
      'dashain_custom_media_fallback_v2',
      {}
    );
    return fallback;
  }
}

// Backward compatible helper returning url map
export async function getAllCustomPhotos(): Promise<Record<string, string>> {
  const media = await getAllCustomMedia();
  const map: Record<string, string> = {};
  for (const [id, item] of Object.entries(media)) {
    map[id] = item.url;
  }
  return map;
}

// Save a custom media item into IndexedDB (supports photos and videos)
export async function saveCustomMedia(
  id: string,
  url: string,
  isVideo: boolean,
  blob?: Blob
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record: CustomMediaItem = {
        id,
        url: blob ? '' : url, // if blob is saved, avoid storing huge duplicate strings
        isVideo,
        blob: blob || undefined,
      };
      const request = store.put(record);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Fallback: save to localStorage with quota-safe wrapper (only if string under 1MB)
    if (url && url.length < 1000000) {
      const current = getSafeLocalStorageJSON<Record<string, { url: string; isVideo: boolean }>>(
        'dashain_custom_media_fallback_v2',
        {}
      );
      current[id] = { url, isVideo };
      safeSetLocalStorage('dashain_custom_media_fallback_v2', JSON.stringify(current));
    }
  }
}

// Backward compatible saveCustomPhoto
export async function saveCustomPhoto(id: string, url: string, isVideo = false, blob?: Blob): Promise<void> {
  return saveCustomMedia(id, url, isVideo, blob);
}

// Delete custom media from IndexedDB
export async function deleteCustomMedia(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    const current = getSafeLocalStorageJSON<Record<string, { url: string; isVideo: boolean }>>(
      'dashain_custom_media_fallback_v2',
      {}
    );
    delete current[id];
    safeSetLocalStorage('dashain_custom_media_fallback_v2', JSON.stringify(current));
  }
}

export async function deleteCustomPhoto(id: string): Promise<void> {
  return deleteCustomMedia(id);
}

/**
 * Processes an uploaded File (Photo or Video).
 * - For images: Compresses to optimized JPEG (~100KB) to ensure crisp rendering without lag.
 * - For videos: Generates instant streaming ObjectURL and preserves Blob for IndexedDB.
 */
export async function processMediaFile(file: File): Promise<{
  url: string;
  isVideo: boolean;
  blob: Blob;
  name: string;
}> {
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);

  if (isVideo) {
    const objectUrl = URL.createObjectURL(file);
    return {
      url: objectUrl,
      isVideo: true,
      blob: file,
      name: file.name,
    };
  } else {
    const compressedUrl = await compressImage(file, 1200, 0.78);
    return {
      url: compressedUrl,
      isVideo: false,
      blob: file,
      name: file.name,
    };
  }
}

/**
 * Compresses an image File or Base64 data URL to an optimized JPEG.
 */
export function compressImage(
  fileOrBase64: File | Blob | string,
  maxWidth = 1200,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxWidth) {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        if (typeof fileOrBase64 === 'string') {
          return resolve(fileOrBase64);
        }
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(fileOrBase64 as Blob);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      if (typeof fileOrBase64 === 'string') {
        return resolve(fileOrBase64);
      }
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(fileOrBase64 as Blob);
    };

    if (typeof fileOrBase64 === 'string') {
      img.src = fileOrBase64;
    } else {
      img.src = URL.createObjectURL(fileOrBase64);
    }
  });
}

/**
 * Safe localStorage setter that never crashes with QuotaExceededError.
 */
export function safeSetLocalStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`[safeSetLocalStorage] QuotaExceededError for key "${key}". Cleaning up obsolete caches...`, e);
    try {
      localStorage.removeItem('dashain_custom_memory_photos_v2');
      localStorage.removeItem('dashain_couple_memories_sushil_sanju_v4');
      localStorage.removeItem('dashain_couple_memories_sushil_sanju_v5');
      localStorage.removeItem('dashain_extra_custom_memories_v2');
      localStorage.removeItem('dashain_custom_memory_photos_fallback');
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Safe localStorage JSON getter.
 */
export function getSafeLocalStorageJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
