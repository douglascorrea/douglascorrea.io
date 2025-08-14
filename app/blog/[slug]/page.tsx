import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { MarkdownContent } from "@/components/markdown-content"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Douglas Correa`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-8" />

        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-6">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readTime}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Article tags">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" role="listitem">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none" role="article">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}
