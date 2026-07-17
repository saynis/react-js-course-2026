# Lesson 4: React Components

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what a function component is
* Follow the capital letter naming rule for components
* Create a component in its own file
* Export and import components correctly
* Render a component inside another component
* Explain the relationship between parent and child components
* Reuse the same component multiple times
* Organize components inside a `components` folder

## Introduction

In the earlier lessons, you saw components like `App` that return JSX. This lesson focuses entirely on components themselves: how to create them properly, how to split them into their own files, and how to combine them to build a page — without props yet. Props (passing data into components) come in the next lesson.

## Main Concept

### Function components

A **function component** is simply a JavaScript function that returns JSX. That is the entire definition. Any function that starts with a capital letter and returns JSX can be used as a React component.

```jsx
function Header() {
  return <header><h1>My Website</h1></header>;
}
```

### Capital letter naming

Component names **must** start with a capital letter. This is not just a style preference — React uses this rule to tell the difference between a custom component and a regular HTML tag.

```jsx
<Header />   // React treats this as your custom Header component
<header />   // React treats this as a plain HTML element
```

If you name a component starting with a lowercase letter, React will try to render it as an HTML tag and it will not work correctly.

### Creating component files

As your app grows, each component usually lives in its own file. A common convention is to name the file the same as the component, with a `.jsx` extension:

```text
Header.jsx
Navbar.jsx
Footer.jsx
```

### Exporting components

To use a component in another file, you must **export** it. The most common pattern for a component that is the main thing a file provides is a **default export**:

```jsx
function Header() {
  return <header><h1>My Website</h1></header>;
}

export default Header;
```

### Importing components

To use a component in another file, you **import** it at the top of that file:

```jsx
import Header from "./Header";
```

The path `"./Header"` means "look in the same folder for a file called `Header`." You do not need to include the `.jsx` extension.

### Rendering components

Once imported, a component is used just like an HTML tag, but with a capital letter and, if it needs no content inside it, a self-closing slash:

```jsx
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

### Parent and child components

When one component renders another component inside it, the outer component is called the **parent**, and the inner one is the **child**. In the example above, `App` is the parent, and `Header` is its child.

### Reusing components

Because a component is just a function, you can render it as many times as you like:

```jsx
function App() {
  return (
    <div>
      <StudentCard />
      <StudentCard />
      <StudentCard />
    </div>
  );
}
```

Right now, without props, all three `StudentCard` elements would show identical content. In Lesson 5, you will learn how to make each one show different data.

### Organizing components in a `components` folder

As a project grows past a few files, it becomes common to keep all component files inside a `src/components` folder, to keep the project organized:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── StudentCard.jsx
├── App.jsx
└── main.jsx
```

## Syntax

```jsx
// ComponentName.jsx
function ComponentName() {
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}

export default ComponentName;
```

```jsx
// Using it elsewhere
import ComponentName from "./ComponentName";

function App() {
  return <ComponentName />;
}
```

## Simple Example

**`src/components/Header.jsx`**

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

export default Header;
```

**`src/App.jsx`**

```jsx
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <p>Welcome to the site!</p>
    </div>
  );
}

export default App;
```

## Explanation of the Example

* `Header.jsx` defines a function component called `Header`, which returns a `header` element containing an `h1`.
* `export default Header;` makes this component available to be imported elsewhere.
* In `App.jsx`, `import Header from "./components/Header";` brings the `Header` component into this file. The path matches where the file is located, inside the `components` folder.
* `<Header />` renders the `Header` component inside `App`. `App` is the parent; `Header` is the child.
* `App` is exported as well, since `main.jsx` imports and renders `App` to start the whole application (as you saw in Lesson 2).

## More Examples

**Example 1: Reusing one component multiple times**

**`src/components/ProductCard.jsx`**

```jsx
function ProductCard() {
  return (
    <div className="product-card">
      <h3>Product Name</h3>
      <p>$0.00</p>
    </div>
  );
}

export default ProductCard;
```

**`src/App.jsx`**

```jsx
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="product-list">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default App;
```

This renders three identical product cards. In Lesson 5, you will learn to make each one show different product data using props.

**Example 2: Nesting several components together**

```jsx
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <p>Main page content goes here.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

Here, `App` is the parent of three children: `Header`, `Navbar`, and `Footer`.

**Example 3: A component that contains other components (grandparent relationship)**

```jsx
// StudentList.jsx
import StudentCard from "./StudentCard";

function StudentList() {
  return (
    <div>
      <StudentCard />
      <StudentCard />
    </div>
  );
}

export default StudentList;
```

```jsx
// App.jsx
import StudentList from "./components/StudentList";

function App() {
  return (
    <div>
      <StudentList />
    </div>
  );
}

export default App;
```

Here, `App` is the parent of `StudentList`, and `StudentList` is the parent of each `StudentCard`. `App` is sometimes described as the "grandparent" of `StudentCard`.

## Common Mistakes

* **Naming a component with a lowercase first letter,** such as `header` instead of `Header`. React will try to treat it as an HTML tag instead of your component.
* **Forgetting to export the component.** Without `export default ComponentName;`, other files cannot import it.
* **Misspelling the import path,** such as writing `"./Header.jsx"` with the wrong casing on a case-sensitive operating system, or pointing to the wrong folder.
* **Forgetting to self-close a component with no children,** for example writing `<Header>` instead of `<Header />`.
* **Defining a component but never rendering it anywhere.** A component that is written but never used in JSX will never appear on the page.

## Best Practices

* Always start component names with a capital letter, and use PascalCase for multi-word names (for example, `StudentCard`, not `studentcard` or `student-card`).
* Keep one component per file, and name the file after the component.
* Group related component files inside a `components` folder as your project grows.
* Keep components focused on one clear purpose — a `Header` should handle the header, not also manage a shopping cart.
* Use default exports for the main component in each file, to keep imports simple and consistent.

## Classroom Practice

1. As a class, create a `Footer` component in its own file, export it, and render it inside `App`.
2. Take an existing `App.jsx` with a header, paragraph, and button all written directly inside it, and split the header into its own `Header` component file.
3. Render the same `Footer` component twice inside `App` and discuss what students notice about the output.

## Student Exercises

1. Create a `Navbar` component in its own file inside a `components` folder, export it, and import it into `App`.
2. Create a `Card` component that displays a title and description, then render it three times inside `App`.
3. Build a small component tree with at least three custom components (for example, `Header`, `MainContent`, `Footer`) all rendered together inside `App`.

## Mini Assignment

Create a new Vite React project (or reuse one from Lesson 2). Build three separate components in a `components` folder: `Header`, `AboutMe`, and `Footer`. Each should display some static content about yourself. Import and render all three inside `App.jsx` in a sensible order, so the page shows a simple personal page with a header, an about section, and a footer.

## Lesson Summary

* A function component is a JavaScript function that returns JSX; component names must start with a capital letter.
* Components are usually created in their own files and must be exported (commonly with `export default`) to be used elsewhere.
* Importing a component brings it into another file so it can be rendered like a custom HTML tag.
* When one component renders another, the outer one is the parent and the inner one is the child.
* The same component can be rendered multiple times, making it reusable.
* Larger projects organize component files inside a `components` folder for clarity.

## Teacher Notes

* Reinforce the capital-letter rule with a live demo: rename a component to lowercase and show the resulting error or broken rendering.
* Common confusion: students sometimes think each component needs its own `main.jsx`-style entry point. Clarify that only `main.jsx` renders into the actual DOM; all other components are rendered indirectly through `App`.
* Ask: "If `StudentCard` is rendered three times right now, why do all three look identical?" to set up curiosity for props in the next lesson.
* Demonstration idea: build the component tree from Lesson 1's sketch as actual files and code, live, to connect the earlier planning exercise to real code.
* Suggested duration: 75–90 minutes.