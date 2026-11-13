import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Download,
  Feather,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { CURRICULUM_SURAHS, makeAyahKey } from '../data/curriculum';
import { AcademyProgressState, IlmHubTab, WorkspaceView } from '../types/academy';
import { GeometricStarBackdrop } from './StarMotif';

interface AboutViewProps {
  state: AcademyProgressState;
  stats: {
    totalAyahs: number;
    recitedCount: number;
    masteredCount: number;
    notesCount: number;
    surahMasteryPct: (surahId: string) => number;
  };
  onOpenIlmHub: (tab: IlmHubTab, surahId?: string, ayahNumber?: number) => void;
  onOpenEnroll: () => void;
  onNavigate: (view: WorkspaceView) => void;
  onExportJson: () => void;
  onResetProgress: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  state,
  stats,
  onOpenIlmHub,
  onOpenEnroll,
  onNavigate,
  onExportJson,
  onResetProgress,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Academy Mission & Scholarly Heritage */}
      <section className="relative overflow-hidden academy-card px-6 py-8 sm:px-10 sm:py-12">
        <GeometricStarBackdrop className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675]">
              <span>About Al-Jazari Academy</span>
              <span aria-hidden="true">·</span>
              <span>Scholarly Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Ibn al-Jazari Tradition</span>
            </div>

            <h1 className="font-display text-[32px] sm:text-[42px] font-semibold leading-[1.16] tracking-[-0.02em] text-[#14213D] [text-wrap:balance]">
              Preserving classical Quranic precision in a calm contemporary workspace.
            </h1>

            <p className="text-[16px] leading-[1.65] text-[#4B5675] max-w-[60ch]">
              Named in tribute to the great 14th-century scholar of Quranic
              recitation, Imam Shams ad-Din Ibn al-Jazari, our digital academy
              unites disciplined articulation (*Tajweed*), structured memory
              retention (*Hifz*), and contemplative commentary (*Tafseer*) with
              zero distractions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenEnroll}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[15px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Enroll in a Study Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenIlmHub('reader')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Enter Ilm Hub</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-[#E1E6F2] lg:pl-8 space-y-5">
            <div className="space-y-1">
              <div className="text-[13px] font-medium text-[#4B5675]">
                Guiding Principle
              </div>
              <p className="font-arabic text-[24px] text-[#17316B] leading-[1.8]">
                وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
              </p>
              <p className="text-[14px] italic text-[#4B5675]">
                “And recite the Quran with measured recitation.” (Al-Muzzammil 73:4)
              </p>
            </div>

            <div className="pt-4 border-t border-[#E1E6F2] grid grid-cols-3 gap-4 tabular-nums">
              <div>
                <div className="font-display text-[22px] font-semibold text-[#14213D]">
                  {stats.recitedCount}
                </div>
                <div className="text-[12px] text-[#4B5675]">Ayahs recited</div>
              </div>
              <div>
                <div className="font-display text-[22px] font-semibold text-[#14213D]">
                  {stats.masteredCount}
                </div>
                <div className="text-[12px] text-[#4B5675]">Hifz mastered</div>
              </div>
              <div>
                <div className="font-display text-[22px] font-semibold text-[#14213D]">
                  {stats.notesCount}
                </div>
                <div className="text-[12px] text-[#4B5675]">Tafseer notes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tajweed, Hifz, and Tafseer Pedagogy Standards */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="font-display text-[26px] sm:text-[30px] font-semibold text-[#14213D] tracking-[-0.02em]">
            Academy Pedagogy Standards
          </h2>
          <p className="text-[15px] text-[#4B5675] max-w-[62ch]">
            Every feature in Ilm Hub follows three established standards of classical Quranic instruction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="academy-card p-6 space-y-4">
            <div className="w-11 h-11 rounded-full bg-[#E8EDF8] flex items-center justify-center text-[#17316B]">
              <BookOpen className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
              01. Makhraj &amp; Harakat Clarity
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#4B5675]">
              Tajweed begins with knowing where each letter originates (*Makhraj*)
              and respecting measured vowel lengths (*Harakat*). Our reader keeps
              every diacritic legible with expanded 2.05× line height.
            </p>
          </article>

          <article className="academy-card p-6 space-y-4">
            <div className="w-11 h-11 rounded-full bg-[#FCEFF3] flex items-center justify-center text-[#8A2846]">
              <Layers className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
              02. Active Recall Over Passive Reading
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#4B5675]">
              Durable Hifz requires testing memory without visual crutches. By
              progressively masking 50% or 100% of words and flagging verses due
              for review, old memorization stays fresh alongside new lessons.
            </p>
          </article>

          <article className="academy-card p-6 space-y-4">
            <div className="w-11 h-11 rounded-full bg-[#EFEAF8] flex items-center justify-center text-[#17316B]">
              <Feather className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-[19px] font-semibold text-[#14213D]">
              03. Tadabbur &amp; Applied Reflection
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#4B5675]">
              Recitation reaches completion when the heart reflects on meaning.
              Our journal pairs concise thematic Tafseer and Arabic root
              vocabulary with personal notes you can search anytime.
            </p>
          </article>
        </div>
      </section>

      {/* 3. Curriculum Scope & Juz Roadmap */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-semibold text-[#14213D]">
              Curriculum Scope &amp; Juz Roadmap
            </h2>
            <p className="text-[14px] text-[#4B5675] mt-1">
              Curated foundational Surahs spanning Juz 1, Juz 29, and Juz 30—click any Surah to open it inside Ilm Hub.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17316B] hover:text-[#0F2250] cursor-pointer whitespace-nowrap"
          >
            <span>Request a Curriculum Topic</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="academy-card divide-y divide-[#E1E6F2] overflow-hidden">
          {CURRICULUM_SURAHS.map((surah) => {
            const masteryPct = stats.surahMasteryPct(surah.id);
            const recitedCount = surah.ayahs.filter((a) =>
              state.recitedAyahs.includes(makeAyahKey(surah.id, a.number))
            ).length;

            return (
              <div
                key={surah.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="space-y-1.5 max-w-[65ch]">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display text-[18px] font-semibold text-[#14213D]">
                      {surah.number}. {surah.name}
                    </span>
                    <span className="font-arabic text-[20px] text-[#17316B] leading-none">
                      {surah.arabicName}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#4B5675]">
                    <span>{surah.englishMeaning}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.revelationPlace}</span>
                    <span aria-hidden="true">·</span>
                    <span>Juz {surah.juz}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.ayahCountLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {recitedCount}/{surah.ayahs.length} recited ({masteryPct}% mastered)
                    </span>
                  </div>
                  <p className="text-[14px] text-[#4B5675] leading-[1.6]">
                    {surah.overviewNote}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenIlmHub('reader', surah.id, 1)}
                    className="px-3.5 py-2 rounded-[12px] bg-[#E8EDF8] hover:bg-[#17316B] text-[#17316B] hover:text-[#FFFFFF] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Tajweed
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenIlmHub('hifz', surah.id, 1)}
                    className="px-3.5 py-2 rounded-[12px] bg-[#FCEFF3] hover:bg-[#8A2846] text-[#8A2846] hover:text-[#FFFFFF] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Hifz
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenIlmHub('tafseer', surah.id, 1)}
                    className="px-3.5 py-2 rounded-[12px] bg-[#EFEAF8] hover:bg-[#17316B] text-[#17316B] hover:text-[#FFFFFF] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Tafseer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Local Privacy & Study Data Controls */}
      <section className="academy-card px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-[14px] text-[#4B5675]">
          <span className="font-semibold text-[#14213D]">Local Browser Privacy: </span>
          All Hifz mastery states, bookmarks, enrollment preferences, and Tafseer notes stay private on your device.
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] hover:bg-[#FCEFF3] text-[#4B5675] hover:text-[#8A2846] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmingReset(false);
                }}
                className="px-3 py-2 rounded-[12px] bg-[#8A2846] text-[#FFFFFF] text-[13px] font-medium cursor-pointer"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="px-3 py-2 rounded-[12px] border border-[#E1E6F2] text-[13px] text-[#4B5675] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
