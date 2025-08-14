import { getAllProjects, getAllCategories } from "@/lib/projects"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Projects - Douglas Correa",
  description: "Showcase of open-source projects, web applications, and development tools built by Douglas Correa.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground">
            A collection of open-source projects, web applications, and development tools I've built.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer">
                All
              </Badge>
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.slug} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  {project.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                          </h3>
                          {project.featured && (
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {project.githubUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">View on GitHub</span>
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View live demo</span>
                              </a>
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(project.startDate).getFullYear()}
                        </div>
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
