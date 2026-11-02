import Link from "next/link"
import { GITHUB_URL } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-[#b7b0a4] sm:flex-row sm:items-center sm:justify-between">
        <p>MotionKit is MIT licensed. Take the sections with you.</p>
        <div className="flex gap-4">
          <Link href="/docs" className="hover:text-[#f6f1e8]">
            Docs
          </Link>
          <a href={GITHUB_URL} className="hover:text-[#f6f1e8]">
            GitHub
          </a>
          <Link href="/#library" className="hover:text-[#f6f1e8]">
            Blocks
          </Link>
        </div>
      </div>
    </footer>
  )
}
