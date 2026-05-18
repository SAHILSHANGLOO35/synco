# Synco

A workflow automation platform that lets you create automated syncs by connecting events to actions. Define a trigger, chain actions together, and let Synco handle the rest.

## Overview

Synco enables users to build automated workflows without code. Create a sync by selecting a trigger event and configuring one or more actions that execute in sequence. Workflows run reliably through a structured execution pipeline, ensuring consistent automation.

### Core Features

- **Trigger System**: Choose from available trigger types to start your workflow when specific events occur
- **Action Chaining**: Configure multiple actions that execute sequentially in order
- **Execution Pipeline**: Each workflow runs through a reliable, structured processing pipeline
- **User Workspace**: Manage and monitor all your syncs from a centralized dashboard
- **Integration Support**: Support for email and blockchain (Solana) services

## Architecture

Synco is built as a monorepo containing:

- **Frontend** (`apps/frontend`): Next.js application with user interface
- **Primary Backend** (`apps/primary-backend`): Express API for core operations
- **Worker** (`apps/worker`): Background job processor for email and Solana tasks
- **Webhooks** (`apps/webhooks`): Webhook handling service
- **Outbox Processor** (`apps/outbox-processor`): Asynchronous message processing
- **Database** (`packages/db`): Prisma ORM with PostgreSQL

## Prerequisites

- Node.js >= 20
- Bun >= 1.3.1 (package manager)
- PostgreSQL database
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SAHILSHANGLOO35/synco.git
cd synco
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Setup

Create `.env.local` files in each app directory:

**`apps/frontend/.env.local`**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**`apps/primary-backend/.env.local`**

```
DATABASE_URL=postgresql://user:password@localhost:5432/synco
DIRECT_URL=postgresql://user:password@localhost:5432/synco
PORT=3001
```

**`apps/worker/.env.local`**

```
DATABASE_URL=postgresql://user:password@localhost:5432/synco
```

Replace `user`, `password`, and database connection details with your actual PostgreSQL credentials.

### 4. Database Setup

Initialize the database schema:

```bash
cd packages/db
bunx prisma migrate dev
```

This creates all necessary tables and runs migrations.

### 5. Start Development Server

From the root directory, start all services:

```bash
bun run dev
```

This starts the frontend (localhost:3000), backend (localhost:3001), and other services in development mode.

## Project Structure

```
synco/
├── apps/
│   ├── frontend/              # Next.js web application
│   ├── primary-backend/       # Express API server
│   ├── worker/               # Background job processor
│   ├── webhooks/             # Webhook service
│   └── outbox-processor/     # Message queue processor
├── packages/
│   ├── db/                   # Prisma schema and migrations
│   ├── eslint-config/        # Shared ESLint configuration
│   └── typescript-config/    # Shared TypeScript configuration
└── package.json              # Root workspace configuration
```

## Development

### Available Commands

From the root directory:

```bash
# Start all services in development mode
bun run dev

# Build all packages
bun run build

# Run linting
bun run lint

# Format code
bun run format

# Type check all packages
bun run typecheck
```

Each command runs across all apps and packages in the monorepo.

### Adding New Components

To add UI components to the frontend:

```bash
cd apps/frontend
bun dlx shadcn@latest add <component-name>
```

This integrates shadcn/ui components into the project.

## Demo Usage

### Creating Your First Sync

1. Start the development server (`bun run dev`)
2. Open http://localhost:3000 in your browser
3. Sign up or log in to your account
4. Navigate to the dashboard
5. Click "Create Sync"
6. Select a trigger event
7. Configure trigger parameters
8. Add one or more actions
9. Save your sync

Your workflow is now active and will execute automatically when the trigger condition is met.

> **Note:** While Synco includes support for Solana-related workflow logic and blockchain integration concepts, this project does **not perform actual on-chain Solana token transfers or transactions**. The current implementation focuses on workflow orchestration and simulated blockchain automation.

## Database

Synco uses PostgreSQL with Prisma ORM. Key entities:

- **User**: User account and authentication
- **Sync**: Represents a single workflow with trigger and actions
- **Trigger**: The event that starts a sync
- **Action**: Tasks that execute when trigger fires
- **SyncRun**: Record of each sync execution

See `packages/db/prisma/schema.prisma` for the complete data model.

> **Important:** Blockchain-related actions in this project are implemented as workflow automation logic only. They demonstrate how Solana integrations can be structured, but they do not execute real blockchain transactions on the Solana network.

## Deployment

### Build for Production

```bash
bun run build
```

This creates production-optimized builds for all services.

### Frontend Deployment

The frontend can be deployed to any Node.js hosting platform or serverless environment that supports Next.js:

- Vercel (recommended)
- AWS Amplify
- Railway
- Any Docker-compatible platform

### Backend Deployment

The backend services can be deployed to:

- Traditional VPS/cloud servers
- Docker containers
- Kubernetes clusters
- Serverless platforms with appropriate configuration

Ensure all environment variables are properly configured in your deployment environment.

## Screenshots

### Landing Page

![Landing Page of Synco showing hero section with call-to-action](docs/screenshots/synco-full-landing-page.jpg)

### Dashboard

![Dashboard with lists syncs and webhook that you can copy](docs/screenshots/synco-dashboard.png)

### Create Sync Flow

![Create sync flow / (trigger, actions) selection - Setting up flows for a sync](docs/screenshots/synco-flow-area.png)

## Contributing

Contributions are welcome. Please ensure:

- Code passes linting: `bun run lint`
- TypeScript compilation succeeds: `bun run typecheck`
- Code is formatted: `bun run format`

## Support

For issues, questions, or suggestions, please open an issue on the repository.

## License

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
