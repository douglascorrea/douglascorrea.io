import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { getCVData } from "@/lib/cv"

export const metadata = {
  title: "CV - Douglas Correa",
  description: "Professional resume and curriculum vitae of Douglas Correa, Software Developer.",
}

export default async function CVPage() {
  const cvData = await getCVData()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with download option */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Curriculum Vitae</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* CV Content */}
        <div className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{cvData.personal.name}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{cvData.personal.title}</p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{cvData.personal.summary}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`mailto:${cvData.personal.email}`} className="hover:text-primary">
                      {cvData.personal.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cvData.personal.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cvData.personal.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="/" className="hover:text-primary">
                      {cvData.personal.website}
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a
                      href={cvData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      github.com/douglascorrea
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a
                      href={cvData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      linkedin.com/in/douglascorrea
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Experience */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Professional Experience</h3>
              <div className="space-y-8">
                {cvData.experience.map((job, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold">{job.title}</h4>
                        <p className="text-primary font-medium">{job.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>
                          {job.startDate} - {job.endDate}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {job.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {index < cvData.experience.length - 1 && <Separator className="mt-8" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(cvData.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Education</h3>
              <div className="space-y-6">
                {cvData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{edu.year}</div>
                    </div>
                    {edu.details && <p className="text-muted-foreground">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Certifications</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {cvData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{cert.year}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Projects */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Key Projects</h3>
                <Button variant="ghost" asChild>
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
              <div className="space-y-6">
                {cvData.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{project.name}</h4>
                      <div className="flex items-center space-x-2">
                        {project.github && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.live && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {index < cvData.projects.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Languages</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {cvData.languages.map((lang, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{lang.language}</h4>
                    <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
