# Client-Side State Management — Notes, Challenge & Team Profile Manager

This repo documents my journey learning React's client-side state management —
`useState`, `useReducer`, `useContext`, and Zustand — through a written challenge
and a real, in-progress mini project built on top of it.

No backend, no database, no authentication. Everything lives in the browser, in
memory, for the lifetime of the session.

---

## 📁 Repo Contents

```
.
├── README.md                     ← you are here
├── STATE_MANAGEMENT.md           ← concept notes: what each tool solves and when to use it
├── TEAM_PROFILE_MANAGER_CHALLENGE.md   ← the challenge spec this project is built from
├── STATE_ARCHITECTURE.md         ← per-project breakdown of where each piece of state lives, and why (in progress)
└── team-manager/                 ← the mini project itself (Vite + React)
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── reducers/
    │   ├── store/
    │   └── data/
    └── ...
```

---

## 🎯 Why this repo exists

Most React tutorials teach *how* to use `useState`, `useReducer`, `useContext`,
or Zustand in isolation. Very few force the harder question:

> **Given a piece of state, where should it actually live — and why?**

This repo is a deliberate exercise in that decision-making, not just making
code run. Every state variable in the Team Manager project below is meant to be
defensible: I should be able to point to it and explain why it's local state,
lifted state, Context, a reducer, or global Zustand state — and why it *isn't*
one of the others.

---

## 🧠 STATE_MANAGEMENT.md

A single consolidated reference covering:

- What state is, and why updating it triggers a re-render
- `useState` — local component state, controlled inputs, functional updates, batching
- Lifting state up — sharing state between sibling components via a common parent
- `useReducer` — centralizing multiple related state transitions behind `dispatch`
- `useContext` — avoiding prop drilling for values needed at arbitrary depth
- `useReducer` + `useContext` combined
- Zustand — global state shared across unrelated branches of the component tree
- `useEffect` — side effects, dependency arrays, cleanup
- `useLayoutEffect` — the edge case, and why to default to `useEffect` instead
- Derived state — why calculated values (filtered lists, counts) shouldn't be
  stored separately

Includes real bugs hit while building this project (e.g. calling `useContext`
in the same component that creates the Provider, styling not visually
"spreading" to sibling components) as callouts next to the relevant concept.

---

## 🧪 TEAM_PROFILE_MANAGER_CHALLENGE.md

The practice challenge this project is built from — a **Team Profile Manager**,
adapted from a Blog & Newsletter Dashboard challenge into a more relevant
domain, but keeping the same structure and constraints: forced use of every
state-management tool, explicitly *not* allowed to lean on any single one for
everything (e.g. not allowed to put all state in Zustand, or all state in
Context).

Core features it exercises:
- Profile CRUD (add, edit, delete, toggle active) via `useReducer`
- Search & department filtering via local/lifted `useState` + derived data
- Multi-select + bulk deactivate via `useState` + reducer action
- Simulated async "saving" state via `useState` + `useEffect`
- App-wide theme toggle via `useContext`
- Shared app-level state (current page, notifications) via Zustand
- Dashboard statistics — entirely derived, never stored separately
- Activity log of add/edit/delete/bulk actions

---

## 👥 Team Manager — Project Status

**Status: in progress.** This section reflects what's actually built so far,
not the full challenge spec — it'll be updated as more tasks are completed.

### Structure so far

```
App
├── AppProvider          (Context — owns theme, wraps entire app)
│    └── themed wrapper div (applies light/dark background to the whole app)
├── Header                (theme toggle button, reads Context)
├── ProfileForm            (add a new profile — local form state)
└── ProfileList            (maps profiles → ProfileCard)
    └── ProfileCard
        ├── Delete button
        └── Edit button
```

### ✅ Done

- Static profile data seeded
- `profiles` array owned by `App`, passed down to `ProfileList`/`ProfileForm`
- `ProfileCard` renders a single profile from props
- Theme (`light`/`dark`) implemented via `useContext`:
  - `AppContext.jsx` — `createContext()` + `AppProvider` owning `theme` state
  - `Header` toggles theme via a button
  - Themed wrapper `<div>` lives *inside* `AppProvider`, so the whole app
    (not just the header) reflects the current theme
  - Dark mode styled in a dark blue palette, light mode in a neutral palette,
    with a smooth transition between them

### 🚧 In progress / not yet built

- Adding a profile from `ProfileForm` (lifting the new profile up to `App`'s
  `profiles` state via a `setProfiles` prop)
- Editing / deleting a profile
- Refactoring profile operations into `useReducer` (add/edit/delete/bulk actions)
- Search + department filtering (`useState` + derived `filteredProfiles`)
- Multi-select + bulk deactivate
- Simulated saving state via `useEffect`
- Activity log
- Zustand store for `currentPage`/`notifications`
- Dashboard with derived stats
- `STATE_ARCHITECTURE.md` — will be written once each corresponding piece of
  state actually exists in the code, not before

### Key lesson so far

**Context solves a depth problem, not a "passing props is annoying" problem.**
Most of this app's data only travels one level (parent → direct child), which
is normal prop usage, not prop drilling — so most state stays as plain
`useState` + props. Context is reserved specifically for theme, which
genuinely needs to reach components at unpredictable depth. Reaching for
Context (or a reducer) just because a hook exists, without a real problem to
justify it, is the exact over-engineering trap this whole exercise is designed
to catch.

---

## ▶️ Running the project

```bash
cd team-manager
npm install
npm run dev
```

---

## 📝 License

Personal learning project — free to reference or reuse.