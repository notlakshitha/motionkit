import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5">
      <p className="text-[11px] tracking-[0.32em] text-[#e0b27a] uppercase">Missing reel</p>
      <h1
        className="mt-3 font-serif text-5xl text-[#f6f1e8]"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        That block is not in the can.
      </h1>
      <Link href="/" className="mt-6 text-sm text-[#f6f1e8] underline-offset-4 hover:underline">
        Back to the gallery
      </Link>
    </main>
  )
}
