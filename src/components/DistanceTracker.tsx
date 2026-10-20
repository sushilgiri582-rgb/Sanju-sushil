import React, { useState, useEffect } from 'react';
import { Heart, Plane, Calendar, MapPin, Compass, Sparkles, Clock } from 'lucide-react';
import { Language, translations } from '../translations';
import { safeSetLocalStorage, getSafeLocalStorageJSON } from '../utils/imageStorage';

interface DistanceTrackerProps {
  lang: Language;
}

export const DistanceTracker: React.FC<DistanceTrackerProps> = ({ lang }) => {
  const t = translations[lang];
  const [reunionDays, setReunionDays] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isEditingReunion, setIsEditingReunion] = useState(false);
  const [reunionDate, setReunionDate] = useState<string>(() => {
    return getSafeLocalStorageJSON('dashain_reunion_date', '2026-12-25');
  });
  const [tempDate, setTempDate] = useState(reunionDate);

  // Calculate live countdown to reunion
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(reunionDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setReunionDays({ days, hours, minutes, seconds });
      } else {
        setReunionDays({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [reunionDate]);

  const handleSaveReunion = (e: React.FormEvent) => {
    e.preventDefault();
    setReunionDate(tempDate);
    safeSetLocalStorage('dashain_reunion_date', tempDate);
    setIsEditingReunion(false);
  };

  return (
    <section id="distance-tracker" className="relative scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>{t.distanceKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Across The World</span>
          </div>
          <h2 className="font-festive mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100">
            {t.distanceTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto">
            {t.distanceDesc}
          </p>
        </div>

        {/* Global Connection Graphic & Metrics Card */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-amber-800/60 bg-gradient-to-b from-[#26070c] via-[#1a0407] to-[#120205] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle World Map grid dots */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Connection Arc Header */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-amber-900/50">
            {/* Origin: Sindhupalchok, Nepal */}
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950/80 border border-red-700/60 shadow-lg text-2xl shrink-0">
                🇳🇵
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400/80 font-medium">
                  {t.originTitle}
                </span>
                <h3 className="font-festive text-base sm:text-lg font-bold text-amber-100">
                  {lang === 'ne' ? 'सिन्धुपाल्चोक, नेपाल' : 'Sindhupalchok, Nepal'}
                </h3>
                <span className="text-xs text-amber-300/70 font-mono">27.9500° N, 85.6800° E</span>
              </div>
            </div>

            {/* Middle Flight Path & Pulsing Heart */}
            <div className="flex flex-col items-center justify-center px-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-300 mb-1">
                <span>{t.distanceKm}</span>
                <span aria-hidden="true">·</span>
                <span>{t.distanceMiles}</span>
              </div>
              <div className="relative w-48 sm:w-64 h-8 flex items-center justify-center">
                <div className="w-full h-0.5 border-t-2 border-dashed border-amber-500/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-red-900/80 border border-red-500/80 flex items-center justify-center shadow-lg shadow-red-900 animate-heart-pulse">
                    <Heart className="h-4 w-4 text-red-400 fill-red-400" />
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-amber-400/80 mt-1 italic text-center">
                {t.diffSkiesOneHeart}
              </span>
            </div>

            {/* Destination: Vermillion, South Dakota, USA */}
            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400/80 font-medium">
                  {t.destinationTitle}
                </span>
                <h3 className="font-festive text-base sm:text-lg font-bold text-amber-100">
                  {lang === 'ne' ? 'भर्मिलियन, साउथ डकोटा, अमेरिका' : 'Vermillion, South Dakota, USA'}
                </h3>
                <span className="text-xs text-amber-300/70 font-mono">42.7794° N, 96.9292° W</span>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950/80 border border-blue-700/60 shadow-lg text-2xl shrink-0">
                🇺🇸
              </div>
            </div>
          </div>

          {/* Time & Connection Facts Strip */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-amber-900/50 text-center">
            <div className="p-3">
              <span className="text-xs text-amber-400/80 font-medium block">{t.timeDiffTitle}</span>
              <p className="mt-1 font-festive text-base sm:text-lg font-bold text-amber-200">
                {t.timeDiffValue}
              </p>
              <span className="text-[11px] text-amber-300/60">{t.timeDiffSub}</span>
            </div>

            <div className="p-3 border-y sm:border-y-0 sm:border-x border-amber-900/40">
              <span className="text-xs text-amber-400/80 font-medium block">{t.tokenTitle}</span>
              <p className="mt-1 font-festive text-base sm:text-lg font-bold text-amber-200">
                {t.tokenValue}
              </p>
              <span className="text-[11px] text-amber-300/60">{t.tokenSub}</span>
            </div>

            <div className="p-3">
              <span className="text-xs text-amber-400/80 font-medium block">{t.bondTitle}</span>
              <p className="mt-1 font-festive text-base sm:text-lg font-bold text-amber-200">
                {t.bondValue}
              </p>
              <span className="text-[11px] text-amber-300/60">{t.bondSub}</span>
            </div>
          </div>

          {/* Reunion Countdown Section */}
          <div className="relative z-10 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
              <Plane className="h-4 w-4 text-amber-400 animate-bounce" />
              <span>{t.reunionCountdownTitle}</span>
              <button
                onClick={() => setIsEditingReunion(!isEditingReunion)}
                className="text-[11px] text-amber-400/70 underline hover:text-amber-200 ml-2"
              >
                {isEditingReunion ? (lang === 'ne' ? 'रद्द' : 'Cancel') : t.changeDate}
              </button>
            </div>

            {isEditingReunion && (
              <form
                onSubmit={handleSaveReunion}
                className="mb-6 flex flex-wrap items-center justify-center gap-3"
              >
                <input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="rounded-xl border border-amber-700/60 bg-stone-900 px-4 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-110"
                >
                  {t.updateDate}
                </button>
              </form>
            )}

            {/* Digital Countdown Digits */}
            <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
              <div className="rounded-2xl border border-amber-900/60 bg-[#160306]/90 p-3 sm:p-4 shadow-inner">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-amber-200 tabular-nums">
                  {reunionDays.days}
                </span>
                <span className="text-[10px] sm:text-xs uppercase text-amber-400/70 font-medium">
                  {t.days}
                </span>
              </div>
              <div className="rounded-2xl border border-amber-900/60 bg-[#160306]/90 p-3 sm:p-4 shadow-inner">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-amber-200 tabular-nums">
                  {reunionDays.hours}
                </span>
                <span className="text-[10px] sm:text-xs uppercase text-amber-400/70 font-medium">
                  {t.hours}
                </span>
              </div>
              <div className="rounded-2xl border border-amber-900/60 bg-[#160306]/90 p-3 sm:p-4 shadow-inner">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-amber-200 tabular-nums">
                  {reunionDays.minutes}
                </span>
                <span className="text-[10px] sm:text-xs uppercase text-amber-400/70 font-medium">
                  {t.mins}
                </span>
              </div>
              <div className="rounded-2xl border border-amber-900/60 bg-[#160306]/90 p-3 sm:p-4 shadow-inner">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-amber-200 tabular-nums">
                  {reunionDays.seconds}
                </span>
                <span className="text-[10px] sm:text-xs uppercase text-amber-400/70 font-medium">
                  {t.secs}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-amber-300/80 font-light italic">
              {t.reunionSub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
