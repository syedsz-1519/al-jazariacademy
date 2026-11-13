import React from 'react';
import { BookOpen, Feather, Layers } from 'lucide-react';
import { getSurahById } from '../data/curriculum';
import {
  AcademyProgressState,
  HifzStatus,
  IlmHubTab,
  ReaderPreferences,
  ReflectionThemeTag,
} from '../types/academy';
import { TajweedReaderView } from './TajweedReaderView';
import { HifzTrackerView } from './HifzTrackerView';
import { TafseerJournalView } from './TafseerJournalView';

interface IlmHubViewProps {
  activeTab: IlmHubTab;
  onChangeTab: (tab: IlmHubTab) => void;
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
  onSelectStudyTarget: (surahId: string, ayahNumber?: number) => void;
  onToggleRecited: (ayahKey: string) => void;
  onToggleBookmark: (ayahKey: string) => void;
  onUpdatePreferences: (partial: Partial<ReaderPreferences>) => void;
  onUpdateHifzStatus: (ayahKey: string, status: HifzStatus) => void;
  onSaveNote: (payload: {
    id?: string;
    surahId: string;
    ayahNumber: number;
    themeTag: ReflectionThemeTag;
    keyLesson: string;
    personalApplication: string;
    vocabularyNote: string;
  }) => void;
  onDeleteNote: (noteId: string) => void;
}

const HUB_TABS: {
  id: IlmHubTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'reader',
    label: 'Tajweed Reader',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'hifz',
    label: 'Hifz Tracker',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 'tafseer',
    label: 'Tafseer Journal',
    icon: <Feather className="w-4 h-4" />,
  },
];

export const IlmHubView: React.FC<IlmHubViewProps> = ({
  activeTab,
  onChangeTab,
  state,
  stats,
  onSelectStudyTarget,
  onToggleRecited,
  onToggleBookmark,
  onUpdatePreferences,
  onUpdateHifzStatus,
  onSaveNote,
  onDeleteNote,
}) => {
  const activeSurah = getSurahById(state.activeSurahId);

  return (
    <div className="space-y-6">
      {/* Shared Ilm Hub Header + Segmented Mode Switcher */}
      <section className="academy-card px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675]">
            <span className="text-[#17316B] font-semibold">Ilm Hub</span>
            <span aria-hidden="true">·</span>
            <span>
              Active: {activeSurah.name} (Ayah {state.activeAyahNumber})
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {stats.recitedCount} recited · {stats.masteredCount} mastered ·{' '}
              {stats.notesCount} notes
            </span>
          </div>
          <h1 className="font-display text-[24px] sm:text-[26px] font-semibold text-[#14213D]">
            Unified Quranic Study Workspace
          </h1>
        </div>

        {/* Segmented Sub-Tab Switcher */}
        <div
          role="tablist"
          aria-label="Ilm Hub study tools"
          className="inline-flex items-center gap-1 p-1.5 bg-[#E8EDF8] rounded-full overflow-x-auto max-w-full shrink-0"
        >
          {HUB_TABS.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onChangeTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selected
                    ? 'bg-[#FFFFFF] text-[#17316B] font-semibold shadow-xs'
                    : 'text-[#4B5675] hover:text-[#14213D]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Study Tool */}
      {activeTab === 'reader' && (
        <TajweedReaderView
          state={state}
          onSelectSurah={onSelectStudyTarget}
          onToggleRecited={onToggleRecited}
          onToggleBookmark={onToggleBookmark}
          onUpdatePreferences={onUpdatePreferences}
          onJumpToModule={(targetView, surahId, ayahNumber) => {
            onSelectStudyTarget(surahId, ayahNumber);
            if (targetView === 'reader' || targetView === 'hifz' || targetView === 'tafseer') {
              onChangeTab(targetView);
            }
          }}
        />
      )}

      {activeTab === 'hifz' && (
        <HifzTrackerView
          state={state}
          stats={stats}
          onSelectTarget={onSelectStudyTarget}
          onUpdateHifzStatus={onUpdateHifzStatus}
        />
      )}

      {activeTab === 'tafseer' && (
        <TafseerJournalView
          state={state}
          onSelectTarget={onSelectStudyTarget}
          onToggleBookmark={onToggleBookmark}
          onSaveNote={onSaveNote}
          onDeleteNote={onDeleteNote}
        />
      )}
    </div>
  );
};
