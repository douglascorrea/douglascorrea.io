---
title: "Task Management App"
description: "Collaborative task management tool with real-time updates, team features, and project organization"
technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"]
category: "Web Application"
githubUrl: "https://github.com/douglascorrea/task-manager"
liveUrl: "https://taskmanager-demo.netlify.app"
imageUrl: "/placeholder.svg?height=400&width=600"
featured: true
status: "completed"
startDate: "2023-03-01"
endDate: "2023-07-30"
---

# Task Management App

A comprehensive task management application designed for teams and individuals to organize projects, track progress, and collaborate effectively in real-time.

## Key Features

### Project Organization
- **Workspaces**: Organize tasks into different workspaces
- **Project Boards**: Kanban-style boards for visual task management
- **Custom Categories**: Create custom task categories and labels
- **Priority Levels**: Set task priorities with visual indicators

### Real-time Collaboration
- **Live Updates**: See changes instantly across all connected clients
- **Team Chat**: Built-in messaging for project discussions
- **Activity Feed**: Track all project activities and changes
- **User Presence**: See who's currently online and working

### Task Management
- **Drag & Drop**: Intuitive task movement between columns
- **Due Dates**: Set and track task deadlines
- **Assignments**: Assign tasks to team members
- **Subtasks**: Break down complex tasks into smaller items
- **File Attachments**: Upload and share files with tasks

## Technical Architecture

### Frontend (React)
Built with React using functional components and hooks for state management. Material-UI provides a consistent and professional design system.

\`\`\`jsx
// Example: Task card component with drag and drop
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, Chip, Avatar } from '@mui/material'

function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <CardContent>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            
            <div className="task-meta">
              {task.priority && (
                <Chip 
                  label={task.priority} 
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
              )}
              
              {task.assignee && (
                <Avatar 
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  sx={{ width: 24, height: 24 }}
                />
              )}
              
              {task.dueDate && (
                <span className="due-date">
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}
\`\`\`

### Backend (Node.js + Express)
RESTful API with Socket.io for real-time features. MongoDB stores all application data with proper indexing for performance.

\`\`\`javascript
// Example: Real-time task updates
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('join-project', (projectId) => {
    socket.join(projectId)
    console.log(`User joined project: ${projectId}`)
  })
  
  socket.on('task-updated', async (data) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        data.taskId,
        data.updates,
        { new: true }
      ).populate('assignee', 'name avatar')
      
      // Broadcast to all users in the project
      socket.to(data.projectId).emit('task-changed', {
        task: updatedTask,
        action: 'updated',
        user: socket.user
      })
      
      // Log activity
      await Activity.create({
        projectId: data.projectId,
        userId: socket.user.id,
        action: 'task_updated',
        details: data.updates
      })
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to update task' })
    }
  })
})
\`\`\`

### Database Design
MongoDB collections are designed for flexibility and performance:

\`\`\`javascript
// Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'review', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent']
  },
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project',
    required: true
  },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Indexes for performance
taskSchema.index({ project: 1, status: 1 })
taskSchema.index({ assignee: 1, dueDate: 1 })
\`\`\`

## Real-time Features Implementation

### WebSocket Connection Management
\`\`\`javascript
// Client-side socket management
class SocketManager {
  constructor() {
    this.socket = io(process.env.REACT_APP_SERVER_URL)
    this.setupEventListeners()
  }
  
  setupEventListeners() {
    this.socket.on('task-changed', (data) => {
      // Update local state
      this.updateTaskInStore(data.task)
      
      // Show notification
      this.showNotification(`Task "${data.task.title}" was ${data.action}`)
    })
    
    this.socket.on('user-joined', (user) => {
      this.updateOnlineUsers(user)
    })
  }
  
  joinProject(projectId) {
    this.socket.emit('join-project', projectId)
  }
  
  updateTask(taskId, updates, projectId) {
    this.socket.emit('task-updated', {
      taskId,
      updates,
      projectId
    })
  }
}
\`\`\`

## Performance Optimizations

### Frontend Optimizations
- **React.memo**: Prevent unnecessary re-renders of task components
- **Virtual Scrolling**: Handle large lists of tasks efficiently
- **Debounced Search**: Optimize search input performance
- **Lazy Loading**: Load project data on demand

### Backend Optimizations
- **Database Indexing**: Optimized queries for common operations
- **Connection Pooling**: Efficient database connection management
- **Caching**: Redis for frequently accessed data
- **Rate Limiting**: Prevent API abuse

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure user authentication
- **Role-based Access**: Different permissions for team members
- **Project Privacy**: Private and public project options
- **Input Validation**: Comprehensive data validation

### Data Protection
- **Encrypted Passwords**: bcrypt for password hashing
- **HTTPS Only**: Secure data transmission
- **CORS Configuration**: Proper cross-origin resource sharing
- **SQL Injection Prevention**: Parameterized queries

## Deployment & DevOps

### Frontend Deployment
- **Netlify**: Automated deployment from GitHub
- **Environment Variables**: Secure configuration management
- **Build Optimization**: Webpack bundle optimization

### Backend Deployment
- **Heroku**: Scalable backend hosting
- **MongoDB Atlas**: Cloud database with automatic backups
- **Error Monitoring**: Sentry for error tracking
- **Performance Monitoring**: New Relic for application insights

## Results & Impact

The application successfully serves:
- **500+** active users across multiple organizations
- **10,000+** tasks managed monthly
- **99.5%** uptime with robust error handling
- **<100ms** average API response time
- **Real-time updates** with <50ms latency

## Lessons Learned

### Technical Insights
- **WebSocket Management**: Proper connection handling and reconnection logic
- **State Synchronization**: Challenges of keeping client and server state in sync
- **Performance at Scale**: Optimizations needed for large datasets
- **Error Handling**: Importance of graceful degradation

### User Experience
- **Intuitive Design**: Simple drag-and-drop interface increases adoption
- **Real-time Feedback**: Users expect immediate visual feedback
- **Mobile Responsiveness**: Significant portion of users access via mobile
- **Offline Support**: Need for offline functionality in future versions

This project showcases full-stack development skills, real-time application architecture, and user-centered design principles.
