import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlockView } from "@/components/site/block-view"
import { CodePanel } from "@/components/site/code-panel"
import { Badge } from "@/components/ui/badge"
import { getBlock, blocks } from "@/lib/catalog"
import { blockPrompts, blockSources } from "@/lib/generated/block-sources"

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const block = getBlock(slug)
  if (!block) return {}
  return {
    title: block.title,
    description: block.description,
  }
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const block = getBlock(slug)
  const files = blockSources[slug]
  const prompt = blockPrompts[slug]
  if (!block || !files || !prompt) notFound()

  return (
    <main className="mx-auto max-w-6xl px-5 pt-10 pb-20">
      <Link href="/#library" className="text-sm text-[#b7b0a4] hover:text-[#f6f1e8]">
        ← All blocks
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge variant="outline">{block.category}</Badge>
        {block.dependencies.length === 0 ? (
          <Badge variant="secondary">No extra packages</Badge>
        ) : (
          block.dependencies.map((dependency) => (
            <Badge key={dependency} variant="secondary">
              {dependency}
            </Badge>
          ))
        )}
      </div>
      <h1
        className="mt-4 font-serif text-5xl text-[#f6f1e8] md:text-6xl"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        {block.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#d9d2c6]">{block.description}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black">
        <BlockView slug={block.slug} />
      </div>
      <CodePanel
        slug={block.slug}
        files={files}
        prompt={prompt}
        dependencies={block.dependencies}
      />
    </main>
  )
}
