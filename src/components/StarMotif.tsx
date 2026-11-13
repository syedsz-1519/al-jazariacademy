import React from 'react';

export const AcademyCrestIcon: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="12" fill="#17316B" />
    {/* Subtle 8-point star behind open book */}
    <path
      d="M20 7.5L22.6 13.4L28.8 11.2L26.6 17.4L32.5 20L26.6 22.6L28.8 28.8L22.6 26.6L20 32.5L17.4 26.6L11.2 28.8L13.4 22.6L7.5 20L13.4 17.4L11.2 11.2L17.4 13.4L20 7.5Z"
      stroke="#C8A35A"
      strokeOpacity="0.42"
      strokeWidth="1.2"
    />
    {/* Open book motif */}
    <path
      d="M11.5 16.2C11.5 15.3 12.2 14.6 13.1 14.7C15.4 14.9 17.9 15.8 20 17.2C22.1 15.8 24.6 14.9 26.9 14.7C27.8 14.6 28.5 15.3 28.5 16.2V25.5C28.5 26.3 27.9 27 27.1 27.1C24.7 27.4 22.2 28.2 20 29.4C17.8 28.2 15.3 27.4 12.9 27.1C12.1 27 11.5 26.3 11.5 25.5V16.2Z"
      fill="#FFFFFF"
      fillOpacity="0.14"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M20 17.2V29.2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Gold star accent */}
    <circle cx="20" cy="11.5" r="1.75" fill="#C8A35A" />
  </svg>
);

export const GeometricStarBackdrop: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    className={`pointer-events-none select-none ${className}`}
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="al-jazari-star-pattern"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
      >
        {/* 8-point Khatam geometric star in #17316B at ~4% opacity */}
        <g stroke="#17316B" strokeOpacity="0.045" strokeWidth="1.1" fill="none">
          <rect x="32" y="32" width="56" height="56" />
          <rect
            x="32"
            y="32"
            width="56"
            height="56"
            transform="rotate(45 60 60)"
          />
          <circle cx="60" cy="60" r="14" />
          <path d="M60 0V20M60 100V120M0 60H20M100 60H120" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#al-jazari-star-pattern)" />
  </svg>
);
