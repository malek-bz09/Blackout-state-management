# Client-Side State Management Notes

Concepts, in the order problems actually force you to learn them — not a list of
APIs to memorize, but a chain of "here's what breaks, here's what fixes it."

---

## 1. React Fundamentals

### What is React?

React is a JavaScript library for building user interfaces using **components**.

Without React:

```js
document.getElementById("title").innerText = "Hello";
```

we'd manually find elements and mutate the DOM. That gets hard to maintain fast —
the UI can silently drift out of sync with your data.

With React, we describe *what the UI should look like* for a given state, and
React handles updating the DOM to match:

```text
State changes
     ↓
React rerenders
     ↓
React updates the necessary UI
```

### Components

A React app is a tree of components:

```text
App
 ├── Header
 ├── ProfileList
 │    └── ProfileCard
 └── Footer
```

```jsx
function ProfileCard() {
  return <h2>Malek</h2>;
}
```

### JSX

JSX is HTML-like syntax inside JavaScript, compiled by React into real JS calls.

```jsx
<h1>Hello</h1>
```

### Rendering

Rendering means React calls your component function to get the current UI
description:

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

**Rendering should be pure** — a component should only describe UI, not perform
side effects (alerts, API calls, timers) directly in its body:

```jsx
// Bad — side effect during render
function App() {
  alert("Hello");
  return <h1>Hello</h1>;
}

// Good
function App() {
  return <h1>Hello</h1>;
}
```

(Side effects have their own dedicated tool — see `useEffect`, further down.)

### Props

Props pass data from a parent to a child, one direction only:

```jsx
function App() {
  return <ProfileCard name="Malek" />;
}

function ProfileCard({ name }) {
  return <h2>{name}</h2>;
}
```

```text
Parent
  ↓
Props
  ↓
Child
```

### Prop Drilling

Prop drilling is when data has to pass *through* components that don't actually
use it, just to reach one that does:

```text
App
 ↓ user
Dashboard
 ↓ user
ProfileSection
 ↓ user
Profile
```

`Dashboard` and `ProfileSection` are just forwarding `user` — they don't read it
themselves. As the tree gets deeper, this becomes annoying to maintain.

> ⚠️ **Not every parent→child prop is drilling.** If a parent passes data straight
> to a *direct* child that actually uses it, that's just normal props — no
> problem to solve. Drilling specifically means passing something through one or
> more *uninterested middlemen*. Reaching for Context for a simple one-level
> parent→child relationship is a common over-engineering mistake — see the
> `useContext` section for a real example of this trap.

---

## 2. useState

### Why normal variables don't work

```jsx
function Counter() {
  let count = 0;

  function increment() {
    count++;
  }

  return <button onClick={increment}>{count}</button>;
}
```

When `increment()` runs, `count` does change — but React was never told to
render again, so the UI doesn't update. And even if it did rerender, the
function runs from the top again:

```js
let count = 0; // recreated every render — the old value is lost
```

Normal local variables don't persist between renders. **State does.**

### What is state?

State is data React stores *between* renders, which — when updated — tells
React to schedule a rerender.

```text
State
 ↓ stored between renders
update state
 ↓
React schedules a rerender
 ↓
component runs again
 ↓
new UI
```

### useState()

```jsx
const [count, setCount] = useState(0);
```

- `count` — the current value
- `setCount` — the function that updates it and triggers a rerender
- `0` — the initial value

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### setState doesn't change the *current* render

```jsx
function increment() {
  setCount(1);
  console.log(count); // still logs the OLD value, e.g. 0
}
```

`setCount(1)` schedules the update — it doesn't retroactively change `count`
inside the function that's already running. The current execution finishes with
the old value; the *next* render sees the new one.

```text
Current render: count = 0
     ↓
setCount(1)             ← scheduled, not immediate
     ↓
rest of current function still sees count = 0
     ↓
Next render: count = 1
```

### Functional updates

```jsx
setCount(count + 1);
setCount(count + 1);
```

Both lines use `count` from the *same* render — if `count` was `0` when this
ran, both calls are really `setCount(0 + 1)`. Final result: `1`, not `2`.

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

The functional form receives the actual latest value each time, so these chain
correctly: `0 → 1 → 2`. Final result: `2`.

> **Rule:** if the new state depends on the *previous* state, use the functional
> form `setX(prev => ...)`.

### Batching

React can group multiple state updates from the same event handler into a
single rerender, rather than rerendering after each one:

```jsx
function increment() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

Because these are functional updates, they still chain correctly (`0→1→2→3`)
even though React only rerenders once at the end. If these had been written the
non-functional way (`setCount(count + 1)` three times), batching would make the
stale-closure problem *worse*, not better — all three would use the same stale
`count` and the final result would still be `1`, not `3`.

### State Ownership & Closest Common Parent

When multiple components need the same state, ask: **who is the closest common
parent of everyone who needs it?** Put the state there.

```text
Dashboard
├── ProfileList
└── ProfileForm
```

If both need `profiles`, it lives in `Dashboard` (or `App`), not in either
child.

### Lifting State Up

Moving state from a child into a shared parent is called lifting state up.

```text
Before:                          After:
App                               App
 ├── ProfileForm                   └── profiles state
 │     └── profiles state               ├── ProfileForm  (receives via props)
 └── ProfileList                        └── ProfileList   (receives via props)
```

The parent passes data down as props, and passes a setter/callback down so
children can request changes:

```jsx
function App() {
  const [profiles, setProfiles] = useState([]);
  return (
    <>
      <ProfileForm setProfiles={setProfiles} />
      <ProfileList profiles={profiles} />
    </>
  );
}
```

> 🐛 **Real bug worth knowing:** if `ProfileForm` tries to call `setProfiles`
> without receiving it as a prop first, you get `setProfiles is not defined`.
> The fix isn't to declare a *new*, separate `useState` inside `ProfileForm` —
> that would create a second, disconnected copy of the array. The fix is to
> actually pass `setProfiles` down from wherever `profiles` really lives.

### Controlled Inputs

An input whose value is fully driven by React state:

```jsx
function Form() {
  const [name, setName] = useState("");
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

```text
User types → onChange → setName(...) → state changes → rerender → input shows new value
```

React is the single source of truth for what the input displays.

### One Source of Truth / Avoid Duplicated State

```js
// Bad — selectedProfile duplicates data already in profiles
profiles
selectedProfile
selectedProfileId

// Good — derive it
profiles
selectedProfileId
```

```js
const selectedProfile = profiles.find(p => p.id === selectedProfileId);
```

### Derived State

If a value can be *calculated* from existing state, don't store it separately.

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

// don't do this:
// const [fullName, setFullName] = useState("");

// do this instead:
const fullName = `${firstName} ${lastName}`;
```

Same idea applies to filtered lists, counts, totals — anything computable from
state you already have. Storing it separately means it can silently go stale
whenever the source state changes but you forget to update the copy.

### Immutability

Never mutate state directly — always create a new array/object.

```js
// Bad
state.count++;
profiles.push(profile);
user.name = "Ahmed";

// Good
{ ...state, count: state.count + 1 }
[...profiles, profile]
{ ...user, name: "Ahmed" }
```

React detects changes by comparing references — mutating in place doesn't
create a new reference, so React may not notice anything changed at all.

---

## 3. useReducer

### Why useReducer?

Once a piece of state has many related operations —

```text
ADD
DELETE
EDIT
SELECT
RESET
```

— managing all of them with separate `useState` calls and scattered update
logic gets messy and error-prone. `useReducer` centralizes all the transitions
for one piece of state into a single function.

### Mental model

```text
User Interaction
      ↓
dispatch(action)
      ↓
Reducer
      ↓
New State
      ↓
React Render
```

### Reducer

```js
function reducer(state, action) {
  switch (action.type) {
    case "delete":
      return { ...state, profiles: state.profiles.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
}
```

Takes the current state + an action, returns the *new* state. Never mutates the
old one.

### Dispatch & Actions

```js
dispatch({ type: "delete", payload: 5 });
```

- **Action** — a plain object describing *what happened* (`type`, plus any
  extra data needed, called the **payload**).
- **Dispatch** — the function that sends that action to the reducer.

The difference from calling a setter directly:

```js
dispatch({ type: "DELETE_ARTICLE", payload: 4 });   // says WHAT happened — the reducer decides HOW
setArticles(articles.filter(a => a.id !== 4));      // says exactly HOW to change the state, inline, right here
```

`dispatch` decouples *"what happened"* from *"how state should change in
response"* — the calling component doesn't need to know the update logic at
all, it just describes the event.

### Reducer purity

A reducer must:
- ✅ Take `(state, action)` in, return new state out — nothing else
- ❌ Never fetch APIs
- ❌ Never show alerts / trigger side effects
- ❌ Never mutate `state` or any external variable

Purity matters because React may call your reducer more than once per action in
some cases (e.g. React 18 Strict Mode double-invokes reducers in development to
help catch bugs) — if it does anything other than compute new state, calling it
twice could cause the side effect to happen twice.

### Immutability in reducers

```js
// Bad
state.profiles.push(profile);

// Good
{ ...state, profiles: [...state.profiles, profile] }
```

### useReducer vs useState

| | Use when |
|---|---|
| `useState` | Simple, independent state |
| `useReducer` | Many related transitions on the same state |

```js
// Overkill — don't do this for a single boolean
const [open, dispatch] = useReducer(reducer, false);

// Right tool for the job
const [open, setOpen] = useState(false);
```

---

## 4. useContext

### The problem it solves

Prop drilling through components that don't need the data themselves:

```text
App → Dashboard → Sidebar → ProfileCard
```

Passing a prop through every layer just to reach the bottom.

### Solution: Context

Context makes a value available to *any* descendant inside a Provider, no
matter how deep, without passing it through every layer manually.

```js
const AppContext = createContext();
```

```jsx
function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

```jsx
function Header() {
  const { theme, setTheme } = useContext(AppContext);
  ...
}
```

> 🐛 **Real bug worth knowing:** `useContext(SomeContext)` only works inside
> components rendered as **descendants** of `<SomeContext.Provider>`. It does
> **not** work in the same component that *creates* the Provider:
> ```jsx
> function App() {
>   const { theme } = useContext(AppContext); // ❌ undefined — Provider doesn't exist yet at this point
>   return (
>     <AppProvider>   {/* App creates this — App is not INSIDE it */}
>       ...
>     </AppProvider>
>   );
> }
> ```
> `App` is the ancestor that builds the Provider — it isn't a descendant of it.
> If `App` needs the value too, either read it from the same `useState` that
> feeds the Provider (if `App` owns that state), or restructure so the part of
> the UI that needs `theme` is genuinely rendered *inside* the Provider.

> 🐛 **Related bug:** styling doesn't "spread" between sibling components.
> Giving `Header` a themed background only affects `Header`'s own DOM — its
> siblings (`ProfileForm`, `ProfileList`) are untouched. If you want the whole
> app visually themed, apply the conditional class to the outermost element
> that wraps *everything* — often easiest inside the Provider component itself,
> since it already has direct access to the state, no extra `useContext` call
> needed:
> ```jsx
> <AppContext.Provider value={{ theme, setTheme }}>
>   <div className={theme === "light" ? "theme-light" : "theme-dark"}>
>     {children}
>   </div>
> </AppContext.Provider>
> ```

### Destructuring the Context value

`createContext()` returns **one object**, not a `[value, setter]` pair like
`useState`. Match your destructuring to the shape of what's actually there:

```js
// value={{ theme, setTheme }} was provided as an OBJECT, so:
const { theme, setTheme } = useContext(AppContext);   // ✅ object destructuring

const [theme, setTheme] = useContext(AppContext);      // ❌ wrong — treats it like an array
```

### Context is not state, and not automatically global

- Context doesn't *create* state — it only *shares* state that already exists
  (usually created with `useState` or `useReducer`) with the rest of the tree.
- Only components rendered **inside** the Provider can read it. Nothing outside
  it has access, so it's not truly "global" in the way Zustand is.

### Context vs Props

| Props | Context |
|---|---|
| Explicit, one level at a time | Implicit, available at any depth inside the Provider |

---

## 5. useReducer + useContext

### Why combine them?

- `useReducer` → manages *how* state changes (the transitions)
- `Context` → makes that state (and `dispatch`) *available* anywhere in the tree

```text
useReducer  →  manages state
Context     →  shares state + dispatch
```

```jsx
<ProfileContext.Provider value={{ state, dispatch }}>
  {children}
</ProfileContext.Provider>
```

Any descendant can now do:
```jsx
const { state, dispatch } = useContext(ProfileContext);
dispatch({ type: "delete", payload: id });
```

### The problem this eventually creates

As an app grows, this pattern means more reducers, more Providers, more
nesting, more boilerplate to wire everything together. This is one of the main
reasons **Zustand** (or similar libraries) exist.

---

## 6. Zustand

### Why Zustand?

Solves the boilerplate/nesting problem that grows out of stacking multiple
`Context + useReducer` pairs — no Provider wrapping needed, and components can
subscribe directly to just the slice of state they care about.

### What is a store?

An external state container, defined once, usable from any component without
wrapping anything in a Provider:

```js
// store/useAppStore.js
import { create } from "zustand";

const useAppStore = create((set) => ({
  currentPage: "dashboard",
  notifications: [],

  setCurrentPage: (page) => set({ currentPage: page }),
  addNotification: (msg) =>
    set((state) => ({ notifications: [...state.notifications, msg] })),
}));

export default useAppStore;
```

A store bundles **state** (`currentPage`, `notifications`) and **actions**
(`setCurrentPage`, `addNotification`) together in one place.

### Using it — selectors & granular subscriptions

```js
const currentPage = useAppStore((state) => state.currentPage);
```

The function passed in is a **selector** — it picks out just the slice of state
this component cares about. Because of this, a component subscribed only to
`state.currentPage` won't rerender when `state.notifications` changes — it's
genuinely isolated from unrelated state changes, unlike Context, where every
consumer of a Provider rerenders whenever *any* part of that Provider's value
changes.

### Local vs global — don't put everything in Zustand

```text
Bad candidate for Zustand:
  a single form input's value

Good candidates for Zustand:
  auth state, cart, notifications, current page —
  things multiple, unrelated parts of the app need
```

> The challenge (and good practice generally) explicitly warns against putting
> *everything* in Zustand just because it's available. You should be able to
> justify each piece of state that lives there — if it's only ever used by one
> component and its direct children, it almost certainly shouldn't be global.

### Zustand vs Context vs useReducer

| | Best for |
|---|---|
| Context | Sharing something through a subtree (e.g. theme) |
| useReducer | Complex *local* state with many transitions |
| Zustand | State genuinely needed across unrelated branches of the whole app |

---

## 7. useEffect

### What is a side effect?

Anything that reaches *outside* the pure "calculate UI from state" job of
rendering: fetching data, timers, subscriptions, manually touching the DOM,
logging, etc.

### Why rendering must stay pure, and why useEffect exists

Component bodies should only describe UI. Side effects need a separate escape
hatch that runs *after* React has updated the screen — that's what `useEffect`
is for: synchronizing your component with something outside React (a timer, an
API, a subscription).

### When effects run

After the DOM has been updated for the current render.

```text
Render → DOM updated → Browser paints → useEffect runs
```

### Dependency arrays

```js
useEffect(() => { ... }, []);          // run once, on mount
useEffect(() => { ... }, [count]);     // run whenever `count` changes
useEffect(() => { ... });              // run after every single render (rarely what you want)
```

### Cleanup

```js
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup — runs before the effect re-runs, and on unmount
}, []);
```

Used to remove listeners, clear timers, or cancel subscriptions so they don't
pile up across renders.

### Effect lifecycle

```text
Mount → run effect → dependency changes → cleanup → run effect again → unmount → cleanup
```

### Don't use effects for derived values

```js
// Bad
useEffect(() => {
  setTotal(price * quantity);
});

// Good — just calculate it, no effect needed
const total = price * quantity;
```

If you can compute it directly during render, it's not a side effect — it's
derived state (see the `useState` section).

### Event handlers vs effects

If something happens *because the user clicked something*, that belongs in the
`onClick` handler directly — not in a `useEffect` watching for a state change
the click caused. Effects are for syncing with the *outside world*, not for
reacting to things your own code already knows just happened.

```jsx
// Bad — indirect, effect fires because state happened to change
function send() { setSending(true); }
useEffect(() => { if (sending) doSend(); }, [sending]);

// Good — direct
function send() {
  setSending(true);
  doSend();
}
```

> Newsletter-sending simulation is a genuine, correct use of `useEffect`
> though — once `sending` becomes `true`, a `setTimeout` that eventually flips
> it to `false`/"sent" is reaching outside pure rendering (a timer), so an
> effect is the right tool there.

---

## 8. useLayoutEffect (edge case, know it exists)

### Why it exists

Occasionally you need to measure or adjust the DOM *before* the browser paints,
to avoid a visible flicker (e.g. measuring an element's size and repositioning
it in the same frame).

```text
useEffect timing:        DOM updated → Browser paints → useEffect runs
useLayoutEffect timing:  DOM updated → useLayoutEffect runs → Browser paints
```

### Use cases
- DOM measurements (`element.getBoundingClientRect()`)
- Position calculations that must happen before paint to avoid flicker

### The rule

> Default to `useEffect`. Only reach for `useLayoutEffect` when you have a
> specific, provable flicker problem that `useEffect`'s timing causes. It's not
> a general-purpose hook, and it's not part of most projects' toolkits (it's
> intentionally excluded from plenty of state-management exercises for exactly
> this reason).

---

## 9. Final Decision Framework

```text
What state exists?
      ↓
Who needs it?
      ↓
Can it be derived from something else? → if yes, don't store it at all
      ↓
Local (one component) or shared (multiple components)?
      ↓
Simple (a value or two) or complex (many related transitions)?
```

| Situation | Tool |
|---|---|
| Simple local state | `useState` |
| Complex local state, many related transitions | `useReducer` |
| Needs to reach arbitrary depth in the tree | `Context` |
| Complex state that also needs to reach arbitrary depth | `useReducer` + `Context` |
| Genuinely global, needed across unrelated branches of the app | `Zustand` |
| Anything computable from existing state | Derived value — no state at all |
| Reaching outside React (timers, subscriptions, APIs) | `useEffect` |

The goal isn't memorizing these APIs — it's being able to point at any piece of
state in your app and explain, out loud, why it lives where it lives, and why
it *doesn't* live somewhere else.
