# JavaScript & Bootstrap Concepts Guide

## Table of Contents
1. [JavaScript Concepts](#javascript-concepts)
2. [Bootstrap Concepts](#bootstrap-concepts)
3. [Code Examples](#code-examples)

---

## JavaScript Concepts

### 1. Asynchronous JavaScript & Fetch API
- **Async/Await**: Modern way to handle asynchronous operations
- **Fetch API**: Built-in method to make HTTP requests
- **Try-Catch**: Error handling mechanism for async operations
- **JSON Parsing**: Converting JSON responses to JavaScript objects
- **HTTP Methods**: GET requests to retrieve data from APIs

**Key Points:**
- `async` keyword makes a function return a Promise
- `await` pauses execution until Promise resolves
- `fetch()` returns a Promise that resolves to a Response object
- `.json()` method parses the response body as JSON

---

### 2. ES6 Classes

#### Constructor Method
- Special method for creating and initializing objects
- Automatically called when creating a new instance with `new` keyword
- Used to set initial property values

#### Class Properties
- Variables that belong to the class instance
- Accessed using `this` keyword
- Each instance has its own copy of properties

#### Class Methods
- Functions defined inside a class
- Can access class properties using `this`
- Shared across all instances (prototype methods)

#### Class Instantiation
- Creating objects from classes using `new` keyword
- Each instance is independent with its own property values

---

### 3. Object-Oriented Programming (OOP) in JavaScript

#### Encapsulation
- Bundling data (properties) and methods together in a class
- Example: Employee class with name, id, phone, salary properties and show() method

#### Inheritance
- `extends` keyword: Creates a subclass that inherits from parent class
- `super()`: Calls the parent class constructor
- Child class inherits all properties and methods from parent
- Child class can have additional properties/methods

**Inheritance Example:**
```
Class A (Parent)
├── Properties: x, y
│
Class B extends A (Child)
├── Inherited: x, y
└── Own Property: z
```

---

### 4. this Keyword
- Refers to the current object instance
- Used to access properties and methods within the class
- Context-dependent (refers to the object that calls the method)

---

### 5. DOM Manipulation
- `onclick` event handler to trigger functions
- Button interaction with JavaScript functions

---

## Bootstrap Concepts

### 1. Responsive Web Design
- **Goal**: Making web pages adapt to different screen sizes
- **Bootstrap**: CSS framework/library for responsive design
- **CDN Integration**: Loading Bootstrap via Content Delivery Network

---

### 2. Grid System

#### Core Concept
Bootstrap divides the browser width into **12 equal columns**

#### Grid Components

**Container**
- `.container`: Fixed-width container with responsive breakpoints
- Wrapper for the grid system
- Provides padding and centering

**Row**
- `.row`: Horizontal group of columns
- Must be placed inside a container
- Uses flexbox for layout

**Columns**
- `.col-{number}`: Specifies how many of the 12 grid columns to occupy
- `.col-6`: Takes up 6 columns (50% width)
- Columns must be direct children of rows

#### Grid Calculation
```
Total Grid Width = 12 columns
col-6 = 6/12 = 50% width
col-4 = 4/12 = 33.33% width
col-3 = 3/12 = 25% width
```

---

### 3. Media Queries (CSS)
- CSS technique for applying styles based on screen size
- Bootstrap uses media queries internally for responsive breakpoints
- Enables different layouts for mobile, tablet, and desktop

---

### 4. Bootstrap CDN Links

**CSS Link (in `<head>`):**
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
```

**JavaScript Bundle (before closing `</body>`):**
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

---

## Code Examples

### Example 1: Fetch API with Async/Await
```javascript
async function fetchData(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {method:'GET'});
        console.log(response.status);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
```

**Concepts Used:**
- Async function declaration
- Await for Promise resolution
- Fetch API for HTTP requests
- Try-catch error handling
- JSON parsing

---

### Example 2: Basic Class
```javascript
class Employee{
    constructor(){
        console.log("hello world");
    }
}
var emp1 = new Employee();
var emp2 = new Employee();
```

**Concepts Used:**
- Class declaration
- Constructor method
- Class instantiation with `new`

---

### Example 3: Class with Properties
```javascript
class Employee{
    constructor(){
        this.name = "Rahul";
        this.id = 111;
        this.phone = "77383833";
        this.salary = 22333;
    }
}
var emp1 = new Employee();
console.log(emp1.id, emp1.name, emp1.phone, emp1.salary);
```

**Concepts Used:**
- Class properties
- `this` keyword
- Property initialization in constructor
- Accessing object properties

---

### Example 4: Parameterized Constructor
```javascript
class Employee{
    constructor(id, name, phone, salary){
        this.name = name;
        this.id = id;
        this.phone = phone;
        this.salary = salary;
    }
}
var emp1 = new Employee(111, "Manish", "88777111", 36661);
var emp2 = new Employee(123, "Priya", "99001011", 78811);
```

**Concepts Used:**
- Constructor parameters
- Dynamic object initialization
- Multiple instances with different values

---

### Example 5: Class with Methods
```javascript
class Employee{
    constructor(id, name, phone, salary){
        this.name = name;
        this.id = id;
        this.phone = phone;
        this.salary = salary;
    }
    show(){
        console.log(this.id, this.name, this.phone, this.salary);
    }
}
var emp1 = new Employee(111, "Manish", "88777111", 36661);
emp1.show();
```

**Concepts Used:**
- Class methods
- Method calling on object instances
- Encapsulation (data + behavior)

---

### Example 6: Practical Class (Circle)
```javascript
class Circle{
    constructor(r){
        this.r = r;
    }
    getArea(){
        return 3.14 * this.r * this.r;
    }
    getPerimeter(){
        return 2 * 3.14 * this.r;
    }
}

var c1 = new Circle(5);
const area = c1.getArea();
const perimeter = c1.getPerimeter();
console.log(area, perimeter);
```

**Concepts Used:**
- Single parameter constructor
- Multiple methods with calculations
- Return values from methods
- Method chaining/calling

---

### Example 7: Inheritance
```javascript
class A{
    constructor(){
        this.x = 10;
        this.y = 20;
    }
}
class B extends A{
    constructor(){
        super();
        this.z = 34;
    }
}
var bObj = new B();
console.log(bObj.x, bObj.y, bObj.z);
```

**Concepts Used:**
- Class inheritance with `extends`
- `super()` to call parent constructor
- Property inheritance
- Multi-level object creation

---

### Example 8: Bootstrap Grid Layout
```html
<div class="container">
    <div class="row">
        <div class="col-6">
            <h1>Heading text</h1>
            <p>Lorem ipsum...</p>
        </div>
        <div class="col-6">
            <h1>Heading text</h1>
            <p>Lorem ipsum...</p>
        </div>
    </div>
</div>
```

**Concepts Used:**
- Container class for layout wrapper
- Row class for horizontal grouping
- Column classes (col-6 = 50% width each)
- Responsive grid system
- Semantic HTML structure

--- 
