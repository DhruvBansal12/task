# GoodDay - Modern SaaS Project Management Platform

A fully-featured, production-quality project management and productivity platform built with Next.js 15, React, TypeScript, and Tailwind CSS. Inspired by Linear, Notion, ClickUp, and Asana.

## ✨ Features

### Core Features
- **Authentication System** - Login/Register with localStorage-based sessions
- **Workspace Management** - Create and manage multiple workspaces
- **Project Management** - Create, update, and track projects with progress
- **Task Management** - Full task CRUD with priorities, due dates, and status tracking
- **Kanban Board** - Visual drag-and-drop task management (UI ready)
- **Calendar View** - Task scheduling and deadline tracking
- **Analytics Dashboard** - Productivity insights with charts and graphs
- **Team Collaboration** - Comments, mentions, and activity tracking
- **Notifications** - Task updates and activity notifications
- **Settings** - Profile, preferences, and theme management

### UI/UX Features
- Dark modern SaaS design with glassmorphism
- Smooth animations and transitions (Framer Motion)
- Fully responsive (mobile, tablet, desktop)
- Beautiful gradient effects and hover interactions
- Loading states and empty states
- Professional enterprise appearance

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Reusable components
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **Recharts** - Data visualization

### State Management & Storage
- **Zustand** - Global state management
- **localStorage** - Data persistence (no backend needed)

### Development
- **ESLint** - Code quality
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing

## 📋 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── auth/              # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Projects pages
│   │   ├── page.tsx
│   │   └── kanban/
│   ├── calendar/          # Calendar view
│   ├── analytics/         # Analytics dashboard
│   ├── settings/          # Settings page
│   └── notifications/     # Notifications page
│
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Card, Input, etc.)
│   ├── layout/           # Layout components (Sidebar, Topbar)
│   └── providers.tsx     # App providers
│
├── modules/              # Feature modules
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── services/             # Business logic & localStorage services
├── utils/                # Helper utilities
├── lib/                  # Library code
├── constants/            # Constants and enums
├── types/                # TypeScript types
├── data/                 # Demo data
└── styles/               # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   cd task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Demo Accounts
The app includes pre-populated demo data for testing:

- **Email:** john@example.com (any password)
- **Email:** jane@example.com (any password)
- **Email:** bob@example.com (any password)

All demo data is automatically created on first load.

### Key Workflows

#### Create a Workspace
1. Log in to your account
2. Click "Create Workspace" on the dashboard
3. Enter workspace name and description
4. Start creating projects

#### Create a Project
1. Go to Projects page
2. Click "New Project"
3. Enter project details
4. Track progress and add tasks

#### Manage Tasks
- **Dashboard** - Overview of all tasks
- **Kanban Board** - Drag tasks between status columns
- **Calendar** - View tasks by due date
- **Analytics** - Track productivity metrics

## 🗄️ Data Persistence

All data is stored in localStorage:
- Users and authentication
- Workspaces and members
- Projects and progress
- Tasks and status
- Comments and notifications
- Settings and preferences

Data persists across browser sessions and is cleared only when browser storage is cleared.

## 🎨 Design System

### Color Palette
- **Primary:** #6C63FF (Purple)
- **Accent:** #00C2FF (Cyan)
- **Background:** #0B0F19 (Dark Blue)
- **Secondary:** #1A1E2E
- **Tertiary:** #252B3B

### Typography
- **Font:** Inter, System UI
- **Weights:** 400, 500, 600, 700
- **Sizes:** xs (12px) to 5xl (48px)

### Components
- Rounded corners (2xl = 16px)
- Soft shadows for depth
- Glassmorphism effects
- Smooth transitions (200ms-500ms)

## 📦 Build for Production

```bash
npm run build
npm start
```

The app will be optimized and ready for deployment.

## 🔧 Configuration

### Environment Variables
Currently, no environment variables are required. The app works entirely client-side.

### Tailwind Config
Customizable in `tailwind.config.ts`:
- Colors
- Typography
- Spacing
- Animations
- Breakpoints

## 🚦 Roadmap & Future Features

### Planned
- MongoDB integration for persistent backend
- Real-time collaboration with WebSockets
- File uploads and attachment management
- Advanced permission system
- Custom workflows
- Slack/Teams integration
- AI-powered features
- Dark/light theme toggle
- Mobile app

## 📝 Code Examples

### Creating a Task
```typescript
const { createTask } = useTaskStore()
createTask(
  projectId,
  workspaceId,
  'Task Title',
  'Description',
  'high',
  dueDate,
  assigneeId
)
```

### Updating Workspace
```typescript
const { updateWorkspace } = useWorkspaceStore()
updateWorkspace(workspaceId, {
  name: 'New Name',
  description: 'New Description'
})
```

### Using Custom Hooks
```typescript
import { useMounted, useLocalStorage, useDebounce } from '@hooks'

const isMounted = useMounted()
const [value, setValue] = useLocalStorage('key', defaultValue)
const debouncedValue = useDebounce(value, 500)
```

## 🧪 Testing

The application includes demo data that allows you to test all features:
- Create/update/delete workspaces
- Create/update/delete projects and tasks
- Change task status and priority
- View analytics and calendar
- Test all navigation flows

## 📱 Responsive Design

The app is fully responsive:
- **Mobile** - Single column, touch-optimized
- **Tablet** - Two-column layout
- **Desktop** - Multi-column with full features

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Color contrast compliance

## 🤝 Contributing

This is a demo project for learning and showcase purposes. Feel free to fork and extend!

## 📄 License

MIT License - feel free to use this project as a foundation for your own applications.

## 🙋 Support

For questions or issues:
1. Check existing code comments
2. Review the project structure
3. Examine the demo data initialization

## 🎓 Learning Resources

This project demonstrates:
- Next.js 15 App Router
- React hooks and state management
- TypeScript best practices
- Tailwind CSS theming
- localStorage-based persistence
- Component composition patterns
- Responsive design
- Animation techniques

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
```

The app works entirely on the client, so it can be deployed as a static site.
