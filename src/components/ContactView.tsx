import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Mail,
  MessageSquare,
  Send,
} from 'lucide-react';
import { GeometricStarBackdrop } from './StarMotif';

interface ContactViewProps {
  onOpenEnroll: () => void;
}

const INQUIRY_TOPICS = [
  'Admissions & Track Placement',
  'Tajweed Pronunciation Guidance',
  'Hifz Memorization Scheduling',
  'Tafseer Curriculum Feedback',
] as const;

export const ContactView: React.FC<ContactViewProps> = ({ onOpenEnroll }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] =
    useState<(typeof INQUIRY_TOPICS)[number]>('Admissions & Track Placement');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<{
    fullName: string;
    email: string;
    topic: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please share a brief message (at least 10 characters).');
      return;
    }

    setSubmittedSummary({
      fullName: fullName.trim(),
      email: email.trim(),
      topic,
    });
    setFullName('');
    setEmail('');
    setMessage('');
    setError('');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden academy-card px-6 py-8 sm:px-10 sm:py-10">
        <GeometricStarBackdrop className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-[60ch]">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#4B5675]">
              <span>Contact Al-Jazari Academy</span>
              <span aria-hidden="true">·</span>
              <span>Academic Advising &amp; Support</span>
            </div>
            <h1 className="font-display text-[32px] sm:text-[38px] font-semibold text-[#14213D] leading-[1.16] tracking-[-0.02em]">
              Questions about placement, Tajweed, or curriculum?
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#4B5675]">
              Reach out to our academic advising desk for track recommendations,
              Surah suggestions, or study guidance.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEnroll}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[15px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-center"
          >
            <span>Open Enrollment Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Two-Column Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic Support Channels */}
        <aside className="lg:col-span-5 space-y-4">
          <div className="academy-card p-6 space-y-6">
            <h2 className="font-display text-[20px] font-semibold text-[#14213D]">
              Academic Advising Channels
            </h2>

            <div className="divide-y divide-[#E1E6F2]">
              <div className="pb-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E8EDF8] flex items-center justify-center text-[#17316B] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#14213D]">
                    Admissions &amp; Study Plans
                  </div>
                  <p className="text-[13px] text-[#4B5675] mt-0.5 leading-[1.55]">
                    admissions@aljazari-academy.org · Track placement for
                    beginners and returning Hifz students.
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FCEFF3] flex items-center justify-center text-[#8A2846] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#14213D]">
                    Tajweed &amp; Curriculum Desk
                  </div>
                  <p className="text-[13px] text-[#4B5675] mt-0.5 leading-[1.55]">
                    curriculum@aljazari-academy.org · Request new Surahs,
                    Makhraj annotations, or Tafseer notes.
                  </p>
                </div>
              </div>

              <div className="pt-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#EFEAF8] flex items-center justify-center text-[#17316B] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#14213D]">
                    Advising Response Window
                  </div>
                  <p className="text-[13px] text-[#4B5675] mt-0.5 leading-[1.55]">
                    Sunday – Thursday · 9:00 AM – 5:00 PM (typical reply within
                    one academic day).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Validated Inquiry Form */}
        <section className="lg:col-span-7">
          <div className="academy-card p-6 sm:p-8">
            {submittedSummary ? (
              <div className="space-y-6 py-4">
                <div className="p-5 rounded-[16px] bg-[#E8F6ED] border border-[#2E9E6B]/25 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#2E9E6B] text-[#FFFFFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-display text-[18px] font-semibold text-[#14213D]">
                      Inquiry Received
                    </h2>
                    <p className="text-[14px] text-[#146C43] leading-[1.6]">
                      Thank you, {submittedSummary.fullName}. Your question
                      regarding <strong>{submittedSummary.topic}</strong> has
                      been logged for <strong>{submittedSummary.email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedSummary(null)}
                    className="px-5 py-2.5 rounded-[12px] bg-[#E8EDF8] hover:bg-[#D6DFEE] text-[#17316B] text-[14px] font-medium cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={onOpenEnroll}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[14px] font-medium cursor-pointer"
                  >
                    <span>Enroll in a Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#17316B]" />
                  <h2 className="font-display text-[22px] font-semibold text-[#14213D]">
                    Send an Academic Inquiry
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Your name"
                      className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="you@example.com"
                      className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) =>
                      setTopic(e.target.value as (typeof INQUIRY_TOPICS)[number])
                    }
                    className="w-full h-11 px-3.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#17316B]/20"
                  >
                    {INQUIRY_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[13px] font-medium text-[#4B5675] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Share your current level, preferred Surahs, or question..."
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E1E6F2] bg-[#FFFFFF] text-[14px] text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#17316B]/20 focus:border-[#17316B]"
                  />
                </div>

                {error && (
                  <p className="text-[13px] font-medium text-[#BA1A1A]">{error}</p>
                )}

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#17316B] hover:bg-[#0F2250] text-[#FFFFFF] text-[14px] font-medium transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
