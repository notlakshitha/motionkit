"use client"

import { motion } from "motion/react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const cells = [
  {
    title: "Index every frame",
    copy: "Stills land in the archive the moment the shutter closes.",
    className: "md:col-span-2 md:row-span-2",
    kind: "chart" as const,
  },
  {
    title: "Color notes",
    copy: "Three swatches ride with each reel.",
    className: "",
    kind: "swatch" as const,
  },
  {
    title: "48k stills",
    copy: "Counted without a loading theater.",
    className: "",
    kind: "stat" as const,
  },
  {
    title: "Quiet search",
    copy: "Ask for sodium, coast, or the last carriage.",
    className: "",
    kind: "search" as const,
  },
  {
    title: "Shared reels",
    copy: "Pass a cut without leaving the room.",
    className: "",
    kind: "people" as const,
  },
]

export function BentoSignal({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      aria-label="Bento feature grid"
      className={preview ? "h-full overflow-hidden bg-[#0d0d0f] p-3 text-[#f5f0e8]" : "bg-[#0d0d0f] px-6 py-20 text-[#f5f0e8]"}
    >
      <style>{`
        @keyframes mk-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-draw { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
      <div className={preview ? "mx-auto flex h-full max-w-5xl flex-col" : "mx-auto max-w-5xl"}>
        <p className="text-[10px] tracking-[0.32em] text-[#e0b27a] uppercase">Reelhouse</p>
        <h2
          className={preview ? "mt-1 font-serif text-2xl" : "mt-3 font-serif text-5xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          The desk that keeps the frames.
        </h2>
        <div className={preview ? "mt-3 grid flex-1 grid-cols-2 gap-2" : "mt-10 grid gap-3 md:grid-cols-4"}>
          {cells.map((cell, index) => (
            <motion.article
              key={cell.title}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:p-5 ${preview && index > 3 ? "hidden" : ""} ${preview ? "" : cell.className}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.05 }}
            >
              <h3 className={preview ? "text-sm font-medium" : "text-lg font-medium"}>{cell.title}</h3>
              {preview ? null : <p className="mt-2 text-sm leading-6 text-[#c9c2b6]">{cell.copy}</p>}
              {cell.kind === "chart" ? <Chart preview={preview} reduced={reduced} /> : null}
              {cell.kind === "swatch" && !preview ? (
                <div className="mt-5 flex gap-2">
                  <span className="h-8 flex-1 rounded-md bg-[#e7b267]" />
                  <span className="h-8 flex-1 rounded-md bg-[#7e9ea6]" />
                  <span className="h-8 flex-1 rounded-md bg-[#f4efe6]" />
                </div>
              ) : null}
              {cell.kind === "stat" && !preview ? (
                <p className="mt-6 font-serif text-5xl text-[#f4efe6]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  48k
                </p>
              ) : null}
              {cell.kind === "search" && !preview ? (
                <div className="mt-5 flex items-center rounded-full border border-white/15 px-3 py-2 text-sm text-[#c9c2b6]">
                  sodium coast
                  <span className="ml-1 inline-block h-4 w-px bg-[#e7b267]" />
                </div>
              ) : null}
              {cell.kind === "people" && !preview ? (
                <div className="mt-5 flex -space-x-2">
                  {["A", "M", "S", "J"].map((letter) => (
                    <span
                      key={letter}
                      className="grid size-8 place-items-center rounded-full border border-[#0d0d0f] bg-[#2a2723] text-xs"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chart({ preview, reduced }: { preview: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 240 80" className={preview ? "mt-2 h-10 w-full" : "mt-6 h-20 w-full"} aria-hidden>
      <path
        d="M4 62 C 30 60, 40 30, 68 34 S 110 70, 140 40 S 190 12, 236 22"
        fill="none"
        stroke="#e7b267"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="mk-draw"
        style={{
          strokeDasharray: 320,
          strokeDashoffset: reduced ? 0 : 320,
          animation: reduced ? undefined : "mk-draw 2.4s ease forwards",
        }}
      />
    </svg>
  )
}
