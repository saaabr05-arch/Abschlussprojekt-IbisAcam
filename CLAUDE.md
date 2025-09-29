# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Development Workflow
- Use `npm run dev` for local development (includes Turbopack for faster builds)
- Always run `npm run lint` before committing changes
- Run `npm run build` to verify production builds work correctly

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15+ with App Router
- **Authentication**: Supabase Auth with cookie-based sessions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Theming**: next-themes for dark/light mode
- **Type Safety**: TypeScript with strict configuration

### Project Structure
```
app/                    # Next.js App Router pages
├── auth/              # Authentication pages (login, signup, etc.)
├── protected/         # Protected routes requiring authentication
├── quiz/              # Quiz-related pages
├── globals.css        # Global styles and CSS variables
├── layout.tsx         # Root layout with theme provider
└── page.tsx           # Home page

components/            # Reusable React components
├── ui/               # shadcn/ui components
├── tutorial/         # Tutorial-specific components
├── *-form.tsx        # Form components (login, signup, etc.)
└── auth-button.tsx   # Authentication-related components

lib/                   # Utility libraries and configurations
├── supabase/         # Supabase client configurations
│   ├── client.ts     # Browser client
│   ├── server.ts     # Server client
│   └── middleware.ts # Middleware for session management
├── quiz.ts           # Quiz-related utilities
├── types.ts          # TypeScript type definitions
└── utils.ts          # General utility functions
```

### Authentication Flow
- Uses Supabase SSR with cookie-based authentication
- Middleware automatically handles session refresh and protected routes
- Separate client configurations for browser and server contexts
- Authentication state persists across page refreshes and SSR

### Styling System
- Tailwind CSS with custom design tokens via CSS variables
- shadcn/ui component library for consistent UI elements
- Dark/light theme support with next-themes
- Custom color scheme defined in tailwind.config.ts

### Key Configuration Files
- `middleware.ts` - Handles authentication middleware for protected routes
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind configuration with custom theme
- `.env.local` - Environment variables (not tracked in git)

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Notes
- Always create new Supabase server clients within functions (don't use globals)
- The project uses React 19 and Next.js latest features
- TypeScript paths are configured with `@/*` alias pointing to project root
- ESLint is configured with Next.js and TypeScript rules