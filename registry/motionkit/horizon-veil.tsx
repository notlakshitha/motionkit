"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

export function HorizonVeil({
  preview = false,
  children,
}: {
  preview?: boolean
  children?: ReactNode
}) {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (preview || reduced) return
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    let dead = false
    let cleanup = () => {}
    let started = false

    const start = () => {
      if (started || dead) return
      started = true
      void import("./horizon-veil-gl")
        .then((mod) => {
          if (dead) return
          cleanup = mod.mountHorizonVeil(canvas)
        })
        .catch(() => {
          canvas.style.display = "none"
        })
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        observer.disconnect()
        start()
      }
    })
    observer.observe(parent)

    return () => {
      dead = true
      cleanup()
      observer.disconnect()
    }
  }, [preview, reduced])

  return (
    <section
      aria-label="Horizon veil background"
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#07090e] text-[#f6f1e8]"
          : "relative min-h-[100svh] overflow-hidden bg-[#07090e] text-[#f6f1e8]"
      }
    >
      <style>{`
        @keyframes mk-horizon-rise {
          0% { transform: translate3d(0, 8px, 0) scale(1); opacity: 0.7; }
          50% { transform: translate3d(0, -10px, 0) scale(1.04); opacity: 1; }
          100% { transform: translate3d(0, 8px, 0) scale(1); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-horizon-band { animation: none !important; }
        }
      `}</style>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(#07090e,#121018_58%,#07090e)]" />
      <div
        aria-hidden
        className="mk-horizon-band absolute inset-x-[-10%] bottom-[18%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(242,196,130,0.85),rgba(176,78,32,0.35)_42%,transparent_70%)] blur-2xl"
        style={{ animation: reduced ? undefined : "mk-horizon-rise 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-[#f3d7a8] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 42px, rgba(120,190,184,0.08) 42px 43px)",
          maskImage: "linear-gradient(to top, transparent 20%, black 48%, transparent 90%)",
        }}
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className={preview ? "relative z-10 flex h-full flex-col justify-end p-5" : "relative z-10 flex min-h-[100svh] flex-col justify-end px-6 py-16 md:px-12"}>
        {children ?? (
          <div>
            <p className="text-[10px] tracking-[0.32em] text-[#f0c48a] uppercase">Horizon Veil</p>
            <h2
              className={preview ? "mt-2 max-w-xs font-serif text-4xl leading-[0.92]" : "mt-3 max-w-2xl font-serif text-6xl leading-[0.92] md:text-7xl"}
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Night, and a line of heat.
            </h2>
          </div>
        )}
      </div>
    </section>
  )
}
