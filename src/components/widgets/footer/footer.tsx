import React from 'react';
import s from './footer.module.css';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer className={s.footer}>
      <div className={s.footerFloating}>
        <div className={s.floatingFooter}>⚡</div>
        <div className={s.floatingFooter}>🚀</div>
        <div className={s.floatingFooter}>💻</div>
        <div className={s.floatingFooter}>🎯</div>
      </div>

      <div className="container">
        <div className={s.footerContent}>
          <div className={s.footerBrand}>
            <span className={s.logo}>{t('logo')}</span>
            <p>{t('brandDescription')}</p>
            <div className={s.footerSocial}>
              <a href="#" className={s.footerSocialLink} title="GitHub">
                💻
              </a>
              <a href="#" className={s.footerSocialLink} title="LinkedIn">
                💼
              </a>
              <a href="#" className={s.footerSocialLink} title="Telegram">
                📨
              </a>
              <a href="#" className={s.footerSocialLink} title="Twitter">
                🐦
              </a>
            </div>
          </div>

          <div className={s.footerLinksSection}>
            <div className={s.footerLinks}>
              <h3>Navigation</h3>
              <ul>
                <li>
                  <a href="#about">{t('navigation')}</a>
                </li>
                <li>
                  <a href="#skills">{t('service')}</a>
                </li>
                <li>
                  <a href="#projects">{t('projects')}</a>
                </li>
                <li>
                  <a href="#contact">{t('contact')}</a>
                </li>
              </ul>
            </div>

            <div className={s.footerLinks}>
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">{t('services.frontend')}</a>
                </li>
                <li>
                  <a href="#">{t('services.react')}</a>
                </li>
                <li>
                  <a href="#">{t('services.nextjs')}</a>
                </li>
                <li>
                  <a href="#">{t('services.webapps')}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={s.footerContact}>
            <h3>Contact</h3>
            <p>
              📧 <a href="mailto:shvepsolek@gmail.com">shvepsolek@gmail.com</a>
            </p>
            <p>
              📱 <a href="tel:+380983293090">+380 98 329 30 90</a>
            </p>
            <p>{t('location')}</p>
            <p>{t('availability')}</p>
          </div>
        </div>

        <div className={s.footerBottom}>
          <div className={s.footerCopyright}>
            {t.rich('copyright', {
              name: chunks => (
                <a href="#" className={s.footerLink}>
                  {chunks}
                </a>
              ),
            })}
          </div>

          <div className={s.footerMadeWith}>
            {t.rich('madeWith', {
              heart: chunks => <span className={s.footerHeart}>{chunks}</span>,
            })}
          </div>

          <a href="#" className={s.footerBackToTop} id="backToTop">
            <span>{t('backToTop')}</span>
            <span>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
