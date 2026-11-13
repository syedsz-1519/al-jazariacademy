import React from 'react';
import { Sparkles } from 'lucide-react';
import { WorkspaceView } from '../types/academy';
import { AcademyCrestIcon } from './StarMotif';

interface TopNavProps {
  activeView: WorkspaceView;
  isEnrolled: boolean;
  onNavigate: (view: WorkspaceView) => void;
  onOpenEnroll: () => void;
}

const NAV_ITEMS: { id: WorkspaceView; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'ilm-hub', label: 'Ilm Hub' },
  { id: 'contact', label: 'Contact' },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeView,
  isEnrolled,
  onNavigate,
  onOpenEnroll,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E1E6F2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark + Crest */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17316B]/30 rounded-[12px] py-1 pr-2 shrink-0 cursor-pointer"
        >
          <AcademyCrestIcon className="w-9 h-9 shrink-0" />
          <span className="font-display text-[17px] sm:text-[18px] font-semibold tracking-[-0.02em] text-[#14213D] whitespace-nowrap">
            Al-Jazari Academy
          </span>
        </button>

        {/* Zone 2: Central Route Container (Desktop) */}
        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-1 p-1 bg-[#F5F7FB] border border-[#E1E6F2] rounded-full"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17316B]/25 ${
                  isActive
                    ? 'bg-[#E8EDF8] text-[#17316B] font-semibold'
                    : 'text-[#4B5675] hover:text-[#14213D] hover:bg-[#FFFFFF]/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Enrollment Primary Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenEnroll}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-[14px] bg-[#C8A35A] hover:bg-[#B89247] text-[#0F2250] text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17316B]/40"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{isEnrolled ? 'Enrollment' : 'Enroll Now'}</span>
          </button>
        </div>
      </div>

      {/* Compact Mobile Navigation Row */}
      <nav
        aria-label="Mobile sections"
        className="md:hidden border-t border-[#E1E6F2] bg-[#FFFFFF] px-4 py-2 flex items-center gap-1.5 overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#E8EDF8] text-[#17316B] font-semibold'
                  : 'text-[#4B5675] hover:text-[#14213D]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
