'use client';
import React, { useEffect, useState } from 'react';
import { useActionState } from 'react';
import s from '../styles/contacts.module.css';
import { useTranslations } from 'next-intl';
import { actionFormSubmit } from '../action/form-action';
import Modal from '@/components/ui/modal/modal';
import Script from 'next/script';

const ContactForm = () => {
  const t = useTranslations('contact');
  const [state, dispatch, isPending] = useActionState(actionFormSubmit, {
    success: false,
    message: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: 'submit',
      });

      formData.append('g-recaptcha-response', token);
      dispatch(formData);
    });
  };

  useEffect(() => {
    let farme: number;
    if (state.message) {
      farme = requestAnimationFrame(() => setIsModalOpen(true));
    }
    return () => cancelAnimationFrame(farme);
  }, [state.message, state.success]);

  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <form onSubmit={handleSubmit} className={s.contactForm} id="contactForm">
        <div className={s.formGroup}>
          <label className={s.formLabel} htmlFor="name">
            {t('form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={s.formInput}
            placeholder={t('form.placeholders.name')}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label className={s.formLabel} htmlFor="email">
            {t('form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={s.formInput}
            placeholder={t('form.placeholders.email')}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label className={s.formLabel} htmlFor="subject">
            {t('form.subject')}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={s.formInput}
            placeholder={t('form.placeholders.subject')}
          />
        </div>

        <div className={s.formGroup}>
          <label className={s.formLabel} htmlFor="message">
            {t('form.message')}
          </label>
          <textarea
            id="message"
            name="message"
            className={s.formTextarea}
            rows={6}
            placeholder={t('form.placeholders.message')}
            required
          ></textarea>
        </div>

        <button type="submit" className={s.formSubmit} disabled={isPending}>
          {isPending ? t('form.sending') : t('form.sendMessage')}
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} message={state.message || ''} />

        <div className={s.formStatus} id="formStatus"></div>
      </form>
    </>
  );
};

export default ContactForm;
