import fs from "fs"
import path from "path"
import matter from "gray-matter"

const cvDirectory = path.join(process.cwd(), "content")

export interface CVData {
  personal: {
    name: string
    title: string
    summary: string
    email: string
    phone: string
    location: string
    website: string
    github: string
    linkedin: string
  }
  experience: Array<{
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string[]
    technologies: string[]
  }>
  skills: {
    [category: string]: string[]
  }
  education: Array<{
    degree: string
    institution: string
    year: string
    details?: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    year: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    github?: string
    live?: string
  }>
  languages: Array<{
    language: string
    proficiency: string
  }>
}

export async function getCVData(): Promise<CVData> {
  const fullPath = path.join(cvDirectory, "cv.md")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return data as CVData
}
