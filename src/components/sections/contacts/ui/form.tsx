'use client';
import React, { startTransition, useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import s from '../styles/contacts.module.css';
import { useTranslations } from 'next-intl';
import { actionFormSubmit } from '../action/form-action';
import Modal from '@/components/ui/modal/modal';
import Script from 'next/script';

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientMessage, setClientMessage] = useState<string | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const t = useTranslations('contact');
  const [state, dispatch, isPending] = useActionState(actionFormSubmit, {
    success: false,
    message: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCaptchaLoading(true);
    setClientMessage(null);
    const formData = new FormData(event.currentTarget);

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: 'submit',
        });

        formData.append('g-recaptcha-response', token);
        startTransition(() => {
          dispatch(formData);
          setIsCaptchaLoading(false);
        });
      } catch {
        setIsCaptchaLoading(false);
        setClientMessage(t('errors.captcha_failed'));
        setIsModalOpen(true);
      }
    });
  };

  useEffect(() => {
    if (!state.message) return;

    if (state.success || clientMessage) {
      formRef.current?.reset();
    }

    const farme = requestAnimationFrame(() => setIsModalOpen(true));

    return () => cancelAnimationFrame(farme);
  }, [state.message, state.success, clientMessage]);

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

  const isLoading = isPending || isCaptchaLoading;

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <form ref={formRef} onSubmit={handleSubmit} className={s.contactForm} id="contactForm">
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

        <button type="submit" className={s.formSubmit} disabled={isLoading}>
          {isLoading ? t('form.sending') : t('form.sendMessage')}
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={clientMessage || state.message || ''}
        />

        <div className={s.formStatus} id="formStatus"></div>
      </form>
    </>
  );
};

export default ContactForm;
