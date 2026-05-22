# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Docs

**Before generating any code, always consult the relevant file in the `/docs` directory first.** The `/docs` directory contains coding standards and conventions that must be followed throughout this project. Do not write code that conflicts with those standards:

- /docs/ui.md
- /docs/data-fetching.md

## Project

A lifting diary web app built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Currently at the scaffold stage — no application code has been written yet.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint (Next.js flat config, eslint.config.mjs)
```

No test runner is configured yet.

## Stack notes

- **Next.js 16** with the App Router (`src/app/`). Check `node_modules/next/dist/docs/` before writing any Next.js code — APIs may differ from training data.
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss` in `postcss.config.mjs`. v4 uses a CSS-first config (`globals.css`) rather than `tailwind.config.js`.
- **TypeScript** strict mode is on (`tsconfig.json`).
- Root layout (`src/app/layout.tsx`) uses Geist fonts via `next/font/google` and applies them as CSS variables.
