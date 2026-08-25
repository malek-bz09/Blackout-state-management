🎯 Frontend Challenge: React State Management — Team Profile Manager

    Build a fully interactive Team Profile Manager using React state-management tools only.

    No backend. No API. No database. No authentication.

    All data lives locally in React state, Context, or Zustand.

🎯 Challenge Objectives

By completing this challenge, you should demonstrate that you understand:

    useState
    useEffect
    useReducer
    useContext
    Zustand
    Props
    Lifting state up
    Controlled inputs
    Derived state
    State ownership
    Global vs local state
    Choosing the appropriate state-management solution

The goal is not to build a beautiful application.

The goal is to answer:

    "Can I decide where each piece of state should live and why?"

🧠 Application Overview

Build a small Team Profile Manager.

The application should allow a user to:

    View team profiles
    Add a new profile
    Edit an existing profile
    Delete a profile
    Search profiles by name
    Filter profiles by role/department
    View a single profile's details
    Mark a profile as active/inactive
    Select multiple profiles
    Select/deselect all profiles
    Perform a bulk action on selected profiles (e.g. deactivate)
    Simulate "saving" a profile change
    View recent activity (a log of add/edit/delete actions)
    Toggle the application theme
    Navigate between Dashboard, Team, and Activity pages

Everything happens locally.

No API calls are required.

Refreshing the page may reset the application state.
🛠️ Rules
You ARE allowed to use

    React
    JavaScript
    useState
    useEffect
    useReducer
    useContext
    Zustand
    Tailwind CSS (or plain CSS)

You are NOT allowed to use

    API
    fetch
    Axios
    FastAPI
    Backend
    Database
    Redux
    Redux Toolkit
    useMemo
    useCallback
    useRef
    Custom hooks
    localStorage
    sessionStorage

Important

Do not use Zustand for everything.

Part of this challenge is deciding whether state should be:

Local State
    ↓
Lifted State
    ↓
Context
    ↓
Reducer
    ↓
Global Zustand State

📁 Task 1 — Project Setup

Create a Vite React project.

Your structure should eventually look approximately like:

src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   │
│   ├── profiles/
│   │   ├── ProfileList.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── ProfileFilters.jsx
│   │   └── ProfileDetails.jsx
│   │
│   ├── activity/
│   │   └── ActivityLog.jsx
│   │
│   └── dashboard/
│       ├── Dashboard.jsx
│       └── StatCard.jsx
│
├── context/
│   └── AppContext.jsx
│
├── reducers/
│   └── profileReducer.js
│
├── store/
│   └── useAppStore.js
│
├── data/
│   └── profiles.js
│
├── App.jsx
└── main.jsx

Do not create every file immediately.

Create files as you reach each task.
📝 Task 2 — Static Data

Create at least 8 profiles.

Each profile should have:

{
  id: 1,
  name: "Malek Aidoussi",
  role: "Frontend Developer",
  department: "Engineering",
  email: "malek@example.com",
  active: true,
  skills: ["React", "JavaScript", "CSS"],
  joinedAt: "2026-03-14"
}

Use several departments:

Engineering
Design
Marketing
Product

Mix active and inactive profiles.

⚛️ Task 3 — Profile List With useState

Create:

ProfileList
    ↓
ProfileCard

Display all profiles.

Use useState to manage:

    Search text
    Selected department

Create department filters:

All
Engineering
Design
Marketing
Product

The user should be able to search profiles by name.
⚠️ Important

Do not create separate state for filtered profiles.

Do NOT do:

const [filteredProfiles, setFilteredProfiles] = useState([]);

Instead, derive the filtered profiles from existing state.

For example:

const filteredProfiles = profiles.filter(...);

This is intentional.

You are practicing the difference between:

    State vs Derived Data

🧩 Task 4 — Lift State Up

Create:

ProfileFilters

Your structure should become:

ProfileList
│
├── ProfileFilters
│
└── ProfileCard

ProfileFilters needs to modify the filtering behavior of ProfileList.

Use:

State in parent
      ↓
Props down
      ↓
Callback up

You must be able to explain:

    Why does the filter state belong in ProfileList instead of ProfileFilters?

✏️ Task 5 — Profile Form With useState

Create:

ProfileForm

The form should contain:

    Name
    Role
    Department
    Email
    Skills (comma-separated text turned into an array)
    Active (checkbox)

Every input must be controlled.

The flow should be:

Input
  ↓
React State
  ↓
onChange
  ↓
State Update
  ↓
Input

Use useState for the form state.

The user should be able to create a new profile.

The array of all profiles should live in a common parent (e.g. App), not inside ProfileForm.

You must be able to explain:

    Why doesn't ProfileForm own the profiles array itself?
    How does a new profile created in ProfileForm end up inside the array that lives in its parent?

🔄 Task 6 — Replace Profile State With useReducer

Profile management is becoming more complex.

You now have:

ADD
EDIT
DELETE
TOGGLE_ACTIVE
BULK_DEACTIVATE

Refactor profile management using:

useReducer

Create:

src/reducers/profileReducer.js

Your reducer should support actions such as:

ADD_PROFILE
DELETE_PROFILE
UPDATE_PROFILE
TOGGLE_ACTIVE
BULK_DEACTIVATE

The conceptual flow should be:

User Interaction
      ↓
dispatch(action)
      ↓
Reducer
      ↓
New State
      ↓
React Render

🧠 Task 7 — Understand the Reducer

Do not just make the reducer work.

You must be able to answer:
Question 1

Why is managing all profile operations with multiple useState calls becoming difficult?
Question 2

What problem does useReducer solve?
Question 3

Why shouldn't the reducer directly mutate the existing array?
Question 4

What is the difference between:

dispatch({
  type: "DELETE_PROFILE",
  payload: 4
});

and:

setProfiles(...);

Question 5

Why should a reducer be a pure function?

If you cannot answer these questions, stop and study before continuing.
🌎 Task 8 — Global Theme With useContext

Add an application theme:

Light
Dark

Create:

src/context/AppContext.jsx

Your application should have a structure similar to:

App
│
└── AppContext.Provider
      │
      ├── Header
      ├── Sidebar
      └── Main

The Header should contain a theme toggle.

At least one deeply nested component should also be able to access the theme.

The purpose is to create a situation where passing:

theme
setTheme

through multiple components would be unnecessary.

Solve this using:

useContext

⚠️ Important

Only components rendered inside the Provider can read the Context value.

You must be able to explain:

    Why can't the component that creates the Provider also read from it using useContext, in the same place it defines the Provider?
    If you want the whole visible app themed (not just one component), where does the themed wrapper element need to live?

👥 Task 9 — Profile Selection

Create selection checkboxes on each ProfileCard:

☑ Malek Amrani
☐ Sarah Lee
☑ Mike Chen
☐ Alex Rivera

The user should be able to:

    Select a profile
    Deselect a profile
    Select all
    Deselect all

You need state representing the selected profiles.

Initially, use useState.

Also display:

3 profiles selected

The number must update automatically.
🧨 Task 10 — Bulk Actions

Add a bulk action bar that appears when at least one profile is selected.

It should contain:

    Number of selected profiles
    A "Deactivate Selected" button
    A "Clear Selection" button

Clicking "Deactivate Selected" should dispatch a BULK_DEACTIVATE action to your reducer, setting active: false on every selected profile.

You must be able to explain:

    Why does this bulk operation belong in the reducer instead of being handled with a loop of individual setProfiles calls?

⚡ Task 11 — useEffect

When the user clicks:

Save Changes

(when editing a profile), simulate saving.

The UI should show:

Saving...

Then after a short delay:

Saved!

You may use:

setTimeout

to simulate the delay.

Use useEffect appropriately to handle the side effect/lifecycle behavior.

You should be able to explain:

    Why is simulating a save a side effect rather than simply calculating some data?
    Why shouldn't this saving state live inside the reducer?

📜 Task 12 — Activity Log

After any ADD, EDIT, DELETE, or BULK_DEACTIVATE action, add an entry to an activity log.

Each entry should contain:

{
  id: 1,
  action: "ADD_PROFILE",
  description: "Added Malek Amrani",
  timestamp: "..."
}

Display something similar to:

Recent Activity

Added Malek Amrani
Just now

Deactivated 3 profiles
2 minutes ago

Deleted Sarah Lee
5 minutes ago

You must be able to explain:

    Should the activity log live inside the same reducer as profiles, or somewhere else? Why?

🌐 Task 13 — Introduce Zustand

Now introduce Zustand.

Create:

src/store/useAppStore.js

Use Zustand for global application state.

Possible examples:

currentPage
sidebarOpen
notifications

You decide what belongs there.

However:

    Do not move the entire application into Zustand.

You must be able to justify every piece of state that you put inside the store.
🏠 Task 14 — Dashboard

Create a Dashboard page.

Display statistics such as:

Dashboard

┌──────────────┐
│ 8            │
│ Total Team   │
└──────────────┘

┌──────────────┐
│ 6            │
│ Active       │
└──────────────┘

┌──────────────┐
│ 2            │
│ Inactive     │
└──────────────┘

┌──────────────┐
│ 4            │
│ Departments  │
└──────────────┘

These numbers must be derived from your actual state.

Do NOT create separate state such as:

const [activeCount, setActiveCount] = useState(0);

Calculate the value from the source state.
🧪 Task 15 — Required Functionality
Profiles

    View profiles
    Search profiles by name
    Filter by department
    Add profile
    Edit profile
    Delete profile
    Toggle active/inactive
    Display active/inactive status

Selection & Bulk Actions

    Select profile
    Deselect profile
    Select all
    Deselect all
    Display selected count
    Bulk deactivate selected profiles

Saving

    Display saving state
    Display saved/success state

Activity

    Log add/edit/delete/bulk actions
    Display recent activity

Application

    Navigate between pages
    Toggle theme
    Display global notifications
    Display dashboard statistics

🧠 Task 16 — State Architecture

This is one of the most important parts of the challenge.

At the end, your application should demonstrate different state-management approaches.

A possible architecture is:
State 	Possible Solution
Profile form inputs 	useState
Profile operations (add/edit/delete/bulk) 	useReducer
Theme 	useContext
Saving state 	useState + useEffect
Shared application state (current page, notifications) 	Zustand
Profile filters 	Local/Lifted State
Filtered profiles 	Derived data
Dashboard statistics 	Derived data
Activity log 	useReducer (same reducer as profiles, or a sibling reducer — you decide and justify it)

The exact architecture is up to you.

What matters is that you can explain your decisions.
📝 Task 17 — State Architecture Documentation

Create:

STATE_ARCHITECTURE.md

For every important piece of state, explain:

State:
profiles

Where does it live?
useReducer

Why?

Because multiple related operations (add, edit, delete, bulk deactivate) modify the same array, and centralizing them avoids scattered, error-prone update logic spread across components.

Who needs it?

ProfileList
ProfileForm
Dashboard
ActivityLog (indirectly, via logged actions)

Why isn't it Zustand?

...

Document at least:

profiles
profile filters
profile form state
theme
selected profiles
saving state
activity log
current page
notifications

🎯 Final Questions

After finishing the project, you should be able to answer all of these without looking at documentation.
useState

    What is state?
    Why does updating state cause a render?
    Why should state not be mutated directly?
    What is a controlled input?
    When should state be lifted up?

useEffect

    What problem does useEffect solve?
    What is a side effect?
    When does an effect run?
    What does the dependency array control?
    Why can an effect cause an infinite loop?

useReducer

    When should you use useReducer instead of useState?
    What is an action?
    What is dispatch?
    What is the reducer's responsibility?
    Why should reducers be pure?
    Why should state not be mutated?

useContext

    What problem does Context solve?
    What is createContext()?
    What is a Provider?
    How does useContext() find the value?
    Is Context itself a state-management solution?
    Why can't the component that creates a Provider read from it with useContext in that same place?

Zustand

    What problem does Zustand solve?
    How is Zustand different from Context?
    Why doesn't every state need to be global?
    What is a store?
    What is a selector?
    Why can Zustand reduce prop drilling?

Architecture

    How do you decide where state should live?
    What is the difference between local and global state?
    What is derived state?
    Why shouldn't derived data usually be stored separately?
    When would you choose useState?
    When would you choose useReducer?
    When would you choose Context?
    When would you choose Zustand?

🚫 Things You Should NOT Add

Do not turn this into a full-stack project.

Do not add:

❌ FastAPI
❌ Database
❌ MongoDB
❌ Authentication
❌ JWT
❌ API calls
❌ Axios
❌ fetch
❌ React Query
❌ Redux
❌ Redux Toolkit
❌ localStorage
❌ Backend

Also do not add these hooks:

❌ useMemo
❌ useCallback
❌ useRef
❌ Custom Hooks
❌ useLayoutEffect

Those are outside the scope of this challenge.
🏆 Success Criteria

The project is successful if:

    The application works
    Profiles can be added, edited, deleted, and toggled active/inactive
    Profiles can be searched and filtered
    Profiles can be selected individually or all at once
    Bulk deactivation works through the reducer
    Saving simulates a delay through useEffect
    Activity log records actions
    Theme works through Context
    Profile operations use a reducer
    Some state is managed locally
    Some state is lifted
    Some state is shared through Context
    Some state is global through Zustand
    Derived data is not duplicated as state
    You can explain why each state-management technique was chosen

Most important requirement

    You should be able to point to every important state variable in your project and explain why it lives where it lives.

If you can do that, you are not just memorizing React state-management APIs—you are actually understanding state architecture.
