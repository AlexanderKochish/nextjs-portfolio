'use server';

import { Resend } from 'resend';
import { contactFormSchema } from '../lib/zod/contact-form.schema';
import { ContactEmail } from '../ui/contact-letter/contact-letter';
import { getTranslations } from 'next-intl/server';

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  inputs?: Record<string, string | FormDataEntryValue>;
  pending?: boolean;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function actionFormSubmit(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const t = await getTranslations('modal');
  const c = await getTranslations('contact');
  const token = formData.get('g-recaptcha-response');
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = contactFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const fieldErrors: Record<string, string[]> = {};

    validatedFields.error.issues.forEach(issue => {
      const path = issue.path[0] as string;
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(issue.message);
    });

    return {
      pending: false,
      success: false,
      errors: fieldErrors,
      inputs: rawData,
      message: t('validationError'),
    };
  }

  try {
    if (!token) {
      return { success: false, message: c('errors.captcha_failed') };
    }
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' }
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return { success: false, message: c('errors.captcha_failed') };
    }
    const { name, email, subject, message } = validatedFields.data;
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL as string,
      subject: `Portfolio: ${subject}`,
      react: <ContactEmail name={name} email={email} subject={subject} message={message} />,
      replyTo: email,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      pending: false,
      success: true,
      errors: {},
      message: t('success'),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Server Action Error:', errorMessage);
    return {
      pending: false,
      success: false,
      errors: { _form: ['Internal Server Error. Please try again later.'] },
      message: t('serverError'),
    };
  }
}
