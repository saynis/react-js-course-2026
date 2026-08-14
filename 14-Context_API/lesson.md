# Lesson 15: Context API

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what prop drilling is and why it becomes a problem
* Create a context using `createContext`
* Provide a context value using a Context Provider
* Read a context value using `useContext`
* Share data like a theme or authentication state across many components
* Explain when Context should and should not be used


## Main Concept

### Prop drilling

**Prop drilling** is what happens when you pass a prop through several components, one after another, purely so it can reach a deeply nested component that actually needs it — even though the components in between never use the value themselves:

```jsx
function App() {
  const user = { name: "Amina" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserGreeting user={user} />;
}

function UserGreeting({ user }) {
  return <p>Hello, {user.name}!</p>;
}
```

Here, `Layout` and `Sidebar` do not actually use `user` at all — they only exist to pass it along to `UserGreeting`. As an app grows, this becomes tedious to write and easy to break.

### Creating context

The Context API solves this by letting you place a value somewhere in the component tree that any descendant can read directly, without it being passed manually through every level in between.

First, create a context, usually in its own file:

```jsx
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
```

### Context Provider

Every context comes with a `Provider` component. Wrapping part of your component tree in a `Provider` makes the value available to every component nested inside it, no matter how deep:

```jsx
import UserContext from "./UserContext";

function App() {
  const user = { name: "Amina" };

  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}
```

Notice that `Layout` no longer receives `user` as a prop at all.

### `useContext`

Any component nested inside the `Provider` can read the value directly using the `useContext` hook, no matter how deeply nested it is:

```jsx
import { useContext } from "react";
import UserContext from "./UserContext";

function UserGreeting() {
  const user = useContext(UserContext);

  return <p>Hello, {user.name}!</p>;
}
```

`Layout` and `Sidebar` in between no longer need to know or care about `user` at all — the prop drilling is completely eliminated.

### Sharing theme or authentication state

Two of the most common real-world uses of Context are:

**Theme context**, so any component can know whether the app is in light or dark mode:

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

**Authentication context**, so any component can know whether a user is logged in, without passing that information down manually through every layer:

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### When Context should and should not be used

Context is a great fit when:

* Data is needed by many components at very different levels of nesting (theme, logged-in user, language preference).
* Passing the data down manually through props would require going through several components that do not use it themselves.

Context is **not** always the right tool:

* For data only needed by one or two closely related components, plain props (and lifting state up, from Lesson 15) are simpler and easier to follow.
* Context is not meant to replace all state management — overusing it for everything can make it harder to trace where data actually comes from, since you lose the clear, visible trail that props provide.
* This course does not use Redux or other external state management libraries — Context, combined with `useState`, is enough for the applications you will build here.

## Syntax

```jsx
import { createContext, useContext } from "react";

const MyContext = createContext();

function Provider({ children }) {
  const value = /* some state or data */;
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function ConsumerComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}
```

## Simple Example

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeDisplay() {
  const { theme } = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch Theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeDisplay />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;
```

## Explanation of the Example

* `ThemeContext` is created once, outside of any component, using `createContext()`.
* `ThemeProvider` holds the actual `theme` state and wraps its `children` in `ThemeContext.Provider`, making `{ theme, setTheme }` available to any component nested inside it.
* `ThemeDisplay` and `ThemeSwitcher` are both nested inside `ThemeProvider` (through `App`), and each calls `useContext(ThemeContext)` to read the shared value directly — neither needed the value passed to them as a prop.
* Clicking the button in `ThemeSwitcher` updates the shared state, and `ThemeDisplay` automatically re-renders with the new value, even though the two components are siblings with no direct connection to each other.

## More Examples

**Example 1: Prop drilling vs. Context, side by side**

Prop drilling version:

```jsx
function App() {
  const username = "Amina";
  return <Dashboard username={username} />;
}

function Dashboard({ username }) {
  return <Sidebar username={username} />;
}

function Sidebar({ username }) {
  return <p>Logged in as {username}</p>;
}
```

Context version:

```jsx
const UserContext = createContext();

function App() {
  const username = "Amina";
  return (
    <UserContext.Provider value={username}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function Dashboard() {
  return <Sidebar />;
}

function Sidebar() {
  const username = useContext(UserContext);
  return <p>Logged in as {username}</p>;
}
```

Notice that `Dashboard` no longer needs to know about `username` at all in the Context version.

**Example 2: A simple authentication context**

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginButton() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
      {isLoggedIn ? "Log Out" : "Log In"}
    </button>
  );
}

function WelcomeMessage() {
  const { isLoggedIn } = useContext(AuthContext);

  return <p>{isLoggedIn ? "Welcome back!" : "Please log in."}</p>;
}

function App() {
  return (
    <AuthProvider>
      <WelcomeMessage />
      <LoginButton />
    </AuthProvider>
  );
}
```

**Example 3: Deciding not to use Context for local data**

```jsx
// This does NOT need Context — it is only used by one component and its direct child.
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
  );
}

function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />;
}
```

Here, plain props are simpler and clearer than setting up a context, since only one direct parent-child relationship is involved.

## Common Mistakes

* **Using Context for every single piece of state,** even data only needed by one or two nearby components, making the app harder to understand instead of easier.
* **Forgetting to wrap the components that need the data in the `Provider`,** which causes `useContext` to return `undefined` (or the context's default value) instead of the expected data.
* **Recreating the context value object on every render without memoization in performance-sensitive apps,** which is an advanced concern beyond this course, but worth knowing about as your skills grow — for now, focus on correctness rather than performance tuning.
* **Confusing `createContext` (which defines the context) with `useContext` (which reads it),** or forgetting to import one of them.
* **Trying to use `useContext` outside of a component wrapped in the matching `Provider`.**

## Best Practices

* Reach for Context only when prop drilling is a genuine problem — many components deeply nested, all needing the same data.
* Keep each context focused on one clear concern, such as theme or authentication, rather than combining unrelated data into a single giant context.
* Create a dedicated Provider component (like `ThemeProvider` or `AuthProvider`) that owns the state and wraps `children`, keeping the logic in one clear place.
* Continue to prefer plain props and lifting state up (Lesson 15) for state shared only between closely related components.
* Give context values clear, descriptive names, and consider grouping related values and functions together in a single object, as shown in the theme and auth examples.



## Mini Assignment

Build a small app with an `AuthProvider` that tracks `isLoggedIn` state and a function to change it. Create at least three components nested at different levels that consume this context using `useContext`: one that shows a login/logout button, one that shows a welcome message only when logged in, and one nested two levels deep (for example, inside a `Dashboard` component that itself is inside a `Layout` component) that also displays the login status — without passing `isLoggedIn` down manually as a prop through `Layout` or `Dashboard`.

## Lesson Summary

* Prop drilling happens when data is passed through several components that do not use it themselves, just to reach a deeply nested component that does.
* `createContext()` creates a context; a `Provider` component makes a value available to every component nested inside it.
* `useContext(SomeContext)` reads the shared value directly from any nested component, no matter how deep, without prop drilling.
* Context is commonly used for data like theme and authentication state that many components across an app need access to.
* Context should be used when prop drilling is a genuine problem — for data shared only between closely related components, plain props and lifting state up remain simpler and clearer.
* This course does not use Redux; Context combined with `useState` is enough for the applications built here.

