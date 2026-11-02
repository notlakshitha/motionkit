"use client"

import type { ReactNode } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

export function EmberMesh({
  preview = false,
  children,
}: {
  preview?: boolean
  children?: ReactNode
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      aria-label="Ember mesh background"
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#100c0a] text-[#f6efe6]"
          : "relative min-h-[100svh] overflow-hidden bg-[#100c0a] text-[#f6efe6]"
      }
    >
      <style>{`
        @keyframes mk-ember-a {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(8%, 6%, 0) scale(1.12); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes mk-ember-b {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-10%, 8%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes mk-ember-c {
          0% { transform: translate3d(0, 4%, 0); }
          50% { transform: translate3d(6%, -8%, 0); }
          100% { transform: translate3d(0, 4%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-ember { animation: none !important; }
        }
      `}</style>
      <div aria-hidden className="absolute inset-0 bg-[#100c0a]" />
      <div
        aria-hidden
        className="mk-ember absolute -top-16 -left-10 size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(232,120,48,0.55),transparent_68%)] blur-2xl"
        style={{ animation: reduced ? undefined : "mk-ember-a 16s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="mk-ember absolute top-1/3 right-[-4rem] size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.35),transparent_70%)] blur-3xl"
        style={{ animation: reduced ? undefined : "mk-ember-b 19s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="mk-ember absolute bottom-[-4rem] left-1/4 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(120,42,28,0.55),transparent_68%)] blur-3xl"
        style={{ animation: reduced ? undefined : "mk-ember-c 21s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className={preview ? "relative z-10 flex h-full items-end p-5" : "relative z-10 flex min-h-[100svh] items-end px-6 py-16 md:px-12"}>
        {children ?? (
          <div>
            <p className="text-[10px] tracking-[0.32em] text-[#f0b27a] uppercase">Ember Mesh</p>
            <h2
              className={preview ? "mt-2 max-w-[14rem] font-serif text-4xl leading-[0.92]" : "mt-3 max-w-xl font-serif text-6xl leading-[0.92] md:text-7xl"}
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              A pulse under the coal.
            </h2>
          </div>
        )}
      </div>
    </section>
  )
}
