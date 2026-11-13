import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  Edit3,
  Feather,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  CURRICULUM_SURAHS,
  getSurahById,
  makeAyahKey,
} from '../data/curriculum';
import {
  AcademyProgressState,
  ReflectionNote,
  ReflectionThemeTag,
} from '../types/academy';

interface TafseerJournalViewProps {
  state: AcademyProgressState;
  onSelectTarget: (surahId: string, ayahNumber: number) => void;
  onToggleBookmark: (ayahKey: string) => void;
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

const THEME_TAGS: ReflectionThemeTag[] = [
  'Guidance',
  'Gratitude',
  'Mercy',
  'Tawheed',
  'Steadfastness',
];

export const TafseerJournalView: React.FC<TafseerJournalViewProps> = ({
  state,
  onSelectTarget,
  onToggleBookmark,
  onSaveNote,
  onDeleteNote,
}) => {
  const activeSurah = getSurahById(state.activeSurahId);
  const activeAyah =
    activeSurah.ayahs.find((a) => a.number === state.activeAyahNumber) ??
    activeSurah.ayahs[0];
  const activeKey = makeAyahKey(activeSurah.id, activeAyah.number);
  const isBookmarked = state.bookmarkedAyahs.includes(activeKey);

  // Composer State
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);
  const [themeTag, setThemeTag] = useState<ReflectionThemeTag>('Guidance');
  const [keyLesson, setKeyLesson] = useState('');
  const [personalApplication, setPersonalApplication] = useState('');
  const [vocabularyNote, setVocabularyNote] = useState('');
  const [formError, setFormError] = useState('');
  const [saveBanner, setSaveBanner] = useState('');

  // Journal Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [themeFilter, setThemeFilter] = useState<ReflectionThemeTag | 'all'>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyLesson.trim()) {
      setFormError('Please record at least a brief Key Lesson before saving.');
      return;
    }

    onSaveNote({
      id: editingNoteId,
      surahId: activeSurah.id,
      ayahNumber: activeAyah.number,
      themeTag,
      keyLesson,
      personalApplication,
      vocabularyNote,
    });

    setEditingNoteId(undefined);
    setKeyLesson('');
    setPersonalApplication('');
    setVocabularyNote('');
    setFormError('');
    setSaveBanner(
      editingNoteId
        ? 'Reflection entry updated.'
        : `Reflection saved for ${activeSurah.name}, Ayah ${activeAyah.number}.`
    );
    window.setTimeout(() => setSaveBanner(''), 3000);
  };

  const handleStartEdit = (note: ReflectionNote) => {
    onSelectTarget(note.surahId, note.ayahNumber);
    setEditingNoteId(note.id);
    setThemeTag(note.themeTag);
    setKeyLesson(note.keyLesson);
    setPersonalApplication(note.personalApplication);
    setVocabularyNote(note.vocabularyNote);
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNoteId(undefined);
    setKeyLesson('');
    setPersonalApplication('');
    setVocabularyNote('');
    setFormError('');
  };

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return state.reflectionNotes.filter((note) => {
      if (themeFilter !== 'all' && note.themeTag !== themeFilter) return false;
      if (bookmarkedOnly && !state.bookmarkedAyahs.includes(note.ayahKey)) {
        return false;
      }
      if (!q) return true;
      const surah = getSurahById(note.surahId);
      return (
        note.keyLesson.toLowerCase().includes(q) ||
        note.personalApplication.toLowerCase().includes(q) ||
        note.vocabularyNote.toLowerCase().includes(q) ||
        surah.name.toLowerCase().includes(q) ||
        note.themeTag.toLowerCase().includes(q)
      );
    });
  }, [state.reflectionNotes, state.bookmarkedAyahs, themeFilter, bookmarkedOnly, searchQuery]);

  return (
    <div className="space-y-8 pb-14">
      {/* Header & Verse Selector */}
      <section className="academy-card p-6 bg-[#FFFFFF] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEAF8] text-[#17316B] text-[13px] font-medium">
            <Feather className="w-3.5 h-3.5" />
            <span>Tafseer &amp; Contemplation Journal</span>
          </div>
          <h1 className="font-display text-[28px] font-semibold text-[#14213D] tracking-[-0.02em]">
            Classical Commentary &amp; Personal Reflections
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Select Surah for Tafseer"
            value={activeSurah.id}
            onChange={(e) => onSelectTarget(e.target.value, 1)}
            className="h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] font-medium text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 cursor-pointer"
          >
            {CURRICULUM_SURAHS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.number}. {s.name}
              </option>
            ))}
          </select>

          <select
            aria-label="Select Ayah for Tafseer"
            value={activeAyah.number}
            onChange={(e) => onSelectTarget(activeSurah.id, Number(e.target.value))}
            className="h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] font-medium text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 cursor-pointer tabular-nums"
          >
            {activeSurah.ayahs.map((a) => (
              <option key={a.number} value={a.number}>
                Ayah {a.number}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onToggleBookmark(activeKey)}
            className={`h-11 inline-flex items-center gap-1.5 px-4 rounded-[12px] border text-[14px] font-medium transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#FFF4E0] border-[#C8A35A]/60 text-[#775A17]'
                : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675] hover:bg-[#F5F7FB]'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'fill-[#C8A35A] text-[#C8A35A]' : ''}`}
            />
            <span>{isBookmarked ? 'Pinned' : 'Pin Ayah'}</span>
          </button>
        </div>
      </section>

      {/* Main Two-Column Tafseer & Journal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Selected Ayah & Classical Tafseer */}
        <section className="lg:col-span-5 space-y-4">
          <div className="academy-card overflow-hidden">
            {/* Lavender Tinted Tafseer Header */}
            <div className="p-6 bg-[#EFEAF8]/75 border-b border-[#E1E6F2] space-y-4">
              <div className="flex items-center justify-between text-[13px] font-medium text-[#4B5675]">
                <span>
                  {activeSurah.name} · Ayah {activeAyah.number}
                </span>
                <span>Juz {activeSurah.juz}</span>
              </div>

              <p
                dir="rtl"
                className="font-arabic text-[28px] text-[#14213D] leading-[2.0]"
              >
                {activeAyah.segments.map((s) => s.text).join(' ')}
              </p>

              <p className="text-[15px] text-[#14213D] leading-[1.6]">
                {activeAyah.translation}
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="text-[12px] font-medium text-[#4B5675] mb-1">
                  Thematic Commentary
                </div>
                <h2 className="font-display text-[19px] font-semibold text-[#14213D] mb-2">
                  {activeAyah.tafseerTitle}
                </h2>
                <p className="text-[14px] leading-[1.65] text-[#4B5675]">
                  {activeAyah.tafseerSummary}
                </p>
              </div>

              {activeAyah.keyVocabulary.length > 0 && (
                <div className="pt-4 border-t border-[#E1E6F2]">
                  <div className="text-[12px] font-medium text-[#4B5675] mb-2.5">
                    Key Quranic Vocabulary
                  </div>
                  <div className="space-y-2">
                    {activeAyah.keyVocabulary.map((vocab) => (
                      <div
                        key={vocab.term}
                        className="px-3.5 py-2.5 rounded-[12px] bg-[#F5F7FB] flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-[13px] font-semibold text-[#14213D]">
                            {vocab.term}
                          </div>
                          <div className="text-[12px] text-[#4B5675]">
                            {vocab.meaning}
                          </div>
                        </div>
                        <span className="font-arabic text-[20px] text-[#17316B] shrink-0">
                          {vocab.arabic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#E1E6F2]">
                <div className="text-[12px] font-medium text-[#17316B] mb-1">
                  Reflection Prompt
                </div>
                <p className="text-[14px] italic text-[#4B5675] leading-[1.6]">
                  {activeAyah.reflectionPrompt}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Reflection Composer + Saved Journal */}
        <section className="lg:col-span-7 space-y-6">
          {/* Reflection Composer */}
          <form onSubmit={handleSubmit} className="academy-card p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-[19px] font-semibold text-[#14213D]">
                {editingNoteId
                  ? 'Edit Reflection Entry'
                  : `New Reflection — ${activeSurah.name} (${activeAyah.number})`}
              </h2>
              {editingNoteId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center gap-1 text-[13px] text-[#4B5675] hover:text-[#14213D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            {/* Theme Tag Selector */}
            <div>
              <span className="block text-[13px] font-medium text-[#4B5675] mb-2">
                Reflection Theme
              </span>
              <div className="flex flex-wrap gap-1.5">
                {THEME_TAGS.map((tag) => {
                  const selected = themeTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setThemeTag(tag)}
                      className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#17316B] text-[#FFFFFF]'
                          : 'bg-[#EFEAF8] text-[#17316B] hover:bg-[#E2DAF3]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="key-lesson-input"
                className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
              >
                Key Lesson
              </label>
              <textarea
                id="key-lesson-input"
                rows={3}
                value={keyLesson}
                onChange={(e) => {
                  setKeyLesson(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="What core insight stood out to you in this Ayah?"
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="personal-app-input"
                  className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                >
                  Personal Application
                </label>
                <input
                  id="personal-app-input"
                  type="text"
                  value={personalApplication}
                  onChange={(e) => setPersonalApplication(e.target.value)}
                  placeholder="One small action for today..."
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                />
              </div>

              <div>
                <label
                  htmlFor="vocab-note-input"
                  className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                >
                  Vocabulary / Root Note
                </label>
                <input
                  id="vocab-note-input"
                  type="text"
                  value={vocabularyNote}
                  onChange={(e) => setVocabularyNote(e.target.value)}
                  placeholder="Optional Arabic word or root note"
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                />
              </div>
            </div>

            {formError && (
              <p className="text-[13px] font-medium text-[#BA1A1A]">{formError}</p>
            )}
            {saveBanner && (
              <p className="text-[13px] font-medium text-[#146C43]">{saveBanner}</p>
            )}

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[14px] font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{editingNoteId ? 'Update Reflection' : 'Save Reflection'}</span>
              </button>
            </div>
          </form>

          {/* Saved Reflections Journal */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-display text-[20px] font-semibold text-[#14213D]">
                Saved Reflections ({filteredNotes.length})
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#4B5675] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="h-10 pl-9 pr-3 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[13px] text-[#14213D] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 w-48"
                  />
                </div>

                <select
                  aria-label="Filter notes by theme"
                  value={themeFilter}
                  onChange={(e) =>
                    setThemeFilter(e.target.value as ReflectionThemeTag | 'all')
                  }
                  className="h-10 px-3 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[13px] text-[#14213D] cursor-pointer"
                >
                  <option value="all">All Themes</option>
                  {THEME_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setBookmarkedOnly((v) => !v)}
                  className={`h-10 px-3 rounded-[12px] border text-[13px] font-medium transition-colors cursor-pointer ${
                    bookmarkedOnly
                      ? 'bg-[#FFF4E0] border-[#C8A35A]/60 text-[#775A17]'
                      : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675]'
                  }`}
                >
                  Pinned Only
                </button>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="academy-card p-8 text-center space-y-3">
                <p className="text-[15px] font-medium text-[#14213D]">
                  No reflection entries match your current filters.
                </p>
                <p className="text-[13px] text-[#4B5675]">
                  Write a reflection above or clear your search criteria to view all notes.
                </p>
                {(searchQuery || themeFilter !== 'all' || bookmarkedOnly) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setThemeFilter('all');
                      setBookmarkedOnly(false);
                    }}
                    className="px-4 py-2 rounded-[12px] bg-[#E8EDF8] text-[#17316B] text-[13px] font-medium cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredNotes.map((note) => {
                  const surah = getSurahById(note.surahId);
                  const pinned = state.bookmarkedAyahs.includes(note.ayahKey);
                  return (
                    <article key={note.id} className="academy-card p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectTarget(note.surahId, note.ayahNumber)}
                          className="text-left flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675] hover:text-[#17316B] cursor-pointer"
                        >
                          <span className="font-semibold text-[#17316B]">
                            {surah.name} · Ayah {note.ayahNumber}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{note.themeTag}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {new Date(note.updatedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          {pinned && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#775A17]">Pinned</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            aria-label="Edit reflection"
                            onClick={() => handleStartEdit(note)}
                            className="p-1.5 rounded-[8px] text-[#4B5675] hover:bg-[#E8EDF8] hover:text-[#17316B] transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {confirmDeleteId !== note.id ? (
                            <button
                              type="button"
                              aria-label="Delete reflection"
                              onClick={() => setConfirmDeleteId(note.id)}
                              className="p-1.5 rounded-[8px] text-[#4B5675] hover:bg-[#FCEFF3] hover:text-[#8A2846] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  onDeleteNote(note.id);
                                  setConfirmDeleteId(null);
                                }}
                                className="px-2.5 py-1 rounded-[8px] bg-[#8A2846] text-[#FFFFFF] text-[12px] font-medium cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1 rounded-[8px] border border-[#E1E6F2] text-[12px] text-[#4B5675] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-[15px] leading-[1.6] text-[#14213D]">
                        {note.keyLesson}
                      </p>

                      {(note.personalApplication || note.vocabularyNote) && (
                        <div className="pt-3 border-t border-[#E1E6F2] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#4B5675]">
                          {note.personalApplication && (
                            <div>
                              <span className="font-semibold text-[#17316B]">
                                Practice:{' '}
                              </span>
                              <span>{note.personalApplication}</span>
                            </div>
                          )}
                          {note.vocabularyNote && (
                            <div>
                              <span className="font-semibold text-[#17316B]">
                                Vocabulary:{' '}
                              </span>
                              <span>{note.vocabularyNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
