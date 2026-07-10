# Lesson 2: React Project Setup with Vite

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what Node.js and npm are
* Explain what Vite is and why it is used
* Check installed Node.js and npm versions
* Create a new React project using Vite
* Install project dependencies
* Run the development server
* Understand the default project folder structure
* Explain the purpose of `index.html`, `src`, `main.jsx`, `App.jsx`, `package.json`, and `node_modules`
* Explain why `node_modules` should never be edited manually

## Introduction

Before writing any React component, you need a working React project on your computer. In this lesson, you will set up your very first React project using a tool called **Vite** (pronounced "veet"), which is the fastest and most beginner-friendly way to start a React project today.

By the end of this lesson, you will have a real React project running in your browser, and you will understand exactly what every file in that project does.

## Main Concept

### What is Node.js?

**Node.js** is a program that lets JavaScript run outside of the browser, directly on your computer. Tools like Vite, and the ability to install packages, all depend on Node.js being installed.

### What is npm?

**npm** (Node Package Manager) comes installed together with Node.js. It is used to:

* Install packages (reusable code written by other developers)
* Run project scripts, such as starting a development server
* Manage a project's dependencies (the packages a project needs to work)

### What is Vite?

**Vite** is a build tool that creates and runs modern web projects, including React projects. Vite is used because it is:

* **Fast** — the development server starts almost instantly
* **Simple** — one command creates a ready-to-use React project
* **Modern** — built for how JavaScript projects are structured today

Vite is not the only tool that can create a React project, but it is currently one of the fastest and easiest for beginners.

### Checking Node and npm Versions

Before creating a project, confirm Node.js and npm are installed by running these commands in a terminal:

```bash
node -v
npm -v
```

If both commands print a version number (for example `v20.11.0` and `10.2.4`), you are ready to continue. If you get an error, Node.js needs to be installed first from [nodejs.org](https://nodejs.org).

### Creating a React Project

To create a new React project with Vite, run:

```bash
npm create vite@latest
```

You will be asked a few questions in the terminal. Answer them like this:

```text
Project name: my-first-react-app
Framework: React
Variant: JavaScript
```

This course uses **JavaScript only, no TypeScript**. Always choose the **JavaScript** variant when asked.

### Installing Dependencies and Running the Project

After the project is created, move into the project folder, install its dependencies, and start the development server:

```bash
cd project-name
npm install
npm run dev
```

* `cd project-name` — moves into the newly created project folder.
* `npm install` — downloads and installs everything the project needs to run.
* `npm run dev` — starts the local development server. Vite will print a URL (usually `http://localhost:5173`) — open it in your browser to see your React app running.

To stop the development server at any time, click back into the terminal and press:

```text
Ctrl + C
```

### The Project Folder Structure

After setup, a Vite React project looks roughly like this:

```text
my-first-react-app/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

### What Each Important File Does

* **`index.html`** — the single HTML page of the app. It contains a `<div id="root"></div>` where your entire React application will be displayed.
* **`src` folder** — short for "source." This is where you will write almost all of your React code: components, styles, and logic.
* **`src/main.jsx`** — the entry point of the app. This file tells React to render the `App` component inside the `<div id="root"></div>` from `index.html`.
* **`src/App.jsx`** — the main starting component of your application. You will edit this file constantly throughout the course.
* **`package.json`** — a file that lists your project's name, scripts (like `npm run dev`), and dependencies (the packages your project uses).
* **`node_modules` folder** — contains all the installed packages your project depends on. This folder is generated automatically by `npm install`.

### Why You Should Never Manually Edit `node_modules`

The `node_modules` folder is **generated automatically**, and it can contain thousands of files. You should never edit files inside it because:

* Your changes will be **lost** the next time `npm install` runs.
* Other developers on your team will not have your changes, since `node_modules` is not usually shared or uploaded to code repositories.
* It is extremely easy to break the entire project by editing the wrong file inside it.

If you need different behavior from a package, you either configure it correctly from your own code, or install a different package — you never edit `node_modules` directly.

## Syntax

The three commands you will use every time you start a new project:

```bash
npm create vite@latest
cd project-name
npm install
npm run dev
```

## Simple Example

A complete terminal session for creating and starting a new project:

```bash
npm create vite@latest
```

```text
✔ Project name: … my-first-react-app
✔ Select a framework: › React
✔ Select a variant: › JavaScript
```

```bash
cd my-first-react-app
npm install
npm run dev
```

```text
  VITE ready in 320 ms

  ➜  Local:   http://localhost:5173/
```

## Explanation of the Example

* Running `npm create vite@latest` starts an interactive setup. Vite asks for a project name, then asks which framework and variant to use.
* Choosing **React** and **JavaScript** creates a ready-to-run React project with no TypeScript involved.
* `cd my-first-react-app` moves your terminal into the new project's folder, so future commands run inside the right place.
* `npm install` downloads all the packages the project needs (this creates the `node_modules` folder).
* `npm run dev` starts the local development server. The terminal prints a local URL you can open in your browser to see the running app.

## More Examples

**Example 1: The default `src/main.jsx` file**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

This file finds the `root` element from `index.html` and tells React to render the `App` component inside it. You will rarely need to change this file throughout the course.

**Example 2: A simplified default `src/App.jsx` file**

```jsx
function App() {
  return (
    <div>
      <h1>Vite + React</h1>
    </div>
  );
}

export default App;
```

This is the component you will start editing in the very next lesson.

## Common Mistakes

* **Running `npm run dev` from the wrong folder.** Always make sure your terminal is inside the project folder (`cd project-name`) before running project commands.
* **Forgetting to run `npm install`.** Without it, the project has no dependencies and will not run.
* **Editing files inside `node_modules`.** Never do this — edit files inside `src` instead.
* **Choosing TypeScript by accident.** Always select the **JavaScript** variant for this course.
* **Closing the terminal and thinking the project is "gone."** The project files remain saved on your computer; you simply need to `cd` back into the folder and run `npm run dev` again.

## Best Practices

* Always check `node -v` and `npm -v` before starting a new project, especially on a new computer.
* Use clear, lowercase, hyphen-separated project names (for example `student-dashboard`, not `My Project 1`).
* Keep one terminal tab open specifically for running `npm run dev` while you code in your editor.
* Read terminal error messages carefully — they usually tell you exactly what went wrong (a missing folder, a typo in a command, etc.).
* Add a `.gitignore` file (Vite creates one for you) so that `node_modules` is never uploaded to a code repository like GitHub.

## Classroom Practice

1. As a class, run `node -v` and `npm -v` together and confirm everyone has Node.js installed correctly.
2. Together, create a shared example project called `classroom-demo` using the steps in this lesson, choosing React and JavaScript.
3. Open `src/App.jsx` in the new project and identify which lines match the "Simple Example" from Lesson 1.

## Student Exercises

1. Create a new Vite React project on your own computer named `my-practice-app`, and get the development server running successfully.
2. Open `index.html` in your new project and find the `<div id="root"></div>` element. Write one sentence explaining its purpose.
3. Open `package.json` and list at least three pieces of information you can find inside it (for example, the project name or a script name).

## Mini Assignment

Create a new Vite React project named `about-me-app`. Open `src/App.jsx` and change the text inside the `<h1>` tag to show your own name instead of the default text. Confirm that the change appears in the browser after saving the file. Take a screenshot (or write down) the local URL shown in your terminal after running `npm run dev`.

## Lesson Summary

* Node.js allows JavaScript to run outside the browser, and npm manages packages and scripts for a project.
* Vite is a fast, beginner-friendly tool used to create and run React projects.
* `npm create vite@latest` creates a new project; `npm install` installs its dependencies; `npm run dev` starts the development server.
* A React project's important files include `index.html`, the `src` folder, `main.jsx`, `App.jsx`, and `package.json`.
* `node_modules` is generated automatically and should never be edited manually.
* Press `Ctrl + C` in the terminal to stop the development server.

## Teacher Notes

* **Important point to emphasize:** installing Node.js is a one-time setup step; creating a *project* with Vite is something students will repeat often.
* **Ask the class:** "What do you think would happen if we deleted the `node_modules` folder?" (Answer: nothing is lost — running `npm install` again rebuilds it.)
* **Common student confusion:** students sometimes think they need to reinstall Node.js or Vite for every new project. Clarify that only `npm create vite@latest` needs to be run again for each new project.
* **Demonstration idea:** intentionally run `npm run dev` from the wrong folder in front of the class to show the resulting error message, then fix it with `cd`.
* **Suggested lesson duration:** 45–60 minutes, including hands-on setup time for every student.