# Client Side State Management Notes

## React Fundamentals

### What is React?

React is a JavaScript library for building user interfaces.

Instead of manually changing the DOM:

```js
document.getElementById("title").innerText = "Hello";
```

we describe what the UI should look like based on the current state.

---

### Why React?

Without React:

- Manual DOM manipulation
- Hard to maintain
- UI can get out of sync with data

With React:

- State changes
- React rerenders
- UI stays synced with state

---

### Components

Components are reusable pieces of UI.

Example:

```jsx
function ProfileCard() {
  return <h1>Malek</h1>;
}
```

Think:

```text
UI = Components
```

---

### JSX

JSX lets us write HTML-like syntax inside JavaScript.

```jsx
<h1>Hello</h1>
```

JSX is converted to JavaScript by React.

---

### Rendering

Rendering means React executes the component function to know what UI should be displayed.

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

React calls:

```js
App();
```

and gets the UI description.

---

### Pure Rendering

A component should only describe UI.

Bad:

```jsx
function App() {
  alert("Hello");
  return <h1>Hello</h1>;
}
```

Good:

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

Rendering should be predictable.

---

# useState

## Why normal variables don't work

```js
let count = 0;
```

When it changes:

```js
count++;
```

React doesn't know.

No rerender.

---

## State

State is data that changes over time and should update the UI.

```jsx
const [count, setCount] = useState(0);
```

---

## State Persistence

Normal variables reset every render.

State survives between renders.

---

## State Setter

```jsx
setCount(1);
```

Setter tells React:

```text
State changed
↓
Rerender
↓
Update UI
```

---

## State Updates

```jsx
setCount(count + 1);
```

Updates state and schedules a rerender.

---

## Functional Updates

Bad:

```jsx
setCount(count + 1);
setCount(count + 1);
```

Good:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Why?

Because React gives the latest value.

---

## Batching

React groups multiple state updates together.

```jsx
setA(1);
setB(2);
```

Instead of:

```text
render
render
```

React does:

```text
render once
```

---

## State Ownership

Ask:

```text
Who owns this state?
```

State should live where it makes sense.

---

## Lifting State Up

When multiple components need the same state.

Move it to the closest common parent.

---

## Closest Common Parent

```text
Dashboard
├── ProfileList
└── ProfileForm
```

Shared state lives in:

```text
Dashboard
```

---

## One Source of Truth

Avoid duplicated state.

Bad:

```js
profiles
selectedProfile
selectedProfileId
```

Good:

```js
profiles
selectedProfileId
```

Derive the selected profile.

---

## Immutability

Never mutate state directly.

Bad:

```js
state.count++;
```

Good:

```js
{
  ...state,
  count: state.count + 1
}
```

---

## Arrays

Bad:

```js
profiles.push(profile);
```

Good:

```js
[...profiles, profile]
```

---

## Objects

Bad:

```js
user.name = "Ahmed";
```

Good:

```js
{
  ...user,
  name: "Ahmed"
}
```

---

## Derived State

Don't store what can be calculated.

Bad:

```js
profiles
selectedProfile
selectedProfileId
```

Good:

```js
profiles
selectedProfileId
```

Then:

```js
profiles.find(...)
```

---

# useReducer

## Why useReducer?

When a piece of state has many different transitions.

Example:

```text
ADD
DELETE
EDIT
SELECT
RESET
```

Using many useState calls becomes messy.

---

## Mental Model

```text
State
+
Action
↓
Reducer
↓
New State
```

---

## Reducer

```js
function reducer(state, action) {}
```

Receives:

```text
Current State
Action
```

Returns:

```text
New State
```

---

## Dispatch

```js
dispatch({
  type: "delete",
  payload: 5
});
```

Dispatch sends actions to the reducer.

---

## Action

An action describes what happened.

```js
{
  type: "delete",
  payload: 5
}
```

---

## Payload

Extra data needed for the action.

Example:

```js
payload: 5
```

represents an id.

---

## Reducer Purity

Reducer should:

✅ Return state

❌ Fetch APIs

❌ Show alerts

❌ Modify external variables

---

## Immutability

Bad:

```js
state.profiles.push(profile);
```

Good:

```js
{
  ...state,
  profiles: [...state.profiles, profile]
}
```

---

## useReducer vs useState

UseState:

```text
Simple state
```

UseReducer:

```text
Many transitions
Related state logic
```

---

## When useReducer is Overkill

Bad:

```js
const [open, setOpen] = useState(false);
```

Replacing this with useReducer is unnecessary.

---

# useContext

## Problem

Props drilling.

```text
App
↓
Dashboard
↓
Sidebar
↓
ProfileCard
```

Passing props through every component.

---

## Solution

Context makes values available through a React subtree.

---

## Create Context

```js
createContext()
```

---

## Provider

```jsx
<ProfileProvider>
```

Provides values to children.

---

## useContext

```js
useContext(ProfileContext)
```

Reads values from Context.

---

## Context Is Not State

Context does not create state.

Context only shares state.

Usually:

```text
useState
+
Context
```

or

```text
useReducer
+
Context
```

---

## Context vs Props

Props:

```text
Explicit
```

Context:

```text
Shared through tree
```

---

## Context Is Not Automatically Global State

Only components inside the Provider can access it.

---

# useReducer + useContext

## Why Combine Them?

useReducer:

```text
Handles state transitions
```

Context:

```text
Makes state available
```

Together:

```text
useReducer
↓
Manages state

Context
↓
Shares state
```

---

## Example

```text
Profiles
├── Add
├── Delete
├── Edit
└── Select
```

Reducer handles actions.

Context exposes:

```js
state
dispatch
```

to the tree.

---

## Problem

As applications grow:

- More boilerplate
- More providers
- More setup

This is one reason Zustand exists.

---

# Zustand

## Why Zustand?

Problems with:

```text
Context
+
useReducer
```

- Boilerplate
- Provider setup
- Provider nesting

---

## What is Zustand?

An external store.

Think:

```text
Store
├── State
└── Actions
```

---

## Store

```js
const useStore = create(...)
```

---

## State

```js
count
profiles
user
```

---

## Actions

```js
addProfile()
deleteProfile()
```

---

## Subscriptions

Components subscribe only to the state they need.

```js
useStore(state => state.profiles)
```

---

## Selectors

Selector chooses a piece of state.

```js
state => state.profiles
```

---

## Granular Subscriptions

If component only subscribes to:

```js
state.count
```

it doesn't care about:

```js
state.theme
```

---

## Local vs Global State

Don't put everything in Zustand.

Bad:

```text
Single form input
```

Good:

```text
Auth
Cart
Notifications
Shared state
```

---

## Store Organization

Example:

```text
Auth Store
Profile Store
Cart Store
Notification Store
```

---

## Zustand vs Context

Context:

```text
Share through tree
```

Zustand:

```text
External store
Direct access
```

---

## Zustand vs useReducer

useReducer:

```text
Complex local state
```

Zustand:

```text
Shared application state
```

---

# useEffect

## What is a Side Effect?

Anything outside rendering.

Examples:

- Fetching data
- Timers
- Event listeners
- Local storage

---

## Why Rendering Must Stay Pure

Rendering should only describe UI.

Side effects belong elsewhere.

---

## Why useEffect Exists

To synchronize React with external systems.

---

## When Effects Run

After React updates the screen.

---

## Dependency Arrays

### Run Once

```js
[]
```

Runs on mount.

---

### Run When Dependency Changes

```js
[count]
```

Runs when count changes.

---

### No Dependency Array

```js
useEffect(() => {});
```

Runs after every render.

---

## Cleanup

```js
return () => {};
```

Used for:

- Remove listeners
- Clear intervals
- Cleanup subscriptions

---

## Mount

Component appears.

---

## Unmount

Component disappears.

---

## Effect Lifecycle

```text
Mount
↓
Run Effect
↓
Dependency Changes
↓
Cleanup
↓
Run Effect Again
↓
Unmount
↓
Cleanup
```

---

## Don't Use Effects for Derived Values

Bad:

```js
useEffect(() => {
  setTotal(price * quantity);
});
```

Good:

```js
const total = price * quantity;
```

---

## Event Handlers vs Effects

User clicks button?

Use:

```js
onClick
```

not:

```js
useEffect
```

---

# useLayoutEffect

## Why It Exists

Sometimes we must run code before the browser paints.

---

## Timing

```text
DOM Updated
↓
useLayoutEffect
↓
Browser Paint
```

---

## useEffect Timing

```text
DOM Updated
↓
Browser Paint
↓
useEffect
```

---

## Use Cases

- DOM measurements
- Position calculations
- Prevent visual flicker

---

## Example

```js
element.getBoundingClientRect()
```

---

## Important Rule

Default to:

```js
useEffect
```

Only use:

```js
useLayoutEffect
```

when you specifically need work done before paint.

---

# Final Decision Framework

Ask yourself:

```text
What state exists?
↓
Who needs it?
↓
Can it be derived?
↓
Local or shared?
↓
Simple or complex?
```

Then choose:

```text
Simple local state
→ useState

Complex local state
→ useReducer

Share through tree
→ Context

Complex shared state
→ useReducer + Context

Application-wide shared state
→ Zustand
```