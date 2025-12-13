# Vivekanand Upadhyay Career Counselling Website

## Overview

A hypermodern career counselling website for Vivekanand Upadhyay, an Ex Army Physician turned Career Counsellor. The platform showcases career guidance services for students, parents, schools, colleges, corporates, and working professionals. Features include service listings, pricing plans with Razorpay payment integration, blog content, contact forms, and testimonials. Built with a visually stunning UI emphasizing glassmorphism, smooth animations, and responsive design with light/dark theme support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for Replit environment
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Build**: esbuild for production bundling with Vite for client assets

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Current Storage**: In-memory storage (`server/storage.ts`) with database schema ready for PostgreSQL migration
- **Tables**: Users and Orders for payment tracking

### Payment Integration
- **Provider**: Razorpay for Indian payment processing
- **Flow**: Server creates order, client handles checkout, server verifies payment signature
- **Credentials**: Environment variables `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### Design System
- **Theme**: Light/dark mode with localStorage persistence
- **Colors**: Custom CSS variables with HSL values for easy theming
- **Typography**: Inter, Poppins, DM Sans font families
- **Effects**: Glassmorphism, gradient overlays, custom cursor animations
- **Responsive**: Mobile-first with breakpoint-based layouts

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-based page components
│   ├── lib/             # Utilities and context providers
│   └── hooks/           # Custom React hooks
├── server/              # Express backend
│   ├── routes.ts        # API endpoint definitions
│   ├── storage.ts       # Data persistence layer
│   └── db.ts            # Database connection
├── shared/              # Shared code (schemas, types)
└── attached_assets/     # Static images and design docs
```

## External Dependencies

### Payment Processing
- **Razorpay**: Payment gateway for handling transactions (requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables)

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database toolkit for type-safe queries and migrations

### Third-Party Services
- **WhatsApp Business**: Floating chat widget linking to `wa.me/917030502200`
- **Google Fonts**: Web fonts loaded via CDN

### Key npm Packages
- `@tanstack/react-query`: Async state management
- `drizzle-orm` + `drizzle-zod`: Database ORM with Zod schema integration
- `framer-motion`: Animation library
- `react-hook-form` + `zod`: Form handling with validation
- `wouter`: Client-side routing
- `razorpay`: Server-side payment SDK