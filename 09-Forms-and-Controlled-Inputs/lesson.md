# Lesson 10: Forms and Controlled Inputs

## Learning Objectives

By the end of this lesson, students will be able to:

* Explain what a controlled component is
* Connect an input's value to state
* Update state using `onChange`
* Handle form submission with `preventDefault()`
* Manage multiple inputs, using one state variable per input or a single form object
* Add simple validation to a form
* Reset a form after submission
* Add submitted form data to an array

## Introduction

You have already learned state (Lesson 8), events (Lesson 7), and conditional rendering (Lesson 9). Forms bring all three together. In vanilla JavaScript, you read an input's value directly from the DOM when you need it. In React, forms are usually built differently — the input's value is connected directly to state, so React always knows exactly what the current value is. This pattern is called a **controlled component**, and it is the standard way to build forms in React.

## Main Concept

### Controlled components

A **controlled component** is a form element (like an `<input>`) whose value is controlled by React state, rather than by the DOM itself. The state is the single source of truth: the input always displays whatever the state currently holds, and every keystroke updates that state.

```jsx
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}
```

### Input value

The `value` attribute on the input is set directly from state (`value={name}`). This means the input's displayed text is always exactly whatever `name` currently is — you cannot type something into the input without it going through state first.

### `onChange`

The `onChange` handler runs every time the user types, and updates the state with the input's new value, read from `event.target.value`. This keeps state and the input's display perfectly in sync.

### Form submission

The `<form>` element itself has an `onSubmit` handler, which fires when the form is submitted:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Submitted name:", name);
}
```

### `preventDefault()`

As covered in Lesson 7, forms reload the page by default when submitted. `event.preventDefault()` stops this, letting your component handle the submitted data with JavaScript instead.

### Multiple inputs

**One state variable per input** is the simplest approach when a form has only a couple of fields:

```jsx
import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Form object state

Once a form has several fields, tracking each one in a separate state variable becomes repetitive. A common alternative is to keep **one object** in state representing the whole form, and update just one property of it at a time:

```jsx
import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="course" value={formData.course} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
```

This uses a single `handleChange` function for every field. Each input has a `name` attribute matching a property in `formData`. `{ ...formData, [name]: value }` creates a new object with all the existing form data, but overwrites just the one field that changed, using `[name]` as a computed property name — this is standard JavaScript object syntax, not anything new to React.

### Simple validation

Validation checks whether the submitted data meets certain requirements before accepting it:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (formData.name.trim() === "") {
    alert("Name is required.");
    return;
  }

  console.log("Form is valid:", formData);
}
```

### Resetting forms

After a successful submission, it is common to reset the form back to its empty starting values:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log(formData);

  setFormData({ name: "", email: "", course: "" });
}
```

### Adding submitted data to an array

A very common pattern is collecting each form submission into a growing list — for example, adding each newly registered student to a `students` array in state:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  const newStudent = { id: Date.now(), ...formData };
  setStudents([...students, newStudent]);
  setFormData({ name: "", email: "", course: "" });
}
```

`Date.now()` is used here as a simple, unique ID for each new student, since it returns the current timestamp in milliseconds — different every time it is called.

## Syntax

```jsx
const [value, setValue] = useState("");

<input value={value} onChange={(event) => setValue(event.target.value)} />
```

```jsx
<form onSubmit={handleSubmit}>
  {/* inputs */}
  <button type="submit">Submit</button>
</form>
```

## Simple Example

```jsx
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted name:", name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NameForm;
```

## Explanation of the Example

* `name` and `setName` come from `useState("")`, starting the form with an empty string.
* `value={name}` makes the input a controlled component — it always shows exactly what is in state.
* `onChange={(event) => setName(event.target.value)}` updates state on every keystroke, keeping the input and state in sync.
* `handleSubmit` calls `event.preventDefault()` to stop the page from reloading, logs the submitted name, and then resets the input back to empty by calling `setName("")`.

## More Examples

**Example 1: Student Registration Form using a single form object**

```jsx
import { useState } from "react";

function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.name.trim() === "" || formData.email.trim() === "") {
      alert("Name and email are required.");
      return;
    }

    console.log("Registered student:", formData);
    setFormData({ name: "", email: "", course: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
      />
      <input
        name="course"
        value={formData.course}
        onChange={handleChange}
        placeholder="Course"
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default StudentRegistrationForm;
```

**Example 2: Adding each submission to a growing list**

```jsx
import { useState } from "react";

function StudentRegistration() {
  const [formData, setFormData] = useState({ name: "", course: "" });
  const [students, setStudents] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.name.trim() === "") {
      alert("Name is required.");
      return;
    }

    const newStudent = { id: Date.now(), ...formData };
    setStudents([...students, newStudent]);
    setFormData({ name: "", course: "" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <button type="submit">Add Student</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} — {student.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentRegistration;
```

**Example 3: A select dropdown as a controlled component**

```jsx
import { useState } from "react";

function CourseSelector() {
  const [course, setCourse] = useState("web-development");

  return (
    <select value={course} onChange={(event) => setCourse(event.target.value)}>
      <option value="web-development">Web Development</option>
      <option value="data-science">Data Science</option>
      <option value="ui-ux">UI/UX Design</option>
    </select>
  );
}
```

Select elements are controlled the same way as text inputs — `value` reflects state, and `onChange` updates it.

## Common Mistakes

* **Forgetting the `value` attribute on an input,** which makes it an "uncontrolled" input instead of a controlled one, breaking the connection to state.
* **Forgetting `onChange`,** which causes React to show a console warning and makes the input impossible to type into, since state never updates to match what was typed.
* **Modifying the form state object directly,** such as `formData.name = event.target.value`, instead of creating a new object with the spread operator.
* **Forgetting `event.preventDefault()` in `onSubmit`,** which causes the page to reload and lose all form and application state.
* **Forgetting the `name` attribute on inputs when using a single shared `handleChange` function,** which means `event.target.name` is `undefined` and the wrong (or no) property gets updated.

## Best Practices

* Use one shared `handleChange` function with a form object in state for forms with three or more fields, to avoid repetitive code.
* Always give each input a `name` attribute matching a property in your form state object when using a shared handler.
* Validate required fields before treating a submission as successful, and give the user clear feedback when validation fails.
* Reset form state after a successful submission, so the form is ready for the next entry.
* Always call `event.preventDefault()` at the start of your submit handler in a React form.





## Mini Assignment

Build a `StudentRegistrationForm` component with fields for `name`, `email`, and `course`, using a single form object in state and a shared `handleChange` function. On submit, validate that `name` and `email` are not empty (show an alert if they are), add the new student to a list displayed below the form with a unique `id`, and reset the form fields back to empty after a successful submission.

## Lesson Summary

* A controlled component is a form element whose value is tied directly to React state, making state the single source of truth for the input's content.
* `value` connects an input's displayed content to state, and `onChange` updates that state on every keystroke.
* `event.preventDefault()` in an `onSubmit` handler stops the page from reloading.
* Forms with a few fields can use one state variable per field; forms with several fields are usually easier to manage with one form object in state and a shared `handleChange` function.
* Simple validation checks form data before treating a submission as successful, giving the user feedback when something is missing or incorrect.
* Forms are commonly reset after a successful submission, and submitted data can be added to a growing array in state to build a list.

