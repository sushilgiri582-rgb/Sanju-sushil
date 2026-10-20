import React, { useState, useEffect } from 'react';
import { Heart, Compass, Sparkles, Clock } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroSectionProps {
  onStartTika: () => void;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTika,
  lang,
}) => {
  const t = translations[lang];
  const [nepalTime, setNepalTime] = useState<string>('');
  const [vermillionTime, setVermillionTime] = useState<string>('');

  // Live clocks for Nepal (NPT +5:45) and Vermillion, South Dakota (Central Time: America/Chicago)
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      // Nepal Time (UTC +5:45)
      const nptFormatter = new Intl.DateTimeFormat(lang === 'ne' ? 'ne-NP' : 'en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Vermillion, South Dakota (US Central Time)
      const vermillionFormatter = new Intl.DateTimeFormat(lang === 'ne' ? 'ne-NP' : 'en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      setNepalTime(nptFormatter.format(now));
      setVermillionTime(vermillionFormatter.format(now));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Decorative backdrop glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -z-10 h-[500px] w-full max-w-5xl rounded-full bg-gradient-to-b from-red-600/15 via-amber-500/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtle festival kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400/90 mb-4">
            <span>{t.heroKicker}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-festive text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 text-balance leading-tight">
            {t.heroTitle}
          </h1>

          {/* Romantic & Emotional subtitle */}
          <p className="mt-4 text-base sm:text-lg text-amber-100/80 font-light max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Dedicated Couple Badge */}
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-amber-800/60 bg-amber-950/40 px-6 py-2.5 shadow-inner backdrop-blur-sm">
              <span className="font-medium text-amber-200 flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="text-red-400">🇳🇵</span> {t.sushilBadge}
              </span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-heart-pulse shrink-0" />
              <span className="font-medium text-amber-200 flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="text-blue-400">🇺🇸</span> {t.sanjuBadge}
              </span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartTika}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-red-700 via-rose-700 to-amber-600 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-red-950/70 ring-1 ring-amber-400/40 hover:from-red-600 hover:to-amber-500 hover:shadow-red-900/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>{t.startTikaBtn}</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <a
              href="#distance-tracker"
              className="inline-flex items-center gap-2 rounded-full border border-amber-800/70 bg-amber-950/30 px-6 py-3.5 text-xs sm:text-sm font-medium text-amber-200 hover:bg-amber-900/40 hover:border-amber-600 transition-colors"
            >
              <Compass className="h-4 w-4 text-amber-400" />
              <span>{t.trackDistanceBtn}</span>
            </a>
          </div>
        </div>

        {/* Live dual timezone & location strip: Sindhupalchok <-> Vermillion, South Dakota */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Sindhupalchok, Nepal Card */}
          <div className="relative overflow-hidden rounded-2xl border border-red-900/60 bg-gradient-to-br from-[#2a080d]/90 to-[#180306]/90 p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-950/80 border border-red-700/60 text-xl shrink-0">
                  🇳🇵
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-amber-200">
                    {t.sindhupalchokCardTitle}
                  </h2>
                  <p className="text-xs text-amber-400/70 font-light">
                    {t.sindhupalchokCardSub}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono text-base font-medium tabular-nums justify-end">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{nepalTime || '--:--:--'}</span>
                </div>
                <span className="text-[11px] text-amber-200/60 font-light">
                  {t.sindhupalchokTimezone}
                </span>
              </div>
            </div>
            <div className="mt-3 border-t border-amber-900/40 pt-2 flex items-center justify-between text-xs text-amber-300/80">
              <span>{lang === 'ne' ? 'सुशीलको सिन्धुपाल्चोक' : "Sushil's Sindhupalchok"}</span>
              <span className="text-amber-400 font-medium">{t.sindhupalchokStatus}</span>
            </div>
          </div>

          {/* Vermillion, South Dakota, USA Card */}
          <div className="relative overflow-hidden rounded-2xl border border-red-900/60 bg-gradient-to-br from-[#2a080d]/90 to-[#180306]/90 p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-950/80 border border-blue-700/60 text-xl shrink-0">
                  🇺🇸
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-amber-200">
                    {t.vermillionCardTitle}
                  </h2>
                  <p className="text-xs text-amber-400/70 font-light">
                    {t.vermillionCardSub}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono text-base font-medium tabular-nums justify-end">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{vermillionTime || '--:--:--'}</span>
                </div>
                <span className="text-[11px] text-amber-200/60 font-light">
                  {t.vermillionTimezone}
                </span>
              </div>
            </div>
            <div className="mt-3 border-t border-amber-900/40 pt-2 flex items-center justify-between text-xs text-amber-300/80">
              <span>{lang === 'ne' ? 'सञ्जुको साउथ डकोटा' : "Sanju's South Dakota"}</span>
              <span className="text-amber-400 font-medium">{t.vermillionStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
