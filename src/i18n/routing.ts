import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ua', 'ru'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      ua: '/pfadnamen',
      ru: '/pfadnamen',
    },
  },
});
