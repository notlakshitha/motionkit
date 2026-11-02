"use client"

import dynamic from "next/dynamic"
import { Component, type ReactNode } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const OrbitObjectsCanvas = dynamic(
  () => import("./orbit-objects-canvas").then((mod) => mod.OrbitObjectsCanvas),
  { ssr: false },
)

class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function OrbitObjectsHero({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const showWebgl = !preview && !reduced

  return (
    <section
      aria-label="Orbiting objects hero"
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#0c0d11] text-[#f3efe8]"
          : "relative min-h-[100svh] overflow-hidden bg-[#0c0d11] text-[#f3efe8]"
      }
    >
      <style>{`
        @keyframes mk-orbit-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-orbit-shape { animation: none !important; }
        }
      `}</style>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,244,226,0.08),transparent_36%),#0c0d11]" />
      <div aria-hidden className="absolute inset-0">
        <div
          className="mk-orbit-shape absolute top-[18%] left-[16%] size-24 rounded-full border border-[#e7e1d6]/40 bg-[radial-gradient(circle_at_30%_30%,#f4efe6,#8d8680_62%,#2a2826)] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          style={{ animation: reduced ? undefined : "mk-orbit-spin 28s linear infinite" }}
        />
        <div
          className="mk-orbit-shape absolute top-[26%] right-[18%] size-20 rotate-12 bg-[linear-gradient(140deg,#f0c08a,#8a4e24_70%)] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          style={{ clipPath: "polygon(50% 0%, 100% 78%, 0% 78%)", animation: reduced ? undefined : "mk-orbit-spin 36s linear infinite reverse" }}
        />
        <div className="absolute bottom-[22%] left-[42%] size-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e7fffb,#5f9b96_60%,#163330)]" />
      </div>
      {showWebgl ? (
        <QuietBoundary>
          <div className="absolute inset-0">
            <OrbitObjectsCanvas />
          </div>
        </QuietBoundary>
      ) : null}
      <div
        className={
          preview
            ? "relative z-10 flex h-full flex-col justify-end bg-gradient-to-t from-[#0c0d11] via-transparent to-transparent p-5"
            : "relative z-10 flex min-h-[100svh] flex-col justify-end bg-gradient-to-t from-[#0c0d11] via-transparent to-transparent px-6 pt-24 pb-16 md:px-12"
        }
      >
        <p className="text-[10px] tracking-[0.32em] text-[#e0b27a] uppercase">Kepler Room</p>
        <h2
          className={preview ? "mt-2 max-w-xs font-serif text-4xl leading-[0.92]" : "mt-3 max-w-3xl font-serif text-6xl leading-[0.92] md:text-7xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Objects, holding still in motion.
        </h2>
        {preview ? null : (
          <p className="mt-5 max-w-md text-sm leading-6 text-[#d7d1c7]">
            A studio of three forms. Metal, copper, and a pale bead turn in their own time.
            If the scene cannot start, the still shapes remain.
          </p>
        )}
      </div>
    </section>
  )
}
