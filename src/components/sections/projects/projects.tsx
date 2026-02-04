import React from 'react';
import s from './projects.module.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import shopPhoto from '../../../../public/shop.png';
import telegramBotPhoto from '../../../../public/xlT3oML8L0A-1024x768.jpg';

const Projects = () => {
  const t = useTranslations('projects');
  const projectList = [
    {
      image: shopPhoto,
      titleKey: 'projects.project.title1',
      title: 'E-Commerce Platform',
      descKey: 'projects.project.description1',
      desc: 'Full-featured e-commerce platform with modern UI, shopping cart, payment system and admin panel. Optimized for performance and UX.',
      tech: ['Next.js', 'Neon DB', 'PostgreSQL', 'Stripe', 'Material UI', 'Vercel', 'OAuth'],
      badge: 'Web App',
      icon: '🛒',
      liveDemo: 'https://qpick-c1l3.vercel.app/',
      github: 'https://github.com/AlexanderKochish/qpick',
    },
    {
      image: telegramBotPhoto,
      titleKey: 'projects.project.title2',
      title: 'AI Horoscope Bot',
      descKey: 'projects.project.description2',
      desc: 'Telegram bot that provides daily horoscopes using AI-generated content, with user preferences and notifications.',
      tech: ['JavaScript', 'Node.js', 'Railway', 'Telegram Bot API', 'OpenAI API', 'PostgreSQL'],
      badge: 'Bot',
      icon: '📊',
      liveDemo: 'https://t.me/bobynews_bot?start=parameter',
      github: 'https://github.com/AlexanderKochish/bot',
    },
    {
      titleKey: 'projects.project.title3',
      title: 'Task Manager App',
      descKey: 'projects.project.description3',
      desc: 'Mobile task management app with offline mode, notifications and cross-device synchronization.',
      tech: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
      badge: 'Mobile',
      icon: '📱',
    },
    {
      titleKey: 'projects.project.title4',
      title: 'REST API Service',
      descKey: 'projects.project.description4',
      desc: 'Scalable REST API with authentication, Swagger documentation, caching and performance monitoring.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Redis'],
      badge: 'API',
      icon: '🔗',
    },
  ];

  return (
    <section className={s.projects} id="projects">
      <div className={s.projectsFloating}>
        <div className={s.floatingProject}>🚀</div>
        <div className={s.floatingProject}>💻</div>
        <div className={s.floatingProject}>🎯</div>
      </div>

      <div className="container">
        <div className={s.projectsHeader}>
          <h2 data-i18n="projects.title">{t('title')}</h2>
          <p data-i18n="projects.subtitle">{t('subtitle')}</p>
        </div>

        <div className={s.featuredProject}>
          <div className={s.imageWrapper}>
            <div className={s.projectImage}>
              <div className={s.projectBadge}>Featured</div>

              {projectList[0].image ? (
                <Image
                  src={projectList[0].image}
                  alt={projectList[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  className={s.projectImg}
                />
              ) : (
                <div className={s.placeholderIconLarge}>🌟</div>
              )}
            </div>
          </div>

          {projectList[0] && (
            <div className={s.projectContent}>
              <span className={s.featuredBadge}>Main Project</span>
              <h3 className={s.projectTitle} data-i18n="projects.project.title1">
                {projectList[0].title}
                {/* E-Commerce Platform */}
              </h3>
              <p className={s.projectDescription} data-i18n="projects.project.description1">
                {projectList[0].desc}
              </p>
              <div className={s.projectTech}>
                {projectList[0].tech.map(t => (
                  <span key={t} className={s.techTag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={s.projectLinks}>
                <a
                  href={projectList[0].liveDemo}
                  target="_blank"
                  className={`${s.projectLink} ${s.demo}`}
                >
                  <span>🚀 Live Demo</span>
                </a>
                <a href={projectList[0].github} target="_blank" className={s.projectLink}>
                  <span>💻 GitHub</span>
                </a>
              </div>
            </div>
          )}
        </div>

        <div className={s.projectsGrid}>
          {projectList.slice(1).map((project, idx) => (
            <div key={idx} className={s.projectCard}>
              {project.image ? (
                <div className={s.projectImg}>
                  <div className={s.projectBadge}>{project.badge}</div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                    className={s.projectImg}
                  />
                </div>
              ) : (
                <div className={s.projectImg}>
                  <div className={s.projectBadge}>{project.badge}</div>
                  <div className={s.placeholderIconSmall}>{project.icon}</div>
                </div>
              )}
              <div className={s.projectContent}>
                <h3 className={s.projectTitle} data-i18n={project.titleKey}>
                  {project.title}
                </h3>
                <p className={s.projectDescription} data-i18n={project.descKey}>
                  {project.desc}
                </p>
                <div className={s.projectTech}>
                  {project.tech.map(t => (
                    <span key={t} className={s.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={s.projectLinks}>
                  <a href={project.liveDemo} className={`${s.projectLink} ${s.demo}`}>
                    Demo
                  </a>
                  <a href={project.github} className={s.projectLink}>
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={s.projectsNav}>
          <a href="#contact" className={s.navBtn}>
            {t('nav.discussProject')}
          </a>
          <a href="https://github.com/AlexanderKochish" className={s.navBtn}>
            {t('nav.moreOnGitHub')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

// Full-featured e-commerce platform with modern UI, shopping cart, payment system and
//                 admin panel. Optimized for performance and UX.
