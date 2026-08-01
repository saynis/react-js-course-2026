# Lesson 11: useEffect Hook

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what a side effect is
* Explain why `useEffect` exists
* Import and use `useEffect`
* Understand the difference between running after every render, running once, and running when dependencies change
* Use the dependency array correctly
* Write cleanup functions
* Recognize and avoid common infinite loop mistakes

## Introduction

Everything you have built so far has lived entirely inside the render process: a component receives props and state, and returns JSX describing what should appear. But real applications also need to do things that are not directly about rendering — things like fetching data from an API, setting up a timer, or reading from Local Storage. These are called **side effects**, and `useEffect` is the tool React gives you to handle them properly.

This lesson focuses on understanding `useEffect` itself with simple examples. Lesson 12 will build directly on this to fetch real data from an API.

## Main Concept

### What are side effects?

A **side effect** is anything a component does that reaches outside of simply calculating what to render — for example:

* Fetching data from an API
* Reading or writing to Local Storage
* Setting up a timer with `setTimeout` or `setInterval`
* Manually interacting with the DOM outside of React's normal rendering
* Subscribing to an external event

### Why `useEffect` exists

Side effects need to happen at the right time — usually after the component has rendered, not while it is being calculated. `useEffect` lets you say, "after this component renders, run this code," and gives you control over exactly when it should run again.

### Importing `useEffect`

```jsx
import { useEffect } from "react";
```

It is commonly imported alongside `useState`:

```jsx
import { useState, useEffect } from "react";
```

### Running after every render

The most basic form of `useEffect` runs its code after every single render of the component:

```jsx
useEffect(() => {
  console.log("Component rendered!");
});
```

This is rarely what you actually want, because it runs constantly — every time state or props change, for any reason.

### Running once

By adding an **empty dependency array** (`[]`) as the second argument, the effect runs only **once**, right after the component's first render:

```jsx
useEffect(() => {
  console.log("Component mounted!");
}, []);
```

This pattern is extremely common — it is used for things that should only happen one time, like fetching initial data when a page first loads.

### Running when dependencies change

If you list one or more values inside the dependency array, the effect runs after the first render, and then again **every time one of those listed values changes**:

```jsx
useEffect(() => {
  console.log("The count changed to:", count);
}, [count]);
```

### Dependency arrays

The second argument to `useEffect` is called the **dependency array**. It tells React which values the effect depends on:

* No array at all → runs after every render.
* An empty array `[]` → runs only once, after the first render.
* An array with values `[value1, value2]` → runs after the first render, and again whenever any listed value changes.



### Common infinite loop mistakes

A very common beginner mistake is updating state inside `useEffect` without a proper dependency array, causing the effect to run again immediately after the update, forever:

```jsx
// Dangerous: this creates an infinite loop
useEffect(() => {
  setCount(count + 1);
});
```

Here, the effect runs after every render, and calling `setCount` inside it causes another render, which runs the effect again, which calls `setCount` again — forever. Always be careful about which state you update inside `useEffect`, and use the dependency array correctly to control exactly when the effect should run.

## Syntax

```jsx
import { useEffect } from "react";

useEffect(() => {
  // side effect code

  return () => {
    // optional cleanup code
  };
}, [/* dependencies */]);
```

## Simple Example

```jsx
import { useState, useEffect } from "react";

function Logger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Logger;
```

## Explanation of the Example

* `useEffect` receives a function containing the side effect — here, logging the current count.
* The dependency array `[count]` tells React to run this effect after the first render, and again every time `count` changes.
* When the button is clicked, `setCount` updates state, `Logger` re-renders with the new count, and because `count` is listed as a dependency, the effect runs again and logs the new value.
* If the dependency array were `[]` instead, the log would only happen once, when the component first rendered, and never again — even though `count` keeps changing.

## More Examples

**Example 1: Running an effect only once, on mount**

```jsx
import { useEffect } from "react";

function WelcomeMessage() {
  useEffect(() => {
    console.log("Welcome message displayed!");
  }, []);

  return <h2>Welcome to the app!</h2>;
}
```



**Example 2: Updating the document title based on state**

```jsx
import { useState, useEffect } from "react";

function TitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

This shows a real, common side effect — reaching outside of the component to update something in the browser (the tab's title) — that only makes sense to do after rendering, not during it.

## Common Mistakes

* **Forgetting the dependency array entirely,** causing the effect to run after every single render, often unintentionally.
* **Updating state inside `useEffect` without a proper dependency array,** which can create an infinite loop of renders.
* **Listing the wrong dependencies,** or missing one, which can cause the effect to run at the wrong times or use stale, outdated values.
* **Forgetting to return a cleanup function for effects that set up timers, subscriptions, or other ongoing processes,** leaving them running even after the component is gone.
* **Confusing `useEffect`'s dependency array with a regular JavaScript array used elsewhere in the component.** The dependency array has a specific meaning to React and must only contain the actual values the effect depends on.

## Best Practices

* Always include every value from the component that the effect actually uses inside the dependency array, so the effect stays in sync with the data it depends on.
* Use an empty dependency array `[]` specifically for effects that should run exactly once, such as an initial data fetch.
* Always return a cleanup function for effects that set up timers, intervals, or subscriptions.
* Keep the code inside `useEffect` focused on one clear side effect — split unrelated side effects into separate `useEffect` calls rather than combining them into one.
* Think carefully before updating state inside `useEffect` — make sure the dependency array is set up so the effect does not trigger itself repeatedly.



## Mini Assignment

Build a `Stopwatch` component using `useState` and `useEffect`. It should count seconds upward automatically once it mounts, using `setInterval` inside a `useEffect` with an empty dependency array, and clean up the interval properly when the component is removed. Add a button that resets the counter back to zero without stopping the timer.

## Lesson Summary

* A side effect is anything a component does outside of calculating what to render, such as fetching data, using timers, or interacting with Local Storage.
* `useEffect` lets you run code after a component renders, with control over exactly when it should run again.
* No dependency array means the effect runs after every render; an empty array `[]` means it runs once; an array with values means it runs when any of those values change.
* Returning a function from inside `useEffect` defines a cleanup step, which React runs before the effect runs again or when the component is removed.
* Updating state inside `useEffect` without careful use of the dependency array can create an infinite loop of renders.

