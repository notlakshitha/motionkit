"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

function makeParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    r: Math.random() * 1.35 + 0.45,
  }))
}

export function ParticleFieldHero({ preview = false }: { preview?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const context = canvas.getContext("2d")
    if (!context) return

    let frame = 0
    let alive = true
    const pointer = { x: -9999, y: -9999 }
    const count = preview ? 42 : 110
    let particles = makeParticles(count, 300, 200)
    let width = 1
    let height = 1

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, preview ? 1.25 : 1.75)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = makeParticles(count, width, height)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const linkDistance = preview ? 88 : 118

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        if (!a) continue

        if (!reduced) {
          a.x += a.vx
          a.y += a.vy
          if (a.x < 0 || a.x > width) a.vx *= -1
          if (a.y < 0 || a.y > height) a.vy *= -1
          const dx = a.x - pointer.x
          const dy = a.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 130 && distance > 0.01) {
            a.x += (dx / distance) * 0.4
            a.y += (dy / distance) * 0.4
          }
        }

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          if (!b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance < linkDistance) {
            context.strokeStyle = `rgba(214, 168, 96, ${(1 - distance / linkDistance) * 0.42})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }

        context.fillStyle = "rgba(244, 239, 230, 0.92)"
        context.beginPath()
        context.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        context.fill()
      }
    }

    const loop = () => {
      if (!alive) return
      draw()
      frame = requestAnimationFrame(loop)
    }

    resize()
    draw()
    if (!reduced) frame = requestAnimationFrame(loop)

    const onResize = () => {
      resize()
      if (reduced) draw()
    }
    const observer = new ResizeObserver(onResize)
    observer.observe(parent)

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    parent.addEventListener("pointermove", onMove)
    parent.addEventListener("pointerleave", onLeave)

    return () => {
      alive = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener("pointermove", onMove)
      parent.removeEventListener("pointerleave", onLeave)
    }
  }, [preview, reduced])

  return (
    <section
      aria-label="Particle field hero"
      className={
        preview
          ? "relative h-full overflow-hidden bg-[#07080c] text-[#f4efe6]"
          : "relative min-h-[100svh] overflow-hidden bg-[#07080c] text-[#f4efe6]"
      }
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(214,168,96,0.2),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(125,158,166,0.18),transparent_32%),#07080c]"
      >
        <span className="absolute left-[18%] top-[22%] size-1 rounded-full bg-[#f4efe6]/80" />
        <span className="absolute left-[46%] top-[38%] size-1.5 rounded-full bg-[#d6a860]/80" />
        <span className="absolute left-[70%] top-[26%] size-1 rounded-full bg-[#f4efe6]/70" />
        <span className="absolute left-[62%] top-[64%] size-1 rounded-full bg-[#f4efe6]/80" />
        <span className="absolute left-[30%] top-[72%] size-1.5 rounded-full bg-[#d6a860]/70" />
      </div>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,8,12,0.15)_48%,rgba(7,8,12,0.78)_100%)]"
      />
      <div
        className={
          preview
            ? "relative z-10 flex h-full flex-col justify-end p-5"
            : "relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-6 py-24"
        }
      >
        <p className="text-[10px] tracking-[0.34em] text-[#d6a860] uppercase">Atlas Field</p>
        <h2
          className={
            preview
              ? "mt-2 max-w-xs font-serif text-4xl leading-[0.92] text-[#f6f1e7]"
              : "mt-4 max-w-3xl font-serif text-6xl leading-[0.92] text-[#f6f1e7] md:text-8xl"
          }
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Quiet sky, loud signal.
        </h2>
        {preview ? null : (
          <>
            <p className="mt-6 max-w-md text-base leading-7 text-[#d9d2c6]">
              A hero made of distance. Points drift, find each other, and leave a single
              invitation in the dark.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-[#f4efe6] px-5 py-2.5 text-sm font-medium text-[#17140f]"
              >
                Enter the field
              </button>
              <button
                type="button"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-[#f4efe6]"
              >
                Read the notes
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
