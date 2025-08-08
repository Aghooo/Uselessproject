# Overview

This is an interactive printer simulator web application that provides a playful user experience mimicking real-world printing operations. Users can upload various file types (PDF, DOC, DOCX, JPG, PNG) through an animated printer interface, watch paper animations during processing, and receive interactive tearable bills with randomly generated pricing in Indian rupees. The application focuses on visual engagement through smooth animations and interactive elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Animations**: Framer Motion for smooth animations and transitions
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with centralized route handling
- **File Handling**: Multer middleware for multipart file uploads with size and type validation
- **Error Handling**: Centralized error handling middleware with structured error responses

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for rapid development
- **Connection**: Neon Database serverless for PostgreSQL hosting

## Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: Full TypeScript implementation with shared types between frontend and backend
- **Component Composition**: Reusable UI components following atomic design principles
- **Progressive Enhancement**: Fallback storage implementation allows development without database dependency

## Authentication and File Processing
- **File Validation**: Server-side file type and size validation (10MB limit)
- **Receipt Generation**: Automatic receipt number generation with year-based prefixing
- **Price Calculation**: Random pricing algorithm (10-200 rupees base rate)
- **Interactive Elements**: Tearable bill interface with mouse and touch event handling

# External Dependencies

## Core Framework Dependencies
- **@vitejs/plugin-react**: React integration for Vite
- **express**: Web application framework
- **wouter**: Lightweight routing library

## Database and ORM
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Schema management and migrations
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **connect-pg-simple**: PostgreSQL session store

## UI and Styling
- **@radix-ui/***: Comprehensive collection of unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **framer-motion**: Animation library for React

## Form and Validation
- **react-hook-form**: Performant forms library
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Zod integration for Drizzle schemas

## Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

## File Processing
- **multer**: Middleware for handling multipart/form-data file uploads
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: URL-safe unique string ID generator