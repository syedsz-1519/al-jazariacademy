import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Download,
  Feather,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CURRICULUM_SURAHS, getSurahById, makeAyahKey } from '../data/curriculum';
import { AcademyProgressState, HifzStatus, WorkspaceView } from '../types/academy';
import { GeometricStarBackdrop } from './StarMotif';

interface OverviewViewProps {
  state: AcademyProgressState;
  stats: {
    totalAyahs: number;
    recitedCount: number;
    masteredCount: number;
    developingCount: number;
    needsRevisionCount: number;
    notesCount: number;
    bookmarksCount: number;
    dailyProgressCount: number;
    dailyProgressPct: number;
    surahMasteryPct: (surahId: string) => number;
  };
  onNavigate: (view: WorkspaceView) => void;
  onJumpToAyah: (view: WorkspaceView, surahId: string, ayahNumber: number) => void;
  onUpdateGoal: (goal: number) => void;
  onExportJson: () => void;
  onResetProgress: () => void;
}

const TRACK_FILTERS = [
  'All Tracks',
  'Foundational',
  'Protection & Light',
  'Daily Contemplation',
] as const;

function getHifzStatusLabel(status: HifzStatus): {
  label: string;
  colorClass: string;
  dotColor: string;
} {
  switch (status) {
    case 'mastered':
      return {
        label: 'Mastered',
        colorClass: 'text-[#146C43] bg-[#E8F6ED]',
        dotColor: 'bg-[#2E9E6B]',
      };
    case 'developing':
      return {
        label: 'Developing',
        colorClass: 'text-[#17316B] bg-[#E8EDF8]',
        dotColor: 'bg-[#17316B]',
      };
    case 'needs_revision':
      return {
        label: 'Needs Revision',
        colorClass: 'text-[#8A5A00] bg-[#FFF4E0]',
        dotColor: 'bg-[#E0A030]',
      };
    default:
      return {
        label: 'Not Started',
        colorClass: 'text-[#4B5675] bg-[#F5F7FB]',
        dotColor: 'bg-[#94A3B8]',
      };
  }
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  state,
  stats,
  onNavigate,
  onJumpToAyah,
  onUpdateGoal,
  onExportJson,
  onResetProgress,
}) => {
  const [expandedSurahId, setExpandedSurahId] = useState<string>(state.activeSurahId);
  const [trackFilter, setTrackFilter] =
    useState<(typeof TRACK_FILTERS)[number]>('All Tracks');
  const [confirmingReset, setConfirmingReset] = useState(false);

  const activeSurah = getSurahById(state.activeSurahId);

  const filteredSurahs = useMemo(() => {
    if (trackFilter === 'All Tracks') return CURRICULUM_SURAHS;
    return CURRICULUM_SURAHS.filter((s) => s.trackTheme === trackFilter);
  }, [trackFilter]);

  const milestones = [
    {
      step: 1,
      title: 'Tajweed Recitation',
      detail: `${stats.recitedCount} Ayahs practiced`,
      completed: stats.recitedCount >= 4,
      active: stats.recitedCount < 4,
    },
    {
      step: 2,
      title: 'Hifz Retention',
      detail: `${stats.masteredCount} Ayahs mastered`,
      completed: stats.masteredCount >= 6,
      active: stats.recitedCount >= 4 && stats.masteredCount < 6,
    },
    {
      step: 3,
      title: 'Tafseer Reflection',
      detail: `${stats.notesCount} journal entries`,
      completed: stats.notesCount >= 3,
      active: stats.masteredCount >= 6 && stats.notesCount < 3,
    },
  ];

  return (
    <div className="space-y-10 pb-14">
      {/* Hero Banner with 4% geometric star motif */}
      <section className="relative overflow-hidden academy-card px-6 py-8 sm:px-10 sm:py-10">
        <GeometricStarBackdrop className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Summary */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675]">
              <span>Quranic Study Workspace</span>
              <span aria-hidden="true">·</span>
              <span>Juz 1, 29 &amp; 30</span>
              <span aria-hidden="true">·</span>
              <span>Saved Locally</span>
            </div>

            <h1 className="font-display text-[32px] sm:text-[42px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#14213D] [text-wrap:balance]">
              Calm, structured mastery for Tajweed, Hifz, and Tafseer.
            </h1>

            <p className="text-[16px] leading-[1.6] text-[#4B5675] max-w-[60ch]">
              Continue your active study in{' '}
              <span className="font-semibold text-[#17316B]">
                {activeSurah.name}
              </span>{' '}
              (Ayah {state.activeAyahNumber}). Practice articulation rules, test
              active memorization recall, and record contemplative journal notes
              in one unified desk.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  onJumpToAyah('reader', state.activeSurahId, state.activeAyahNumber)
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open {activeSurah.name}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onJumpToAyah('hifz', state.activeSurahId, state.activeAyahNumber)
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-4 h-4" />
                <span>Practice Hifz Recall</span>
              </button>
            </div>
          </div>

          {/* Right Hero Panel: Daily Goal + Milestone Stepper (separated cleanly with hairline divider, no nested card box) */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#E1E6F2] lg:pl-8 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-display text-[15px] font-semibold text-[#14213D]">
                  Daily Study Milestone
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Decrease daily Ayah goal"
                    onClick={() =>
                      onUpdateGoal(Math.max(3, state.preferences.dailyAyahGoal - 1))
                    }
                    className="w-7 h-7 rounded-[8px] border border-[#E1E6F2] bg-[#FFFFFF] hover:bg-[#E8EDF8] flex items-center justify-center text-[#17316B] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[13px] font-medium text-[#4B5675] tabular-nums px-1.5">
                    {stats.dailyProgressCount} / {state.preferences.dailyAyahGoal} Ayahs
                  </span>
                  <button
                    type="button"
                    aria-label="Increase daily Ayah goal"
                    onClick={() =>
                      onUpdateGoal(Math.min(25, state.preferences.dailyAyahGoal + 1))
                    }
                    className="w-7 h-7 rounded-[8px] border border-[#E1E6F2] bg-[#FFFFFF] hover:bg-[#E8EDF8] flex items-center justify-center text-[#17316B] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="h-2.5 w-full rounded-full bg-[#E1E6F2] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${stats.dailyProgressPct}%`,
                    backgroundColor:
                      stats.dailyProgressPct >= 100 ? '#2E9E6B' : '#17316B',
                  }}
                />
              </div>
              <p className="mt-2 text-[13px] text-[#4B5675] tabular-nums">
                {stats.dailyProgressPct}% toward daily recitation &amp; memorization target
              </p>
            </div>

            <div className="border-t border-[#E1E6F2] pt-5">
              <div className="text-[13px] font-medium text-[#4B5675] mb-3.5">
                Academy Study Cycle
              </div>
              <ol className="space-y-3.5">
                {milestones.map((m, idx) => (
                  <li key={m.step} className="relative flex items-start gap-3.5">
                    {idx < milestones.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[15px] top-[32px] bottom-[-14px] w-[2px] bg-[#E1E6F2]"
                      />
                    )}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold tabular-nums shrink-0 ${
                        m.completed
                          ? 'bg-[#17316B] text-[#FFFFFF]'
                          : m.active
                          ? 'bg-[#FFFFFF] border-2 border-[#C8A35A] text-[#17316B]'
                          : 'bg-[#F5F7FB] border border-[#E1E6F2] text-[#4B5675]'
                      }`}
                    >
                      {m.completed ? <Check className="w-4 h-4" /> : m.step}
                    </div>
                    <div className="pt-0.5 min-w-0">
                      <div className="font-display text-[14px] font-semibold text-[#14213D]">
                        {m.title}
                      </div>
                      <div className="text-[13px] text-[#4B5675] tabular-nums">
                        {m.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: 3 Core Learning Modules */}
      <section aria-label="Learning tracks" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Tajweed Reader */}
        <article className="academy-card-interactive p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-full bg-[#E8EDF8] flex items-center justify-center text-[#17316B]">
                <BookOpen className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[13px] font-medium text-[#4B5675] tabular-nums">
                {stats.recitedCount} / {stats.totalAyahs} recited
              </span>
            </div>
            <h2 className="font-display text-[20px] font-semibold text-[#14213D] mb-2">
              Tajweed Ayah Reader
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#4B5675]">
              Inspect color-coded Ghunnah, Qalqalah, Madd, Idgham, and Ikhfa
              segments with full RTL tashkeel and Makhraj articulation notes.
            </p>
          </div>
          <div className="pt-5 mt-5 border-t border-[#E1E6F2] flex items-center justify-between">
            <span className="text-[13px] text-[#4B5675]">5 Tajweed rule guides</span>
            <button
              type="button"
              onClick={() => onNavigate('reader')}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer"
            >
              <span>Open Reader</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Card 2: Hifz Tracker */}
        <article className="academy-card-interactive p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-full bg-[#FCEFF3] flex items-center justify-center text-[#8A2846]">
                <Sparkles className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[13px] font-medium text-[#4B5675] tabular-nums">
                {stats.masteredCount} mastered · {stats.needsRevisionCount} due
              </span>
            </div>
            <h2 className="font-display text-[20px] font-semibold text-[#14213D] mb-2">
              Hifz Revision Tracker
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#4B5675]">
              Test verse retention using interactive word-masking active recall,
              grade confidence levels, and clear revision queues.
            </p>
          </div>
          <div className="pt-5 mt-5 border-t border-[#E1E6F2] flex items-center justify-between">
            <span className="text-[13px] text-[#4B5675] tabular-nums">
              {stats.developingCount} developing
            </span>
            <button
              type="button"
              onClick={() => onNavigate('hifz')}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer"
            >
              <span>Open Hifz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Card 3: Tafseer Journal */}
        <article className="academy-card-interactive p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-full bg-[#EFEAF8] flex items-center justify-center text-[#17316B]">
                <Feather className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[13px] font-medium text-[#4B5675] tabular-nums">
                {stats.notesCount} notes · {stats.bookmarksCount} pinned
              </span>
            </div>
            <h2 className="font-display text-[20px] font-semibold text-[#14213D] mb-2">
              Tafseer Reflection Journal
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#4B5675]">
              Read classical thematic summaries alongside each verse and compose
              structured personal reflections linked to specific Ayahs.
            </p>
          </div>
          <div className="pt-5 mt-5 border-t border-[#E1E6F2] flex items-center justify-between">
            <span className="text-[13px] text-[#4B5675] flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-[#C8A35A]" />
              <span>Bookmarked verses synced</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('tafseer')}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer"
            >
              <span>Open Journal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </section>

      {/* Curriculum Accordion */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[24px] font-semibold text-[#14213D]">
              Curriculum &amp; Surah Mastery
            </h2>
            <p className="text-[14px] text-[#4B5675] mt-1">
              Expand any Surah to inspect verse-level memorization status and jump directly into a study module.
            </p>
          </div>

          {/* Interactive Track Filter */}
          <div
            role="tablist"
            aria-label="Filter Surahs by track"
            className="inline-flex items-center gap-1 p-1 bg-[#E8EDF8] rounded-full overflow-x-auto max-w-full"
          >
            {TRACK_FILTERS.map((filter) => {
              const active = trackFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrackFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FFFFFF] text-[#17316B] shadow-xs'
                      : 'text-[#4B5675] hover:text-[#14213D]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="academy-card divide-y divide-[#E1E6F2] overflow-hidden">
          {filteredSurahs.map((surah) => {
            const isExpanded = expandedSurahId === surah.id;
            const masteryPct = stats.surahMasteryPct(surah.id);
            const recitedInSurah = surah.ayahs.filter((a) =>
              state.recitedAyahs.includes(makeAyahKey(surah.id, a.number))
            ).length;

            return (
              <div key={surah.id} className="bg-[#FFFFFF]">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedSurahId(isExpanded ? '' : surah.id)
                  }
                  className="w-full px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left hover:bg-[#F5F7FB]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#E8EDF8] text-[#17316B] font-display text-[14px] font-semibold flex items-center justify-center tabular-nums shrink-0">
                      {surah.number}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-display text-[17px] font-semibold text-[#14213D]">
                          {surah.name}
                        </span>
                        <span className="font-arabic text-[18px] text-[#17316B] leading-none">
                          {surah.arabicName}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#4B5675] mt-0.5">
                        <span>{surah.englishMeaning}</span>
                        <span aria-hidden="true">·</span>
                        <span>{surah.revelationPlace}</span>
                        <span aria-hidden="true">·</span>
                        <span>{surah.ayahCountLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Juz {surah.juz}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0">
                    <div className="w-36 hidden sm:block">
                      <div className="flex items-center justify-between text-[12px] text-[#4B5675] tabular-nums mb-1.5">
                        <span>Hifz Mastery</span>
                        <span className="font-semibold text-[#14213D]">{masteryPct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#E1E6F2] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${masteryPct}%`,
                            backgroundColor: masteryPct === 100 ? '#2E9E6B' : '#17316B',
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-[13px] text-[#4B5675] tabular-nums">
                      {recitedInSurah}/{surah.ayahs.length} recited
                    </span>

                    <ChevronRight
                      className={`w-5 h-5 text-[#4B5675] transition-transform duration-200 ${
                        isExpanded ? 'rotate-90 text-[#17316B]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 bg-[#F5F7FB]/40 border-t border-[#E1E6F2] space-y-4">
                    <p className="text-[14px] text-[#4B5675] leading-[1.6]">
                      {surah.overviewNote}
                    </p>

                    <div className="divide-y divide-[#E1E6F2] border-t border-[#E1E6F2]">
                      {surah.ayahs.map((ayah) => {
                        const key = makeAyahKey(surah.id, ayah.number);
                        const hifzStatus =
                          state.hifzProgress[key]?.status ?? 'unstarted';
                        const badge = getHifzStatusLabel(hifzStatus);
                        const isRecited = state.recitedAyahs.includes(key);

                        return (
                          <div
                            key={key}
                            className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <span className="w-7 h-7 rounded-full bg-[#FFFFFF] border border-[#E1E6F2] text-[12px] font-semibold text-[#17316B] flex items-center justify-center tabular-nums shrink-0 mt-0.5">
                                {ayah.number}
                              </span>
                              <div className="min-w-0">
                                <p className="font-arabic text-[19px] text-[#14213D] leading-[1.9] truncate">
                                  {ayah.segments.map((s) => s.text).join(' ')}
                                </p>
                                <p className="text-[13px] text-[#4B5675] line-clamp-1">
                                  {ayah.translation}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 shrink-0 pl-10 md:pl-0">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${badge.colorClass}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`}
                                  aria-hidden="true"
                                />
                                {badge.label}
                              </span>

                              {isRecited && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#E8F6ED] text-[#146C43]">
                                  <Check className="w-3 h-3" />
                                  Recited
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  onJumpToAyah('reader', surah.id, ayah.number)
                                }
                                className="px-3 py-1 rounded-[10px] bg-[#FFFFFF] border border-[#E1E6F2] hover:bg-[#E8EDF8] text-[12px] font-medium text-[#17316B] transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Tajweed
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onJumpToAyah('hifz', surah.id, ayah.number)
                                }
                                className="px-3 py-1 rounded-[10px] bg-[#FFFFFF] border border-[#E1E6F2] hover:bg-[#FCEFF3] text-[12px] font-medium text-[#8A2846] transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Hifz
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onJumpToAyah('tafseer', surah.id, ayah.number)
                                }
                                className="px-3 py-1 rounded-[10px] bg-[#FFFFFF] border border-[#E1E6F2] hover:bg-[#EFEAF8] text-[12px] font-medium text-[#17316B] transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Tafseer
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiet Local Data Backup & Reset Strip */}
      <footer className="relative overflow-hidden rounded-[20px] border border-[#E1E6F2] bg-[#FFFFFF] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <GeometricStarBackdrop className="absolute inset-0 w-full h-full opacity-75" />
        <div className="relative z-10 text-[13px] text-[#4B5675]">
          <span className="font-semibold text-[#14213D]">Al-Jazari Academy</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>All study progress and reflection notes are stored locally in your browser.</span>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] hover:bg-[#FCEFF3] text-[#4B5675] hover:text-[#8A2846] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmingReset(false);
                }}
                className="px-3 py-2 rounded-[12px] bg-[#8A2846] text-[#FFFFFF] text-[13px] font-medium cursor-pointer whitespace-nowrap"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="px-3 py-2 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[#4B5675] text-[13px] font-medium cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
