'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Locale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import s from '../styles/header.module.css';

interface Language {
  code: 'en' | 'ua' | 'ru';
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  currentLocale: Locale;
  type?: 'desktop' | 'mobile';
  onCloseMobileMenu?: () => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ua', name: 'Українська', flag: '🇺🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLocale,
  type = 'desktop',
  onCloseMobileMenu,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <div className={s.languageSelector}>
      <button
        className={s.languageBtn}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentLanguage.flag}
        <span>
          {type === 'desktop' ? currentLanguage.code.toUpperCase() : currentLanguage.name}
        </span>
        {type === 'desktop' && ' ▼'}
      </button>
      <div
        className={`${s.languageDropdown} ${isOpen ? s.active : ''}`}
        ref={dropdownRef}
        role="menu"
        aria-hidden={!isOpen}
      >
        {languages.map(lang => (
          <button
            key={lang.code}
            className={s.languageOption}
            onClick={() => changeLanguage(lang.code)}
            role="menuitem"
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};
