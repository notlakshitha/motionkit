import Link from "next/link"
import { GITHUB_URL } from "@/lib/site"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#100e0c]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 text-[#f6f1e8]">
          <Mark />
          <span className="text-sm tracking-[0.22em] uppercase">MotionKit</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-[#d9d2c6] sm:gap-2">
          <Link href="/#library" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-[#f6f1e8]">
            Blocks
          </Link>
          <Link href="/docs" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-[#f6f1e8]">
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            className="rounded-full border border-white/15 px-3 py-1.5 text-[#f6f1e8] hover:border-[#e0b27a]/60"
          >
            Star
          </a>
        </nav>
      </div>
    </header>
  )
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <rect x="1" y="1" width="20" height="20" rx="6" fill="none" stroke="#e0b27a" strokeWidth="1.2" />
      <path d="M4 11h14" stroke="#f6f1e8" strokeWidth="1.4" />
      <circle cx="11" cy="11" r="1.4" fill="#e0b27a" />
    </svg>
  )
}
