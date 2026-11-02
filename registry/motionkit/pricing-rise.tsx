"use client"

import { animate, motion, useInView } from "motion/react"
import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "./use-reduced-motion"

const plans = [
  {
    name: "Aisle",
    price: 0,
    note: "A single screening.",
    points: ["One seat", "Evening program", "Printed notes"],
    featured: false,
  },
  {
    name: "Balcony",
    price: 18,
    note: "The seat we keep lit.",
    points: ["Reserved row", "Color stills", "Quiet bar"],
    featured: true,
  },
  {
    name: "Gallery",
    price: 42,
    note: "A room of your own.",
    points: ["Private hour", "Projectionist", "After-notes"],
    featured: false,
  },
]

export function PricingRise({ preview = false }: { preview?: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      aria-label="Pricing"
      className={preview ? "h-full overflow-hidden bg-[#0c0b0a] px-3 py-3 text-[#f6f1e8]" : "bg-[#0c0b0a] px-6 py-20 text-[#f6f1e8]"}
    >
      <style>{`
        @keyframes mk-rim {
          to { transform: rotate(1turn); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-rim { animation: none !important; }
        }
      `}</style>
      <div className={preview ? "" : "mx-auto max-w-5xl"}>
        <p className="text-[10px] tracking-[0.32em] text-[#e0b27a] uppercase">Seats</p>
        <h2
          className={preview ? "mt-1 font-serif text-3xl" : "mt-3 font-serif text-5xl"}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Choose how close you sit.
        </h2>
        <div className={preview ? "mt-3 grid grid-cols-3 gap-2" : "mt-10 grid gap-4 md:grid-cols-3"}>
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.08 }}
              className={plan.featured ? "relative overflow-hidden rounded-3xl p-px" : "rounded-3xl border border-white/10 bg-white/[0.03]"}
            >
              {plan.featured ? (
                <div
                  aria-hidden
                  className="mk-rim absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_65%,#e6b15a_78%,transparent_90%)]"
                  style={{ animation: reduced ? undefined : "mk-rim 7s linear infinite" }}
                />
              ) : null}
              <div className={plan.featured ? "relative h-full rounded-[22px] bg-[#16130f] p-3 md:p-6" : "p-3 md:p-6"}>
                <h3 className={preview ? "text-sm" : "font-serif text-2xl"} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  {plan.name}
                </h3>
                <p className={preview ? "mt-2 font-serif text-2xl" : "mt-4 font-serif text-5xl"} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  <Price value={plan.price} run={!preview && !reduced} />
                </p>
                {preview ? null : (
                  <>
                    <p className="mt-2 text-sm text-[#d2cbbf]">{plan.note}</p>
                    <ul className="mt-5 space-y-2 text-sm text-[#f6f1e8]">
                      {plan.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span aria-hidden className="text-[#e0b27a]">
                            —
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="mt-6 w-full rounded-full bg-[#f6f1e8] px-4 py-2.5 text-sm font-medium text-[#1a140e]">
                      Take {plan.name}
                    </button>
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Price({ value, run }: { value: number; run: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const holder = useRef<HTMLSpanElement>(null)
  const inView = useInView(holder, { once: true, amount: 0.6 })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!run || !inView) {
      node.textContent = String(value)
      return
    }
    const controls = animate(0, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, run, value])

  return (
    <span ref={holder}>
      <span className="align-top text-[0.4em] text-[#e0b27a]">$</span>
      <span ref={ref}>{value}</span>
    </span>
  )
}
