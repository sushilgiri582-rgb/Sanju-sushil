import React, { useState, useRef } from 'react';
import {
  Camera,
  Plus,
  Heart,
  MapPin,
  Calendar,
  X,
  Upload,
  Link2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  FolderUp,
  RotateCcw,
  Check,
  Video as VideoIcon,
  Image as ImageIcon
} from 'lucide-react';
import { Language, translations } from '../translations';
import { festiveAudio } from '../utils/audio';
import {
  processMediaFile,
  safeSetLocalStorage,
  getSafeLocalStorageJSON
} from '../utils/imageStorage';

export interface CoupleMemory {
  id: string;
  slotId?: string; // Links to timeline slot (e.g. thimi, dakshinkali, suryabinayak, etc.)
  titleNe: string;
  titleEn: string;
  dateNe: string;
  dateEn: string;
  locationNe: string;
  locationEn: string;
  captionNe: string;
  captionEn: string;
  defaultImageUrl: string;
  isVideo?: boolean;
  isCustom?: boolean;
}

interface MemoryGalleryProps {
  lang: Language;
  customPhotos: Record<string, string>;
  customMediaTypes?: Record<string, boolean>;
  onUpdatePhoto: (slotId: string, photoUrl: string, isVideo?: boolean, blob?: Blob) => void;
  onResetPhoto: (slotId: string) => void;
}

// Utility to convert Google Drive shareable link to direct thumbnail URL
export const formatGoogleDriveUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();

  // Pattern: drive.google.com/file/d/ID/...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`;
  }

  // Pattern: drive.google.com/open?id=ID or id=ID
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
  }

  return trimmed;
};

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  lang,
  customPhotos,
  customMediaTypes,
  onUpdatePhoto,
  onResetPhoto,
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const surpriseVideoInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slotInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [batchNotice, setBatchNotice] = useState<string>('');

  const defaultMemories: CoupleMemory[] = [
    {
      id: 'm1',
      slotId: 'thimi',
      titleNe: 'पहिलो चिया भेट (थिमि, भक्तपुर)',
      titleEn: 'First Tea Meetup at Thimi',
      dateNe: 'शुरुवाती मिठा दिनहरू',
      dateEn: 'The Humble Beginning',
      locationNe: 'थिमि, भक्तपुर',
      locationEn: 'Thimi, Bhaktapur',
      captionNe: 'नबोली नबोली चियाको कप समातेको त्यो क्षण, जहाँबाट हाम्रो जिन्दगीको कथा सुरु भयो।',
      captionEn: 'Nervous glances and warm steaming tea at Thimi where our beautiful journey quietly began.',
      defaultImageUrl: '/assets/aistudio/IMG_0899_d2f27d0c.jpeg',
    },
    {
      id: 'm2',
      slotId: 'dakshinkali',
      titleNe: 'दक्षिणाकाली मन्दिरको दर्शन र हात समातेको क्षण',
      titleEn: 'Dakshinkali Trip (Consent & Holding Hands)',
      dateNe: 'पारिवारिक सहमतिपछि',
      dateEn: 'Parental Blessings',
      locationNe: 'दक्षिणाकाली मन्दिर, फर्पिङ',
      locationEn: 'Dakshinkali Temple, Pharping',
      captionNe: 'सञ्जुका आमाबुवासँग अनुमति लिएर दक्षिणाकाली जाँदा बाटोभरि मायाले हात समातेको त्यो पवित्र दिन।',
      captionEn: 'Taking the temple journey with her parents’ permission, holding hands along the stone steps.',
      defaultImageUrl: '/assets/aistudio/IMG_2701_cfbc95f5.jpeg',
    },
    {
      id: 'm3',
      slotId: 'suryabinayak',
      titleNe: 'सूर्यविनायक मन्दिरमा सँगै दियो प्रज्वलन',
      titleEn: 'Lighting Holy Diyas at Suryabinayak Temple',
      dateNe: 'पवित्र साँझ',
      dateEn: 'Sacred Flames',
      locationNe: 'सूर्यविनायक मन्दिर, भक्तपुर',
      locationEn: 'Suryabinayak Temple, Bhaktapur',
      captionNe: 'सूर्यविनायक मन्दिरमा सँगै बालेका दियोहरू, जहाँ हामीले एकअर्काको सफलता र सुखको कामना गरेका थियौँ।',
      captionEn: 'Lighting traditional clay oil lamps side by side, making silent wishes for eternal love.',
      defaultImageUrl: '/assets/aistudio/IMG_4168_ad0d4fd7.jpeg',
    },
    {
      id: 'm4',
      slotId: 'monkey_temple',
      titleNe: 'मङ्की टेम्पल रिसोर्ट (कलंकी) को रोमान्टिक साँझ',
      titleEn: 'Monkey Temple Resort (Kalanki Surprise)',
      dateNe: 'विशेष सरप्राइज',
      dateEn: 'Birthday & Pre-Flight Surprise',
      locationNe: 'मङ्की टेम्पल रिसोर्ट, कलंकी',
      locationEn: 'Monkey Temple Resort, Kalanki',
      captionNe: 'सञ्जुको आउँदो जन्मदिन र अमेरिकाको उडानअघि सुशीलले कलंकीमाथिको रिसोर्टमा दिएको अविस्मरणीय सरप्राइज।',
      captionEn: 'Perched high above Kalanki lights, an advance surprise for her birthday and upcoming flight.',
      defaultImageUrl: '/assets/aistudio/IMG_5129_207a3ce3.jpeg',
    },
    {
      id: 'm5',
      slotId: 'gundu',
      titleNe: 'गुण्डुको ‘ट्रिपल-राइडिङ’ र ट्राफिक जरिवाना!',
      titleEn: 'Gundu Triple-Riding & Traffic Police Fine!',
      dateNe: 'हाँसो र एड्भेन्चर',
      dateEn: 'Hilarious Memory',
      locationNe: 'गुण्डु, भक्तपुर',
      locationEn: 'Gundu, Bhaktapur',
      captionNe: 'एउटै बाइकमा सुशील, सञ्जु र साथी तीनजना गुण्डु जाँदा ट्राफिकले समातेर चिट काटेको त्यो हँसाउने दिन!',
      captionEn: 'Three on one motorcycle to Gundu, getting caught and fined by traffic police—and laughing non-stop!',
      defaultImageUrl: '/assets/aistudio/IMG_5143_b6a5e2a5.jpeg',
    },
    {
      id: 'm6',
      slotId: 'nagarkot',
      titleNe: 'नगरकोटको कफी र विदेशी पर्यटकको तस्बिर',
      titleEn: 'Nagarkot Coffee in Glass & Tourist Photo',
      dateNe: 'कुहिरो र उकालो',
      dateEn: 'Misty Hilltop Ride',
      locationNe: 'नगरकोट, भक्तपुर',
      locationEn: 'Nagarkot, Bhaktapur',
      captionNe: 'गिलासको कफी समातेर नगरकोट जाँदा, सञ्जुले विदेशी पर्यटकसँग फरर अङ्ग्रेजी बोलेर खिचाएको सुन्दर तस्बिर।',
      captionEn: 'Carrying coffee in glass cups up the hills, and Sanju speaking fluent English to a foreigner for this photo.',
      defaultImageUrl: '/assets/aistudio/IMG_6241_45246cec.jpeg',
    },
    {
      id: 'm7',
      slotId: 'family_hangout',
      titleNe: 'घरमा ढाँटेर हिँडेको त्यो आत्मीय गोप्य यात्रा',
      titleEn: 'Family-Secret Hangout & Roadtrip',
      dateNe: 'गोप्य यात्रा र साहस',
      dateEn: 'Secret Roadtrip',
      locationNe: 'उपत्यकाका डाँडाहरू',
      locationEn: 'Valley Hilltops',
      captionNe: 'सरप्राइज भिडियोपछि घरमा सानो मायालु बहाना बनाएर सुशीलसँग दिनभर घुम्न निस्किएको त्यो साहसी क्षण।',
      captionEn: 'Sneaking away for a day-long private roadtrip right after the doorstep recharge card surprise.',
      defaultImageUrl: '/assets/aistudio/IMG_2701_cfbc95f5.jpeg',
    },
    {
      id: 'm8',
      slotId: 'picnic',
      titleNe: 'हाम्रो पहिलो कपल पिकनिक (चटपटे र पानीपुरी)',
      titleEn: 'First Couple Picnic (Chatpate & Panipuri)',
      dateNe: 'निजी पिकनिक',
      dateEn: 'Private Picnic',
      locationNe: 'उपत्यकाको शान्त डाँडा',
      locationEn: 'Quiet Hilltop Spot',
      captionNe: 'घरबाटै चटपटे र पानीपुरी प्याक गरी हामी दुईजना मात्रै डाँडामा बसेर रमाएको पहिलो कपल पिकनिक।',
      captionEn: 'Packing homemade chatpate, panipuri, and treats to enjoy exclusively as a couple under open skies.',
      defaultImageUrl: '/assets/aistudio/IMG_6223_792c27d2.jpeg',
    },
    {
      id: 'm9',
      slotId: 'airport_farewell',
      titleNe: 'विमानस्थलको भावुक बिदाइ (TIA)',
      titleEn: 'Kathmandu Airport Emotional Farewell',
      dateNe: 'प्रस्थानको त्यो दिन',
      dateEn: 'Departure Afternoon',
      locationNe: 'त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल',
      locationEn: 'Tribhuvan International Airport',
      captionNe: 'हातमा बिदाइको चिठी थमाएर, रुन नसकी विमानस्थलको बाथरुममा एक्लै गएर रोएको त्यो मौन पीडा।',
      captionEn: 'Handing her the farewell letter and rushing to the airport bathroom to weep alone in silent heartbreak.',
      defaultImageUrl: '/assets/aistudio/IMG_5765_3c1b569e.jpeg',
    },
    {
      id: 'm10',
      slotId: 'healing_bond',
      titleNe: 'साउथ डकोटाको पार्सल र दैनिक भिडियो कल',
      titleEn: 'South Dakota Parcel & Daily Calls',
      dateNe: 'आजको दिन',
      dateEn: 'Present Day',
      locationNe: 'सिन्धुपाल्चोक ➔ भर्मिलियन, साउथ डकोटा',
      locationEn: 'Sindhupalchok ➔ Vermillion, SD',
      captionNe: '१० घण्टा ४५ मिनेटको समय अन्तरलाई जित्दै दैनिक बिहान-साँझ मुस्कुराउने हाम्रा ती प्रिय अनुहारहरू।',
      captionEn: 'Smiling through screens across 10h 45m time difference, waiting eagerly for our forever reunion.',
      defaultImageUrl: '/assets/aistudio/IMG_6241_45246cec.jpeg',
    },
  ];

  const [extraMemories, setExtraMemories] = useState<CoupleMemory[]>(() => {
    return getSafeLocalStorageJSON('dashain_extra_custom_memories_v4', []);
  });

  const [selectedMemory, setSelectedMemory] = useState<CoupleMemory | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [likes, setLikes] = useState<{ [id: string]: number }>({});

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState('');
  const [uploadedIsVideo, setUploadedIsVideo] = useState(false);
  const [uploadedBlob, setUploadedBlob] = useState<Blob | undefined>(undefined);

  // Handle direct upload/change for a specific slot (supports photos and videos)
  const handleSlotMediaUpload = async (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await processMediaFile(file);
        onUpdatePhoto(slotId, processed.url, processed.isVideo, processed.blob);
        setBatchNotice(
          lang === 'ne'
            ? `${processed.isVideo ? 'भिडियो क्लिप' : 'तस्बिर'} सफलतापूर्वक परिवर्तन भयो!`
            : `${processed.isVideo ? 'Video clip' : 'Photo'} updated successfully!`
        );
        setTimeout(() => setBatchNotice(''), 3500);
      } catch (err) {
        console.error('Failed to update slot media:', err);
      }
    }
  };

  // Handle Batch Upload of 6-7 Personal Photos & Videos directly
  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, 10);
    const newItems: CoupleMemory[] = [];

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      try {
        const processed = await processMediaFile(file);
        newItems.push({
          id: `extra_${Date.now()}_${index}`,
          titleNe: processed.isVideo
            ? `हाम्रो व्यक्तिगत भिडियो #${index + 1}`
            : `हाम्रो व्यक्तिगत तस्बिर #${index + 1}`,
          titleEn: processed.isVideo
            ? `Personal Memory Video #${index + 1}`
            : `Personal Memory Photo #${index + 1}`,
          dateNe: 'हाम्रो सुन्दर यात्रा',
          dateEn: 'Our Cherished Journey',
          locationNe: 'काठमाडौँ / साउथ डकोटा',
          locationEn: 'Nepal / South Dakota',
          captionNe: 'हाम्रो माया र यात्राको अविस्मरणीय पल।',
          captionEn: 'A priceless moment of our love and journey together.',
          defaultImageUrl: processed.url,
          isVideo: processed.isVideo,
          isCustom: true,
        });
      } catch (err) {
        console.warn('Could not process file in batch:', err);
      }
    }

    if (newItems.length > 0) {
      const updated = [...newItems, ...extraMemories];
      setExtraMemories(updated);
      safeSetLocalStorage('dashain_extra_custom_memories_v4', JSON.stringify(updated));
      festiveAudio.playSparkleChime();
      setBatchNotice(
        lang === 'ne'
          ? `${newItems.length} वटा व्यक्तिगत फाइलहरू ग्यालरीमा थपिए!`
          : `${newItems.length} personal media files added to gallery!`
      );
      setTimeout(() => setBatchNotice(''), 4000);
    }
  };

  const handleSingleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await processMediaFile(file);
        setUploadedMediaUrl(processed.url);
        setUploadedIsVideo(processed.isVideo);
        setUploadedBlob(processed.blob);
        setDriveUrl('');
      } catch (err) {
        console.error('File upload error:', err);
      }
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalImage = driveUrl.trim()
      ? formatGoogleDriveUrl(driveUrl.trim())
      : uploadedMediaUrl;

    const newItem: CoupleMemory = {
      id: Date.now().toString(),
      titleNe: newTitle.trim(),
      titleEn: newTitle.trim(),
      dateNe: newDate.trim() || 'दशैँ २०८३',
      dateEn: newDate.trim() || 'Dashain 2083',
      locationNe: newLocation.trim() || 'नेपाल / साउथ डकोटा',
      locationEn: newLocation.trim() || 'Nepal / South Dakota',
      captionNe: newCaption.trim() || 'हाम्रो सुन्दर सम्झना।',
      captionEn: newCaption.trim() || 'Our cherished moment together.',
      defaultImageUrl: finalImage,
      isVideo: uploadedIsVideo,
      isCustom: true,
    };

    const updated = [newItem, ...extraMemories];
    setExtraMemories(updated);
    safeSetLocalStorage('dashain_extra_custom_memories_v4', JSON.stringify(updated));

    // Reset form
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewCaption('');
    setDriveUrl('');
    setUploadedMediaUrl('');
    setUploadedIsVideo(false);
    setUploadedBlob(undefined);
    setShowAddModal(false);
    festiveAudio.playSparkleChime();
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlayingVideo(true);
      }).catch(() => {});
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  // Combine default memories with any extra user-added memories
  const allDisplayMemories = [...defaultMemories, ...extraMemories];

  // Specific media URL for the iconic Recharge Card Surprise Video
  const surpriseVideoUrl =
    customPhotos['recharge_surprise'] ||
    '/assets/aistudio/att.tUi6LSTkCJudg0AuvNNL57g8woFA7dVRQDaRFB95jCk_b548ba2d.mp4';
  const hasCustomSurpriseVideo = !!customPhotos['recharge_surprise'];

  return (
    <section id="memories" className="relative scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span>{t.galleryKicker}</span>
              <span aria-hidden="true">·</span>
              <span>Sushil &amp; Sanju</span>
            </div>
            <h2 className="font-festive mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-amber-100">
              {t.galleryTitle}
            </h2>
            <p className="mt-2 text-sm text-amber-200/80 max-w-2xl leading-relaxed">
              {t.galleryDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Multi-Upload (6-7 photos or videos at once) */}
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              ref={batchInputRef}
              onChange={handleBatchUpload}
              className="hidden"
            />
            <button
              onClick={() => batchInputRef.current?.click()}
              className="flex items-center gap-2 rounded-full border border-amber-500/80 bg-gradient-to-r from-red-800 to-amber-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xl shadow-red-950 hover:brightness-110 active:scale-95 transition-all"
              title="Upload 6-7 personal memory photos or videos from device"
            >
              <FolderUp className="h-4 w-4 text-amber-200" />
              <span>{t.uploadBatchBtn}</span>
            </button>

            {/* Single Add / Google Drive Link */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-full border border-amber-700/60 bg-[#25080c] px-4 py-2.5 text-xs font-medium text-amber-200 hover:bg-amber-900/40 hover:border-amber-500 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{t.addPhotoBtn}</span>
            </button>
          </div>
        </div>

        {/* Batch Upload Notice Toast */}
        {batchNotice && (
          <div className="mb-6 rounded-2xl border border-emerald-500/80 bg-emerald-950/90 p-3 text-center text-xs font-medium text-emerald-200 shadow-xl flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{batchNotice}</span>
          </div>
        )}

        {/* Highlight Feature: The ‘Recharge Card’ Surprise Video Clip Player with Instant Change/Upload */}
        <div className="mb-12 rounded-3xl border-2 border-amber-700/60 bg-gradient-to-br from-[#2b080d] to-[#140205] p-5 sm:p-8 shadow-2xl overflow-hidden">
          {/* Hidden File Input for Surprise Video Replacement */}
          <input
            type="file"
            accept="video/*,image/*"
            ref={surpriseVideoInputRef}
            onChange={(e) => handleSlotMediaUpload('recharge_surprise', e)}
            className="hidden"
          />

          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-amber-600/60 shadow-xl bg-black">
              <video
                key={surpriseVideoUrl}
                ref={videoRef}
                src={surpriseVideoUrl}
                loop
                playsInline
                muted={isVideoMuted}
                className="w-full max-h-[380px] object-cover mx-auto"
                onPlay={() => setIsPlayingVideo(true)}
                onPause={() => setIsPlayingVideo(false)}
              />
              {/* Overlay controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleVideoPlayback}
                    className="flex items-center gap-1.5 rounded-full bg-red-900/90 hover:bg-red-800 text-white px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm border border-amber-400/50 shadow-lg transition-transform active:scale-95"
                  >
                    {isPlayingVideo ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                    <span>{isPlayingVideo ? (lang === 'ne' ? 'रोक्नुहोस्' : 'Pause') : (lang === 'ne' ? 'भिडियो हेर्नुहोस्' : 'Play Video')}</span>
                  </button>

                  <button
                    onClick={toggleVideoMute}
                    className="rounded-full bg-black/70 hover:bg-black text-amber-200 p-2 text-xs border border-amber-500/40 backdrop-blur-sm transition-colors"
                    aria-label="Toggle Mute"
                  >
                    {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>

                {/* Instant Change / Upload Video Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => surpriseVideoInputRef.current?.click()}
                    className="flex items-center gap-1 rounded-full bg-amber-950/90 hover:bg-amber-900 text-amber-200 border border-amber-500/60 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all shadow"
                    title={t.videoSlotHint}
                  >
                    <Upload className="h-3 w-3" />
                    <span>{t.changeVideoBtn}</span>
                  </button>

                  {hasCustomSurpriseVideo && (
                    <button
                      onClick={() => onResetPhoto('recharge_surprise')}
                      className="rounded-full bg-black/80 hover:bg-black p-1.5 text-amber-300 border border-amber-600/40"
                      title={t.resetPhotoBtn}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.videoClipTitle}</span>
                {hasCustomSurpriseVideo && (
                  <span className="rounded-full bg-emerald-950/90 border border-emerald-500/70 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    {t.customMediaBadge}
                  </span>
                )}
              </div>
              <h3 className="font-festive mt-2 text-2xl sm:text-3xl font-bold text-amber-100">
                {lang === 'ne' ? '‘रिचार्ज कार्ड’ सरप्राइज र गोप्य यात्राको भिडियो' : 'The ‘Recharge Card’ Doorstep Surprise Video'}
              </h3>
              <p className="mt-3 text-sm text-amber-200/90 leading-relaxed font-light">
                {lang === 'ne'
                  ? 'सुशील सुटुक्क सञ्जुको घरबाहिर पुगी "मलाई रिचार्ज कार्ड चाहियो" भनेर बोलाउँदाको त्यो अचम्मित र लजालु मुस्कान कैद भएको भिडियो! त्यसपछि सञ्जुले घरमा ढाँटेर सुशीलसँग गोप्य यात्रामा निस्किएकी थिइन्—जुन हाम्रो मायाको सबैभन्दा साहसी र मीठो दिन थियो।'
                  : 'Sushil secretly showed up outside Sanju’s house calling her pretending he urgently needed a mobile recharge card. When she stepped out, camera rolling, her shock and joy were etched forever. Right after, she came up with a little excuse to sneak away for an unforgettable private roadtrip!'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-amber-300/80 font-mono">
                <span>🇳🇵 Sushil Giri (Sindhupalchok)</span>
                <span>·</span>
                <span>🇺🇸 Sanju (Vermillion, SD)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid: Each card with dynamic "Upload / Change Photo or Video" button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allDisplayMemories.map((item) => {
            const slotKey = item.slotId || item.id;
            const currentMedia = (item.slotId && customPhotos[item.slotId]) || item.defaultImageUrl;
            const hasCustom = item.slotId ? !!customPhotos[item.slotId] : false;
            const isVideoItem = item.slotId
              ? (customMediaTypes?.[item.slotId] ?? item.isVideo ?? false)
              : (item.isVideo ?? false);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMemory(item)}
                className="group relative cursor-pointer rounded-2xl border border-amber-800/50 bg-[#1d0508]/80 overflow-hidden shadow-xl hover:border-amber-500/70 hover:shadow-2xl hover:shadow-red-950/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Hidden File Input for this specific slot (supports photos and videos) */}
                {item.slotId && (
                  <input
                    type="file"
                    accept="image/*,video/*"
                    ref={(el) => {
                      slotInputRefs.current[slotKey] = el;
                    }}
                    onChange={(e) => handleSlotMediaUpload(slotKey, e)}
                    className="hidden"
                  />
                )}

                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  {currentMedia ? (
                    isVideoItem ? (
                      <div className="relative h-full w-full bg-black flex items-center justify-center">
                        <video
                          src={currentMedia}
                          playsInline
                          muted
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-900/90 text-amber-200 border border-amber-400/60 shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={currentMedia}
                        alt={item.titleEn}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-950 to-amber-950 text-4xl">
                      📸
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Top quick action: Upload / Change Photo or Video Button */}
                  {item.slotId && (
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          slotInputRefs.current[slotKey]?.click();
                        }}
                        className="flex items-center gap-1 rounded-full bg-red-950/90 hover:bg-red-800 border border-amber-400/60 px-2.5 py-1 text-[11px] font-medium text-amber-200 shadow-md backdrop-blur-sm transition-transform active:scale-95"
                        title={t.photoSlotHint}
                      >
                        {isVideoItem ? (
                          <VideoIcon className="h-3 w-3 text-amber-300" />
                        ) : (
                          <Camera className="h-3 w-3 text-amber-300" />
                        )}
                        <span>{t.changePhotoBtn}</span>
                      </button>

                      {hasCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onResetPhoto(slotKey);
                          }}
                          className="rounded-full bg-black/80 hover:bg-black p-1 text-[11px] text-amber-300 border border-amber-600/40"
                          title={t.resetPhotoBtn}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Custom photo/video indicator */}
                  {hasCustom && (
                    <div className="absolute top-2 left-2 z-20">
                      <span className="rounded-full bg-emerald-950/90 border border-emerald-500/70 px-2 py-0.5 text-[10px] font-mono text-emerald-300 backdrop-blur-sm">
                        {isVideoItem ? t.customMediaBadge : t.customPhotoBadge}
                      </span>
                    </div>
                  )}

                  {/* Bottom bar overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-amber-300">
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-500/30 truncate max-w-[150px]">
                      <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                      <span className="truncate">{lang === 'ne' ? item.locationNe : item.locationEn}</span>
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm font-mono text-[10px]">
                      {lang === 'ne' ? item.dateNe : item.dateEn}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-festive font-semibold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {lang === 'ne' ? item.titleNe : item.titleEn}
                    </h3>
                    <p className="mt-1.5 text-xs text-amber-200/70 font-light line-clamp-2 leading-relaxed">
                      {lang === 'ne' ? item.captionNe : item.captionEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-900/40 flex items-center justify-between text-xs text-amber-300/80">
                    <span className="text-[11px] font-mono text-amber-400/60 flex items-center gap-1">
                      {isVideoItem ? <VideoIcon className="h-3 w-3 text-amber-400" /> : <ImageIcon className="h-3 w-3 text-amber-400" />}
                      <span>{lang === 'ne' ? 'सुशील र सञ्जु' : 'Sushil & Sanju'}</span>
                    </span>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5 fill-red-500/30" />
                      <span className="font-mono text-xs">{likes[item.id] || 1}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal with Full Video Player or Photo Viewer */}
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-3xl border border-amber-600/70 bg-[#200508] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 rounded-full p-2 text-amber-400 hover:bg-amber-950 hover:text-amber-100 transition-colors z-30"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {(() => {
                const modalMediaUrl =
                  (selectedMemory.slotId && customPhotos[selectedMemory.slotId]) ||
                  selectedMemory.defaultImageUrl;
                const isModalVideo = selectedMemory.slotId
                  ? (customMediaTypes?.[selectedMemory.slotId] ?? selectedMemory.isVideo ?? false)
                  : (selectedMemory.isVideo ?? false);

                return (
                  modalMediaUrl && (
                    <div className="relative mb-4 rounded-2xl overflow-hidden border border-amber-800/60 bg-black">
                      {isModalVideo ? (
                        <video
                          src={modalMediaUrl}
                          controls
                          autoPlay
                          playsInline
                          className="w-full max-h-[420px] object-cover mx-auto"
                        />
                      ) : (
                        <img
                          src={modalMediaUrl}
                          alt={selectedMemory.titleEn}
                          className="w-full max-h-[420px] object-cover mx-auto"
                        />
                      )}

                      {selectedMemory.slotId && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                          <button
                            onClick={() =>
                              selectedMemory.slotId &&
                              slotInputRefs.current[selectedMemory.slotId]?.click()
                            }
                            className="flex items-center gap-1.5 rounded-full bg-red-950/90 hover:bg-red-800 border border-amber-400/70 px-3.5 py-1.5 text-xs font-semibold text-white shadow backdrop-blur-sm transition-transform active:scale-95"
                          >
                            <Camera className="h-3.5 w-3.5 text-amber-200" />
                            <span>{t.changePhotoBtn}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )
                );
              })()}

              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{lang === 'ne' ? selectedMemory.dateNe : selectedMemory.dateEn}</span>
                <span aria-hidden="true">·</span>
                <MapPin className="h-3.5 w-3.5" />
                <span>{lang === 'ne' ? selectedMemory.locationNe : selectedMemory.locationEn}</span>
              </div>

              <h3 className="font-festive mt-2 text-2xl font-bold text-amber-100">
                {lang === 'ne' ? selectedMemory.titleNe : selectedMemory.titleEn}
              </h3>

              <p className="mt-3 text-sm text-amber-200/90 leading-relaxed font-light">
                {lang === 'ne' ? selectedMemory.captionNe : selectedMemory.captionEn}
              </p>

              <div className="mt-6 pt-4 border-t border-amber-900/60 flex items-center justify-between text-xs text-amber-300/80">
                <span>
                  {lang === 'ne'
                    ? 'सुशील गिरी र सञ्जुको साँचो माया'
                    : 'True Love Story of Sushil & Sanju'}
                </span>
                <button
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-red-500/30" />
                  <span className="font-mono text-sm">{likes[selectedMemory.id] || 1}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Memory Modal (Supports both Photo and Video Upload or Google Drive Link) */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-3xl border border-amber-600/70 bg-[#1c0407] p-6 shadow-2xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-amber-400 hover:bg-amber-950 hover:text-amber-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{lang === 'ne' ? 'नयाँ सम्झना थप्नुहोस्' : 'Add New Memory'}</span>
              </div>
              <h3 className="font-festive mt-1 text-2xl font-bold text-amber-100">
                {lang === 'ne' ? 'तस्बिर वा भिडियो थप्नुहोस्' : 'Add Photo or Video'}
              </h3>

              <form onSubmit={handleAddMemory} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-amber-300 mb-1">
                    {lang === 'ne' ? 'शीर्षक' : 'Title'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={lang === 'ne' ? 'उदा: नगरकोटको साँझ' : 'e.g., Evening at Nagarkot'}
                    className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-amber-300 mb-1">
                      {lang === 'ne' ? 'मिति' : 'Date'}
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder={lang === 'ne' ? 'उदा: दशैँ २०८३' : 'e.g., Dashain 2083'}
                      className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-amber-300 mb-1">
                      {lang === 'ne' ? 'स्थान' : 'Location'}
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder={lang === 'ne' ? 'उदा: नगरकोट / साउथ डकोटा' : 'e.g., Nagarkot / South Dakota'}
                      className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-300 mb-1">
                    {lang === 'ne' ? 'मायालु विवरण' : 'Romantic Caption'}
                  </label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder={lang === 'ne' ? 'यस पलको मिठा सम्झनाहरू...' : 'Sweet words about this moment...'}
                    className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Google Drive Link Input Option */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-amber-300 mb-1">
                    <Link2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>{lang === 'ne' ? 'गुगल ड्राइभ सेयरिङ लिङ्क (Google Drive Link)' : 'Google Drive Share Link'}</span>
                  </label>
                  <input
                    type="url"
                    value={driveUrl}
                    onChange={(e) => {
                      setDriveUrl(e.target.value);
                      if (e.target.value) setUploadedMediaUrl('');
                    }}
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    className="w-full rounded-xl border border-amber-800/60 bg-stone-900/90 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Or Direct Device File Upload (Photo or Video) */}
                <div>
                  <span className="block text-center text-[11px] text-amber-400/60 my-1">
                    — {lang === 'ne' ? 'अथवा मोबाइल/कम्प्युटरबाट फोटो वा भिडियो छान्नुहोस्' : 'OR choose photo or video from device'} —
                  </span>
                  <label className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed border-amber-700/60 bg-amber-950/20 cursor-pointer hover:border-amber-500 transition-colors">
                    {uploadedMediaUrl ? (
                      <div className="relative text-center">
                        {uploadedIsVideo ? (
                          <div className="flex items-center gap-2 bg-red-950/80 px-4 py-2 rounded-lg border border-amber-500/50">
                            <VideoIcon className="h-5 w-5 text-amber-300" />
                            <span className="text-xs text-amber-200">
                              {lang === 'ne' ? 'भिडियो क्लिप छानियो (बदल्न क्लिक गर्नुहोस्)' : 'Video clip selected (click to replace)'}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={uploadedMediaUrl}
                            alt="Preview"
                            className="h-20 w-36 object-cover rounded-lg mx-auto"
                          />
                        )}
                        <span className="block mt-1 text-[11px] text-amber-300">
                          {lang === 'ne' ? 'फाइल छानियो (बदल्न क्लिक गर्नुहोस्)' : 'File selected (click to replace)'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-amber-400" />
                        <span className="mt-1 text-xs text-amber-300">
                          {lang === 'ne' ? 'फोटो वा भिडियो फाइल अपलोड गर्नुहोस्' : 'Upload photo or video file'}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      ref={fileInputRef}
                      onChange={handleSingleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-medium text-amber-300/80 hover:text-amber-100"
                  >
                    {lang === 'ne' ? 'रद्द' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-5 py-2 text-xs font-semibold text-white shadow hover:brightness-110"
                  >
                    {lang === 'ne' ? 'ग्यालरीमा राख्नुहोस्' : 'Add to Gallery'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
