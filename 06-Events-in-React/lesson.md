# Lesson 7: Events in React

## Learning Objectives

By the end of this lesson, students will be able to:

* Handle click events using `onClick`
* Handle input change events using `onChange`
* Handle form submission events using `onSubmit`
* Handle mouse events using `onMouseEnter`
* Write and connect event handler functions
* Explain the difference between passing a function and calling it immediately
* Use the event object passed to event handlers
* Use `preventDefault()` to stop default browser behavior
* Pass arguments to event handlers

## Introduction

You already know how to handle events in vanilla JavaScript using `addEventListener`. React handles events in a similar spirit, but with its own syntax that fits naturally into JSX. This lesson covers how to listen for clicks, input changes, form submissions, and more, the React way — laying the foundation for Lesson 8, where you will use events to update state.

## Main Concept

### `onClick`

To respond to a click in React, you use the `onClick` attribute directly in JSX, and give it a function to run:

```jsx
function handleClick() {
  console.log("Button clicked!");
}

function App() {
  return <button onClick={handleClick}>Click Me</button>;
}
```

### `onChange`

`onChange` fires whenever the value of an input, textarea, or select changes — for example, every time the user types a character:

```jsx
function handleChange(event) {
  console.log(event.target.value);
}

function App() {
  return <input type="text" onChange={handleChange} />;
}
```

### `onSubmit`

`onSubmit` fires when a form is submitted, whether by clicking a submit button or pressing Enter inside a form field:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted!");
}

function App() {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### `onMouseEnter`

`onMouseEnter` fires when the mouse pointer moves onto an element, which is useful for hover effects driven by JavaScript rather than CSS alone:

```jsx
function handleMouseEnter() {
  console.log("Mouse entered the box!");
}

function App() {
  return <div onMouseEnter={handleMouseEnter}>Hover over me</div>;
}
```

### Event handler functions

An **event handler** is simply a function that runs in response to an event. It is common practice to define the function separately and give it a clear name describing what it does, like `handleClick` or `handleSubmit`, rather than writing complex logic directly inline.

### Passing a function instead of calling it immediately

This is one of the most important rules for React events, and one of the most common beginner mistakes. Compare these two:

```jsx
<button onClick={handleClick}>Click</button>
```

```jsx
<button onClick={handleClick()}>Click</button>
```

The first version passes the **function itself** to `onClick`. React will call it later, only when the button is actually clicked.

The second version **calls the function immediately** while the component is rendering, because of the parentheses `()`. This runs `handleClick` right away, not when the button is clicked, and usually causes bugs. Always pass the function itself, without calling it, unless you are intentionally wrapping it in another function (covered below).

### Event objects

Every event handler automatically receives an **event object** as its first argument, usually named `event` or `e`. This object contains useful information about what happened:

```jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

`event.target` refers to the actual DOM element that triggered the event — in this case, the input the user is typing into. `event.target.value` gives you the input's current text.

### `preventDefault()`

Some HTML elements have default browser behavior. Forms, for example, reload the page by default when submitted. In a React app, you almost always want to stop this, so your component can handle the submission with JavaScript instead:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Form handled without a page reload.");
}
```

### Passing arguments to event handlers

Sometimes you need to pass extra information to an event handler, such as which specific item in a list was clicked. Since you cannot call the function directly (`onClick={handleClick(id)}` would call it immediately, as explained above), you wrap it in an arrow function instead:

```jsx
function handleDelete(id) {
  console.log("Deleting item with id:", id);
}

function App() {
  return <button onClick={() => handleDelete(5)}>Delete</button>;
}
```

Here, `() => handleDelete(5)` is a new function that React calls when the button is clicked. When it runs, it then calls `handleDelete(5)` with the argument you specified. This correctly delays the call until the actual click happens.

## Syntax

```jsx
<element onEventName={handlerFunction} />
```

```jsx
<element onEventName={(event) => handlerFunction(argument)} />
```

## Simple Example

```jsx
function handleClick() {
  console.log("Button was clicked!");
}

function App() {
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

## Explanation of the Example

* `handleClick` is defined as a regular function that logs a message.
* `<button onClick={handleClick}>` passes the function itself to `onClick`, without calling it.
* When the button is clicked, React calls `handleClick` for you, running the code inside it.
* No parentheses are used after `handleClick` in the JSX, since adding them would call the function immediately during rendering instead of waiting for the click.

## More Examples

**Example 1: Tracking input value with `onChange`**

```jsx
function handleChange(event) {
  console.log("Current input value:", event.target.value);
}

function App() {
  return <input type="text" placeholder="Type something..." onChange={handleChange} />;
}
```

**Example 2: A form using `onSubmit` and `preventDefault()`**

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted without reloading the page.");
}

function App() {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Example 3: Passing an argument to an event handler for a list item**

```jsx
function handleDelete(productName) {
  console.log("Deleting:", productName);
}

function ProductCard({ name }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <button onClick={() => handleDelete(name)}>Delete</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProductCard name="Wireless Mouse" />
      <ProductCard name="Keyboard" />
    </div>
  );
}
```

Each `ProductCard`'s delete button calls `handleDelete` with that specific product's name, thanks to the arrow function wrapper.

**Example 4: Using `onMouseEnter` for a hover interaction**

```jsx
function handleMouseEnter() {
  console.log("Card hovered!");
}

function ServiceCard() {
  return (
    <div className="service-card" onMouseEnter={handleMouseEnter}>
      <h3>Cleaning Service</h3>
    </div>
  );
}
```

## Common Mistakes

* **Calling the function instead of passing it,** writing `onClick={handleClick()}` instead of `onClick={handleClick}`, which runs the function immediately on render instead of on click.
* **Forgetting `event.preventDefault()` in a form submit handler,** which causes the page to reload and lose all component state.
* **Forgetting that `event` must be the parameter name (or any name) in the handler function to access event details,** and then trying to read `event.target.value` without accepting the event parameter at all.
* **Passing arguments incorrectly,** writing `onClick={handleDelete(id)}` instead of `onClick={() => handleDelete(id)}`, which calls the function immediately rather than on click.
* **Using lowercase event names,** such as `onclick` instead of `onClick`. React event names are camelCase.

## Best Practices

* Give event handler functions clear, descriptive names starting with `handle`, such as `handleClick`, `handleSubmit`, or `handleDelete`.
* Always call `event.preventDefault()` in form submit handlers in React apps, unless you specifically want the default browser behavior.
* Use arrow functions only when you need to pass extra arguments to a handler; otherwise, pass the named function directly for clarity and slightly better performance.
* Keep event handler functions focused on one clear action, and move complex logic into separate helper functions if needed.

## Classroom Practice

1. As a class, create a button that logs a message to the console when clicked, using a named handler function.
2. Add an `onChange` handler to a text input that logs the current value as the user types.
3. Build a form with `onSubmit`, using `preventDefault()` to stop the page from reloading, and log a submission message instead.

## Student Exercises

1. Create a button that changes what it logs based on an argument you pass to its handler function (for example, logging different messages for "Like" and "Dislike" buttons using the same handler).
2. Add an `onMouseEnter` handler to a card component that logs the name of the card being hovered.
3. Build a small form with two inputs and a submit button, and log both input values together when the form is submitted (hint: you can read each input's value from separate `onChange` handlers, or directly from the form on submit).

## Mini Assignment

Build a `ProductCard` component that displays a product name and has two buttons: "Add to Cart" and "Remove from Cart." Both buttons should call the same handler function, `handleCartAction`, but pass a different argument (for example, `"add"` or `"remove"`) so the handler can log which action was taken and for which product. Test that clicking each button logs the correct, specific message in the console.

## Lesson Summary

* React events use camelCase attributes like `onClick`, `onChange`, `onSubmit`, and `onMouseEnter` directly in JSX.
* Event handlers are functions that run in response to user interaction.
* Always pass the function itself to an event attribute — calling it with parentheses runs it immediately during render instead of waiting for the event.
* Every event handler receives an event object, commonly used to read `event.target.value` from inputs.
* `event.preventDefault()` stops default browser behavior, most commonly used to stop form submissions from reloading the page.
* To pass extra arguments to a handler, wrap the call in an arrow function: `() => handleDelete(id)`.

## Teacher Notes

* Spend real time on the "calling vs. passing" distinction — this is one of the most persistent beginner bugs in React. Show both versions live and have students predict what will happen before running the code.
* Common confusion: students sometimes think `preventDefault()` prevents the form's `onSubmit` handler from running. Clarify that it only stops the browser's default behavior (like reloading), not your own code.
* Ask: "Why do you think React uses `onClick` instead of the `addEventListener` you already know?" to connect back to prior JavaScript knowledge and highlight that JSX event attributes are just a different syntax for a similar idea.
* Demonstration idea: log `event` itself to the console and let students explore its properties in the browser dev tools.
* Suggested duration: 90 minutes, since this lesson sets up all the interactivity used in the rest of the course.