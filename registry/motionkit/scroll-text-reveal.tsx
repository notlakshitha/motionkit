"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const LINE =
  "We cut the night into frames, then give each frame a place to breathe, a color to keep, and a name you can find in the dark."

export function ScrollTextReveal({ preview = false }: { preview?: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const words = LINE.split(" ")

  useEffect(() => {
    if (preview || reduced) return
    const root = rootRef.current
    if (!root) return

    let cancelled = false
    let revert = () => {}

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled || !rootRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const targets = root.querySelectorAll("[data-word]")
        const context = gsap.context(() => {
          gsap.set(targets, { opacity: 0.16 })
          gsap.to(targets, {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 55%",
              scrub: true,
            },
          })
        }, root)
        revert = () => context.revert()
        if (cancelled) revert()
      },
    )

    return () => {
      cancelled = true
      revert()
    }
  }, [preview, reduced])

  return (
    <section
      ref={rootRef}
      aria-label="Scroll text reveal"
      className={
        preview
          ? "flex h-full items-center bg-[#090909] px-5 text-[#f4efe6]"
          : "flex min-h-[150vh] items-center bg-[#090909] px-6 py-28 text-[#f4efe6]"
      }
    >
      <style>{`
        @keyframes mk-word {
          0%, 15% { opacity: 0.18; }
          40%, 70% { opacity: 1; }
          100% { opacity: 0.18; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-word { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div className="mx-auto max-w-4xl">
        <p className="text-[10px] tracking-[0.32em] text-[#d6a860] uppercase">Manifest</p>
        <p
          className={
            preview
              ? "mt-3 font-serif text-2xl leading-snug"
              : "mt-6 font-serif text-4xl leading-tight md:text-6xl"
          }
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              data-word
              className="mk-word mr-[0.28em] inline-block"
              style={
                preview && !reduced
                  ? { animation: `mk-word 4.8s ease-in-out ${index * 0.08}s infinite` }
                  : undefined
              }
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
