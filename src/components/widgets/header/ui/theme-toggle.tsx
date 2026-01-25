'use client';

import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../styles/header.module.css';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  type?: 'desktop' | 'mobile';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ type = 'desktop' }) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('header.nav');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  if (!mounted) {
    return <div className={styles.themeToggle} style={{ opacity: 0 }}></div>;
  }

  return (
    <div
      className={`${styles.themeToggle} ${theme === 'dark' ? styles.active : ''}`}
      onClick={handleToggle}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
    >
      <div className={styles.themeToggleHandle}></div>
    </div>
  );
};
