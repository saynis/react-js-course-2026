# Lesson 1: Introduction to React

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what React is and what problem it solves
* Explain why React was created
* Describe React as a JavaScript library, not a separate language
* Compare React with Vanilla JavaScript
* Explain what a user interface (UI) is
* Explain what a component is and why components matter
* Understand component-based architecture
* Understand what React DOM does
* Connect previous JavaScript knowledge to React
* Describe where React is used in the real world
* Understand what will be built during this course

## Introduction

You already know how to build websites using HTML, CSS, and JavaScript. You can create elements, style them, and use JavaScript to make a page interactive — changing text, showing and hiding elements, validating forms, and even calling an API.

That knowledge is not wasted. React does not replace JavaScript. **React is built on top of JavaScript.** It gives you a better, more organized way to build interfaces, especially when a website becomes big and has many moving parts.

In this lesson, you will learn what React is, why it exists, and how the way you think about building a webpage is about to change — for the better.

## Main Concept

### What is React?

React is a **JavaScript library** for building user interfaces. A "user interface" (UI) is everything a user sees and interacts with on a screen: buttons, forms, menus, cards, text, images — all of it.

React was created by engineers at Facebook (now Meta) because building and maintaining large, interactive websites with plain JavaScript and direct DOM manipulation was becoming difficult to manage. As a page grew bigger, keeping track of what needed to update, and when, became messy and error-prone.

React solves this with one core idea:

> Break your interface into small, independent, reusable pieces called **components**, and let React handle updating the screen when your data changes.

### React versus Vanilla JavaScript

With Vanilla JavaScript, you manually find elements and change them:

```javascript
const heading = document.createElement("h1");
heading.textContent = "Welcome";
document.body.appendChild(heading);
```

You are telling the browser exactly **how** to build the page, step by step. This is called **imperative programming** — you write the exact instructions.

With React, you describe **what** the page should look like, and React figures out how to make it happen:

```jsx
function App() {
  return <h1>Welcome</h1>;
}
```

This is called **declarative programming** — you describe the result you want, not the steps to get there.

| Imperative (Vanilla JS) | Declarative (React) |
|---|---|
| You describe every step | You describe the end result |
| You manually update the DOM | React updates the DOM for you |
| Gets harder to manage as the app grows | Stays organized as the app grows |
| `document.createElement`, `appendChild` | JSX and components |

React still uses JavaScript underneath everything. Every event, every piece of logic, every calculation is still plain JavaScript. React just changes **how you organize and describe your UI**.

### What is a Component?

A **component** is a reusable, self-contained piece of a user interface. Think of components like LEGO blocks — small pieces that combine to build something bigger.

For example, a webpage might be broken into these components:

```text
App
├── Header
├── Navbar
├── Hero
├── ProductList
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

Each box in that tree is its own small piece of code, responsible for its own small part of the screen. `ProductCard` might display one product's image, name, and price. `ProductList` simply displays many `ProductCard` components in a row.

This is called **component-based architecture**. Instead of one giant HTML file, your interface is built from many small, focused, reusable pieces.

### Why Components Matter

* **Reusability** — build a `ProductCard` once, use it 100 times with different data.
* **Organization** — each component has one clear job, making code easier to read and fix.
* **Teamwork** — different developers can build different components at the same time.
* **Maintainability** — fixing a bug in one component does not risk breaking unrelated parts of the app.



### React DOM

The **DOM** (Document Object Model) is the browser's representation of your page as a tree of elements — the same DOM you have been manipulating with `document.createElement` and `document.querySelector`.

**React DOM** is the part of React responsible for taking your components and actually rendering them into the real browser DOM. You write components describing what the UI should look like, and React DOM takes care of creating, updating, and removing the actual HTML elements on the page efficiently.

You do not call `appendChild` or `removeChild` yourself anymore. You describe the UI, and React DOM handles the rest.

### How Your JavaScript Knowledge Connects to React

Everything you already know still applies inside React:

* Variables and data types → still used for component data
* Functions → components themselves are just functions
* Conditions → used to decide what to display
* Loops (and `map()`) → used to display lists of data
* Events → still `onClick`, `onChange`, and so on, just written slightly differently
* Objects and arrays → still your main way of organizing data
* Fetch API → still used to get data from a server

React does not throw away what you know. It gives your JavaScript skills a more organized home.

### Where React is Used

React is one of the most widely used front-end libraries in the world. It is used to build:

* Web applications for companies like Meta (Facebook, Instagram), Netflix, Airbnb, and Uber
* Admin dashboards and internal business tools
* E-commerce websites
* Mobile apps (using React Native, a related technology)

Learning React is one of the most valuable and in-demand front-end web development skills today.

### What You Will Build in This Course

Throughout this course, you will build small examples like student cards, product lists, todo lists, and simple forms. By the end, in the final project, you will build a complete **Student Course Management Dashboard** — a real, multi-page application with navigation, forms, filtering, and saved data, built entirely with the skills from this course.

## Syntax

Here is the smallest possible React component, so you can see the basic shape before we go further (we will explain every part of this in the next few lessons):

```jsx
function App() {
  return <h1>Welcome</h1>;
}

export default App;
```

* `function App()` — a normal JavaScript function. In React, a component **is** a function.
* `return <h1>Welcome</h1>;` — the function returns something that looks like HTML. This is called **JSX**, and you will learn it in Lesson 3.
* `export default App;` — makes this component available to be used in other files.

## Simple Example

```jsx
function App() {
  return (
    <div>
      <h1>Welcome to React</h1>
      <p>This is your first React component.</p>
    </div>
  );
}

export default App;
```

## Explanation of the Example

* `App` is a **function component** — a plain JavaScript function whose name starts with a capital letter.
* Inside the function, `return` sends back the UI that should appear on screen.
* The code inside `return (...)` looks like HTML, but it is actually JSX — JavaScript syntax that lets you write HTML-like code directly inside your JavaScript files.
* `<div>` wraps the `<h1>` and `<p>` together, because a component can only return **one** top-level element (you will learn more about this rule in Lesson 3).
* `export default App;` allows this component to be imported and used elsewhere in the project, for example inside `main.jsx`.

## More Examples

**Example 1: Comparing the same result in Vanilla JS and React**

Vanilla JavaScript:

```javascript
const container = document.getElementById("root");

const title = document.createElement("h1");
title.textContent = "Hello, Student!";

const message = document.createElement("p");
message.textContent = "Welcome to your first day of React.";

container.appendChild(title);
container.appendChild(message);
```

React:

```jsx
function Greeting() {
  return (
    <div>
      <h1>Hello, Student!</h1>
      <p>Welcome to your first day of React.</p>
    </div>
  );
}

export default Greeting;
```

Both versions produce the exact same result on the screen. The React version is shorter, easier to read, and easier to grow as more content is added.

**Example 2: A simple component tree in code form**

```text
App
 └── ProfileCard
      ├── ProfileImage
      ├── ProfileName
      └── ProfileBio
```

Each box represents a separate, small component. You will learn how to actually write and connect components like this in Lesson 4.

## Common Mistakes

* **Thinking React is a completely different language.** React is JavaScript. JSX just looks like HTML, but it compiles down to JavaScript.
* **Believing you must forget everything you learned in JavaScript.** Every JavaScript concept you already know is still used inside React.
* **Expecting to manipulate the DOM directly, like before.** In React, you rarely (almost never, as a beginner) use `document.getElementById` or `appendChild`. You describe the UI, and React updates the DOM for you.
* **Confusing "library" with "framework."** React is officially described as a library, focused mainly on building UI. It is intentionally more flexible and lightweight than a full framework.



## Mini Assignment

Choose any website you use often (for example, a social media site, a shopping site, or a school portal). Write a short description (5–8 sentences) that includes:

* A list of at least 6 components you think that page is built from
* A simple component tree diagram (in text form, like the examples in this lesson)
* One sentence explaining why breaking the page into components would make it easier to build and maintain

## Lesson Summary

* React is a JavaScript library for building user interfaces, created to make large, interactive web apps easier to build and maintain.
* React uses a **declarative** approach: you describe what the UI should look like, and React updates the actual DOM for you.
* The core building block of React is the **component** — a small, reusable, self-contained piece of the UI.
* Combining components into a **component tree** is called component-based architecture.
* React apps are usually built as **single-page applications (SPA)**, and **React DOM** is responsible for rendering components into the real browser DOM.
* Everything you already know from JavaScript — variables, functions, conditions, loops, events, arrays, and objects — is still used inside React.
* This course will build up your skills lesson by lesson, ending with a complete **Student Course Management Dashboard** final project.

## Teacher Notes

* **Emphasize:** React is JavaScript, not a new language. Students who feel intimidated often relax once they understand this.
* **Ask the class:** "What is frustrating about building big websites with only HTML, CSS, and JavaScript?" Let students answer before explaining why React helps with exactly those frustrations.
* **Common confusion:** Students often think JSX is literally HTML. Reassure them that Lesson 3 will explain JSX in full detail — for now, focus on the big picture.
* **Demonstration idea:** Live-code the Vanilla JS vs React comparison from "More Examples" side by side in two browser tabs, and show that both produce the same visual result.
* **Suggested duration:** 45–60 minutes. This lesson is conceptual, so keep the pace comfortable and encourage questions.