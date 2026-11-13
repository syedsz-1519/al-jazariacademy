/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { TopNav } from './components/TopNav';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { IlmHubView } from './components/IlmHubView';
import { ContactView } from './components/ContactView';
import { EnrollModal } from './components/EnrollModal';
import { useAcademyStore } from './hooks/useAcademyStore';
import { IlmHubTab, WorkspaceView } from './types/academy';

export default function App() {
  const [activeView, setActiveView] = useState<WorkspaceView>('home');
  const [ilmTab, setIlmTab] = useState<IlmHubTab>('reader');
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

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
    saveEnrollment,
    resetProgress,
    exportProgressJson,
  } = useAcademyStore();

  const handleNavigate = (view: WorkspaceView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenIlmHub = (
    tab: IlmHubTab,
    surahId?: string,
    ayahNumber?: number
  ) => {
    if (surahId) {
      setActiveStudyTarget(surahId, ayahNumber ?? 1);
    }
    setIlmTab(tab);
    setActiveView('ilm-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F7FB] text-[#14213D]">
        <TopNav
          activeView={activeView}
          isEnrolled={Boolean(state.enrollment)}
          onNavigate={handleNavigate}
          onOpenEnroll={() => setIsEnrollOpen(true)}
        />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeView === 'home' ? (
                <HomeView
                  state={state}
                  stats={stats}
                  onNavigate={handleNavigate}
                  onOpenIlmHub={handleOpenIlmHub}
                  onOpenEnroll={() => setIsEnrollOpen(true)}
                />
              ) : (
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                  {activeView === 'about' && (
                    <AboutView
                      state={state}
                      stats={stats}
                      onOpenIlmHub={handleOpenIlmHub}
                      onOpenEnroll={() => setIsEnrollOpen(true)}
                      onNavigate={handleNavigate}
                      onExportJson={exportProgressJson}
                      onResetProgress={resetProgress}
                    />
                  )}

                  {activeView === 'ilm-hub' && (
                    <IlmHubView
                      activeTab={ilmTab}
                      onChangeTab={setIlmTab}
                      state={state}
                      stats={stats}
                      onSelectStudyTarget={setActiveStudyTarget}
                      onToggleRecited={toggleRecitedAyah}
                      onToggleBookmark={toggleBookmarkAyah}
                      onUpdatePreferences={updatePreferences}
                      onUpdateHifzStatus={updateHifzStatus}
                      onSaveNote={addOrUpdateReflectionNote}
                      onDeleteNote={deleteReflectionNote}
                    />
                  )}

                  {activeView === 'contact' && (
                    <ContactView onOpenEnroll={() => setIsEnrollOpen(true)} />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <EnrollModal
          isOpen={isEnrollOpen}
          existingEnrollment={state.enrollment}
          onClose={() => setIsEnrollOpen(false)}
          onSubmitEnrollment={saveEnrollment}
          onEnterIlmHub={(surahId) => handleOpenIlmHub('reader', surahId, 1)}
        />
      </div>
    </MotionConfig>
  );
}
