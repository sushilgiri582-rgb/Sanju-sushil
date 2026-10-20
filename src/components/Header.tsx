import React, { useState } from 'react';
import { Music, Volume2, VolumeX, Languages } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { Language, translations } from '../translations';

interface HeaderProps {
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAudioPlaying,
  setIsAudioPlaying,
  lang,
  setLang,
}) => {
  const [volume, setVolume] = useState<number>(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const t = translations[lang];

  const toggleMusic = () => {
    const newState = festiveAudio.toggle();
    setIsAudioPlaying(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    festiveAudio.setVolume(val);
  };

  const toggleLanguage = () => {
    setLang(lang === 'ne' ? 'en' : 'ne');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/40 bg-[#140306]/92 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-amber-200 transition-colors hover:text-amber-100 whitespace-nowrap shrink-0"
        >
          <span className="font-festive text-xl sm:text-2xl tracking-wider text-amber-400">
            {t.brandTitle}
          </span>
          <span className="text-xs sm:text-sm font-light text-amber-300/80">
            · {t.brandSubtitle}
          </span>
        </a>

        {/* Zone 2: Navigation Links (clean unboxed single line) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs sm:text-sm font-medium text-amber-200/80">
          <a
            href="#tika-ceremony"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navTika}
          </a>
          <a
            href="#distance-tracker"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navDistance}
          </a>
          <a
            href="#story-timeline"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navTimeline}
          </a>
          <a
            href="#love-letter"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navLetter}
          </a>
          <a
            href="#memories"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navGallery}
          </a>
          <a
            href="#diya-altar"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navDiya}
          </a>
        </nav>

        {/* Zone 3: 1 primary action area: Language Switcher + Music Toggle */}
        <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/60 bg-amber-950/70 px-3 py-1.5 text-xs font-semibold text-amber-200 shadow-sm hover:bg-amber-900/80 hover:border-amber-400 transition-all active:scale-95 whitespace-nowrap shrink-0"
            title="Switch Language / भाषा परिवर्तन"
            aria-label="Toggle language between Nepali and English"
          >
            <Languages className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'ne' ? 'English' : 'नेपाली'}</span>
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            aria-label="Toggle festive background music"
            className={`group flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold tracking-wide transition-all ${
              isAudioPlaying
                ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg shadow-amber-950/60 ring-1 ring-amber-400/50'
                : 'bg-stone-900/80 text-amber-300/90 hover:bg-stone-800 ring-1 ring-amber-900/60'
            } whitespace-nowrap shrink-0`}
          >
            {isAudioPlaying ? (
              <>
                <span className="flex h-3 items-end gap-0.5">
                  <span className="w-0.5 bg-amber-200 animate-pulse h-3"></span>
                  <span className="w-0.5 bg-amber-200 animate-pulse h-2 delay-100"></span>
                  <span className="w-0.5 bg-amber-200 animate-pulse h-4 delay-200"></span>
                </span>
                <span className="hidden sm:inline">{t.playingMusic}</span>
                <span className="sm:hidden">Malshree</span>
              </>
            ) : (
              <>
                <Music className="h-3.5 w-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">{t.playMusic}</span>
                <span className="sm:hidden">Music</span>
              </>
            )}
          </button>

          {/* Volume popover */}
          {isAudioPlaying && (
            <div className="relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="rounded-full p-2 text-amber-300/80 hover:bg-amber-950/60 hover:text-amber-200 transition-colors"
                title="Adjust volume"
                aria-label="Adjust volume"
              >
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {showVolumeSlider && (
                <div className="absolute right-0 top-12 z-50 w-36 rounded-xl border border-amber-800/60 bg-[#1c060a] p-3 shadow-2xl backdrop-blur-lg">
                  <label htmlFor="volume-slider" className="mb-1 block text-[10px] font-medium text-amber-300/70">
                    Volume: {Math.round(volume * 100)}%
                  </label>
                  <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-1.5 w-full cursor-pointer accent-amber-500 rounded-lg bg-amber-950"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
