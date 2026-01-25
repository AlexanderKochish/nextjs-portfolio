import React from 'react';
import s from './hero.module.css';
import hero from '../../../../public/hero-img.jpg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');
  const techStack = ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js'];

  return (
    <section className={s.hero}>
      <div className={s.floatingShapes}>
        <div className={s.shape}></div>
        <div className={s.shape}></div>
        <div className={s.shape}></div>
      </div>

      <div className="container">
        <div className={s.heroContent}>
          <div className={s.heroText}>
            <p className={s.greeting}>{t('greeting')}</p>
            <h1>
              <span className={s.gradientText}>{t('name')}</span>
            </h1>
            <p className={s.title}>{t('title')}</p>
            <p className={s.subtitle}>{t('subtitle')}</p>

            <div className={s.ctaButtons}>
              <a href="#projects" className={`${s.btn} ${s.btnPrimary}`}>
                {t('viewProjects')}
              </a>
              <a href="#contact" className={`${s.btn} ${s.btnSecondary}`}>
                {t('contactMe')}
              </a>
            </div>

            <div className={s.techStack}>
              {techStack.map(tech => (
                <span key={tech} className={s.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={s.heroPhoto}>
            <div className={s.photoContainer}>
              <Image src={hero} alt="Oleksandr - Frontend Developer" className={s.profilePhoto} />

              <div className={s.photoGlow}></div>
              <div className={s.photoDecoration}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.floatingTech}>
        <div className={s.techIcon}>⚛️</div>
        <div className={s.techIcon}>🎨</div>
        <div className={s.techIcon}>🚀</div>
        <div className={s.techIcon}>💻</div>
      </div>
    </section>
  );
};

export default Hero;
