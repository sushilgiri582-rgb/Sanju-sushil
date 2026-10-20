import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TikaCeremony } from './components/TikaCeremony';
import { DistanceTracker } from './components/DistanceTracker';
import { StoryTimeline } from './components/StoryTimeline';
import { LoveLetterBox } from './components/LoveLetterBox';
import { MemoryGallery } from './components/MemoryGallery';
import { DiyaAltarAndDakshina } from './components/DiyaAltarAndDakshina';
import { Footer } from './components/Footer';
import { MarigoldCanvas } from './components/MarigoldCanvas';
import { festiveAudio } from './utils/audio';
import { Language } from './translations';
import { Sparkles } from 'lucide-react';
import {
  getAllCustomMedia,
  saveCustomMedia,
  deleteCustomMedia,
  safeSetLocalStorage
} from './utils/imageStorage';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('dashain_selected_language');
      return (saved === 'en' || saved === 'ne') ? saved : 'ne';
    } catch {
      return 'ne';
    }
  });

  const [burstTrigger, setBurstTrigger] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Central Custom Photos and Videos State: slotId -> URL/Blob URL
  // Uses IndexedDB to prevent QuotaExceededError
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [customMediaTypes, setCustomMediaTypes] = useState<Record<string, boolean>>({});

  // Initialize and load custom media from IndexedDB & cleanup any old oversized keys
  useEffect(() => {
    // Cleanup any oversized keys in localStorage that previously threw QuotaExceededError
    try {
      localStorage.removeItem('dashain_custom_memory_photos_v2');
      localStorage.removeItem('dashain_couple_memories_sushil_sanju_v4');
      localStorage.removeItem('dashain_couple_memories_sushil_sanju_v5');
      localStorage.removeItem('dashain_extra_custom_memories_v2');
      localStorage.removeItem('dashain_custom_memory_photos_fallback');
    } catch {
      // ignore
    }

    // Load from IndexedDB
    getAllCustomMedia().then((mediaMap) => {
      const photos: Record<string, string> = {};
      const types: Record<string, boolean> = {};
      for (const [id, item] of Object.entries(mediaMap)) {
        photos[id] = item.url;
        types[id] = !!item.isVideo;
      }
      setCustomPhotos(photos);
      setCustomMediaTypes(types);
    }).catch(() => {});
  }, []);

  // Sync language selection safely
  useEffect(() => {
    safeSetLocalStorage('dashain_selected_language', lang);
  }, [lang]);

  const handleUpdatePhoto = (slotId: string, mediaUrl: string, isVideo = false, blob?: Blob) => {
    // 1. Update in-memory state immediately for instant responsive UI
    setCustomPhotos((prev) => ({ ...prev, [slotId]: mediaUrl }));
    setCustomMediaTypes((prev) => ({ ...prev, [slotId]: isVideo }));

    // 2. Persist to IndexedDB (asynchronously with unlimited storage)
    saveCustomMedia(slotId, mediaUrl, isVideo, blob).catch((err) => {
      console.warn('Failed to save to IndexedDB:', err);
    });

    festiveAudio.playSparkleChime();
  };

  const handleResetPhoto = (slotId: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setCustomMediaTypes((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });

    deleteCustomMedia(slotId).catch(() => {});
    festiveAudio.playSparkleChime();
  };

  const handleStartTika = () => {
    const el = document.getElementById('tika-ceremony');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBlessingCelebrated = () => {
    setBurstTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#120306] text-amber-50 selection:bg-amber-500 selection:text-red-950 flex flex-col relative overflow-x-hidden font-sans">
      {/* Ambient floating marigold petals & diya sparks canvas */}
      <MarigoldCanvas burstTrigger={burstTrigger} />

      {/* Top Bar Header with Language Switcher & Music Toggle */}
      <Header
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-grow z-10">
        {/* Hero Section with Dual Clocks (Sindhupalchok <-> Vermillion, SD) */}
        <HeroSection
          onStartTika={handleStartTika}
          lang={lang}
        />

        {/* Feature 3: Interactive Virtual Tika & Blessing Screen */}
        <TikaCeremony
          lang={lang}
          onBlessingCelebrated={handleBlessingCelebrated}
        />

        {/* Feature 2: Location & Distance Widget (Sindhupalchok <-> Vermillion, SD) */}
        <DistanceTracker
          lang={lang}
        />

        {/* Feature 4: Our Real Memory & Story Timeline with Per-Slot Upload/Change Photo & Video */}
        <StoryTimeline
          lang={lang}
          customPhotos={customPhotos}
          customMediaTypes={customMediaTypes}
          onUpdatePhoto={handleUpdatePhoto}
          onResetPhoto={handleResetPhoto}
        />

        {/* Feature 6: Digital Love Letter / Farewell Letter Box */}
        <LoveLetterBox
          lang={lang}
        />

        {/* Feature 5: Google Drive Photo & Video Gallery Grid with Per-Slot Upload/Change */}
        <MemoryGallery
          lang={lang}
          customPhotos={customPhotos}
          customMediaTypes={customMediaTypes}
          onUpdatePhoto={handleUpdatePhoto}
          onResetPhoto={handleResetPhoto}
        />

        {/* Diya Altar & Digital Dakshina */}
        <DiyaAltarAndDakshina
          lang={lang}
        />
      </main>

      {/* Floating Quick Shower Petals Button for interactive play */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => {
            setBurstTrigger((prev) => prev + 1);
            festiveAudio.playSparkleChime();
          }}
          className="group flex items-center gap-2 rounded-full border border-amber-600/70 bg-gradient-to-r from-red-800 to-amber-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl shadow-red-950 hover:brightness-110 active:scale-95 transition-all"
          title="Shower Sayapatri petals"
        >
          <Sparkles className="h-4 w-4 text-amber-200 group-hover:rotate-45 transition-transform" />
          <span>{lang === 'ne' ? 'सयपत्री फूल बर्साउनुहोस्' : 'Shower Sayapatri'}</span>
        </button>
      </div>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
