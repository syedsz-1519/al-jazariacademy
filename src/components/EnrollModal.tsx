import React, { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, Check, Clock, X } from 'lucide-react';
import { CURRICULUM_SURAHS, getSurahById } from '../data/curriculum';
import { EnrollmentRecord, EnrollmentTrack } from '../types/academy';

interface EnrollModalProps {
  isOpen: boolean;
  existingEnrollment: EnrollmentRecord | null;
  onClose: () => void;
  onSubmitEnrollment: (payload: {
    studentName: string;
    email: string;
    track: EnrollmentTrack;
    dailyMinutes: 15 | 30 | 60;
    startingSurahId: string;
    learningGoal: string;
  }) => void;
  onEnterIlmHub: (surahId: string) => void;
}

const TRACK_OPTIONS: {
  id: EnrollmentTrack;
  subtitle: string;
}[] = [
  {
    id: 'Complete Ilm Hub Track',
    subtitle: 'Tajweed Reader, Hifz Recall & Tafseer Journal combined',
  },
  {
    id: 'Foundational Tajweed',
    subtitle: 'Articulation points (Makhraj) & measured recitation rules',
  },
  {
    id: 'Hifz Memorization Cohort',
    subtitle: 'Active word-masking recall & spaced revision checkpoints',
  },
  {
    id: 'Tafseer & Contemplation',
    subtitle: 'Classical thematic commentary & structured reflection notes',
  },
];

const PACE_OPTIONS: { minutes: 15 | 30 | 60; label: string; ayahs: string }[] = [
  { minutes: 15, label: '15 mins / day', ayahs: '5 Ayahs daily goal' },
  { minutes: 30, label: '30 mins / day', ayahs: '8 Ayahs daily goal' },
  { minutes: 60, label: '60 mins / day', ayahs: '12 Ayahs daily goal' },
];

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  existingEnrollment,
  onClose,
  onSubmitEnrollment,
  onEnterIlmHub,
}) => {
  const [studentName, setStudentName] = useState(
    existingEnrollment?.studentName ?? ''
  );
  const [email, setEmail] = useState(existingEnrollment?.email ?? '');
  const [track, setTrack] = useState<EnrollmentTrack>(
    existingEnrollment?.track ?? 'Complete Ilm Hub Track'
  );
  const [dailyMinutes, setDailyMinutes] = useState<15 | 30 | 60>(
    existingEnrollment?.dailyMinutes ?? 30
  );
  const [startingSurahId, setStartingSurahId] = useState(
    existingEnrollment?.startingSurahId ?? 'al-fatihah'
  );
  const [learningGoal, setLearningGoal] = useState(
    existingEnrollment?.learningGoal ?? ''
  );
  const [error, setError] = useState('');
  const [submittedRecord, setSubmittedRecord] =
    useState<EnrollmentRecord | null>(existingEnrollment);
  const [isEditing, setIsEditing] = useState(!existingEnrollment);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSubmittedRecord(existingEnrollment);
      setIsEditing(!existingEnrollment);
      setError('');
    }
  }, [isOpen, existingEnrollment]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Please enter your full name to register your study plan.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    onSubmitEnrollment({
      studentName,
      email,
      track,
      dailyMinutes,
      startingSurahId,
      learningGoal,
    });

    setSubmittedRecord({
      studentName: studentName.trim(),
      email: email.trim(),
      track,
      dailyMinutes,
      startingSurahId,
      learningGoal: learningGoal.trim(),
      enrolledAt: new Date().toISOString(),
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enroll-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F2250]/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-[#FFFFFF] border border-[#E1E6F2] shadow-[0_16px_40px_rgba(15,34,80,0.20)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E1E6F2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF4E0] flex items-center justify-center text-[#775A17]">
              <Award className="w-5 h-5 text-[#C8A35A]" />
            </div>
            <div>
              <h2
                id="enroll-modal-title"
                className="font-display text-[20px] font-semibold text-[#14213D]"
              >
                {submittedRecord && !isEditing
                  ? 'Academy Enrollment Confirmed'
                  : 'Enroll in Al-Jazari Academy'}
              </h2>
              <p className="text-[13px] text-[#4B5675]">
                Configure your study track, daily pace, and starting Surah.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close enrollment modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#F5F7FB] flex items-center justify-center text-[#4B5675] hover:text-[#14213D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State or Application Form */}
        {submittedRecord && !isEditing ? (
          <div className="p-6 sm:p-7 space-y-6">
            <div className="p-5 rounded-[16px] bg-[#E8F6ED] border border-[#2E9E6B]/25 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#2E9E6B] text-[#FFFFFF] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display text-[16px] font-semibold text-[#14213D]">
                  Welcome to Al-Jazari Academy, {submittedRecord.studentName}
                </div>
                <p className="text-[14px] text-[#146C43]">
                  Your personalized study plan has been saved locally and synced
                  with Ilm Hub.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div className="p-4 rounded-[14px] bg-[#F5F7FB]">
                <div className="text-[12px] text-[#4B5675]">Selected Track</div>
                <div className="font-semibold text-[#14213D] mt-0.5">
                  {submittedRecord.track}
                </div>
              </div>
              <div className="p-4 rounded-[14px] bg-[#F5F7FB]">
                <div className="text-[12px] text-[#4B5675]">Daily Cadence</div>
                <div className="font-semibold text-[#14213D] mt-0.5 tabular-nums">
                  {submittedRecord.dailyMinutes} minutes / day
                </div>
              </div>
              <div className="p-4 rounded-[14px] bg-[#F5F7FB]">
                <div className="text-[12px] text-[#4B5675]">Starting Surah</div>
                <div className="font-semibold text-[#14213D] mt-0.5">
                  {getSurahById(submittedRecord.startingSurahId).name}
                </div>
              </div>
              <div className="p-4 rounded-[14px] bg-[#F5F7FB]">
                <div className="text-[12px] text-[#4B5675]">Student Email</div>
                <div className="font-semibold text-[#14213D] mt-0.5 truncate">
                  {submittedRecord.email}
                </div>
              </div>
            </div>

            {submittedRecord.learningGoal && (
              <div className="p-4 rounded-[14px] bg-[#EFEAF8]/60 text-[14px] text-[#14213D]">
                <span className="font-semibold text-[#17316B]">Study Intention: </span>
                {submittedRecord.learningGoal}
              </div>
            )}

            <div className="pt-2 border-t border-[#E1E6F2] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 rounded-[12px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[14px] font-medium cursor-pointer"
              >
                Update Study Plan
              </button>

              <button
                type="button"
                onClick={() => {
                  onEnterIlmHub(submittedRecord.startingSurahId);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[14px] font-medium cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Begin in Ilm Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enroll-name"
                  className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                >
                  Student Name
                </label>
                <input
                  id="enroll-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Amina Rahman"
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                />
              </div>

              <div>
                <label
                  htmlFor="enroll-email"
                  className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="enroll-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="student@example.com"
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                />
              </div>
            </div>

            {/* Study Track Selection */}
            <div>
              <span className="block text-[13px] font-medium text-[#4B5675] mb-2">
                Select Study Track
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TRACK_OPTIONS.map((opt) => {
                  const selected = track === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTrack(opt.id)}
                      className={`p-3.5 rounded-[14px] border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#E8EDF8] border-[#17316B] text-[#14213D]'
                          : 'bg-[#FFFFFF] border-[#E1E6F2] hover:bg-[#F5F7FB] text-[#4B5675]'
                      }`}
                    >
                      <div className="font-display text-[14px] font-semibold text-[#14213D]">
                        {opt.id}
                      </div>
                      <div className="text-[12px] text-[#4B5675] mt-0.5 leading-[1.4]">
                        {opt.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Pace & Starting Surah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[13px] font-medium text-[#4B5675] mb-1.5">
                  Daily Study Pace
                </span>
                <div className="space-y-1.5">
                  {PACE_OPTIONS.map((pace) => {
                    const selected = dailyMinutes === pace.minutes;
                    return (
                      <button
                        key={pace.minutes}
                        type="button"
                        onClick={() => setDailyMinutes(pace.minutes)}
                        className={`w-full px-3.5 py-2 rounded-[12px] border flex items-center justify-between text-[13px] transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#E8EDF8] border-[#17316B] text-[#17316B] font-semibold'
                            : 'bg-[#FFFFFF] border-[#E1E6F2] text-[#4B5675] hover:bg-[#F5F7FB]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pace.label}</span>
                        </span>
                        <span className="text-[12px] opacity-85 tabular-nums">
                          {pace.ayahs}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="enroll-surah"
                    className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                  >
                    Starting Surah
                  </label>
                  <select
                    id="enroll-surah"
                    value={startingSurahId}
                    onChange={(e) => setStartingSurahId(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#17316B]/20"
                  >
                    {CURRICULUM_SURAHS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.number}. {s.name} ({s.ayahCountLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="enroll-goal"
                    className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                  >
                    Personal Study Intention (Optional)
                  </label>
                  <input
                    id="enroll-goal"
                    type="text"
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    placeholder="e.g. Perfect Juz 30 Tajweed"
                    className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[13px] font-medium text-[#BA1A1A]">{error}</p>
            )}

            <div className="pt-3 border-t border-[#E1E6F2] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] hover:bg-[#F5F7FB] text-[14px] font-medium text-[#4B5675] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[14px] font-semibold transition-colors cursor-pointer"
              >
                <span>Confirm Enrollment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
