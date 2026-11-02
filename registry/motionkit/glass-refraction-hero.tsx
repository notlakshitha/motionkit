"use client"

import { useId } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

export function GlassRefractionHero({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const filterId = `mk-refract-${useId().replace(/:/g, "")}`

  return (
    <section
      aria-label="Glass refraction hero"
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#0c0b10] text-[#f7f2ea]"
          : "relative min-h-[100svh] overflow-hidden bg-[#0c0b10] text-[#f7f2ea]"
      }
    >
      <style>{`
        @keyframes mk-glass-drift-a {
          0% { transform: translate3d(-8%, -6%, 0) scale(1); }
          50% { transform: translate3d(10%, 8%, 0) scale(1.08); }
          100% { transform: translate3d(-8%, -6%, 0) scale(1); }
        }
        @keyframes mk-glass-drift-b {
          0% { transform: translate3d(6%, 10%, 0) scale(1.05); }
          50% { transform: translate3d(-12%, -4%, 0) scale(1); }
          100% { transform: translate3d(6%, 10%, 0) scale(1.05); }
        }
        @keyframes mk-glass-sheen {
          0% { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(220%) skewX(-18deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-glass-a, .mk-glass-b, .mk-glass-sheen { animation: none !important; }
        }
      `}</style>
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={reduced ? "0" : "14"} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div
        aria-hidden
        className="mk-glass-a absolute -left-16 top-0 size-[28rem] rounded-full bg-[#e7b267]/30 blur-3xl"
        style={{ animation: reduced ? undefined : "mk-glass-drift-a 18s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="mk-glass-b absolute right-0 bottom-0 size-[26rem] rounded-full bg-[#6f8f98]/25 blur-3xl"
        style={{ animation: reduced ? undefined : "mk-glass-drift-b 22s ease-in-out infinite" }}
      />
      <p
        aria-hidden
        className={
          preview
            ? "pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-serif text-6xl tracking-tight text-white/15"
            : "pointer-events-none absolute top-[18%] left-1/2 -translate-x-1/2 font-serif text-[12rem] leading-none tracking-tight text-white/10"
        }
        style={{ fontFamily: "var(--font-serif), Georgia, serif", filter: `url(#${filterId})` }}
      >
        Halcyon
      </p>
      <div
        className={
          preview
            ? "relative z-10 flex h-full items-end p-4"
            : "relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-24"
        }
      >
        <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/25 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
          <div
            aria-hidden
            className="mk-glass-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            style={{ animation: reduced ? undefined : "mk-glass-sheen 5.5s ease-in-out infinite" }}
          />
          <p className="text-[10px] tracking-[0.32em] text-[#f0d7a4] uppercase">Lumen Atelier</p>
          <h2
            className={
              preview
                ? "mt-2 font-serif text-3xl leading-[0.95] text-[#fbf7f1]"
                : "mt-4 font-serif text-5xl leading-[0.95] text-[#fbf7f1] md:text-6xl"
            }
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Glass that keeps a little of the light.
          </h2>
          {preview ? null : (
            <>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#efe7da]">
                A refraction hero for a quiet instrument house. The panel blurs the room,
                a sheen crosses the surface, and the word behind the glass never quite sits still.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" className="rounded-full bg-[#f7f2ea] px-5 py-2.5 text-sm font-medium text-[#1c160f]">
                  View the glass
                </button>
                <button type="button" className="rounded-full border border-white/25 px-5 py-2.5 text-sm text-[#f7f2ea]">
                  Book a sitting
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
