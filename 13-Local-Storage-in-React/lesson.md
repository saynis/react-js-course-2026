# Lesson 14: Local Storage in React

## Learning Objectives

By the end of this lesson, students will be able to:

* Save state to Local Storage
* Read data from Local Storage when a component loads
* Use `JSON.stringify()` and `JSON.parse()` correctly with state
* Combine `useEffect` with Local Storage
* Persist a todo list or shopping cart between page visits
* Use safe fallback values when reading from Local Storage
* Explain why sensitive information should not be stored in Local Storage

## Introduction

You already know how to use Local Storage in vanilla JavaScript. In a React app, state normally resets every time the page is refreshed — all the todos, cart items, or form data disappear. Combining Local Storage with `useState` and `useEffect` lets you persist that data, so it survives page refreshes and even closing the browser.

## Main Concept

### Saving state to Local Storage

Local Storage only stores strings, so any non-string data (like an array or object) must be converted with `JSON.stringify()` before saving:

```jsx
localStorage.setItem("todos", JSON.stringify(todos));
```

### Reading data from Local Storage

To read data back, use `localStorage.getItem()`, then convert it back into a real JavaScript value with `JSON.parse()`:

```jsx
const savedTodos = JSON.parse(localStorage.getItem("todos"));
```

### `JSON.stringify()` and `JSON.parse()`

* `JSON.stringify(value)` converts a JavaScript value (like an array or object) into a JSON string, suitable for storing in Local Storage.
* `JSON.parse(jsonString)` converts a JSON string back into a real JavaScript value.

These two functions are used together constantly whenever Local Storage holds anything other than a plain string.

### Using `useEffect` with Local Storage

There are two common places `useEffect` is used with Local Storage:

**1. Reading saved data when the component first mounts**, using an empty dependency array:

```jsx
useEffect(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos) {
    setTodos(savedTodos);
  }
}, []);
```

**2. Saving data automatically whenever it changes**, using the relevant state as a dependency:

```jsx
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### Todo or shopping cart persistence

Combining both effects lets you build a todo list or shopping cart that automatically loads saved data on page load, and automatically saves any changes:

```jsx
import { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text }]);
  }

  return (
    <div>
      {/* form and list rendering here */}
    </div>
  );
}
```

### Safe fallback values

`localStorage.getItem()` returns `null` if the key does not exist yet — for example, the very first time a new user visits the app. `JSON.parse(null)` actually returns `null` too (not an error), but it is safer to explicitly provide a fallback so your state always starts with a predictable, correct type:

```jsx
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
```

Here, if `JSON.parse(localStorage.getItem("todos"))` evaluates to `null` (or any other falsy value), `savedTodos` falls back to an empty array `[]` instead, so code expecting an array (like `.map()`) does not break.

An even safer version can initialize this directly inside `useState`, so the component starts with the correct value immediately, without needing an extra `useEffect` just for loading:

```jsx
const [todos, setTodos] = useState(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  return savedTodos || [];
});
```

Passing a function to `useState` like this (instead of a plain value) tells React to run that function only once, on the first render, which is ideal for reading from Local Storage.

### Avoiding sensitive information in Local Storage

Local Storage is plain text, stored directly in the browser, and can be read by any JavaScript running on the same page, including from browser extensions or, in the case of certain security vulnerabilities, malicious scripts. Never store sensitive information there, such as:

* Passwords
* Full credit card numbers
* Government ID numbers
* Private authentication secrets that grant broad access

Local Storage is appropriate for things like todo lists, cart contents, theme preferences, or draft form data — not for anything that would cause real harm if another script on the page could read it.

## Syntax

```jsx
// Saving
localStorage.setItem("key", JSON.stringify(value));

// Reading
const value = JSON.parse(localStorage.getItem("key")) || fallbackValue;

// Removing
localStorage.removeItem("key");
```

## Simple Example

```jsx
import { useState, useEffect } from "react";

function NotesApp() {
  const [note, setNote] = useState(() => {
    return localStorage.getItem("note") || "";
  });

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  return (
    <textarea
      value={note}
      onChange={(event) => setNote(event.target.value)}
      placeholder="Write a note..."
    />
  );
}

export default NotesApp;
```

## Explanation of the Example

* `useState(() => localStorage.getItem("note") || "")` reads any previously saved note when the component first loads, falling back to an empty string if nothing has been saved yet.
* Because `note` is a plain string here (not an array or object), `JSON.stringify`/`JSON.parse` are not strictly necessary — they matter most for arrays and objects.
* The `useEffect` with `[note]` as its dependency saves the note to Local Storage every time it changes, so the text survives a page refresh.
* Typing in the `textarea` updates state through the controlled component pattern from Lesson 10, which in turn triggers the save effect.

## More Examples

**Example 1: A persistent todo list**

```jsx
import { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    return saved || [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(event) {
    event.preventDefault();
    if (text.trim() === "") return;

    setTodos([...todos, { id: Date.now(), text }]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Example 2: A persistent shopping cart with a clear-cart option**

```jsx
import { useState, useEffect } from "react";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    return saved || [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addItem(item) {
    setCartItems([...cartItems, item]);
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }

  return (
    <div>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => addItem("New Item")}>Add Item</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

**Example 3: Saving a simple theme preference**

```jsx
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme} (click to switch)
    </button>
  );
}
```

## Common Mistakes

* **Forgetting `JSON.stringify()` when saving an array or object,** which stores something like `"[object Object]"` instead of usable data.
* **Forgetting `JSON.parse()` when reading an array or object back,** leaving you with a plain string instead of usable data.
* **Not providing a fallback value,** causing errors like calling `.map()` on `null` the first time a new user visits the app with nothing saved yet.
* **Storing sensitive data,** such as passwords or private tokens, directly in Local Storage.
* **Forgetting the dependency array on the "save" `useEffect`,** causing it to either never save changes, or save on every single render unnecessarily.

## Best Practices

* Always pair `JSON.stringify()` when saving with `JSON.parse()` when reading, for any data that is not already a plain string.
* Always provide a safe fallback value (like `|| []` or `|| ""`) when reading from Local Storage, so your component's state always starts with the correct, expected type.
* Prefer initializing state directly from Local Storage using the function form of `useState`, rather than loading it in a separate `useEffect`, when possible — this avoids a brief flash of empty state on load.
* Use clear, specific key names in Local Storage (like `"studentDashboard_students"`) to avoid accidentally overwriting data from a different part of the app.
* Never store passwords, tokens, or other sensitive information in Local Storage.




## Mini Assignment

Build a `PersistentTodoList` component that lets users add and remove todos, with the full list saved to and loaded from Local Storage using `JSON.stringify()` and `JSON.parse()`. Use the function form of `useState` to load any saved todos when the component first mounts, with a safe fallback to an empty array. Add a "Clear All Todos" button that empties both the state and Local Storage. Confirm your todos survive a full page refresh.

## Lesson Summary

* Local Storage only stores strings, so arrays and objects must be converted with `JSON.stringify()` before saving and `JSON.parse()` after reading.
* `useEffect` is commonly used both to load saved data when a component mounts, and to save data automatically whenever it changes.
* Passing a function to `useState` lets you read from Local Storage once, directly when state is initialized, avoiding an extra loading effect.
* Always provide a safe fallback value when reading from Local Storage, since it may be empty for a first-time visitor.
* Local Storage should never be used to store sensitive information like passwords or private tokens, since it is plain text accessible to any script on the page.

