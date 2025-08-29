'use client';

export default function Video() {
  return (
    <section className="py-36 bg-sage-900 text-on-sage-dark">
      <div className="mx-auto max-w-5xl px-6">
        {/* Establish a container query context */}
        <div className="relative mt-6 w-full tv-container">
          <div className="tv-aspect relative aspect-video overflow-hidden">
            {/* Underlying video / player placeholder */}
            <div className="flex h-full w-full items-center justify-center rounded-[1.25rem] bg-black/20">
              <span className="text-sm text-on-sage-dark opacity-80">Placeholder de vídeo</span>
            </div>

            {/* Future svg */}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Container query setup */
        .tv-container {
          container-type: inline-size;
          container-name: tv;
        }

        /* Base (large) layout: amplify frame and nudge for composition */
        /* Decorative SVG frame removed: no additional styles needed */
      `}</style>
    </section>
  );
}
