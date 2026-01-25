import React from 'react';
import s from './about.module.css';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('about');
  const stats = [
    { number: '2+', labelKey: 'stats.years', label: 'Years Experience' },
    { number: '50+', labelKey: 'stats.projects', label: 'Projects Completed' },
    { number: '100%', labelKey: 'stats.clients', label: 'Client Satisfaction' },
    { number: '15+', labelKey: 'stats.technologies', label: 'Technologies' },
  ];

  return (
    <section className={s.about} id="about">
      <div className={s.floatingElement}></div>
      <div className={s.floatingElement}></div>

      <div className="container">
        <div className={s.aboutContent}>
          <div className={s.aboutText}>
            <h2>{t('title')}</h2>

            <p>
              {t.rich('description1', {
                highlight: chunks => <span className={s.highlighted}>{chunks}</span>,
              })}
            </p>

            <p>
              {t.rich('description2', {
                highlight: chunks => <span className={s.highlighted}>{chunks}</span>,
              })}
            </p>
            <p>
              {t.rich('description3', {
                highlight: chunks => <span className={s.highlighted}>{chunks}</span>,
              })}
            </p>
            <div className={s.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={s.statItem}>
                  <div className={s.statNumber}>{stat.number}</div>
                  <div className={s.statLabel}>{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={s.skillsVisual}>
            <div className={s.codeWindow}>
              <div className={s.windowHeader}>
                <div className={s.windowDot}></div>
                <div className={s.windowDot}></div>
                <div className={s.windowDot}></div>
              </div>
              <div className={s.codeContent}>
                <div className={s.codeLine}>
                  <span className={s.codeKeyword}>const</span>
                  <span className={s.codeFunction}> developer</span> = {'{'}
                </div>
                <div className={s.codeLine}>
                  &nbsp;&nbsp;name:{' '}
                  <span className={s.codeString}>&quot;Oleksandr Kochish&quot;</span>,
                </div>
                <div className={s.codeLine}>
                  &nbsp;&nbsp;role:{' '}
                  <span className={s.codeString}>&quot;Frontend Developer&quot;</span>,
                </div>
                <div className={s.codeLine}>
                  &nbsp;&nbsp;skills: [<span className={s.codeString}>&quot;React&quot;</span>,
                  <span className={s.codeString}>&quot;Vue&quot;</span>,
                  <span className={s.codeString}>&quot;TypeScript&quot;</span>],
                </div>
                <div className={s.codeLine}>
                  &nbsp;&nbsp;passion:{' '}
                  <span className={s.codeString}>&quot;Creating awesome stuff&quot;</span>
                </div>
                <div className={s.codeLine}>{'}'};</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
