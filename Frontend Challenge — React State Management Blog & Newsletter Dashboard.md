# 🎯 Frontend Challenge: React State Management — Blog & Newsletter Dashboard

> Build a fully interactive Blog & Newsletter Admin Dashboard using React state-management tools only.
>
> **No backend. No API. No database. No authentication.**
>
> All data lives locally in React state or Zustand.

---

## 🎯 Challenge Objectives

By completing this challenge, you should demonstrate that you understand:

- `useState`
- `useEffect`
- `useReducer`
- `useContext`
- Zustand
- Props
- Lifting state up
- Controlled inputs
- Derived state
- State ownership
- Global vs local state
- Choosing the appropriate state-management solution

The goal is not to build a beautiful application.

The goal is to answer:

> **"Can I decide where each piece of state should live and why?"**

---

# 🧠 Application Overview

Build a small **Blog & Newsletter Admin Dashboard**.

The application should allow an admin to:

- View articles
- Create articles
- Edit articles
- Delete articles
- Publish/unpublish articles
- Search articles
- Filter articles
- View subscribers
- Select subscribers
- Select/deselect all subscribers
- Write a newsletter
- Simulate sending a newsletter
- View newsletter history
- Toggle the application theme
- Navigate between Dashboard, Articles, and Subscribers

Everything happens locally.

**No API calls are required.**

Refreshing the page may reset the application state.

---

# 🛠️ Rules

## You ARE allowed to use

- React
- JavaScript
- `useState`
- `useEffect`
- `useReducer`
- `useContext`
- Zustand
- Tailwind CSS

## You are NOT allowed to use

- API
- `fetch`
- Axios
- FastAPI
- Backend
- Database
- Redux
- Redux Toolkit
- `useMemo`
- `useCallback`
- `useRef`
- Custom hooks
- `localStorage`
- `sessionStorage`

### Important

Do **not** use Zustand for everything.

Part of this challenge is deciding whether state should be:

```text
Local State
    ↓
Lifted State
    ↓
Context
    ↓
Reducer
    ↓
Global Zustand State
```

---

# 📁 Task 1 — Project Setup

Create a Vite React project.

Your structure should eventually look approximately like:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   │
│   ├── articles/
│   │   ├── ArticleList.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── ArticleForm.jsx
│   │   └── ArticleFilters.jsx
│   │
│   ├── subscribers/
│   │   ├── SubscriberList.jsx
│   │   ├── SubscriberCard.jsx
│   │   └── NewsletterComposer.jsx
│   │
│   └── dashboard/
│       ├── Dashboard.jsx
│       └── StatCard.jsx
│
├── context/
│   └── AppContext.jsx
│
├── reducers/
│   └── articleReducer.js
│
├── store/
│   └── useAppStore.js
│
├── data/
│   ├── articles.js
│   └── subscribers.js
│
├── App.jsx
└── main.jsx
```

Do not create every file immediately.

Create files as you reach each task.

---

# 📝 Task 2 — Static Data

Create at least **6 articles**.

Each article should have:

```js
{
  id: 1,
  title: "Understanding React State",
  content: "React state allows components to...",
  author: "Malek",
  published: true,
  category: "React",
  createdAt: "2026-08-20"
}
```

Use several categories:

```text
React
JavaScript
Frontend
State Management
```

Mix published and unpublished articles.

---

Create at least **8 subscribers**.

Each subscriber should have:

```js
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  subscribed: true
}
```

---

# ⚛️ Task 3 — Article List With `useState`

Create:

```text
ArticleList
    ↓
ArticleCard
```

Display all articles.

Use `useState` to manage:

- Search text
- Selected category

Create category filters:

```text
All
React
JavaScript
Frontend
State Management
```

The user should be able to search articles by title.

---

## ⚠️ Important

Do **not** create separate state for filtered articles.

Do NOT do:

```js
const [filteredArticles, setFilteredArticles] = useState([]);
```

Instead, derive the filtered articles from existing state.

For example:

```js
const filteredArticles = articles.filter(...);
```

This is intentional.

You are practicing the difference between:

> **State vs Derived Data**

---

# 🧩 Task 4 — Lift State Up

Create:

```text
ArticleFilters
```

Your structure should become:

```text
ArticleList
│
├── ArticleFilters
│
└── ArticleCard
```

`ArticleFilters` needs to modify the filtering behavior of `ArticleList`.

Use:

```text
State in parent
      ↓
Props down
      ↓
Callback up
```

You must be able to explain:

> Why does the filter state belong in `ArticleList` instead of `ArticleFilters`?

---

# ✏️ Task 5 — Article Form With `useState`

Create:

```text
ArticleForm
```

The form should contain:

- Title
- Content
- Author
- Category
- Published

Every input must be controlled.

The flow should be:

```text
Input
  ↓
React State
  ↓
onChange
  ↓
State Update
  ↓
Input
```

Use `useState` for the form state.

The user should be able to create a new article.

---

# 🔄 Task 6 — Replace Article State With `useReducer`

Article management is becoming more complex.

You now have:

```text
CREATE
EDIT
DELETE
PUBLISH
UNPUBLISH
```

Refactor article management using:

```text
useReducer
```

Create:

```text
src/reducers/articleReducer.js
```

Your reducer should support actions such as:

```text
ADD_ARTICLE
DELETE_ARTICLE
UPDATE_ARTICLE
TOGGLE_PUBLISHED
```

The conceptual flow should be:

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

---

# 🧠 Task 7 — Understand the Reducer

Do not just make the reducer work.

You must be able to answer:

### Question 1

Why is managing all article operations with multiple `useState` calls becoming difficult?

### Question 2

What problem does `useReducer` solve?

### Question 3

Why shouldn't the reducer directly mutate the existing array?

### Question 4

What is the difference between:

```js
dispatch({
  type: "DELETE_ARTICLE",
  payload: 4
});
```

and:

```js
setArticles(...);
```

### Question 5

Why should a reducer be a pure function?

If you cannot answer these questions, stop and study before continuing.

---

# 🌎 Task 8 — Global Theme With `useContext`

Add an application theme:

```text
Light
Dark
```

Create:

```text
src/context/AppContext.jsx
```

Your application should have a structure similar to:

```text
App
│
└── AppContext.Provider
      │
      ├── Header
      ├── Sidebar
      └── Main
```

The `Header` should contain a theme toggle.

At least one deeply nested component should also be able to access the theme.

The purpose is to create a situation where passing:

```text
theme
setTheme
```

through multiple components would be unnecessary.

Solve this using:

```text
useContext
```

---

# 👥 Task 9 — Subscriber Selection

Create:

```text
SubscriberList
```

Display subscribers with checkboxes:

```text
☑ John
☐ Sarah
☑ Mike
☐ Alex
```

The user should be able to:

- Select a subscriber
- Deselect a subscriber
- Select all
- Deselect all

You need state representing the selected subscribers.

Initially, use `useState`.

Also display:

```text
3 subscribers selected
```

The number must update automatically.

---

# ✉️ Task 10 — Newsletter Composer

Create:

```text
NewsletterComposer
```

It should contain:

```text
Subject
Message
Selected subscribers
Send button
```

Example:

```text
┌─────────────────────────────────────┐
│ Newsletter                           │
│                                     │
│ Subject: [ React State Management ] │
│                                     │
│ Message:                            │
│ ┌─────────────────────────────────┐ │
│ │ Today we're talking about...    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 3 subscribers selected              │
│                                     │
│ [ Send Newsletter ]                 │
└─────────────────────────────────────┘
```

---

# ⚡ Task 11 — `useEffect`

When the user clicks:

```text
Send Newsletter
```

simulate sending.

The UI should show:

```text
Sending newsletter...
```

Then after a short delay:

```text
Newsletter sent!
```

You may use:

```js
setTimeout
```

to simulate the delay.

Use `useEffect` appropriately to handle the side effect/lifecycle behavior.

You should be able to explain:

> Why is sending the newsletter a side effect rather than simply calculating some data?

---

# 📜 Task 12 — Newsletter History

After successfully sending a newsletter, add an entry to the newsletter history.

Each entry should contain:

```js
{
  id: 1,
  subject: "React State Management",
  recipients: 3,
  sentAt: "..."
}
```

Display something similar to:

```text
Newsletter History

React State Management
3 recipients
Sent recently

Understanding Zustand
5 recipients
Sent recently
```

---

# 🌐 Task 13 — Introduce Zustand

Now introduce Zustand.

Create:

```text
src/store/useAppStore.js
```

Use Zustand for **global application state**.

Possible examples:

```text
currentPage
sidebarOpen
notifications
```

You decide what belongs there.

However:

> Do not move the entire application into Zustand.

You must be able to justify every piece of state that you put inside the store.

---

# 🏠 Task 14 — Dashboard

Create a Dashboard page.

Display statistics such as:

```text
Dashboard

┌──────────────┐
│ 6            │
│ Total Posts  │
└──────────────┘

┌──────────────┐
│ 4            │
│ Published    │
└──────────────┘

┌──────────────┐
│ 2            │
│ Drafts       │
└──────────────┘

┌──────────────┐
│ 8            │
│ Subscribers  │
└──────────────┘
```

These numbers must be derived from your actual state.

Do NOT create separate state such as:

```js
const [publishedCount, setPublishedCount] = useState(0);
```

Calculate the value from the source state.

---

# 🧪 Task 15 — Required Functionality

## Articles

- [ ] View articles
- [ ] Search articles
- [ ] Filter by category
- [ ] Create article
- [ ] Edit article
- [ ] Delete article
- [ ] Publish article
- [ ] Unpublish article
- [ ] Display published/draft status

## Subscribers

- [ ] View subscribers
- [ ] Select subscriber
- [ ] Deselect subscriber
- [ ] Select all
- [ ] Deselect all
- [ ] Display selected subscriber count

## Newsletter

- [ ] Write subject
- [ ] Write message
- [ ] Send newsletter
- [ ] Display sending state
- [ ] Display success state
- [ ] Add newsletter to history

## Application

- [ ] Navigate between pages
- [ ] Toggle theme
- [ ] Display global notifications
- [ ] Display dashboard statistics

---

# 🧠 Task 16 — State Architecture

This is one of the most important parts of the challenge.

At the end, your application should demonstrate different state-management approaches.

A possible architecture is:

| State | Possible Solution |
|---|---|
| Article form inputs | `useState` |
| Article operations | `useReducer` |
| Theme | `useContext` |
| Newsletter sending state | `useState` + `useEffect` |
| Shared application state | Zustand |
| Article filters | Local/Lifted State |
| Filtered articles | Derived data |
| Dashboard statistics | Derived data |

The exact architecture is up to you.

What matters is that you can explain your decisions.

---

# 📝 Task 17 — State Architecture Documentation

Create:

```text
STATE_ARCHITECTURE.md
```

For every important piece of state, explain:

```text
State:
articles

Where does it live?
useReducer

Why?

Because multiple related operations modify the same state.

Who needs it?

ArticleList
ArticleForm
Dashboard

Why isn't it Zustand?

...
```

Document at least:

```text
articles
article filters
article form state
theme
subscribers
selected subscribers
newsletter state
newsletter history
current page
notifications
```

---

# 🎯 Final Questions

After finishing the project, you should be able to answer all of these without looking at documentation.

## `useState`

1. What is state?
2. Why does updating state cause a render?
3. Why should state not be mutated directly?
4. What is a controlled input?
5. When should state be lifted up?

## `useEffect`

6. What problem does `useEffect` solve?
7. What is a side effect?
8. When does an effect run?
9. What does the dependency array control?
10. Why can an effect cause an infinite loop?

## `useReducer`

11. When should you use `useReducer` instead of `useState`?
12. What is an action?
13. What is `dispatch`?
14. What is the reducer's responsibility?
15. Why should reducers be pure?
16. Why should state not be mutated?

## `useContext`

17. What problem does Context solve?
18. What is `createContext()`?
19. What is a Provider?
20. How does `useContext()` find the value?
21. Is Context itself a state-management solution?

## Zustand

22. What problem does Zustand solve?
23. How is Zustand different from Context?
24. Why doesn't every state need to be global?
25. What is a store?
26. What is a selector?
27. Why can Zustand reduce prop drilling?

## Architecture

28. How do you decide where state should live?
29. What is the difference between local and global state?
30. What is derived state?
31. Why shouldn't derived data usually be stored separately?
32. When would you choose `useState`?
33. When would you choose `useReducer`?
34. When would you choose Context?
35. When would you choose Zustand?

---

# 🚫 Things You Should NOT Add

Do not turn this into a full-stack project.

Do not add:

```text
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
```

Also do not add these hooks:

```text
❌ useMemo
❌ useCallback
❌ useRef
❌ Custom Hooks
```

Those are outside the scope of this challenge.

---

# 🏆 Success Criteria

The project is successful if:

- [ ] The application works
- [ ] Articles can be created, edited, deleted, and published
- [ ] Articles can be searched and filtered
- [ ] Subscribers can be selected
- [ ] Newsletters can be simulated
- [ ] Newsletter history works
- [ ] Theme works through Context
- [ ] Article operations use a reducer
- [ ] Some state is managed locally
- [ ] Some state is lifted
- [ ] Some state is shared through Context
- [ ] Some state is global through Zustand
- [ ] Derived data is not duplicated as state
- [ ] You can explain why each state-management technique was chosen

## Most important requirement

> **You should be able to point to every important state variable in your project and explain why it lives where it lives.**

If you can do that, you are not just memorizing React state-management APIs—you are actually understanding **state architecture**.