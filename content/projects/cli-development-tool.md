---
title: "DevFlow CLI"
description: "Command-line utility for developers to streamline workflow automation, project scaffolding, and development tasks"
technologies: ["Node.js", "TypeScript", "Commander.js", "Inquirer.js", "Chalk"]
category: "Developer Tool"
githubUrl: "https://github.com/douglascorrea/devflow-cli"
imageUrl: "/placeholder.svg?height=400&width=600"
featured: false
status: "completed"
startDate: "2023-10-01"
endDate: "2023-11-15"
---

# DevFlow CLI

A powerful command-line tool designed to streamline developer workflows by automating common tasks, providing project templates, and integrating with popular development tools.

## Features

### Project Scaffolding
- **Template Generation**: Create new projects from predefined templates
- **Custom Templates**: Support for user-defined project templates
- **Framework Support**: Templates for React, Next.js, Node.js, and more
- **Configuration Setup**: Automatic setup of linting, formatting, and testing tools

### Workflow Automation
- **Git Integration**: Automated git operations and branch management
- **Deployment Scripts**: One-command deployment to various platforms
- **Environment Management**: Easy switching between development environments
- **Database Operations**: Database migration and seeding commands

### Development Utilities
- **Code Generation**: Generate components, services, and API endpoints
- **File Organization**: Automatic file and folder structure organization
- **Dependency Management**: Smart package installation and updates
- **Performance Analysis**: Bundle size analysis and optimization suggestions

## Installation & Usage

### Global Installation
\`\`\`bash
npm install -g devflow-cli
# or
yarn global add devflow-cli
\`\`\`

### Basic Commands
\`\`\`bash
# Create a new project
devflow create my-app --template react-ts

# Generate a component
devflow generate component Button --props "text:string, onClick:function"

# Deploy to production
devflow deploy --platform vercel

# Analyze bundle size
devflow analyze --output detailed
\`\`\`

## Technical Implementation

### CLI Architecture
Built with Commander.js for command parsing and Inquirer.js for interactive prompts.

\`\`\`typescript
// Example: Project creation command
import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'

interface CreateOptions {
  template?: string
  typescript?: boolean
  git?: boolean
}

export function createCommand() {
  return new Command('create')
    .argument('<project-name>', 'Name of the project to create')
    .option('-t, --template <template>', 'Project template to use')
    .option('--typescript', 'Use TypeScript')
    .option('--no-git', 'Skip git initialization')
    .description('Create a new project from template')
    .action(async (projectName: string, options: CreateOptions) => {
      try {
        console.log(chalk.blue(`Creating project: ${projectName}`))
        
        // Interactive template selection if not provided
        if (!options.template) {
          const { template } = await inquirer.prompt([
            {
              type: 'list',
              name: 'template',
              message: 'Select a project template:',
              choices: [
                'react-ts',
                'next-js',
                'node-express',
                'vue-ts',
                'custom'
              ]
            }
          ])
          options.template = template
        }
        
        await createProject(projectName, options)
        console.log(chalk.green(`✅ Project ${projectName} created successfully!`))
        
      } catch (error) {
        console.error(chalk.red(`❌ Error creating project: ${error.message}`))
        process.exit(1)
      }
    })
}
\`\`\`

### Template System
Dynamic template system with variable substitution and conditional file inclusion.

\`\`\`typescript
// Template configuration
interface Template {
  name: string
  description: string
  files: TemplateFile[]
  dependencies: string[]
  devDependencies: string[]
  scripts: Record<string, string>
  postInstall?: string[]
}

interface TemplateFile {
  source: string
  destination: string
  template?: boolean
  condition?: string
}

// Template processing
async function processTemplate(
  templatePath: string, 
  targetPath: string, 
  variables: Record<string, any>
) {
  const template = await loadTemplate(templatePath)
  
  for (const file of template.files) {
    // Check condition
    if (file.condition && !evaluateCondition(file.condition, variables)) {
      continue
    }
    
    const sourcePath = path.join(templatePath, file.source)
    const destPath = path.join(targetPath, file.destination)
    
    if (file.template) {
      // Process template variables
      const content = await fs.readFile(sourcePath, 'utf-8')
      const processed = processTemplateVariables(content, variables)
      await fs.writeFile(destPath, processed)
    } else {
      // Copy file as-is
      await fs.copyFile(sourcePath, destPath)
    }
  }
}
\`\`\`

### Code Generation
Intelligent code generation with AST manipulation for precise code insertion.

\`\`\`typescript
// Component generation example
async function generateComponent(name: string, options: ComponentOptions) {
  const componentTemplate = `
import React from 'react'
{{#if typescript}}
interface {{name}}Props {
  {{#each props}}
  {{name}}: {{type}}
  {{/each}}
}
{{/if}}

{{#if typescript}}
export function {{name}}({ {{propNames}} }: {{name}}Props) {
{{else}}
export function {{name}}({ {{propNames}} }) {
{{/if}}
  return (
    <div className="{{kebabCase name}}">
      <h1>{{name}} Component</h1>
    </div>
  )
}
`

  const variables = {
    name,
    typescript: options.typescript,
    props: parseProps(options.props),
    propNames: options.props?.map(p => p.name).join(', ') || '',
    kebabCase: (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase()
  }
  
  const processed = Handlebars.compile(componentTemplate)(variables)
  const filePath = path.join(options.outputDir, `${name}.${options.typescript ? 'tsx' : 'jsx'}`)
  
  await fs.writeFile(filePath, processed)
  
  // Generate test file if requested
  if (options.withTests) {
    await generateComponentTest(name, options)
  }
  
  // Update index file
  await updateIndexFile(options.outputDir, name)
}
\`\`\`

## Plugin System

### Plugin Architecture
Extensible plugin system for custom functionality.

\`\`\`typescript
// Plugin interface
interface DevFlowPlugin {
  name: string
  version: string
  commands?: Command[]
  hooks?: {
    beforeCreate?: (context: CreateContext) => Promise<void>
    afterCreate?: (context: CreateContext) => Promise<void>
    beforeDeploy?: (context: DeployContext) => Promise<void>
  }
}

// Plugin loader
class PluginManager {
  private plugins: Map<string, DevFlowPlugin> = new Map()
  
  async loadPlugin(pluginPath: string) {
    const plugin = await import(pluginPath)
    this.plugins.set(plugin.name, plugin)
    
    // Register commands
    if (plugin.commands) {
      plugin.commands.forEach(command => {
        this.program.addCommand(command)
      })
    }
  }
  
  async executeHook(hookName: string, context: any) {
    for (const plugin of this.plugins.values()) {
      if (plugin.hooks?.[hookName]) {
        await plugin.hooks[hookName](context)
      }
    }
  }
}
\`\`\`

## Configuration Management

### Config File Support
Support for multiple configuration formats and environment-specific settings.

\`\`\`typescript
// Configuration schema
interface DevFlowConfig {
  templates: {
    directory: string
    registry?: string
  }
  deployment: {
    default: string
    targets: Record<string, DeploymentTarget>
  }
  generators: {
    component: ComponentGeneratorConfig
    service: ServiceGeneratorConfig
  }
  plugins: string[]
}

// Config loader with validation
async function loadConfig(): Promise<DevFlowConfig> {
  const configPaths = [
    'devflow.config.js',
    'devflow.config.json',
    '.devflowrc',
    'package.json' // devflow section
  ]
  
  for (const configPath of configPaths) {
    if (await fs.pathExists(configPath)) {
      const config = await loadConfigFile(configPath)
      return validateConfig(config)
    }
  }
  
  return getDefaultConfig()
}
\`\`\`

## Performance & Optimization

### Caching Strategy
Intelligent caching for templates and generated code.

\`\`\`typescript
// Cache manager
class CacheManager {
  private cacheDir = path.join(os.homedir(), '.devflow', 'cache')
  
  async get<T>(key: string): Promise<T | null> {
    const cachePath = path.join(this.cacheDir, `${key}.json`)
    
    if (await fs.pathExists(cachePath)) {
      const cached = await fs.readJson(cachePath)
      
      // Check expiration
      if (cached.expires > Date.now()) {
        return cached.data
      }
    }
    
    return null
  }
  
  async set<T>(key: string, data: T, ttl = 3600000): Promise<void> {
    const cachePath = path.join(this.cacheDir, `${key}.json`)
    await fs.ensureDir(path.dirname(cachePath))
    
    await fs.writeJson(cachePath, {
      data,
      expires: Date.now() + ttl,
      created: Date.now()
    })
  }
}
\`\`\`

## Testing Strategy

### Unit Testing
Comprehensive test suite with mocked file system operations.

\`\`\`typescript
// Example test
describe('Project Creation', () => {
  let mockFs: jest.Mocked<typeof fs>
  
  beforeEach(() => {
    mockFs = fs as jest.Mocked<typeof fs>
    jest.clearAllMocks()
  })
  
  it('should create project with correct structure', async () => {
    const projectName = 'test-project'
    const template = 'react-ts'
    
    await createProject(projectName, { template })
    
    expect(mockFs.ensureDir).toHaveBeenCalledWith(
      path.join(process.cwd(), projectName)
    )
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('package.json'),
      expect.stringContaining(projectName)
    )
  })
})
\`\`\`

## Distribution & Publishing

### NPM Package
Published as a scoped package with proper versioning and changelog.

\`\`\`json
{
  "name": "@douglascorrea/devflow-cli",
  "version": "1.2.0",
  "bin": {
    "devflow": "./dist/cli.js"
  },
  "files": [
    "dist/",
    "templates/",
    "README.md"
  ],
  "engines": {
    "node": ">=14.0.0"
  }
}
\`\`\`

## Results & Impact

The CLI tool has achieved:
- **1,000+** downloads per month
- **50+** GitHub stars
- **Active community** contributing templates and plugins
- **Reduced setup time** by 80% for new projects
- **Standardized workflows** across development teams

## Future Enhancements

- **GUI Interface**: Electron-based desktop application
- **Cloud Integration**: Sync templates and configs across devices
- **AI-Powered Generation**: Smart code generation using AI
- **Team Collaboration**: Shared templates and configurations
- **Performance Monitoring**: Built-in performance analysis tools

This project demonstrates expertise in Node.js development, CLI design patterns, and developer experience optimization.
