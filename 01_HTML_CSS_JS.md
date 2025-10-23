# HTML-CSS-JS

## TABLE OF CONTENTS
1. Web Applications Architecture
2. HTTP Request & Response
3. Web Development Stack
4. HTML Fundamentals
5. CSS Styling
6. JavaScript Basics
7. JavaScript Operators & Control Structures

---

## 1. WEB APPLICATIONS ARCHITECTURE

### Types of Applications
- **Desktop Apps**: Directly installed on the system
- **Mobile Apps**: Installed on mobile devices
- **Web Apps/Websites**: No installation needed, requires internet and browser

### Web Architecture Model

**Components:**
- **Client**: Web browser (end user interface)
- **Server**: System containing the entire application and database

**Request-Response Cycle:**
1. Client sends a request to the server
2. Server accepts the request
3. Server processes the request
4. Server sends response to the client
5. Client receives and displays the response in the browser

---

## 2. HTTP REQUEST & RESPONSE

### Request Properties

**1. IP Address & Domain Name**
- IP address of the server is required to send the request
- Domain name/URL gets converted to IP address

**2. Request Methods**
- GET: Retrieve data
- POST: Submit data
- PUT: Update entire resource
- DELETE: Remove data
- PATCH: Partial update

### Response Properties

**1. Status (Code + Message)**

**Status Code Categories:**
- **2XX (Success)**: 200 OK, 201, 202, 203, 204, etc.
- **3XX (Redirection)**: 300, 301, 302, 399, etc.
- **4XX (Client Error)**: 400 Bad Request, 403 Forbidden, 404 Not Found, etc.
- **5XX (Server Error)**: 500, 501, 599, etc.

**Common Status Codes:**
- **200 OK**: Successful operation
- **404 Not Found**: Resource not found (client fault)
- **400 Bad Request**: Invalid request (client fault)
- **5XX Errors**: Server processing fault

**2. Response Data**
- Actual content returned from server

---

## 3. WEB DEVELOPMENT STACK

### Frontend Development (Client-Side)
**Purpose**: User Interface & User Experience

**Technologies:**
- **HTML**: Creates structure of web page
- **CSS**: Styling and layout of web page
- **JavaScript**: Client-side scripting, executing logic in browser
- **jQuery**: Library for JavaScript
- **Bootstrap/MUI/Tailwind CSS**: Responsive design frameworks
- **React JS**: Library for building dynamic frontend

### Backend Development (Server-Side)
**Purpose**: Processing & Database Management

**Technologies:**
- **Operations/Processing**: JavaScript, Express JS (Node JS framework)
- **Node JS**: Runtime environment to execute JavaScript code (NOT a library)
- **Databases**: MySQL, Oracle, SQL Server, MongoDB, Cassandra

### MERN Stack
**Complete Web Development Stack:**
- **M**: MongoDB or MySQL (Database)
- **E**: Express JS (Backend framework)
- **R**: React JS (Frontend library)
- **N**: Node JS (Runtime environment)

---

## 4. HTML FUNDAMENTALS

### Basic Elements

**Block Elements** (Start from new line):
- `<p>`: Paragraph
- `<h1>` to `<h6>`: Headings
- `<a>`: Anchor/Link
- `<img>`: Image
- `<ol>`: Ordered list
- `<ul>`: Unordered list
- `<li>`: List item

**Inline Elements** (Same line):
- `<span>`: Inline container

### Tables

**Table Structure:**
```html
<table border="1" cellspacing="0" cellpadding="10">
    <thead>
        <tr>
            <th>Header Cell</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data Cell</td>
        </tr>
    </tbody>
</table>
```

**Table Components:**
- `<table>`: Outer container
- `<tr>`: Table row
- `<td>`: Table data/cell
- `<th>`: Table header cell
- `<thead>`: Header section
- `<tbody>`: Body/data section

**Table Spacing:**
- **cellpadding**: Internal space inside a cell
- **cellspacing**: External space outside a cell (between cells)

### Forms

**Purpose of Form Tag:**
- Forms are NOT used to display data
- Forms are used to submit data to the server
- Default request method is GET (if not specified)

**Form Structure:**
```html
<form action="url" method="POST">
    <!-- Form elements -->
</form>
```

**Form Input Types:**
- `type="text"`: Text input
- `type="password"`: Password input
- `type="number"`: Numeric input
- `type="date"`: Date picker
- `type="time"`: Time picker
- `type="file"`: File upload
- `type="checkbox"`: Multiple selection
- `type="radio"`: Single selection
- `type="submit"`: Submit button
- `type="reset"`: Reset/Clear button
- `type="button"`: Plain button

**Form Elements:**
- `<input>`: Input field (self-closing)
- `<button>`: Button element
- `<select>`: Dropdown/selection
- `<option>`: Options in select
- `<textarea>`: Multi-line text area
- `<label>`: Label for input
- `<div>`: Container

**Button Types:**

1. **Plain Button**: No inherent functionality, developer must define manually
   ```html
   <input type="button" value="Click">
   <button type="button">Click me</button>
   ```

2. **Submit Button**: Submits form data to server (only works inside form)
   ```html
   <input type="submit" value="Sign Up">
   <button type="submit">Register</button>
   ```

3. **Reset Button**: Clears entire form data
   ```html
   <button type="reset">Clear form data</button>
   ```

### Media Elements

**Video:**
```html
<video controls width="400" height="300">
    <source src="video.mp4" type="video/mp4">
</video>
```

**Audio:**
```html
<audio controls>
    <source src="audio.mp3" type="audio/mp3">
</audio>

<audio controls loop autoplay>
    <source src="audio.mp3" type="audio/mp3">
</audio>
```

**Attributes:**
- `controls`: Show play/pause controls
- `loop`: Repeat audio/video
- `autoplay`: Start playing automatically

### Iframe

**Purpose**: Display content of another webpage within current page
```html
<iframe src="demo.html"></iframe>
```

---

## 5. CSS STYLING

### CSS Basics

**Purpose**: Style and layout web pages

**Location**: Place `<style>` tag in `<head>` section (recommended)
- Head loads before body
- Browser prepares all styling before rendering body
- Prevents page layout shift

**Syntax:**
```css
<style>
    selector {
        property-name: value;
        property-name: value;
    }
</style>
```

### CSS Selectors

**1. Tag/Element Selector**
```css
h1 {
    color: red;
}
```
Applies to all `<h1>` elements

**2. ID Selector** (Unique)
```css
#head1 {
    color: red;
}
```
- Identified with `#` symbol
- IDs should be unique to identify one element only
- Applied to: `<h1 id="head1">`

**3. Class Selector** (Multiple)
```css
.red-text {
    color: red;
}
```
- Identified with `.` symbol
- Classes can be applied to multiple elements
- Applied to: `<h1 class="red-text">`

**4. Universal Selector** (All elements)
```css
* {
    margin: 0;
}
```
- Selects all elements on the page

### Selector Specificity (Priority Order)
1. **ID Selector** (Highest priority)
2. **Class Selector**
3. **Tag Selector**
4. **Universal Selector** (Lowest priority)

### CSS Classification

**1. Internal CSS**
```html
<head>
    <style>
        h1 { color: red; }
    </style>
</head>
```

**2. External CSS**
```html
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```

**3. Inline CSS**
```html
<h1 style="color: red">Hello World</h1>
```

### CSS Specificity for Implementation Methods
**Inline CSS > Internal CSS > External CSS**

### Color Representations

**1. Color Names**
```css
color: red;
```

**2. Hexadecimal Code**
```css
color: #3b5998;
```

**3. RGB Function**
```css
color: rgb(255, 0, 0);
```
Each value ranges from 0-255

### Spacing Management in CSS

**Outer Space (Margin)**
```css
margin-top: value;
margin-right: value;
margin-bottom: value;
margin-left: value;

/* Shorthand */
margin: 40px 50px 30px 25px;  /* top right bottom left */
margin: 100px;                 /* all sides */
margin: 50px 100px;            /* top/bottom left/right */
```

**Inner Space (Padding/Cellpadding)**
```css
padding: value;
```

### Display Properties

**Display: Inline**
```css
display: inline;
```
- Prevents div from accepting custom width and height
- Element flows with text

**Display: Block**
```css
display: block;
```
- Element takes full width available
- Starts on new line

---

## 6. JAVASCRIPT BASICS

### Introduction

**Purpose**: Execute logic on the browser to make pages interactive and dynamic

**Key Concept**: Everything is an object in JavaScript (including UI elements and values)

**JavaScript Engine by Browser:**
- **Chrome**: V8 Engine
- **Mozilla Firefox**: Spider Monkey Engine

### Script Tag

```html
<script>
    // JavaScript code here
</script>
```

### Implicit Objects

**1. Document Object**
- Represents the entire web page
- Automatically defined (no need to define manually)
- Used to perform operations on the web page

```javascript
document.write("hello world");
document.write("<h1>Heading text</h1>");
```

**2. Window Object**
- Points to browser's window
- Contains all global functions

```javascript
window.alert("message");
alert("message");  // Window object reference is automatic
```

**3. Console Object**
- Used for debugging
- Displays output in browser console

```javascript
console.log(value);
```

### Variables and Data Types

**Variable Declaration:**
```javascript
a = 5;
b = "hello";
a = "bye";  // Reassigning different type
a = 6;      // Reassigning again
```

**Important Note**: JavaScript is NOT type-safe. For type safety during development, use **TypeScript (TS)**.

**JavaScript Data Types:**
- `number`: Integers and decimals (no separate int/float types)
- `string`: Text values
- `boolean`: true/false

**Checking Data Type:**
```javascript
console.log(typeof a);  // Returns data type
```

**No Char Type**: All text values are strings
- `"hello"`, `'hello'`, `` `hello` `` - All are strings

### String Methods

**String Concatenation:**
```javascript
a = 6;
b = "hello";
msg = "value of a = " + a;
```

**Template Literals (Backticks)**
```javascript
a = 6;
b = 5;
c = a + b;
msg = `sum of ${a} and ${b} is ${c}`;
console.log(msg);
```
- Use backticks `` ` `` for template literals
- Use `${}` for variable interpolation

---

## 7. JAVASCRIPT OPERATORS & CONTROL STRUCTURES

### Operators

**1. Arithmetic Operators**
```javascript
a = 4;
b = 5;
c = a + b;  // Addition
c = a - b;  // Subtraction
c = a * b;  // Multiplication
c = a / b;  // Division
c = a % b;  // Modulus (remainder)
```

**2. Relational Operators**
```javascript
a < b       // Less than
a > b       // Greater than
a <= b      // Less than or equal
a >= b      // Greater than or equal
a == b      // Equal value
a != b      // Not equal
a === b     // Strictly equal (value AND type)
a !== b     // Strictly not equal
```

**3. Logical Operators**
```javascript
a && b      // AND (both conditions true)
a || b      // OR (at least one true)
!a          // NOT (negates condition)
```

**4. Assignment Operators**
```javascript
a = value       // Simple assignment
a += value      // a = a + value
a -= value      // a = a - value
a *= value      // a = a * value
a /= value      // a = a / value
a %= value      // a = a % value
```

**5. Ternary Operator**
```javascript
c = condition ? value1 : value2;

// Example
a = 5;
b = 7;
c = a > b ? a : b;  // c will be 7
```

### Control Structures

**Purpose**: Decide the flow of execution of statements

**Types:**

**1. Sequential Execution**
- Statements execute line by line in order

**2. Conditional Execution**
- Statements execute based on conditions

**If Statement:**
```javascript
num = -2;
if(num >= 0) {
    console.log("number is positive");
} else {
    console.log("number is negative");
}
```

**If-Else If-Else:**
```javascript
marks = 85;
if(marks >= 91) {
    console.log("Grade: A+");
} else if(marks >= 81) {
    console.log("Grade: A");
} else if(marks >= 71) {
    console.log("Grade: B+");
} else {
    console.log("Grade: Fail");
}
```

**Switch Case:**
```javascript
roll = 109;
switch(roll) {
    case 102:
        console.log("pappu");
        break;
    case 103:
        console.log("gappu");
        break;
    case 104:
        console.log("tappu");
        break;
    default:
        console.log("not found");
}
```
- `break` prevents fall-through to next case
- `default` executes if no case matches

**3. Loops**
- Repeat statements multiple times

**While Loop:**
```javascript
num = 1;
while(num <= 5) {
    console.log(num);
    num++;
}
```

**For Loop:**
```javascript
for(i = 1; i <= 5; i++) {
    console.log(i);
}
```

**Nested Loops:**
```javascript
for(i = 1; i <= 10; i++) {
    for(j = 1; j <= 5; j++) {
        console.log("*");
    }
}
```

**Do-While Loop:**
```javascript
num = 1;
do {
    console.log(num);
    num++;
} while(num <= 5);
```

**ForEach Loop:**
```javascript
array.forEach(element => {
    console.log(element);
});
```

---
