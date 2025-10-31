# React JS 

## Table of Contents
1. [Introduction to React](#introduction-to-react)
2. [Core Concepts](#core-concepts)
3. [Setting Up React Application](#setting-up-react-application)
4. [Components](#components)
5. [JSX (JavaScript XML)](#jsx-javascript-xml)
6. [Props (Properties)](#props-properties)
7. [Routing](#routing)

---

## Introduction to React

### What is React JS?
React is a **JavaScript library** for building user interfaces, created and maintained by **Facebook (Meta)**.

### Key Features
- **Component-Based Architecture**: UI is divided into reusable, independent components
- **Single Page Application (SPA)**: Only one HTML file is created, content changes dynamically
- **Virtual DOM**: Efficient rendering and updates
- **Declarative**: Describe what UI should look like, React handles the DOM updates

### Why React? (Problem it Solves)

**Traditional HTML Approach Problems:**
```
School Website Example:
- Home.html → navbar → 40 lines of code
- About.html → navbar → 40 lines of code (duplicate)
- Gallery.html → navbar → 40 lines of code (duplicate)
- Admissions.html → navbar → 40 lines of code (duplicate)
- Contact.html → navbar → 40 lines of code (duplicate)
```

**Problems:**
1. **Code is NOT reusable** - Same navbar code repeated in 50+ pages
2. **Larger load time** - Browser reloads entire page for each navigation
3. **Maintenance nightmare** - Changing navbar requires updating 50+ files

**React Solution:**
- Create **one Navbar component**
- Reuse it across all pages
- No page reloads (SPA)
- Change once, reflects everywhere

---

## Core Concepts

### Component-Based Architecture
Instead of creating web pages, we create **components** (UI elements).

**Component**: A reusable, independent piece of UI that can be composed together.

```
Traditional: Pages (Home.html, About.html, Contact.html)
React: Components (Home, About, Contact, Navbar, Footer, Card)
```

### Single Page Application (SPA)
- Only **one HTML file** (`index.html`)
- Content changes dynamically without page reload
- Better user experience and performance
- Faster navigation

---

## Setting Up React Application

### Using Vite (Modern, Fast Build Tool)

**Step 1: Create App**
```bash
npm create vite@latest app-name
# OR with specific template
npm create vite@latest my-react-app -- --template react
```

**Step 2: Navigate and Install Dependencies**
```bash
cd app-name
npm install
# OR
npm i
```

**Step 3: Run Development Server**
```bash
npm run dev
```

### Initial Setup
When you create a React app, **one component is already created**: `App.js` or `App.jsx`

When the app launches, this default component is displayed.

---

## Components

### Types of Components

React has **two types** of components:

#### 1. Class Component
- Uses **ES6 class** syntax
- Extends `React.Component`
- Heavier (more boilerplate)
- Has lifecycle methods
- Uses `this` keyword

**Syntax:**
```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

#### 2. Function Component
- Uses **JavaScript function**
- **Lightweight** and simpler
- **Modern approach** (Recommended)
- Uses React Hooks (useState, useEffect, etc.)
- No `this` keyword

**Syntax:**
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// OR using arrow function
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

export default Welcome;
```

### Creating Components

**Basic Component Structure:**
```jsx
// Card.jsx
function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>Card content goes here</p>
      <button>Click Me</button>
    </div>
  );
}

export default Card;
```

**Using Component:**
```jsx
// App.jsx
import Card from './Card';

function App() {
  return (
    <div>
      <Card />
      <Card />
      <Card />
    </div>
  );
}
```

### Component Naming Convention
- Component names must start with **Capital Letter**
- File names typically match component names
- Example: `Navbar.jsx`, `Footer.jsx`, `UserProfile.jsx`

---

## JSX (JavaScript XML)

### What is JSX?
**JSX = JavaScript + XML**

JSX enables developers to write **JavaScript code along with HTML code directly**.

### Key Features
```jsx
// You can embed JavaScript expressions in HTML
const name = "John";
const element = <h1>Hello, {name}!</h1>;

// You can use JavaScript logic
const isLoggedIn = true;
const greeting = (
  <div>
    {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Sign In</h1>}
  </div>
);

// You can map arrays to elements
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
  <li key={number}>{number}</li>
);
```

### JSX vs HTML Differences

| HTML | JSX (React) |
|------|-------------|
| `class="container"` | `className="container"` |
| `for="name"` | `htmlFor="name"` |
| `onclick="handleClick()"` | `onClick={handleClick}` |
| `style="color: red;"` | `style={{color: 'red'}}` |
| Attributes are lowercase | Attributes are camelCase |

**Example:**
```jsx
// HTML
<p align="center">Hello</p>
<img src="photo.jpg" width="100" height="100">
<table border="1">...</table>

// JSX
<p style={{textAlign: 'center'}}>Hello</p>
<img src="photo.jpg" width="100" height="100" />
<table style={{border: '1px solid black'}}>...</table>
```

### JSX Rules
1. Must return **single parent element**
2. All tags must be **closed** (`<img />`, `<input />`)
3. Use `{}` for JavaScript expressions
4. `className` instead of `class`
5. CamelCase for event handlers (`onClick`, `onChange`)

---

## Props (Properties)

### What are Props?

**Props** = Attributes or properties passed into components when displaying them.

Think of props like **function parameters** or **HTML attributes**.

```
HTML: <img src="photo.jpg" width="100">
       ↓
React: <Card title="My Card" image="photo.jpg" width={100}>
```

### Key Characteristics
1. **A component can't decide the value of props by itself** (passed from parent)
2. **A component can't change the value of props by itself** (read-only/immutable)
3. Props enable component **reusability** with different data

### Props in Function Components

Props become **function arguments**.

```jsx
// Component Definition
function Card(props) {
  return (
    <div className="card">
      <h1>{props.heading}</h1>
      <p>{props.intro}</p>
      <button>{props.buttonText}</button>
    </div>
  );
}

// Using Component
<Card 
  heading="Welcome" 
  intro="This is introduction" 
  buttonText="Learn More" 
/>

<Card 
  heading="About Us" 
  intro="We are a company" 
  buttonText="Contact" 
/>
```

**Destructuring Props (Cleaner):**
```jsx
function Card({ heading, intro, buttonText }) {
  return (
    <div className="card">
      <h1>{heading}</h1>
      <p>{intro}</p>
      <button>{buttonText}</button>
    </div>
  );
}
```

### Props in Class Components

Props become **class member property** named `props` (inherited from `Component` parent class).

Access using **`this.props`**.

```jsx
import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="card">
        <h1>{this.props.heading}</h1>
        <p>{this.props.intro}</p>
        <button>{this.props.buttonText}</button>
      </div>
    );
  }
}

// Using Component (same as function component)
<Card 
  heading="Welcome" 
  intro="This is introduction" 
  buttonText="Learn More" 
/>
```

### Props Object Structure
```javascript
// When you pass:
<Card heading="Hello" intro="World" buttonText="Click" />

// Props object looks like:
{
  heading: "Hello",
  intro: "World",
  buttonText: "Click"
}
```

### Creating Reusable Components Example

**Problem**: Need `<h1>`, `<p>`, `<button>` in multiple pages

**Solution**: Create reusable component

```jsx
// InfoSection.jsx
function InfoSection({ title, description, actionText }) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <button>{actionText}</button>
    </section>
  );
}

// Usage in different pages
// Home Page
<InfoSection 
  title="Welcome Home" 
  description="This is home page" 
  actionText="Get Started" 
/>

// About Page
<InfoSection 
  title="About Us" 
  description="We are awesome" 
  actionText="Learn More" 
/>
```

---

## Routing

### What is Routing?
**Routing** decides which component should be displayed on which URL/route.

### React Router DOM
Library for handling routing in React applications.

**Installation:**
```bash
npm install react-router-dom
```

### Basic Routing Setup

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Key Components

#### 1. BrowserRouter
Wraps entire application to enable routing.

```jsx
<BrowserRouter>
  {/* Your app */}
</BrowserRouter>
```

#### 2. Routes
Container for all Route components.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

#### 3. Route
Defines a route and which component to render.

```jsx
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
```

#### 4. Link
Navigation without page reload (instead of `<a>` tag).

```jsx
// ❌ Don't use <a> tag (causes page reload)
<a href="/about">About</a>

// ✅ Use Link component
<Link to="/about">About</Link>
```
--- 

### Backend Integration Topics

1. **ORM (Object Relational Mapper)**
   - Sequelize (Node.js)
   - Maps objects to database tables

2. **Architecture Pattern**
   - Controller → Service → Database
   - Separation of concerns

3. **Caching**
   - Redis for performance optimization
   - Store frequently accessed data

4. **Unit Testing**
   - Jest, React Testing Library
   - Test components and logic

5. **Database Schema Design**
   - Proper table relationships
   - Normalization, indexing

6. **GraphQL**
   - Alternative to REST API
   - Query exactly what you need

7. **NestJS**
   - TypeScript framework for Node.js
   - Built on Express, inspired by Angular

---

## Interview Questions

### Conceptual Questions

**1. What is React and why use it?**
- JavaScript library for building UIs
- Component-based, reusable code
- Virtual DOM for performance
- Large ecosystem and community

**2. What is the difference between Class and Function components?**
| Class Component | Function Component |
|-----------------|-------------------|
| Uses ES6 class | Uses JavaScript function |
| Heavier | Lightweight (recommended) |
| Uses `this.props` | Props as arguments |
| Lifecycle methods | React Hooks |

**3. What is JSX?**
- JavaScript XML - syntax extension
- Write HTML-like code in JavaScript
- Gets transpiled to `React.createElement()` calls

**4. What are Props?**
- Properties passed to components
- Read-only (immutable)
- Enable component reusability
- Like function parameters

**5. Class vs Function component props access?**
- **Function**: Props as function argument
- **Class**: `this.props` (inherited from Component)

**6. What is SPA?**
- Single Page Application
- One HTML file, dynamic content changes
- No page reloads
- Better UX and performance

**7. What is React Router DOM?**
- Library for routing in React
- Components: BrowserRouter, Routes, Route, Link
- Enables navigation without page reload

**8. How to pass token in API calls?**
- Use Authorization header
- Format: `Authorization: 'Bearer <token>'`
- Include in all secured API requests

### Practical Questions

**9. Create a reusable Card component**
```jsx
function Card({ title, description, imageUrl, buttonText }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button>{buttonText}</button>
    </div>
  );
}
```

**10. Set up basic routing**
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**11. Why use Vite instead of Create React App?**
- Faster development server (HMR)
- Quicker cold starts
- Optimized build with Rollup
- Modern, actively maintained

**12. What problems does React solve?**
- Code reusability (components)
- Faster navigation (SPA)
- Easier maintenance
- Better performance (Virtual DOM)

---

## Project Implementation Checklist

### Setting Up
- [ ] Install Vite: `npm create vite@latest`
- [ ] Install dependencies: `npm install`
- [ ] Install React Router: `npm install react-router-dom`
- [ ] Set up folder structure (components, pages, utils)

### Component Development
- [ ] Identify reusable UI elements
- [ ] Create function components (recommended)
- [ ] Use props for customization
- [ ] Extract common components (Navbar, Footer, Card)

### Routing
- [ ] Wrap app in BrowserRouter
- [ ] Define Routes and paths
- [ ] Use Link for navigation
- [ ] Implement protected routes if needed

---

### Component Template (Class)
```jsx
import React, { Component } from 'react';

class ComponentName extends Component {
  render() {
    return (
      <div>
        {this.props.prop1}
      </div>
    );
  }
}

export default ComponentName;
```

---

## Summary

**React Core Principles:**
1. **Components** - Reusable UI building blocks
2. **Props** - Pass data to components (immutable)
3. **JSX** - Write HTML in JavaScript
4. **SPA** - Single page, dynamic routing
5. **Function Components** - Modern, lightweight approach

**Key Takeaways:**
- Use Vite for faster development
- Function components > Class components
- Props make components reusable
- React Router for navigation without reload
- JWT tokens in Authorization header
- Component names must be capitalized

---
