import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  Check,
  Eye,
  EyeOff,
  Feather,
  Info,
  Layers,
  Minus,
  Plus,
} from 'lucide-react';
import {
  CURRICULUM_SURAHS,
  TAJWEED_RULES,
  getSurahById,
  makeAyahKey,
} from '../data/curriculum';
import {
  AcademyProgressState,
  ArabicSegment,
  IlmHubTab,
  ReaderPreferences,
  TajweedRuleType,
} from '../types/academy';

interface TajweedReaderViewProps {
  state: AcademyProgressState;
  onSelectSurah: (surahId: string, ayahNumber?: number) => void;
  onToggleRecited: (ayahKey: string) => void;
  onToggleBookmark: (ayahKey: string) => void;
  onUpdatePreferences: (partial: Partial<ReaderPreferences>) => void;
  onJumpToModule: (tab: IlmHubTab, surahId: string, ayahNumber: number) => void;
}

const RULE_ORDER: TajweedRuleType[] = [
  'ghunnah',
  'qalqalah',
  'madd',
  'idgham',
  'ikhfa',
];

export const TajweedReaderView: React.FC<TajweedReaderViewProps> = ({
  state,
  onSelectSurah,
  onToggleRecited,
  onToggleBookmark,
  onUpdatePreferences,
  onJumpToModule,
}) => {
  const activeSurah = getSurahById(state.activeSurahId);
  const [ruleFilter, setRuleFilter] = useState<TajweedRuleType | 'all'>('all');
  const [inspectedSegment, setInspectedSegment] = useState<{
    ayahNumber: number;
    segment: ArabicSegment;
  } | null>(() => {
    const firstMatch = activeSurah.ayahs
      .flatMap((a) =>
        a.segments
          .filter((s) => Boolean(s.rule))
          .map((s) => ({ ayahNumber: a.number, segment: s }))
      )[0];
    return firstMatch ?? null;
  });
  const [focusedRuleGuide, setFocusedRuleGuide] = useState<TajweedRuleType>('madd');

  const activeRuleDef = useMemo(() => {
    if (inspectedSegment?.segment.rule) {
      return TAJWEED_RULES[inspectedSegment.segment.rule];
    }
    return TAJWEED_RULES[focusedRuleGuide];
  }, [inspectedSegment, focusedRuleGuide]);

  const arabicPixelSize = Math.round(28 * state.preferences.arabicFontScale);

  const handleSurahChange = (surahId: string) => {
    onSelectSurah(surahId, 1);
    const nextSurah = getSurahById(surahId);
    const firstMatch = nextSurah.ayahs
      .flatMap((a) =>
        a.segments
          .filter((s) => Boolean(s.rule))
          .map((s) => ({ ayahNumber: a.number, segment: s }))
      )[0];
    setInspectedSegment(firstMatch ?? null);
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Reader Control Bar */}
      <section className="academy-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Surah Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {CURRICULUM_SURAHS.map((surah) => {
              const selected = surah.id === activeSurah.id;
              return (
                <button
                  key={surah.id}
                  type="button"
                  onClick={() => handleSurahChange(surah.id)}
                  className={`px-3.5 py-2 rounded-[12px] text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#17316B] text-[#FFFFFF]'
                      : 'bg-[#F5F7FB] text-[#4B5675] hover:bg-[#E8EDF8] hover:text-[#17316B]'
                  }`}
                >
                  <span className="tabular-nums mr-1.5 opacity-80">{surah.number}.</span>
                  <span>{surah.name.replace('Surah ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Display Toggles & Font Size */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                onUpdatePreferences({
                  showTajweedColors: !state.preferences.showTajweedColors,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-[12px] text-[13px] font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                state.preferences.showTajweedColors
                  ? 'bg-[#E8EDF8] border-[#17316B]/20 text-[#17316B]'
                  : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675]'
              }`}
            >
              {state.preferences.showTajweedColors ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>Tajweed Highlights</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdatePreferences({
                  showTransliteration: !state.preferences.showTransliteration,
                })
              }
              className={`px-3 py-2 rounded-[12px] text-[13px] font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                state.preferences.showTransliteration
                  ? 'bg-[#E8EDF8] border-[#17316B]/20 text-[#17316B]'
                  : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675]'
              }`}
            >
              Transliteration
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdatePreferences({
                  showTranslation: !state.preferences.showTranslation,
                })
              }
              className={`px-3 py-2 rounded-[12px] text-[13px] font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                state.preferences.showTranslation
                  ? 'bg-[#E8EDF8] border-[#17316B]/20 text-[#17316B]'
                  : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675]'
              }`}
            >
              Translation
            </button>

            <div className="inline-flex items-center gap-1 border border-[#E1E6F2] rounded-[12px] px-2 py-1 bg-[#FFFFFF]">
              <button
                type="button"
                aria-label="Decrease Arabic font size"
                onClick={() =>
                  onUpdatePreferences({
                    arabicFontScale: Math.max(
                      0.85,
                      Number((state.preferences.arabicFontScale - 0.1).toFixed(2))
                    ),
                  })
                }
                className="w-7 h-7 rounded-[8px] hover:bg-[#E8EDF8] flex items-center justify-center text-[#17316B] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-[12px] font-medium text-[#4B5675] tabular-nums px-1.5">
                {arabicPixelSize}px
              </span>
              <button
                type="button"
                aria-label="Increase Arabic font size"
                onClick={() =>
                  onUpdatePreferences({
                    arabicFontScale: Math.min(
                      1.4,
                      Number((state.preferences.arabicFontScale + 0.1).toFixed(2))
                    ),
                  })
                }
                className="w-7 h-7 rounded-[8px] hover:bg-[#E8EDF8] flex items-center justify-center text-[#17316B] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Rule Filter Bar */}
        <div className="pt-3 border-t border-[#E1E6F2] flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-medium text-[#4B5675] mr-1">
            Focus Rule:
          </span>
          <button
            type="button"
            onClick={() => setRuleFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
              ruleFilter === 'all'
                ? 'bg-[#17316B] text-[#FFFFFF]'
                : 'bg-[#F5F7FB] text-[#4B5675] hover:bg-[#E8EDF8]'
            }`}
          >
            All Rules
          </button>
          {RULE_ORDER.map((ruleKey) => {
            const rule = TAJWEED_RULES[ruleKey];
            const active = ruleFilter === ruleKey;
            return (
              <button
                key={ruleKey}
                type="button"
                onClick={() => {
                  setRuleFilter(active ? 'all' : ruleKey);
                  setFocusedRuleGuide(ruleKey);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? rule.ringColor : rule.highlightBg,
                  color: active ? '#FFFFFF' : rule.highlightText,
                }}
              >
                <span>{rule.name.split(' ')[0]}</span>
                <span className="font-arabic text-[14px] leading-none">
                  {rule.arabicName}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Two-Zone Study Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone (65%): Reading Stage */}
        <div className="lg:col-span-8 space-y-4">
          {/* Surah Banner */}
          <div className="academy-card px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[13px] text-[#4B5675]">
                <span>{activeSurah.revelationPlace}</span>
                <span aria-hidden="true">·</span>
                <span>{activeSurah.ayahCountLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Juz {activeSurah.juz}</span>
              </div>
              <h1 className="font-display text-[24px] font-semibold text-[#14213D] mt-0.5">
                {activeSurah.name} — {activeSurah.englishMeaning}
              </h1>
            </div>
            <div className="font-arabic text-[28px] text-[#17316B] leading-none">
              {activeSurah.arabicName}
            </div>
          </div>

          {/* Ayah Cards */}
          {activeSurah.ayahs.map((ayah) => {
            const ayahKey = makeAyahKey(activeSurah.id, ayah.number);
            const isRecited = state.recitedAyahs.includes(ayahKey);
            const isBookmarked = state.bookmarkedAyahs.includes(ayahKey);
            const isActiveAyah = state.activeAyahNumber === ayah.number;

            return (
              <article
                key={ayahKey}
                className={`academy-card p-6 transition-colors ${
                  isActiveAyah ? 'ring-2 ring-[#17316B]/15' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#E8EDF8] text-[#17316B] font-display text-[13px] font-semibold flex items-center justify-center tabular-nums">
                      {ayah.number}
                    </span>
                    <span className="text-[13px] font-medium text-[#4B5675]">
                      Ayah {ayah.number} of {activeSurah.ayahs.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(ayahKey)}
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark Ayah'}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[13px] font-medium border transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-[#FFF4E0] border-[#C8A35A]/50 text-[#775A17]'
                          : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675] hover:bg-[#F5F7FB]'
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#C8A35A] text-[#C8A35A]' : ''}`}
                      />
                      <span>{isBookmarked ? 'Pinned' : 'Pin'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleRecited(ayahKey)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[13px] font-medium transition-colors cursor-pointer ${
                        isRecited
                          ? 'bg-[#E8F6ED] text-[#146C43]'
                          : 'bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isRecited ? 'Recited' : 'Mark Recited'}</span>
                    </button>
                  </div>
                </div>

                {/* RTL Tokenized Arabic Verse */}
                <div
                  dir="rtl"
                  className="font-arabic text-[#14213D] py-3 flex flex-wrap gap-x-2.5 gap-y-2 items-center"
                  style={{ fontSize: `${arabicPixelSize}px` }}
                >
                  {ayah.segments.map((seg) => {
                    const ruleDef = seg.rule ? TAJWEED_RULES[seg.rule] : null;
                    const matchesFilter =
                      ruleFilter === 'all' || seg.rule === ruleFilter;
                    const showColor =
                      state.preferences.showTajweedColors &&
                      ruleDef &&
                      matchesFilter;
                    const isSelected = inspectedSegment?.segment.id === seg.id;

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
                        onClick={() => {
                          setInspectedSegment({ ayahNumber: ayah.number, segment: seg });
                          setFocusedRuleGuide(ruleDef.id);
                          onSelectSurah(activeSurah.id, ayah.number);
                        }}
                        title={`Inspect ${ruleDef.name}`}
                        className={`px-2 py-0.5 rounded-[10px] transition-all cursor-pointer focus-visible:outline-none ${
                          isSelected ? 'ring-2 ring-offset-2' : 'hover:opacity-85'
                        }`}
                        style={{
                          backgroundColor: showColor
                            ? ruleDef.highlightBg
                            : 'transparent',
                          color: showColor ? ruleDef.highlightText : '#14213D',
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
                    className="inline-flex items-center justify-center text-[16px] text-[#C8A35A] font-sans font-semibold px-1.5"
                  >
                    ﴿{ayah.number}﴾
                  </span>
                </div>

                {/* Transliteration & Translation */}
                {(state.preferences.showTransliteration ||
                  state.preferences.showTranslation) && (
                  <div className="mt-4 pt-4 border-t border-[#E1E6F2] space-y-2">
                    {state.preferences.showTransliteration && (
                      <p className="text-[14px] italic text-[#4B5675]">
                        {ayah.transliteration}
                      </p>
                    )}
                    {state.preferences.showTranslation && (
                      <p className="text-[15px] leading-[1.6] text-[#14213D]">
                        {ayah.translation}
                      </p>
                    )}
                  </div>
                )}

                {/* Quick Cross-Module Jump */}
                <div className="mt-4 pt-3 border-t border-[#E1E6F2] flex flex-wrap items-center justify-between gap-2 text-[13px]">
                  <span className="text-[#4B5675]">
                    {ayah.segments.filter((s) => s.rule).length} annotated Tajweed
                    points
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onJumpToModule('hifz', activeSurah.id, ayah.number)
                      }
                      className="inline-flex items-center gap-1 font-medium text-[#8A2846] hover:underline cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Test Hifz Recall</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onJumpToModule('tafseer', activeSurah.id, ayah.number)
                      }
                      className="inline-flex items-center gap-1 font-medium text-[#17316B] hover:underline cursor-pointer"
                    >
                      <Feather className="w-3.5 h-3.5" />
                      <span>Tafseer &amp; Notes</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Zone (35%): Sticky Tajweed Inspector */}
        <aside className="lg:col-span-4 lg:sticky lg:top-[88px] space-y-4">
          <div className="academy-card p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#4B5675]">
                Tajweed Inspector
              </span>
              {inspectedSegment && (
                <span className="text-[12px] font-medium text-[#17316B] tabular-nums">
                  Ayah {inspectedSegment.ayahNumber}
                </span>
              )}
            </div>

            {inspectedSegment && (
              <div
                className="p-4 rounded-[14px] flex items-center justify-between gap-4"
                style={{ backgroundColor: activeRuleDef.highlightBg }}
              >
                <div>
                  <div className="text-[12px] font-medium text-[#4B5675]">
                    Selected Phrase
                  </div>
                  <div
                    className="text-[14px] font-semibold mt-0.5"
                    style={{ color: activeRuleDef.highlightText }}
                  >
                    {activeRuleDef.name}
                  </div>
                </div>
                <div
                  dir="rtl"
                  className="font-arabic text-[30px] leading-none"
                  style={{ color: activeRuleDef.highlightText }}
                >
                  {inspectedSegment.segment.text}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-display text-[20px] font-semibold text-[#14213D]">
                  {activeRuleDef.name}
                </h2>
                <span className="font-arabic text-[20px] text-[#17316B]">
                  {activeRuleDef.arabicName}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-[13px] pt-1">
                <div className="p-3 rounded-[12px] bg-[#F5F7FB]">
                  <div className="text-[#4B5675]">Articulation (Makhraj)</div>
                  <div className="font-semibold text-[#14213D] mt-0.5">
                    {activeRuleDef.makhraj}
                  </div>
                </div>
                <div className="p-3 rounded-[12px] bg-[#F5F7FB]">
                  <div className="text-[#4B5675]">Measured Timing</div>
                  <div className="font-semibold text-[#14213D] mt-0.5">
                    {activeRuleDef.counts}
                  </div>
                </div>
              </div>

              <p className="text-[14px] leading-[1.6] text-[#4B5675]">
                {activeRuleDef.description}
              </p>

              {inspectedSegment?.segment.ruleDetail && (
                <div className="p-3.5 rounded-[12px] bg-[#E8EDF8]/70 text-[13px] leading-[1.55] text-[#17316B] flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{inspectedSegment.segment.ruleDetail}</span>
                </div>
              )}
            </div>

            {/* Quick Rule Reference Switcher */}
            <div className="pt-4 border-t border-[#E1E6F2]">
              <div className="text-[12px] font-medium text-[#4B5675] mb-2.5">
                Core Tajweed Reference
              </div>
              <div className="space-y-1.5">
                {RULE_ORDER.map((ruleKey) => {
                  const rule = TAJWEED_RULES[ruleKey];
                  const isFocused = activeRuleDef.id === ruleKey;
                  return (
                    <button
                      key={ruleKey}
                      type="button"
                      onClick={() => {
                        setFocusedRuleGuide(ruleKey);
                        setInspectedSegment(null);
                      }}
                      className={`w-full px-3 py-2 rounded-[10px] flex items-center justify-between text-left text-[13px] transition-colors cursor-pointer ${
                        isFocused
                          ? 'bg-[#E8EDF8] text-[#17316B] font-semibold'
                          : 'hover:bg-[#F5F7FB] text-[#4B5675]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: rule.ringColor }}
                          aria-hidden="true"
                        />
                        <span>{rule.name}</span>
                      </span>
                      <span className="font-arabic text-[15px] leading-none">
                        {rule.arabicName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
