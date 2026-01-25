import { routing } from '@/i18n/routing';
import { Locale } from 'next-intl';

export function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as 'en' | 'ua' | 'ru');
}

export async function loadMessages(locale: Locale) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    throw new Error(`Messages not found for locale: ${locale}`);
  }
}
