# Lesson 5: Props and Reusable Components

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what props are and why they exist
* Explain how data flows from parent to child components
* Pass strings, numbers, and variables as props
* Pass multiple props to a single component
* Explain why props are read-only
* Build genuinely reusable components using props
* Use basic destructuring to simplify working with props

## Introduction

In Lesson 4, you rendered the same component multiple times, but every copy looked identical because there was no way to give each one different data. That is exactly what **props** solve.

Props let a parent component pass data down into a child component, so the same component can display different content each time it is used — just like a real `StudentCard` component should show a different student's name each time.

## Main Concept

### What are props?

**Props** (short for "properties") are how data is passed from a parent component into a child component. They work similarly to function arguments — the parent decides what values to send, and the child receives them and uses them to render its content.

### Parent-to-child data flow

Props always flow in **one direction**: from parent to child. A child component cannot send props back up to its parent directly. This one-way flow is intentional — it keeps data predictable, since you can always trace where a value came from by looking at the parent.

### Passing strings, numbers, and variables

Props are passed the same way you would pass attributes to an HTML element, but the values can be any JavaScript data:

```jsx
<StudentCard name="Amina" age={20} />
```

* `name="Amina"` passes a plain string. Quotes are used directly, just like an HTML attribute.
* `age={20}` passes a number. Curly braces are required for anything that is not a plain string, since this tells JSX "this is a JavaScript value, not text."

You can also pass variables:

```jsx
const studentName = "Amina";
<StudentCard name={studentName} />
```

### Passing multiple props

A component can receive as many props as you want, just by adding more attributes:

```jsx
<StudentCard name="Amina" course="Web Development" age={20} />
```

### Receiving props in a component

Every function component automatically receives one argument, usually called `props`, which is an object containing all the props passed to it:

```jsx
function StudentCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.course}</p>
    </div>
  );
}
```

Here, `props` is an object like `{ name: "Amina", course: "Web Development" }`, and `props.name` and `props.course` read individual values out of it.

### Props are read-only

A component must **never** change the props it receives. Props belong to the parent — the child only reads them. If a child needs to change data, it asks the parent to change it (you will learn the pattern for this properly in Lesson 15, Lifting State Up). For now, just remember: read props, never modify them directly.

### Reusable components

Because each instance of a component can receive different props, the same component definition can be reused with completely different data:

```jsx
<StudentCard name="Amina" course="Web Development" />
<StudentCard name="Yusuf" course="Data Science" />
<StudentCard name="Hodan" course="UI/UX Design" />
```

This single `StudentCard` component now displays three different students, without writing three separate components.

### Basic destructuring after the normal `props` syntax is understood

Once you are comfortable with `props.name`, `props.course`, and so on, you can simplify a component using **destructuring**, which pulls values directly out of the `props` object in the function's parameter list:

```jsx
function StudentCard({ name, course }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{course}</p>
    </div>
  );
}
```

Both versions work exactly the same way. The destructured version is shorter to write and read, since you use `name` and `course` directly instead of typing `props.name` and `props.course` every time. Most React developers prefer the destructured version once they are comfortable with props, but understanding the plain `props.name` version first makes it clear what is actually happening underneath.

## Syntax

```jsx
// Passing props (in the parent)
<ComponentName propOne="value" propTwo={someVariable} />
```

```jsx
// Receiving props (props object version)
function ComponentName(props) {
  return <div>{props.propOne}</div>;
}
```

```jsx
// Receiving props (destructured version)
function ComponentName({ propOne, propTwo }) {
  return <div>{propOne}</div>;
}
```

## Simple Example

```jsx
function StudentCard(props) {
  return (
    <div className="student-card">
      <h2>{props.name}</h2>
      <p>{props.course}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentCard name="Amina" course="Web Development" />
      <StudentCard name="Yusuf" course="Data Science" />
    </div>
  );
}

export default App;
```

## Explanation of the Example

* `StudentCard(props)` receives one argument, `props`, which is an object.
* `<StudentCard name="Amina" course="Web Development" />` creates `props` equal to `{ name: "Amina", course: "Web Development" }` for that specific instance of the component.
* `props.name` and `props.course` read those values and display them inside the JSX.
* Because two separate `<StudentCard />` elements are used with different attribute values, the same component renders two different cards — this is reusability in action.

## More Examples

**Example 1: ProductCard with a number prop**

```jsx
function ProductCard(props) {
  return (
    <div className="product-card">
      <h3>{props.name}</h3>
      <p>${props.price}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProductCard name="Wireless Mouse" price={15} />
      <ProductCard name="Keyboard" price={30} />
    </div>
  );
}
```

**Example 2: ServiceCard using a variable passed as a prop**

```jsx
function ServiceCard(props) {
  return (
    <div className="service-card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

function App() {
  const cleaningDescription = "Deep cleaning for homes and offices.";

  return (
    <ServiceCard
      title="Cleaning Service"
      description={cleaningDescription}
    />
  );
}
```

**Example 3: The same StudentCard rewritten with destructuring**

```jsx
function StudentCard({ name, course }) {
  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p>{course}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentCard name="Amina" course="Web Development" />
      <StudentCard name="Yusuf" course="Data Science" />
    </div>
  );
}
```

This behaves identically to the first example — only the way the component reads its props has changed.

## Common Mistakes

* **Forgetting curly braces for non-string props,** writing `age="20"` (a string) when a number was intended, instead of `age={20}`.
* **Trying to modify props inside the child component,** for example `props.name = "New Name";`. Props must never be reassigned.
* **Misspelling a prop name** between where it is passed and where it is read, such as passing `name` but reading `props.Name` (capitalization matters).
* **Forgetting to pass a required prop,** which results in the value being `undefined` inside the component, often showing blank text on the page.
* **Destructuring props before being comfortable with the plain `props.x` version,** which can make debugging harder for beginners since it is less obvious where each value comes from.

## Best Practices

* Give props clear, descriptive names that match what the data represents (`name`, `price`, `course`) rather than vague names (`data`, `value1`).
* Keep components that only display data (like `StudentCard`) focused purely on rendering the props they receive, without other unrelated logic.
* Once comfortable, prefer destructured props for readability in components that use several props.
* Pass only the props a component actually needs — avoid passing large, unrelated objects when a few specific values are sufficient.

## Classroom Practice

1. As a class, create a `ProductCard` component that accepts `name` and `price` props, then render it three times with different products.
2. Take a `StudentCard` component written with `props.name` and `props.course`, and rewrite it together using destructuring.
3. Intentionally pass the wrong prop name (for example, pass `title` but read `props.name`) and observe what happens on the page, then fix it.

## Student Exercises

1. Create a `ServiceCard` component that accepts `title` and `description` props, and use it to display three different services.
2. Create a `UserProfile` component that accepts `username`, `email`, and `age` props (mixing strings and a number), and render it with your own information.
3. Take any component you built in Lesson 4 that had no props, and add at least two props to make it reusable with different data.

## Mini Assignment

Build a `ProductCard` component that accepts `name`, `price`, and `inStock` (a boolean) as props. Render at least four different `ProductCard` elements inside `App`, each with different values. Write the component first using `props.name` style, then create a second version using destructuring, and compare the two side by side in comments.

## Lesson Summary

* Props let parent components pass data down into child components.
* Data always flows one way: from parent to child.
* Props can be strings (in quotes), or any other JavaScript value using curly braces, including numbers and variables.
* A component receives all its props as a single object, commonly named `props`.
* Props must never be modified inside the component that receives them — they are read-only.
* The same component can be reused many times with different props, producing different output each time.
* Destructuring (`{ name, course }`) is a shorter way to read props once you understand how `props.name` works underneath.

## Teacher Notes

* Build directly on Lesson 4 by literally reusing the `StudentCard` example and asking students to notice the identical output problem before introducing props as the solution.
* Common confusion: students often forget curly braces when passing numbers or variables as props. Show the difference between `age="20"` and `age={20}` explicitly, including a quick check with `typeof`.
* Emphasize the read-only nature of props strongly here — this concept becomes essential when state and lifting state up are introduced later.
* Ask: "If a child component wanted to change its name, what do you think it would need to ask its parent to do?" to plant the seed for later lessons without answering it yet.
* Suggested duration: 75–90 minutes.