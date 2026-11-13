/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { TopNav } from './components/TopNav';
import { OverviewView } from './components/OverviewView';
import { TajweedReaderView } from './components/TajweedReaderView';
import { HifzTrackerView } from './components/HifzTrackerView';
import { TafseerJournalView } from './components/TafseerJournalView';
import { useAcademyStore } from './hooks/useAcademyStore';
import { WorkspaceView } from './types/academy';

export default function App() {
  const [activeView, setActiveView] = useState<WorkspaceView>('overview');

  const {
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
  } = useAcademyStore();

  const handleNavigate = (view: WorkspaceView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToAyah = (
    view: WorkspaceView,
    surahId: string,
    ayahNumber: number
  ) => {
    setActiveStudyTarget(surahId, ayahNumber);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeStudy = () => {
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F7FB] text-[#14213D]">
        <TopNav
          activeView={activeView}
          onNavigate={handleNavigate}
          onResumeStudy={handleResumeStudy}
        />

        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeView === 'overview' && (
                <OverviewView
                  state={state}
                  stats={stats}
                  onNavigate={handleNavigate}
                  onJumpToAyah={handleJumpToAyah}
                  onUpdateGoal={(dailyAyahGoal) =>
                    updatePreferences({ dailyAyahGoal })
                  }
                  onExportJson={exportProgressJson}
                  onResetProgress={resetProgress}
                />
              )}

              {activeView === 'reader' && (
                <TajweedReaderView
                  state={state}
                  onSelectSurah={setActiveStudyTarget}
                  onToggleRecited={toggleRecitedAyah}
                  onToggleBookmark={toggleBookmarkAyah}
                  onUpdatePreferences={updatePreferences}
                  onJumpToModule={handleJumpToAyah}
                />
              )}

              {activeView === 'hifz' && (
                <HifzTrackerView
                  state={state}
                  stats={stats}
                  onSelectTarget={setActiveStudyTarget}
                  onUpdateHifzStatus={updateHifzStatus}
                />
              )}

              {activeView === 'tafseer' && (
                <TafseerJournalView
                  state={state}
                  onSelectTarget={setActiveStudyTarget}
                  onToggleBookmark={toggleBookmarkAyah}
                  onSaveNote={addOrUpdateReflectionNote}
                  onDeleteNote={deleteReflectionNote}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
