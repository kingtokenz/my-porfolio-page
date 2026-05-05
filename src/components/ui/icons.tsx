import React from 'react';

export const NikeSwoosh = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 7.5c-3.1 1.9-7.2 4.1-11.2 5.6-2.5.9-4.8 1.4-6.8 1.4-.8 0-1.4-.1-2-.3.4 1.1 1.5 2.1 3.2 2.1 1.9 0 4.4-.8 7.3-2.3 4.1-2.1 8.5-5.3 11.5-8.5.2-.2.3-.4.3-.6 0-.2-.1-.4-.3-.4-.2 0-.4.1-.6.3z" />
  </svg>
);
