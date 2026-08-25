🎯 Mini Challenge: React State Management — Team Profile Manager (Lite)

    A stripped-down version of the full challenge, focused purely on practicing
    the SYNTAX and CORE CONCEPT of each state-management tool — not on building
    a complete app.

    No backend. No API. No database. No authentication.

🎯 Goal

One clear, working example of each of:

    useState
    Controlled inputs
    Derived state
    Lifting state up
    useReducer
    useContext
    useEffect
    Zustand (one small, justified use)

If you can build this and explain each piece, you've drilled the syntax enough
to tackle the full-size challenge (or any real project) without hesitating on
"wait, how do I write this hook again."

🛠️ Rules

Same as the full challenge:

You ARE allowed: React, useState, useEffect, useReducer, useContext, Zustand, CSS/Tailwind
You are NOT allowed: API calls, backend, Redux, localStorage, useMemo, useCallback, useRef, custom hooks

📝 Step 1 — Static Data

Create 4–5 profiles in `src/data/profiles.js`:

{
  id: 1,
  name: "Malek Amrani",
  role: "Frontend Developer",
  active: true
}

That's it — no departments, no skills array, no dates. Just enough fields to
have something to render, search, and toggle.

⚛️ Step 2 — useState: Render + Search (no filter yet)

Create `ProfileList` + `ProfileCard`.

    ProfileList holds `profiles` and `searchText` in useState
    Derive `filteredProfiles` from `profiles.filter(...)` — do NOT store it in state
    ProfileCard just renders one profile via props

This alone drills: useState, props, derived state.

✏️ Step 3 — Controlled Form (add one profile)

Create `ProfileForm` with 2 fields: `name`, `role`.

    Every input is controlled (value + onChange tied to useState)
    On submit, the new profile gets added to `profiles` — which lives in
      a parent component, not inside ProfileForm itself

This drills: controlled inputs, state ownership, lifting state up (passing a
setter down as a prop).

🔄 Step 4 — useReducer: Toggle Active + Delete

Replace the plain array `useState` for `profiles` with `useReducer`.

Support exactly two actions:

TOGGLE_ACTIVE
DELETE_PROFILE

Create `src/reducers/profileReducer.js`.

    dispatch({ type: "TOGGLE_ACTIVE", payload: id })
    dispatch({ type: "DELETE_PROFILE", payload: id })

Two actions is enough to feel the dispatch → reducer → new state flow without
needing a full CRUD set.

🌎 Step 5 — useContext: Theme Toggle

Create `AppContext.jsx`:

    createContext()
    An `AppProvider` component owning `theme` via useState
    A themed wrapper div inside the Provider (so the WHOLE app, not just one
      component, changes appearance)

Add a toggle button in a `Header` component, reading `theme`/`setTheme` via
useContext.

This drills: createContext, Provider, useContext, and the classic bug of
calling useContext outside the Provider.

⚡ Step 6 — useEffect: Fake Save Delay

Add one button: "Save".

Clicking it should show `Saving...`, then after ~1 second, `Saved!`.

Use useState for the saving/saved status, and useEffect + setTimeout to
simulate the delay.

This is the ONLY side effect in the mini version — one clean example is enough
to drill the pattern.

🌐 Step 7 — Zustand: One Small Global Value

Create `src/store/useAppStore.js` with exactly ONE piece of state:

currentPage   (e.g. "list" or "form" — used to switch which component shows)

    One action to change it: `setCurrentPage`

Do not put profiles, theme, or anything else in Zustand. The point is to feel
the syntax of `create()` and a selector — not to build real page routing.

✅ Done Criteria

You're finished when you can:

    Render + search profiles (useState + derived state)
    Add a profile via a controlled form (lifted state)
    Toggle active / delete a profile (useReducer)
    Toggle app-wide theme (useContext)
    Click Save and see Saving... → Saved! (useEffect)
    Switch between two "pages" using one Zustand value

🧠 Quick Self-Check (answer out loud, no need to write it down)

    Why is `filteredProfiles` not stored in state?
    Why can't `ProfileForm` hold the `profiles` array itself?
    What's the difference between `dispatch(...)` and calling a setter directly?
    Why does the themed wrapper have to live INSIDE the Provider?
    Why is the Save button's delay a side effect and not a calculation?
    Why does `currentPage` belong in Zustand but `theme` doesn't?

🚫 Explicitly Skipped (build these later, in the full-size challenge)

    Department filters / lifted ProfileFilters component
    Multi-select + bulk actions
    Activity log
    Dashboard statistics
    Full CRUD (edit profile)
    STATE_ARCHITECTURE.md documentation

This mini version is for muscle memory. The full challenge (with all 17 tasks)
is for practicing actual architecture decisions under more realistic pressure.
