import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Feather,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import heroManuscriptImg from '../assets/images/hero_islamic_manuscript_1794592111740.jpg';
import {
  CURRICULUM_SURAHS,
  TAJWEED_RULES,
  getSurahById,
} from '../data/curriculum';
import {
  AcademyProgressState,
  ArabicSegment,
  IlmHubTab,
  TajweedRuleType,
  WorkspaceView,
} from '../types/academy';
import { AcademyCrestIcon, GeometricStarBackdrop } from './StarMotif';

interface HomeViewProps {
  state: AcademyProgressState;
  stats: {
    totalAyahs: number;
    recitedCount: number;
    masteredCount: number;
    developingCount: number;
    needsRevisionCount: number;
    notesCount: number;
    bookmarksCount: number;
    dailyProgressPct: number;
  };
  onNavigate: (view: WorkspaceView) => void;
  onOpenIlmHub: (tab: IlmHubTab, surahId?: string, ayahNumber?: number) => void;
  onOpenEnroll: () => void;
}

const HERO_SAMPLES: { surahId: string; ayahNumber: number; label: string }[] = [
  { surahId: 'al-fatihah', ayahNumber: 1, label: 'Al-Fatihah 1:1' },
  { surahId: 'al-asr', ayahNumber: 2, label: 'Al-Asr 103:2' },
  { surahId: 'al-ikhlas', ayahNumber: 1, label: 'Al-Ikhlas 112:1' },
];

const FEATURED_RULES: TajweedRuleType[] = [
  'ghunnah',
  'qalqalah',
  'madd',
  'idgham',
  'ikhfa',
];

export const HomeView: React.FC<HomeViewProps> = ({
  state,
  stats,
  onNavigate,
  onOpenIlmHub,
  onOpenEnroll,
}) => {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const sampleTarget = HERO_SAMPLES[sampleIdx];
  const sampleSurah = getSurahById(sampleTarget.surahId);
  const sampleAyah =
    sampleSurah.ayahs.find((a) => a.number === sampleTarget.ayahNumber) ??
    sampleSurah.ayahs[0];

  const defaultSegment = useMemo(
    () => sampleAyah.segments.find((s) => Boolean(s.rule)) ?? sampleAyah.segments[0],
    [sampleAyah]
  );

  const [selectedSegment, setSelectedSegment] = useState<ArabicSegment | null>(
    null
  );

  const activeSegment = useMemo(() => {
    if (
      selectedSegment &&
      sampleAyah.segments.some((s) => s.id === selectedSegment.id)
    ) {
      return selectedSegment;
    }
    return defaultSegment;
  }, [selectedSegment, sampleAyah, defaultSegment]);

  const activeRuleDef = activeSegment?.rule
    ? TAJWEED_RULES[activeSegment.rule]
    : TAJWEED_RULES.madd;

  const activeSurah = getSurahById(state.activeSurahId);

  const methodologySteps = [
    {
      num: '01',
      title: 'Recite with Measured Articulation',
      body: 'Read full-tashkeel Arabic verses with color-coded Ghunnah, Qalqalah, Madd, Idgham, and Ikhfa markers. Tap any phrase to review its Makhraj and timing counts.',
      status: `${stats.recitedCount} of ${stats.totalAyahs} Ayahs practiced`,
      completed: stats.recitedCount >= 4,
      actionLabel: 'Open Tajweed Reader',
      targetTab: 'reader' as IlmHubTab,
    },
    {
      num: '02',
      title: 'Retain via Active Word-Masking Recall',
      body: 'Mask 50% or 100% of words inside any Ayah, recite from memory, reveal individual hints on demand, and grade revision confidence to keep older Surahs sharp.',
      status: `${stats.masteredCount} mastered · ${stats.needsRevisionCount} due`,
      completed: stats.masteredCount >= 6,
      actionLabel: 'Practice Hifz Recall',
      targetTab: 'hifz' as IlmHubTab,
    },
    {
      num: '03',
      title: 'Reflect & Record Personal Tafseer',
      body: 'Pair classical thematic commentary and key Arabic root vocabulary with structured personal reflections anchored to individual Surahs and Ayahs.',
      status: `${stats.notesCount} journal entries saved`,
      completed: stats.notesCount >= 3,
      actionLabel: 'Open Tafseer Journal',
      targetTab: 'tafseer' as IlmHubTab,
    },
  ];

  const highlightStrip = [
    {
      kicker: 'Tajweed Precision',
      metric: '5 Articulation Rules',
      detail: 'Ghunnah, Qalqalah, Madd, Idgham & Ikhfa',
      onClick: () => onOpenIlmHub('reader'),
    },
    {
      kicker: 'Hifz Retention',
      metric: `${stats.masteredCount} / ${stats.totalAyahs} Ayahs Mastered`,
      detail: 'Word-masking recall & spaced revision queue',
      onClick: () => onOpenIlmHub('hifz'),
    },
    {
      kicker: 'Tafseer Journal',
      metric: `${stats.notesCount} Saved Reflections`,
      detail: 'Classical commentary & vocabulary roots',
      onClick: () => onOpenIlmHub('tafseer'),
    },
    {
      kicker: 'Curriculum Roadmap',
      metric: `${CURRICULUM_SURAHS.length} Core Surahs`,
      detail: 'Juz 1, 29 & 30 · Scholarly standards',
      onClick: () => onNavigate('about'),
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Full-Width Airy Hero Band */}
      <section className="relative w-full bg-[#FFFFFF] border-b border-[#E1E6F2] overflow-hidden">
        <GeometricStarBackdrop className="absolute inset-0 w-full h-full" />

        {/* Above-the-Fold 2-Column Hero Split */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Scholarly Headline, Lead Copy, and Clear CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675]">
                <span>Al-Jazari Academy</span>
                <span aria-hidden="true">·</span>
                <span>Quranic Studies &amp; Recitation</span>
                <span aria-hidden="true">·</span>
                <span>Juz 1, 29 &amp; 30</span>
              </div>

              <h1 className="font-display text-[36px] sm:text-[44px] lg:text-[52px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#14213D] [text-wrap:balance]">
                Sacred precision for Quranic recitation, memory, and reflection.
              </h1>

              <p className="text-[17px] sm:text-[18px] leading-[1.65] text-[#4B5675] max-w-[50ch]">
                Master Tajweed articulation, practice active Hifz recall, and
                build a personal Tafseer journal inside Ilm Hub—guided by
                classical methodology.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenIlmHub(
                      'reader',
                      state.activeSurahId,
                      state.activeAyahNumber
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>
                    Enter Ilm Hub · {activeSurah.name.replace('Surah ', '')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenEnroll}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[15px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll Now</span>
                </button>
              </div>
            </div>

            {/* Right Column: Bespoke Geometric Manuscript Art + Interactive Ayah Strip */}
            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-[20px] overflow-hidden border border-[#E1E6F2] bg-[#FFFFFF] shadow-[0_12px_32px_rgba(23,49,107,0.10)] flex flex-col">
                {/* Generated Manuscript Visual Frame */}
                <div className="relative aspect-[16/9] w-full bg-[#0F2250] overflow-hidden shrink-0">
                  {!imgFailed ? (
                    <img
                      src={heroManuscriptImg}
                      alt="Illuminated classical Islamic geometric manuscript resting on a sunlit desk"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#17316B] to-[#0F2250] flex items-center justify-center p-6">
                      <div className="text-center space-y-2 text-[#FFFFFF]">
                        <AcademyCrestIcon className="w-12 h-12 mx-auto" />
                        <p className="font-display text-[15px] font-medium">
                          Al-Jazari Academy Manuscript Archive
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Measured Scrim & Sample Switcher */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F2250]/90 via-[#0F2250]/55 to-transparent px-5 pt-10 pb-3.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-[#FFFFFF]/90">
                      Interactive Ayah Preview
                    </span>
                    <div
                      role="tablist"
                      aria-label="Sample preview verses"
                      className="inline-flex items-center gap-1 p-1 bg-[#FFFFFF]/15 backdrop-blur-sm rounded-full"
                    >
                      {HERO_SAMPLES.map((item, idx) => {
                        const active = idx === sampleIdx;
                        return (
                          <button
                            key={item.label}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => {
                              setSampleIdx(idx);
                              setSelectedSegment(null);
                            }}
                            className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#FFFFFF] text-[#17316B] font-semibold'
                                : 'text-[#FFFFFF]/90 hover:bg-[#FFFFFF]/15'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Integrated Live Interactive Ayah & Tajweed Inspection */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[12px] text-[#4B5675]">
                      <span className="font-medium text-[#17316B]">
                        {sampleSurah.name} · Ayah {sampleAyah.number}
                      </span>
                      <span>Click any highlighted Arabic word</span>
                    </div>

                    <div
                      dir="rtl"
                      className="font-arabic text-[28px] sm:text-[32px] text-[#14213D] flex flex-wrap gap-x-2.5 gap-y-2 items-center"
                    >
                      {sampleAyah.segments.map((seg) => {
                        const ruleDef = seg.rule ? TAJWEED_RULES[seg.rule] : null;
                        const isSelected = activeSegment?.id === seg.id;
                        if (!ruleDef) {
                          return (
                            <span key={seg.id} className="px-0.5">
                              {seg.text}
                            </span>
                          );
                        }
                        return (
                          <button
                            key={seg.id}
                            type="button"
                            onClick={() => setSelectedSegment(seg)}
                            className="px-2 py-0.5 rounded-[10px] transition-all cursor-pointer focus-visible:outline-none"
                            style={{
                              backgroundColor: ruleDef.highlightBg,
                              color: ruleDef.highlightText,
                              boxShadow: isSelected
                                ? `0 0 0 2px ${ruleDef.ringColor}`
                                : undefined,
                            }}
                          >
                            {seg.text}
                          </button>
                        );
                      })}
                      <span
                        aria-hidden="true"
                        className="text-[18px] text-[#C8A35A] font-sans font-semibold px-1"
                      >
                        ﴿{sampleAyah.number}﴾
                      </span>
                    </div>

                    <p className="text-[14px] text-[#4B5675] leading-[1.55]">
                      “{sampleAyah.translation}”
                    </p>
                  </div>

                  {/* Live Makhraj & Rule Readout */}
                  <div className="pt-3.5 border-t border-[#E1E6F2] space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: activeRuleDef.ringColor }}
                          aria-hidden="true"
                        />
                        <span className="font-display text-[14px] font-semibold text-[#14213D]">
                          {activeRuleDef.name}
                        </span>
                        <span className="font-arabic text-[16px] text-[#17316B] leading-none">
                          {activeRuleDef.arabicName}
                        </span>
                      </div>
                      <span className="text-[12px] font-medium text-[#4B5675]">
                        {activeRuleDef.counts}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[13px] leading-[1.5] text-[#4B5675] flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#17316B] shrink-0 mt-0.5" />
                        <span>
                          {activeSegment?.ruleDetail ?? activeRuleDef.description}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenIlmHub('reader', sampleSurah.id, sampleAyah.number)
                        }
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#17316B] hover:text-[#0F2250] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Open in Ilm Hub</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Academy Curriculum Highlight Strip */}
        <div className="relative z-10 border-t border-[#E1E6F2] bg-[#F7F9FD]/85">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#E1E6F2]">
            {highlightStrip.map((item, idx) => (
              <button
                key={item.kicker}
                type="button"
                onClick={item.onClick}
                className={`text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17316B]/25 rounded-[12px] ${
                  idx === 0
                    ? 'lg:pr-6'
                    : idx === highlightStrip.length - 1
                    ? 'lg:pl-6'
                    : 'lg:px-6'
                }`}
              >
                <div className="text-[12px] font-medium text-[#4B5675]">
                  {item.kicker}
                </div>
                <div className="font-display text-[19px] font-semibold text-[#14213D] group-hover:text-[#17316B] transition-colors mt-0.5 tabular-nums flex items-center justify-between gap-2">
                  <span>{item.metric}</span>
                  <ChevronRight className="w-4 h-4 text-[#4B5675] group-hover:text-[#17316B] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <div className="text-[13px] text-[#4B5675] mt-1">
                  {item.detail}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining Home Page Content Bounded at 1200px */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Featured Programs — Asymmetric Bento Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="font-display text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-[#14213D]">
                Inside Ilm Hub: Three Integrated Tracks
              </h2>
              <p className="text-[15px] text-[#4B5675] max-w-[62ch]">
                Every Surah in Ilm Hub connects recitation rules, memory checkpoints, and personal commentary in one synced workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] whitespace-nowrap cursor-pointer"
            >
              <span>Explore Academy Curriculum</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Marquee Track 1: Tajweed Reader (7 columns) */}
            <article className="lg:col-span-7 academy-card-interactive p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#E8EDF8] flex items-center justify-center text-[#17316B]">
                    <BookOpen className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-[13px] font-medium text-[#4B5675] tabular-nums">
                    {stats.recitedCount} / {stats.totalAyahs} Ayahs recited
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-[24px] font-semibold text-[#14213D]">
                    01. Tajweed &amp; Articulation Reader
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#4B5675]">
                    Study Quranic script in crisp RTL typography with generous
                    spacing so diacritics never collide. Filter verses by individual
                    Tajweed rules, scale font sizing, and inspect articulation
                    mechanics phrase by phrase.
                  </p>
                </div>

                {/* Clean Rule List Inside Marquee Card */}
                <div className="divide-y divide-[#E1E6F2] border-y border-[#E1E6F2]">
                  {FEATURED_RULES.map((ruleKey) => {
                    const rule = TAJWEED_RULES[ruleKey];
                    return (
                      <div
                        key={rule.id}
                        className="py-3 flex items-center justify-between gap-4 text-[14px]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: rule.ringColor }}
                            aria-hidden="true"
                          />
                          <span className="font-medium text-[#14213D]">
                            {rule.name}
                          </span>
                          <span className="text-[#4B5675] hidden sm:inline truncate">
                            · {rule.makhraj}
                          </span>
                        </div>
                        <span className="font-arabic text-[17px] text-[#17316B] shrink-0 leading-none">
                          {rule.arabicName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] text-[#4B5675]">
                  Includes transliteration &amp; verse pinning
                </span>
                <button
                  type="button"
                  onClick={() => onOpenIlmHub('reader')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Open Tajweed Reader</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* Right Stacked Column: Hifz (Blush) + Tafseer (Lavender) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Track 2: Hifz Memorization */}
              <article className="flex-1 academy-card-interactive overflow-hidden flex flex-col justify-between">
                <div className="p-6 bg-[#FCEFF3]/55 border-b border-[#E1E6F2] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E1E6F2] flex items-center justify-center text-[#8A2846]">
                      <Layers className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
                      02. Hifz Revision Tracker
                    </h3>
                  </div>
                  <span className="text-[13px] font-medium text-[#8A2846] tabular-nums">
                    {stats.masteredCount} mastered
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-[14px] leading-[1.6] text-[#4B5675]">
                    Test memorization with 50% or 100% word-masking active recall,
                    reveal hints word by word, and maintain a prioritized revision
                    matrix across every Surah.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E1E6F2]">
                    <span className="text-[13px] text-[#4B5675] tabular-nums">
                      {stats.needsRevisionCount} verses due for review
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenIlmHub('hifz')}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer whitespace-nowrap"
                    >
                      <span>Practice Hifz</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Track 3: Tafseer Journal */}
              <article className="flex-1 academy-card-interactive overflow-hidden flex flex-col justify-between">
                <div className="p-6 bg-[#EFEAF8]/65 border-b border-[#E1E6F2] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E1E6F2] flex items-center justify-center text-[#17316B]">
                      <Feather className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
                      03. Tafseer Study Journal
                    </h3>
                  </div>
                  <span className="text-[13px] font-medium text-[#17316B] tabular-nums">
                    {stats.notesCount} notes
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-[14px] leading-[1.6] text-[#4B5675]">
                    Read classical thematic summaries and Arabic vocabulary roots
                    alongside each Ayah, then log structured lessons and personal
                    reflections searchable by theme.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E1E6F2]">
                    <span className="text-[13px] text-[#4B5675] tabular-nums">
                      {stats.bookmarksCount} pinned Ayahs
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenIlmHub('tafseer')}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer whitespace-nowrap"
                    >
                      <span>Open Journal</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Learning Methodology & Milestone Overview */}
        <section className="academy-card p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E1E6F2]">
            <div className="space-y-1.5">
              <h2 className="font-display text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#14213D]">
                The Al-Jazari Three-Step Study Method
              </h2>
              <p className="text-[15px] text-[#4B5675] max-w-[60ch]">
                Move calmly from accurate pronunciation to durable memorization and
                lived contemplation—with your live progress tracked automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenEnroll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enroll in a Cohort</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologySteps.map((step, idx) => {
              const isActive =
                !step.completed && (idx === 0 || methodologySteps[idx - 1].completed);
              return (
                <div key={step.num} className="flex flex-col justify-between space-y-5">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold tabular-nums ${
                          step.completed
                            ? 'bg-[#17316B] text-[#FFFFFF]'
                            : isActive
                            ? 'bg-[#FFFFFF] border-2 border-[#C8A35A] text-[#17316B]'
                            : 'bg-[#F5F7FB] border border-[#E1E6F2] text-[#4B5675]'
                        }`}
                      >
                        {step.completed ? <Check className="w-4 h-4" /> : step.num}
                      </div>
                      <span className="text-[13px] font-medium text-[#4B5675] tabular-nums">
                        {step.status}
                      </span>
                    </div>

                    <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-[#4B5675]">
                      {step.body}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E1E6F2]">
                    <button
                      type="button"
                      onClick={() => onOpenIlmHub(step.targetTab)}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer"
                    >
                      <span>{step.actionLabel}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Quiet Academy Footer */}
        <footer className="relative overflow-hidden rounded-[20px] border border-[#E1E6F2] bg-[#FFFFFF] px-6 py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <GeometricStarBackdrop className="absolute inset-0 w-full h-full opacity-75" />

          <div className="relative z-10 flex items-center gap-3">
            <AcademyCrestIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="font-display text-[15px] font-semibold text-[#14213D]">
                Al-Jazari Academy
              </div>
              <div className="text-[13px] text-[#4B5675]">
                Quranic Studies Workspace · Progress saved locally in browser
              </div>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="relative z-10 flex flex-wrap items-center gap-5 text-[14px] font-medium text-[#4B5675]"
          >
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-[#17316B] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onOpenIlmHub('reader')}
              className="hover:text-[#17316B] transition-colors cursor-pointer"
            >
              Ilm Hub
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-[#17316B] transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={onOpenEnroll}
              className="text-[#17316B] font-semibold hover:text-[#0F2250] transition-colors cursor-pointer"
            >
              Enroll Now
            </button>
          </nav>
        </footer>
      </div>
    </div>
  );
};
