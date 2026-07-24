# Lesson 8: State and useState

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what state is and why components need it
* Explain why normal variables do not update the screen
* Import and use the `useState` hook
* Understand the initial value, current state, and state update function
* Build a counter using state
* Build a toggle using boolean state
* Update text, boolean, array, and object state correctly
* Explain why state should never be modified directly
* Use the previous-state callback form of the update function

## Introduction

You now know how to handle events like clicks — but so far, your event handlers have only logged messages to the console. Nothing on the actual page changes when a button is clicked. That is because React does not automatically re-render a component just because a regular variable changed.

This is exactly the problem **state** solves. State is how a component remembers information and tells React, "something changed — please update the screen."

## Main Concept

### What is state?

**State** is data that a component keeps track of and that can change over time — like a counter's current number, whether a menu is open, or the text a user has typed. When state changes, React automatically re-renders the component to reflect the new value on the screen.

### Why normal variables do not update the screen

You might expect this to work:

```jsx
function Counter() {
  let count = 0;

  function increaseCount() {
    count = count + 1;
    console.log(count);
  }

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}
```

If you click the button, `count` really does change in the console log — but the number displayed on the screen never updates. This is because a normal variable does not tell React that anything happened. React has no way of knowing it should re-run the component and update the page. Regular variables also reset back to their starting value every time the component re-renders for any other reason.

State fixes both problems: it persists across re-renders, and updating it tells React to re-render the component automatically.

### Importing `useState`

`useState` is a special function provided by React, called a **hook**. You import it like this:

```jsx
import { useState } from "react";
```

### Initial value, current state, and the state update function

`useState` is called with one argument: the **initial value** of the state. It returns an array with exactly two items: the **current state value**, and a **function to update it**.

```jsx
const [count, setCount] = useState(0);
```

* `0` is the initial value — the state starts at `0` the first time the component renders.
* `count` is the current state value — read it just like a normal variable.
* `setCount` is the update function — calling it changes the state and tells React to re-render the component with the new value.

This pattern, `const [value, setValue] = useState(initialValue);`, is used constantly in React, and the naming convention (`count` / `setCount`, `name` / `setName`) makes code easy to follow.

### Counter example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}
```

Now, clicking the button calls `setCount(count + 1)`, which updates the state and causes React to re-render `Counter`, showing the new number on the screen.

### Toggle example

State does not have to be a number — a boolean is a common way to track something that switches on and off:

```jsx
import { useState } from "react";

function ToggleBox() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
    </div>
  );
}
```

`!isOpen` flips the boolean: `true` becomes `false`, and `false` becomes `true`.

### Updating text

```jsx
import { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

### Updating arrays

State can also hold arrays, which is useful for things like a list of todos or added items. Because state must never be changed directly, you create a **new array** instead of modifying the existing one:

```jsx
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(["Buy groceries"]);

  function addTodo() {
    setTodos([...todos, "New task"]);
  }

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

`[...todos, "New task"]` creates a brand-new array containing everything from `todos`, plus the new item at the end. The spread operator `...` copies the existing items.

### Updating objects

The same rule applies to objects — you create a new object instead of modifying the existing one:

```jsx
import { useState } from "react";

function ProfileForm() {
  const [profile, setProfile] = useState({ name: "", age: 0 });

  function updateName(newName) {
    setProfile({ ...profile, name: newName });
  }

  return <p>{profile.name}</p>;
}
```

`{ ...profile, name: newName }` creates a new object with all the existing properties of `profile`, but with `name` overwritten by `newName`.

### Never modifying state directly

This code is **incorrect** and must be avoided:

```jsx
todos.push("New task");    // Wrong: modifies the array directly
setTodos(todos);
```

```jsx
profile.name = "New Name"; // Wrong: modifies the object directly
setProfile(profile);
```

Modifying state directly can cause React to miss the update entirely, since React checks whether the state value changed to decide if it should re-render. Always create a new array or object instead, as shown above.

### Previous state callback

Sometimes a state update depends on the previous value, especially when multiple updates might happen close together. Instead of `setCount(count + 1)`, you can pass a function to the update function, which receives the guaranteed latest previous state:

```jsx
function increaseCount() {
  setCount((previousCount) => previousCount + 1);
}
```

This form is safer when you need to be certain you are building on the most up-to-date value, and is considered a best practice for updates that depend on the current state.

## Syntax

```jsx
import { useState } from "react";

const [stateValue, setStateValue] = useState(initialValue);
```

## Simple Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}

export default Counter;
```

## Explanation of the Example

* `useState(0)` creates a piece of state starting at `0`.
* `count` holds the current value; `setCount` is the function used to change it.
* `increaseCount` calls `setCount(count + 1)`, telling React the state should become one more than its current value.
* Because state changed, React automatically re-renders `Counter`, and the new value of `count` appears in the `h2`.
* Unlike the earlier broken example with a plain variable, this version correctly updates the screen every time the button is clicked.

## More Examples

**Example 1: A show/hide toggle for a menu**

```jsx
import { useState } from "react";

function Menu() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Menu" : "Show Menu"}
      </button>
      {isVisible && <p>Menu content goes here.</p>}
    </div>
  );
}
```

**Example 2: A like button that tracks a count with the previous-state form**

```jsx
import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((previousLikes) => previousLikes + 1);
  }

  return (
    <button onClick={handleLike}>
      👍 {likes}
    </button>
  );
}
```

**Example 3: Removing an item from an array in state**

```jsx
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(["Buy groceries", "Clean the house"]);

  function removeTodo(indexToRemove) {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button onClick={() => removeTodo(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
```

`todos.filter(...)` returns a brand-new array containing every item except the one being removed, instead of modifying the original array.

## Common Mistakes

* **Using a regular variable instead of state** for data that needs to update the screen.
* **Modifying state directly**, such as `todos.push(...)` or `profile.name = ...`, instead of creating a new array or object.
* **Forgetting to import `useState`** from `"react"` before using it.
* **Reading state right after calling its setter and expecting the updated value immediately,** for example logging `count` on the very next line after `setCount(count + 1)`. State updates do not happen instantly — the new value is only available on the next render.
* **Calling a state setter directly during render instead of inside an event handler,** which can cause an infinite loop of re-renders.

## Best Practices

* Use `useState` for any value that should cause the UI to update when it changes.
* Always create new arrays and objects when updating array or object state, using the spread operator (`...`) or array methods like `map`, `filter`, and `concat` that return new arrays.
* Use the previous-state callback form (`setCount((prev) => prev + 1)`) when a new state value depends on the current one.
* Name state variables and their setters clearly and consistently, following the `value` / `setValue` pattern.
* Keep each piece of state focused on one clear purpose, rather than cramming unrelated values into a single state variable.

## Classroom Practice

1. As a class, build a counter component with "Increase" and "Decrease" buttons using `useState`.
2. Build a toggle component that switches a piece of text between "Logged In" and "Logged Out" when a button is clicked.
3. Take an array of three todo strings in state, and add a button that adds a new todo to the list without modifying the original array directly.

## Student Exercises

1. Build a `LikeButton` component that starts at 0 likes and increases by one each time it is clicked, using the previous-state callback form.
2. Build a `ColorSwitcher` component with boolean state that toggles a box between two background colors when clicked.
3. Build a small list of favorite foods in state, with a button that removes the last item from the list each time it is clicked, without modifying the array directly.

## Mini Assignment

Build a `ShoppingCart` component that keeps an array of item names in state, starting with two items already in the cart. Add an input and a button that lets the user type a new item name and add it to the cart array. Add a "Clear Cart" button that resets the array to empty. Make sure the array is never modified directly — always create a new array when updating it.

## Lesson Summary

* State is data a component tracks that can change over time and causes React to re-render when it changes.
* Regular variables do not update the screen, because changing them does not tell React anything happened.
* `useState(initialValue)` returns an array with the current state value and a function to update it: `const [value, setValue] = useState(initialValue)`.
* State can hold numbers, strings, booleans, arrays, or objects.
* State must never be modified directly — always create a new array or object when updating array or object state.
* The previous-state callback form, `setValue((prev) => ...)`, safely builds on the latest state value.

## Teacher Notes

* Start by live-coding the broken "plain variable" counter first, and let students predict what will happen before running it — seeing it fail to update makes the need for `useState` concrete.
* Common confusion: students often expect `console.log(count)` right after calling `setCount(...)` to show the new value. Explain clearly that state updates apply on the next render, not instantly.
* Spend extra time on the array and object immutability rules, since this is one of the most common sources of subtle bugs later in the course, especially once forms and lists are combined.
* Ask: "Why do you think React cares whether we create a new array instead of just modifying the old one?" to build intuition about how React detects changes.
* Suggested duration: 120 minutes — this is one of the most important lessons in the entire course and benefits from extra time and practice.