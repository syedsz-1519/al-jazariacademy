import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  CURRICULUM_SURAHS,
  getSurahById,
  makeAyahKey,
} from '../data/curriculum';
import { AcademyProgressState, HifzStatus } from '../types/academy';

interface HifzTrackerViewProps {
  state: AcademyProgressState;
  stats: {
    totalAyahs: number;
    masteredCount: number;
    developingCount: number;
    needsRevisionCount: number;
  };
  onSelectTarget: (surahId: string, ayahNumber: number) => void;
  onUpdateHifzStatus: (ayahKey: string, status: HifzStatus) => void;
}

type MaskMode = 'none' | 'half' | 'all';
type MatrixFilter = 'all' | 'needs_revision' | 'developing' | 'mastered' | 'unstarted';

const MATRIX_FILTERS: { id: MatrixFilter; label: string }[] = [
  { id: 'all', label: 'All Ayahs' },
  { id: 'needs_revision', label: 'Due for Review' },
  { id: 'developing', label: 'In Progress' },
  { id: 'mastered', label: 'Mastered' },
  { id: 'unstarted', label: 'Not Started' },
];

function getStatusMeta(status: HifzStatus) {
  switch (status) {
    case 'mastered':
      return {
        label: 'Mastered',
        bg: 'bg-[#E8F6ED]',
        text: 'text-[#146C43]',
        icon: <Check className="w-3.5 h-3.5" />,
      };
    case 'developing':
      return {
        label: 'In Progress',
        bg: 'bg-[#E8EDF8]',
        text: 'text-[#17316B]',
        icon: <Clock className="w-3.5 h-3.5" />,
      };
    case 'needs_revision':
      return {
        label: 'Due for Review',
        bg: 'bg-[#FFF4E0]',
        text: 'text-[#8A5A00]',
        icon: <AlertCircle className="w-3.5 h-3.5" />,
      };
    default:
      return {
        label: 'Not Started',
        bg: 'bg-[#F5F7FB]',
        text: 'text-[#4B5675]',
        icon: <Sparkles className="w-3.5 h-3.5" />,
      };
  }
}

export const HifzTrackerView: React.FC<HifzTrackerViewProps> = ({
  state,
  stats,
  onSelectTarget,
  onUpdateHifzStatus,
}) => {
  const activeSurah = getSurahById(state.activeSurahId);
  const activeAyah =
    activeSurah.ayahs.find((a) => a.number === state.activeAyahNumber) ??
    activeSurah.ayahs[0];
  const activeKey = makeAyahKey(activeSurah.id, activeAyah.number);

  const [maskMode, setMaskMode] = useState<MaskMode>('half');
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [showClueTranslation, setShowClueTranslation] = useState(true);
  const [matrixFilter, setMatrixFilter] = useState<MatrixFilter>('all');

  useEffect(() => {
    setRevealedIds([]);
  }, [activeKey, maskMode]);

  const currentRecord = state.hifzProgress[activeKey];
  const currentStatus: HifzStatus = currentRecord?.status ?? 'unstarted';
  const currentMeta = getStatusMeta(currentStatus);

  const masteryPct = Math.round(
    (stats.masteredCount / Math.max(1, stats.totalAyahs)) * 100
  );

  const isSegmentMasked = (segmentId: string, index: number) => {
    if (maskMode === 'none') return false;
    if (revealedIds.includes(segmentId)) return false;
    if (maskMode === 'all') return true;
    // Mask alternating words for 50% active recall
    return index % 2 === 1 || (activeAyah.segments.length === 1 && index === 0);
  };

  const handleToggleRevealSegment = (segmentId: string) => {
    setRevealedIds((prev) =>
      prev.includes(segmentId) ? prev : [...prev, segmentId]
    );
  };

  const handleStepAyah = (direction: -1 | 1) => {
    const idx = activeSurah.ayahs.findIndex((a) => a.number === activeAyah.number);
    const nextIdx = idx + direction;
    if (nextIdx >= 0 && nextIdx < activeSurah.ayahs.length) {
      onSelectTarget(activeSurah.id, activeSurah.ayahs[nextIdx].number);
    }
  };

  const allMatrixRows = useMemo(() => {
    return CURRICULUM_SURAHS.flatMap((surah) =>
      surah.ayahs.map((ayah) => {
        const key = makeAyahKey(surah.id, ayah.number);
        const rec = state.hifzProgress[key];
        const status: HifzStatus = rec?.status ?? 'unstarted';
        return {
          key,
          surahId: surah.id,
          surahName: surah.name,
          ayahNumber: ayah.number,
          arabicPreview: ayah.segments.map((s) => s.text).join(' '),
          status,
          reviewCount: rec?.reviewCount ?? 0,
          lastReviewedAt: rec?.lastReviewedAt ?? null,
        };
      })
    );
  }, [state.hifzProgress]);

  const filteredRows = useMemo(() => {
    if (matrixFilter === 'all') return allMatrixRows;
    return allMatrixRows.filter((row) => row.status === matrixFilter);
  }, [allMatrixRows, matrixFilter]);

  const hifzMilestones = [
    {
      step: 1,
      title: 'Familiarization',
      subtitle: `${stats.developingCount + stats.masteredCount} Ayahs started`,
      done: stats.developingCount + stats.masteredCount >= 6,
    },
    {
      step: 2,
      title: 'Active Recall Practice',
      subtitle: `${stats.needsRevisionCount} due for review`,
      done: stats.masteredCount >= 4 && stats.needsRevisionCount === 0,
    },
    {
      step: 3,
      title: 'Verified Mastery',
      subtitle: `${stats.masteredCount} / ${stats.totalAyahs} Ayahs solid`,
      done: stats.masteredCount === stats.totalAyahs,
    },
  ];

  return (
    <div className="space-y-8 pb-14">
      {/* Hifz Summary & Milestone Header */}
      <section className="academy-card p-6 sm:p-8 bg-[#FFFFFF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEFF3] text-[#8A2846] text-[13px] font-medium">
              <Award className="w-3.5 h-3.5 text-[#C8A35A]" />
              <span>Hifz Memorization &amp; Revision</span>
            </div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-semibold text-[#14213D] leading-[1.2] tracking-[-0.02em]">
              Active Recall &amp; Retention Checkpoints
            </h1>
            <p className="text-[15px] text-[#4B5675] leading-[1.6]">
              Hide words to test your memory from heart, reveal individual hints
              when needed, and mark each Ayah’s revision confidence.
            </p>

            <div className="pt-2">
              <div className="flex items-center justify-between text-[13px] mb-1.5 tabular-nums">
                <span className="font-medium text-[#4B5675]">
                  Curriculum Memorization Mastery
                </span>
                <span className="font-semibold text-[#14213D]">
                  {stats.masteredCount} / {stats.totalAyahs} Ayahs ({masteryPct}%)
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#E1E6F2] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${masteryPct}%`,
                    backgroundColor: masteryPct === 100 ? '#2E9E6B' : '#17316B',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3-Node Horizontal Milestone Stepper */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#E1E6F2] lg:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {hifzMilestones.map((m, idx) => {
                const isActive = !m.done && (idx === 0 || hifzMilestones[idx - 1].done);
                return (
                  <div
                    key={m.step}
                    className="p-4 rounded-[16px] bg-[#FCEFF3]/45 flex flex-col gap-2.5"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold tabular-nums ${
                        m.done
                          ? 'bg-[#17316B] text-[#FFFFFF]'
                          : isActive
                          ? 'bg-[#FFFFFF] border-2 border-[#C8A35A] text-[#17316B]'
                          : 'bg-[#FFFFFF] border border-[#E1E6F2] text-[#4B5675]'
                      }`}
                    >
                      {m.done ? <Check className="w-4 h-4" /> : m.step}
                    </div>
                    <div>
                      <div className="font-display text-[14px] font-semibold text-[#14213D]">
                        {m.title}
                      </div>
                      <div className="text-[12px] text-[#4B5675] mt-0.5 tabular-nums">
                        {m.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Active Recall Practice Workspace */}
      <section className="academy-card overflow-hidden">
        {/* Top Surah & Ayah Picker Strip */}
        <div className="px-6 py-4 bg-[#FCEFF3]/55 border-b border-[#E1E6F2] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="hifz-surah-select" className="sr-only">
              Select Surah
            </label>
            <select
              id="hifz-surah-select"
              value={activeSurah.id}
              onChange={(e) => onSelectTarget(e.target.value, 1)}
              className="h-10 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] font-medium text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 cursor-pointer"
            >
              {CURRICULUM_SURAHS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.number}. {s.name} ({s.ayahs.length} Ayahs)
                </option>
              ))}
            </select>

            <div className="inline-flex items-center gap-1 bg-[#FFFFFF] border border-[#E1E6F2] rounded-[12px] p-1">
              <button
                type="button"
                aria-label="Previous Ayah"
                disabled={activeAyah.number <= 1}
                onClick={() => handleStepAyah(-1)}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#17316B] hover:bg-[#E8EDF8] disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2.5 text-[13px] font-semibold text-[#14213D] tabular-nums">
                Ayah {activeAyah.number} / {activeSurah.ayahs.length}
              </span>
              <button
                type="button"
                aria-label="Next Ayah"
                disabled={activeAyah.number >= activeSurah.ayahs.length}
                onClick={() => handleStepAyah(1)}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#17316B] hover:bg-[#E8EDF8] disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${currentMeta.bg} ${currentMeta.text}`}
            >
              {currentMeta.icon}
              <span>{currentMeta.label}</span>
            </span>
          </div>

          {/* Masking Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Recall masking level"
              className="inline-flex items-center gap-1 p-1 bg-[#FFFFFF] border border-[#E1E6F2] rounded-full"
            >
              {(
                [
                  { id: 'none', label: 'Show All' },
                  { id: 'half', label: 'Mask 50%' },
                  { id: 'all', label: 'Mask All' },
                ] as { id: MaskMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMaskMode(opt.id)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    maskMode === opt.id
                      ? 'bg-[#17316B] text-[#FFFFFF]'
                      : 'text-[#4B5675] hover:text-[#14213D]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setRevealedIds([])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#FFFFFF] border border-[#E1E6F2] hover:bg-[#E8EDF8] text-[12px] font-medium text-[#17316B] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-hide</span>
            </button>

            <button
              type="button"
              onClick={() => setShowClueTranslation((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#FFFFFF] border border-[#E1E6F2] hover:bg-[#E8EDF8] text-[12px] font-medium text-[#4B5675] cursor-pointer"
            >
              {showClueTranslation ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>Meaning Clue</span>
            </button>
          </div>
        </div>

        {/* Recall Stage */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="text-[13px] font-medium text-[#4B5675]">
              {maskMode === 'none'
                ? 'Reading mode — switch to Mask 50% or Mask All to test recall.'
                : 'Recite from memory, then click any shaded block to reveal that word.'}
            </div>
          </div>

          <div
            dir="rtl"
            className="font-arabic text-[32px] sm:text-[38px] text-[#14213D] flex flex-wrap justify-center gap-x-3 gap-y-4 py-4"
          >
            {activeAyah.segments.map((seg, idx) => {
              const masked = isSegmentMasked(seg.id, idx);
              if (masked) {
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => handleToggleRevealSegment(seg.id)}
                    aria-label="Reveal hidden Arabic word"
                    className="min-w-[84px] px-4 py-1 rounded-[12px] bg-[#FCEFF3] border border-[#E1E6F2] hover:border-[#C8A35A] text-[#8A2846] text-[15px] font-sans font-medium flex items-center justify-center transition-colors cursor-pointer"
                  >
                    Reveal
                  </button>
                );
              }
              return (
                <span
                  key={seg.id}
                  className={`px-1.5 rounded-[10px] transition-colors ${
                    revealedIds.includes(seg.id)
                      ? 'bg-[#E8EDF8]/70 text-[#17316B]'
                      : ''
                  }`}
                >
                  {seg.text}
                </span>
              );
            })}
            <span className="text-[20px] text-[#C8A35A] font-sans font-semibold self-center px-1">
              ﴿{activeAyah.number}﴾
            </span>
          </div>

          {showClueTranslation && (
            <p className="text-center text-[15px] text-[#4B5675] max-w-[60ch] mx-auto pt-2 border-t border-[#E1E6F2]">
              “{activeAyah.translation}”
            </p>
          )}

          {/* Recall Grading Bar */}
          <div className="pt-4 border-t border-[#E1E6F2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[13px] text-[#4B5675] tabular-nums">
              Logged reviews for this Ayah:{' '}
              <span className="font-semibold text-[#14213D]">
                {currentRecord?.reviewCount ?? 0}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => onUpdateHifzStatus(activeKey, 'needs_revision')}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-[14px] font-medium border transition-colors cursor-pointer ${
                  currentStatus === 'needs_revision'
                    ? 'bg-[#FFF4E0] border-[#E0A030] text-[#8A5A00]'
                    : 'bg-[#FFFFFF] border-[#E1E6F2] hover:bg-[#FFF4E0]/60 text-[#4B5675]'
                }`}
              >
                <AlertCircle className="w-4 h-4 text-[#E0A030]" />
                <span>Needs Revision</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateHifzStatus(activeKey, 'developing')}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-[14px] font-medium border transition-colors cursor-pointer ${
                  currentStatus === 'developing'
                    ? 'bg-[#E8EDF8] border-[#17316B] text-[#17316B]'
                    : 'bg-[#FFFFFF] border-[#E1E6F2] hover:bg-[#E8EDF8]/60 text-[#4B5675]'
                }`}
              >
                <Clock className="w-4 h-4 text-[#17316B]" />
                <span>Developing</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdateHifzStatus(activeKey, 'mastered');
                  if (activeAyah.number < activeSurah.ayahs.length) {
                    handleStepAyah(1);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[12px] text-[14px] font-medium transition-colors cursor-pointer ${
                  currentStatus === 'mastered'
                    ? 'bg-[#2E9E6B] text-[#FFFFFF]'
                    : 'bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF]'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Mark Mastered</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Surah & Ayah Revision Matrix */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[22px] font-semibold text-[#14213D]">
              Revision Queue &amp; Verse Matrix
            </h2>
            <p className="text-[14px] text-[#4B5675] mt-0.5">
              Review all Ayahs by memorization confidence and load any verse into Active Recall.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter revision matrix"
            className="inline-flex items-center gap-1 p-1 bg-[#E8EDF8] rounded-full overflow-x-auto max-w-full"
          >
            {MATRIX_FILTERS.map((f) => {
              const active = matrixFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMatrixFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FFFFFF] text-[#17316B]'
                      : 'text-[#4B5675] hover:text-[#14213D]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="academy-card overflow-hidden">
          {filteredRows.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-[15px] font-medium text-[#14213D]">
                No Ayahs match this revision filter yet.
              </p>
              <button
                type="button"
                onClick={() => setMatrixFilter('all')}
                className="px-4 py-2 rounded-[12px] bg-[#E8EDF8] text-[#17316B] text-[13px] font-medium cursor-pointer"
              >
                Show All Ayahs
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E1E6F2]">
              {filteredRows.map((row) => {
                const meta = getStatusMeta(row.status);
                const isSelected = row.key === activeKey;
                return (
                  <div
                    key={row.key}
                    className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      isSelected ? 'bg-[#FCEFF3]/40' : 'hover:bg-[#F5F7FB]/60'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[13px] font-semibold text-[#17316B] tabular-nums w-28 shrink-0">
                        {row.surahName.replace('Surah ', '')} · {row.ayahNumber}
                      </span>
                      <p
                        dir="rtl"
                        className="font-arabic text-[20px] text-[#14213D] truncate"
                      >
                        {row.arabicPreview}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 justify-end">
                      <span className="text-[12px] text-[#4B5675] tabular-nums">
                        {row.reviewCount} reviews
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium ${meta.bg} ${meta.text}`}
                      >
                        {meta.icon}
                        <span>{meta.label}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTarget(row.surahId, row.ayahNumber);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3.5 py-1.5 rounded-[10px] bg-[#E8EDF8] hover:bg-[#17316B] text-[#17316B] hover:text-[#FFFFFF] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
