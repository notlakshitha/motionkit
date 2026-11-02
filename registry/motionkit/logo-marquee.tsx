"use client"

import { usePrefersReducedMotion } from "./use-reduced-motion"

const studios = [
  { name: "Northline", mark: "N" },
  { name: "Kelp & Co", mark: "K" },
  { name: "Vellum", mark: "V" },
  { name: "Arcadia Lab", mark: "A" },
  { name: "Sable", mark: "S" },
  { name: "Juniper", mark: "J" },
  { name: "Halden", mark: "H" },
  { name: "Mira Form", mark: "M" },
]

export function LogoMarquee({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const row = reduced ? studios : [...studios, ...studios]

  return (
    <section
      aria-label="Studio marquee"
      className={preview ? "flex h-full flex-col justify-center overflow-hidden bg-[#090909] text-[#f4efe6]" : "overflow-hidden bg-[#090909] py-16 text-[#f4efe6]"}
    >
      <style>{`
        @keyframes mk-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .mk-marquee-track { animation: mk-marquee 32s linear infinite; }
        .mk-marquee:hover .mk-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .mk-marquee-track { animation: none !important; transform: none !important; }
        }
      `}</style>
      <div className={preview ? "px-5" : "mx-auto max-w-5xl px-6"}>
        <p className="text-[10px] tracking-[0.32em] text-[#d6a860] uppercase">On the reel</p>
        <h2
          className={preview ? "mt-1 font-serif text-3xl" : "mt-3 font-serif text-5xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Studios that keep the lights low.
        </h2>
      </div>
      <div className="mk-marquee mt-6 overflow-hidden border-y border-white/10">
        <div className={`flex w-max ${reduced ? "flex-wrap gap-3 px-6 py-4" : "mk-marquee-track"}`}>
          {row.map((studio, index) => (
            <div key={`${studio.name}-${index}`} className="flex items-center gap-3 px-6 py-4">
              <span className="grid size-9 place-items-center rounded-full border border-[#d6a860]/50 text-xs tracking-widest text-[#f0d7a8]">
                {studio.mark}
              </span>
              <span className="text-sm tracking-[0.16em] uppercase">{studio.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
