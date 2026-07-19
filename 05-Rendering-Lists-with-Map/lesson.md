# Lesson 6: Rendering Lists with Map

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain why arrays are important for building real React applications
* Use `map()` to turn an array into a list of JSX elements
* Return JSX correctly from inside `map()`
* Explain what the `key` prop is and why React needs it
* Explain why unique IDs make better keys than array indexes
* Render an array of objects as a list of components
* Pass array data into reusable components
* Handle an empty array without breaking the UI

## Introduction

So far, every list you have rendered has been written by hand — three `StudentCard` elements, typed out one by one. Real applications rarely work that way. Usually you have an array of data (students, products, todos) coming from somewhere, and you need to display one component per item, automatically.

This is exactly the problem `map()` solves in React.

## Main Concept

### Why arrays matter in React

Most real data in an application is a list: a list of students, a list of products, a list of messages. Instead of manually writing one component per item, React lets you use JavaScript's array methods — especially `map()` — to generate JSX automatically from an array.

### Using `map()`

You already know `map()` from your JavaScript fundamentals: it takes an array and returns a new array, transformed by a function you provide. In React, `map()` is used to transform an array of data into an array of JSX elements.

```jsx
const numbers = [1, 2, 3];

const listItems = numbers.map((number) => <li>{number}</li>);
```

`listItems` is now an array of three `<li>` elements, which React can render directly inside a JSX element like a `<ul>`.

### Returning JSX from `map()`

Inside JSX, you can embed the result of `map()` directly using curly braces:

```jsx
function NumberList() {
  const numbers = [1, 2, 3];

  return (
    <ul>
      {numbers.map((number) => (
        <li>{number}</li>
      ))}
    </ul>
  );
}
```

### The `key` prop

When you render a list of elements from `map()`, React requires each element to have a special `key` prop. Keys help React keep track of which item is which, so it can update the list efficiently when the data changes — for example, when an item is added, removed, or reordered.

```jsx
{numbers.map((number) => (
  <li key={number}>{number}</li>
))}
```

If you forget the `key` prop, React will still render the list, but it will show a warning in the console, and updates to the list may behave unpredictably.

### Why IDs are better keys than indexes

It is common to see beginners use the array index as a key:

```jsx
{students.map((student, index) => (
  <StudentCard key={index} name={student.name} />
))}
```

This works for simple, static lists, but it causes problems if the list can be reordered, filtered, or have items added or removed — React can get confused about which item is which, leading to bugs like incorrect data showing up in the wrong place after an update.

Whenever your data includes a unique ID (which most real data does — like a database ID), use that instead:

```jsx
{students.map((student) => (
  <StudentCard key={student.id} name={student.name} />
))}
```

### Rendering an array of objects

Real data is usually an array of objects, not just plain numbers or strings:

```jsx
const students = [
  { id: 1, name: "Amina", course: "Web Development" },
  { id: 2, name: "Yusuf", course: "Data Science" },
];
```

You can `map()` over this array and pass each object's properties as props to a component:

```jsx
{students.map((student) => (
  <StudentCard
    key={student.id}
    name={student.name}
    course={student.course}
  />
))}
```

### Passing array data into components

Instead of always mapping directly inside `App`, you can pass the whole array as a prop into a list component, which handles the `map()` internally:

```jsx
function StudentList({ students }) {
  return (
    <div>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          course={student.course}
        />
      ))}
    </div>
  );
}
```

### Empty array handling

If an array is empty, `map()` simply produces nothing to render, which usually means the page shows a blank area with no explanation. It is good practice to check for this and show a helpful message instead:

```jsx
function StudentList({ students }) {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <div>
      {students.map((student) => (
        <StudentCard key={student.id} name={student.name} />
      ))}
    </div>
  );
}
```

You will learn more patterns for this kind of conditional display in Lesson 9.

## Syntax

```jsx
{arrayName.map((item) => (
  <ComponentName key={item.id} propName={item.property} />
))}
```

## Simple Example

```jsx
const products = [
  { id: 1, name: "Wireless Mouse", price: 15 },
  { id: 2, name: "Keyboard", price: 30 },
  { id: 3, name: "Monitor", price: 120 },
];

function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}

function App() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} name={product.name} price={product.price} />
      ))}
    </div>
  );
}

export default App;
```

## Explanation of the Example

* `products` is an array of objects, each with a unique `id`, a `name`, and a `price`.
* `products.map((product) => (...))` loops through the array and returns one `<ProductCard />` for each product.
* `key={product.id}` gives React a stable, unique identifier for each item, using the product's own ID rather than its position in the array.
* Each `ProductCard` receives `name` and `price` as props, taken from that specific product object.
* The result is three `ProductCard` components, each showing different data, generated automatically from the array instead of being written by hand.

## More Examples

**Example 1: A simple todo list using plain strings**

```jsx
const todos = ["Buy groceries", "Clean the house", "Finish homework"];

function TodoList() {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

Here, using `index` as a key is acceptable, because this list is static — it never gets reordered, and items are not added or removed. Once a list becomes dynamic, prefer a unique ID instead.

**Example 2: A list component receiving array data as a prop**

```jsx
function StudentCard({ name, course }) {
  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p>{course}</p>
    </div>
  );
}

function StudentList({ students }) {
  return (
    <div>
      {students.map((student) => (
        <StudentCard key={student.id} name={student.name} course={student.course} />
      ))}
    </div>
  );
}

function App() {
  const students = [
    { id: 1, name: "Amina", course: "Web Development" },
    { id: 2, name: "Yusuf", course: "Data Science" },
    { id: 3, name: "Hodan", course: "UI/UX Design" },
  ];

  return <StudentList students={students} />;
}
```

**Example 3: Handling an empty array gracefully**

```jsx
function StudentList({ students }) {
  if (students.length === 0) {
    return <p>No students have been added yet.</p>;
  }

  return (
    <div>
      {students.map((student) => (
        <StudentCard key={student.id} name={student.name} course={student.course} />
      ))}
    </div>
  );
}

function App() {
  const students = [];

  return <StudentList students={students} />;
}
```

## Common Mistakes

* **Forgetting the `key` prop entirely,** which triggers a console warning and can cause unpredictable behavior when the list changes.
* **Using the array index as a key on a list that can be reordered, filtered, or edited,** which can cause the wrong data to appear attached to the wrong element after updates.
* **Putting the `key` prop on the wrong element,** for example placing it on a `div` wrapping a component instead of directly on the outermost element returned by `map()`.
* **Forgetting to return JSX from the arrow function inside `map()`** when using curly braces instead of parentheses, for example writing `numbers.map((n) => { <li>{n}</li> })` without a `return` statement, which returns `undefined` for every item.
* **Not handling an empty array,** leaving a confusing blank space on the page with no explanation for the user.

## Best Practices

* Always use a unique, stable ID as the `key` whenever your data includes one.
* Only use the array index as a key for lists that are guaranteed to stay in the same order and never change.
* Keep the JSX returned from `map()` simple — if the markup is complex, extract it into its own component (like `StudentCard`) and just pass props to it inside `map()`.
* Always consider and handle the empty-array case for any list your users might filter, search, or start empty.
* Use parentheses instead of curly braces for single-expression arrow functions inside `map()` to avoid forgetting a `return` statement: `(item) => (<li>{item}</li>)`.

## Classroom Practice

1. As a class, take an array of five product names and render them as a `<ul>` list using `map()`.
2. Convert an array of student objects (with `id` and `name`) into a list of `StudentCard` components, using `student.id` as the key.
3. Deliberately remove the `key` prop from a list and observe the warning in the browser console, then add it back.

## Student Exercises

1. Create an array of at least four objects representing your favorite movies (with `id`, `title`, and `year`), and render them using `map()` inside a `MovieCard` component.
2. Build a `TodoList` component that receives an array of todo strings as a prop and renders them as a list.
3. Modify any list component you have built to show a friendly message like "No items found" when the array is empty.

## Mini Assignment

Create an array of at least five objects representing products, each with `id`, `name`, `price`, and `inStock` (boolean). Build a `ProductCard` component and a `ProductList` component that receives the array as a prop. Use `map()` inside `ProductList` to render one `ProductCard` per product, using each product's `id` as the key. Test your component with an empty array as well, and make sure it shows a helpful message instead of a blank page.

## Lesson Summary

* `map()` transforms an array of data into an array of JSX elements, which is how most lists are rendered in React.
* Every element produced by `map()` in a list needs a unique `key` prop so React can track items efficiently.
* Unique IDs make better keys than array indexes, especially for lists that can change, reorder, or filter.
* Arrays of objects are commonly mapped into reusable components, passing each object's properties as props.
* Arrays can be passed into components as props, letting a list component handle its own `map()` logic.
* Empty arrays should be handled explicitly, showing a helpful message instead of leaving a blank area.

## Teacher Notes

* Connect this lesson directly back to Lesson 5: show how `map()` removes the need to manually write out `<StudentCard />` three separate times with different props.
* Common confusion: students often do not understand why keys matter until they see a bug caused by using the index as a key on a reorderable list. If time allows, demonstrate this with a simple "remove item" button (even a non-functional one described verbally) to show the risk conceptually.
* Ask: "What do you think would happen if two list items had the exact same key?" to check understanding of uniqueness.
* Demonstration idea: show the browser console warning that appears when a `key` prop is missing, so students recognize it instantly in their own projects later.
* Suggested duration: 90 minutes, since `map()` combined with keys is a common source of early bugs and benefits from extra practice time.