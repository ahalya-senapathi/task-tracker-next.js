# task-tracker-next.js
# Task Tracker

A simple, fast to-do app built with **Next.js** and **React**. Add tasks, tick them off, filter by status, and your list is saved in the browser, so it's still there when you come back.

**Live demo:**https://ahalya-senapathi.github.io/task-tracker-next.js/

## Features

- Add new tasks
- Mark tasks as done or not done
- Delete individual tasks
- Filter by **All**, **Active** or **Done**
- See how many tasks are left
- Clear all finished tasks in one click
- Tasks persist after refresh using `localStorage`
- Keyboard and screen reader friendly (labels, ARIA attributes, visible focus styles)
- Responsive layout for phones and desktops

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) with static export
- [React](https://react.dev/) (hooks)
- JavaScript (ES6+) and JSX
- Plain CSS (Flexbox and CSS variables)
- GitHub Actions and GitHub Pages for deployment

## React and Next.js concepts demonstrated

- Client components (`'use client'`)
- State with `useState`
- Side effects with `useEffect`
- Controlled inputs and event handling
- Rendering lists with `map()` and `key`
- Conditional rendering
- Derived state and immutable updates
- Avoiding hydration mismatches when reading `localStorage`
- Static site export with `output: 'export'`

## Project structure

```
task-tracker/
├── app/
│   ├── layout.js        # Root layout (html, body, page metadata)
│   ├── page.js          # Home page with the Task Tracker component
│   └── globals.css      # All styling
├── .github/workflows/
│   └── deploy.yml       # Builds and deploys to GitHub Pages
├── next.config.mjs      # Static export and basePath settings
├── package.json
└── README.md
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [Git](https://git-scm.com/)

### Run locally

```bash
git clone https://github.com/ahalya-senapathi/task-tracker.git
cd task-tracker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If you see a 404, try
[http://localhost:3000/task-tracker](http://localhost:3000/task-tracker), because the
`basePath` in `next.config.mjs` may be active in development.

### Build for production

```bash
npm run build
```

This generates a static site in the `out` folder.

## Deployment

The site is deployed to GitHub Pages with GitHub Actions:

1. Push to the `main` branch.
2. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds the project and publishes the `out` folder.
3. In the repository, **Settings → Pages → Source** must be set to **GitHub Actions**.

`basePath` in `next.config.mjs` must match the repository name (`/task-tracker`), otherwise styles and scripts won't load on GitHub Pages.

## How it works

- Tasks are stored as objects: `{ id, title, done }`.
- On first load, saved tasks are read from `localStorage` inside a `useEffect`, because `localStorage` isn't available during server-side pre-rendering.
- A `loaded` flag prevents the save effect from overwriting saved tasks with an empty list before loading finishes.
- The visible list and the "left to do" count are calculated from state on each render instead of being stored.

## Possible improvements

- Edit existing tasks
- Due dates and priorities
- Split the page into reusable components (`TaskForm`, `TaskList`, `TaskItem`)
- Unit tests with React Testing Library
- Dark mode
- Sync across devices with a backend

## Author

**Ahalya Senapathi**
[GitHub](https://github.com/ahalya-senapathi)
