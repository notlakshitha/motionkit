"use client"

import { motion } from "motion/react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const stations = ["Harbor", "Saltworks", "Low Bridge", "Kiln", "Glass City"]

const chapters = [
  {
    index: "I",
    title: "Boarding",
    copy: "The platform is lit like a darkroom. You step on without a queue, and the door closes on a soft latch.",
  },
  {
    index: "II",
    title: "The coast",
    copy: "Windows turn the water into a strip of sodium and black. Nobody narrates it. The glass does the work.",
  },
  {
    index: "III",
    title: "Arrival",
    copy: "Glass City comes in as a low chord, not an announcement. The lights outside match the ones inside.",
  },
]

export function LaunchReel({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={preview ? "h-full overflow-hidden bg-[#0b0c10] text-[#f6f1e8]" : "bg-[#0b0c10] text-[#f6f1e8]"}>
      <style>{`
        @keyframes mk-scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(120vh); }
        }
        @keyframes mk-reel {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-scan, .mk-reel { animation: none !important; }
        }
      `}</style>
      <section
        className={
          preview
            ? "relative flex h-full flex-col justify-between overflow-hidden p-5"
            : "relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 py-14 md:px-12"
        }
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,177,90,0.16),transparent_42%),#0b0c10]" />
        {reduced ? null : (
          <div
            aria-hidden
            className="mk-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{ animation: "mk-scan 7s linear infinite" }}
          />
        )}
        <div className="relative flex items-center justify-between text-[10px] tracking-[0.28em] uppercase">
          <span>Vesper Line</span>
          <span>23:41</span>
        </div>
        <div className="relative">
          <p className="text-[10px] tracking-[0.32em] text-[#e6b15a] uppercase">Night service</p>
          <h2
            className={preview ? "mt-2 font-serif text-5xl leading-[0.86]" : "mt-4 font-serif text-7xl leading-[0.84] md:text-9xl"}
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Vesper
            <span className="block italic">Line</span>
          </h2>
        </div>
        <p className="relative text-sm tracking-[0.18em] uppercase">Harbor → Glass City</p>
      </section>
      {preview ? null : (
        <>
          <div className="overflow-hidden border-y border-white/10">
            <div
              className="flex w-max"
              style={{ animation: reduced ? undefined : "mk-reel 28s linear infinite" }}
            >
              {[...stations, ...stations, ...stations, ...stations].map((station, index) => (
                <span key={`${station}-${index}`} className="px-8 py-4 text-xs tracking-[0.22em] uppercase">
                  {station}
                </span>
              ))}
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-3">
            {chapters.map((chapter, index) => (
              <motion.article
                key={chapter.index}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.08 }}
              >
                <p className="text-[#e6b15a]">{chapter.index}</p>
                <h3 className="mt-3 font-serif text-3xl" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  {chapter.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#d5cec3]">{chapter.copy}</p>
              </motion.article>
            ))}
          </div>
          <section className="border-t border-white/10 px-6 py-20 text-center">
            <h3 className="font-serif text-5xl" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
              The last carriage is still open.
            </h3>
            <button type="button" className="mt-8 rounded-full bg-[#f6f1e8] px-6 py-3 text-sm font-medium text-[#1a140e]">
              Reserve a window
            </button>
          </section>
        </>
      )}
    </div>
  )
}
