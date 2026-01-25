import React from 'react';
import s from './skills.module.css';
import { useTranslations } from 'next-intl';

const Skills = () => {
  const t = useTranslations('skills');
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      items: [
        { name: 'React', level: '90%' },
        { name: 'Vue.js', level: '85%' },
        { name: 'TypeScript', level: '80%' },
        { name: 'JavaScript (ES6+)', level: '95%' },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      items: [
        { name: 'Node.js', level: '75%' },
        { name: 'Express', level: '70%' },
        { name: 'MongoDB', level: '65%' },
        { name: 'REST API', level: '85%' },
      ],
    },
    {
      title: 'Tools',
      icon: '🔧',
      items: [
        { name: t('tools.reactNative'), level: '90%' },
        { name: t('tools.nextjs'), level: '80%' },
        { name: t('tools.graphql'), level: '75%' },
        { name: t('tools.aws'), level: '60%' },
      ],
    },
  ];

  const otherTools = [
    { name: 'React Native', desc: t('tools.reactNative'), icon: '📱' },
    { name: 'Next.js', desc: t('tools.nextjs'), icon: '🎯' },
    { name: 'GraphQL', desc: t('tools.graphql'), icon: '💾' },
    { name: 'AWS', desc: t('tools.aws'), icon: '☁️' },
  ];

  return (
    <section className={s.skills} id="skills">
      <div className={s.skillsFloating}>
        <div className={s.floatingSkill}>⚛️</div>
        <div className={s.floatingSkill}>🎨</div>
        <div className={s.floatingSkill}>🚀</div>
        <div className={s.floatingSkill}>🔧</div>
      </div>

      <div className="container">
        <div className={s.skillsHeader}>
          <h2 data-i18n="skills.title">{t('title')}</h2>
          <p data-i18n="skills.subtitle">{t('subtitle')}</p>
        </div>

        <div className={s.skillsGrid}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className={s.skillCategory}>
              <div className={s.categoryHeader}>
                <div className={s.categoryIcon}>{cat.icon}</div>
                <h3 className={s.categoryTitle}>{cat.title}</h3>
              </div>

              {cat.items.map((skill, sIdx) => (
                <div key={sIdx} className={s.skillItem}>
                  <div className={s.skillInfo}>
                    <span className={s.skillName}>{skill.name}</span>
                    <span className={s.skillPercent}>{skill.level}</span>
                  </div>
                  <div className={s.skillBar}>
                    <div className={s.skillProgress} style={{ width: skill.level }}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={s.toolsSection}>
          <h3 className={s.otherTechTitle}>{t('otherTechnologies')}</h3>
          <div className={s.toolsGrid}>
            {otherTools.map((tool, idx) => (
              <div key={idx} className={s.toolItem}>
                <span className={s.toolIcon}>{tool.icon}</span>
                <div className={s.toolName}>{tool.name}</div>
                <div className={s.toolDesc}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
