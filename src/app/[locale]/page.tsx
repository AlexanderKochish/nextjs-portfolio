import Hero from '@/components/sections/hero/hero';
import About from '@/components/sections/about/about';
import Skills from '@/components/sections/skills/skills';
import Projects from '@/components/sections/projects/projects';
import Contacts from '@/components/sections/contacts/ui/contacts';
import Header from '@/components/widgets/header/ui/header';
import Footer from '@/components/widgets/footer/footer';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contacts />
      <Footer />
    </>
  );
}
