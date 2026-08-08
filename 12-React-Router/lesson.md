# Lesson 13: React Router

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what routing is and why React applications need a router
* Install React Router into a project
* Set up `BrowserRouter`, `Routes`, and `Route`
* Navigate between pages using `Link` and `NavLink`
* Read dynamic route parameters using `useParams`
* Build a "Not Found" page
* Build a basic navigation layout

## Introduction

So far, every project you have built has been a single page — one `App` component showing everything at once. Real applications usually have multiple views: a home page, a list page, a details page, and so on. In a traditional website, each of these would be a separate HTML file the browser loads from the server. In a single-page application (introduced in Lesson 1), we instead use a **router** to switch between different views without reloading the page.

## Main Concept

### What is routing?

**Routing** is the system that connects a URL (like `/products` or `/students/5`) to a specific piece of UI that should be shown for that URL. When the URL changes, the router decides which component to display, without the browser making a full page reload.

### Why React applications need React Router

React itself does not include routing built in — it is a separate library, commonly **React Router**, that the React community has adopted as the standard way to handle multi-page navigation inside a single-page application.

### Installing React Router

```bash
npm install react-router-dom
```

### `BrowserRouter`

`BrowserRouter` is a component that enables routing for your whole application. It should wrap your entire app, usually in `main.jsx`:

```jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// inside the render call:
<BrowserRouter>
  <App />
</BrowserRouter>
```

### `Routes` and `Route`

Inside your app, `Routes` is a container for all your individual `Route` definitions. Each `Route` maps a URL path to a component:

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
```

Only the component matching the current URL is rendered — visiting `/products` shows `Products`, and visiting `/` shows `Home`.

### `Link`

Regular HTML `<a>` tags cause a full page reload, which defeats the purpose of a single-page application. `Link` works like an `<a>` tag but navigates without reloading the page:

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </nav>
  );
}
```

### `NavLink`

`NavLink` works exactly like `Link`, but automatically adds an `active` class (or lets you customize the styling) when its `to` path matches the current URL — useful for highlighting the current page in a navigation menu:

```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Home
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => (isActive ? "active-link" : "")}>
        Products
      </NavLink>
    </nav>
  );
}
```

### Dynamic route parameters

Many pages need to show details for a specific item, based on part of the URL — for example, `/products/3` for the product with ID `3`. You define this using a colon in the route path:

```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

### `useParams`

Inside the component rendered by a dynamic route, `useParams` reads the actual value from the URL:

```jsx
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return <p>Showing details for product ID: {id}</p>;
}
```

If the user visits `/products/3`, `useParams()` returns `{ id: "3" }`, so `id` is `"3"` (note that it comes through as a string, even though it looks like a number).

### Not Found page

It is good practice to show a friendly page when a user visits a URL that does not match any defined route. This is done with a wildcard path `"*"`, placed as the last route:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Basic navigation layout

A typical small app combines all of this into a layout with a shared navigation bar and routed page content:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Syntax

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/path" element={<Component />} />
    <Route path="/path/:param" element={<ComponentWithParam />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

```jsx
const { param } = useParams();
```

## Simple Example

```jsx
// App.jsx
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
```

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

## Explanation of the Example

* `BrowserRouter` wraps the whole application in `main.jsx`, enabling routing everywhere inside it.
* `Link` elements in the `nav` let the user move between `/` and `/about` without a full page reload.
* `Routes` contains two `Route` elements: one for `/` showing `Home`, and one for `/about` showing `About`.
* Only one of `Home` or `About` renders at a time, based on which path in the browser's URL currently matches.

## More Examples

**Example 1: Dynamic route for a student details page**

```jsx
import { useParams } from "react-router-dom";

function StudentDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Student Details</h2>
      <p>Showing details for student ID: {id}</p>
    </div>
  );
}
```

```jsx
<Route path="/students/:id" element={<StudentDetails />} />
```

Visiting `/students/7` renders `StudentDetails`, and `useParams()` returns `{ id: "7" }` inside it.

**Example 2: Linking to a dynamic route from a list**

```jsx
import { Link } from "react-router-dom";

function StudentList({ students }) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          <Link to={`/students/${student.id}`}>{student.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```

Here, a template literal builds the correct dynamic URL for each student, based on their `id`.

**Example 3: A Not Found page**

```jsx
function NotFound() {
  return (
    <div>
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
```

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/students" element={<StudentList />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Common Mistakes

* **Forgetting to wrap the app in `BrowserRouter`,** which causes errors when using `Routes`, `Link`, or `useParams`, since routing features only work inside a `BrowserRouter`.
* **Using a plain `<a href="...">` instead of `Link`,** which causes a full page reload and loses all React state, defeating the purpose of client-side routing.
* **Forgetting the colon in a dynamic route path,** writing `path="/students/id"` instead of `path="/students/:id"`, which treats `id` as a literal path segment instead of a parameter.
* **Forgetting to place the wildcard `"*"` route last,** which can cause it to match before more specific routes are checked.
* **Assuming `useParams()` values are numbers.** They are always strings, so comparisons or lookups may need to convert them (for example, with `Number(id)`) if needed.

## Best Practices

* Keep each page's component in its own file, often inside a `pages` folder, to keep routing code organized as the app grows.
* Use `NavLink` instead of `Link` for main navigation menus, so the current page can be visually highlighted.
* Always include a "Not Found" route using the `"*"` wildcard path as the last route in your list.
* Keep shared layout elements, like a navigation bar, outside of `Routes` so they appear on every page, and only the routed content changes.
* Use template literals to build dynamic links cleanly, such as `` `/students/${student.id}` ``.

## Classroom Practice

1. As a class, install React Router in a project and set up `BrowserRouter`, two simple page components, and `Routes`/`Route` to switch between them.
2. Add a navigation bar using `Link` elements, and confirm that clicking them does not reload the page.
3. Add a dynamic route for `/products/:id`, and use `useParams` to display the ID from the URL.


## Mini Assignment

Build a small multi-page app with the following routes: a home page at `/`, a products list page at `/products` showing at least four hardcoded products with links to their details, a dynamic product details page at `/products/:id` that displays the ID from the URL, and a Not Found page for any unmatched route. Add a navigation bar at the top using `NavLink` so the active page is visually highlighted.

## Lesson Summary

* Routing connects a URL to a specific piece of UI, allowing a single-page application to have multiple views without full page reloads.
* React Router is installed with `npm install react-router-dom` and provides the tools React itself does not include for routing.
* `BrowserRouter` enables routing for the whole app; `Routes` and `Route` map URL paths to components.
* `Link` and `NavLink` navigate between routes without reloading the page; `NavLink` also supports highlighting the active link.
* Dynamic route parameters, defined with a colon (`:id`), let one route handle many different URLs, with `useParams` reading the actual value.
