import Link from "next/link"
import { Github, Linkedin, Mail, Rss } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerNavigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "CV", href: "/cv" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
      label: "Follow on GitHub",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      label: "Connect on LinkedIn",
    },
    {
      name: "Email",
      href: "mailto:douglas@example.com",
      icon: Mail,
      label: "Send email",
    },
    {
      name: "RSS",
      href: "/rss.xml",
      icon: Rss,
      label: "Subscribe to RSS feed",
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2 p-4">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold m-2">Douglas Correa</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Software developer passionate about building modern web applications and sharing knowledge through
              open-source contributions and technical writing.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-2" role="navigation" aria-label="Footer navigation">
              {footerNavigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex flex-col space-y-2">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Douglas Correa. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
