export type Language = 'ne' | 'en';

export interface Translations {
  brandTitle: string;
  brandSubtitle: string;
  navTika: string;
  navDistance: string;
  navTimeline: string;
  navLetter: string;
  navGallery: string;
  navDiya: string;
  playMusic: string;
  playingMusic: string;
  
  // Hero
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  sushilBadge: string;
  sanjuBadge: string;
  startTikaBtn: string;
  trackDistanceBtn: string;
  sindhupalchokCardTitle: string;
  sindhupalchokCardSub: string;
  sindhupalchokTimezone: string;
  sindhupalchokStatus: string;
  vermillionCardTitle: string;
  vermillionCardSub: string;
  vermillionTimezone: string;
  vermillionStatus: string;

  // Tika
  tikaKicker: string;
  tikaTitle: string;
  tikaDesc: string;
  blessingFrom: string;
  foreheadLabel: string;
  foreheadSub: string;
  pujaThaliTitle: string;
  pujaThaliHint: string;
  stepDiya: string;
  stepDiyaDone: string;
  stepTika: string;
  stepTikaDone: string;
  stepJamara: string;
  stepJamaraDone: string;
  showerBlessingBtn: string;
  ritualComplete: string;
  stepCounter: string;
  ashirwadTitle: string;
  ringGhanti: string;
  stotraSub: string;
  letterToSanjuTitle: string;
  letterToSanjuP1: string;
  letterToSanjuP2: string;
  letterToSanjuP3: string;
  letterToSanjuP4: string;
  copyBlessingBtn: string;
  copiedBlessingMsg: string;

  // Distance
  distanceKicker: string;
  distanceTitle: string;
  distanceDesc: string;
  originTitle: string;
  destinationTitle: string;
  diffSkiesOneHeart: string;
  timeDiffTitle: string;
  timeDiffValue: string;
  timeDiffSub: string;
  distanceKm: string;
  distanceMiles: string;
  tokenTitle: string;
  tokenValue: string;
  tokenSub: string;
  bondTitle: string;
  bondValue: string;
  bondSub: string;
  reunionCountdownTitle: string;
  days: string;
  hours: string;
  mins: string;
  secs: string;
  reunionSub: string;
  changeDate: string;
  updateDate: string;

  // Timeline
  timelineKicker: string;
  timelineTitle: string;
  timelineDesc: string;

  // Love Letter
  letterKicker: string;
  letterTitle: string;
  letterDesc: string;
  letterEnvelopeTitle: string;
  letterEnvelopeTo: string;
  openLetterBtn: string;
  envelopeSealedHint: string;
  tabMainLetter: string;
  tabFarewellLetter: string;
  tabVows: string;
  tabCompose: string;
  resealLetter: string;

  // Gallery
  galleryKicker: string;
  galleryTitle: string;
  galleryDesc: string;
  addPhotoBtn: string;
  uploadBatchBtn: string;
  gdriveHint: string;
  videoClipTitle: string;
  videoClipSub: string;
  changePhotoBtn: string;
  changeVideoBtn: string;
  uploadPhotoOrVideoBtn: string;
  resetPhotoBtn: string;
  photoUpdatedToast: string;
  photoSlotHint: string;
  videoSlotHint: string;
  customPhotoBadge: string;
  customMediaBadge: string;

  // Diya
  diyaKicker: string;
  diyaTitle: string;
  diyaDesc: string;
  diyaAltarTitle: string;
  makeWishBtn: string;
  dakshinaTitle: string;
  dakshinaSub: string;

  // Footer
  footerGreeting: string;
  footerDedication: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  ne: {
    brandTitle: 'सुशील र सञ्जु',
    brandSubtitle: 'दशैँ मिलन',
    navTika: 'टीका र आशीर्वाद',
    navDistance: 'दूरी र समय',
    navTimeline: 'हाम्रो कथा',
    navLetter: 'प्रेम र बिदाइ पत्र',
    navGallery: 'तस्बिर तथा भिडियो',
    navDiya: 'दियो र दक्षिणा',
    playMusic: 'मालश्री धुन बजाउनुहोस्',
    playingMusic: 'मालश्री गुञ्जिरहेको छ',

    // Hero
    heroKicker: 'विजया दशमी २०८३ · सात समुद्रपारिको माया',
    heroTitle: 'सिन्धुपाल्चोकदेखि साउथ डकोटासम्म, हाम्रो अटुट दशैँ',
    heroSubtitle: 'हजारौँ माइल र महासागरले हामीलाई टाढा राखे पनि, हाम्रो मुटु एउटै छ, प्रार्थना एउटै छ र यो दशैँको रातो अक्षताले हामीलाई अझ नजिक बाँधेको छ।',
    sushilBadge: 'सुशील गिरी · सिन्धुपाल्चोक',
    sanjuBadge: 'सञ्जु · भर्मिलियन, साउथ डकोटा',
    startTikaBtn: 'भर्चुअल टीका ग्रहण गर्नुहोस्',
    trackDistanceBtn: 'हाम्रो दूरी र समय हेर्नुहोस्',
    sindhupalchokCardTitle: 'सिन्धुपाल्चोक, नेपाल',
    sindhupalchokCardSub: 'सुशीलको जन्मभूमि · पहेंलो जमरा र हिमालको काख',
    sindhupalchokTimezone: 'नेपाल समय (NPT · UTC+5:45)',
    sindhupalchokStatus: 'शरद ऋतुको बिहानी · दशैँको रौनकता',
    vermillionCardTitle: 'भर्मिलियन, साउथ डकोटा, अमेरिका',
    vermillionCardSub: 'सञ्जुको अध्ययन भूमि · टाढाबाट तिमीलाई सम्झिँदै',
    vermillionTimezone: 'केन्द्रीय समय (CDT · UTC-5:00)',
    vermillionStatus: 'शीतल ताराहरूमुनि · तिम्रो सम्झनामा',

    // Tika
    tikaKicker: 'दशैँको टीका र जमरा · असीम मायाको आशीर्वाद',
    tikaTitle: 'भर्चुअल टीका तथा जमरा समर्पण',
    tikaDesc: 'दियो बाल्नुहोस्, निधारमा रातो अक्षताको टीका लगाइदिनुहोस्, कानमा सुनौलो जमरा सिउरिदिनुहोस् र सात समुद्रपारिबाट सञ्जुलाई हार्दिक मङ्गलमय आशीर्वाद पठाउनुहोस्।',
    blessingFrom: 'टीका लगाइदिने:',
    foreheadLabel: 'सञ्जुको निधार',
    foreheadSub: 'सुशीलको पवित्र माया र आशीर्वादले सजिएको',
    pujaThaliTitle: 'पवित्र पूजा थाली',
    pujaThaliHint: 'पालैपालो क्लिक गरी विधि पूरा गर्नुहोस्',
    stepDiya: '१. दियो बाल्नुहोस्',
    stepDiyaDone: 'दियो बल्यो',
    stepTika: '२. रातो टीका लगाउनुहोस्',
    stepTikaDone: 'टीका सजिएको',
    stepJamara: '३. जमरा सिउरिनुहोस्',
    stepJamaraDone: 'जमरा सिउरिएको',
    showerBlessingBtn: 'फूल, अक्षता र दक्षिणा समर्पण गर्नुहोस्',
    ritualComplete: 'टीका सम्पन्न भयो',
    stepCounter: 'चरण',
    ashirwadTitle: 'दशैँको हार्दिक आशिर्वाद',
    ringGhanti: 'घण्टी बजाउनुहोस्',
    stotraSub: 'आयु, आरोग्य, यश र ऐश्वर्यको वैदिक मङ्गलकामना',
    letterToSanjuTitle: 'मेरी प्यारी सञ्जुलाई,',
    letterToSanjuP1: 'सिन्धुपाल्चोकको चिसो हावा र हरियाली डाँडाहरूमा आज फेरि दशैँको घण्टी बजिरहेको छ। आमाले जमरा काट्दा र अक्षता मुछ्दा मेरो नजर तिमीलाई खोजिरहेको हुन्छ।',
    letterToSanjuP2: 'साउथ डकोटाको त्यो चिसो मौसममा तिमी एक्लै नठान्नू है। यो भर्चुअल रातो टीकाको प्रत्येक दानामा मेरो न्यानो माया, तिम्रो सफलताको कामना र हाम्रो छिट्टै हुने पुनर्मिलनको बाचा समेटिएको छ।',
    letterToSanjuP3: 'त्रिभुवन विमानस्थलमा बिदाइको त्यो पत्र तिम्रो हातमा थमाएर, तिम्रो अगाडि रुन नसकी बाथरुममा गएर एक्लै रोएको त्यो क्षण मेरो मुटुमा अझै ताजै छ। त्यो बिदाइ केवल केही समयको दूरी मात्र हो, हाम्रो माया सधैँ अजर र अमर छ।',
    letterToSanjuP4: 'माता दुर्गाले तिम्रो हरेक पाइलामा सफलता र खुशी भरिदिउन्। अर्को दशैँमा सँगै बसेर हाँस्दै टीका लगाउने बाचासहित — सधैँ तिम्रो, सुशील।',
    copyBlessingBtn: 'आशीर्वाद सन्देश कपी गर्नुहोस्',
    copiedBlessingMsg: 'आशीर्वाद कपी भयो!',

    // Distance
    distanceKicker: 'सिन्धुपाल्चोक ➔ भर्मिलियन, साउथ डकोटा',
    distanceTitle: 'दूरी, समय र पुनर्मिलन काउन्टडाउन',
    distanceDesc: '११,८५० किलोमिटरको दूरीले हाम्रो माया र सम्झनालाई कहिल्यै कमजोर बनाउन सक्दैन।',
    originTitle: 'उत्पत्ति स्थान',
    destinationTitle: 'गन्तव्य स्थान',
    diffSkiesOneHeart: 'आकाश फरक भए पनि, मुटुको धड्कन एउटै छ',
    timeDiffTitle: 'समयको अन्तर',
    timeDiffValue: '१० घण्टा ४५ मिनेट',
    timeDiffSub: 'नेपाल साउथ डकोटा (CDT) भन्दा अगाडि छ',
    distanceKm: '११,८५० किमी',
    distanceMiles: '७,३६० माइल',
    tokenTitle: 'हाम्रो चिनो',
    tokenValue: 'रातो टीका र जमरा',
    tokenSub: 'प्रार्थना र विश्वासले जोडिएको',
    bondTitle: 'सम्बन्धको आधार',
    bondValue: 'अटुट विश्वास र निको हुँदै गएको मुटु',
    bondSub: 'हरेक दिनको भिडियो कलसँगै बलियो',
    reunionCountdownTitle: 'हाम्रो पुनर्मिलनको दिनगन्ती',
    days: 'दिन',
    hours: 'घण्टा',
    mins: 'मिनेट',
    secs: 'सेकेन्ड',
    reunionSub: 'विमानस्थलमा फेरि एकअर्कालाई अँगालो हाल्ने दिनसम्म',
    changeDate: 'मिति परिवर्तन गर्नुहोस्',
    updateDate: 'अपडेट गर्नुहोस्',

    // Timeline
    timelineKicker: 'हाम्रो वास्तविक कथा',
    timelineTitle: 'थिमिदेखि साउथ डकोटासम्म: हाम्रा मिठा दिनहरू',
    timelineDesc: 'पहिलो चिया, दक्षिणाकाली, सूर्यविनायकको दियो, कलंकी सरप्राइज, गुण्डुको ट्रिपल राइड, नगरकोटको कफी र विदेशी पर्यटक, ‘रिचार्ज कार्ड’ सरप्राइज, पहिलो कपल पिकनिक, र विमानस्थलको त्यो भावुक बिदाइ।',

    // Love Letter
    letterKicker: 'मुटुभित्रका भावनाहरू',
    letterTitle: 'प्रेम तथा बिदाइ पत्रको सन्दुक',
    letterDesc: 'हातले लेखिएका भावना, विमानस्थलको त्यो पीडादायी बिदाइ र समुद्रपारि पुगेको उपहारको सम्झना।',
    letterEnvelopeTitle: 'सुशील गिरीको मनको पत्र',
    letterEnvelopeTo: 'प्रापक: सञ्जु, भर्मिलियन, साउथ डकोटा, अमेरिका',
    openLetterBtn: 'सुनौलो लाहाछाप खोलेर पत्र पढ्नुहोस्',
    envelopeSealedHint: 'माया, सम्झना र आँसुले सिलबन्दी गरिएको',
    tabMainLetter: 'दशैँ प्रेम पत्र',
    tabFarewellLetter: 'विमानस्थलको बिदाइ पत्र',
    tabVows: 'हाम्रा ५ बाचाहरू',
    tabCompose: 'नयाँ भावना लेख्नुहोस्',
    resealLetter: 'पत्र पुनः सिल गर्नुहोस्',

    // Gallery
    galleryKicker: 'हाम्रा अमूल्य पलहरू',
    galleryTitle: 'सम्झनाहरूको तस्बिर तथा भिडियो ग्यालरी',
    galleryDesc: 'हाम्रो वास्तविक यात्रा: थिमिको चिया, दक्षिणाकाली दर्शन, सूर्यविनायकको दियो, कलंकी मङ्की टेम्पल, गुण्डुको ट्रिपल राइड, नगरकोट कफी, रिचार्ज कार्ड भिडियो, पहिलो पिकनिक र विमानस्थलको बिदाइ।',
    addPhotoBtn: 'तस्बिर थप्नुहोस्',
    uploadBatchBtn: '६-७ वटा व्यक्तिगत तस्बिरहरू अपलोड गर्नुहोस्',
    gdriveHint: 'गुगल ड्राइभको सेयरिङ लिङ्क वा सिधै मोबाइल/ल्यापटपबाट ६-७ वटा व्यक्तिगत फोटोहरू छान्नुहोस्',
    videoClipTitle: '‘रिचार्ज कार्ड’ सरप्राइज भिडियो',
    videoClipSub: 'घरबाहिर गएर बोलाएको त्यो गोप्य सरप्राइज र हाम्रो अनमोल भिडियो सम्झना',
    changePhotoBtn: 'तस्बिर / भिडियो बदल्नुहोस्',
    changeVideoBtn: 'भिडियो बदल्नुहोस् / अपलोड गर्नुहोस्',
    uploadPhotoOrVideoBtn: 'तस्बिर वा भिडियो छान्नुहोस्',
    resetPhotoBtn: 'पहिलाकै राख्नुहोस्',
    photoUpdatedToast: 'मिडिया सफलतापूर्वक परिवर्तन भयो!',
    photoSlotHint: 'यस सम्झनाको तस्बिर वा भिडियो बदल्न क्लिक गर्नुहोस्',
    videoSlotHint: 'यस सम्झनाको भिडियो क्लिप परिवर्तन गर्नुहोस्',
    customPhotoBadge: 'परिवर्तित तस्बिर',
    customMediaBadge: 'परिवर्तित भिडियो/तस्बिर',

    // Diya
    diyaKicker: 'प्रार्थना र उपहार',
    diyaTitle: 'दियो बाल्नुहोस् र दशैँ दक्षिणा खोल्नुहोस्',
    diyaDesc: 'सञ्जु र सुशीलको सुस्वास्थ्य, अध्ययन र छिटो पुनर्मिलनका लागि दियो प्रज्वलन गर्नुहोस्।',
    diyaAltarTitle: 'हाम्रो पवित्र दियो वेदी',
    makeWishBtn: 'नयाँ कामनासहित दियो थप्नुहोस्',
    dakshinaTitle: 'दशैँ दक्षिणा तथा मायाको कुपन',
    dakshinaSub: 'साउथ डकोटामा रहेकी सञ्जुका लागि विशेष उपहार',

    // Footer
    footerGreeting: 'विजया दशमी २०८३ को हार्दिक मङ्गलमय शुभकामना!',
    footerDedication: 'सुशील गिरी (सिन्धुपाल्चोक) र सञ्जु (भर्मिलियन, साउथ डकोटा) को पवित्र प्रेमको सम्मानमा।',
    footerRights: 'सधैँभरि एकअर्काका लागि समर्पित माया।'
  },
  en: {
    brandTitle: 'Sushil & Sanju',
    brandSubtitle: 'Dashain Milan',
    navTika: 'Tika & Blessing',
    navDistance: 'Distance & Time',
    navTimeline: 'Our Real Story',
    navLetter: 'Love & Farewell Letter',
    navGallery: 'Photos & Video',
    navDiya: 'Diya & Dakshina',
    playMusic: 'Play Malshree Dhun',
    playingMusic: 'Malshree Playing',

    // Hero
    heroKicker: 'Vijaya Dashami 2083 · Across the Oceans',
    heroTitle: 'From Sindhupalchok to South Dakota, Our Unbreakable Dashain',
    heroSubtitle: 'Though thousands of miles and oceans lie between us, our hearts beat as one, our prayers are unified, and this sacred red Tika binds us ever closer.',
    sushilBadge: 'Sushil Giri · Sindhupalchok, Nepal',
    sanjuBadge: 'Sanju · Vermillion, South Dakota, USA',
    startTikaBtn: 'Receive Virtual Tika & Jamara',
    trackDistanceBtn: 'View Distance & Live Clocks',
    sindhupalchokCardTitle: 'Sindhupalchok, Nepal',
    sindhupalchokCardSub: "Sushil's Hometown · Golden Jamara & Himalayan Foothills",
    sindhupalchokTimezone: 'Nepal Time (NPT · UTC+5:45)',
    sindhupalchokStatus: 'Autumn Morning · Festive Dashain Atmosphere',
    vermillionCardTitle: 'Vermillion, South Dakota, USA',
    vermillionCardSub: "Sanju's University Town · Thinking of you across the miles",
    vermillionTimezone: 'Central Time (CDT · UTC-5:00)',
    vermillionStatus: 'Under Prairie Stars · In your warm thoughts',

    // Tika
    tikaKicker: 'Auspicious Tika & Jamara · Sacred Virtual Ritual',
    tikaTitle: 'Virtual Tika & Jamara Ceremony',
    tikaDesc: 'Light the sacred brass diya, apply the crimson rice tika to her forehead, tuck the golden barley jamara, and bestow heartfelt blessings across the continents.',
    blessingFrom: 'Blessing Given By:',
    foreheadLabel: "Sanju's Forehead",
    foreheadSub: 'Adorned with pure love and devotion from Sushil',
    pujaThaliTitle: 'The Sacred Puja Thali',
    pujaThaliHint: 'Click each ceremonial item in sequence',
    stepDiya: '1. Light Diya',
    stepDiyaDone: 'Diya Glowing',
    stepTika: '2. Apply Tika',
    stepTikaDone: 'Tika Placed',
    stepJamara: '3. Tuck Jamara',
    stepJamaraDone: 'Jamara Tucked',
    showerBlessingBtn: 'Shower Flowers, Rice & Dakshina',
    ritualComplete: 'Ritual Complete',
    stepCounter: 'Step',
    ashirwadTitle: 'The Dashain Ashirwad',
    ringGhanti: 'Ring Temple Bell',
    stotraSub: 'Vedic Stotra for Longevity, Radiance, Honor & Victory',
    letterToSanjuTitle: 'To My Dearest Sanju,',
    letterToSanjuP1: 'The mountain breeze in Sindhupalchok carries the sweet scent of marigolds and ringing temple bells today. As my family prepares the jamara and mixes the crimson tika, my eyes and heart are searching only for you.',
    letterToSanjuP2: 'In the cold autumn of South Dakota, please never feel alone. Every single grain of this virtual red rice tika carries my warmest prayers for your health, your studies, your dreams, and our reunion.',
    letterToSanjuP3: 'The moment at Tribhuvan International Airport when I handed you that farewell letter, unable to cry in front of you and excusing myself to the bathroom to weep alone, remains etched in my soul. That departure was only a physical pause—our love is eternal.',
    letterToSanjuP4: 'May Goddess Durga illuminate your journey with triumph and happiness. Until we laugh and celebrate Dashain side by side again—Forever and always yours, Sushil.',
    copyBlessingBtn: 'Copy Blessing Message',
    copiedBlessingMsg: 'Blessing Copied!',

    // Distance
    distanceKicker: 'Sindhupalchok, Nepal ➔ Vermillion, South Dakota, USA',
    distanceTitle: 'Distance Tracker, Clocks & Reunion Countdown',
    distanceDesc: '11,850 kilometers cannot dim the warmth of our connection or the promises made in Nepal.',
    originTitle: 'Origin Location',
    destinationTitle: 'Destination Location',
    diffSkiesOneHeart: 'Different skies, but one intertwined heartbeat',
    timeDiffTitle: 'Time Difference',
    timeDiffValue: '10 Hours 45 Minutes',
    timeDiffSub: 'Nepal is ahead of South Dakota (CDT)',
    distanceKm: '11,850 KM',
    distanceMiles: '7,360 MILES',
    tokenTitle: 'Our Sacred Token',
    tokenValue: 'Virtual Tika & Jamara',
    tokenSub: 'Carried across the world by prayer',
    bondTitle: 'Our Foundation',
    bondValue: 'Healing Hearts & Unwavering Trust',
    bondSub: 'Growing stronger with every single video call',
    reunionCountdownTitle: 'Countdown to Our Airport Reunion',
    days: 'Days',
    hours: 'Hours',
    mins: 'Mins',
    secs: 'Secs',
    reunionSub: 'Until we hold each other tight at the airport without letting go',
    changeDate: 'Change Date',
    updateDate: 'Update Date',

    // Timeline
    timelineKicker: 'Our Real Journey',
    timelineTitle: 'From Thimi to South Dakota: Our Cherished Memories',
    timelineDesc: 'First tea at Thimi, Dakshinkali blessings, Suryabinayak diyas, Monkey Temple Resort surprise, Gundu triple-riding adventure, Nagarkot coffee & tourist photo, recharge card surprise, first couple picnic, and airport farewell.',

    // Love Letter
    letterKicker: 'Treasured Emotions',
    letterTitle: 'Love Letter & Farewell Keepsake Box',
    letterDesc: 'Handwritten confessions, the poignant farewell at the airport, and the parcels sent across the sea.',
    letterEnvelopeTitle: "Sushil Giri's Letter to Sanju",
    letterEnvelopeTo: 'Recipient: Sanju, Vermillion, South Dakota, USA',
    openLetterBtn: 'Break Golden Wax Seal & Read Letter',
    envelopeSealedHint: 'Sealed with devotion, memories, and tears',
    tabMainLetter: 'Dashain Love Letter',
    tabFarewellLetter: 'Airport Farewell Letter',
    tabVows: 'Our 5 Sacred Vows',
    tabCompose: 'Write a Response',
    resealLetter: 'Reseal Envelope',

    // Gallery
    galleryKicker: 'Our Precious Moments',
    galleryTitle: 'Photo & Video Memory Gallery',
    galleryDesc: 'Our authentic real moments: Thimi tea, Dakshinkali, Suryabinayak, Monkey Temple Resort, Gundu adventure, Nagarkot, recharge card video, couple picnic, and airport farewell.',
    addPhotoBtn: 'Add Single Photo',
    uploadBatchBtn: 'Upload 6-7 Personal Photos',
    gdriveHint: 'Paste a Google Drive share link or upload 6-7 personal memory photos directly from your device',
    videoClipTitle: 'The ‘Recharge Card’ Surprise Video',
    videoClipSub: 'The secret doorstep surprise, her shocked laughter, and our private roadtrip',
    changePhotoBtn: 'Upload / Change Photo or Video',
    changeVideoBtn: 'Change / Upload Video Clip',
    uploadPhotoOrVideoBtn: 'Select Photo or Video',
    resetPhotoBtn: 'Reset to Original',
    photoUpdatedToast: 'Media updated successfully!',
    photoSlotHint: 'Click to upload and match the photo or video for this memory from your device',
    videoSlotHint: 'Click to replace with a custom video clip from your device',
    customPhotoBadge: 'Custom Photo',
    customMediaBadge: 'Custom Video/Photo',

    // Diya
    diyaKicker: 'Prayers & Blessings',
    diyaTitle: 'Light a Diya & Unlock Dashain Dakshina',
    diyaDesc: "Light sacred lamps for Sanju's success and well-being in South Dakota, and unlock love vouchers.",
    diyaAltarTitle: 'Our Sacred Diya Altar',
    makeWishBtn: 'Light a New Wish Diya',
    dakshinaTitle: 'Dashain Dakshina & Romantic Vouchers',
    dakshinaSub: 'Special tokens from Sushil to Sanju across the sea',

    // Footer
    footerGreeting: 'Happy Vijaya Dashami 2083!',
    footerDedication: 'In celebration of the pure love between Sushil Giri (Sindhupalchok) and Sanju (Vermillion, South Dakota).',
    footerRights: 'Bound by endless love and shared dreams.'
  }
};
