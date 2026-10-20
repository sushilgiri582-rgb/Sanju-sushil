import React, { useState, useRef } from 'react';
import {
  Coffee,
  Heart,
  Flame,
  Moon,
  Bike,
  Mountain,
  Video,
  Compass,
  Utensils,
  PlaneTakeoff,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Play,
  Upload,
  RotateCcw,
  Check
} from 'lucide-react';
import { Language, translations } from '../translations';
import { festiveAudio } from '../utils/audio';
import { processMediaFile } from '../utils/imageStorage';

interface StoryTimelineProps {
  lang: Language;
  customPhotos: Record<string, string>;
  customMediaTypes?: Record<string, boolean>;
  onUpdatePhoto: (slotId: string, photoUrl: string, isVideo?: boolean, blob?: Blob) => void;
  onResetPhoto: (slotId: string) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  lang,
  customPhotos,
  customMediaTypes,
  onUpdatePhoto,
  onResetPhoto,
}) => {
  const t = translations[lang];
  const [activeStoryId, setActiveStoryId] = useState<string>('thimi');
  const [uploadToast, setUploadToast] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const timelineEvents = [
    {
      id: 'thimi',
      icon: Coffee,
      dateNe: 'शुरुवाती मिठा दिनहरू',
      dateEn: 'The Humble Beginning',
      locationNe: 'थिमि, भक्तपुर',
      locationEn: 'Thimi, Bhaktapur',
      titleNe: 'पहिलो चिया भेट',
      titleEn: 'First Tea Meetup at Thimi',
      quoteNe: '‘नबोली नबोली चियाको कप समातेर एकअर्कालाई हेरेको त्यो पहिलो पल—जहाँबाट हाम्रो जिन्दगीको कथा सुरु भयो।’',
      quoteEn: '“Holding steaming tea cups with nervous glances—the quiet afternoon where our lifelong story began.”',
      descNe: 'थिमिको सानो चिया पसलमा भएको हाम्रो पहिलो भेट। आँखा जुध्दाको त्यो लाज, मनभित्रको कम्पन र तातो चियाको बाफसँगै सुरु भएको मीठो कुराकानी। पहिलो पटक सञ्जुको मुसुक्क हाँसो देख्दा सुशीललाई लागेको थियो—यो मान्छे मेरो जीवनमा सधैँ रहनुपर्छ।',
      descEn: 'A cozy local tea stall in Thimi, Bhaktapur. Steaming cups of Nepali milk tea, nervous glances, and warm laughter that melted all hesitation. That very afternoon, Sushil knew there was something extraordinary about Sanju.',
      tagNe: 'पहिलो भेट',
      tagEn: 'First Meetup',
      emoji: '☕',
      defaultImageUrl: '/assets/aistudio/IMG_0899_d2f27d0c.jpeg',
    },
    {
      id: 'dakshinkali',
      icon: Heart,
      dateNe: 'पारिवारिक सहमतिपछिको यात्रा',
      dateEn: 'Blessings & Consent',
      locationNe: 'दक्षिणाकाली मन्दिर, फर्पिङ',
      locationEn: 'Dakshinkali Temple, Pharping',
      titleNe: 'दक्षिणाकाली मन्दिरको दर्शन र हात समातेको क्षण',
      titleEn: 'Dakshinkali Temple Trip (Parental Consent & Hand-in-Hand)',
      quoteNe: '‘परिवारको सहमति लिएर दक्षिणाकाली मन्दिर पुग्दा, तिम्रो हात समातेर मागेका हरेक प्रार्थनाहरू आज पनि मेरो मुटुमा छन्।’',
      quoteEn: '“Going with her parents’ consent and blessings, holding hands along the temple stairs, silently praying for our future.”',
      descNe: 'सञ्जुका आमाबुवासँग राम्रोसँग अनुमति र सहमति लिएर गरिएको दक्षिणाकालीको विशेष यात्रा। मन्दिरको शान्त वातावरण, भगवान्को दर्शन गर्दा मागेका आत्मीय प्रार्थनाहरू र यात्राभरि एकअर्काको हात मायाले कसेर समातेको त्यो पवित्र क्षण। यो यात्राले हाम्रो सम्बन्धलाई झन् परिपक्व र गहिरो बनाइदियो।',
      descEn: 'Taking the journey to Dakshinkali Temple after respectfully receiving consent and blessings from her parents. Standing together in reverence, offering prayers for our health and union, and holding hands tightly as we walked down the stone temple steps.',
      tagNe: 'पवित्र यात्रा',
      tagEn: 'Temple Pilgrimage',
      emoji: '🙏',
      defaultImageUrl: '/assets/aistudio/IMG_2701_cfbc95f5.jpeg',
    },
    {
      id: 'suryabinayak',
      icon: Flame,
      dateNe: 'दियोको उज्यालोमा',
      dateEn: 'Sacred Flames',
      locationNe: 'सूर्यविनायक मन्दिर, भक्तपुर',
      locationEn: 'Suryabinayak Temple, Bhaktapur',
      titleNe: 'सूर्यविनायक मन्दिरमा सँगै दियो प्रज्वलन',
      titleEn: 'Lighting Holy Diyas at Suryabinayak Temple',
      quoteNe: '‘सूर्यविनायकमा तिमी र मैले सँगै बालेका ती पवित्र दियोहरूले हाम्रो प्रेमको बाटो सधैँ उज्यालो बनाइरहनेछन्।’',
      quoteEn: '“The sacred oil lamps we lit together at Suryabinayak continue to illuminate our love across the continents.”',
      descNe: 'भक्तपुरको प्रख्यात सूर्यविनायक गणेश मन्दिरमा पुगेर दुवैजनाले सँगै दियो बालेको त्यो आध्यात्मिक साँझ। दियोको तातो ज्वाला र तेलको सुगन्धबीच एकअर्काको दीर्घायु, सफलता र छिटो पुनर्मिलनका लागि गरिएका ती मौन सङ्कल्पहरू।',
      descEn: 'Visiting the revered Suryabinayak Temple in Bhaktapur at dusk. Cupping our hands around traditional clay oil lamps, lighting the wicks together, and offering sincere silent prayers for each other’s happiness, peace, and lifelong togetherness.',
      tagNe: 'दियो प्रज्वलन',
      tagEn: 'Sacred Diyas',
      emoji: '🪔',
      defaultImageUrl: '/assets/aistudio/IMG_4168_ad0d4fd7.jpeg',
    },
    {
      id: 'monkey_temple',
      icon: Moon,
      dateNe: 'कलंकीको त्यो विशेष साँझ',
      dateEn: 'Magical Twilight',
      locationNe: 'मङ्की टेम्पल रिसोर्ट, कलंकी',
      locationEn: 'Monkey Temple Resort, Kalanki',
      titleNe: 'मङ्की टेम्पल रिसोर्टको रोमान्टिक साँझ र सरप्राइज',
      titleEn: 'Romantic Night at Monkey Temple Resort (Birthday & Flight Surprise)',
      quoteNe: '‘कलंकीमाथिको त्यो रमणीय दृश्य, तिम्रो आउँदो जन्मदिन र अमेरिकाको उडानअघि मैले दिएको त्यो विशेष सरप्राइज!’',
      quoteEn: '“Perched above Kalanki at Monkey Temple Resort, celebrating an advance surprise for your birthday and upcoming flight.”',
      descNe: 'सञ्जुको नजिकिँदै गरेको जन्मदिन र अमेरिकाको उडान (Flight) लाई लक्षित गरी सुशीलले दिएको अग्रिम सरप्राइज। कलंकीमाथिको मङ्की टेम्पल रिसोर्टको शान्त र रोमान्टिक परिवेश, सहरका झिलिमिली बत्तीहरू हेर्दै गरिएको गफ र एकअर्काको आँखामा हराएका त्यो जादुयी साँझ।',
      descEn: 'A memorable evening planned by Sushil at Monkey Temple Resort high above Kalanki. An advance celebration and surprise gift honoring Sanju’s upcoming birthday and impending flight to America. Looking over the glittering Kathmandu valley lights, sharing heartfelt confessions.',
      tagNe: 'विशेष सरप्राइज',
      tagEn: 'Birthday Surprise',
      emoji: '✨',
      defaultImageUrl: '/assets/aistudio/IMG_5129_207a3ce3.jpeg',
    },
    {
      id: 'gundu',
      icon: Bike,
      dateNe: 'हाँसो र एड्भेन्चर',
      dateEn: 'Hilarious Adventure',
      locationNe: 'गुण्डु, भक्तपुर',
      locationEn: 'Gundu, Bhaktapur',
      titleNe: 'गुण्डुको रमाइलो ‘ट्रिपल-राइडिङ’ र ट्राफिक जरिवाना!',
      titleEn: 'Gundu Triple-Riding Adventure & Traffic Fine!',
      quoteNe: '‘एउटै बाइकमा हामी तीनजना गुण्डु जाँदा ट्राफिकले समातेर चिट काटेको त्यो रमाइलो क्षण—जरिवाना तिर्दा पनि हामी कति हाँसेका थियौँ!’',
      quoteEn: '“Three of us on a single motorcycle heading to Gundu, getting caught and fined by traffic police—and laughing our hearts out anyway!”',
      descNe: 'जीवनकै सबैभन्दा रमाइलो र अविस्मरणीय दिन! सुशील, सञ्जु र सञ्जुकी मिल्ने साथी गरी तीनजना एउटै बाइकमा चढेर गुण्डुतर्फ हुइँकिएका थियौँ। बाटोमा ट्राफिक प्रहरीले समातेर चिट काट्दा पनि तीनैजना पेट मिचीमिची हाँसेका थियौँ। त्यो जरिवानाको रसिद आज पनि हाम्रो प्रेमको एउटा मीठो रमाइलो सम्झना बनेर बसेको छ।',
      descEn: 'One of the most hilarious, unforgettable days of our story! Three of us—Sushil, Sanju, and her best friend—hopped onto a single bike heading toward the scenic greenery of Gundu. When traffic police pulled us over and issued a fine for triple riding, we could not stop laughing. Even the ticket became a badge of our youthful, carefree adventures!',
      tagNe: 'अविस्मरणीय रमाइलो',
      tagEn: 'Adventure & Laughs',
      emoji: '🛵',
      defaultImageUrl: '/assets/aistudio/IMG_5143_b6a5e2a5.jpeg',
    },
    {
      id: 'nagarkot',
      icon: Mountain,
      dateNe: 'कुहिरो र कफीको चुस्की',
      dateEn: 'Misty Hilltop Ride',
      locationNe: 'नगरकोट, भक्तपुर',
      locationEn: 'Nagarkot, Bhaktapur',
      titleNe: 'नगरकोटको कफी र विदेशी पर्यटकले खिचिदिएको तस्बिर',
      titleEn: 'Nagarkot Coffee in Glass Cups & The Foreigner Tourist Photo',
      quoteNe: '‘गिलासको कफी समातेर नगरकोटको चिसोमा बाइक कुदाउँदा, तिमीले विदेशी पर्यटकसँग फरर अङ्ग्रेजी बोलेर खिचाएको त्यो तस्बिर!’',
      quoteEn: '“Balancing hot coffee in glass cups up the winding hills, and Sanju speaking fluent English to a foreign tourist to capture our foggy couple picture.”',
      descNe: 'नगरकोटको उकालोमा सिसाको गिलासमा तातो कफी समातेर गरिएको त्यो रोमान्टिक बाइक यात्रा। डाँडामा पुग्दा हुस्सु र कुहिरोले ढाकेको थियो। सञ्जुले निर्धक्कसाथ त्यहाँ भेटिएका विदेशी पर्यटकसँग फरर अङ्ग्रेजीमा कुरा गरेर हाम्रो सुन्दर कपल तस्बिर खिचाएकी थिइन्। सञ्जुको त्यो प्रतिभा र आत्मविश्वास देख्दा सुशीलको मन गर्वले भरिएको थियो।',
      descEn: 'Riding up the winding road to Nagarkot while gingerly balancing hot coffee in real glass cups! Upon arriving at the breezy, cloud-swept viewpoint, Sanju effortlessly spoke fluent, polished English to an international tourist, asking them to capture our misty couple photo. Watching her intelligence and charisma filled Sushil with awe and pride.',
      tagNe: 'गौरव र सम्झना',
      tagEn: 'Nagarkot Hills',
      emoji: '☕',
      defaultImageUrl: '/assets/aistudio/IMG_6241_45246cec.jpeg',
    },
    {
      id: 'recharge_surprise',
      icon: Video,
      dateNe: 'गोप्य सरप्राइज र भिडियो',
      dateEn: 'Doorstep Video Surprise',
      locationNe: 'सञ्जुको घरबाहिर',
      locationEn: "Outside Sanju's House",
      titleNe: '‘रिचार्ज कार्ड’ सरप्राइज भिडियो',
      titleEn: 'The ‘Recharge Card’ Doorstep Surprise Video',
      quoteNe: '‘"रिचार्ज कार्ड चाहियो" भनेर तिम्रो घरबाहिर पुगी भिडियो खिचेर सरप्राइज दिएको त्यो अविस्मरणीय क्षण!’',
      quoteEn: '“Pretending I urgently needed a recharge card outside your home, capturing your pure shock on secret video!”',
      descNe: 'सुशील सुटुक्क सञ्जुको घरबाहिर पुग्यो र फोन गरेर "मलाई एउटा रिचार्ज कार्ड चाहियो, बाहिर आउनू न" भनी बोलायो। सञ्जु बाहिर निस्किँदा सुशीललाई अगाडि क्यामेरासहित देख्दाको त्यो अचम्मित, लजालु र खुशीले भरिएको मुस्कान भिडियोमा कैद भयो। त्यो क्षण हाम्रो प्रेमको सबैभन्दा मीठो सरप्राइज बन्यो।',
      descEn: 'Sushil secretly showed up right outside Sanju’s house, calling her phone pretending he urgently needed a "mobile recharge card." When she stepped outside to hand it over and saw him standing there holding his camera with a grin, her shocked, beautiful expression was captured on video!',
      tagNe: 'गोप्य भिडियो',
      tagEn: 'Surprise Video',
      emoji: '🎥',
      defaultImageUrl: '/assets/aistudio/att.tUi6LSTkCJudg0AuvNNL57g8woFA7dVRQDaRFB95jCk_b548ba2d.mp4',
      isVideo: true,
    },
    {
      id: 'family_hangout',
      icon: Compass,
      dateNe: 'गोप्य यात्रा र साहस',
      dateEn: 'Family-Secret Roadtrip',
      locationNe: 'उपत्यकाका डाँडाहरू',
      locationEn: 'Valley Hilltops & Backroads',
      titleNe: 'घरमा ढाँटेर हिँडेको त्यो आत्मीय गोप्य यात्रा',
      titleEn: 'The Family-Secret Hangout & Roadtrip',
      quoteNe: '‘त्यो सरप्राइज भिडियोपछि घरमा सानो मायालु बहाना बनाएर तिमी मसँग दिनभर घुम्न निस्किएको त्यो साहसी क्षण!’',
      quoteEn: '“Right after that surprise video, making up a little loving excuse to her family so we could sneak away for an unforgettable private day trip!”',
      descNe: 'रिचार्ज कार्ड सरप्राइज भिडियो खिचेको केही बेरमै सञ्जुले घरमा सानो मायालु बहाना बनाएर सुशीलसँग दिनभरका लागि यात्रामा निस्किएकी थिइन्। बाइकमा उपत्यकाका हरियाली डाँडाहरू घुम्दै, चिया खाँदै, भविष्यका सपनाहरू साट्दै बिताएको त्यो दिन हाम्रो प्रेमको सबैभन्दा साहसी, रमाइलो र आत्मिक दिन थियो।',
      descEn: 'Right after the doorstep recharge card surprise, Sanju crafted a clever, loving excuse to her family so she could take Sushil out travelling for the entire day. Cruising along peaceful scenic valley hilltops, drinking roadside tea, and talking about forever—one of the most courageous and intimate chapters of our love.',
      tagNe: 'गोप्य यात्रा',
      tagEn: 'Secret Hangout',
      emoji: '🌿',
      defaultImageUrl: '/assets/aistudio/IMG_2701_cfbc95f5.jpeg',
    },
    {
      id: 'picnic',
      icon: Utensils,
      dateNe: 'हाम्रो निजी पिकनिक',
      dateEn: 'First Couple Picnic',
      locationNe: 'उपत्यकाको शान्त डाँडा',
      locationEn: 'Quiet Hilltop Spot',
      titleNe: 'हाम्रो पहिलो कपल पिकनिक (चटपटे र पानीपुरी)',
      titleEn: 'Our Very First Couple Picnic (Chatpate & Panipuri Treats)',
      quoteNe: '‘घरबाटै चटपटे र पानीपुरी प्याक गरेर डाँडामा बसेर खाएको हाम्रो पहिलो निजी पिकनिक—संसारकै सबैभन्दा मीठो भोजन!’',
      quoteEn: '“Packing homemade spicy chatpate and panipuri to enjoy under the trees—our very first exclusive couple picnic.”',
      descNe: 'साथीभाइ वा परिवारको भीडबिना, केवल हामी दुईजना मात्र मिलेर गरिएको पहिलो पिकनिक! घरबाटै चटपटेको मसला, भुजा, अमिलो पानीपुरी र मीठा खाजाहरू झोलामा प्याक गरी शान्त डाँडामा पुगेका थियौँ। चौरमा बसेर एकअर्कालाई खुवाउँदै, जीवनका सुखदुःख साट्दै बिताएको त्यो दिन साँचो आनन्दको परिभाषा थियो।',
      descEn: 'Our very first couple picnic with nobody else around—just the two of us. We lovingly prepared and packed tangy, spicy chatpate, panipuri, and special snacks from home. Sitting on the grass under quiet trees, hand-feeding each other, and laughing with spice on our tongues and joy in our hearts.',
      tagNe: 'कपल पिकनिक',
      tagEn: 'Couple Picnic',
      emoji: '🧺',
      defaultImageUrl: '/assets/aistudio/IMG_6223_792c27d2.jpeg',
    },
    {
      id: 'airport_farewell',
      icon: PlaneTakeoff,
      dateNe: 'बिदाइको त्यो कालो दिन',
      dateEn: 'The Departure Afternoon',
      locationNe: 'त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल (TIA)',
      locationEn: 'Tribhuvan International Airport',
      titleNe: 'विमानस्थलको भावुक बिदाइ र बाथरुमको मौन आँसु',
      titleEn: 'Airport Farewell: The Farewell Letter & Silent Tears',
      quoteNe: '‘तिम्रो हातमा बिदाइको चिठी थमाइदिएर तिम्रो अगाडि मुटु थिचेर मुस्कुराएँ; तिमी भित्र छिर्नासाथ विमानस्थलको बाथरुममा एक्लै गएर भक्कानिएर रोएको त्यो पीडा केवल मलाई र ईश्वरलाई थाहा छ।’',
      quoteEn: '“Handing you the farewell letter, I swallowed my tears and smiled so you wouldn’t leave heartbroken; the moment you stepped in, I rushed into the airport bathroom to weep alone in silent, shattering pain.”',
      descNe: 'त्रिभुवन अन्तर्राष्ट्रिय विमानस्थलको प्रस्थान कक्ष। सुटकेस गुडाउँदै गर्दा अन्तिम पटक हात समातेको त्यो क्षण। सुशीलले आफ्नो मुटुको सबै माया र भावना पोखेर लेखेको ‘बिदाइ पत्र’ सञ्जुको हातमा थमायो। सञ्जुलाई कमजोर नबनाउन सुशीलले आफ्ना सबै आँसु भित्रै थुनेर मुसुक्क हाँस्ने कोसिस गर्‍यो। तर जब सञ्जु सुरक्षा जाँचतर्फ अघि बढी, सुशीलले आफूलाई सम्हाल्न सकेन—हतारिँदै विमानस्थलको बाथरुमभित्र छिरेर ढोका थुनी एक्लै भक्कानिएर रोयो। त्यो मौन, छाती चिरिने रुवाइ केवल सञ्जुप्रतिको साँचो र निस्वार्थ प्रेमको प्रमाण थियो।',
      descEn: 'Tribhuvan International Airport departure hall. Luggage rolling across the floor and fingers holding on until the final second. Sushil handed Sanju the deeply emotional farewell letter he had poured his soul into writing. Refusing to burden her or make her departure heavier, he swallowed back every tear and smiled gently for her. But the exact moment Sanju stepped through the security checkpoint and waved goodbye, he could no longer hold the agony—he excused himself, hurried into the airport bathroom, locked the stall, and wept silently and uncontrollably alone.',
      tagNe: 'अविस्मरणीय बिदाइ',
      tagEn: 'Tearful Farewell',
      emoji: '✈️',
      defaultImageUrl: '/assets/aistudio/IMG_5765_3c1b569e.jpeg',
    },
    {
      id: 'healing_bond',
      icon: Sparkles,
      dateNe: 'दैनिक कल र अटुट प्रेम',
      dateEn: 'Today, Tomorrow & Forever',
      locationNe: 'सिन्धुपाल्चोक ➔ भर्मिलियन, साउथ डकोटा',
      locationEn: 'Sindhupalchok ➔ Vermillion, SD',
      titleNe: 'साउथ डकोटाको पार्सल, दैनिक भिडियो कल र अटुट विश्वास',
      titleEn: 'South Dakota Parcel, Daily Video Calls & Unbreakable Bond',
      quoteNe: '‘१० घण्टा ४५ मिनेटको समय अन्तर भए पनि हरेक बिहान र साँझको भिडियो कलमा मुस्कुराउने तिम्रो मुहार नै मेरो जीवनको सबैभन्दा ठूलो शक्ति हो।’',
      quoteEn: '“Conquering the 10h 45m time difference with daily video calls, unboxing Nepali parcels, and building our bridge toward our forever reunion.”',
      descNe: 'नेपालबाट पठाइएको मायाको पार्सल साउथ डकोटाको कोठामा पुग्दा भिडियो कलमा सँगै रोएको र हाँसेको पल। दैनिक बिहान-साँझको भिडियो कल, एकअर्कालाई दिइने मानसिक सहारा र आजको यो भर्चुअल दशैँ टीका। दूरीले हाम्रो शरीरलाई मात्र टाढा बनाएको हो, हाम्रो मुटु त झन् बलियो बन्दै गएको छ।',
      descEn: 'The emotional video call when the parcel of Nepali spices, local tea, and handwritten letters arrived at Sanju’s desk in South Dakota. Talking across time zones morning and night, cheering each other through exams and hardships, celebrating this virtual Dashain, and counting down the days until we embrace again at the airport.',
      tagNe: 'अटुट प्रेम',
      tagEn: 'Endless Devotion',
      emoji: '❤️',
      defaultImageUrl: '/assets/aistudio/IMG_6241_45246cec.jpeg',
    }
  ];

  const currentEvent = timelineEvents.find((e) => e.id === activeStoryId) || timelineEvents[0];
  const currentMediaUrl = customPhotos[currentEvent.id] || currentEvent.defaultImageUrl;
  const isCustomMedia = !!customPhotos[currentEvent.id];
  const isVideo = isCustomMedia
    ? (customMediaTypes?.[currentEvent.id] ?? false)
    : (currentEvent.isVideo ?? false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await processMediaFile(file);
        onUpdatePhoto(currentEvent.id, processed.url, processed.isVideo, processed.blob);
        setUploadToast(
          lang === 'ne'
            ? `‘${currentEvent.titleNe}’ को ${processed.isVideo ? 'भिडियो' : 'तस्बिर'} सफलतापूर्वक परिवर्तन भयो!`
            : `${processed.isVideo ? 'Video' : 'Photo'} updated for ‘${currentEvent.titleEn}’!`
        );
        setTimeout(() => setUploadToast(''), 3500);
      } catch (err) {
        console.error('Error processing media file:', err);
      }
    }
  };

  return (
    <section id="story-timeline" className="relative scroll-mt-20 py-16 sm:py-24">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(180,83,9,0.14),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>{t.timelineKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Sushil Giri &amp; Sanju</span>
          </div>
          <h2 className="font-festive mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100">
            {t.timelineTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
            {t.timelineDesc}
          </p>
        </div>

        {/* Success toast notification */}
        {uploadToast && (
          <div className="mt-6 max-w-md mx-auto rounded-2xl border border-emerald-500/80 bg-emerald-950/90 p-3 text-center text-xs font-medium text-emerald-200 shadow-xl flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{uploadToast}</span>
          </div>
        )}

        {/* Interactive Story Timeline Stepper */}
        <div className="mt-10 max-w-5xl mx-auto">
          {/* Horizontal scrollable milestone tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {timelineEvents.map((evt) => {
              const isSelected = evt.id === activeStoryId;
              const hasCustom = !!customPhotos[evt.id];
              return (
                <button
                  key={evt.id}
                  onClick={() => setActiveStoryId(evt.id)}
                  className={`group relative flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'border-amber-500 bg-gradient-to-r from-red-700 to-amber-700 text-white shadow-lg shadow-red-950 scale-105'
                      : 'border-amber-900/50 bg-[#1a0508]/80 text-amber-300/70 hover:border-amber-700 hover:text-amber-100'
                  }`}
                >
                  <span className="text-base">{evt.emoji}</span>
                  <span>{lang === 'ne' ? evt.titleNe : evt.titleEn}</span>
                  {hasCustom && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/40" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Milestone Spotlight Card */}
          <div className="mt-8 relative rounded-3xl border-2 border-amber-700/60 bg-gradient-to-br from-[#2c080d] via-[#1d0407] to-[#120204] p-6 sm:p-10 shadow-2xl overflow-hidden">
            {/* Header with Title, Location, and Upload/Change Photo Action */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-amber-900/60">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-amber-600 border border-amber-400/50 text-2xl shadow-xl shadow-red-950 shrink-0">
                  {currentEvent.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    <span>{lang === 'ne' ? currentEvent.tagNe : currentEvent.tagEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-amber-300/80">
                      <MapPin className="h-3 w-3 text-red-400" />
                      {lang === 'ne' ? currentEvent.locationNe : currentEvent.locationEn}
                    </span>
                    {isCustomMedia && (
                      <span className="rounded-full bg-emerald-950/80 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-600/60 font-mono">
                        {isVideo ? t.customMediaBadge : t.customPhotoBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-festive mt-1 text-2xl sm:text-3xl font-bold text-amber-100">
                    {lang === 'ne' ? currentEvent.titleNe : currentEvent.titleEn}
                  </h3>
                </div>
              </div>

              {/* Upload/Change Photo & Video Buttons in Spotlight Header */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                {/* Hidden File Input supporting both images and videos */}
                <input
                  type="file"
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-full border border-amber-500/70 bg-gradient-to-r from-red-800 to-amber-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110 active:scale-95 transition-all"
                  title={t.photoSlotHint}
                >
                  <Upload className="h-3.5 w-3.5 text-amber-200" />
                  <span>{t.changePhotoBtn}</span>
                </button>

                {isCustomMedia && (
                  <button
                    onClick={() => onResetPhoto(currentEvent.id)}
                    className="flex items-center gap-1 rounded-full border border-amber-800/60 bg-[#1f0508] px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-100 hover:border-amber-600 transition-colors"
                    title={t.resetPhotoBtn}
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span className="hidden sm:inline">{t.resetPhotoBtn}</span>
                  </button>
                )}

                <div className="rounded-full bg-amber-950/80 px-3 py-1.5 border border-amber-700/50 text-xs text-amber-300 font-mono">
                  {lang === 'ne' ? currentEvent.dateNe : currentEvent.dateEn}
                </div>
              </div>
            </div>

            {/* Prominently Highlighted Real Couple Photo or Video for this Milestone */}
            {currentMediaUrl && (
              <div className="mt-6 relative rounded-2xl overflow-hidden border-2 border-amber-700/60 shadow-2xl group bg-black/60">
                {isVideo ? (
                  <div className="relative">
                    <video
                      key={currentMediaUrl}
                      src={currentMediaUrl}
                      controls
                      playsInline
                      loop
                      className="w-full max-h-80 sm:max-h-96 object-cover mx-auto bg-black"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-950/90 text-white px-3 py-1 rounded-full text-xs font-semibold border border-amber-400/50 shadow pointer-events-none backdrop-blur-sm">
                      <Play className="h-3.5 w-3.5 fill-current text-amber-300" />
                      <span>
                        {isCustomMedia
                          ? (lang === 'ne' ? 'तपाईँको भिडियो क्लिप' : 'Your Custom Video')
                          : (lang === 'ne' ? 'गोप्य सरप्राइज भिडियो' : 'Secret Surprise Video')}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1 bg-red-950/85 hover:bg-red-800 px-3 py-1.5 rounded-full backdrop-blur-sm border border-amber-500/50 text-xs font-medium text-amber-200 transition-colors shadow"
                        title={t.videoSlotHint}
                      >
                        <Upload className="h-3 w-3" />
                        <span>{t.changeVideoBtn}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={currentMediaUrl}
                      alt={currentEvent.titleEn}
                      className="w-full max-h-80 sm:max-h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Bottom bar overlay */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-amber-200">
                      <span className="flex items-center gap-1.5 font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/40">
                        <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
                        <span>
                          {isCustomMedia
                            ? (lang === 'ne' ? 'तपाईँले राख्नुभएको तस्बिर' : 'Your Custom Uploaded Photo')
                            : (lang === 'ne' ? 'हाम्रो वास्तविक सम्झना' : 'Our Real Memory')}
                        </span>
                      </span>

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1 bg-red-950/80 hover:bg-red-900 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/40 text-amber-200 transition-colors"
                      >
                        <Upload className="h-3 w-3" />
                        <span>{t.changePhotoBtn}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Emotional Quote Callout */}
            <div className="mt-6 rounded-2xl border border-amber-800/60 bg-[#160305]/90 p-4 sm:p-5">
              <p className="font-serif italic text-base sm:text-lg text-amber-200 text-center leading-relaxed">
                {lang === 'ne' ? currentEvent.quoteNe : currentEvent.quoteEn}
              </p>
            </div>

            {/* In-depth Narrative */}
            <div className="mt-6 text-sm sm:text-base text-amber-100/90 leading-relaxed font-light space-y-3">
              <p>{lang === 'ne' ? currentEvent.descNe : currentEvent.descEn}</p>
            </div>

            {/* Footer with emotional couple note */}
            <div className="mt-8 pt-4 border-t border-amber-900/60 flex flex-wrap items-center justify-between text-xs text-amber-300/80">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>{lang === 'ne' ? 'सुशील गिरी र सञ्जुको साँचो माया' : 'True Love Story of Sushil Giri & Sanju'}</span>
              </span>
              <span className="italic font-mono text-[11px] text-amber-400/60">
                Sindhupalchok ➔ Vermillion, SD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
