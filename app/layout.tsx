import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif, Outfit } from "next/font/google"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { TAGLINE } from "@/lib/site"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://motionkit.vercel.app"),
  title: {
    default: "MotionKit",
    template: "%s · MotionKit",
  },
  description: TAGLINE,
  openGraph: {
    title: "MotionKit",
    description: TAGLINE,
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${instrument.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
