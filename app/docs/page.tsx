import type { ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { blocks } from "@/lib/catalog"
import { GITHUB_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Docs",
  description: "Install MotionKit blocks, write a new one, and contribute.",
}

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-16 pb-24">
      <p className="text-[11px] tracking-[0.32em] text-[#e0b27a] uppercase">Docs</p>
      <h1
        className="mt-3 font-serif text-5xl text-[#f6f1e8]"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        Getting started
      </h1>
      <p className="mt-4 text-lg leading-8 text-[#d9d2c6]">
        MotionKit is a gallery of cinematic landing sections. Every block is MIT licensed,
        original, and shipped three ways: React source, a prompt, and a shadcn registry file.
      </p>

      <Section title="Run the gallery">
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#12100e] p-4 font-mono text-sm leading-7 text-[#f6f1e8]">{`git clone ${GITHUB_URL}.git
cd motionkit
npm install
npm run dev`}</pre>
        <p>
          Open the local site and browse the library. Production builds regenerate the registry
          before <code className="text-[#f6f1e8]">next build</code>, so a Vercel project with no
          extra settings is enough. The install command on each block uses the domain of the
          deployment you are visiting.
        </p>
      </Section>

      <Section title="Install a block">
        <p>From a block page, copy the install command. It looks like this:</p>
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#12100e] p-4 font-mono text-sm text-[#f6f1e8]">
          npx shadcn add https://&lt;domain&gt;/r/particle-field-hero.json
        </pre>
        <p>
          shadcn writes the files into <code className="text-[#f6f1e8]">components/motionkit/</code> and
          installs any listed packages. Blocks use Tailwind classes, inline keyframes, and a small
          reduced-motion hook so they do not depend on this site&apos;s global stylesheet. Headlines
          use <code className="text-[#f6f1e8]">var(--font-serif)</code> and fall back to Georgia.
        </p>
        <p>
          The registry index lives at <code className="text-[#f6f1e8]">registry.json</code>. Built
          items are written to <code className="text-[#f6f1e8]">public/r/*.json</code>.
        </p>
      </Section>

      <Section title="Use a prompt">
        <p>
          Each block page includes <code className="text-[#f6f1e8]">prompt.md</code>. Paste it into
          an AI coding assistant when you want the same scene rebuilt in your own stack. The prompts
          describe motion, fallbacks, and reduced-motion behavior. They do not point at anyone else&apos;s
          components.
        </p>
      </Section>

      <Section title="What ships today">
        <ul className="space-y-2">
          {blocks.map((block) => (
            <li key={block.slug}>
              <Link href={`/blocks/${block.slug}`} className="text-[#f6f1e8] underline-offset-4 hover:underline">
                {block.title}
              </Link>
              <span className="text-[#b7b0a4]"> — {block.category}. {block.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How to add a block">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Add a client component under <code className="text-[#f6f1e8]">registry/motionkit/</code>.
            Accept a <code className="text-[#f6f1e8]">preview</code> prop. Keep heavy WebGL in a
            sibling file and import it only when <code className="text-[#f6f1e8]">preview</code> is
            false and the visitor has not asked for reduced motion.
          </li>
          <li>
            Paint a static fallback that looks finished with JavaScript disabled. Check
            <code className="text-[#f6f1e8]"> prefers-reduced-motion</code> with
            <code className="text-[#f6f1e8]"> usePrefersReducedMotion</code>.
          </li>
          <li>
            Write <code className="text-[#f6f1e8]">content/prompts/&lt;slug&gt;.md</code> with enough
            detail to rebuild the scene: layout, motion, fallback, and sample copy.
          </li>
          <li>
            Register the block in <code className="text-[#f6f1e8]">content/catalog.json</code> with
            a category of Heroes, Backgrounds, Sections, or Full pages.
          </li>
          <li>
            Map the component in <code className="text-[#f6f1e8]">components/site/block-view.tsx</code>.
          </li>
          <li>
            Run <code className="text-[#f6f1e8]">npm run registry:build</code>. That refreshes
            <code className="text-[#f6f1e8]"> registry.json</code>, <code className="text-[#f6f1e8]">public/r</code>,
            and the source strings shown on the block page.
          </li>
        </ol>
      </Section>

      <Section title="Contributing">
        <p>
          Read <code className="text-[#f6f1e8]">CONTRIBUTING.md</code> before opening a pull request.
          New work should be original. Do not port sections, prompts, names, or layouts from paid
          motion libraries. Keep effects kind to reduced-motion preferences, and keep WebGL off the
          gallery thumbnails.
        </p>
        <p>
          Issues and pull requests live on{" "}
          <a href={GITHUB_URL} className="text-[#f6f1e8] underline-offset-4 hover:underline">
            GitHub
          </a>
          .
        </p>
      </Section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-3xl text-[#f6f1e8]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-[#d9d2c6]">{children}</div>
    </section>
  )
}
