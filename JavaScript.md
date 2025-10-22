# JavaScript 

## Table of Contents
1. [Arrays in JavaScript](#arrays)
2. [JSON and Objects](#json-objects)
3. [Functions](#functions)
4. [Variable Keywords (var, let, const)](#variable-keywords)
5. [Arrow Functions](#arrow-functions)
6. [Array Methods](#array-methods)
7. [Asynchronous JavaScript](#async-javascript)
8. [Real-world Hotel Management Examples](#hotel-management)

---

## 1. Arrays in JavaScript {#arrays}

### Theory
- **Array**: A collection of elements (homogeneous or heterogeneous)
- **Size**: Dynamic and flexible
- **Syntax**: `[]`
- **Types**: 1D, 2D, 3D, Multi-dimensional

### Basic Operations

```javascript
// Array declaration
let arr = [10, 20, 30, "hello", true, 5.6];

// Accessing elements
console.log(arr[0]);        // 10
console.log(arr.length);    // 6

// Traditional for loop
for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// For...of loop (modern approach)
for(let value of arr) {
    console.log(value);
}
```

### Finding Max and Min

```javascript
let numbers = [8, 13, 43, 10, 9];

// Find Maximum
let max = numbers[0];
for(let i = 1; i < numbers.length; i++) {
    if(max < numbers[i]) {
        max = numbers[i];
    }
}
console.log("Max:", max);

// Find Minimum
let min = numbers[0];
for(let i = 1; i < numbers.length; i++) {
    if(min > numbers[i]) {
        min = numbers[i];
    }
}
console.log("Min:", min);
```

### 2D Arrays

```javascript
let matrix = [
    [10, 20, 30],
    [40, 50, 60, 55, 88],
    [70, 80, 90, 12]
];

// Accessing 2D array
console.log(matrix[0]);        // [10, 20, 30]
console.log(matrix[1][2]);     // 60

// Traversing 2D array
for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}
```

### Spread Operator (...)

```javascript
let arr1 = [10, 20, 30, 40];
let arr2 = [34, 56, 36];

// Combining arrays
let combined = [...arr1, ...arr2];
console.log(combined);  // [10, 20, 30, 40, 34, 56, 36]

// Flattening 2D to 1D
let nested = [[10, 20, 30], [40, 50, 60]];
let flat = [...nested[0], ...nested[1]];
console.log(flat);  // [10, 20, 30, 40, 50, 60]
```

### Interview Questions on Arrays

**Q1: How to swap max and min elements in an array?**
```javascript
function swapMaxMin(arr) {
    let maxIdx = 0, minIdx = 0;
    
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > arr[maxIdx]) maxIdx = i;
        if(arr[i] < arr[minIdx]) minIdx = i;
    }
    
    // Swap
    [arr[maxIdx], arr[minIdx]] = [arr[minIdx], arr[maxIdx]];
    return arr;
}

let arr = [8, 13, 43, 10, 9];
console.log(swapMaxMin(arr));  // [8, 13, 9, 10, 43]
```

**Q2: Remove duplicates from array**
```javascript
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = [...new Set(arr)];
console.log(unique);  // [1, 2, 3, 4, 5]
```

---

## 2. JSON and Objects {#json-objects}

### Theory
- **JSON**: JavaScript Object Notation
- **Purpose**: Represent data in key-value pairs
- **Syntax**: `{key: value, key: value}`
- **Standard**: Universal data exchange format

### Basic Object Operations

```javascript
// Simple object
let student = {
    roll: 101,
    name: 'Arun',
    marks: 98,
    phone: '988811',
    age: 19
};

// Accessing properties
console.log(student.roll);       // Dot notation
console.log(student['name']);    // Bracket notation
```

### Nested Objects

```javascript
let student = {
    roll: 101,
    name: 'Arun',
    marks: 98,
    hobbies: ['dance', 'music', 'cricket'],
    address: {
        houseNo: 'A176',
        locality: 'JS nagar',
        city: 'reactpur',
        state: 'RJ'
    }
};

// Accessing nested properties
console.log(student.address.city);
console.log(student.hobbies[0]);
```

### Object Destructuring

```javascript
// Basic destructuring
const {roll, name, age, hobbies, address} = student;
console.log(roll);   // 101
console.log(name);   // 'Arun'

// Nested destructuring
const {houseNo, locality, city} = address;
console.log(city);   // 'reactpur'
```

### Array of Objects

```javascript
let studentList = [
    {
        roll: 101,
        name: 'Arun',
        marks: 98,
        hobbies: ['dance', 'music', 'cricket'],
        address: {houseNo: 'A176', city: 'reactpur'}
    },
    {
        roll: 102,
        name: 'Rajesh',
        marks: 67,
        hobbies: ['music', 'cricket'],
        address: {houseNo: 'B234', city: 'techcity'}
    },
    {
        roll: 103,
        name: 'Priya',
        marks: 100,
        hobbies: ['dance', 'music'],
        address: {houseNo: 'C456', city: 'codetown'}
    }
];

// Iterating with destructuring
for(let i = 0; i < studentList.length; i++) {
    const {roll, name, marks, hobbies, address} = studentList[i];
    const {city, houseNo} = address;
    
    console.log(roll, name, marks, city, houseNo);
    
    for(let hobby of hobbies) {
        console.log(hobby);
    }
}
```

### Finding Topper

```javascript
let topper = studentList[0];

for(let i = 1; i < studentList.length; i++) {
    if(topper.marks < studentList[i].marks) {
        topper = studentList[i];
    }
}

console.log("Topper:", topper.name, "Marks:", topper.marks);
```

### Spread Operator with Objects

```javascript
let obj1 = {id: 101, name: 'Ravi'};
let obj2 = {phone: '888', email: 'ravi@example.com'};

// Merge objects
let merged = {...obj1, ...obj2};
console.log(merged);
// {id: 101, name: 'Ravi', phone: '888', email: 'ravi@example.com'}
```

### Dynamic Property Names

```javascript
// Case 1: Variable name as key
let id = 111;
let name = "keyboard";
let price = 445;

let product = {id, name, price};
console.log(product);
// {id: 111, name: "keyboard", price: 445}

// Case 2: Variable value as key
let propertyName = 'productPrice';
let obj = {[propertyName]: 2333};
console.log(obj);  // {productPrice: 2333}
```

### Interview Questions on Objects

**Q1: Deep clone an object**
```javascript
let original = {name: 'John', address: {city: 'NYC'}};

// Shallow copy (only top level)
let shallow = {...original};

// Deep copy (all levels)
let deep = JSON.parse(JSON.stringify(original));
```

**Q2: Check if object is empty**
```javascript
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

console.log(isEmpty({}));        // true
console.log(isEmpty({a: 1}));    // false
```

---

## 3. Functions {#functions}

### Theory
- **Function**: Collection of statements grouped together
- **Purpose**: Code reusability and modularity
- **Types**: Named, Anonymous, Arrow, Callback

### Function Declaration

```javascript
// Basic function
function add(a, b) {
    let c = a + b;
    return c;
}

let sum = add(3, 4);
console.log(sum);  // 7

// Function with ternary
function findMax(a, b) {
    return a > b ? a : b;
}

console.log(findMax(76, 23));  // 76
```

### Function as Object

```javascript
// Functions are objects in JavaScript
function show() {
    console.log("hello world");
}

// Assigning function to variable
let obj = show;
console.log(obj);  // Prints entire function definition
obj();             // Executes the function

// Function expression
let display = function show() {
    console.log("hello world");
}
display();
```

### Anonymous Functions

```javascript
// Anonymous function
let greet = function() {
    console.log("hello world");
}

let sum = function(a, b) {
    return a + b;
}

console.log(sum(4, 5));  // 9
```

### Callback Functions

```javascript
// Callback: Function passed as argument to another function
function show(callback) {
    console.log("Inside show");
    callback();
}

function demo() {
    console.log("inside demo function");
}

show(demo);  // demo is callback

// Anonymous callback
show(function() {
    console.log("Anonymous callback");
});
```

### Interview Questions on Functions

**Q1: What is a closure?**
```javascript
function outer() {
    let count = 0;
    
    return function inner() {
        count++;
        console.log(count);
    }
}

let counter = outer();
counter();  // 1
counter();  // 2
counter();  // 3
```

**Q2: IIFE (Immediately Invoked Function Expression)**
```javascript
(function() {
    console.log("I run immediately!");
})();

// With parameters
(function(name) {
    console.log("Hello " + name);
})("John");
```

---

## 4. Variable Keywords (var, let, const) {#variable-keywords}

### VAR Keyword

```javascript
// Problem 1: Hoisting
console.log(a);  // undefined (no error)
var a = 6;

// Problem 2: Re-declaration allowed
var a = 7;
var a = 6;  // No error

// Problem 3: Function scoped (not block scoped)
function show() {
    if(true) {
        var a = 4;
        console.log("inside if:", a);   // 4
    }
    console.log("outside if:", a);      // 4 (accessible!)
}
show();

// Problem 4: Global without keyword
function test() {
    b = 5;  // Creates global variable
}
test();
console.log(b);  // 5 (accessible globally)
```

### LET Keyword

```javascript
// Block scoped
function show() {
    if(true) {
        let a = 4;
        console.log("inside if:", a);   // 4
    }
    console.log("outside if:", a);      // Error: a is not defined
}

// Hoisting exists but can't access before initialization
console.log(a);  // Error: Cannot access 'a' before initialization
let a = 4;

// No re-declaration
let x = 5;
let x = 6;  // Error: Identifier 'x' has already been declared
```

### CONST Keyword

```javascript
// Same as let but immutable
const PI = 3.14;
PI = 3.14159;  // Error: Assignment to constant variable

// Objects and arrays are mutable
const obj = {name: 'John'};
obj.name = 'Jane';  // Allowed (modifying property)
obj.age = 25;       // Allowed (adding property)

const arr = [1, 2, 3];
arr.push(4);        // Allowed (modifying array)
arr = [5, 6];       // Error (reassignment not allowed)
```

### Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declaration | Yes | No | No |
| Re-assignment | Yes | Yes | No |
| Temporal Dead Zone | No | Yes | Yes |

### Interview Questions

**Q1: Explain hoisting**
```javascript
console.log(a);  // undefined
var a = 5;

// Behind the scenes:
var a;           // Declaration hoisted
console.log(a);  // undefined
a = 5;           // Assignment stays
```

**Q2: What is Temporal Dead Zone?**
```javascript
console.log(x);  // Error: Cannot access 'x' before initialization
let x = 5;

// TDZ: Period between entering scope and initialization
```

---

## 5. Arrow Functions {#arrow-functions}

### Syntax

```javascript
// Traditional function
function show() {
    console.log("hello world");
}

// Arrow function
let show = () => {
    console.log("hello world");
}
show();

// With parameters
let sum = (a, b) => a + b;
console.log(sum(3, 6));  // 9

// Single parameter (parentheses optional)
let increment = a => a + 5;
console.log(increment(3));  // 8

// Multiple statements need curly braces
let calculate = (a, b) => {
    let sum = a + b;
    let product = a * b;
    return {sum, product};
}
```

### Arrow Functions vs Regular Functions

```javascript
// 1. 'this' binding difference
let obj = {
    name: 'John',
    regularFunc: function() {
        console.log(this.name);  // 'John'
    },
    arrowFunc: () => {
        console.log(this.name);  // undefined
    }
}

// 2. Cannot use as constructor
let Person = (name) => {
    this.name = name;
}
// let p = new Person('John');  // Error

// 3. No arguments object
function regular() {
    console.log(arguments);  // Works
}

let arrow = () => {
    console.log(arguments);  // Error
}
```

### Interview Questions

**Q1: When to use arrow functions?**
- Use for short callbacks
- Use for array methods (map, filter, reduce)
- Avoid for object methods (if using 'this')
- Avoid for event handlers (if using 'this')

**Q2: Write concise arrow function**
```javascript
// Multi-line to single line
let arr = [1, 2, 3, 4, 5];

// Traditional
let doubled = arr.map(function(x) {
    return x * 2;
});

// Arrow
let doubled = arr.map(x => x * 2);
```

---

## 6. Array Methods {#array-methods}

### forEach()

```javascript
let arr = [10, 20, 33, 44, 56, 12];

// Basic forEach
arr.forEach((value, index) => {
    console.log(value, index);
});

// Filtering even numbers
let evenArray = [];
arr.forEach(value => {
    if(value % 2 === 0) {
        evenArray.push(value);
    }
});
console.log(evenArray);
```

### filter()

```javascript
let arr = [10, 20, 33, 44, 56, 12, 11, 13, 15, 16];

// Get even numbers
let evenArr = arr.filter(value => value % 2 === 0);
console.log(evenArr);  // [10, 20, 44, 56, 12, 16]

// Get numbers greater than 20
let greater = arr.filter(value => value > 20);
console.log(greater);  // [33, 44, 56]

// Filter objects
let students = [
    {name: 'John', marks: 85},
    {name: 'Jane', marks: 92},
    {name: 'Bob', marks: 78}
];

let toppers = students.filter(student => student.marks > 80);
console.log(toppers);
```

### map()

```javascript
let arr = [10, 20, 33, 44, 56];

// Double each element
let doubled = arr.map(value => value * 2);
console.log(doubled);  // [20, 40, 66, 88, 112]

// Square each element
let squared = arr.map(value => value * value);
console.log(squared);

// Transform objects
let students = [
    {name: 'John', marks: 85},
    {name: 'Jane', marks: 92}
];

let names = students.map(student => student.name);
console.log(names);  // ['John', 'Jane']

// Add grade property
let withGrades = students.map(student => ({
    ...student,
    grade: student.marks >= 90 ? 'A' : 'B'
}));
```

### reduce()

```javascript
let arr = [10, 20, 30, 40, 50];

// Sum of all elements
let sum = arr.reduce((accumulator, current) => {
    return accumulator + current;
}, 0);
console.log(sum);  // 150

// Find maximum
let max = arr.reduce((max, current) => {
    return current > max ? current : max;
}, arr[0]);
console.log(max);  // 50

// Count occurrences
let fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
let count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);
// {apple: 3, banana: 2, orange: 1}
```

### Other Useful Methods

```javascript
let arr = [10, 20, 30, 40, 50];

// find() - returns first matching element
let found = arr.find(x => x > 25);
console.log(found);  // 30

// findIndex() - returns index of first match
let index = arr.findIndex(x => x > 25);
console.log(index);  // 2

// some() - returns true if any element matches
let hasLarge = arr.some(x => x > 40);
console.log(hasLarge);  // true

// every() - returns true if all elements match
let allPositive = arr.every(x => x > 0);
console.log(allPositive);  // true

// includes() - checks if element exists
console.log(arr.includes(30));  // true

// sort() - sorts array
let unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
unsorted.sort((a, b) => a - b);  // Ascending
console.log(unsorted);

// reverse() - reverses array
arr.reverse();
console.log(arr);  // [50, 40, 30, 20, 10]
```

### Method Chaining

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let result = numbers
    .filter(x => x % 2 === 0)      // Get even numbers
    .map(x => x * x)                // Square them
    .reduce((sum, x) => sum + x);   // Sum them

console.log(result);  // 220 (4 + 16 + 36 + 64 + 100)
```

### Interview Questions

**Q1: Difference between forEach and map**
```javascript
// forEach: No return value, used for side effects
let arr = [1, 2, 3];
let result1 = arr.forEach(x => x * 2);
console.log(result1);  // undefined

// map: Returns new array
let result2 = arr.map(x => x * 2);
console.log(result2);  // [2, 4, 6]
```

**Q2: Find duplicates in array**
```javascript
function findDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

let arr = [1, 2, 3, 2, 4, 3, 5];
console.log(findDuplicates(arr));  // [2, 3]
```

---

## 7. Asynchronous JavaScript {#async-javascript}

### Synchronous vs Asynchronous

```javascript
// SYNCHRONOUS (Blocking)
console.log("Start");
console.log("Middle");
console.log("End");
// Output: Start, Middle, End (in order)

// ASYNCHRONOUS (Non-blocking)
console.log("Start");
setTimeout(() => {
    console.log("Middle");
}, 2000);
console.log("End");
// Output: Start, End, Middle (after 2 seconds)
```

### setTimeout()

```javascript
// Basic setTimeout
setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);

// Multiple async operations
console.log("Started addition...");
setTimeout(() => {
    let sum = 2 + 3;
    console.log("Sum:", sum);
}, 2000);

console.log("Started factorial...");
setTimeout(() => {
    let num = 5;
    let fact = 1;
    for(let i = 1; i <= num; i++) {
        fact *= i;
    }
    console.log("Factorial:", fact);
}, 4000);

console.log("Started square...");
setTimeout(() => {
    let sq = 8 * 8;
    console.log("Square:", sq);
}, 1000);

// Output order:
// Started addition...
// Started factorial...
// Started square...
// Square: 64 (after 1s)
// Sum: 5 (after 2s)
// Factorial: 120 (after 4s)
```

### Callback Hell

```javascript
// Problem: Nesting callbacks for sequential operations
console.log("Started addition...");
setTimeout(() => {
    let a = 2, b = 3;
    let sum = a + b;
    console.log("Sum:", sum);
    
    console.log("Started factorial...");
    setTimeout(() => {
        let fact = 1;
        for(let i = 1; i <= sum; i++) {
            fact *= i;
        }
        console.log("Factorial:", fact);
        
        console.log("Started square...");
        setTimeout(() => {
            let square = fact * fact;
            console.log("Square:", square);
        }, 1000);
    }, 4000);
}, 2000);

// This is CALLBACK HELL - hard to read and maintain!
```

### Promises (Solution to Callback Hell)

```javascript
// Promise basic structure
let promise = new Promise((resolve, reject) => {
    // Async operation
    let success = true;
    
    if(success) {
        resolve("Operation successful");
    } else {
        reject("Operation failed");
    }
});

// Using promise
promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
```

### Promise Example

```javascript
// Addition function returning promise
function add(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject("Invalid input");
            }
        }, 2000);
    });
}

// Factorial function
function factorial(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let fact = 1;
            for(let i = 1; i <= num; i++) {
                fact *= i;
            }
            resolve(fact);
        }, 4000);
    });
}

// Square function
function square(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    });
}

// Promise chaining (better than callback hell)
add(2, 3)
    .then(sum => {
        console.log("Sum:", sum);
        return factorial(sum);
    })
    .then(fact => {
        console.log("Factorial:", fact);
        return square(fact);
    })
    .then(sq => {
        console.log("Square:", sq);
    })
    .catch(error => {
        console.log("Error:", error);
    });
```

### Async/Await (Modern Approach)

```javascript
// Same operations with async/await
async function calculate() {
    try {
        let sum = await add(2, 3);
        console.log("Sum:", sum);
        
        let fact = await factorial(sum);
        console.log("Factorial:", fact);
        
        let sq = await square(fact);
        console.log("Square:", sq);
    } catch(error) {
        console.log("Booking failed:", error);
        throw error;
    }
}

// Usage
bookRoom(101, "John Doe", "2025-10-25", "2025-10-27")
    .then(result => console.log("Final result:", result))
    .catch(error => console.log("Error:", error));
```
---

## Best Practices Summary

1. **Use `const` by default**, `let` when reassignment needed, avoid `var`
2. **Prefer arrow functions** for callbacks and array methods
3. **Use destructuring** to extract object properties cleanly
4. **Chain array methods** for cleaner data transformations
5. **Use async/await** instead of nested callbacks
6. **Always handle errors** with try-catch in async functions
7. **Use promises** for asynchronous operations
8. **Keep functions small** and focused on single responsibility
9. **Use meaningful variable names** for better readability
10. **Comment complex logic** but write self-documenting code

---

## Additional Resources

- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/

---

## 8. Hotel Management System - Real-world Examples {#hotel-management}

### 1. Room Management (Arrays & Objects)

```javascript
// Room inventory using array of objects
let rooms = [
    {
        roomNo: 101,
        type: 'Deluxe',
        price: 3500,
        isAvailable: true,
        amenities: ['AC', 'TV', 'WiFi', 'Mini-bar'],
        floor: 1
    },
    {
        roomNo: 102,
        type: 'Standard',
        price: 2000,
        isAvailable: false,
        amenities: ['AC', 'TV', 'WiFi'],
        floor: 1
    },
    {
        roomNo: 201,
        type: 'Suite',
        price: 5500,
        isAvailable: true,
        amenities: ['AC', 'TV', 'WiFi', 'Mini-bar', 'Jacuzzi'],
        floor: 2
    }
];

// Find available rooms
let availableRooms = rooms.filter(room => room.isAvailable);
console.log("Available rooms:", availableRooms.length);

// Find rooms by type
function getRoomsByType(type) {
    return rooms.filter(room => room.type === type && room.isAvailable);
}

console.log("Available Deluxe rooms:", getRoomsByType('Deluxe'));

// Find most expensive available room
let mostExpensive = rooms
    .filter(room => room.isAvailable)
    .reduce((max, room) => room.price > max.price ? room : max);

console.log("Most expensive room:", mostExpensive.roomNo, mostExpensive.price);

// Get total revenue if all rooms booked
let totalRevenue = rooms.reduce((sum, room) => sum + room.price, 0);
console.log("Potential revenue:", totalRevenue);
```

### 2. Booking System (Async Operations)

```javascript
// Simulate database operations with promises

// Check room availability
function checkAvailability(roomNo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let room = rooms.find(r => r.roomNo === roomNo);
            if(!room) {
                reject("Room not found");
            } else if(!room.isAvailable) {
                reject("Room not available");
            } else {
                resolve(room);
            }
        }, 1000);
    });
}

// Process payment
function processPayment(amount, customerName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Processing payment of ₹${amount} for ${customerName}...`);
            // Simulate payment gateway
            let paymentSuccess = Math.random() > 0.1; // 90% success rate
            
            if(paymentSuccess) {
                resolve({
                    transactionId: 'TXN' + Date.now(),
                    amount: amount,
                    status: 'Success'
                });
            } else {
                reject("Payment failed");
            }
        }, 2000);
    });
}

// Send confirmation email
function sendConfirmation(bookingDetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Sending confirmation email...");
            resolve({
                emailSent: true,
                bookingId: 'BOOK' + Date.now(),
                ...bookingDetails
            });
        }, 1000);
    });
}

// Book room using async/await
async function bookRoom(roomNo, customerName, checkInDate, checkOutDate) {
    try {
        console.log(`Starting booking for ${customerName}...`);
        
        // Step 1: Check availability
        let room = await checkAvailability(roomNo);
        console.log(`Room ${roomNo} is available`);
        
        // Step 2: Process payment
        let payment = await processPayment(room.price, customerName);
        console.log(`Payment successful: ${payment.transactionId}`);
        
        // Step 3: Update room status
        room.isAvailable = false;
        
        // Step 4: Send confirmation
        let confirmation = await sendConfirmation({
            roomNo: roomNo,
            customerName: customerName,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            amount: room.price,
            transactionId: payment.transactionId
        });
        
        console.log("Booking confirmed:", confirmation.bookingId);
        return confirmation;
        
    } catch(error)
