"use client"

import type { PointerEvent } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const chapters = [
  { index: "01", title: "Arrival", copy: "The room is already dim when you step in." },
  { index: "02", title: "The long cut", copy: "One take, held until the grain starts to speak." },
  { index: "03", title: "Color quiet", copy: "Sodium, ink, and a pale window left open." },
  { index: "04", title: "Credits", copy: "Names arrive like lights along a platform." },
]

export function SpotlightFollow({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const drift = preview && !reduced

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (preview || reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty("--sx", `${x}%`)
    event.currentTarget.style.setProperty("--sy", `${y}%`)
  }

  return (
    <section
      aria-label="Spotlight chapters"
      onPointerMove={onPointerMove}
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#090909] px-4 py-4 text-[#f6f1e8]"
          : "relative overflow-hidden bg-[#090909] px-6 py-20 text-[#f6f1e8]"
      }
      style={{ ["--sx" as string]: "30%", ["--sy" as string]: "40%" }}
    >
      <style>{`
        @property --sx {
          syntax: "<percentage>";
          inherits: true;
          initial-value: 30%;
        }
        @property --sy {
          syntax: "<percentage>";
          inherits: true;
          initial-value: 40%;
        }
        @keyframes mk-spot {
          0% { --sx: 18%; --sy: 35%; }
          50% { --sx: 78%; --sy: 62%; }
          100% { --sx: 18%; --sy: 35%; }
        }
        .mk-spot-drift { animation: mk-spot 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mk-spot-drift { animation: none !important; }
        }
      `}</style>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${drift ? "mk-spot-drift" : ""}`}
        style={{
          background:
            "radial-gradient(380px circle at var(--sx) var(--sy), rgba(244, 228, 196, 0.22), transparent 62%)",
        }}
      />
      <div className={preview ? "relative" : "relative mx-auto max-w-5xl"}>
        <p className="text-[10px] tracking-[0.32em] text-[#e0b27a] uppercase">Chapters</p>
        <h2
          className={preview ? "mt-1 font-serif text-3xl" : "mt-3 font-serif text-5xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Where the light lands.
        </h2>
        <div className={preview ? "mt-4 grid grid-cols-2 gap-2" : "mt-10 grid gap-3 md:grid-cols-4"}>
          {chapters.map((chapter) => (
            <article key={chapter.index} className="rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur-sm md:p-4">
              <p className="text-[10px] tracking-[0.22em] text-[#e0b27a]">{chapter.index}</p>
              <h3 className={preview ? "mt-2 text-sm" : "mt-4 font-serif text-2xl"} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                {chapter.title}
              </h3>
              {preview ? null : <p className="mt-3 text-sm leading-6 text-[#d4cdc2]">{chapter.copy}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
