"use client"

import { useState, useSyncExternalStore } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type SourceFile = {
  filename: string
  content: string
}

export function CodePanel({
  slug,
  files,
  prompt,
  dependencies,
}: {
  slug: string
  files: SourceFile[]
  prompt: string
  dependencies: string[]
}) {
  const [activeFile, setActiveFile] = useState(files[0]?.filename ?? "")
  const current = files.find((file) => file.filename === activeFile) ?? files[0]
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "https://<domain>",
  )

  const install = `npx shadcn add ${origin}/r/${slug}.json`

  return (
    <Tabs defaultValue="code" className="mt-8">
      <TabsList variant="line" className="h-10">
        <TabsTrigger value="code">React / Tailwind</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
      </TabsList>
      <TabsContent value="code" className="mt-4">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12100e]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <button
                  key={file.filename}
                  type="button"
                  onClick={() => setActiveFile(file.filename)}
                  className={
                    file.filename === current?.filename
                      ? "rounded-full bg-white/10 px-3 py-1 text-xs text-[#f6f1e8]"
                      : "rounded-full px-3 py-1 text-xs text-[#b7b0a4] hover:text-[#f6f1e8]"
                  }
                >
                  {file.filename}
                </button>
              ))}
            </div>
            <CopyButton text={current?.content ?? ""} />
          </div>
          <pre className="max-h-[32rem] overflow-auto p-4 font-mono text-[12px] leading-6 text-[#e7e1d6]">
            <code>{current?.content}</code>
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="prompt" className="mt-4">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12100e]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="text-xs tracking-[0.18em] text-[#b7b0a4] uppercase">prompt.md</p>
            <CopyButton text={prompt} />
          </div>
          <pre className="max-h-[32rem] overflow-auto p-4 font-mono text-[12px] leading-6 whitespace-pre-wrap text-[#e7e1d6]">
            {prompt}
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="install" className="mt-4">
        <div className="rounded-2xl border border-white/10 bg-[#12100e] p-5">
          <p className="text-sm text-[#d9d2c6]">
            The registry item is served from this site. The command uses the domain you are on.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-[#f6f1e8]">
              {install}
            </code>
            <CopyButton text={install} />
          </div>
          {dependencies.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs tracking-[0.16em] text-[#b7b0a4] uppercase">Also installs</span>
              {dependencies.map((dependency) => (
                <Badge key={dependency} variant="outline">
                  {dependency}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#b7b0a4]">No extra packages. React and Tailwind are enough.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        })
      }}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}
