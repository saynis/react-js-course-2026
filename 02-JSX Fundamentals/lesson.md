# Lesson 3: JSX Fundamentals

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what JSX is
* Explain that JSX looks like HTML but is written inside JavaScript
* Follow the "one parent element" rule
* Use React Fragments to avoid extra wrapper elements
* Correctly close all JSX tags
* Use `className` instead of `class`
* Insert JavaScript expressions using curly braces `{}`
* Apply inline styles in JSX
* Write comments inside JSX
* Use JSX attributes correctly
* Explain the key differences between HTML and JSX

## Introduction

In Lesson 1, you saw code like this:

```jsx
function App() {
  return <h1>Welcome</h1>;
}
```

That `<h1>Welcome</h1>` line looks like HTML, but it is sitting right inside a JavaScript function. This is **JSX** — a special syntax that lets you write HTML-like code directly inside your JavaScript files. In this lesson, you will learn the exact rules of JSX so you can write it correctly and confidently.

## Main Concept

### What is JSX?

**JSX** stands for **JavaScript XML**. It is a syntax extension for JavaScript that lets you write UI structure using tags that look like HTML, directly inside your `.jsx` files.

JSX is **not** HTML. It looks similar, but it is converted (compiled) into regular JavaScript function calls behind the scenes. As a beginner, you do not need to worry about that conversion — you just need to learn JSX's rules.

### JSX Looks Like HTML, But It Is JavaScript

Because JSX is JavaScript, you can mix JavaScript logic directly into your markup — something plain HTML can never do.

```jsx
function Greeting() {
  const name = "Sarah";
  return <h1>Hello, {name}!</h1>;
}
```

The `{name}` part is a JavaScript expression, evaluated and inserted directly into the output. You will use this constantly.

### Rule 1: One Parent Element

A component can only return **one** top-level element. This is incorrect:

```jsx
// Incorrect — two top-level elements
function Profile() {
  return (
    <h1>Name</h1>
    <p>Bio</p>
  );
}
```

This is correct — everything is wrapped inside one parent `<div>`:

```jsx
// Correct — one top-level element
function Profile() {
  return (
    <div>
      <h1>Name</h1>
      <p>Bio</p>
    </div>
  );
}
```

### Rule 2: React Fragments

Sometimes you do not want an extra `<div>` in your HTML output just to satisfy the "one parent" rule. React gives you a **Fragment** for this — it groups elements without adding an extra element to the page.

```jsx
function Profile() {
  return (
    <>
      <h1>Name</h1>
      <p>Bio</p>
    </>
  );
}
```

The `<>` and `</>` are shorthand for `<React.Fragment>` and `</React.Fragment>`. Fragments are especially useful when a component's output needs to fit inside a table row or list without breaking the HTML structure.

### Rule 3: Close Every Tag

In HTML, some tags can be left open, like `<img>` or `<br>`. In JSX, **every** tag must be closed.

```jsx
// Incorrect
<img src="photo.jpg">
<br>

// Correct
<img src="photo.jpg" />
<br />
```

Self-closing tags (tags with no children, like `<img />` or `<input />`) must end with `/>`.

### Rule 4: `className` Instead of `class`

In JavaScript, `class` is a reserved keyword (used to create classes). Because JSX is JavaScript, you cannot use `class` for CSS classes. Use `className` instead.

```jsx
// Incorrect
<div class="card">Content</div>

// Correct
<div className="card">Content</div>
```

### Rule 5: JavaScript Expressions with Curly Braces

Anything inside curly braces `{}` in JSX is treated as a JavaScript expression and evaluated.

```jsx
function Order() {
  const price = 25;
  const quantity = 3;

  return (
    <p>Total: {price * quantity}</p>
  );
}
```

You can use variables, function calls, and math operations inside `{}`. You **cannot** use statements like `if` or `for` directly inside JSX curly braces (you will learn the correct patterns for conditions and loops in later lessons).

### Rule 6: Inline Styles

Inline styles in JSX are written as a JavaScript **object**, using `camelCase` property names instead of dashes.

```jsx
function Alert() {
  return (
    <p style={{ color: "red", fontSize: "18px" }}>
      This is a warning message.
    </p>
  );
}
```

Notice the double curly braces: the outer `{}` means "this is a JavaScript expression," and the inner `{}` is the actual style object.

### Rule 7: Comments in JSX

Regular JavaScript comments (`//` and `/* */`) do not work directly inside JSX markup. Inside JSX, comments must be wrapped in curly braces:

```jsx
function Card() {
  return (
    <div>
      {/* This is a comment inside JSX */}
      <h2>Product Name</h2>
    </div>
  );
}
```

Outside the JSX markup (in the regular JavaScript part of the file), normal comments still work as usual.

### Rule 8: JSX Attributes

JSX attributes look similar to HTML attributes, but some names are different because JSX follows JavaScript naming rules:

| HTML | JSX |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `tabindex` | `tabIndex` |

Most other attributes, like `id`, `src`, `alt`, and `href`, stay the same.

### Differences Between HTML and JSX — Summary

| HTML | JSX |
|---|---|
| Tags can be left unclosed (`<br>`) | All tags must be closed (`<br />`) |
| Uses `class` | Uses `className` |
| Can have multiple root elements | Must return one parent element (or a Fragment) |
| Cannot include JavaScript directly | Can include JavaScript using `{}` |
| Inline `style="color: red;"` (string) | Inline `style={{ color: "red" }}` (object) |
| Attribute names lowercase (`onclick`) | Attribute names camelCase (`onClick`) |

## Syntax

```jsx
function ComponentName() {
  return (
    <ParentElement>
      {/* comment */}
      <ChildElement className="example" style={{ color: "blue" }}>
        {javaScriptExpression}
      </ChildElement>
    </ParentElement>
  );
}
```

## Simple Example

```jsx
function Welcome() {
  const studentName = "Amina";

  return (
    <div className="welcome-box">
      {/* Greeting message */}
      <h1>Hello, {studentName}!</h1>
      <p style={{ color: "gray" }}>Welcome to your first JSX lesson.</p>
    </div>
  );
}

export default Welcome;
```

## Explanation of the Example

* `<div className="welcome-box">` is the single parent element wrapping everything else, following Rule 1.
* `className` is used instead of `class`, following Rule 4.
* `{/* Greeting message */}` is a JSX comment, following Rule 7.
* `{studentName}` inserts the value of the `studentName` variable directly into the text, following Rule 5.
* `style={{ color: "gray" }}` applies an inline style using a JavaScript object, following Rule 6.
* Every tag, including `<h1>` and `<p>`, is properly closed.

## More Examples

**Example 1: Using a Fragment to avoid an extra `<div>`**

```jsx
function StudentInfo() {
  return (
    <>
      <h2>Student Name: Karim</h2>
      <p>Course: Web Development</p>
    </>
  );
}
```

**Example 2: Using an expression inside an attribute**

```jsx
function ProfilePicture() {
  const imageUrl = "https://example.com/photo.jpg";
  const altText = "Student profile photo";

  return <img src={imageUrl} alt={altText} />;
}
```

**Example 3: Self-closing input element**

```jsx
function SearchBox() {
  return <input type="text" placeholder="Search products..." />;
}
```

## Common Mistakes

* **Returning two sibling elements without a parent.** Always wrap multiple elements in one parent `<div>` or a Fragment (`<>...</>`).
* **Using `class` instead of `className`.** This causes React to show a console warning and ignore the class.
* **Leaving tags unclosed.** `<img>` and `<input>` must be written as `<img />` and `<input />`.
* **Writing inline styles as a string.** `style="color:red"` is invalid in JSX; it must be an object: `style={{ color: "red" }}`.
* **Trying to use regular `//` comments inside JSX markup.** Use `{/* comment */}` instead.
* **Putting statements like `if` directly inside `{}` in JSX.** Curly braces only accept expressions, not statements (you will learn the correct patterns in Lesson 9).

## Best Practices

* Always wrap multi-line JSX in parentheses `(...)` for readability, as shown throughout this lesson.
* Prefer Fragments (`<>...</>`) over unnecessary `<div>` wrappers when you do not need the extra element for styling.
* Keep inline styles small; for larger styling needs, use a `className` and a separate CSS file.
* Format JSX with consistent indentation so the nesting of elements is easy to follow at a glance.
* Add JSX comments to explain non-obvious sections of markup, just like you would comment tricky JavaScript logic.

## Classroom Practice

1. As a class, take a broken JSX snippet with two sibling root elements and fix it together using a Fragment.
2. Convert a plain HTML snippet (given by the instructor) into valid JSX, fixing `class`, unclosed tags, and attribute names.
3. Live-code a component that displays a student's name and age using `{}` expressions pulled from variables.

## Student Exercises

1. Write a component called `Announcement` that displays a heading and a paragraph inside a Fragment (no extra `<div>`).
2. Write a component called `PriceTag` that stores a `price` variable and displays it inside a `<p>` tag using a JSX expression, formatted like `Price: $25`.
3. Write a component called `HighlightedText` that displays a sentence with inline styles making the text bold and colored orange.

## Mini Assignment

Create a component called `StudentProfile` that displays:

* A profile image using `<img />` with a `src` and `alt` attribute stored in variables
* A heading showing the student's name using a JSX expression
* A paragraph showing the student's course name
* At least one JSX comment explaining a section of the code
* At least one inline style applied to any element

Make sure the entire component follows every JSX rule covered in this lesson.

## Lesson Summary

* JSX is a JavaScript syntax extension that lets you write HTML-like markup inside JavaScript files.
* A component must return one parent element, or use a Fragment (`<>...</>`) to avoid adding an extra element.
* Every JSX tag must be properly closed, including self-closing tags like `<img />`.
* Use `className` instead of `class`, and camelCase attribute names like `onClick` and `htmlFor`.
* JavaScript expressions can be inserted into JSX using single curly braces `{}`.
* Inline styles are written as JavaScript objects with camelCase property names, using double curly braces `style={{ }}`.
* JSX comments must be written as `{/* comment */}`.

## Teacher Notes

* **Emphasize:** JSX is not a template language and not HTML — it compiles to JavaScript, which is why its rules follow JavaScript syntax.
* **Ask the class:** "Why do you think `class` had to be renamed to `className` in JSX?" (Answer: `class` is a reserved JavaScript keyword.)
* **Common confusion:** Students often try to write `if` statements or `for` loops directly inside `{}`. Reassure them this is intentional — Lesson 6 and Lesson 9 show the correct patterns.
* **Demonstration idea:** Deliberately write invalid JSX (missing closing tag, two root elements) and show the actual error message Vite displays, so students learn to recognize these errors on their own.
* **Suggested lesson duration:** 60 minutes, with significant hands-on practice time.