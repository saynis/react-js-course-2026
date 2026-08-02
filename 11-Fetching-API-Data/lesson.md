# Lesson 12: Fetching API Data

## Learning Objectives

By the end of this lesson, students will be able to:

* Fetch data from an API using `fetch()` inside a React component
* Fetch data using `async`/`await` syntax
* Manage loading, error, and data state together
* Call an API correctly inside `useEffect`
* Render data returned from an API
* Handle empty results
* Implement basic search and category filtering on fetched data
* Display details for a single item from a list
* Explain why API calls should not be placed directly in the component body

## Introduction

You already know how to use `fetch()` and `async`/`await` from your JavaScript fundamentals, and you have built basic API projects before. This lesson shows you how to bring that same skill into React — combining `useState` (Lesson 8) and `useEffect` (Lesson 11) to fetch data properly, track loading and error states, and render the results.

## Main Concept

### Why API calls should not be placed directly in the component body

It might seem natural to write a `fetch()` call directly inside a component function, outside of `useEffect`:

```jsx
// Incorrect: this runs on every single render
function ProductList() {
  fetch("https://api.example.com/products");
  // ...
}
```

Every time a component renders, its entire function body runs again — including any `fetch()` call written directly inside it. This means the component would call the API over and over, on every re-render, which is both wasteful and can cause serious bugs (like infinite loops if the fetch also updates state). API calls belong inside `useEffect`, which lets you control precisely when they run — usually once, when the component first mounts.

### Loading, error, and data state

A well-built component that fetches data typically tracks three separate pieces of state:

```jsx
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
```

* `data` holds the actual result once the fetch succeeds.
* `isLoading` tracks whether the request is still in progress.
* `error` holds an error message if something went wrong.

### Calling an API inside `useEffect`

```jsx
import { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://api.example.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // rendering logic comes next
}
```

Notice that `useEffect`'s own function cannot be declared `async` directly. Instead, an `async` function (`fetchProducts`) is defined inside the effect, and then called immediately.

### Using both `fetch()` and `async`/`await`

You can write the same request using `.then()` chains instead of `async`/`await`:

```jsx
useEffect(() => {
  fetch("https://api.example.com/products")
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((err) => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);
```

Both approaches work. This course focuses mainly on `async`/`await`, since it tends to be easier to read once a request needs several steps, like checking `response.ok` before parsing the JSON.

### Rendering API results

Once you have `products`, `isLoading`, and `error` in state, use the conditional rendering patterns from Lesson 9 to display the right thing:

```jsx
if (isLoading) {
  return <p>Loading products...</p>;
}

if (error) {
  return <p>Something went wrong: {error}</p>;
}

return (
  <ul>
    {products.map((product) => (
      <li key={product.id}>{product.name}</li>
    ))}
  </ul>
);
```

### Empty results

Even after a successful fetch, the returned array might be empty — for example, no products match a search. Handle this the same way you learned in Lesson 6 and Lesson 9:

```jsx
if (products.length === 0) {
  return <p>No products found.</p>;
}
```

### Search and category filtering

Filtering fetched data is usually done with regular JavaScript array methods, applied to the data already stored in state — no new API call is needed for simple client-side filtering:

```jsx
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

Category filtering works the same way:

```jsx
const [selectedCategory, setSelectedCategory] = useState("all");

const filteredProducts = products.filter((product) =>
  selectedCategory === "all" ? true : product.category === selectedCategory
);
```

### Product details

To show details for a single item from a list, you can keep the selected item in state:

```jsx
const [selectedProduct, setSelectedProduct] = useState(null);

function handleSelect(product) {
  setSelectedProduct(product);
}
```

Then conditionally render either the list or the details, depending on whether something has been selected. In Lesson 13, you will learn a more standard way to handle this using dedicated routes and URLs.

## Syntax

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Request failed.");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, []);
```

## Simple Example

```jsx
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

## Explanation of the Example

* Three pieces of state track the request: `users` for the result, `isLoading` for whether the request is in progress, and `error` for anything that went wrong.
* `useEffect` with an empty dependency array `[]` ensures `fetchUsers` runs exactly once, when `UserList` first mounts.
* Inside `fetchUsers`, `try`/`catch`/`finally` handles the whole lifecycle of the request: attempt the fetch, catch any errors, and always turn off loading in the `finally` block regardless of success or failure.
* The component uses `if` statements (from Lesson 9) to render a loading message, an error message, or the final list, depending on the current state.

## More Examples

**Example 1: Search filtering on fetched data**

```jsx
import { useState, useEffect } from "react";

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://api.example.com/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Example 2: Category filtering with a dropdown**

```jsx
function CategoryFilter({ products, selectedCategory, onCategoryChange }) {
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Example 3: Showing product details for a selected item**

```jsx
import { useState } from "react";

function ProductDetails({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    return (
      <div>
        <h2>{selectedProduct.name}</h2>
        <p>${selectedProduct.price}</p>
        <button onClick={() => setSelectedProduct(null)}>Back to list</button>
      </div>
    );
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id} onClick={() => setSelectedProduct(product)}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```

## Common Mistakes

* **Calling `fetch()` directly in the component body instead of inside `useEffect`,** causing the request to fire on every render.
* **Marking `useEffect`'s own callback function as `async`,** which is not supported — instead, define a separate `async` function inside the effect and call it.
* **Forgetting to check `response.ok` before parsing JSON,** which can cause confusing errors when the server returns an error page instead of the expected data.
* **Forgetting the `finally` block to turn off loading,** leaving the component stuck showing "Loading..." forever if an error occurs.
* **Forgetting the empty dependency array,** causing the fetch to run repeatedly instead of once.
* **Filtering data by making a brand-new API call for every keystroke in a search box,** instead of filtering the already-fetched data in memory with `filter()`.

## Best Practices

* Always track `isLoading` and `error` alongside your actual data, so users get clear feedback instead of a blank or broken-looking page.
* Use `try`/`catch`/`finally` with `async`/`await` for clarity when a request involves multiple steps.
* Fetch data once inside `useEffect` with an empty dependency array for data that should load when the component first appears.
* Filter or search already-fetched data in memory using array methods, rather than sending a new request for every small change, unless the dataset is very large and needs server-side filtering.
* Always handle the empty-results case separately from the loading and error cases, since an empty array is a valid, successful response.



## Mini Assignment

Build a `ProductBrowser` component that fetches a list of products from `https://fakestoreapi.com/products` inside `useEffect`. Track `isLoading`, `error`, and the fetched `products` in state. Add a search input that filters products by name, and a category dropdown that filters products by category (the Fake Store API includes a `category` field on each product). Handle the empty-results case with a clear message, and add a way to click a product to see its full details, with a button to return to the list.

## Lesson Summary

* API calls in React belong inside `useEffect`, not directly in the component body, so they run at the right time instead of on every render.
* A typical data-fetching component tracks three pieces of state: the data itself, a loading flag, and an error message.
* `async`/`await` combined with `try`/`catch`/`finally` is a clear way to handle a fetch request's success and failure cases.
* Fetched data is rendered using the conditional rendering patterns from Lesson 9: show a loading message, then an error message, then the actual content or an empty-state message.
* Search and category filtering can usually be done by filtering the already-fetched data in memory, without making new API calls for every change.

