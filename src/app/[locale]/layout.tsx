import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { isValidLocale, loadMessages } from '@/lib/i18n-utils';
import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/providers/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: 'Page Not Found',
    };
  }

  const t = await getTranslations({
    locale,
    namespace: 'LocaleLayout',
  });

  const baseUrl = process.env.NEXT_VERCEL_PROJECT_PRODUCTION_URL || 'http://localhost:3000';

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('siteName', { defaultValue: 'Portfolio' })}`,
    },
    description: t('description', { defaultValue: '' }),

    metadataBase: new URL(baseUrl),

    openGraph: {
      title: t('title'),
      description: t('description', { defaultValue: '' }),
      url: `${baseUrl}/${locale}`,
      siteName: t('siteName', { defaultValue: 'Portfolio' }),
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description', { defaultValue: '' }),
    },

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(routing.locales.map(loc => [loc, `${baseUrl}/${loc}`])),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await loadMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Kiev">
          <ThemeProvider>
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
