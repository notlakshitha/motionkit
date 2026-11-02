import catalog from "@/content/catalog.json"

export type Category = "Heroes" | "Backgrounds" | "Sections" | "Full pages"

export type BlockMeta = {
  slug: string
  title: string
  category: Category
  description: string
  dependencies: string[]
  files: string[]
}

export const blocks = catalog.blocks as BlockMeta[]

export const categories = [
  "All",
  "Heroes",
  "Backgrounds",
  "Sections",
  "Full pages",
] as const

export type FilterCategory = (typeof categories)[number]

export function getBlock(slug: string) {
  return blocks.find((block) => block.slug === slug)
}
