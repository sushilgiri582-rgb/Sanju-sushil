import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Flame, Plus, Check } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { Language, translations } from '../translations';

interface DiyaItem {
  id: string;
  lit: boolean;
  wishNe: string;
  wishEn: string;
  prayerNe: string;
  prayerEn: string;
}

interface DiyaAltarAndDakshinaProps {
  lang: Language;
}

export const DiyaAltarAndDakshina: React.FC<DiyaAltarAndDakshinaProps> = ({ lang }) => {
  const t = translations[lang];

  const [diyas, setDiyas] = useState<DiyaItem[]>([
    {
      id: '1',
      lit: true,
      wishNe: 'सञ्जुको अध्ययन र सफलताका लागि',
      wishEn: "For Sanju's Academic Success in South Dakota",
      prayerNe: 'साउथ डकोटाको विश्वविद्यालयमा सञ्जुको हरेक परीक्षा र लक्ष्य सफल रहोस्।',
      prayerEn: 'May Sanju thrive in her university pursuits, conquering every deadline with confidence.',
    },
    {
      id: '2',
      lit: true,
      wishNe: 'छिट्टै हुने विमानस्थलको पुनर्मिलन',
      wishEn: 'For Our Swift Airport Reunion',
      prayerNe: 'सात समुद्रपारिको दूरी अन्त्य भई फेरि त्रिभुवन विमानस्थलमा अँगालो हाल्न पाइयोस्।',
      prayerEn: 'May the skies bring us safely into each other’s arms at the arrival gate soon.',
    },
    {
      id: '3',
      lit: true,
      wishNe: 'सिन्धुपाल्चोक र साउथ डकोटाको अटुट प्रेम',
      wishEn: 'Unbreakable Love Across Oceans',
      prayerNe: '१० घण्टा ४५ मिनेटको समय अन्तर भए पनि हाम्रो मुटु सधैँ एउटै रहोस्।',
      prayerEn: 'May our trust and warmth deepen with every single sunrise and sunset.',
    },
    {
      id: '4',
      lit: false,
      wishNe: 'दुवै परिवारको सुस्वास्थ्य र खुशी',
      wishEn: 'Good Health & Blessings for Both Families',
      prayerNe: 'नेपाल र अमेरिकामा रहेका हाम्रा आमाबुबा र आफन्तजनमा सधैँ खुशी छाओस्।',
      prayerEn: 'May both our families be blessed with health, longevity, and joy.',
    },
  ]);

  const [customWish, setCustomWish] = useState('');
  const [showAddWish, setShowAddWish] = useState(false);

  // Dakshina vouchers from Sushil to Sanju
  const [vouchers, setVouchers] = useState([
    {
      id: 'v1',
      titleNe: 'भिडियो कल डिनर डेट कुपन',
      titleEn: 'Midnight FaceTime Dinner Date Pass',
      descNe: 'तिमीले मन पराउने खाना अर्डर गर; हामी ३ घण्टा लगातार भिडियो कलमा सँगै बसेर खानेछौँ।',
      descEn: 'Order your favorite meal; we feast together across video call for 3 uninterrupted hours.',
      revealed: true,
      badgeNe: 'रोमान्टिक डेट',
      badgeEn: 'Virtual Date',
    },
    {
      id: 'v2',
      titleNe: 'नेपालबाट विशेष मायाको पार्सल',
      titleEn: 'Airmail Nepali Keepsake Parcel',
      descNe: 'नेपालको तितेकरेला, चिया, सयपत्रीको फूल र हातले लेखेको पत्र साउथ डकोटाको कोठामा।',
      descEn: 'A handcrafted parcel of local Nepali delicacies, home tea, and scented handwritten cards.',
      revealed: false,
      badgeNe: 'उपहार',
      badgeEn: 'Keepsake',
    },
    {
      id: 'v3',
      titleNe: 'विमानस्थलको १० मिनेटको न्यानो अँगालो',
      titleEn: 'Tribhuvan Airport 10-Minute Hug Pass',
      descNe: 'डिपार्चर वा अराइभलमा भेट्दा बिना कुनै रोकतोक १० मिनेटसम्म कस्सिएर छातीमा बाँध्ने बाचा।',
      descEn: 'Redeemable at the arrival gate: 10 minutes of uninterrupted tight hugs without letting go.',
      revealed: false,
      badgeNe: 'पुनर्मिलन',
      badgeEn: 'Airport Hug',
    },
    {
      id: 'v4',
      titleNe: 'नगरकोटको कफी र कपल पिकनिक यात्रा',
      titleEn: 'Nagarkot Coffee & Couple Picnic Roadtrip Pass',
      descNe: 'नेपाल फर्किएपछि पुरानै दिन सम्झिँदै गिलासमा कफी समातेर नगरकोट जाने, र चटपटे-पानीपुरीसहित निजी पिकनिक मनाउने।',
      descEn: 'Reliving our best dates: glass-cup coffee ride to Nagarkot hills and a private chatpate & panipuri couple picnic!',
      revealed: false,
      badgeNe: 'रोमान्टिक यात्रा',
      badgeEn: 'Picnic & Ride',
    },
  ]);

  const handleToggleDiya = (id: string) => {
    festiveAudio.playSparkleChime();
    setDiyas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, lit: !d.lit } : d))
    );
  };

  const handleAddDiya = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;

    festiveAudio.playTempleBell();
    const newDiya: DiyaItem = {
      id: Date.now().toString(),
      lit: true,
      wishNe: customWish.trim(),
      wishEn: customWish.trim(),
      prayerNe: 'सुशील गिरी र सञ्जुको अटुट प्रार्थना',
      prayerEn: 'Blessed with devotion by Sushil & Sanju',
    };

    setDiyas((prev) => [...prev, newDiya]);
    setCustomWish('');
    setShowAddWish(false);
  };

  const handleRevealVoucher = (id: string) => {
    festiveAudio.playSparkleChime();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#dc2626', '#10b981'],
      });
    } catch {
      // safe fallback
    }

    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, revealed: true } : v))
    );
  };

  const totalLit = diyas.filter((d) => d.lit).length;

  return (
    <section id="diya-altar" className="relative scroll-mt-20 py-16 sm:py-24">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>{t.diyaKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Sushil &amp; Sanju</span>
          </div>
          <h2 className="font-festive mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100">
            {t.diyaTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto">
            {t.diyaDesc}
          </p>
        </div>

        {/* Section Split: Diya Altar on Left, Dakshina Vouchers on Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: The Virtual Diya Altar */}
          <div className="rounded-3xl border border-amber-800/60 bg-gradient-to-b from-[#24060a] to-[#140205] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-4">
              <div className="flex items-center gap-2.5">
                <Flame className="h-5 w-5 text-amber-400 animate-diya" />
                <div>
                  <h3 className="font-festive text-lg font-bold text-amber-100">
                    {t.diyaAltarTitle}
                  </h3>
                  <span className="text-xs text-amber-400/70 font-mono">
                    {totalLit} / {diyas.length} {lang === 'ne' ? 'दियो बलिरहेका छन्' : 'Diyas Glowing'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAddWish(!showAddWish)}
                className="flex items-center gap-1.5 rounded-full border border-amber-700/60 bg-amber-950/60 px-3 py-1 text-xs text-amber-200 hover:bg-amber-900 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{t.makeWishBtn}</span>
              </button>
            </div>

            {/* Custom Wish Input Form */}
            {showAddWish && (
              <form onSubmit={handleAddDiya} className="mt-4 flex gap-2">
                <input
                  type="text"
                  required
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder={lang === 'ne' ? 'उदा: सञ्जुको राम्रो भविष्य र हाम्रो पुनर्मिलन...' : 'e.g., For Sanju’s bright future...'}
                  className="flex-grow rounded-xl border border-amber-700/60 bg-stone-900 px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-110"
                >
                  {lang === 'ne' ? 'दियो बाल्नुहोस्' : 'Light Diya'}
                </button>
              </form>
            )}

            {/* Diyas Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {diyas.map((d) => (
                <div
                  key={d.id}
                  onClick={() => handleToggleDiya(d.id)}
                  className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                    d.lit
                      ? 'border-amber-500/80 bg-gradient-to-b from-[#33080e] to-[#1a0407] shadow-lg shadow-amber-950/50'
                      : 'border-amber-950 bg-[#120204] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-2xl">
                      {d.lit ? (
                        <span className="inline-block animate-diya drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                          🪔
                        </span>
                      ) : (
                        <span className="grayscale opacity-50">🪔</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        d.lit
                          ? 'bg-amber-950 text-amber-300 border border-amber-600/60'
                          : 'bg-stone-900 text-stone-500'
                      }`}
                    >
                      {d.lit
                        ? (lang === 'ne' ? 'प्रज्वलित' : 'Glowing')
                        : (lang === 'ne' ? 'बाल्न छुनुहोस्' : 'Tap to Light')}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-festive text-sm font-bold text-amber-100 group-hover:text-amber-200">
                      {lang === 'ne' ? d.wishNe : d.wishEn}
                    </h4>
                    <p className="mt-1 text-xs text-amber-300/70 font-light leading-snug">
                      {lang === 'ne' ? d.prayerNe : d.prayerEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-amber-400/60 italic">
              {lang === 'ne'
                ? '‘हरेक दियोको ज्वालाले सिन्धुपाल्चोक र साउथ डकोटालाई जोड्नेछ।’'
                : '“May every golden flame guide our prayers across the oceans.”'}
            </p>
          </div>

          {/* Right: Digital Dakshina Tokens & Vouchers for Sanju */}
          <div className="rounded-3xl border border-amber-800/60 bg-gradient-to-b from-[#24060a] to-[#140205] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-4">
              <div className="flex items-center gap-2.5">
                <Gift className="h-5 w-5 text-red-400" />
                <div>
                  <h3 className="font-festive text-lg font-bold text-amber-100">
                    {t.dakshinaTitle}
                  </h3>
                  <span className="text-xs text-amber-400/70 font-mono">
                    {t.dakshinaSub}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3.5">
              {vouchers.map((v) => (
                <div
                  key={v.id}
                  className={`rounded-2xl border p-4 transition-all duration-300 ${
                    v.revealed
                      ? 'border-amber-600/70 bg-[#2d070d] shadow-md'
                      : 'border-dashed border-amber-800/60 bg-[#160305] hover:border-amber-600'
                  }`}
                >
                  {v.revealed ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-700/50">
                          {lang === 'ne' ? v.badgeNe : v.badgeEn}
                        </span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                          <Check className="h-3.5 w-3.5" /> {lang === 'ne' ? 'खुला भएको उपहार' : 'Unlocked Token'}
                        </span>
                      </div>
                      <h4 className="font-festive mt-2 text-base font-bold text-amber-100">
                        {lang === 'ne' ? v.titleNe : v.titleEn}
                      </h4>
                      <p className="mt-1 text-xs text-amber-200/80 leading-relaxed font-light">
                        {lang === 'ne' ? v.descNe : v.descEn}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/80 text-xl border border-red-800/60 shrink-0">
                          🎁
                        </span>
                        <div>
                          <span className="text-xs font-semibold text-amber-200">
                            {lang === 'ne' ? 'सुशीलको तर्फबाट गोप्य दक्षिणा' : "Sushil's Secret Dakshina Token"}
                          </span>
                          <p className="text-[11px] text-amber-400/60">
                            {lang === 'ne' ? 'सञ्जुका लागि खोलिने उपहार' : 'Tap to scratch & unlock for Sanju'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRevealVoucher(v.id)}
                        className="rounded-full bg-gradient-to-r from-red-600 to-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                      >
                        {lang === 'ne' ? 'खोल्नुहोस्' : 'Scratch & Reveal'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-amber-400/60 italic">
              {lang === 'ne'
                ? '‘दशैँको दक्षिणा केवल पैसा होइन, सात समुद्रपारि पठाइएको साँचो बाचा हो।’'
                : '“True Dakshina is not money; it is a sacred promise preserved across oceans.”'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
