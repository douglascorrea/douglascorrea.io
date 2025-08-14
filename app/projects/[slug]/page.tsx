import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MarkdownContent } from "@/components/markdown-content"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Douglas Correa`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.title }]} className="mb-8" />

        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            {project.imageUrl && (
              <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={`Screenshot of ${project.title} project`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">{project.title}</h1>
                {project.featured && <Badge variant="default">Featured</Badge>}
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Project duration: </span>
                    {project.startDate}
                    {project.endDate && ` - ${project.endDate}`}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Category: </span>
                    {project.category}
                  </span>
                </div>
                <Badge variant="outline" className="capitalize">
                  <span className="sr-only">Status: </span>
                  {project.status.replace("-", " ")}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" role="listitem">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                {project.githubUrl && (
                  <Button asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      View on GitHub
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none" role="article">
            <MarkdownContent content={project.longDescription} />
          </div>
        </article>
      </div>
    </div>
  )
}
