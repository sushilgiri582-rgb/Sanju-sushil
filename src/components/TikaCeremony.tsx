import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Bell, CheckCircle2, RotateCcw, Share2, Award } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { Language, translations } from '../translations';

interface TikaCeremonyProps {
  lang: Language;
  onBlessingCelebrated: () => void;
}

export const TikaCeremony: React.FC<TikaCeremonyProps> = ({
  lang,
  onBlessingCelebrated,
}) => {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasTika, setHasTika] = useState<boolean>(false);
  const [hasJamara, setHasJamara] = useState<boolean>(false);
  const [hasDiyaLit, setHasDiyaLit] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedBlessing, setCopiedBlessing] = useState<boolean>(false);

  // Step 1: Light Diya & Ring Bell
  const handleLightDiya = () => {
    setHasDiyaLit(true);
    festiveAudio.playTempleBell();
    if (currentStep < 1) setCurrentStep(1);
  };

  // Step 2: Apply Tika
  const handleApplyTika = () => {
    setHasTika(true);
    festiveAudio.playSparkleChime();
    if (currentStep < 2) setCurrentStep(2);
  };

  // Step 3: Tuck Jamara
  const handleAddJamara = () => {
    setHasJamara(true);
    festiveAudio.playSparkleChime();
    if (currentStep < 3) setCurrentStep(3);
  };

  // Step 4: Complete Blessing & Shower
  const handleCompleteBlessing = () => {
    setIsCompleted(true);
    setCurrentStep(4);
    festiveAudio.playTempleBell();

    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#f59e0b', '#fbbf24', '#10b981', '#fef08a'],
      });
    } catch {
      // safe fallback
    }

    onBlessingCelebrated();
  };

  const handleResetCeremony = () => {
    setHasDiyaLit(false);
    setHasTika(false);
    setHasJamara(false);
    setIsCompleted(false);
    setCurrentStep(0);
  };

  const blessingText = lang === 'ne'
    ? `प्यारी सञ्जु, विजया दशमी २०८३ को असिम मङ्गलमय शुभकामना! सिन्धुपाल्चोकदेखि भर्मिलियन, साउथ डकोटासम्म मेरो माया र अक्षता तिम्रो निधारमा सजिएको छ। छिट्टै सँगै हुने बाचासहित — तिम्रो सुशील गिरी।`
    : `Happy Vijaya Dashami 2083, Dearest Sanju! From Sindhupalchok to Vermillion, South Dakota, this sacred Tika and Jamara carries all my endless love, prayers, and promises. Forever yours, Sushil Giri.`;

  const handleCopyBlessing = () => {
    navigator.clipboard.writeText(blessingText);
    setCopiedBlessing(true);
    setTimeout(() => setCopiedBlessing(false), 2500);
  };

  return (
    <section id="tika-ceremony" className="relative scroll-mt-20 py-16 sm:py-24">
      {/* Background festive radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(153,27,27,0.22),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>{t.tikaKicker}</span>
          </div>
          <h2 className="font-festive mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100 text-balance">
            {t.tikaTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto">
            {t.tikaDesc}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-800/60 bg-[#1f0509]/80 px-4 py-1.5 text-xs text-amber-300">
            <span className="font-semibold text-amber-400">{t.blessingFrom}</span>
            <span>सुशील गिरी (सिन्धुपाल्चोक) ➔ सञ्जु (साउथ डकोटा)</span>
          </div>
        </div>

        {/* Ceremony Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Interactive Forehead Canvas & Puja Thali */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The Virtual Forehead / Blessing Avatar Box */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl border border-amber-700/50 bg-gradient-to-b from-[#31090f] via-[#200508] to-[#140205] p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Traditional Rangoli / Mandala Watermark */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-80 h-80 text-amber-400">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M100 15 L120 70 L185 70 L135 110 L155 170 L100 135 L45 170 L65 110 L15 70 L80 70 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Recipient Face / Avatar representation */}
              <div className="relative flex flex-col items-center">
                {/* Crown / Jamara area */}
                <div className="relative h-14 flex items-center justify-center">
                  {hasJamara ? (
                    <div className="animate-float flex items-center justify-center">
                      <div className="relative flex items-center gap-1">
                        <div className="w-2.5 h-12 bg-gradient-to-t from-emerald-600 via-yellow-400 to-amber-200 rounded-t-full transform -rotate-12 origin-bottom shadow-lg shadow-yellow-500/50" />
                        <div className="w-3 h-14 bg-gradient-to-t from-emerald-600 via-yellow-300 to-yellow-100 rounded-t-full transform -rotate-3 origin-bottom shadow-lg shadow-yellow-500/50" />
                        <div className="w-2.5 h-12 bg-gradient-to-t from-emerald-600 via-yellow-400 to-amber-300 rounded-t-full transform rotate-12 origin-bottom shadow-lg shadow-yellow-500/50" />
                      </div>
                      <span className="absolute -bottom-2 text-[10px] font-medium text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-600/60 shadow whitespace-nowrap">
                        {lang === 'ne' ? 'पवित्र जमरा' : 'Auspicious Jamara'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-300/40 italic">
                      [{lang === 'ne' ? 'यहाँ जमरा सिउरिनेछ' : 'Jamara will be tucked here'}]
                    </span>
                  )}
                </div>

                {/* Forehead & Tika circle */}
                <div className="relative mt-2 h-36 w-36 rounded-full border-2 border-amber-600/40 bg-gradient-to-b from-[#4a1017] to-[#25080c] shadow-inner flex flex-col items-center justify-center">
                  {hasTika ? (
                    <div className="relative flex flex-col items-center animate-diya">
                      {/* Realistic vermilion & akshata tika mark */}
                      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-rose-900 border-2 border-red-500 shadow-xl shadow-red-600/80 flex items-center justify-center overflow-hidden">
                        {/* Rice grains (Akshata) on Tika */}
                        <div className="absolute inset-0 flex flex-wrap items-center justify-center p-1 gap-0.5 opacity-90">
                          <span className="w-1.5 h-3 bg-amber-100 rounded-full rotate-45 transform" />
                          <span className="w-1.5 h-3 bg-amber-200 rounded-full -rotate-30 transform" />
                          <span className="w-1.5 h-3.5 bg-white rounded-full rotate-12 transform" />
                          <span className="w-1 h-2.5 bg-amber-100 rounded-full -rotate-60 transform" />
                        </div>
                        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                      </div>
                      <span className="mt-2 text-[10px] font-semibold text-amber-200 tracking-wider uppercase">
                        {lang === 'ne' ? 'रातो अक्षता टीका' : 'Rato Tika'}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyTika}
                      className="group flex flex-col items-center justify-center text-center p-3 text-amber-300/70 hover:text-amber-100 transition-colors"
                      title="Click to place Tika"
                    >
                      <Sparkles className="h-6 w-6 text-amber-400 group-hover:scale-125 transition-transform" />
                      <span className="mt-1 text-xs font-medium">
                        {lang === 'ne' ? 'टीका लगाउन छुनुहोस्' : 'Tap to Place Tika'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Receiver Name */}
                <div className="mt-4 text-center">
                  <span className="text-sm font-festive font-semibold text-amber-200">
                    {t.foreheadLabel}
                  </span>
                  <p className="text-[11px] text-amber-400/70">
                    {t.foreheadSub}
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-amber-300/80">
                {isCompleted ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t.ritualComplete}
                  </span>
                ) : (
                  <span>{t.stepCounter} {currentStep + 1} / 4</span>
                )}
              </div>
            </div>

            {/* Puja Thali Controls Strip */}
            <div className="mt-6 w-full max-w-md rounded-2xl border border-amber-900/60 bg-[#1d0509]/90 p-4 shadow-xl">
              <div className="text-xs font-semibold text-amber-300 mb-3 flex items-center justify-between">
                <span>{t.pujaThaliTitle}</span>
                <span className="text-[11px] text-amber-400/60 font-normal">
                  {t.pujaThaliHint}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                {/* Diya item */}
                <button
                  onClick={handleLightDiya}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    hasDiyaLit
                      ? 'border-amber-500 bg-amber-950/60 text-amber-200 shadow-md shadow-amber-900/40'
                      : 'border-amber-900/50 bg-[#160306] text-amber-400/60 hover:border-amber-700 hover:text-amber-200'
                  }`}
                >
                  <div className={`relative mb-1 text-2xl ${hasDiyaLit ? 'animate-diya' : 'grayscale opacity-60'}`}>
                    🪔
                  </div>
                  <span className="text-[11px] font-medium leading-tight">
                    {hasDiyaLit ? t.stepDiyaDone : t.stepDiya}
                  </span>
                </button>

                {/* Tika Plate item */}
                <button
                  onClick={handleApplyTika}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    hasTika
                      ? 'border-red-600 bg-red-950/60 text-amber-100 shadow-md shadow-red-950/50'
                      : 'border-amber-900/50 bg-[#160306] text-amber-400/60 hover:border-red-800 hover:text-amber-200'
                  }`}
                >
                  <div className={`relative mb-1 text-2xl ${hasTika ? 'scale-110' : 'opacity-60'}`}>
                    🔴
                  </div>
                  <span className="text-[11px] font-medium leading-tight">
                    {hasTika ? t.stepTikaDone : t.stepTika}
                  </span>
                </button>

                {/* Jamara item */}
                <button
                  onClick={handleAddJamara}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    hasJamara
                      ? 'border-emerald-600 bg-emerald-950/40 text-amber-100 shadow-md'
                      : 'border-amber-900/50 bg-[#160306] text-amber-400/60 hover:border-emerald-800 hover:text-amber-200'
                  }`}
                >
                  <div className={`relative mb-1 text-2xl ${hasJamara ? 'scale-110' : 'opacity-60'}`}>
                    🌾
                  </div>
                  <span className="text-[11px] font-medium leading-tight">
                    {hasJamara ? t.stepJamaraDone : t.stepJamara}
                  </span>
                </button>
              </div>

              {/* Complete Blessing Button */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleCompleteBlessing}
                  disabled={!hasTika || !hasJamara}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold uppercase tracking-wider transition-all ${
                    hasTika && hasJamara
                      ? 'bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 text-white shadow-lg shadow-red-950 hover:brightness-110 cursor-pointer'
                      : 'bg-stone-900 text-stone-600 cursor-not-allowed border border-stone-800'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t.showerBlessingBtn}</span>
                </button>

                {currentStep > 0 && (
                  <button
                    onClick={handleResetCeremony}
                    className="p-3 rounded-xl border border-amber-900/50 text-amber-400/70 hover:text-amber-200 hover:bg-amber-950/40 transition-colors"
                    title="Reset ritual"
                    aria-label="Reset ceremony"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Romantic Dashain Ashirwad Card specifically for Sanju */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-amber-700/60 bg-gradient-to-b from-[#2e090f] to-[#170306] p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-900/60 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h3 className="font-festive text-lg font-bold text-amber-200">
                    {t.ashirwadTitle}
                  </h3>
                </div>
                <button
                  onClick={() => festiveAudio.playTempleBell()}
                  className="flex items-center gap-1 text-xs text-amber-400/80 hover:text-amber-200 transition-colors"
                  title="Ring ghanti prayer chime"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span>{t.ringGhanti}</span>
                </button>
              </div>

              {/* Sanskrit Classical Verse */}
              <div className="mt-5 rounded-2xl border border-amber-900/40 bg-[#120205]/70 p-4 font-traditional text-center">
                <p className="text-xs sm:text-sm text-amber-300 leading-relaxed">
                  आयुर्द्रोणसुते श्रियं दशरथे शत्रुक्षयं राघवे ।<br />
                  ऐश्वर्यं नहुषे गतिश्च पवने मानञ्च दुर्योधने ॥
                </p>
                <span className="mt-2 block text-[11px] text-amber-400/70 font-sans">
                  {t.stotraSub}
                </span>
              </div>

              {/* Deeply Personal Letter from Sushil to Sanju */}
              <div className="mt-5 space-y-3 text-sm text-amber-100/90 leading-relaxed font-light">
                <p>
                  <strong className="font-semibold text-amber-300">{t.letterToSanjuTitle}</strong>
                </p>
                <p>{t.letterToSanjuP1}</p>
                <p>{t.letterToSanjuP2}</p>
                <p>{t.letterToSanjuP3}</p>
                <p className="font-medium text-amber-200">{t.letterToSanjuP4}</p>
              </div>

              {/* Action bar for blessing */}
              <div className="mt-6 pt-4 border-t border-amber-900/60 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCopyBlessing}
                  className="flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-100 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{copiedBlessing ? t.copiedBlessingMsg : t.copyBlessingBtn}</span>
                </button>
                <span className="text-xs text-amber-400/80 font-festive">
                  सुशील ❤️ सञ्जु
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
