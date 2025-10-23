# Async Programming & DOM Manipulation

---

## 1. SYNCHRONOUS vs ASYNCHRONOUS PROGRAMMING

### 1.1 Synchronous Programming (Blocking)

**Definition**: Code executes line by line, one operation at a time. Each operation must complete before the next one starts.

**Characteristics**:
- Sequential execution
- Blocking nature - if one task takes time, everything else waits
- Predictable flow
- Easy to understand and debug

**Real-world Analogy**: Standing in a bank queue - you must wait for the person ahead to finish before your turn.

**Example**:
```javascript
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third (in order)
```

**Disadvantages**:
- Poor performance for time-consuming operations
- User interface freezes during long operations
- Inefficient resource utilization

---

### 1.2 Asynchronous Programming (Non-Blocking)

**Definition**: Code can execute operations concurrently without waiting for previous operations to complete.

**Characteristics**:
- Non-blocking execution
- Multiple operations can run simultaneously
- Better performance and user experience
- Callbacks, Promises, and async/await are used

**Real-world Analogy**: Ordering food at a restaurant - you place your order and wait while the kitchen prepares it, but you're not blocking other customers.

**Example**:
```javascript
console.log("First");
setTimeout(() => {
    console.log("Second");
}, 2000);
console.log("Third");
// Output: First, Third, Second (after 2 seconds)
```

**Advantages**:
- Better performance
- Non-blocking UI
- Efficient handling of I/O operations

**Common Async Operations**:
- API calls (fetch, axios)
- File operations
- Database queries
- setTimeout/setInterval
- Event listeners

---

### 1.3 Callback Hell Problem

**What is Callback Hell?**
When multiple asynchronous operations depend on each other, we nest callbacks inside callbacks, creating deeply nested, unreadable code.

**Example of Callback Hell**:
```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                getMoreData(d, function(e) {
                    // This is callback hell!
                    console.log(e);
                });
            });
        });
    });
});
```

**Problems**:
- Difficult to read and maintain (Pyramid of Doom)
- Hard to handle errors
- Difficult to debug
- Poor code structure

**Solution**: Use **Promises** or **async/await**

---

## 2. PROMISES IN DETAIL

### 2.1 What is a Promise?

**Definition**: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

**Key Concepts**:
- A Promise is a placeholder for a value that will be available in the future
- It's a producer-consumer pattern
- It provides a cleaner way to handle async operations

**Real-world Analogy**: When you order a product online, you get an order confirmation (promise). Later, you'll either receive the product (resolved) or get a cancellation notice (rejected).

---

### 2.2 Promise Lifecycle (4 Steps)

#### Step 1: Create a Promise
```javascript
var myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation code
});
```

#### Step 2: Execute the Promise
- The promise executor function runs immediately when created
- Contains the async logic

#### Step 3: Promise Resolution
- Either resolved (success) or rejected (failure)
- Can happen only once - a promise cannot change state after resolution

#### Step 4: Handle the Promise
- Use `.then()` for success
- Use `.catch()` for failure

---

### 2.3 Promise States 

| State | Description | Can transition to |
|-------|-------------|-------------------|
| **Pending** | Initial state, operation not completed | Fulfilled or Rejected |
| **Fulfilled (Resolved)** | Operation completed successfully | None (final state) |
| **Rejected** | Operation failed | None (final state) |

**Key Points**:
- A promise starts in **pending** state
- Once settled (resolved/rejected), it cannot change state
- A promise can only be resolved or rejected once
- Pending → Fulfilled OR Pending → Rejected (one-way only)

---

### 2.4 Creating Promises 

**Constructor Syntax**:
```javascript
new Promise(executor)
```

**Executor Function**:
- Takes two parameters: `resolve` and `reject`
- Both are **functions** provided automatically by JavaScript
- These functions are used to settle the promise

**Complete Anatomy**:
```javascript
var myPromise = new Promise((resolve, reject) => {
    // resolve: function to mark promise as fulfilled
    // reject: function to mark promise as rejected
    
    // Your asynchronous operation logic
    var success = true;
    
    if (success) {
        resolve(value); // Pass success value
    } else {
        reject(error); // Pass error/reason
    }
});
```

---

### 2.5 Promise Implementation Examples

#### Example 1: Basic Promise Without Data
```javascript
// Promise Definition
var myPromise = new Promise((resolve, reject) => {
    var n = 7;
    
    if (n % 2 === 0) {
        resolve(); // Just mark as resolved
    } else {
        reject(); // Just mark as rejected
    }
});

// Promise Handling
myPromise.then(() => {
    console.log("promise is resolved");
}).catch(() => {
    console.log("promise is rejected");
});

// Output: "promise is rejected" (since 7 is odd)
```

**Exam Focus**: Understand that resolve() and reject() can be called without parameters.

---

#### Example 2: Promise With Data/Messages
```javascript
// Promise Definition
var myPromise = new Promise((resolve, reject) => {
    var n = 8;
    
    if (n % 2 === 0) {
        resolve("promise is resolved, num is divisible by 2");
    } else {
        reject("Error: Promise rejection, num is not divisible by 2");
    }
});

// Promise Handling
myPromise.then((msg) => {
    console.log(msg);
    // msg contains the value passed to resolve()
}).catch((error) => {
    console.log(error);
    // error contains the value passed to reject()
});

// Output: "promise is resolved, num is divisible by 2"
```

**Exam Focus**: 
- Data passed to `resolve()` is received in `.then()`
- Data passed to `reject()` is received in `.catch()`

---

#### Example 3: Promise-Returning Function (Recommended Pattern)
```javascript
// Function that returns a Promise
function checkEven() {
    return new Promise((resolve, reject) => {
        var n = 8;
        
        if (n % 2 === 0) {
            resolve("promise is resolved, num is divisible by 2");
        } else {
            reject("Error: Promise rejection, num is not divisible by 2");
        }
    });
}

// Get the promise object
var promiseObj = checkEven();

// Handle the promise
promiseObj.then((msg) => {
    console.log(msg);
}).catch((error) => {
    console.log(error);
});

// Alternative: Chain directly
checkEven().then(msg => {
    console.log(msg);
}).catch(error => {
    console.log(error);
});
```

**Implementation Best Practice**: 
- Encapsulate promise logic in functions
- Makes code reusable
- Better organization

---

### 2.6 Promise Handling Methods

#### `.then()` Method
**Syntax**: `promise.then(onFulfilled, onRejected)`

```javascript
myPromise.then(
    (result) => {
        // Success callback
        console.log("Success:", result);
    },
    (error) => {
        // Error callback (optional)
        console.log("Error:", error);
    }
);
```

**Key Points**:
- Called when promise is resolved
- Receives the value passed to `resolve()`
- Can be chained
- Returns a new promise

---

#### `.catch()` Method
**Syntax**: `promise.catch(onRejected)`

```javascript
myPromise.catch((error) => {
    // Error handling
    console.log("Error:", error);
});
```

**Key Points**:
- Called when promise is rejected
- Receives the value passed to `reject()`
- Catches errors from the promise chain
- Better error handling than second argument of `.then()`

---

#### `.finally()` Method (Bonus)
```javascript
myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => {
        console.log("Always executed");
    });
```

**Key Points**:
- Executes regardless of promise state
- Useful for cleanup operations
- Doesn't receive any arguments

---

### 2.7 Promise Chaining

**Concept**: Promises can be chained to perform sequential asynchronous operations.

```javascript
function getUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John" });
        }, 1000);
    });
}

function getPosts(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([`Post by ${user.name}`, `Another post`]);
        }, 1000);
    });
}

// Promise Chaining
getUser(1)
    .then(user => {
        console.log("User:", user);
        return getPosts(user); // Return next promise
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.log("Error:", error);
    });
```

**Important Rules**:
- Always return a value or promise from `.then()`
- Error in any step triggers the nearest `.catch()`
- Chain maintains sequential execution

---

### 2.8 Promise Interview Questions

**Q1: What are the states of a Promise?**
- Pending, Fulfilled (Resolved), Rejected

**Q2: Can a promise be resolved multiple times?**
- No, once a promise is settled, it cannot change state

**Q3: What's the difference between resolve() and return?**
- `resolve()` settles the promise with a value
- `return` exits the function and returns a value to the caller

**Q4: What happens if both resolve() and reject() are called?**
- Only the first call takes effect; subsequent calls are ignored

**Q5: How to convert callback-based code to promises?**
```javascript
// Callback version
function getData(callback) {
    setTimeout(() => {
        callback("data");
    }, 1000);
}

// Promise version
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("data");
        }, 1000);
    });
}
```

---

## 3. ASYNC/AWAIT IN DETAIL

### 3.1 What is Async/Await?

**Definition**: Async/await is syntactic sugar built on top of Promises, making asynchronous code look and behave like synchronous code.

**Introduction**: ES2017 (ES8) feature

**Benefits**:
- Cleaner, more readable code
- Easier error handling with try-catch
- Avoids promise chaining complexity
- Sequential code flow

**Key Point**: Async/await doesn't replace promises; it's a better way to work with them.

---

### 3.2 The `async` Keyword

**Purpose**: Declares an asynchronous function

**Characteristics**:
- Always returns a Promise
- Automatically wraps non-promise return values in a resolved promise
- Enables use of `await` inside the function

**Syntax**:
```javascript
async function myFunction() {
    // function body
}

// Arrow function
const myFunction = async () => {
    // function body
};

// Method in object
const obj = {
    async myMethod() {
        // function body
    }
};
```

**Example**:
```javascript
async function greet() {
    return "Hello";
}

// Equivalent to:
function greet() {
    return Promise.resolve("Hello");
}

// Usage
greet().then(msg => console.log(msg)); // "Hello"
```

**Exam Focus**: An async function ALWAYS returns a promise, even if you return a primitive value.

---

### 3.3 The `await` Keyword

**Purpose**: Pauses execution of async function until Promise is settled

**Characteristics**:
- Can only be used inside `async` functions
- Makes code wait for Promise resolution
- Returns the resolved value of the Promise
- If Promise rejects, throws an error

**Syntax**:
```javascript
const result = await promiseFunction();
```

**Example**:
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log("Start");
    await delay(2000); // Wait 2 seconds
    console.log("After 2 seconds");
}

demo();
// Output:
// "Start" (immediately)
// "After 2 seconds" (after 2 seconds)
```

**Key Points**:
- `await` pauses only the async function, not the entire program
- JavaScript continues executing other code
- Multiple awaits execute sequentially unless explicitly parallelized

---

### 3.4 Error Handling with Async/Await

**Method 1: Try-Catch Block (Recommended)**
```javascript
async function fetchData() {
    try {
        const result = await someAsyncOperation();
        console.log(result);
    } catch (error) {
        console.log("Error occurred:", error);
    }
}
```

**Method 2: .catch() on function call**
```javascript
async function fetchData() {
    const result = await someAsyncOperation();
    return result;
}

fetchData()
    .then(result => console.log(result))
    .catch(error => console.log(error));
```

**Method 3: Try-Catch with Finally**
```javascript
async function fetchData() {
    try {
        const result = await someAsyncOperation();
        console.log(result);
    } catch (error) {
        console.log("Error:", error);
    } finally {
        console.log("Cleanup operations");
    }
}
```

---

### 3.5 Complete Real-World Example

```javascript
// Function 1: Addition with Promise
async function sum(a, b) {
    return new Promise((resolve, reject) => {
        console.log("started addition....");
        
        setTimeout(() => {
            var c = a + b;
            
            if (c < 0) {
                reject("Error: Invalid addition value");
            } else {
                resolve(c);
            }
        }, 2000);
    });
}

// Function 2: Factorial with Promise
async function factorial(num) {
    return new Promise((resolve, reject) => {
        console.log("started calculating factorial....");
        
        setTimeout(() => {
            var f = 1;
            for (var i = 1; i <= num; i++) {
                f = f * i;
            }
            
            if (f > 0) {
                resolve(f);
            } else {
                reject("Error: Invalid fact result");
            }
        }, 4000);
    });
}

// Function 3: Square with Promise
async function square(num) {
    return new Promise((resolve, reject) => {
        console.log("started calculating square....");
        
        setTimeout(() => {
            var sq = num * num;
            resolve(sq);
        }, 1000);
    });
}

// Main Handler Function using Async/Await
async function handlePromise() {
    try {
        // Step 1: Calculate sum (waits 2 seconds)
        const sumResult = await sum(2, 3);
        console.log("Sum is", sumResult); // Output: Sum is 5
        
        // Step 2: Calculate factorial (waits 4 seconds)
        const factResult = await factorial(sumResult);
        console.log("Factorial is", factResult); // Output: Factorial is 120
        
        // Step 3: Calculate square (waits 1 second)
        const squareResult = await square(factResult);
        console.log("Square is", squareResult); // Output: Square is 14400
        
    } catch (error) {
        console.log(error);
    }
}

// Execute
handlePromise();

// Total execution time: 2 + 4 + 1 = 7 seconds
```

**Execution Flow**:
1. "started addition...." (immediately)
2. Waits 2 seconds
3. "Sum is 5"
4. "started calculating factorial...." (immediately)
5. Waits 4 seconds
6. "Factorial is 120"
7. "started calculating square...." (immediately)
8. Waits 1 second
9. "Square is 14400"

---

### 3.6 Sequential vs Parallel Execution

#### Sequential Execution (Default with await)
```javascript
async function sequential() {
    const result1 = await operation1(); // Wait
    const result2 = await operation2(); // Wait
    const result3 = await operation3(); // Wait
    return [result1, result2, result3];
}
// Total time: time1 + time2 + time3
```

#### Parallel Execution (When operations are independent)
```javascript
async function parallel() {
    // Start all operations simultaneously
    const promise1 = operation1();
    const promise2 = operation2();
    const promise3 = operation3();
    
    // Wait for all to complete
    const result1 = await promise1;
    const result2 = await promise2;
    const result3 = await promise3;
    
    return [result1, result2, result3];
}
// Total time: max(time1, time2, time3)
```

#### Using Promise.all() for Parallel Execution
```javascript
async function parallelWithPromiseAll() {
    const results = await Promise.all([
        operation1(),
        operation2(),
        operation3()
    ]);
    return results; // [result1, result2, result3]
}
```

**Exam Focus**: Understand when to use sequential vs parallel execution.

---

### 3.7 Async/Await vs Promises Comparison

| Aspect | Promises (.then/.catch) | Async/Await |
|--------|------------------------|-------------|
| **Syntax** | Chaining with .then() | Sequential like sync code |
| **Readability** | Can get complex | More readable |
| **Error Handling** | .catch() | try-catch |
| **Debugging** | Harder | Easier |
| **Nested Operations** | Callback-like chains | Linear flow |
| **Learning Curve** | Moderate | Easier after understanding promises |

---

### 3.8 Common Patterns and Use Cases

#### Pattern 1: API Calls
```javascript
async function getUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}
```

#### Pattern 2: Multiple Dependent API Calls
```javascript
async function getCompleteUserInfo(userId) {
    try {
        const user = await getUser(userId);
        const posts = await getUserPosts(user.id);
        const comments = await getUserComments(user.id);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Error:", error);
    }
}
```

#### Pattern 3: Conditional Async Operations
```javascript
async function processData(data) {
    try {
        const validated = await validate(data);
        
        if (validated) {
            const processed = await process(data);
            const saved = await save(processed);
            return saved;
        } else {
            throw new Error("Validation failed");
        }
    } catch (error) {
        console.error("Processing failed:", error);
    }
}
```

---

### 3.9 Async/Await Interview Questions

**Q1: Can we use await outside an async function?**
- No, await can only be used inside async functions (with exception of top-level await in modules)

**Q2: What does an async function return?**
- Always returns a Promise

**Q3: What happens if an error is thrown in async function without try-catch?**
- The returned promise is rejected with that error

**Q4: Can we use async/await with setTimeout?**
```javascript
// This WON'T work as expected
async function delay() {
    await setTimeout(() => {}, 1000); // Wrong!
}

// Correct way
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    await delay(1000); // Correct!
}
```

**Q5: How to handle multiple promises with different success/failure?**
```javascript
async function handleMultiple() {
    const results = await Promise.allSettled([
        promise1(),
        promise2(),
        promise3()
    ]);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Promise ${index} succeeded:`, result.value);
        } else {
            console.log(`Promise ${index} failed:`, result.reason);
        }
    });
}
```

---

## 4. DOM MANIPULATION IN DETAIL

### 4.1 What is DOM?

**Full Form**: Document Object Model

**Definition**: The DOM is a programming interface for HTML and XML documents. It represents the page structure as a tree of objects that can be manipulated with JavaScript.

**When DOM is Created**: 
- When browser loads an HTML page
- Before displaying the page
- Creates a tree structure in memory

**Purpose**:
- Allows JavaScript to access and manipulate HTML elements
- Makes web pages dynamic and interactive
- Bridge between HTML and JavaScript

---

### 4.2 DOM Tree Structure

```
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── div
        │   ├── h1
        │   └── p
        └── button
```

**Key Concepts**:
- **Document**: Root of the tree
- **Element Nodes**: HTML tags
- **Text Nodes**: Text content inside elements
- **Attribute Nodes**: Attributes of elements

---

### 4.3 The `document` Object

**Definition**: Global object representing the entire HTML document

**Common Properties**:
- `document.title` - Page title
- `document.URL` - Page URL
- `document.body` - Body element
- `document.head` - Head element

**Common Methods**:
- `getElementById()`
- `getElementsByClassName()`
- `getElementsByTagName()`
- `querySelector()`
- `querySelectorAll()`
- `createElement()`

---

### 4.4 DOM Manipulation Operations

**7 Core Operations**:
1. **Select/Access elements** - Get reference to elements
2. **Add new elements** - Create and insert elements
3. **Remove elements** - Delete elements from DOM
4. **Modify content** - Change text/HTML
5. **Change styles** - Modify CSS properties
6. **Get/Set attributes** - Work with element attributes
7. **Event handling** - Respond to user actions

---

### 4.5 Selecting/Accessing Elements

#### Method 1: `getElementById()`
**Most Common Method**

```javascript
var element = document.getElementById("myId");
```

**Characteristics**:
- Returns single element
- Returns null if not found
- ID must be unique
- Fastest selection method

**Example**:
```html
<p id="mypara">This is a paragraph</p>
<script>
    var para = document.getElementById("mypara");
    console.log(para); // <p id="mypara">This is a paragraph</p>
    console.log(para.innerHTML); // "This is a paragraph"
</script>
```

---

#### Method 2: `getElementsByClassName()`
```javascript
var elements = document.getElementsByClassName("myClass");
```

**Characteristics**:
- Returns HTMLCollection (array-like)
- Can select multiple elements
- Live collection (updates automatically)

**Example**:
```html
<p class="text">Para 1</p>
<p class="text">Para 2</p>
<script>
    var paras = document.getElementsByClassName("text");
    console.log(paras.length); // 2
    console.log(paras[0].innerHTML); // "Para 1"
</script>
```

---

#### Method 3: `getElementsByTagName()`
```javascript
var elements = document.getElementsByTagName("p");
```

**Example**:
```javascript
var allParagraphs = document.getElementsByTagName("p");
for(var i = 0; i < allParagraphs.length; i++) {
    console.log(allParagraphs[i].innerHTML);
}
```

---

#### Method 4: `querySelector()` (Modern - Recommended)
```javascript
var element = document.querySelector("selector");
```

**Characteristics**:
- Returns first matching element
- Uses CSS selector syntax
- More flexible than other methods

**Examples**:
```javascript
// By ID
var elem1 = document.querySelector("#myId");

// By class
var elem2 = document.querySelector(".myClass");

// By tag
var elem3 = document.querySelector("p");

// Complex selectors
var elem4 = document.querySelector("div.container > p.text");
```

---

#### Method 5: `querySelectorAll()`
```javascript
var elements = document.querySelectorAll("selector");
```

**Characteristics**:
- Returns NodeList (not live)
- Returns all matching elements
- Can be converted to array

**Example**:
```javascript
var allDivs = document.querySelectorAll("div");
allDivs.forEach(div => {
    console.log(div.innerHTML);
});
```

---

### 4.6 Reading and Modifying Content

#### Property 1: `innerHTML`
**Gets or sets HTML content including tags**

```javascript
// Get content
var content = element.innerHTML;

// Set content
element.innerHTML = "<strong>New content</strong>";
```

**Example**:
```html
<p id="demo">Old text</p>
<button onclick="changeContent()">Change</button>

<script>
    function changeContent() {
        var para = document.getElementById("demo");
        console.log(para.innerHTML); // "Old text"
        para.innerHTML = "<strong>New bold text</strong>";
    }
</script>
```

**Use Cases**:
- Reading HTML content
- Setting HTML content with formatting
- Dynamic content updates

---

#### Property 2: `innerText`
**Gets or sets text content only (ignores HTML tags)**

```javascript
// Get text
var text = element.innerText;

// Set text
element.innerText = "Plain text";
```

**Difference from innerHTML**:
```javascript
var div = document.getElementById("demo");
div.innerHTML = "<strong>Bold</strong>"; // Renders as bold
div.innerText = "<strong>Bold</strong>"; // Shows literal text
```

---

#### Property 3: `textContent`
**Similar to innerText but includes hidden elements**

```javascript
var text = element.textContent;
```

**innerHTML vs innerText vs textContent**:

| Property | HTML Tags | Hidden Elements | Performance |
|----------|-----------|-----------------|-------------|
| innerHTML | Includes | Includes | Slower |
| innerText | Ignores | Ignores | Slower |
| textContent | Ignores | Includes | Faster |

---

### 4.7 Removing Elements

#### Method: `remove()`
**Removes element from DOM**

```javascript
element.remove();
```

**Complete Example**:
```html
<p id="mypara">This is para demo</p>
<button onclick="handleButtonClick()">Remove Paragraph</button>

<script>
    function handleButtonClick() {
        var obj = document.getElementById("mypara");
        obj.remove();
        // Paragraph is now removed from page
    }
</script>
```

**Alternative Methods**:
```javascript
// Method 1: removeChild()
var parent = element.parentNode;
parent.removeChild(element);

// Method 2: innerHTML
element.innerHTML = ""; // Removes all children
```

**Important Points**:
- Element is removed from DOM tree
- Cannot be accessed after removal
- To hide instead of remove, use CSS: `element.style.display = "none"`

---

### 4.8 Modifying Styles

#### Direct Style Property
**Syntax**: `element.style.propertyName = "value"`

```javascript
element.style.backgroundColor = "red";
element.style.fontSize = "20px";
element.style.color = "white";
```

**Complete Example**:
```html
<p id="mypara">This is para demo</p>
<button onclick="handleButtonClick()">Change Style</button>

<script>
    function handleButtonClick() {
        var obj = document.getElementById("mypara");
        obj.style.backgroundColor = "red";
        obj.style.color = "white";
        obj.style.padding = "10px";
        obj.style.fontSize = "20px";
    }
</script>
```

**CSS Property Naming Convention**:
```javascript
// CSS property: background-color
// JavaScript property: backgroundColor

// CSS property: font-size
// JavaScript property: fontSize

// CSS property: border-radius
// JavaScript property: borderRadius
```

**Rule**: Remove hyphens and capitalize next letter (camelCase)

---

#### Multiple Style Changes
```javascript
// Method 1: One by one
element.style.color = "red";
element.style.fontSize = "20px";
element.style.padding = "10px";

// Method 2: cssText
element.style.cssText = "color: red; font-size: 20px; padding: 10px;";

// Method 3: setAttribute
element.setAttribute("style", "color: red; font-size: 20px;");
```

---

### 4.9 Creating and Adding Elements

#### Step 1: Create Element
```javascript
var newElement = document.createElement("tagName");
```

#### Step 2: Set Content
```javascript
newElement.innerHTML = "Content";
```

#### Step 3: Append to Parent
```javascript
parent.appendChild(newElement);
```

**Complete Example**:
```html
<div id="mycontainer"></div>
<button onclick="handleButtonClick()">Add Element</button>

<script>
    function handleButtonClick() {
        // Step 1: Get container reference
        var container = document.getElementById("mycontainer");
        
        // Step 2: Create new element
        var newElement = document.createElement("h1");
        
        // Step 3: Set content
        newElement.innerHTML = "New h1 element";
        
        // Step 4: Add to container
        container.appendChild(newElement);
    }
</script>
```

**Output**: Each button click adds a new `<h1>` element

---

#### Other Insertion Methods

```javascript
// Append at end
parent.appendChild(child);

// Insert at beginning
parent.insertBefore(newChild, firstChild);

// Insert adjacent
element.insertAdjacentHTML('beforebegin', '<p>Before</p>');
element.insertAdjacentHTML('afterbegin', '<p>Start</p>');
element.insertAdjacentHTML('beforeend', '<p>End</p>');
element.insertAdjacentHTML('afterend', '<p>After</p>');

// Append multiple
parent.append(child1, child2, child3);
```

---

### 4.10 Working with Attributes

#### Method 1: `getAttribute()`
**Gets attribute value**

```javascript
var value = element.getAttribute("attributeName");
```

#### Method 2: `setAttribute()`
**Sets attribute value**

```javascript
element.setAttribute("attributeName", "value");
```

#### Method 3: `removeAttribute()`
**Removes attribute**

```javascript
element.removeAttribute("attributeName");
```

**Complete Example - Password Toggle**:
```html
<input type="password" placeholder="Enter password" id="passwordfield">
<button onclick="showPassword()" id="btn">Show</button>

<script>
    function showPassword() {
        // Get references
        var fieldObj = document.getElementById("passwordfield");
        var btnObj = document.getElementById("btn");
        
        // Check current button text
        if (btnObj.innerHTML === 'Show') {
            // Change input type to text
            fieldObj.setAttribute("type", "text");
            
            // Get current attribute value
            var attrValue = fieldObj.getAttribute("type");
            console.log(attrValue); // "text"
            
            // Change button text
            btnObj.innerHTML = "Hide";
        } else {
            // Change back to password
            fieldObj.setAttribute("type", "password");
            btnObj.innerHTML = "Show";
        }
    }
</script>
```

**Explanation**:
1. Initially input type is "password" (dots shown)
2. Click "Show" → type becomes "text" (password visible)
3. Button text changes to "Hide"
4. Click "Hide" → type becomes "password" again
5. Button text changes back to "Show"

**Common Attributes to Manipulate**:
- `type` - Input field types
- `value` - Input values
- `src` - Image/script sources
- `href` - Link destinations
- `class` - CSS classes
- `disabled` - Disable/enable elements
- `placeholder` - Input placeholders

---

#### Direct Attribute Access
```javascript
// Some attributes can be accessed directly
element.id = "newId";
element.className = "newClass";
element.src = "image.jpg";
element.href = "https://example.com";
element.value = "text";
```

---

### 4.11 Getting Input Values

#### Property: `value`
**Gets or sets value of input fields**

```javascript
// Get value
var inputValue = inputElement.value;

// Set value
inputElement.value = "New value";
```

**Example 1: Simple Input Reading**:
```html
<input type="text" id="myfield" placeholder="Enter text">
<button onclick="getInputValue()" id="btn">Get Value</button>

<script>
    function getInputValue() {
        var fieldObj = document.getElementById("myfield");
        var userInput = fieldObj.value;
        console.log(userInput);
        alert("You entered: " + userInput);
    }
</script>
```

**Important Points**:
- `value` property returns a string
- Even for number inputs, value is string
- Must convert to number for calculations

---

**Example 2: Calculator (Addition)**:
```html
<input type="text" id="num1" placeholder="First number">
<input type="text" id="num2" placeholder="Second number">
<button onclick="add()" id="btn">Add</button>
<h3 id="result"></h3>

<script>
    function add() {
        // Get input values (strings)
        var n1String = document.getElementById("num1").value;
        var n2String = document.getElementById("num2").value;
        
        // Convert to integers
        var n1 = parseInt(n1String);
        var n2 = parseInt(n2String);
        
        // Perform calculation
        var n3 = n1 + n2;
        
        // Display result
        document.getElementById("result").innerHTML = "Sum is " + n3;
    }
</script>
```

**Common Mistake**:
```javascript
// Wrong - String concatenation
var result = num1.value + num2.value; 
// "5" + "3" = "53"

// Correct - Numeric addition
var result = parseInt(num1.value) + parseInt(num2.value);
// 5 + 3 = 8
```

**Type Conversion Functions**:
```javascript
parseInt("123")      // 123 (integer)
parseFloat("123.45") // 123.45 (decimal)
Number("123")        // 123 (number)
+"123"              // 123 (unary plus operator)
```

---

### 4.12 Working with Different Input Types

#### Text Input
```javascript
var text = document.getElementById("textField").value;
```

#### Number Input
```javascript
var num = document.getElementById("numberField").value;
var numValue = parseFloat(num); // or parseInt()
```

#### Checkbox
```javascript
var checkbox = document.getElementById("myCheckbox");
var isChecked = checkbox.checked; // true or false

// Set checked state
checkbox.checked = true;
```

#### Radio Button
```javascript
var radio = document.getElementById("myRadio");
var isSelected = radio.checked;

// Get selected radio from group
var radios = document.getElementsByName("gender");
var selected = "";
for(var i = 0; i < radios.length; i++) {
    if(radios[i].checked) {
        selected = radios[i].value;
    }
}
```

#### Select/Dropdown
```javascript
var select = document.getElementById("mySelect");
var selectedValue = select.value;
var selectedIndex = select.selectedIndex;
var selectedText = select.options[select.selectedIndex].text;
```

#### Textarea
```javascript
var textarea = document.getElementById("myTextarea");
var content = textarea.value;
```

---

### 4.13 Event Handling in DOM

#### Method 1: Inline Event Handlers (HTML)
```html
<button onclick="myFunction()">Click Me</button>
```

**Pros**: Simple, quick for small projects
**Cons**: Mixes HTML and JavaScript, hard to maintain

---

#### Method 2: Event Handler Property (JavaScript)
```javascript
element.onclick = function() {
    // Code here
};
```

**Example**:
```html
<button id="myBtn">Click Me</button>

<script>
    var btn = document.getElementById("myBtn");
    btn.onclick = function() {
        alert("Button clicked!");
    };
</script>
```

**Limitation**: Only one handler per event type

---

#### Method 3: addEventListener() (Best Practice)
```javascript
element.addEventListener("event", function, useCapture);
```

**Example**:
```javascript
var btn = document.getElementById("myBtn");

btn.addEventListener("click", function() {
    alert("Button clicked!");
});

// Can add multiple listeners
btn.addEventListener("click", function() {
    console.log("Another handler");
});
```

**Advantages**:
- Multiple handlers for same event
- Better control over event propagation
- Can be removed with removeEventListener()

---

#### Common Events

| Event | Description | Use Case |
|-------|-------------|----------|
| `click` | Mouse click | Buttons, links |
| `dblclick` | Double click | Special actions |
| `mouseover` | Mouse enters | Hover effects |
| `mouseout` | Mouse leaves | Hide tooltips |
| `keydown` | Key pressed | Input validation |
| `keyup` | Key released | Search as you type |
| `keypress` | Key pressed & released | Character input |
| `change` | Value changed | Select, checkbox |
| `submit` | Form submitted | Form handling |
| `load` | Page loaded | Initialize page |
| `focus` | Element focused | Input highlights |
| `blur` | Element unfocused | Validation |

---

### 4.14 Complete Practical Examples

#### Example 1: Dynamic List Addition
```html
<!DOCTYPE html>
<html>
<body>
    <input type="text" id="itemInput" placeholder="Enter item">
    <button onclick="addItem()">Add Item</button>
    <ul id="itemList"></ul>

    <script>
        function addItem() {
            // Get input value
            var input = document.getElementById("itemInput");
            var itemText = input.value;
            
            // Validate input
            if(itemText.trim() === "") {
                alert("Please enter an item");
                return;
            }
            
            // Create list item
            var li = document.createElement("li");
            li.innerHTML = itemText;
            
            // Add to list
            var list = document.getElementById("itemList");
            list.appendChild(li);
            
            // Clear input
            input.value = "";
            input.focus();
        }
    </script>
</body>
</html>
```

---

#### Example 2: Counter Application
```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="counter">0</h1>
    <button onclick="increment()">+</button>
    <button onclick="decrement()">-</button>
    <button onclick="reset()">Reset</button>

    <script>
        var count = 0;
        
        function increment() {
            count++;
            updateDisplay();
        }
        
        function decrement() {
            count--;
            updateDisplay();
        }
        
        function reset() {
            count = 0;
            updateDisplay();
        }
        
        function updateDisplay() {
            document.getElementById("counter").innerHTML = count;
        }
    </script>
</body>
</html>
```

---

#### Example 3: Color Changer
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        #box {
            width: 200px;
            height: 200px;
            background-color: lightgray;
            margin: 20px;
            transition: background-color 0.3s;
        }
    </style>
</head>
<body>
    <div id="box"></div>
    <button onclick="changeColor('red')">Red</button>
    <button onclick="changeColor('blue')">Blue</button>
    <button onclick="changeColor('green')">Green</button>
    <button onclick="changeColor('yellow')">Yellow</button>

    <script>
        function changeColor(color) {
            var box = document.getElementById("box");
            box.style.backgroundColor = color;
        }
    </script>
</body>
</html>
```

---

#### Example 4: Form Validation
```html
<!DOCTYPE html>
<html>
<body>
    <form onsubmit="return validateForm()">
        <input type="text" id="username" placeholder="Username">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <button type="submit">Submit</button>
    </form>
    <p id="error" style="color: red;"></p>

    <script>
        function validateForm() {
            var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var error = document.getElementById("error");
            
            // Reset error
            error.innerHTML = "";
            
            // Validate username
            if(username.length < 3) {
                error.innerHTML = "Username must be at least 3 characters";
                return false;
            }
            
            // Validate email
            if(!email.includes("@")) {
                error.innerHTML = "Please enter valid email";
                return false;
            }
            
            // Validate password
            if(password.length < 6) {
                error.innerHTML = "Password must be at least 6 characters";
                return false;
            }
            
            alert("Form submitted successfully!");
            return true;
        }
    </script>
</body>
</html>
```

---

#### Example 5: To-Do List with Delete
```html
<!DOCTYPE html>
<html>
<body>
    <input type="text" id="todoInput" placeholder="Enter task">
    <button onclick="addTodo()">Add Task</button>
    <ul id="todoList"></ul>

    <script>
        function addTodo() {
            var input = document.getElementById("todoInput");
            var task = input.value;
            
            if(task.trim() === "") {
                alert("Please enter a task");
                return;
            }
            
            // Create list item
            var li = document.createElement("li");
            li.innerHTML = task;
            
            // Create delete button
            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.onclick = function() {
                li.remove();
            };
            
            // Add button to list item
            li.appendChild(deleteBtn);
            
            // Add to list
            document.getElementById("todoList").appendChild(li);
            
            // Clear input
            input.value = "";
        }
    </script>
</body>
</html>
```

---

### 4.15 DOM Manipulation Best Practices

#### 1. Cache DOM References
```javascript
// Bad - Queries DOM multiple times
function updateData() {
    document.getElementById("output").innerHTML = "Loading...";
    // ... some code ...
    document.getElementById("output").innerHTML = "Done";
}

// Good - Cache reference
function updateData() {
    var output = document.getElementById("output");
    output.innerHTML = "Loading...";
    // ... some code ...
    output.innerHTML = "Done";
}
```

---

#### 2. Minimize DOM Manipulation
```javascript
// Bad - Multiple DOM updates
for(var i = 0; i < 100; i++) {
    var li = document.createElement("li");
    li.innerHTML = "Item " + i;
    list.appendChild(li); // DOM update in loop
}

// Good - Single DOM update
var html = "";
for(var i = 0; i < 100; i++) {
    html += "<li>Item " + i + "</li>";
}
list.innerHTML = html; // Single DOM update
```

---

#### 3. Use Event Delegation
```javascript
// Bad - Multiple event listeners
var buttons = document.querySelectorAll(".btn");
buttons.forEach(function(btn) {
    btn.addEventListener("click", handleClick);
});

// Good - Single event listener on parent
var container = document.getElementById("container");
container.addEventListener("click", function(e) {
    if(e.target.classList.contains("btn")) {
        handleClick(e);
    }
});
```

---

#### 4. Validate Input
```javascript
function processInput() {
    var input = document.getElementById("userInput").value;
    
    // Always validate
    if(!input || input.trim() === "") {
        alert("Input cannot be empty");
        return;
    }
    
    // Process valid input
    console.log(input);
}
```

---

#### 5. Handle Errors Gracefully
```javascript
function safeGetElement(id) {
    var element = document.getElementById(id);
    
    if(!element) {
        console.error("Element not found:", id);
        return null;
    }
    
    return element;
}
```

---

### 4.16 DOM Methods Summary Table

| Method | Purpose | Returns |
|--------|---------|---------|
| `getElementById(id)` | Get element by ID | Single element |
| `getElementsByClassName(class)` | Get elements by class | HTMLCollection |
| `getElementsByTagName(tag)` | Get elements by tag | HTMLCollection |
| `querySelector(selector)` | Get first matching element | Single element |
| `querySelectorAll(selector)` | Get all matching elements | NodeList |
| `createElement(tag)` | Create new element | Element |
| `appendChild(child)` | Add child at end | Appended child |
| `removeChild(child)` | Remove child | Removed child |
| `remove()` | Remove element | undefined |
| `setAttribute(attr, val)` | Set attribute | undefined |
| `getAttribute(attr)` | Get attribute | String |
| `addEventListener(event, fn)` | Add event listener | undefined |

---

### 4.17 DOM Interview Questions

**Q1: What is the difference between innerHTML and textContent?**
- `innerHTML`: Gets/sets HTML including tags
- `textContent`: Gets/sets text only, ignoring tags

**Q2: What is the difference between getElementById and querySelector?**
- `getElementById()`: Faster, only selects by ID
- `querySelector()`: More flexible, uses CSS selectors

**Q3: What is event delegation?**
- Technique where event listener is attached to parent instead of individual children
- Uses event bubbling
- Better performance with many elements

**Q4: How to prevent form submission?**
```javascript
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevents default form submission
});
```

**Q5: What's the difference between HTMLCollection and NodeList?**
- HTMLCollection: Live, only element nodes, array-like
- NodeList: Can be static or live, all node types, array-like

**Q6: How to create element with attributes?**
```javascript
var img = document.createElement("img");
img.src = "image.jpg";
img.alt = "Description";
img.className = "myImage";
// Or
img.setAttribute("src", "image.jpg");
```

**Q7: How to check if element exists?**
```javascript
var element = document.getElementById("myId");
if(element) {
    // Element exists
} else {
    // Element doesn't exist
}
```

**Q8: How to get all input values from a form?**
```javascript
var form = document.getElementById("myForm");
var inputs = form.getElementsByTagName("input");

for(var i = 0; i < inputs.length; i++) {
    console.log(inputs[i].name + ": " + inputs[i].value);
}
```

---

## 5. KEY POINTS

### 5.1 Promise Key Points
✅ Promise has 3 states: Pending, Fulfilled, Rejected
✅ Promise constructor takes executor function with resolve, reject
✅ `.then()` handles success, `.catch()` handles failure
✅ Promises avoid callback hell
✅ Once settled, promise state cannot change
✅ Promises always execute asynchronously

---

### 5.2 Async/Await Key Points
✅ `async` function always returns a Promise
✅ `await` can only be used inside async functions
✅ `await` pauses execution until Promise resolves
✅ Use try-catch for error handling
✅ Sequential execution by default
✅ Use Promise.all() for parallel execution

---

### 5.3 DOM Key Points
✅ DOM is tree structure of HTML document
✅ `document` object represents entire page
✅ `getElementById()` is fastest selection method
✅ `querySelector()` is most flexible
✅ `innerHTML` includes HTML tags
✅ `value` property for input fields returns string
✅ Always convert input values for calculations
✅ Cache DOM references for better performance

---

### 5.4 Common Coding Patterns for Exams

#### Pattern 1: Promise Creation
```javascript
function asyncOperation() {
    return new Promise((resolve, reject) => {
        // Async logic
        if(success) {
            resolve(data);
        } else {
            reject(error);
        }
    });
}
```

#### Pattern 2: Async/Await Usage
```javascript
async function handler() {
    try {
        const result = await asyncOperation();
        console.log(result);
    } catch(error) {
        console.error(error);
    }
}
```

#### Pattern 3: DOM Manipulation
```javascript
function updateUI() {
    // Get element
    var element = document.getElementById("id");
    
    // Modify
    element.innerHTML = "New content";
    element.style.color = "red";
}
```

#### Pattern 4: Form Input Handling
```javascript
function processForm() {
    var input = document.getElementById("field").value;
    var number = parseInt(input);
    document.getElementById("output").innerHTML = result;
}
```

---

## 6. PRACTICE PROBLEMS

### Problem 1: Create a promise that resolves after 3 seconds
```javascript
function delay(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Resolved after ${seconds} seconds`);
        }, seconds * 1000);
    });
}

delay(3).then(msg => console.log(msg));
```

---

### Problem 2: Use async/await to fetch user data sequentially
```javascript
async function getUserProfile(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const friends = await fetchFriends(user.id);
        return { user, posts, friends };
    } catch(error) {
        console.error("Error:", error);
    }
}
```

---

### Problem 3: Create a button counter
```javascript
var count = 0;
var btn = document.getElementById("btn");
var display = document.getElementById("count");

btn.addEventListener("click", function() {
    count++;
    display.innerHTML = count;
});
```

---

### Problem 4: Toggle element visibility
```javascript
function toggleVisibility() {
    var element = document.getElementById("box");
    if(element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
```
--- 
