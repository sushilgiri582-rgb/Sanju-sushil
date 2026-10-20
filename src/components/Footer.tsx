import React from 'react';
import { Heart } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="border-t border-amber-900/40 bg-[#0e0204] py-12 text-center text-xs text-amber-300/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-base sm:text-lg font-festive font-bold text-amber-200">
          <span>{t.footerGreeting}</span>
        </div>

        <p className="max-w-md text-amber-200/70 leading-relaxed">
          {t.footerDedication}
        </p>

        <div className="flex items-center gap-2 text-xs text-amber-400/80 font-mono">
          <span>Sindhupalchok, Nepal</span>
          <span>·</span>
          <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline animate-heart-pulse" />
          <span>·</span>
          <span>Vermillion, South Dakota, USA</span>
        </div>

        <span className="text-[11px] text-amber-400/50">
          {t.footerRights}
        </span>
      </div>
    </footer>
  );
};
