# JavaScript Advanced Concepts - Comprehensive Notes

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

### 3. Guest Management (Destructuring & Spread Operator)

```javascript
// Guest registration
let guestDetails = {
    id: 'G001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
    },
    preferences: {
        roomType: 'Deluxe',
        floor: 'High',
        smoking: false
    },
    idProof: {
        type: 'Aadhar',
        number: 'XXXX-XXXX-1234'
    }
};

// Destructuring guest info
const {name, email, phone, address, preferences} = guestDetails;
const {city, state} = address;
const {roomType, smoking} = preferences;

console.log(`Guest: ${name} from ${city}, ${state}`);
console.log(`Preference: ${roomType}, Smoking: ${smoking}`);

// Update guest with loyalty points
let updatedGuest = {
    ...guestDetails,
    loyaltyPoints: 500,
    membershipTier: 'Silver',
    lastVisit: new Date()
};

console.log(updatedGuest);

// Merge guest with booking info
let bookingInfo = {
    bookingId: 'BOOK123',
    roomNo: 101,
    checkIn: '2025-10-25',
    checkOut: '2025-10-27',
    totalAmount: 7000
};

let completeBooking = {...updatedGuest, ...bookingInfo};
console.log(completeBooking);
```

### 4. Staff Management (Functions & Callbacks)

```javascript
// Staff database
let staff = [
    {id: 'S001', name: 'Rajesh Kumar', role: 'Manager', shift: 'Morning'},
    {id: 'S002', name: 'Priya Sharma', role: 'Receptionist', shift: 'Evening'},
    {id: 'S003', name: 'Amit Patel', role: 'Chef', shift: 'Night'},
    {id: 'S004', name: 'Sneha Roy', role: 'Housekeeping', shift: 'Morning'}
];

// Assign task with callback
function assignTask(staffId, task, onComplete) {
    console.log(`Assigning task to ${staffId}: ${task}`);
    
    setTimeout(() => {
        console.log(`Task completed by ${staffId}`);
        onComplete(staffId, task);
    }, 2000);
}

// Usage
assignTask('S001', 'Check room 101', (staffId, task) => {
    console.log(`Notification sent to admin: ${task} done by ${staffId}`);
});

// Get staff by shift
const getStaffByShift = (shift) => {
    return staff.filter(s => s.shift === shift);
};

console.log("Morning shift staff:", getStaffByShift('Morning'));

// Task scheduler
function scheduleTask(staffRole, task, delay) {
    return new Promise((resolve, reject) => {
        let staffMember = staff.find(s => s.role === staffRole);
        
        if(!staffMember) {
            reject(`No ${staffRole} available`);
        }
        
        setTimeout(() => {
            resolve({
                staff: staffMember.name,
                task: task,
                completedAt: new Date()
            });
        }, delay);
    });
}

// Schedule multiple tasks
async function scheduleDailyTasks() {
    try {
        let task1 = await scheduleTask('Receptionist', 'Check-in guests', 1000);
        console.log('Completed:', task1);
        
        let task2 = await scheduleTask('Housekeeping', 'Clean room 101', 2000);
        console.log('Completed:', task2);
        
        let task3 = await scheduleTask('Chef', 'Prepare breakfast', 1500);
        console.log('Completed:', task3);
    } catch(error) {
        console.log('Error:', error);
    }
}

scheduleDailyTasks();
```

### 5. Menu & Order Management (Array Methods)

```javascript
// Restaurant menu
let menu = [
    {id: 'F001', name: 'Paneer Butter Masala', category: 'Main Course', price: 350, isVeg: true},
    {id: 'F002', name: 'Chicken Biryani', category: 'Main Course', price: 400, isVeg: false},
    {id: 'F003', name: 'Caesar Salad', category: 'Starter', price: 250, isVeg: true},
    {id: 'F004', name: 'Gulab Jamun', category: 'Dessert', price: 120, isVeg: true},
    {id: 'F005', name: 'Fish Curry', category: 'Main Course', price: 450, isVeg: false},
    {id: 'F006', name: 'Veg Manchurian', category: 'Starter', price: 200, isVeg: true}
];

// Filter vegetarian items
let vegMenu = menu.filter(item => item.isVeg);
console.log("Vegetarian items:", vegMenu);

// Get items by category
let starters = menu.filter(item => item.category === 'Starter');
console.log("Starters:", starters);

// Calculate average price
let avgPrice = menu.reduce((sum, item) => sum + item.price, 0) / menu.length;
console.log("Average price:", avgPrice.toFixed(2));

// Most expensive item
let expensive = menu.reduce((max, item) => item.price > max.price ? item : max);
console.log("Most expensive:", expensive.name, expensive.price);

// Order processing
let orders = [
    {orderId: 'ORD001', roomNo: 101, items: ['F001', 'F003', 'F004'], status: 'Pending'},
    {orderId: 'ORD002', roomNo: 102, items: ['F002', 'F006'], status: 'Preparing'},
    {orderId: 'ORD003', roomNo: 201, items: ['F005', 'F004'], status: 'Delivered'}
];

// Calculate bill for an order
function calculateBill(order) {
    let total = order.items.reduce((sum, itemId) => {
        let item = menu.find(m => m.id === itemId);
        return sum + (item ? item.price : 0);
    }, 0);
    
    let tax = total * 0.05; // 5% tax
    let serviceCharge = total * 0.10; // 10% service charge
    
    return {
        subtotal: total,
        tax: tax,
        serviceCharge: serviceCharge,
        grandTotal: total + tax + serviceCharge
    };
}

// Get bill for order
let order1 = orders[0];
let bill = calculateBill(order1);
console.log(`Bill for ${order1.orderId}:`, bill);

// Get pending orders
let pendingOrders = orders.filter(order => order.status === 'Pending');
console.log("Pending orders:", pendingOrders.length);

// Update order status
function updateOrderStatus(orderId, newStatus) {
    let order = orders.find(o => o.orderId === orderId);
    if(order) {
        order.status = newStatus;
        console.log(`Order ${orderId} updated to ${newStatus}`);
    }
}

updateOrderStatus('ORD001', 'Preparing');
```

### 6. Inventory Management (var, let, const)

```javascript
// Bad practice with var
function checkInventory() {
    var items = [];
    
    for(var i = 0; i < 5; i++) {
        items.push({id: i, name: `Item ${i}`});
    }
    
    console.log(i); // 5 (accessible - problem!)
    return items;
}

// Good practice with let
function checkInventoryBetter() {
    let items = [];
    
    for(let i = 0; i < 5; i++) {
        items.push({id: i, name: `Item ${i}`});
    }
    
    // console.log(i); // Error: i is not defined (good!)
    return items;
}

// Constants for configuration
const HOTEL_CONFIG = {
    name: 'Grand Hotel',
    totalRooms: 50,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    maxGuests: 200
};

// HOTEL_CONFIG = {}; // Error: Cannot reassign const

// But can modify properties
HOTEL_CONFIG.taxRate = 0.12; // Allowed
console.log(HOTEL_CONFIG);

// Inventory tracking
const INVENTORY = {
    toiletries: 500,
    towels: 300,
    bedSheets: 250
};

function useItem(itemName, quantity) {
    if(INVENTORY[itemName] >= quantity) {
        INVENTORY[itemName] -= quantity;
        console.log(`Used ${quantity} ${itemName}. Remaining: ${INVENTORY[itemName]}`);
    } else {
        console.log(`Insufficient ${itemName}`);
    }
}

useItem('towels', 10);
useItem('toiletries', 50);
```

### 7. Notification System (Promises & Async)

```javascript
// Email notification
function sendEmail(to, subject, body) {
    return new Promise((resolve, reject) => {
        console.log(`Sending email to ${to}...`);
        setTimeout(() => {
            let success = Math.random() > 0.1;
            if(success) {
                resolve({type: 'email', to, status: 'sent'});
            } else {
                reject('Email failed');
            }
        }, 1000);
    });
}

// SMS notification
function sendSMS(phone, message) {
    return new Promise((resolve, reject) => {
        console.log(`Sending SMS to ${phone}...`);
        setTimeout(() => {
            let success = Math.random() > 0.1;
            if(success) {
                resolve({type: 'sms', to: phone, status: 'sent'});
            } else {
                reject('SMS failed');
            }
        }, 800);
    });
}

// WhatsApp notification
function sendWhatsApp(phone, message) {
    return new Promise((resolve, reject) => {
        console.log(`Sending WhatsApp to ${phone}...`);
        setTimeout(() => {
            resolve({type: 'whatsapp', to: phone, status: 'sent'});
        }, 500);
    });
}

// Send all notifications (parallel)
async function notifyGuest(guestInfo, message) {
    try {
        let notifications = await Promise.all([
            sendEmail(guestInfo.email, 'Booking Confirmation', message),
            sendSMS(guestInfo.phone, message),
            sendWhatsApp(guestInfo.phone, message)
        ]);
        
        console.log('All notifications sent:', notifications);
        return notifications;
    } catch(error) {
        console.log('Some notifications failed:', error);
        // At least send one notification
        try {
            return await sendWhatsApp(guestInfo.phone, message);
        } catch(err) {
            throw 'All notification methods failed';
        }
    }
}

// Usage
let guest = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210'
};

notifyGuest(guest, 'Your room is ready for check-in!');
```

### 8. Revenue Analytics (Reduce & Complex Operations)

```javascript
// Booking history
let bookings = [
    {id: 'B001', roomNo: 101, amount: 7000, date: '2025-10-01', paymentMethod: 'Card'},
    {id: 'B002', roomNo: 102, amount: 4000, date: '2025-10-03', paymentMethod: 'Cash'},
    {id: 'B003', roomNo: 201, amount: 11000, date: '2025-10-05', paymentMethod: 'UPI'},
    {id: 'B004', roomNo: 101, amount: 7000, date: '2025-10-07', paymentMethod: 'Card'},
    {id: 'B005', roomNo: 103, amount: 5000, date: '2025-10-10', paymentMethod: 'Card'}
];

// Total revenue
let totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
console.log('Total Revenue:', totalRevenue);

// Average booking amount
let avgBooking = totalRevenue / bookings.length;
console.log('Average Booking:', avgBooking.toFixed(2));

// Revenue by payment method
let revenueByMethod = bookings.reduce((acc, booking) => {
    acc[booking.paymentMethod] = (acc[booking.paymentMethod] || 0) + booking.amount;
    return acc;
}, {});
console.log('Revenue by method:', revenueByMethod);

// Most booked room
let roomBookings = bookings.reduce((acc, booking) => {
    acc[booking.roomNo] = (acc[booking.roomNo] || 0) + 1;
    return acc;
}, {});
console.log('Room bookings:', roomBookings);

let mostBooked = Object.entries(roomBookings)
    .reduce((max, [room, count]) => count > max.count ? {room, count} : max, {count: 0});
console.log('Most booked room:', mostBooked);

// Generate monthly report
function generateMonthlyReport(month) {
    let monthBookings = bookings.filter(b => b.date.startsWith(month));
    
    let report = {
        month: month,
        totalBookings: monthBookings.length,
        totalRevenue: monthBookings.reduce((sum, b) => sum + b.amount, 0),
        averageBooking: 0,
        paymentMethods: {}
    };
    
    report.averageBooking = report.totalRevenue / report.totalBookings || 0;
    
    report.paymentMethods = monthBookings.reduce((acc, b) => {
        acc[b.paymentMethod] = (acc[b.paymentMethod] || 0) + 1;
        return acc;
    }, {});
    
    return report;
}

console.log(generateMonthlyReport('2025-10'));
```

### 9. Real-time Room Status Dashboard (Complex State Management)

```javascript
// Room status manager
class HotelDashboard {
    constructor() {
        this.rooms = [];
        this.bookings = [];
        this.guests = [];
    }
    
    // Add room
    addRoom(roomData) {
        this.rooms.push({
            ...roomData,
            status: 'Available',
            lastCleaned: new Date(),
            maintenanceRequired: false
        });
    }
    
    // Get dashboard summary
    getDashboardSummary() {
        const summary = {
            totalRooms: this.rooms.length,
            available: this.rooms.filter(r => r.status === 'Available').length,
            occupied: this.rooms.filter(r => r.status === 'Occupied').length,
            cleaning: this.rooms.filter(r => r.status === 'Cleaning').length,
            maintenance: this.rooms.filter(r => r.maintenanceRequired).length,
            occupancyRate: 0,
            totalRevenue: 0
        };
        
        summary.occupancyRate = ((summary.occupied / summary.totalRooms) * 100).toFixed(2);
        summary.totalRevenue = this.bookings.reduce((sum, b) => sum + b.amount, 0);
        
        return summary;
    }
    
    // Check-in guest
    async checkInGuest(bookingId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let booking = this.bookings.find(b => b.id === bookingId);
                if(!booking) {
                    reject('Booking not found');
                    return;
                }
                
                let room = this.rooms.find(r => r.roomNo === booking.roomNo);
                if(room) {
                    room.status = 'Occupied';
                    booking.checkedIn = true;
                    resolve({
                        message: 'Check-in successful',
                        room: room.roomNo,
                        guest: booking.guestName
                    });
                } else {
                    reject('Room not found');
                }
            }, 1000);
        });
    }
    
    // Check-out guest
    async checkOutGuest(roomNo) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let room = this.rooms.find(r => r.roomNo === roomNo);
                if(!room) {
                    reject('Room not found');
                    return;
                }
                
                room.status = 'Cleaning';
                
                // Simulate cleaning
                setTimeout(() => {
                    room.status = 'Available';
                    room.lastCleaned = new Date();
                    console.log(`Room ${roomNo} cleaned and ready`);
                }, 2000);
                
                resolve({
                    message: 'Check-out successful',
                    room: roomNo,
                    finalBill: 7000
                });
            }, 1000);
        });
    }
}

// Usage
const dashboard = new HotelDashboard();

// Add rooms
dashboard.addRoom({roomNo: 101, type: 'Deluxe', price: 3500});
dashboard.addRoom({roomNo: 102, type: 'Standard', price: 2000});
dashboard.addRoom({roomNo: 201, type: 'Suite', price: 5500});

// Add booking
dashboard.bookings.push({
    id: 'BOOK001',
    roomNo: 101,
    guestName: 'John Doe',
    amount: 7000,
    checkedIn: false
});

console.log('Initial Dashboard:', dashboard.getDashboardSummary());

// Perform check-in
dashboard.checkInGuest('BOOK001')
    .then(result => {
        console.log(result);
        console.log('After check-in:', dashboard.getDashboardSummary());
        
        // Perform check-out after 3 seconds
        setTimeout(() => {
            dashboard.checkOutGuest(101)
                .then(result => {
                    console.log(result);
                    setTimeout(() => {
                        console.log('After check-out:', dashboard.getDashboardSummary());
                    }, 3000);
                });
        }, 3000);
    })
    .catch(error => console.log('Error:', error));
```

### 10. Interview Questions - Hotel Context

**Q1: Find all guests who have stayed more than 3 times**
```javascript
let guestHistory = [
    {guestId: 'G001', name: 'John', bookings: 5},
    {guestId: 'G002', name: 'Jane', bookings: 2},
    {guestId: 'G003', name: 'Bob', bookings: 7},
    {guestId: 'G004', name: 'Alice', bookings: 3}
];

let loyalGuests = guestHistory.filter(guest => guest.bookings > 3);
console.log(loyalGuests);
```

**Q2: Calculate occupancy rate for last 7 days**
```javascript
function calculateOccupancy(bookings, totalRooms, days) {
    let occupiedDays = bookings.reduce((sum, booking) => {
        let duration = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
        return sum + duration;
    }, 0);
    
    let totalCapacity = totalRooms * days;
    return ((occupiedDays / totalCapacity) * 100).toFixed(2);
}

let recentBookings = [
    {checkIn: '2025-10-15', checkOut: '2025-10-17'},
    {checkIn: '2025-10-16', checkOut: '2025-10-20'},
    {checkIn: '2025-10-18', checkOut: '2025-10-21'}
];

console.log('Occupancy Rate:', calculateOccupancy(recentBookings, 50, 7) + '%');
```

**Q3: Handle concurrent booking requests**
```javascript
async function handleConcurrentBookings(requests) {
    let results = await Promise.allSettled(
        requests.map(req => bookRoom(req.roomNo, req.guestName, req.checkIn, req.checkOut))
    );
    
    let successful = results.filter(r => r.status === 'fulfilled');
    let failed = results.filter(r => r.status === 'rejected');
    
    console.log(`Successful: ${successful.length}, Failed: ${failed.length}`);
    return {successful, failed};
}

// Usage
let bookingRequests = [
    {roomNo: 101, guestName: 'Guest1', checkIn: '2025-10-25', checkOut: '2025-10-27'},
    {roomNo: 102, guestName: 'Guest2', checkIn: '2025-10-25', checkOut: '2025-10-28'},
    {roomNo: 103, guestName: 'Guest3', checkIn: '2025-10-26', checkOut: '2025-10-29'}
];

handleConcurrentBookings(bookingRequests);
```

---

## Practice Exercises

### Exercise 1: Create a function to find available rooms for date range
```javascript
function findAvailableRooms(checkIn, checkOut, existingBookings) {
    // Your code here
    // Return array of available room numbers
}
```

### Exercise 2: Implement a pricing calculator with dynamic pricing
```javascript
function calculateDynamicPrice(basePrice, season, dayOfWeek, occupancyRate) {
    // Weekend: +20%
    // Peak season: +30%
    // High occupancy (>80%): +15%
    // Your code here
}
```

### Exercise 3: Create a guest loyalty program
```javascript
function calculateLoyaltyPoints(bookingAmount, membershipTier) {
    // Bronze: 1 point per ₹100
    // Silver: 1.5 points per ₹100
    // Gold: 2 points per ₹100
    // Your code here
}
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
- ES6 Features: http://es6-features.org/

---

**End of Notes**

*Created for GitHub - JavaScript Advanced Concepts with Hotel Management Examples*
*Last Updated: October 2025* {
        console.log("Error:", error);
    }
}

calculate();
```

### Interview Questions

**Q1: What is the event loop?**
```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");

// Output: 1, 4, 3, 2
// Explanation: Microtasks (Promises) execute before macrotasks (setTimeout)
```

**Q2: Create a delay function**
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log("Start");
    await delay(2000);
    console.log("After 2 seconds");
    await delay(3000);
    console.log("After 3 more seconds");
}

demo();
```

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