# Express.js, Middleware, and REST APIs --- Interview & Exam Notes

## 1. MySQL2 Installation

-   **Command:** `npm i mysql2`
-   Used to connect Node.js applications with MySQL databases.

------------------------------------------------------------------------

## 2. JavaScript Object & Array Destructuring

### Object Destructuring

``` js
const obj = {id:11, name:"hd"};
const {id, name} = obj;
```

-   Extracts values from an object and assigns them to variables.

### Array Destructuring

``` js
const myArray = [
  [1,2,3],
  ["hello", "hi"]
];
const [x, y] = myArray;
```

-   Extracts array elements into variables.

------------------------------------------------------------------------

## 3. Sending Data in Requests

### Two Ways to Send Data

1.  **URL Parameter** --- Data sent through URL (e.g., `/user?id=10`).
2.  **Request Body** --- Data sent hidden in the body (used in POST,
    PUT, etc.).

  Type            Visibility       Commonly Used In
  --------------- ---------------- -------------------
  URL Parameter   Visible in URL   GET Requests
  Request Body    Hidden           POST, PUT, DELETE

------------------------------------------------------------------------

## 4. Request and Response Bodies

-   **Request Data → Request Body**
-   **Response Data → Response Body**

⚠️ **Note:**\
`GET` requests **cannot handle** a request body.

------------------------------------------------------------------------

## 5. Express.js and Middleware

### Why Middleware?

-   By default, Express does not process the body of requests.
-   Because request bodies can contain various data types: JSON, binary,
    GraphQL, etc.
-   Middleware is required to tell Express **how** to process it.

### Definition

> A middleware is a function that executes **before** the request is
> processed by the main route handler.

**Flow:**

    Request → Middleware → Route Handler → Response

### Example: Enabling JSON Body Parsing

``` js
import express from 'express';

const app = express();
app.use(express.json()); // built-in middleware

app.get("/", (req, res) => {
  res.send({ message: 'Welcome to app' });
});

app.post("/sum", (req, res) => {
  console.log(req.body);
  res.send({ message: "hello" });
});

app.post("/factorial", (req, res) => {
  console.log(req.body);
  res.send({ message: "hello" });
});

app.listen(4500);
```

### Points to Remember

-   `app.use(express.json())` → enables JSON request body parsing.
-   Middleware can be **predefined (by Express)** or **custom (by
    developer)**.
-   Can be used globally or per route.

------------------------------------------------------------------------

## 6. API (Application Programming Interface)

### Definition

> A set of rules that allows one software application to communicate
> with another.

### Types of APIs

1.  **System-Level API** → Used within an OS or software system.
2.  **Web API / Web Service** → Runs over the web (HTTP/HTTPS).

------------------------------------------------------------------------

## 7. Web API Architectures

### 1. SOAP (Simple Object Access Protocol)

-   Uses **XML** format for communication.
-   More strict and secure but complex.

### 2. REST (Representational State Transfer)

-   Uses **HTTP methods** (GET, POST, PUT, DELETE).
-   Data usually in **JSON** format.
-   Lightweight and faster.

**Comparison:**

  Feature       SOAP                    REST
  ------------- ----------------------- ------------------------
  Format        XML                     JSON / XML
  Speed         Slower                  Faster
  Flexibility   Rigid                   Flexible
  Use Case      Enterprise-level apps   Modern web/mobile apps

------------------------------------------------------------------------

## 8. Example Use Case

**Sweet Shop Example** - Website (Web App) - Android App - iOS App

All can use the **same backend REST API** to share data between
platforms.

------------------------------------------------------------------------

## Quick Recap

  Concept          Description
  ---------------- -----------------------------------------
  Middleware       Function executed before route handling
  express.json()   Parses JSON request body
  GET              Cannot handle request body
  POST             Used to send data in body
  REST API         Lightweight web API using HTTP verbs
  SOAP API         XML-based web API

------------------------------------------------------------------------

**Prepared for:** Interview & Exam Point of View\
**Topic:** Express.js, Middleware, REST API Fundamentals\
**Language:** JavaScript / Node.js
