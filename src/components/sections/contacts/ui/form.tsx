'use client';
import React, { useEffect, useState } from 'react';
import { useActionState } from 'react';
import s from '../styles/contacts.module.css';
import { useTranslations } from 'next-intl';
import { actionFormSubmit } from '../action/form-action';
import Modal from '@/components/ui/modal/modal';

const ContactForm = () => {
  const t = useTranslations('contact');
  const [state, formAction, isPending] = useActionState(actionFormSubmit, {
    success: false,
    message: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <form action={formAction} className={s.contactForm} id="contactForm">
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
  );
};

export default ContactForm;
