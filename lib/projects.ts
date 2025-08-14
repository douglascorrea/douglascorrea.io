import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  status: "completed" | "in-progress" | "archived"
  startDate: string
  endDate?: string
}

export function getAllProjects(): Project[] {
  // Ensure directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        longDescription: content,
        technologies: data.technologies || [],
        category: data.category || "Other",
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        imageUrl: data.imageUrl,
        featured: data.featured || false,
        status: data.status || "completed",
        startDate: data.startDate || "",
        endDate: data.endDate,
      } as Project
    })

  return allProjectsData.sort((a, b) => {
    // Sort by featured first, then by start date
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.startDate < b.startDate ? 1 : -1
  })
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      longDescription: content,
      technologies: data.technologies || [],
      category: data.category || "Other",
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      imageUrl: data.imageUrl,
      featured: data.featured || false,
      status: data.status || "completed",
      startDate: data.startDate || "",
      endDate: data.endDate,
    }
  } catch {
    return null
  }
}

export function getProjectsByCategory(): Record<string, Project[]> {
  const projects = getAllProjects()
  const categories: Record<string, Project[]> = {}

  projects.forEach((project) => {
    if (!categories[project.category]) {
      categories[project.category] = []
    }
    categories[project.category].push(project)
  })

  return categories
}

export function getAllCategories(): string[] {
  const projects = getAllProjects()
  const categories = projects.map((project) => project.category)
  return Array.from(new Set(categories)).sort()
}
