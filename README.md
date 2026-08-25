# Client-Side State Management — Notes, Challenge & Mini Project

This repo documents my journey learning React's client-side state management tools —
`useState`, `useReducer`, `useContext`, and Zustand — through a structured challenge
and a real mini project built on top of it.

No backend, no database, no authentication. Everything lives in the browser, in
memory, for the lifetime of the session.

---

## 📁 Repo Contents

```
.
├── README.md                     ← you are here
├── STATE_MANAGEMENT.md           ← concept notes: what each tool solves and when to use it
├── CHALLENGE.md                  ← the original Blog & Newsletter Dashboard challenge spec
├── STATE_ARCHITECTURE.md         ← per-project breakdown of where each piece of state lives, and why
└── team-profile-manager/         ← the mini project itself (Vite + React)
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

Most React tutorials teach you *how* to use `useState`, `useReducer`, `useContext`,
or Zustand in isolation. Very few force you to answer the harder question:

> **Given a piece of state, where should it actually live — and why?**

This repo is my attempt to practice that decision-making explicitly, rather than
just making code run. Every state variable in the mini project below is expected
to be defensible: I should be able to point to it and explain why it's local state,
lifted state, Context, a reducer, or global Zustand state — and why it *isn't*
one of the others.

---

## 🧠 STATE_MANAGEMENT.md

A conceptual reference covering:

- What state is, and why updating it triggers a re-render
- `useState` — local component state, controlled inputs
- Lifting state up — sharing state between sibling components via a common parent
- `useReducer` — centralizing multiple related state transitions behind `dispatch`
- `useContext` — avoiding prop drilling for values needed at arbitrary depth
- Zustand — global state shared across unrelated branches of the component tree
- Derived state — why calculated values (like filtered lists or counts) should
  almost never be stored in their own state

---

## 🧪 CHALLENGE.md

The original practice challenge: a **Blog & Newsletter Admin Dashboard**, designed
to force deliberate use of every state-management tool above, without leaning on
any single one for everything (e.g. explicitly *not* allowed to put all state in
Zustand, or all state in Context).

Core features exercised:
- Article CRUD (create, edit, delete, publish/unpublish) via `useReducer`
- Article search & category filtering via local/lifted `useState` + derived data
- Subscriber selection (select/deselect/select all) via local `useState`
- Newsletter composition + simulated async send via `useState` + `useEffect`
- App-wide theme toggle via `useContext`
- Shared app-level state (current page, notifications) via Zustand
- Dashboard statistics — entirely derived, never stored separately

---

## 👥 Mini Project — Team Profile Manager

A smaller, real project used to practice the same concepts in a more concrete
domain: a team/profile management dashboard rather than a blog.

**Structure:**

```
App
├── Header               (theme toggle, reads Context)
├── ProfileForm           (add a new profile — local form state, lifts new
│                          profiles up to App via a setter passed as a prop)
└── ProfileList           (maps profiles → ProfileCard)
    └── ProfileCard
        ├── Delete button
        ├── Edit button
        └── ProfileEditForm
```

**State decisions made in this project:**

| State | Lives in | Why |
|---|---|---|
| `profiles` (the array) | `App`, via `useState` | Owned by the top-level component since multiple children (form, list) need to read or modify it |
| Form fields (name, role, skills, etc.) | `ProfileForm`, via `useState` | Purely local — no other component needs to know what's being typed before submission |
| `theme` / `setTheme` | `Context` (`AppContext.jsx`) | Needed at arbitrary depth (header toggle, themed wrapper) — a textbook Context use case, unlike the profiles data which only ever passes one level via props |
| Adding a profile | Callback prop (`setProfiles` passed down to `ProfileForm`) | `ProfileForm` doesn't own the array, so it lifts the new profile up rather than keeping its own separate copy of `profiles` |

A key lesson from building this: **Context solves a depth problem, not a
"passing props is annoying" problem.** Most of this app's data only travels
one level (parent → direct child), which is normal prop usage, not prop
drilling — so most of the state stays as plain `useState` + props, and Context
is reserved specifically for theme, which genuinely needs to reach components
at unpredictable depth.

Full reasoning for every state variable is documented in
[`STATE_ARCHITECTURE.md`](./STATE_ARCHITECTURE.md).

---

## ▶️ Running the mini project

```bash
cd team-profile-manager
npm install
npm run dev
```

---

## 📝 License

Personal learning project — free to reference or reuse.
