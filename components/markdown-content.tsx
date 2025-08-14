"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface MarkdownContentProps {
  content: string
}

function CodeBlock({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""
  const code = String(children).replace(/\n$/, "")

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!match) {
    return (
      <code className="relative rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium border" {...props}>
        {children}
      </code>
    )
  }

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-muted/80 px-4 py-3 rounded-t-lg border border-b-0">
        <span className="text-sm font-semibold text-foreground uppercase tracking-wide">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-opacity hover:bg-background/20"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="border border-t-0 rounded-b-lg overflow-hidden">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!mt-0 !mb-0 !rounded-none !border-0"
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            background: "hsl(var(--muted))",
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0 text-foreground border-b-2 border-primary/20 pb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 mt-8 first:mt-0 text-foreground border-b border-border pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-6 text-foreground">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4 text-foreground">{children}</h4>
          ),

          p: ({ children }) => <p className="leading-7 mb-4 text-foreground">{children}</p>,

          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-4 border-primary pl-6 italic bg-muted/30 py-4 px-4 rounded-r-lg text-muted-foreground">
              {children}
            </blockquote>
          ),

          ul: ({ children }) => <ul className="my-6 ml-6 list-disc space-y-2 text-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="my-6 ml-6 list-decimal space-y-2 text-foreground">{children}</ol>,
          li: ({ children }) => <li className="leading-7 text-foreground">{children}</li>,

          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http")
            const Component = isExternal ? "a" : Link

            return (
              <Component
                href={href || "#"}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3" />}
              </Component>
            )
          },

          img: ({ src, alt }) => (
            <div className="my-8">
              <Image
                src={src || ""}
                alt={alt || ""}
                width={800}
                height={400}
                className="rounded-lg border shadow-lg w-full h-auto"
              />
              {alt && <p className="text-sm text-muted-foreground text-center mt-3 italic">{alt}</p>}
            </div>
          ),

          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
          th: ({ children }) => (
            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => <td className="border border-border px-4 py-3 text-foreground">{children}</td>,

          code: CodeBlock,

          hr: () => <hr className="my-8 border-border" />,

          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
