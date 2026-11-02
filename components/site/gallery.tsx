"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { categories, type BlockMeta, type FilterCategory } from "@/lib/catalog"
import { BlockView } from "@/components/site/block-view"

export function Gallery({ blocks }: { blocks: BlockMeta[] }) {
  const [active, setActive] = useState<FilterCategory>("All")
  const visible = useMemo(
    () => (active === "All" ? blocks : blocks.filter((block) => block.category === active)),
    [active, blocks],
  )

  return (
    <section id="library" className="scroll-mt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-[#e0b27a] uppercase">Library</p>
          <h2 className="mt-2 font-serif text-4xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
            {blocks.length} sections, live.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter blocks">
          {categories.map((category) => {
            const selected = category === active
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={
                  selected
                    ? "rounded-full bg-[#f6f1e8] px-3 py-1.5 text-sm text-[#1a140e]"
                    : "rounded-full border border-white/15 px-3 py-1.5 text-sm text-[#d9d2c6] hover:border-white/30"
                }
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {visible.map((block) => (
          <li key={block.slug}>
            <Link
              href={`/blocks/${block.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[#e0b27a]/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <div className="pointer-events-none absolute inset-0">
                  <BlockView slug={block.slug} preview />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-[10px] tracking-[0.24em] text-[#e0b27a] uppercase">{block.category}</p>
                  <h3 className="mt-1 font-serif text-2xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                    {block.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#b7b0a4]">{block.description}</p>
                </div>
                <span className="mt-1 text-xs tracking-[0.18em] text-[#d9d2c6] uppercase transition group-hover:text-[#f6f1e8]">
                  Open
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
