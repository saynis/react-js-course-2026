# Lesson 9: Conditional Rendering

## Learning Objectives

By the end of this lesson, students will be able to:

* Use plain `if` statements to decide what a component renders
* Use the ternary operator to choose between two pieces of JSX
* Use the logical AND (`&&`) operator to show or hide content
* Show loading messages while data is not ready
* Show empty-state messages when there is no data
* Build a simple login/logout interface using conditional rendering
* Apply conditional CSS classes based on state
* Avoid deeply nested ternary operators

## Introduction

In Lesson 8, you saw a small example using `isVisible && <p>...</p>` without a full explanation. This lesson covers **conditional rendering** properly — the different ways to show, hide, or switch between pieces of JSX based on data or state. This is essential for building realistic interfaces: loading spinners, empty states, login screens, and more all rely on conditional rendering.

## Main Concept

### Using `if`

You already know `if` statements from JavaScript fundamentals. Inside a component, you can use a plain `if` statement **before** the `return` to decide what JSX the component should return:

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h2>Welcome back!</h2>;
  }

  return <h2>Please log in.</h2>;
}
```

This works well when you need to return a completely different piece of JSX depending on a condition, rather than just a small part of it.

### The ternary operator

Inside JSX itself, you cannot use a plain `if` statement directly (as you learned in Lesson 3, only expressions are allowed inside curly braces). The **ternary operator** (`condition ? valueIfTrue : valueIfFalse`) is an expression, which makes it perfect for choosing between two small pieces of JSX inline:

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```

### Logical AND (`&&`)

Sometimes you only want to show something when a condition is true, and show nothing at all otherwise — with no "else" case. The `&&` operator is a short, common pattern for this:

```jsx
function Notification({ hasNewMessages }) {
  return (
    <div>
      {hasNewMessages && <p>You have new messages!</p>}
    </div>
  );
}
```

If `hasNewMessages` is `true`, the `<p>` is shown. If it is `false`, JavaScript stops evaluating after `false &&`, so nothing renders at all.

A word of caution: if the value before `&&` is a number like `0`, JSX will actually render the `0` on the page, since `0` is a valid, renderable value in JavaScript. Prefer using an explicit boolean (such as `count > 0 && ...`) rather than the raw number itself.

### Showing loading messages

A very common pattern is showing a loading message while data is being prepared or fetched (you will use this heavily in Lesson 12, API Fetching):

```jsx
function ProductList({ isLoading }) {
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return <p>Products loaded!</p>;
}
```

### Showing empty-state messages

You saw this pattern briefly in Lesson 6. It is worth repeating here as a core conditional rendering technique:

```jsx
function StudentList({ students }) {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}
```

### Login/logout interface

Conditional rendering is exactly how login and logout interfaces are built — switching between two different views based on a single boolean:

```jsx
function AuthButton({ isLoggedIn, onLogout, onLogin }) {
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={onLogout}>Log Out</button>
      ) : (
        <button onClick={onLogin}>Log In</button>
      )}
    </div>
  );
}
```

### Conditional CSS classes

You can also use conditional logic to decide which CSS class to apply, which is useful for highlighting active items, showing errors, or styling based on state:

```jsx
function TodoItem({ text, isCompleted }) {
  return (
    <p className={isCompleted ? "completed" : "pending"}>
      {text}
    </p>
  );
}
```

### Avoiding deeply nested ternary operators

A single ternary is easy to read. Nesting several ternary operators inside each other quickly becomes very hard to follow:

```jsx
// Avoid this — hard to read
{status === "loading" ? (
  <p>Loading...</p>
) : status === "error" ? (
  <p>Something went wrong.</p>
) : status === "empty" ? (
  <p>No data.</p>
) : (
  <p>Here is your data.</p>
)}
```

When you have more than two possible outcomes, it is clearer to use `if` statements before the `return`, or to break the logic into a separate function that returns the right piece of JSX:

```jsx
function renderContent(status) {
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Something went wrong.</p>;
  if (status === "empty") return <p>No data.</p>;
  return <p>Here is your data.</p>;
}

function StatusMessage({ status }) {
  return <div>{renderContent(status)}</div>;
}
```

## Syntax

```jsx
// if statement (before return)
if (condition) {
  return <ComponentA />;
}
return <ComponentB />;
```

```jsx
// Ternary (inside JSX)
{condition ? <ComponentA /> : <ComponentB />}
```

```jsx
// Logical AND (inside JSX)
{condition && <ComponentA />}
```

## Simple Example

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h2>Welcome back!</h2> : <h2>Please log in.</h2>}
    </div>
  );
}

export default Greeting;
```

## Explanation of the Example

* `isLoggedIn` is a prop that is either `true` or `false`.
* The ternary operator `isLoggedIn ? <h2>Welcome back!</h2> : <h2>Please log in.</h2>` chooses one of the two headings based on that value.
* Because the ternary is an expression, it can be embedded directly inside the curly braces in JSX, unlike a plain `if` statement.
* If `isLoggedIn` changes (for example, because of a state update in a parent component), React re-renders this component and automatically shows the correct heading.

## More Examples

**Example 1: A loading state for a list of products**

```jsx
function ProductList({ isLoading, products }) {
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

This example combines a loading check and an empty-state check with `if` statements before falling through to the actual list.

**Example 2: Showing a badge only when there are unread notifications**

```jsx
function NotificationIcon({ unreadCount }) {
  return (
    <div className="notification-icon">
      🔔
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
}
```

Using `unreadCount > 0` instead of just `unreadCount` avoids the risk of `0` being rendered on the page.

**Example 3: Conditional class names for a to-do item**

```jsx
function TodoItem({ text, isCompleted, onToggle }) {
  return (
    <li
      className={isCompleted ? "todo-completed" : "todo-pending"}
      onClick={onToggle}
    >
      {text}
    </li>
  );
}
```

**Example 4: Login/logout using state**

```jsx
import { useState } from "react";

function AuthSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome back!</p>
          <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={() => setIsLoggedIn(true)}>Log In</button>
        </div>
      )}
    </div>
  );
}
```

## Common Mistakes

* **Trying to use a plain `if` statement directly inside JSX curly braces.** `if` is a statement, not an expression, so it cannot go inside `{}` in JSX — use a ternary, `&&`, or move the `if` above the `return`.
* **Using `&&` with a number that can be `0`,** which causes `0` to render unexpectedly on the page instead of nothing.
* **Nesting three or more ternary operators together,** making the code very hard to read and debug.
* **Forgetting the parentheses around multi-line JSX inside a ternary,** which can cause confusing syntax errors.
* **Checking the wrong condition for an empty state,** such as checking if a variable is `undefined` when it is actually an empty array (`[].length === 0` is `true`, but `undefined` is also falsy — these need to be handled differently depending on your data).

## Best Practices

* Use `if` statements before the `return` when choosing between two entirely different pieces of JSX for a whole component.
* Use the ternary operator for small, inline either/or choices within JSX.
* Use `&&` only for simple "show this or show nothing" cases, and make sure the condition is a proper boolean.
* Avoid nesting more than one ternary operator — extract the logic into a helper function or use `if` statements instead once you have more than two outcomes.
* Always plan for loading and empty states in any component that displays data that might not be ready yet, since this makes the app feel much more polished and predictable.

## Classroom Practice

1. As a class, build a `Greeting` component that shows "Good morning" or "Good evening" using a ternary based on a boolean prop.
2. Add a `&&` condition to a component that only shows a "New!" label when a prop called `isNew` is `true`.
3. Take a `StatusMessage` component with three possible states (`"loading"`, `"error"`, `"success"`) and rewrite it from nested ternaries into clean `if` statements.

## Student Exercises

1. Build a `WeatherMessage` component that shows different text depending on a `temperature` prop (for example, "It's hot!" if above 30, "It's cold!" if below 10, and "Nice weather!" otherwise), using `if` statements.
2. Build a `CartIcon` component that only shows a count badge when the number of items in the cart is greater than zero.
3. Build a `TaskItem` component that applies a different CSS class depending on whether a task is marked complete.

## Mini Assignment

Build a `Dashboard` component with a boolean `isLoading` prop and an array `students` prop. If `isLoading` is `true`, show a loading message. If it is `false` and the array is empty, show a "No students yet" message. If it is `false` and the array has items, render the list of student names. Test your component by manually passing different combinations of props (loading, empty, and populated) and confirming each case displays correctly.

## Lesson Summary

* `if` statements can be used before `return` to choose between entirely different JSX for a component.
* The ternary operator (`condition ? a : b`) works as an expression and can be embedded directly inside JSX.
* The `&&` operator shows content only when a condition is true, and nothing when it is false — watch out for numeric `0` being rendered unexpectedly.
* Loading and empty states are common, important conditional rendering patterns for any component that displays data.
* Conditional rendering can also be used to apply different CSS classes based on state or props.
* Avoid deeply nested ternary operators — use `if` statements or a helper function once there are more than two possible outcomes.

## Teacher Notes

* Reuse the `StudentList` empty-array example from Lesson 6 here, and explicitly connect it to today's broader topic of conditional rendering.
* Common confusion: students often try to write `if` directly inside `{}` in JSX and are confused by the resulting syntax error. Remind them of the expressions-vs-statements rule from Lesson 3.
* Demonstration idea: show the "0 renders on the page" bug live, using a cart count starting at 0 with a plain `count && <Badge />`, so students recognize and remember this exact pitfall.
* Ask: "At what point does a ternary become hard to read, and what would you do instead?" to build judgment about when to refactor to `if` statements.
* Suggested duration: 90 minutes.