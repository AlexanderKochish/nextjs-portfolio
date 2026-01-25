'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useScroll } from '@/hooks/use-scroll';
import { Navigation } from './navigation';
import { ThemeToggle } from './theme-toggle';
import { LanguageSelector } from './language-selector';
import { MobileMenu } from './mobile-menu';
import s from '../styles/header.module.css';

export const Header: React.FC = () => {
  const locale = useLocale() as 'en' | 'ua' | 'ru';
  const t = useTranslations('header.nav');
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`} id="header">
      <div className="container">
        <div className={s.headerContent}>
          <Link href="#hero" className={s.logo}>
            AlexPortfolio
          </Link>

          <nav className={s.nav}>
            <Navigation type="desktop" />

            <div className={s.headerControls}>
              <ThemeToggle type="desktop" />
              <LanguageSelector currentLocale={locale} type="desktop" />
            </div>
          </nav>

          <button
            className={`${s.mobileMenuToggle} ${mobileMenuOpen ? s.active : ''}`}
            onClick={toggleMobileMenu}
            aria-label={t('menuToggle')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Header;
