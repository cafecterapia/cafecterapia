import Hero from '@/components/sections/Hero';
import PresentMe from '@/components/sections/PresentMe';
import Photos from '@/components/sections/Photos';
import ContactMe from '@/components/sections/ContactMe';
import { PalestrasPhoto } from '@/components/illustrations/Photos';

// Palestras page uses the sage palette instead of the global brown background
export default function PalestrasPage() {
  return (
    <div className="bg-sage-800 text-brown">
      {/* Hero without brown overlay */}
      <Hero title="Palestras" textColor="white" overlayOpacity={0} variant="palestras" />
      <PresentMe />
      {/* Photos carousel section (re-uses shared Photos component) */}
      <Photos />
      {/* Full-bleed placeholder image section (will be replaced / enhanced later) */}
      <section className="relative w-full h-[520px]">
        <PalestrasPhoto alt="Palestras placeholder" className="" />
        {/* Future content / overlay can be added here */}
      </section>
      <ContactMe />
    </div>
  );
}
