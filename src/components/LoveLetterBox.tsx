import React, { useState } from 'react';
import { Mail, Lock, Unlock, Feather, Heart, Sparkles, Check, Plane } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { Language, translations } from '../translations';
import { safeSetLocalStorage, getSafeLocalStorageJSON } from '../utils/imageStorage';

interface LoveLetterBoxProps {
  lang: Language;
}

export const LoveLetterBox: React.FC<LoveLetterBoxProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashain' | 'farewell' | 'vows' | 'compose'>('dashain');

  const defaultDashainLetterNe = `मेरी प्यारी सञ्जु,

सिन्धुपाल्चोकको डाँडामा मन्द-मन्द चिसो हावा चलिरहेको छ। आकाशमा सेता बादलका टुक्राहरू तैरिँदा र आँगनमा पहेंला सयपत्री फूलहरू ढकमक्क फुल्दा मेरो मन सिधै भर्मिलियन, साउथ डकोटा पुग्छ।

दशैँ आयो भन्छन्, सबैका घरमा रमाइलो छ, पिङ हल्लिएको छ, तर तिमीविनाको यो दशैँ मेरो लागि केवल तिम्रो सम्झनाको अर्को एउटा चाड बनेको छ। जब म निधारमा रातो अक्षता लगाउँछु, मनमनै पहिलो आशीर्वाद तिम्रो सुस्वास्थ्य, तिम्रो सफलता र तिम्रो मुहारको त्यो निष्कपट मुस्कानका लागि माग्छु।

साउथ डकोटाको कलेज, अध्ययनको तनाव र त्यो एक्लोपनको बीचमा कहिल्यै पनि आफूलाई एक्लो नसम्झिनू। हजारौँ माइल पर रहे पनि तिम्रो हरेक सास, हरेक हाँसो र हरेक आँसुसँग मेरो धड्कन जोडिएको छ।

यो भर्चुअल टीका र जमरा मेरो साँचो मायाको साक्षी हो। अर्को वर्षको दशैँ हामी सँगै बसेर, तिम्रो हात समातेर, एउटै छानामुनि मनाउनेछौँ।

सधैँभरि तिम्रो मात्र,
सुशील गिरी
सिन्धुपाल्चोक, नेपाल`;

  const defaultDashainLetterEn = `My Dearest Sanju,

A crisp autumn breeze sweeps through the hills of Sindhupalchok today. As golden marigolds bloom across the courtyard and temple bells echo in the distance, my soul travels straight across the world to you in Vermillion, South Dakota.

They say Dashain has arrived with laughter, festive swings, and celebration. Yet without you beside me, this festival is simply another sacred sanctuary where I hold your memories close. When I look at the crimson tika and barley jamara, my very first prayer is for your happiness, your triumph in your studies, and that breathtaking smile that first won my heart at Thimi.

Amidst university deadlines, the South Dakota winds, and quiet evenings, please remember that you are never truly alone. Distance may hold our hands apart, but it can never touch what is written in our souls.

Until next Dashain, when we laugh together without any phone screens between us.

Forever and endlessly yours,
Sushil Giri
Sindhupalchok, Nepal`;

  const defaultFarewellLetterNe = `सञ्जु, त्यो बिदाइको दिनको सम्झना...

त्रिभुवन अन्तर्राष्ट्रिय विमानस्थलको त्यो प्रस्थान कक्ष (Departure Gate) अझै मेरो मुटुमा घाउ बनेर बसेको छ।

सुटकेस गुडाउँदै गर्दा तिमीले मेरो हात जसरी कसेर समातेकी थियौ, त्यो स्पर्श म जीवनभर बिर्सिन सक्दिनँ। अन्तिम क्षणमा मैले तिम्रो हातमा मुटुको सबै भावना पोखेर लेखेको त्यो ‘बिदाइ पत्र’ थमाइदिएको थिएँ। तिमी कमजोर नबनून्, तिम्रो यात्राको सुरुआत मेरो रोएको अनुहारले खल्लो नबनाओस् भनेर मैले आफ्ना सबै आँसु भित्रै पिएर, ओठमा जबरजस्ती मुस्कान ल्याएर तिमीलाई बिदा गरेँ।

तर जब "सुशील, म पुगेर फोन गर्छु है..." भन्दै तिमी सेक्युरिटी गेटभित्र पस्यौ र अन्तिम पटक हात हल्लायौ, मेरो छाती यति धेरै चिरियो कि म त्यहाँ उभिन पनि सकिनँ। तिम्रो अगाडि रुन नसकेर म हतार-हतार विमानस्थलको बाथरुमभित्र छिरेँ। ढोका थुनेर एक्लै भक्कानिएर रोएको त्यो क्षण, त्यो मौन र असह्य पीडा केवल मलाई र भगवानलाई मात्र थाहा छ।

विमानस्थलबाट एक्लै बाइकमा फर्किँदा पछाडिको सिट कति रित्तो थियो, त्यो म शब्दमा भन्न सक्दिनँ। तर त्यही आँसु र बिदाइले मलाई सिकाएको छ—हाम्रो माया कति गहिरो र बलियो छ। आज साउथ डकोटामा तिमीले आफ्नो भविष्य बनाउँदै गर्दा म सिन्धुपाल्चोकबाट गर्वका साथ तिम्रो जित हेरिरहेको छु।

हामी फेरि भेट्नेछौँ, त्यही विमानस्थलमा, जहाँ अब कहिल्यै बाथरुममा गएर एक्लै रुनुपर्ने छैन—त्यहाँ त केवल मिलनको अनन्त खुशीका आँसु हुनेछन्।`;

  const defaultFarewellLetterEn = `Sanju, Remembering Our Airport Farewell...

That departure hall at Tribhuvan International Airport is forever etched into my soul.

The way your fingers gripped mine as we wheeled your heavy luggage toward the security gate—I will remember that touch for as long as I breathe. Right before you entered, I placed the handwritten farewell letter into your hands, filled with all the words my voice was too fragile to speak. Refusing to let you board that long flight carrying the unbearable weight of my tears, I swallowed down every sob and forced a gentle, reassuring smile on my face.

When you whispered, "Sushil, I will call you the moment I land..." and stepped past the security barrier, waving one last time, a crushing emptiness seized my chest. Unable to break down in front of you, I excused myself, rushed into the airport bathroom, locked the stall door, and wept uncontrollably and silently alone. That silent, raw heartbreak inside that empty stall was the deepest pain of my life.

Riding back home through the valley on my motorcycle with the rear seat hollow and cold was an ache I will never forget. Yet that painful farewell proved something eternal: distance cannot weaken what God has tied together. In South Dakota today, as you conquer your academic milestones, I watch from Sindhupalchok with immense pride.

We will embrace again at that very airport—and next time, there will be no running to bathroom stalls to cry alone, only the sweet, unending tears of our forever reunion.`;

  const [savedCustomNote, setSavedCustomNote] = useState<string>(() => {
    return getSafeLocalStorageJSON('dashain_custom_love_note_sushil_sanju', '');
  });

  const [composeText, setComposeText] = useState<string>(savedCustomNote);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    festiveAudio.playSparkleChime();
    setIsOpen(true);
  };

  const handleSaveCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    safeSetLocalStorage('dashain_custom_love_note_sushil_sanju', composeText);
    setSavedCustomNote(composeText);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  return (
    <section id="love-letter" className="relative scroll-mt-20 py-16 sm:py-24">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(180,83,9,0.15),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>{t.letterKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Sushil Giri &amp; Sanju</span>
          </div>
          <h2 className="font-festive mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100">
            {t.letterTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto">
            {t.letterDesc}
          </p>
        </div>

        {/* Envelope Container */}
        <div className="mt-12 max-w-3xl mx-auto">
          {!isOpen ? (
            /* Locked Vintage Lokta Paper Envelope */
            <div className="group relative mx-auto max-w-lg rounded-3xl border-2 border-amber-700/60 bg-gradient-to-br from-[#2f080e] via-[#210509] to-[#120204] p-8 shadow-2xl transition-all hover:scale-[1.01] hover:border-amber-500/80">
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/80 border border-amber-600/70 shadow-xl shadow-red-950 animate-heart-pulse">
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  {lang === 'ne' ? 'गोप्य · केवल सञ्जुका लागि' : 'Strictly Confidential · For Sanju’s Eyes Only'}
                </span>

                <h3 className="font-festive mt-2 text-2xl font-bold text-amber-100">
                  {t.letterEnvelopeTitle}
                </h3>

                <p className="mt-2 text-xs text-amber-300/70">
                  {t.letterEnvelopeTo}
                </p>

                {/* Golden Wax Seal Button */}
                <div className="mt-8 flex flex-col items-center">
                  <button
                    onClick={handleOpenEnvelope}
                    className="relative flex items-center gap-3 rounded-full bg-gradient-to-r from-red-700 via-amber-600 to-red-800 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-amber-950/80 ring-2 ring-amber-400/50 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Unlock className="h-4 w-4 text-amber-200" />
                    <span>{t.openLetterBtn}</span>
                  </button>
                  <span className="mt-3 text-[11px] text-amber-400/60 flex items-center gap-1">
                    <Lock className="h-3 w-3" /> {t.envelopeSealedHint}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Open Parchment Letter View */
            <div className="relative rounded-3xl border-2 border-amber-700/60 bg-gradient-to-b from-[#fbf4e8] to-[#f5e9d3] text-stone-900 p-6 sm:p-10 shadow-2xl shadow-red-950/80">
              {/* Tab navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300 pb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setActiveTab('dashain')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'dashain'
                        ? 'bg-amber-900 text-amber-100 shadow'
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.tabMainLetter}
                  </button>
                  <button
                    onClick={() => setActiveTab('farewell')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'farewell'
                        ? 'bg-amber-900 text-amber-100 shadow'
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.tabFarewellLetter}
                  </button>
                  <button
                    onClick={() => setActiveTab('vows')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'vows'
                        ? 'bg-amber-900 text-amber-100 shadow'
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.tabVows}
                  </button>
                  <button
                    onClick={() => setActiveTab('compose')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'compose'
                        ? 'bg-amber-900 text-amber-100 shadow'
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.tabCompose}
                  </button>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{t.resealLetter}</span>
                </button>
              </div>

              {/* Tab 1: Dashain Love Letter */}
              {activeTab === 'dashain' && (
                <div className="mt-6 font-serif">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-sans border-b border-stone-200 pb-2 mb-4">
                    <span>सिन्धुपाल्चोक, नेपाल ➔ भर्मिलियन, साउथ डकोटा</span>
                    <span>विजया दशमी २०८३</span>
                  </div>

                  <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-stone-800 font-light selection:bg-amber-200">
                    {lang === 'ne' ? defaultDashainLetterNe : defaultDashainLetterEn}
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-sans">
                    <span className="italic font-festive text-amber-900 font-semibold text-sm">
                      सुशील गिरी · सिन्धुपाल्चोक
                    </span>
                    <span className="text-red-700 font-medium">❤️ सधैँ तिम्रो साथमा</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Airport Farewell Letter */}
              {activeTab === 'farewell' && (
                <div className="mt-6 font-serif">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-sans border-b border-stone-200 pb-2 mb-4">
                    <span>त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल (TIA)</span>
                    <span className="flex items-center gap-1 text-red-700 font-medium">
                      <Plane className="h-3.5 w-3.5" /> त्यो भावुक बिदाइ
                    </span>
                  </div>

                  <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-stone-800 font-light selection:bg-amber-200">
                    {lang === 'ne' ? defaultFarewellLetterNe : defaultFarewellLetterEn}
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-sans">
                    <span className="italic font-festive text-amber-900 font-semibold text-sm">
                      अटुट प्रेम र बाचा
                    </span>
                    <span className="text-red-700 font-medium">पुनर्मिलनको व्यग्र प्रतीक्षा</span>
                  </div>
                </div>
              )}

              {/* Tab 3: The 5 Vows */}
              {activeTab === 'vows' && (
                <div className="mt-6 space-y-4 font-sans text-stone-800">
                  <h3 className="font-festive text-lg font-bold text-amber-950">
                    {lang === 'ne' ? 'सुशील र सञ्जुका ५ अजर बाचाहरू' : '5 Eternal Vows Between Sushil & Sanju'}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl border border-stone-300 bg-white/70 p-3 shadow-sm">
                      <span className="font-semibold text-red-900">
                        {lang === 'ne' ? '१. दैनिक भिडियो कल र न्यानो संवाद:' : '1. Daily Video Calls & Honest Sharing:'}
                      </span>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {lang === 'ne'
                          ? 'जतिसुकै व्यस्त भए पनि दिनको एक पटक मुहार हेरेर हाँस्ने र दिनभरिका सुखदुःख साट्ने।'
                          : 'No matter how hectic life gets, to see each other’s face daily and share every joyful and challenging moment.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-300 bg-white/70 p-3 shadow-sm">
                      <span className="font-semibold text-red-900">
                        {lang === 'ne' ? '२. अटल विश्वास र भावनात्मक सहारा:' : '2. Unwavering Trust & Emotional Support:'}
                      </span>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {lang === 'ne'
                          ? 'दूरीको डरलाई हाम्रो विश्वासले जित्ने र एकअर्काको सफलतामा सधैँ गर्व गर्ने।'
                          : 'To conquer any distance with profound faith and always be each other’s greatest cheerleader.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-300 bg-white/70 p-3 shadow-sm">
                      <span className="font-semibold text-red-900">
                        {lang === 'ne' ? '३. जमरा र सिन्दूरको बाचा:' : '3. The Jamara & Tika Promise:'}
                      </span>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {lang === 'ne'
                          ? 'यो भर्चुअल टीका साँचो मिलनमा बदलिनेछ र अर्को दशैँ सिन्धुपाल्चोकमा सँगै मनाइनेछ।'
                          : 'This virtual celebration will transform into reality when we stand together for Tika under one roof.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-300 bg-white/70 p-3 shadow-sm">
                      <span className="font-semibold text-red-900">
                        {lang === 'ne' ? '४. साउथ डकोटा र नेपालको एक धड्कन:' : '4. One Heartbeat Across Time Zones:'}
                      </span>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {lang === 'ne'
                          ? '१० घण्टा ४५ मिनेटको समय अन्तर केवल घडीको सियो हो, हाम्रो मुटु त सँगै धड्किन्छ।'
                          : 'The 10 hour 45 minute time difference is only clock hands; our heartbeats remain synchronized.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-stone-300 bg-white/70 p-3 shadow-sm">
                      <span className="font-semibold text-red-900">
                        {lang === 'ne' ? '५. कहिल्यै हात नछोड्ने सङ्कल्प:' : '5. Never Letting Go:'}
                      </span>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {lang === 'ne'
                          ? 'हरेक कठिन मोडमा एकअर्काको ढाडस बन्ने र सधैँभरि एकअर्काको मात्र भएर बाँच्ने।'
                          : 'To stay resilient through every season and emerge hand in hand into our shared future.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Compose / Response */}
              {activeTab === 'compose' && (
                <form onSubmit={handleSaveCustomNote} className="mt-6 font-sans">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-amber-950">
                      {lang === 'ne' ? 'सञ्जु वा सुशीलको तर्फबाट सन्देश थप्नुहोस्:' : 'Write a Response (from Sanju or Sushil):'}
                    </label>
                    {justSaved && (
                      <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <Check className="h-3.5 w-3.5" /> {lang === 'ne' ? 'पत्र सन्दुकमा सुरक्षित भयो!' : 'Saved to letterbox!'}
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={8}
                    value={composeText}
                    onChange={(e) => setComposeText(e.target.value)}
                    className="w-full rounded-2xl border border-stone-300 bg-white p-4 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    placeholder={lang === 'ne' ? 'यहाँ आफ्नो भावना लेख्नुहोस्...' : 'Write your emotional heartfelt message here...'}
                  />
                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-amber-900 px-5 py-2.5 text-xs font-semibold text-amber-100 hover:bg-amber-800 shadow transition-colors"
                    >
                      <Feather className="h-4 w-4" />
                      <span>{lang === 'ne' ? 'सन्देश सुरक्षित गर्नुहोस्' : 'Save & Seal Letter'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
