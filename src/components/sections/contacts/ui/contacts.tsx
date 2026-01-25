import React from 'react';
import s from '../styles/contacts.module.css';
import { useTranslations } from 'next-intl';
import ContactForm from './form';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { GithubIcon } from '@/components/ui/icons/github';
import Link from 'next/link';
import LinkedInIcon from '@/components/ui/icons/linkedin';

const Contacts = () => {
  const t = useTranslations('contact');
  return (
    <section className={s.contact} id="contact">
      <div className={s.contactFloating}>
        <div className={s.floatingContact}>📧</div>
        <div className={s.floatingContact}>📱</div>
        <div className={s.floatingContact}>💬</div>
      </div>

      <div className="container">
        <div className={s.contactHeader}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={s.contactContent}>
          <div className={s.contactInfo}>
            <div className={s.contactCard}>
              <div className={s.contactIcon}>📧</div>
              <h3 className={s.contactTitle}>{t('info.email')}</h3>
              <p className={s.contactDetail}>shvepsolek@gmail.com</p>
              <a href="mailto:shvepsolek@gmail.com" className={s.contactLink}>
                {t('links.sendEmail')}
              </a>
            </div>

            <div className={s.contactCard}>
              <div className={s.contactIcon}>📱</div>
              <h3 className={s.contactTitle}>{t('info.phone')}</h3>
              <p className={s.contactDetail}>+380 98 329 30 90</p>
              <a href="tel:+380983293090" className={s.contactLink}>
                {t('links.callMe')}
              </a>
            </div>

            <div className={s.contactCard}>
              <div className={s.contactIcon}>🌐</div>
              <h3 className={s.contactTitle}>{t('info.socialMedia')}</h3>
              <div className={s.socialLinks}>
                <Link
                  href="https://t.me/AlexanderFrontEndDev"
                  className={s.socialLink}
                  target="_blank"
                  title="Telegram"
                >
                  <TelegramIcon />
                </Link>
                <Link
                  href="https://github.com/AlexanderKochish"
                  className={s.socialLink}
                  target="_blank"
                  title="GitHub"
                >
                  <GithubIcon />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/oleksandr-kochish-68a48b266/"
                  className={s.socialLink}
                  target="_blank"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </Link>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
