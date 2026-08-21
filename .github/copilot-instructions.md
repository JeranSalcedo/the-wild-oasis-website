# The Wild Oasis Website

## Project Overview

This project is a Next.js application using:

- Next.js App Router
- TypeScript
- Server Components by default
- Tailwind CSS
- GitHub Flow with feature branches

## Code Style

- Prefer TypeScript over JavaScript.
- Prefer arrow function components.
- Use named exports for reusable components.
- Use default exports only for Next.js route entry files such as page.tsx and layout.tsx.
- Prefer descriptive variable and function names.
- Keep components small and focused.

## Next.js Conventions

- Use Server Components unless client-side interactivity is required.
- Add `"use client"` only when necessary.
- Use App Router conventions.
- Keep route-specific components close to their routes when appropriate.

## Imports

- Use the configured alias:

```ts
import { Navigation } from "@/components/Navigation";
```

## Project Structure

```
src/
├── app/
├── components/
├── hooks/
├── lib/
└── ...
```

- `app/`: Contains Next.js route files and layouts.
- `components/`: Contains reusable UI components.
- `hooks/`: Contains custom React hooks.
- `lib/`: Contains utility functions and services.

## Git Conventions

Use Conventional Commits for commit messages.

- Format: `<type>(<scope>): <description>`
- Example: `feat(navigation): Add responsive navigation menu`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope: Optional, but can be used to indicate the area of the codebase affected (e.g., `navigation`, `api`, `ui`).
