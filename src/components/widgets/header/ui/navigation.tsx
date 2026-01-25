'use client';

import React, { MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../styles/header.module.css';

interface NavigationProps {
  type: 'desktop' | 'mobile';
  onNavClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ type, onNavClick }) => {
  const t = useTranslations('header.nav');

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    if (sectionId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (onNavClick) {
      onNavClick();
    }
  };

  const navItems = [
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'contact', label: t('contact') },
  ];

  if (type === 'desktop') {
    return (
      <ul className={styles.navLinks}>
        {navItems.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={styles.navLink}
              onClick={e => handleNavClick(e, `#${item.id}`)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.mobileNavLinks}>
      {navItems.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={styles.mobileNavLink}
            onClick={e => handleNavClick(e, `#${item.id}`)}
            role="menuitem"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
