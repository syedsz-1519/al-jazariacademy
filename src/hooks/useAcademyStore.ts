import { useCallback, useEffect, useMemo, useState } from 'react';
import { CURRICULUM_SURAHS, makeAyahKey } from '../data/curriculum';
import {
  AcademyProgressState,
  HifzStatus,
  ReaderPreferences,
  ReflectionNote,
  ReflectionThemeTag,
} from '../types/academy';

const STORAGE_KEY = 'al_jazari_academy_state_v1';

const INITIAL_PROGRESS_STATE: AcademyProgressState = {
  activeSurahId: 'al-fatihah',
  activeAyahNumber: 1,
  hifzProgress: {
    'al-fatihah:1': {
      status: 'mastered',
      lastReviewedAt: '2026-11-12T08:30:00.000Z',
      reviewCount: 5,
    },
    'al-fatihah:2': {
      status: 'mastered',
      lastReviewedAt: '2026-11-12T08:35:00.000Z',
      reviewCount: 4,
    },
    'al-fatihah:3': {
      status: 'developing',
      lastReviewedAt: '2026-11-11T19:00:00.000Z',
      reviewCount: 2,
    },
    'al-fatihah:4': {
      status: 'needs_revision',
      lastReviewedAt: '2026-11-09T14:15:00.000Z',
      reviewCount: 1,
    },
    'al-asr:1': {
      status: 'mastered',
      lastReviewedAt: '2026-11-10T07:10:00.000Z',
      reviewCount: 6,
    },
    'al-asr:2': {
      status: 'developing',
      lastReviewedAt: '2026-11-10T07:15:00.000Z',
      reviewCount: 3,
    },
    'al-ikhlas:1': {
      status: 'mastered',
      lastReviewedAt: '2026-11-12T20:00:00.000Z',
      reviewCount: 7,
    },
  },
  recitedAyahs: ['al-fatihah:1', 'al-fatihah:2', 'al-fatihah:3', 'al-asr:1', 'al-ikhlas:1'],
  bookmarkedAyahs: ['al-fatihah:5', 'al-asr:3'],
  reflectionNotes: [
    {
      id: 'note-seed-1',
      ayahKey: 'al-fatihah:5',
      surahId: 'al-fatihah',
      ayahNumber: 5,
      themeTag: 'Guidance',
      keyLesson:
        'Placing "Iyyaka" before the verb centers worship and seeking help exclusively on Allah, relieving self-reliance stress.',
      personalApplication:
        'Before opening daily tasks each morning, pause to pair effort with quiet Isti’anah (asking Allah for clarity).',
      vocabularyNote: 'نَسْتَعِينُ (Nasta‘in) — Form X verb meaning to earnestly seek aid.',
      createdAt: '2026-11-11T09:15:00.000Z',
      updatedAt: '2026-11-11T09:15:00.000Z',
    },
    {
      id: 'note-seed-2',
      ayahKey: 'al-asr:3',
      surahId: 'al-asr',
      ayahNumber: 3,
      themeTag: 'Steadfastness',
      keyLesson:
        'Time slips away unless invested in faith, sincere deeds, mutual encouragement in truth, and patient endurance.',
      personalApplication:
        'Check in with a study partner this week to share one reflection and encourage steady revision.',
      vocabularyNote: 'تَوَاصَوْا (Tawasaw) — Reciprocal encouragement done with gentleness.',
      createdAt: '2026-11-12T17:40:00.000Z',
      updatedAt: '2026-11-12T17:40:00.000Z',
    },
  ],
  preferences: {
    arabicFontScale: 1,
    showTajweedColors: true,
    showTransliteration: true,
    showTranslation: true,
    dailyAyahGoal: 7,
  },
};

function loadInitialState(): AcademyProgressState {
  if (typeof window === 'undefined') {
    return INITIAL_PROGRESS_STATE;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS_STATE;
    const parsed = JSON.parse(raw) as Partial<AcademyProgressState>;
    return {
      ...INITIAL_PROGRESS_STATE,
      ...parsed,
      preferences: {
        ...INITIAL_PROGRESS_STATE.preferences,
        ...(parsed.preferences ?? {}),
      },
      hifzProgress: parsed.hifzProgress ?? INITIAL_PROGRESS_STATE.hifzProgress,
      recitedAyahs: Array.isArray(parsed.recitedAyahs)
        ? parsed.recitedAyahs
        : INITIAL_PROGRESS_STATE.recitedAyahs,
      bookmarkedAyahs: Array.isArray(parsed.bookmarkedAyahs)
        ? parsed.bookmarkedAyahs
        : INITIAL_PROGRESS_STATE.bookmarkedAyahs,
      reflectionNotes: Array.isArray(parsed.reflectionNotes)
        ? parsed.reflectionNotes
        : INITIAL_PROGRESS_STATE.reflectionNotes,
    };
  } catch {
    return INITIAL_PROGRESS_STATE;
  }
}

export function useAcademyStore() {
  const [state, setState] = useState<AcademyProgressState>(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [state]);

  const setActiveStudyTarget = useCallback((surahId: string, ayahNumber = 1) => {
    setState((prev) => ({
      ...prev,
      activeSurahId: surahId,
      activeAyahNumber: ayahNumber,
    }));
  }, []);

  const toggleRecitedAyah = useCallback((ayahKey: string) => {
    setState((prev) => {
      const exists = prev.recitedAyahs.includes(ayahKey);
      return {
        ...prev,
        recitedAyahs: exists
          ? prev.recitedAyahs.filter((k) => k !== ayahKey)
          : [...prev.recitedAyahs, ayahKey],
      };
    });
  }, []);

  const toggleBookmarkAyah = useCallback((ayahKey: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedAyahs.includes(ayahKey);
      return {
        ...prev,
        bookmarkedAyahs: exists
          ? prev.bookmarkedAyahs.filter((k) => k !== ayahKey)
          : [...prev.bookmarkedAyahs, ayahKey],
      };
    });
  }, []);

  const updateHifzStatus = useCallback((ayahKey: string, status: HifzStatus) => {
    setState((prev) => {
      const current = prev.hifzProgress[ayahKey];
      return {
        ...prev,
        hifzProgress: {
          ...prev.hifzProgress,
          [ayahKey]: {
            status,
            lastReviewedAt: new Date().toISOString(),
            reviewCount: (current?.reviewCount ?? 0) + 1,
          },
        },
      };
    });
  }, []);

  const addOrUpdateReflectionNote = useCallback(
    (payload: {
      id?: string;
      surahId: string;
      ayahNumber: number;
      themeTag: ReflectionThemeTag;
      keyLesson: string;
      personalApplication: string;
      vocabularyNote: string;
    }) => {
      const now = new Date().toISOString();
      const ayahKey = makeAyahKey(payload.surahId, payload.ayahNumber);

      setState((prev) => {
        if (payload.id) {
          return {
            ...prev,
            reflectionNotes: prev.reflectionNotes.map((note) =>
              note.id === payload.id
                ? {
                    ...note,
                    surahId: payload.surahId,
                    ayahNumber: payload.ayahNumber,
                    ayahKey,
                    themeTag: payload.themeTag,
                    keyLesson: payload.keyLesson.trim(),
                    personalApplication: payload.personalApplication.trim(),
                    vocabularyNote: payload.vocabularyNote.trim(),
                    updatedAt: now,
                  }
                : note
            ),
          };
        }

        const newNote: ReflectionNote = {
          id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          ayahKey,
          surahId: payload.surahId,
          ayahNumber: payload.ayahNumber,
          themeTag: payload.themeTag,
          keyLesson: payload.keyLesson.trim(),
          personalApplication: payload.personalApplication.trim(),
          vocabularyNote: payload.vocabularyNote.trim(),
          createdAt: now,
          updatedAt: now,
        };

        return {
          ...prev,
          reflectionNotes: [newNote, ...prev.reflectionNotes],
        };
      });
    },
    []
  );

  const deleteReflectionNote = useCallback((noteId: string) => {
    setState((prev) => ({
      ...prev,
      reflectionNotes: prev.reflectionNotes.filter((n) => n.id !== noteId),
    }));
  }, []);

  const updatePreferences = useCallback((partial: Partial<ReaderPreferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...partial,
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(INITIAL_PROGRESS_STATE);
  }, []);

  const exportProgressJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `al-jazari-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const stats = useMemo(() => {
    const totalAyahs = CURRICULUM_SURAHS.reduce((acc, s) => acc + s.ayahs.length, 0);
    const recitedCount = state.recitedAyahs.length;
    const masteredCount = Object.values(state.hifzProgress).filter(
      (r) => r.status === 'mastered'
    ).length;
    const developingCount = Object.values(state.hifzProgress).filter(
      (r) => r.status === 'developing'
    ).length;
    const needsRevisionCount = Object.values(state.hifzProgress).filter(
      (r) => r.status === 'needs_revision'
    ).length;
    const notesCount = state.reflectionNotes.length;
    const bookmarksCount = state.bookmarkedAyahs.length;

    const dailyProgressCount = Math.min(
      state.preferences.dailyAyahGoal,
      recitedCount + masteredCount
    );
    const dailyProgressPct = Math.min(
      100,
      Math.round((dailyProgressCount / Math.max(1, state.preferences.dailyAyahGoal)) * 100)
    );

    const surahMasteryPct = (surahId: string) => {
      const surah = CURRICULUM_SURAHS.find((s) => s.id === surahId);
      if (!surah) return 0;
      const masteredInSurah = surah.ayahs.filter(
        (a) => state.hifzProgress[makeAyahKey(surahId, a.number)]?.status === 'mastered'
      ).length;
      return Math.round((masteredInSurah / surah.ayahs.length) * 100);
    };

    return {
      totalAyahs,
      recitedCount,
      masteredCount,
      developingCount,
      needsRevisionCount,
      notesCount,
      bookmarksCount,
      dailyProgressCount,
      dailyProgressPct,
      surahMasteryPct,
    };
  }, [state]);

  return {
    state,
    stats,
    setActiveStudyTarget,
    toggleRecitedAyah,
    toggleBookmarkAyah,
    updateHifzStatus,
    addOrUpdateReflectionNote,
    deleteReflectionNote,
    updatePreferences,
    resetProgress,
    exportProgressJson,
  };
}
