import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 mb-16">
        <div className="relative">
          <Image
            src="/professional-developer-headshot.png"
            alt="Douglas Correa"
            width={120}
            height={120}
            className="rounded-full border-4 border-border"
          />
        </div>

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Hi, I'm Douglas Correa</h1>
          <p className="text-xl text-muted-foreground">Software Developer & Open Source Enthusiast</p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I build modern web applications and contribute to open source projects. Passionate about clean code,
            developer experience, and sharing knowledge through writing and community involvement.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Read Blog</Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:douglas@example.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Technologies & Skills</h2>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {[
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "PostgreSQL",
            "Docker",
            "AWS",
            "Git",
            "GraphQL",
            "Tailwind CSS",
            "Prisma",
            "Jest",
            "Cypress",
          ].map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Work</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "E-commerce Platform",
              description: "Full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL",
              tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
            },
            {
              title: "Task Management App",
              description: "Collaborative task management tool with real-time updates and team features",
              tech: ["React", "Node.js", "Socket.io", "MongoDB"],
            },
            {
              title: "Open Source CLI Tool",
              description: "Command-line utility for developers to streamline their workflow",
              tech: ["Node.js", "TypeScript", "Commander.js"],
            },
          ].map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts Preview */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Building Scalable React Applications",
              excerpt:
                "Best practices for structuring large React applications with proper state management and component architecture.",
              date: "2024-01-15",
              readTime: "8 min read",
            },
            {
              title: "Getting Started with TypeScript",
              excerpt:
                "A comprehensive guide to adopting TypeScript in your JavaScript projects and leveraging its powerful type system.",
              date: "2024-01-08",
              readTime: "12 min read",
            },
          ].map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
