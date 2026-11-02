"use client"

import { usePrefersReducedMotion } from "./use-reduced-motion"

export function BeamCta({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      aria-label="Closing call"
      className={
        preview
          ? "relative flex h-full items-end overflow-hidden bg-[#080808] p-5 text-[#f7f2ea]"
          : "relative overflow-hidden bg-[#080808] px-6 py-24 text-[#f7f2ea]"
      }
    >
      <style>{`
        @keyframes mk-dash {
          to { stroke-dashoffset: -220; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-beam { animation: none !important; }
        }
      `}</style>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 480" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="420" x2="520" y2="40" stroke="rgba(230,177,90,0.75)" strokeWidth="1.25" className="mk-beam" strokeDasharray="10 16" style={{ animation: reduced ? undefined : "mk-dash 3.2s linear infinite" }} />
        <line x1="180" y1="480" x2="860" y2="0" stroke="rgba(244,239,230,0.35)" strokeWidth="1" className="mk-beam" strokeDasharray="6 18" style={{ animation: reduced ? undefined : "mk-dash 4.4s linear infinite" }} />
        <line x1="640" y1="480" x2="1200" y2="80" stroke="rgba(126,184,178,0.55)" strokeWidth="1.25" className="mk-beam" strokeDasharray="12 14" style={{ animation: reduced ? undefined : "mk-dash 3.8s linear infinite" }} />
      </svg>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,177,90,0.16),transparent_55%)]" />
      <div className={preview ? "relative max-w-md" : "relative mx-auto max-w-3xl text-center"}>
        <p className="text-[10px] tracking-[0.32em] text-[#e6b15a] uppercase">Last light</p>
        <h2
          className={preview ? "mt-2 font-serif text-4xl leading-[0.95]" : "mt-4 font-serif text-6xl leading-[0.95] md:text-7xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Leave a light on for the next reel.
        </h2>
        {preview ? null : (
          <>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#ddd6cb]">
              A closing band of traveling lines. The beams are decoration. The invitation is the only thing that needs a click.
            </p>
            <button type="button" className="mt-8 rounded-full bg-[#f7f2ea] px-6 py-3 text-sm font-medium text-[#1a140e]">
              Start a screening
            </button>
          </>
        )}
      </div>
    </section>
  )
}
