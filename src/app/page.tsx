import Hero from '@/components/sections/Hero';
import PresentMe from '@/components/sections/PresentMe';
import Photos from '@/components/sections/Photos';
import Video from '@/components/sections/Video';
import ContactMe from '@/components/sections/ContactMe';

export default function Home() {
  return (
    <>
      <Hero title="Lenny Santos" />
      <PresentMe />
      <Photos />
      <Video />
      <ContactMe />
    </>
  );
}
