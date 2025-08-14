import { getAllPosts } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog - Douglas Correa",
  description: "Articles about software development, web technologies, and programming best practices.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Blog</h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on software development, web technologies, and programming best practices.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <article>
                  <div className="space-y-4">
                    <div>
                      <Link href={`/blog/${post.slug}`} className="group">
                        <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
