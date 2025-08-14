import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "CV - Douglas Correa",
  description: "Professional resume and curriculum vitae of Douglas Correa, Software Developer.",
}

export default function CVPage() {
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
                  <h2 className="text-2xl font-bold mb-2">Douglas Correa</h2>
                  <p className="text-lg text-muted-foreground mb-4">Senior Software Developer</p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    Passionate software developer with 5+ years of experience building scalable web applications and
                    contributing to open-source projects. Specialized in modern JavaScript frameworks, cloud
                    technologies, and developer experience optimization.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="mailto:douglas@example.com" className="hover:text-primary">
                      douglas@example.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="/" className="hover:text-primary">
                      douglascorrea.dev
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a
                      href="https://github.com"
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
                      href="https://linkedin.com"
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
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold">Senior Software Developer</h4>
                      <p className="text-primary font-medium">TechCorp Solutions</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Jan 2022 - Present</span>
                      <span className="mx-2">•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Led development of a microservices architecture serving 100K+ daily active users, resulting in 40%
                      improved performance
                    </li>
                    <li>Mentored 3 junior developers and established code review processes that reduced bugs by 60%</li>
                    <li>
                      Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time from 2 hours
                      to 15 minutes
                    </li>
                    <li>
                      Built real-time collaboration features using WebSocket technology, increasing user engagement by
                      35%
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold">Full Stack Developer</h4>
                      <p className="text-primary font-medium">StartupXYZ</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Mar 2020 - Dec 2021</span>
                      <span className="mx-2">•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Developed and launched 3 web applications from concept to production, serving 10K+ users</li>
                    <li>Designed and implemented RESTful APIs with comprehensive documentation and testing coverage</li>
                    <li>
                      Optimized database queries and implemented caching strategies, improving response times by 50%
                    </li>
                    <li>Collaborated with design team to create responsive, accessible user interfaces</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Vue.js", "Express.js", "MongoDB", "Redis", "Stripe API", "Tailwind CSS"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold">Frontend Developer</h4>
                      <p className="text-primary font-medium">Digital Agency Pro</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Jun 2019 - Feb 2020</span>
                      <span className="mx-2">•</span>
                      <span>New York, NY</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Built responsive websites and web applications for 20+ clients across various industries</li>
                    <li>
                      Implemented modern JavaScript frameworks and ensured cross-browser compatibility and performance
                    </li>
                    <li>Collaborated with designers to translate mockups into pixel-perfect, interactive interfaces</li>
                    <li>Maintained and updated legacy codebases while implementing modern development practices</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["React", "JavaScript", "SASS", "Webpack", "jQuery", "PHP"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Frontend Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "Vue.js",
                      "TypeScript",
                      "JavaScript",
                      "HTML5",
                      "CSS3",
                      "Tailwind CSS",
                      "SASS",
                    ].map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Backend Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST APIs"].map(
                      (skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Cloud & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Vercel", "Netlify", "Linux"].map(
                      (skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Tools & Methodologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Jest", "Cypress", "Figma", "Agile", "Scrum", "TDD", "Code Review"].map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Education</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">Bachelor of Science in Computer Science</h4>
                      <p className="text-primary font-medium">University of California, Berkeley</p>
                    </div>
                    <div className="text-sm text-muted-foreground">2015 - 2019</div>
                  </div>
                  <p className="text-muted-foreground">
                    Graduated Magna Cum Laude • GPA: 3.8/4.0 • Relevant Coursework: Data Structures, Algorithms,
                    Software Engineering, Database Systems, Web Development
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Certifications</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">AWS Certified Developer</h4>
                    <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                  </div>
                  <div className="text-sm text-muted-foreground">2023</div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">React Developer Certification</h4>
                    <p className="text-sm text-muted-foreground">Meta</p>
                  </div>
                  <div className="text-sm text-muted-foreground">2022</div>
                </div>
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
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">E-commerce Platform</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="https://demo.com" target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.
                    Serves 1000+ concurrent users with 99.9% uptime.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "Stripe", "PostgreSQL"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">DevFlow CLI</h4>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Command-line tool for developer workflow automation. 1000+ monthly downloads with active community
                    contributions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "TypeScript", "Commander.js"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Languages</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold">English</h4>
                  <p className="text-sm text-muted-foreground">Native</p>
                </div>
                <div>
                  <h4 className="font-semibold">Spanish</h4>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
                <div>
                  <h4 className="font-semibold">Portuguese</h4>
                  <p className="text-sm text-muted-foreground">Conversational</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
