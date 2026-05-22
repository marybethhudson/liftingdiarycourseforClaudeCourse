# UI Coding Standards

---

## Components

> **Only shadcn/ui components may be used. Creating custom components is strictly prohibited.**

All UI must be built exclusively from the shadcn/ui component library. If a component you need is not yet installed, add it using the CLI:

```bash
npx shadcn@latest add <component-name>
```

Do not:
- Create custom React components for UI elements
- Style raw HTML elements as a substitute for a shadcn/ui component
- Use any other component library

---

## Date Formatting

All dates must be formatted using **date-fns**. No other date library should be used.

### Format

```
do MMM yyyy
```

### Examples

| Raw date | Formatted |
|---|---|
| 2025-09-01 | 1st Sep 2025 |
| 2025-08-02 | 2nd Aug 2025 |
| 2026-01-03 | 3rd Jan 2026 |
| 2024-06-04 | 4th Jun 2024 |

### Usage

```ts
import { format } from 'date-fns';

format(date, 'do MMM yyyy');
```
