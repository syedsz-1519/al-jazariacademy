export type WorkspaceView = 'overview' | 'reader' | 'hifz' | 'tafseer';

export type TajweedRuleType =
  | 'ghunnah'
  | 'qalqalah'
  | 'madd'
  | 'idgham'
  | 'ikhfa';

export interface TajweedRuleDefinition {
  id: TajweedRuleType;
  name: string;
  arabicName: string;
  counts: string;
  makhraj: string;
  description: string;
  exampleNote: string;
  highlightBg: string;
  highlightText: string;
  ringColor: string;
}

export interface ArabicSegment {
  id: string;
  text: string;
  rule?: TajweedRuleType;
  ruleDetail?: string;
}

export interface AyahItem {
  number: number;
  segments: ArabicSegment[];
  transliteration: string;
  translation: string;
  tafseerTitle: string;
  tafseerSummary: string;
  keyVocabulary: {
    term: string;
    arabic: string;
    meaning: string;
  }[];
  reflectionPrompt: string;
}

export interface SurahTrack {
  id: string;
  number: number;
  arabicName: string;
  name: string;
  englishMeaning: string;
  revelationPlace: 'Makki' | 'Madani';
  juz: number;
  ayahCountLabel: string;
  trackTheme: 'Foundational' | 'Protection & Light' | 'Daily Contemplation';
  overviewNote: string;
  ayahs: AyahItem[];
}

export type HifzStatus =
  | 'unstarted'
  | 'needs_revision'
  | 'developing'
  | 'mastered';

export interface HifzRecord {
  status: HifzStatus;
  lastReviewedAt: string;
  reviewCount: number;
}

export type ReflectionThemeTag =
  | 'Gratitude'
  | 'Mercy'
  | 'Guidance'
  | 'Tawheed'
  | 'Steadfastness';

export interface ReflectionNote {
  id: string;
  ayahKey: string;
  surahId: string;
  ayahNumber: number;
  themeTag: ReflectionThemeTag;
  keyLesson: string;
  personalApplication: string;
  vocabularyNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReaderPreferences {
  arabicFontScale: number; // 1 = 28px, 1.15 = 32px, 1.3 = 36px
  showTajweedColors: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  dailyAyahGoal: number;
}

export interface AcademyProgressState {
  activeSurahId: string;
  activeAyahNumber: number;
  hifzProgress: Record<string, HifzRecord>;
  recitedAyahs: string[];
  bookmarkedAyahs: string[];
  reflectionNotes: ReflectionNote[];
  preferences: ReaderPreferences;
}
