import React from 'react';

export const TelegramIcon = ({ className = '', width = 40, height = 40 }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    fill="currentColor"
  >
    <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.824 8.243l-1.996 9.414c-.15.674-.55.842-1.115.524l-3.042-2.242-1.468 1.412c-.162.162-.3.298-.614.298l.218-3.1 5.644-5.1c.246-.218-.054-.34-.38-.124L8.41 12.518l-3.003-.938c-.653-.204-.666-.653.136-.966l11.728-4.518c.543-.204 1.018.12.82.934z" />
  </svg>
);
