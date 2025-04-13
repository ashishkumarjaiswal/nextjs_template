# NextJS Template

A modern Next.js 15 project template with authentication, Prisma ORM, and Tailwind CSS styling.

## Features

- ⚡ **Next.js 15.2.0** with Turbopack for fast development
- 🔒 **Authentication** via NextAuth.js
- 💾 **Database ORM** with Prisma
- 🎨 **Styling** with Tailwind CSS and shadcn/ui components
- 📝 **Type Safety** with TypeScript
- 🧹 **Code Quality** with ESLint, Prettier, and Husky

## Project Structure

```
├── .husky               # Git hooks
├── api                  # API routes
├── components           # Reusable React components
├── lib                  # Utility functions and shared code
│   ├── db.ts            # Database client
│   └── utils.ts         # Helper utilities
├── prisma               # Database schema and seed data
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Seed script
├── public               # Static assets
├── server               # Server-side code
│   ├── actions          # Server actions
│   ├── functions        # Server functions
│   ├── auth.ts          # Authentication configuration
│   └── types            # Type definitions
├── types                # Type definitions
└── middleware.ts        # Next.js middleware
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone this repository

```bash
git clone <repository-url>
cd nextjs_template
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp env.example .env
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run postinstall` - Generate Prisma client
- `npm run prepare` - Set up Husky

## Database

This template uses Prisma ORM with a database. To set up the database:

1. Update the `DATABASE_URL` in your `.env` file
2. Run database migrations:

```bash
npx prisma migrate dev
```

3. Seed the database (if needed):

```bash
npx prisma db seed
```

## Authentication

NextAuth.js is configured for authentication. Configure providers in `server/auth.ts`.

## Deployment

The project can be easily deployed to Vercel or any other platform that supports Next.js.

```bash
npm run build
npm run start
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
