'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import styles from '../styles/header.module.css';
import { Navigation } from './navigation';
import { ThemeToggle } from './theme-toggle';
import { LanguageSelector } from './language-selector';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const locale = useLocale() as 'en' | 'ua' | 'ru';

  return (
    <div
      className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}
      id="mobileMenu"
      role="menu"
      aria-hidden={!isOpen}
    >
      <div className={styles.container}>
        <Navigation type="mobile" onNavClick={onClose} />

        <div className={styles.mobileControls}>
          <ThemeToggle type="mobile" />
          <LanguageSelector currentLocale={locale} type="mobile" onCloseMobileMenu={onClose} />
        </div>
      </div>
    </div>
  );
};
