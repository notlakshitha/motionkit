import Link from "next/link"
import { Gallery } from "@/components/site/gallery"
import { blocks } from "@/lib/catalog"
import { GITHUB_URL } from "@/lib/site"

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="mk-home-sheen pointer-events-none absolute top-10 -left-1/4 h-40 w-[70%] bg-gradient-to-r from-transparent via-[#e0b27a]/40 to-transparent blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-16 md:grid-cols-[1.4fr_0.8fr] md:pt-28">
          <div>
            <p className="text-[11px] tracking-[0.34em] text-[#e0b27a] uppercase">Open source · MIT</p>
            <h1
              className="mt-5 max-w-3xl font-serif text-5xl leading-[0.92] text-[#f7f2ea] md:text-7xl"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Free, open-source
              <span className="block italic text-[#e0b27a]">cinematic landing</span>
              page sections.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#d9d2c6]">
              Code + AI prompts. Copy, paste, ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#library"
                className="rounded-full bg-[#f6f1e8] px-5 py-2.5 text-sm font-medium text-[#1a140e]"
              >
                Browse blocks
              </Link>
              <Link
                href="/docs"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-[#f6f1e8]"
              >
                Read the docs
              </Link>
            </div>
          </div>
          <aside className="relative self-end rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <p className="text-[10px] tracking-[0.28em] text-[#e0b27a] uppercase">In the can</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-[#b7b0a4] uppercase">Blocks</dt>
                <dd className="mt-1 font-serif text-3xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  {blocks.length}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-[#b7b0a4] uppercase">Kinds</dt>
                <dd className="mt-1 font-serif text-3xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  4
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-[#b7b0a4] uppercase">License</dt>
                <dd className="mt-1 font-serif text-3xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  MIT
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm leading-6 text-[#d9d2c6]">
              Heroes, backgrounds, sections, and a full page. Each one ships with source, a prompt, and a registry command.
            </p>
          </aside>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <Gallery blocks={blocks} />
        <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(224,178,122,0.18),transparent_55%)] px-6 py-12 md:px-12">
          <p className="text-[11px] tracking-[0.32em] text-[#e0b27a] uppercase">Star the work</p>
          <h2
            className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-[#f6f1e8] md:text-5xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            If a section saves you a night, leave a star.
          </h2>
          <a
            href={GITHUB_URL}
            className="mt-6 inline-flex rounded-full bg-[#f6f1e8] px-5 py-2.5 text-sm font-medium text-[#1a140e]"
          >
            Star MotionKit on GitHub
          </a>
        </section>
      </div>
    </main>
  )
}
