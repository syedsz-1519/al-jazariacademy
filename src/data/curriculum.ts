import { SurahTrack, TajweedRuleDefinition, TajweedRuleType } from '../types/academy';

export const TAJWEED_RULES: Record<TajweedRuleType, TajweedRuleDefinition> = {
  ghunnah: {
    id: 'ghunnah',
    name: 'Ghunnah',
    arabicName: 'غُنَّة',
    counts: '2 Harakat (beats)',
    makhraj: 'Al-Khayshum (Nasal Passage)',
    description:
      'A sustained nasal resonance produced on Noon Mushaddadah (نّ) or Meem Mushaddadah (مّ), held evenly without rushing.',
    exampleNote: 'Hold the doubled Noon or Meem softly in the nasal cavity for two full counts.',
    highlightBg: '#E8F6ED',
    highlightText: '#146C43',
    ringColor: '#2E9E6B',
  },
  qalqalah: {
    id: 'qalqalah',
    name: 'Qalqalah',
    arabicName: 'قَلْقَلَة',
    counts: 'Crisp Echo Bounce',
    makhraj: 'Articulation Release (ق ط ب ج د)',
    description:
      'A clear echoing bounce when one of the five Qalqalah letters (ق، ط، ب، ج، د) carries a Sukoon or is paused upon at the end of an Ayah.',
    exampleNote: 'Release the consonant cleanly without adding a vowel sound (no faint fathah or kasrah).',
    highlightBg: '#E8EDF8',
    highlightText: '#17316B',
    ringColor: '#17316B',
  },
  madd: {
    id: 'madd',
    name: 'Madd (Elongation)',
    arabicName: 'مَدّ',
    counts: '2, 4–5, or 6 Harakat',
    makhraj: 'Al-Jawf (Oral & Throat Cavity)',
    description:
      'Measured lengthening of the vowel letters (ا، و، ي) — natural Madd (2 counts), connected/separated Madd (4–5 counts), or necessary Madd (6 counts).',
    exampleNote: 'Keep the vocal tone steady and open through Al-Jawf for the full measured duration.',
    highlightBg: '#FCEFF3',
    highlightText: '#8A2846',
    ringColor: '#B83B64',
  },
  idgham: {
    id: 'idgham',
    name: 'Idgham (Merging)',
    arabicName: 'إِدْغَام',
    counts: '2 Harakat (with Ghunnah) or Smooth Merge',
    makhraj: 'Noon Sakinah / Tanween -> ي ر م ل و ن',
    description:
      'Smoothly merging a Noon Sakinah or Tanween into the following letter from يَرْمَلُون — with nasal resonance on (ي ن م و) and without Ghunnah on (ل ر).',
    exampleNote: 'Do not pronounce the Noon separately; blend directly into the next consonant.',
    highlightBg: '#EFEAF8',
    highlightText: '#4F2D8A',
    ringColor: '#6C4AB6',
  },
  ikhfa: {
    id: 'ikhfa',
    name: 'Ikhfa (Concealment)',
    arabicName: 'إِخْفَاء',
    counts: '2 Harakat',
    makhraj: 'Between Izhar & Idgham (15 Letters)',
    description:
      'A gentle mid-way concealment of Noon Sakinah or Tanween accompanied by Ghunnah while hovering the tongue near the articulation point of the following letter.',
    exampleNote: 'Avoid pressing the tongue completely against the Noon ridge before moving to the next letter.',
    highlightBg: '#FFF4E0',
    highlightText: '#8A5A00',
    ringColor: '#C8A35A',
  },
};

export const CURRICULUM_SURAHS: SurahTrack[] = [
  {
    id: 'al-fatihah',
    number: 1,
    arabicName: 'سُورَةُ الْفَاتِحَةِ',
    name: 'Surah Al-Fatihah',
    englishMeaning: 'The Opening',
    revelationPlace: 'Makki',
    juz: 1,
    ayahCountLabel: '7 Ayahs',
    trackTheme: 'Foundational',
    overviewNote:
      'The foundational prayer recited in every rakah, balancing praise, sovereignty, reliance, and the daily plea for steady guidance.',
    ayahs: [
      {
        number: 1,
        segments: [
          { id: '1-1-1', text: 'بِسْمِ' },
          { id: '1-1-2', text: 'اللَّهِ' },
          {
            id: '1-1-3',
            text: 'الرَّحْمَٰنِ',
            rule: 'madd',
            ruleDetail: 'Natural Madd (Madd Tabi’i) of 2 counts on the dagger Alif after Meem.',
          },
          {
            id: '1-1-4',
            text: 'الرَّحِيمِ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon (2, 4, or 6 counts) when pausing on the final Meem.',
          },
        ],
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        tafseerTitle: 'Opening Every Action with Divine Mercy',
        tafseerSummary:
          'Al-Fatihah begins by anchoring every human endeavor in Allah’s dual attributes of mercy: Ar-Rahman (vast, all-encompassing mercy for all creation) and Ar-Rahim (intimate, enduring mercy toward the faithful).',
        keyVocabulary: [
          { term: 'Ar-Rahman', arabic: 'الرَّحْمَٰنِ', meaning: 'All-encompassing mercy in this life' },
          { term: 'Ar-Rahim', arabic: 'الرَّحِيمِ', meaning: 'Continuous, specific mercy' },
        ],
        reflectionPrompt: 'Which task today can you begin consciously in the name of Allah to bring calm and purpose to it?',
      },
      {
        number: 2,
        segments: [
          { id: '1-2-1', text: 'الْحَمْدُ' },
          { id: '1-2-2', text: 'لِلَّهِ' },
          { id: '1-2-3', text: 'رَبِّ' },
          {
            id: '1-2-4',
            text: 'الْعَالَمِينَ',
            rule: 'madd',
            ruleDetail: 'Natural Madd on Ain (2 counts) and Madd Arid lis-Sukoon on Ya upon pause.',
          },
        ],
        transliteration: 'Al-ḥamdu lillāhi Rabbil-‘ālamīn',
        translation: 'All praise and gratitude belong to Allah, Lord of all the worlds.',
        tafseerTitle: 'Praise Paired with Sustenance',
        tafseerSummary:
          'Al-Hamd combines grateful love with reverence. By naming Allah as Rabbil-‘Alamin, the verse reminds the reader that the One worthy of praise is also the Nurturer and Sustainer of every realm.',
        keyVocabulary: [
          { term: 'Al-Hamd', arabic: 'الْحَمْدُ', meaning: 'Praise rooted in love and reverence' },
          { term: 'Rabb', arabic: 'رَبِّ', meaning: 'Creator, Owner, and Nurturing Sustainer' },
        ],
        reflectionPrompt: 'Name one quiet blessing in your routine today that reflects Allah’s nurturing care (Rububiyyah).',
      },
      {
        number: 3,
        segments: [
          {
            id: '1-3-1',
            text: 'الرَّحْمَٰنِ',
            rule: 'madd',
            ruleDetail: 'Madd Tabi’i of 2 harakat on the standing Alif.',
          },
          {
            id: '1-3-2',
            text: 'الرَّحِيمِ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon (2, 4, or 6 counts) at the Ayah ending.',
          },
        ],
        transliteration: 'Ar-Raḥmānir-Raḥīm',
        translation: 'The Entirely Merciful, the Especially Merciful.',
        tafseerTitle: 'Mercy Preceding Accountability',
        tafseerSummary:
          'Repeating the names of mercy right before mentioning the Day of Judgment establishes hope before awe, teaching that Divine governance is rooted in compassion.',
        keyVocabulary: [
          { term: 'Rahmah', arabic: 'رَحْمَة', meaning: 'Tenderness, care, and protective mercy' },
        ],
        reflectionPrompt: 'How does remembering Allah’s mercy reshape the way you speak to yourself after a mistake?',
      },
      {
        number: 4,
        segments: [
          {
            id: '1-4-1',
            text: 'مَالِكِ',
            rule: 'madd',
            ruleDetail: 'Madd Tabi’i of 2 counts on the Alif following Meem.',
          },
          { id: '1-4-2', text: 'يَوْمِ' },
          {
            id: '1-4-3',
            text: 'الدِّينِ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon when pausing on Noon; keep Lam Shamsiyyah merged cleanly.',
          },
        ],
        transliteration: 'Māliki yawmid-dīn',
        translation: 'Sovereign Master of the Day of Recompense.',
        tafseerTitle: 'Perspective Beyond the Immediate',
        tafseerSummary:
          'Malik signifies true ownership and final authority. Remembering Yawm ad-Din shifts our measure of success from temporary applause to lasting sincerity.',
        keyVocabulary: [
          { term: 'Malik', arabic: 'مَالِكِ', meaning: 'Absolute Owner and Sovereign' },
          { term: 'Ad-Din', arabic: 'الدِّينِ', meaning: 'Recompense and final reckoning' },
        ],
        reflectionPrompt: 'What choice becomes clearer when viewed through the lens of long-term accountability?',
      },
      {
        number: 5,
        segments: [
          {
            id: '1-5-1',
            text: 'إِيَّاكَ',
            rule: 'madd',
            ruleDetail: 'Madd Tabi’i (2 counts) on Alif; emphasize the Shaddah on Ya without over-bouncing.',
          },
          { id: '1-5-2', text: 'نَعْبُدُ' },
          {
            id: '1-5-3',
            text: 'وَإِيَّاكَ',
            rule: 'madd',
            ruleDetail: 'Madd Tabi’i (2 counts) on Alif after the stressed Ya.',
          },
          {
            id: '1-5-4',
            text: 'نَسْتَعِينُ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon on Ya upon stopping at the end of the verse.',
          },
        ],
        transliteration: 'Iyyāka na‘budu wa iyyāka nasta‘īn',
        translation: 'You alone we worship, and You alone we ask for help.',
        tafseerTitle: 'The Hinge Between Devotion and Reliance',
        tafseerSummary:
          'Scholars describe this Ayah as the heart of Al-Fatihah: placing the object pronoun (Iyyaka) first expresses exclusivity—freeing the heart from reliance on status or self-sufficiency.',
        keyVocabulary: [
          { term: 'Na‘budu', arabic: 'نَعْبُدُ', meaning: 'We worship with humility and love' },
          { term: 'Nasta‘in', arabic: 'نَسْتَعِينُ', meaning: 'We seek aid and strength' },
        ],
        reflectionPrompt: 'Where are you carrying a burden alone instead of pairing effort with heartfelt Isti‘anah (seeking help)?',
      },
      {
        number: 6,
        segments: [
          { id: '1-6-1', text: 'اهْدِنَا' },
          {
            id: '1-6-2',
            text: 'الصِّرَاطَ',
            rule: 'madd',
            ruleDetail: 'Heavy Saad (Tafkheem) followed by 2-count Madd on Alif.',
          },
          {
            id: '1-6-3',
            text: 'الْمُسْتَقِيمَ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon (2, 4, or 6 counts) before closing on Meem.',
          },
        ],
        transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
        translation: 'Guide us to the straight path.',
        tafseerTitle: 'Continuous Need for Alignment',
        tafseerSummary:
          'Even those already walking in faith ask for guidance multiple times a day—not merely to find the path, but to deepen clarity, firmness, and consistency along it.',
        keyVocabulary: [
          { term: 'As-Sirat', arabic: 'الصِّرَاطَ', meaning: 'The clear, open highway' },
          { term: 'Al-Mustaqim', arabic: 'الْمُسْتَقِيمَ', meaning: 'Upright, balanced, and direct' },
        ],
        reflectionPrompt: 'In what area of life do you most need steadiness and clarity right now?',
      },
      {
        number: 7,
        segments: [
          {
            id: '1-7-1',
            text: 'صِرَاطَ',
            rule: 'madd',
            ruleDetail: '2-count Madd Tabi’i with full Tafkheem (heaviness) on Saad and Raa.',
          },
          { id: '1-7-2', text: 'الَّذِينَ' },
          { id: '1-7-3', text: 'أَنْعَمْتَ' },
          { id: '1-7-4', text: 'عَلَيْهِمْ' },
          { id: '1-7-5', text: 'غَيْرِ' },
          { id: '1-7-6', text: 'الْمَغْضُوبِ' },
          { id: '1-7-7', text: 'عَلَيْهِمْ' },
          { id: '1-7-8', text: 'وَلَا' },
          {
            id: '1-7-9',
            text: 'الضَّالِّينَ',
            rule: 'madd',
            ruleDetail: 'Madd Lazim Kalimi Muthaqqal: hold Alif for a full 6 counts before the doubled Lam, then Madd Arid on Ya.',
          },
        ],
        transliteration: 'Ṣirāṭalladhīna an‘amta ‘alayhim ghayril-maghḍūbi ‘alayhim wa laḍ-ḍāllīn',
        translation: 'The path of those upon whom You have bestowed favor, not of those who earned anger or went astray.',
        tafseerTitle: 'Knowledge Paired with Sincere Action',
        tafseerSummary:
          'The blessed path unites sound understanding with lived sincerity—avoiding both knowing truth while resisting it, and acting out of zeal without grounded guidance.',
        keyVocabulary: [
          { term: 'An‘amta', arabic: 'أَنْعَمْتَ', meaning: 'You bestowed spiritual grace and favor' },
        ],
        reflectionPrompt: 'Whose example of quiet integrity inspires your daily character?',
      },
    ],
  },
  {
    id: 'al-asr',
    number: 103,
    arabicName: 'سُورَةُ الْعَصْرِ',
    name: 'Surah Al-Asr',
    englishMeaning: 'The Declining Day',
    revelationPlace: 'Makki',
    juz: 30,
    ayahCountLabel: '3 Ayahs',
    trackTheme: 'Daily Contemplation',
    overviewNote:
      'A concise three-verse manifesto on the urgency of time, uniting inner conviction, righteous action, mutual encouragement in truth, and patient perseverance.',
    ayahs: [
      {
        number: 1,
        segments: [
          {
            id: '103-1-1',
            text: 'وَالْعَصْرِ',
            rule: 'qalqalah',
            ruleDetail: 'Maintain clear heavy Raa upon pause without inserting an extra vowel.',
          },
        ],
        transliteration: 'Wal-‘aṣr',
        translation: 'By the passage of time.',
        tafseerTitle: 'An Oath by Unrecoverable Time',
        tafseerSummary:
          'Allah swears by Al-Asr—time itself and the late afternoon hour—drawing attention to our most finite resource, which slips away moment by moment.',
        keyVocabulary: [
          { term: 'Al-Asr', arabic: 'الْعَصْرِ', meaning: 'Time, era, and the late afternoon' },
        ],
        reflectionPrompt: 'How did you spend your most focused hour today?',
      },
      {
        number: 2,
        segments: [
          {
            id: '103-2-1',
            text: 'إِنَّ',
            rule: 'ghunnah',
            ruleDetail: 'Noon Mushaddadah: hold nasal Ghunnah for 2 full counts.',
          },
          {
            id: '103-2-2',
            text: 'الْإِنسَانَ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi: conceal Noon Sakinah before Seen with a light 2-count Ghunnah.',
          },
          { id: '103-2-3', text: 'لَفِي' },
          { id: '103-2-4', text: 'خُسْرٍ' },
        ],
        transliteration: 'Innal-insāna lafī khusr',
        translation: 'Indeed, humanity is in profound loss.',
        tafseerTitle: 'The Default Trajectory Without Intention',
        tafseerSummary:
          'Just as an ice merchant loses capital every hour the ice melts unless he trades wisely, human beings drift toward loss unless time is invested in lasting purpose.',
        keyVocabulary: [
          { term: 'Khusr', arabic: 'خُسْرٍ', meaning: 'Depletion, diminishing capital, spiritual loss' },
        ],
        reflectionPrompt: 'Which daily habit quietly drains your energy without adding meaning?',
      },
      {
        number: 3,
        segments: [
          { id: '103-3-1', text: 'إِلَّا' },
          { id: '103-3-2', text: 'الَّذِينَ' },
          {
            id: '103-3-3',
            text: 'آمَنُوا',
            rule: 'madd',
            ruleDetail: 'Madd Badal (2 counts) on the opening Alif and natural Madd on Waw.',
          },
          { id: '103-3-4', text: 'وَعَمِلُوا' },
          {
            id: '103-3-5',
            text: 'الصَّالِحَاتِ',
            rule: 'madd',
            ruleDetail: '2-count Madd Tabi’i on Saad-Alif and Haa-Alif.',
          },
          { id: '103-3-6', text: 'وَتَوَاصَوْا' },
          { id: '103-3-7', text: 'بِالْحَقِّ' },
          { id: '103-3-8', text: 'وَتَوَاصَوْا' },
          {
            id: '103-3-9',
            text: 'بِالصَّبْرِ',
            rule: 'qalqalah',
            ruleDetail: 'Subtle Qalqalah on Ba Sakinah inside Bis-sabr before landing on Raa.',
          },
        ],
        transliteration: 'Illalladhīna āmanū wa ‘amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr',
        translation: 'Except those who believe, do righteous deeds, and counsel one another to truth and to patience.',
        tafseerTitle: 'Four Pillars of Rescue',
        tafseerSummary:
          'Faith and personal goodness are necessary yet incomplete in isolation; growth endures when anchored in community—mutually reminding one another with truth and gentleness.',
        keyVocabulary: [
          { term: 'Tawasaw', arabic: 'تَوَاصَوْا', meaning: 'Mutually advised with care and sincerity' },
          { term: 'As-Sabr', arabic: 'الصَّبْرِ', meaning: 'Steadfast patience through effort and trial' },
        ],
        reflectionPrompt: 'Who can you encourage today with a kind, truthful word or patient presence?',
      },
    ],
  },
  {
    id: 'al-ikhlas',
    number: 112,
    arabicName: 'سُورَةُ الْإِخْلَاصِ',
    name: 'Surah Al-Ikhlas',
    englishMeaning: 'Pure Sincerity',
    revelationPlace: 'Makki',
    juz: 30,
    ayahCountLabel: '4 Ayahs',
    trackTheme: 'Foundational',
    overviewNote:
      'Described as equal to one-third of the Quran in meaning, distilling pure monotheism (Tawheed), absolute self-sufficiency, and transcendence.',
    ayahs: [
      {
        number: 1,
        segments: [
          { id: '112-1-1', text: 'قُلْ' },
          { id: '112-1-2', text: 'هُوَ' },
          { id: '112-1-3', text: 'اللَّهُ' },
          {
            id: '112-1-4',
            text: 'أَحَدٌ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on the final Dal when pausing at the end of the Ayah.',
          },
        ],
        transliteration: 'Qul Huwallāhu Aḥad',
        translation: 'Say, "He is Allah, [who is] One."',
        tafseerTitle: 'Absolute Oneness',
        tafseerSummary:
          'Ahad expresses not just numerical singularity, but indivisible uniqueness—nothing shares His essence, perfection, or sovereignty.',
        keyVocabulary: [
          { term: 'Ahad', arabic: 'أَحَدٌ', meaning: 'Uniquely, indivisibly One' },
        ],
        reflectionPrompt: 'How does anchoring the heart in Allah’s Oneness simplify competing worries?',
      },
      {
        number: 2,
        segments: [
          { id: '112-2-1', text: 'اللَّهُ' },
          {
            id: '112-2-2',
            text: 'الصَّمَدُ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Dal; keep Saad heavy and Meem light.',
          },
        ],
        transliteration: 'Allāhuṣ-Ṣamad',
        translation: 'Allah, the Eternal Refuge.',
        tafseerTitle: 'The Unshakeable Refuge',
        tafseerSummary:
          'As-Samad means the One upon whom all creation depends for every need, while He remains completely free of need, flaw, or dependency.',
        keyVocabulary: [
          { term: 'As-Samad', arabic: 'الصَّمَدُ', meaning: 'Eternal Master sought by all creation' },
        ],
        reflectionPrompt: 'What need are you carrying today that you can entrust directly to As-Samad?',
      },
      {
        number: 3,
        segments: [
          { id: '112-3-1', text: 'لَمْ' },
          {
            id: '112-3-2',
            text: 'يَلِدْ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Sughra (crisp light bounce) on Dal Sakinah.',
          },
          { id: '112-3-3', text: 'وَلَمْ' },
          {
            id: '112-3-4',
            text: 'يُولَدْ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Dal upon stopping; stretch Waw 2 counts.',
          },
        ],
        transliteration: 'Lam yalid wa lam yūlad',
        translation: 'He neither begets nor is born.',
        tafseerTitle: 'Beyond Time and Lineage',
        tafseerSummary:
          'Creatures come into being and pass away, needing successors; Allah stands outside origin, aging, or biological likeness.',
        keyVocabulary: [
          { term: 'Yalid / Yulad', arabic: 'يَلِدْ / يُولَدْ', meaning: 'Begets / Is begotten' },
        ],
        reflectionPrompt: 'Reflect on the serenity of relying on an Eternal Creator untouched by fatigue or change.',
      },
      {
        number: 4,
        segments: [
          { id: '112-4-1', text: 'وَلَمْ' },
          {
            id: '112-4-2',
            text: 'يَكُن لَّهُ',
            rule: 'idgham',
            ruleDetail: 'Idgham Bila Ghunnah: Noon Sakinah merges completely into Lam without nasalization.',
          },
          { id: '112-4-3', text: 'كُفُوًا' },
          {
            id: '112-4-4',
            text: 'أَحَدٌ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Dal when pausing.',
          },
        ],
        transliteration: 'Wa lam yakul-lahū kufuwan aḥad',
        translation: 'Nor is there to Him any equivalent.',
        tafseerTitle: 'Incomparable Perfection',
        tafseerSummary:
          'No earthly power, fear, or idol equals Allah—establishing both deep humility in worship and courage in daily life.',
        keyVocabulary: [
          { term: 'Kufuwan', arabic: 'كُفُوًا', meaning: 'Peer, rival, or equal' },
        ],
        reflectionPrompt: 'What earthly fear loses its grip when you remember nothing equals Allah?',
      },
    ],
  },
  {
    id: 'al-falaq',
    number: 113,
    arabicName: 'سُورَةُ الْفَلَقِ',
    name: 'Surah Al-Falaq',
    englishMeaning: 'The Daybreak',
    revelationPlace: 'Makki',
    juz: 30,
    ayahCountLabel: '5 Ayahs',
    trackTheme: 'Protection & Light',
    overviewNote:
      'The first of the Mu’awwidhatayn (Surahs of Refuge), turning the heart toward the Lord of Dawn for protection against external harm and envy.',
    ayahs: [
      {
        number: 1,
        segments: [
          { id: '113-1-1', text: 'قُلْ' },
          { id: '113-1-2', text: 'أَعُوذُ' },
          { id: '113-1-3', text: 'بِرَبِّ' },
          {
            id: '113-1-4',
            text: 'الْفَلَقِ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Qaf with full heaviness (Tafkheem) upon pause.',
          },
        ],
        transliteration: 'Qul a‘ūdhu bi-Rabbil-falaq',
        translation: 'Say, "I seek refuge in the Lord of daybreak."',
        tafseerTitle: 'Seeking Shelter with the Splitter of Dawn',
        tafseerSummary:
          'Al-Falaq evokes the breaking of dawn out of darkness—reminding us that the One who splits night into morning can open relief out of any difficulty.',
        keyVocabulary: [
          { term: 'Al-Falaq', arabic: 'الْفَلَقِ', meaning: 'Daybreak splitting the dark night' },
        ],
        reflectionPrompt: 'Where in your life are you waiting for dawn after a long stretch of uncertainty?',
      },
      {
        number: 2,
        segments: [
          {
            id: '113-2-1',
            text: 'مِن شَرِّ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi: conceal Noon Sakinah before Sheen with 2-count Ghunnah.',
          },
          { id: '113-2-2', text: 'مَا' },
          {
            id: '113-2-3',
            text: 'خَلَقَ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Qaf at pause; keep Lam light between heavy Kha and Qaf.',
          },
        ],
        transliteration: 'Min sharri mā khalaq',
        translation: 'From the evil of that which He created.',
        tafseerTitle: 'Protection Under One Sovereignty',
        tafseerSummary:
          'Everything created operates under Allah’s permission; seeking refuge with the Creator places all creation beneath His guardianship.',
        keyVocabulary: [
          { term: 'Sharr', arabic: 'شَرِّ', meaning: 'Harm or distress arising from creation' },
        ],
        reflectionPrompt: 'How does shifting from anxiety to Isti‘adhah (seeking refuge) calm your mind?',
      },
      {
        number: 3,
        segments: [
          {
            id: '113-3-1',
            text: 'وَمِن شَرِّ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi: nasal concealment of Noon before Sheen (2 counts).',
          },
          { id: '113-3-2', text: 'غَاسِقٍ' },
          { id: '113-3-3', text: 'إِذَا' },
          {
            id: '113-3-4',
            text: 'وَقَبَ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Ba when pausing.',
          },
        ],
        transliteration: 'Wa min sharri ghāsiqin idhā waqab',
        translation: 'And from the evil of darkness when it settles.',
        tafseerTitle: 'Guarding the Quiet Hours',
        tafseerSummary:
          'Night symbolizes unseen vulnerabilities—both literal and emotional—taught here to be entrusted into Allah’s keeping before sleep.',
        keyVocabulary: [
          { term: 'Ghasiq', arabic: 'غَاسِقٍ', meaning: 'Deepening night darkness' },
        ],
        reflectionPrompt: 'Make tonight’s final moments intentional with calm remembrance before rest.',
      },
      {
        number: 4,
        segments: [
          {
            id: '113-4-1',
            text: 'وَمِن شَرِّ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi on Noon Sakinah before Sheen.',
          },
          {
            id: '113-4-2',
            text: 'النَّفَّاثَاتِ',
            rule: 'ghunnah',
            ruleDetail: 'Noon Mushaddadah: hold Ghunnah for 2 counts, followed by clear Faa and Madd.',
          },
          { id: '113-4-3', text: 'فِي' },
          {
            id: '113-4-4',
            text: 'الْعُقَدِ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Dal upon pause.',
          },
        ],
        transliteration: 'Wa min sharrin-naffāthāti fil-‘uqad',
        translation: 'And from the evil of those who blow on knots.',
        tafseerTitle: 'Immunity Against Hidden Ill-Will',
        tafseerSummary:
          'The verse instills quiet confidence: hidden schemes or manipulations hold zero independent power against someone protected by Allah.',
        keyVocabulary: [
          { term: 'Al-Uqad', arabic: 'الْعُقَدِ', meaning: 'Knots, entangled intentions' },
        ],
        reflectionPrompt: 'Notice how inner trust dissolves overthinking about things outside your control.',
      },
      {
        number: 5,
        segments: [
          {
            id: '113-5-1',
            text: 'وَمِن شَرِّ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi on Noon Sakinah before Sheen.',
          },
          { id: '113-5-2', text: 'حَاسِدٍ' },
          { id: '113-5-3', text: 'إِذَا' },
          {
            id: '113-5-4',
            text: 'حَسَدَ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Kubra on final Dal when pausing.',
          },
        ],
        transliteration: 'Wa min sharri ḥāsidin idhā ḥasad',
        translation: 'And from the evil of an envier when he envies.',
        tafseerTitle: 'Protecting Blessings & Purifying Hearts',
        tafseerSummary:
          'While seeking protection from the harm of envy, the believer also guards their own heart against comparison by celebrating blessings in others.',
        keyVocabulary: [
          { term: 'Hasid', arabic: 'حَاسِدٍ', meaning: 'One who resents another’s blessing' },
        ],
        reflectionPrompt: 'Can you sincerely make du’a for someone else’s success today?',
      },
    ],
  },
  {
    id: 'an-nas',
    number: 114,
    arabicName: 'سُورَةُ النَّاسِ',
    name: 'Surah An-Nas',
    englishMeaning: 'Mankind',
    revelationPlace: 'Makki',
    juz: 30,
    ayahCountLabel: '6 Ayahs',
    trackTheme: 'Protection & Light',
    overviewNote:
      'Closing the Quran with an intimate appeal to Allah as Nurturer, King, and God of humanity—guarding the inner heart from subtle whispering.',
    ayahs: [
      {
        number: 1,
        segments: [
          { id: '114-1-1', text: 'قُلْ' },
          { id: '114-1-2', text: 'أَعُوذُ' },
          { id: '114-1-3', text: 'بِرَبِّ' },
          {
            id: '114-1-4',
            text: 'النَّاسِ',
            rule: 'ghunnah',
            ruleDetail: 'Noon Mushaddadah (2 counts) followed by Madd Arid lis-Sukoon on Alif.',
          },
        ],
        transliteration: 'Qul a‘ūdhu bi-Rabbin-nās',
        translation: 'Say, "I seek refuge in the Lord of mankind."',
        tafseerTitle: 'Three Attributes for One Inner Battle',
        tafseerSummary:
          'Unlike Al-Falaq which asks protection using one attribute against many harms, An-Nas invokes three titles (Rabb, Malik, Ilah) to protect against one deep threat: inner whispers.',
        keyVocabulary: [
          { term: 'Rabbin-Nas', arabic: 'رَبِّ النَّاسِ', meaning: 'Caretaker and Nurturer of humanity' },
        ],
        reflectionPrompt: 'What inner doubt quiets down when you remember Allah’s personal care?',
      },
      {
        number: 2,
        segments: [
          { id: '114-2-1', text: 'مَلِكِ' },
          {
            id: '114-2-2',
            text: 'النَّاسِ',
            rule: 'ghunnah',
            ruleDetail: 'Hold Ghunnah on Noon Mushaddadah for 2 harakat, then Madd Arid on Alif.',
          },
        ],
        transliteration: 'Malikin-nās',
        translation: 'The Sovereign of mankind.',
        tafseerTitle: 'True Authority Over the Heart',
        tafseerSummary:
          'Malik reminds the believer that no intrusive thought holds royal decree inside the heart unless we grant it attention.',
        keyVocabulary: [
          { term: 'Malik', arabic: 'مَلِكِ', meaning: 'Sovereign King' },
        ],
        reflectionPrompt: 'Notice the difference between a passing thought and an intentional conviction.',
      },
      {
        number: 3,
        segments: [
          { id: '114-3-1', text: 'إِلَٰهِ' },
          {
            id: '114-3-2',
            text: 'النَّاسِ',
            rule: 'ghunnah',
            ruleDetail: 'Noon Mushaddadah (2 counts) + Madd Arid lis-Sukoon.',
          },
        ],
        transliteration: 'Ilāhin-nās',
        translation: 'The God of mankind.',
        tafseerTitle: 'Belonging in Devotion',
        tafseerSummary:
          'Ilah completes the triad: He nurtures us (Rabb), rules with justice (Malik), and alone deserves the devotion of our hearts (Ilah).',
        keyVocabulary: [
          { term: 'Ilah', arabic: 'إِلَٰهِ', meaning: 'The One worshipped with love and awe' },
        ],
        reflectionPrompt: 'How does worship reorder your priorities before a busy day?',
      },
      {
        number: 4,
        segments: [
          {
            id: '114-4-1',
            text: 'مِن شَرِّ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi: conceal Noon Sakinah before Sheen with 2-count Ghunnah.',
          },
          { id: '114-4-2', text: 'الْوَسْوَاسِ' },
          {
            id: '114-4-3',
            text: 'الْخَنَّاسِ',
            rule: 'ghunnah',
            ruleDetail: 'Noon Mushaddadah (2 counts) before pausing on Seen.',
          },
        ],
        transliteration: 'Min sharril-waswāsil-khannās',
        translation: 'From the evil of the retreating whisperer.',
        tafseerTitle: 'The Whisper That Retreats at Remembrance',
        tafseerSummary:
          'Al-Khannas means one who shrinks back and withdraws—teaching that negative whispers weaken the moment the heart turns toward dhikr (remembrance).',
        keyVocabulary: [
          { term: 'Al-Khannas', arabic: 'الْخَنَّاسِ', meaning: 'That which retreats upon remembrance' },
        ],
        reflectionPrompt: 'When a discouraging thought returns, what short phrase of dhikr restores stillness?',
      },
      {
        number: 5,
        segments: [
          { id: '114-5-1', text: 'الَّذِي' },
          { id: '114-5-2', text: 'يُوَسْوِسُ' },
          { id: '114-5-3', text: 'فِي' },
          { id: '114-5-4', text: 'صُدُورِ' },
          {
            id: '114-5-5',
            text: 'النَّاسِ',
            rule: 'ghunnah',
            ruleDetail: '2-count Ghunnah on Noon Mushaddadah.',
          },
        ],
        transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās',
        translation: 'Who whispers [evil] into the chests of mankind.',
        tafseerTitle: 'Guarding the Inner Courtyard',
        tafseerSummary:
          'Sudur refers to the outer chamber of the chest where thoughts first knock before entering the deeper heart (qalb).',
        keyVocabulary: [
          { term: 'Sudur', arabic: 'صُدُورِ', meaning: 'Breasts / outer chambers of thought' },
        ],
        reflectionPrompt: 'What kind of reading or quiet companionship keeps your inner thoughts serene?',
      },
      {
        number: 6,
        segments: [
          { id: '114-6-1', text: 'مِنَ' },
          { id: '114-6-2', text: 'الْجِنَّةِ' },
          {
            id: '114-6-3',
            text: 'وَالنَّاسِ',
            rule: 'ghunnah',
            ruleDetail: 'Hold 2-count Ghunnah on Noon Mushaddadah and pause gently on Seen.',
          },
        ],
        transliteration: 'Minal-jinnati wan-nās',
        translation: 'From among the jinn and mankind.',
        tafseerTitle: 'Discernment in Every Influence',
        tafseerSummary:
          'Harmful suggestions can arise from unseen whispers or unhelpful human company—both are overcome by steady remembrance and wise companionship.',
        keyVocabulary: [
          { term: 'Al-Jinnah', arabic: 'الْجِنَّةِ', meaning: 'Unseen spiritual beings' },
        ],
        reflectionPrompt: 'Celebrate completing the Quran’s closing Surah by reviewing one reflection across all Surahs.',
      },
    ],
  },
  {
    id: 'al-mulk-opening',
    number: 67,
    arabicName: 'سُورَةُ الْمُلْكِ',
    name: 'Surah Al-Mulk (1–3)',
    englishMeaning: 'The Sovereignty',
    revelationPlace: 'Makki',
    juz: 29,
    ayahCountLabel: '3 Study Ayahs',
    trackTheme: 'Daily Contemplation',
    overviewNote:
      'Evening contemplation on the beauty of creation, purposeful life tests, and the flawless architecture of the seven heavens.',
    ayahs: [
      {
        number: 1,
        segments: [
          {
            id: '67-1-1',
            text: 'تَبَارَكَ',
            rule: 'madd',
            ruleDetail: '2-count Madd Tabi’i on Ba-Alif.',
          },
          { id: '67-1-2', text: 'الَّذِي' },
          { id: '67-1-3', text: 'بِيَدِهِ' },
          { id: '67-1-4', text: 'الْمُلْكُ' },
          { id: '67-1-5', text: 'وَهُوَ' },
          { id: '67-1-6', text: 'عَلَىٰ' },
          { id: '67-1-7', text: 'كُلِّ' },
          {
            id: '67-1-8',
            text: 'شَيْءٍ',
            rule: 'madd',
            ruleDetail: 'Madd Leen if pausing, or crisp Tanween Izhar before Qaf.',
          },
          {
            id: '67-1-9',
            text: 'قَدِيرٌ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon (2, 4, or 6 counts) on Ya; soften Raa upon pause.',
          },
        ],
        transliteration: 'Tabārakalladhī biyadihil-mulku wa Huwa ‘alā kulli shay’in qadīr',
        translation: 'Blessed is He in whose hand is dominion, and He is over all things competent.',
        tafseerTitle: 'Abundant Blessing & Total Dominion',
        tafseerSummary:
          'Tabaraka expresses overflowing, timeless goodness. Placing all dominion in Allah’s hand frees the believer from anxiety over earthly instability.',
        keyVocabulary: [
          { term: 'Tabaraka', arabic: 'تَبَارَكَ', meaning: 'Overflowing in timeless blessing' },
          { term: 'Al-Mulk', arabic: 'الْمُلْكُ', meaning: 'Complete sovereignty' },
        ],
        reflectionPrompt: 'What situation feels out of your hands today that you can rest in Allah’s dominion?',
      },
      {
        number: 2,
        segments: [
          { id: '67-2-1', text: 'الَّذِي' },
          { id: '67-2-2', text: 'خَلَقَ' },
          { id: '67-2-3', text: 'الْمَوْتَ' },
          { id: '67-2-4', text: 'وَالْحَيَاةَ' },
          { id: '67-2-5', text: 'لِيَبْلُوَكُمْ' },
          { id: '67-2-6', text: 'أَيُّكُمْ' },
          { id: '67-2-7', text: 'أَحْسَنُ' },
          { id: '67-2-8', text: 'عَمَلًا' },
          { id: '67-2-9', text: 'وَهُوَ' },
          { id: '67-2-10', text: 'الْعَزِيزُ' },
          {
            id: '67-2-11',
            text: 'الْغَفُورُ',
            rule: 'madd',
            ruleDetail: 'Madd Arid lis-Sukoon on Waw when pausing at the end of the Ayah.',
          },
        ],
        transliteration: 'Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu ‘amalā, wa Huwal-‘Azīzul-Ghafūr',
        translation: 'He who created death and life to test which of you is best in deed—and He is the Exalted in Might, the Forgiving.',
        tafseerTitle: 'Excellence Over Mere Quantity',
        tafseerSummary:
          'Notice the Quran says "ahsana ‘amala" (best/most sincere in deed), not "akthara ‘amala" (most numerous)—measuring excellence by sincerity and alignment.',
        keyVocabulary: [
          { term: 'Ahsanu Amala', arabic: 'أَحْسَنُ عَمَلًا', meaning: 'Most sincere and excellent in action' },
        ],
        reflectionPrompt: 'How can you raise the sincerity and care behind one ordinary task today?',
      },
      {
        number: 3,
        segments: [
          { id: '67-3-1', text: 'الَّذِي' },
          { id: '67-3-2', text: 'خَلَقَ' },
          {
            id: '67-3-3',
            text: 'سَبْعَ',
            rule: 'qalqalah',
            ruleDetail: 'Qalqalah Sughra on Ba Sakinah.',
          },
          {
            id: '67-3-4',
            text: 'سَمَاوَاتٍ',
            rule: 'madd',
            ruleDetail: 'Dual 2-count Madd Tabi’i on Meem-Alif and Waw-Alif.',
          },
          { id: '67-3-5', text: 'طِبَاقًا' },
          { id: '67-3-6', text: 'مَّا' },
          { id: '67-3-7', text: 'تَرَىٰ' },
          { id: '67-3-8', text: 'فِي' },
          { id: '67-3-9', text: 'خَلْقِ' },
          { id: '67-3-10', text: 'الرَّحْمَٰنِ' },
          {
            id: '67-3-11',
            text: 'مِن تَفَاوُتٍ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi: conceal Noon Sakinah before Taa for 2 counts.',
          },
          { id: '67-3-12', text: 'فَارْجِعِ' },
          { id: '67-3-13', text: 'الْبَصَرَ' },
          { id: '67-3-14', text: 'هَلْ' },
          { id: '67-3-15', text: 'تَرَىٰ' },
          {
            id: '67-3-16',
            text: 'مِن فُطُورٍ',
            rule: 'ikhfa',
            ruleDetail: 'Ikhfa Haqiqi on Noon Sakinah before Faa, followed by Madd Arid on Waw.',
          },
        ],
        transliteration: 'Alladhī khalaqa sab‘a samāwātin ṭibāqā, mā tarā fī khalqir-Raḥmāni min tafāwut, farji‘il-baṣara hal tarā min fuṭūr',
        translation: 'Who created seven heavens in harmony. You see no inconsistency in the creation of the Most Merciful; return your vision—do you see any flaw?',
        tafseerTitle: 'Scientific Wonder as Worship',
        tafseerSummary:
          'Inviting the observer to look twice at the night sky frames careful observation as spiritual contemplation—witnessing harmony crafted by Ar-Rahman.',
        keyVocabulary: [
          { term: 'Tafawut', arabic: 'تَفَاوُتٍ', meaning: 'Discrepancy, discord, or imbalance' },
          { term: 'Futur', arabic: 'فُطُورٍ', meaning: 'Rifts, cracks, or flaws' },
        ],
        reflectionPrompt: 'Take a quiet moment today to observe an intricate detail in the natural world.',
      },
    ],
  },
];

export function makeAyahKey(surahId: string, ayahNumber: number): string {
  return `${surahId}:${ayahNumber}`;
}

export function getSurahById(surahId: string): SurahTrack {
  return CURRICULUM_SURAHS.find((s) => s.id === surahId) ?? CURRICULUM_SURAHS[0];
}
