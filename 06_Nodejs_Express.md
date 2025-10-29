# Node.js & Express.js Complete Guide with Practical Implementation

## Table of Contents
1. [Node.js Fundamentals](#nodejs-fundamentals)
2. [Module System](#module-system)
3. [Predefined Modules](#predefined-modules)
4. [Package Management](#package-management)
5. [Express.js Framework](#expressjs-framework)
6. [Routing & Data Handling](#routing--data-handling)
7. [Real-World Project Implementation](#real-world-project-implementation)
8. [Complete Project Examples](#complete-project-examples)

---

## Node.js Fundamentals

### What is Node.js?
- **Runtime Environment for JavaScript**
- NOT a programming language
- NOT a library or framework
- Allows JavaScript to run outside the browser (on servers, desktops, etc.)

### 🤔 When to Use Node.js?
**Use Node.js when you need to:**
- Build backend APIs for web/mobile apps
- Create real-time applications (chat, live notifications)
- Build CLI tools and automation scripts
- Handle file operations on server
- Create web servers
- Process data from databases

**Real-World Examples:**
- Netflix backend (video streaming)
- PayPal payment processing
- LinkedIn server-side operations
- Uber real-time ride tracking

### Running Node.js
```bash
node filename.js
```

**Example Workflow:**
1. Create `app.js` file
2. Write JavaScript code in it
3. Open terminal in that folder
4. Run: `node app.js`
5. See output in terminal

---

## Module System

### What is a Module?
A module is a **JavaScript file** that provides reusable functions, properties, classes, etc.

### 🎯 Why Use Modules?
**Without Modules:**
```javascript
// app.js - 5000 lines of code
function calculateTax() { }
function sendEmail() { }
function connectDatabase() { }
function validateUser() { }
// ... everything in one file!
```
**Problems:** Hard to maintain, debug, and reuse

**With Modules:**
```javascript
// taxCalculator.js
export function calculateTax() { }

// emailService.js
export function sendEmail() { }

// database.js
export function connectDatabase() { }

// app.js - clean and organized!
import { calculateTax } from './taxCalculator.js';
import { sendEmail } from './emailService.js';
```
**Benefits:** Organized, reusable, maintainable!

---

### Types of Modules

#### 1. Predefined Modules (Built-in)
**What:** Already available with Node.js installation
**When to use:** Common operations like file handling, server creation

**Common Built-in Modules:**
- `fs` - File operations (read, write, delete files)
- `http` - Create web servers
- `path` - Handle file paths
- `os` - Operating system information
- `crypto` - Encryption/hashing
- `url` - Parse URLs

**Example Use Case:**
```javascript
// Need to read a config file? Use fs
const fs = require('fs');

// Need to create a server? Use http
const http = require('http');
```

#### 2. User-Defined Modules (Custom)
**What:** Modules you create for your project
**When to use:** Project-specific functionality

**Real Example - E-commerce Project:**
```javascript
// userController.js - Handle user operations
export function registerUser() { }
export function loginUser() { }

// productController.js - Handle products
export function addProduct() { }
export function getProducts() { }

// orderController.js - Handle orders
export function createOrder() { }
export function trackOrder() { }
```

#### 3. Third-Party Modules (npm packages)
**What:** Created by other developers, installed via npm
**When to use:** Don't reinvent the wheel - use existing solutions

**Popular Third-Party Modules:**
- `express` - Web framework (easier than http module)
- `mongoose` - MongoDB database operations
- `jsonwebtoken` - User authentication
- `bcrypt` - Password hashing
- `axios` - Make HTTP requests
- `nodemailer` - Send emails
- `dotenv` - Manage environment variables

**Example Decision Tree:**
```
Need to create REST API?
├─ Use built-in 'http' module? ❌ Too much code
└─ Use 'express' npm package? ✅ Much easier!

Need to hash passwords?
├─ Write your own algorithm? ❌ Security risks
└─ Use 'bcrypt' npm package? ✅ Battle-tested!
```

---

## Working with Modules

### CommonJS Syntax (require/exports)

#### 📝 Creating a User-Defined Module

**Scenario:** You're building a calculator for your app

```javascript
// calculator.js (Your custom module)
exports.add = function(a, b) {
    return a + b;
}

exports.subtract = function(a, b) {
    return a - b;
}

exports.multiply = function(a, b) {
    return a * b;
}

exports.divide = function(a, b) {
    if(b === 0) return "Cannot divide by zero";
    return a / b;
}
```

#### 📥 Using Your Module

```javascript
// app.js (Main application file)
const calc = require('./calculator');

console.log(calc.add(10, 5));        // Output: 15
console.log(calc.subtract(10, 5));   // Output: 5
console.log(calc.multiply(10, 5));   // Output: 50
console.log(calc.divide(10, 5));     // Output: 2
```

**💡 Key Points:**
- Use `./` for local modules (same folder)
- Use `../` for parent folder modules
- No `./` needed for npm packages: `require('express')`

---

### ES6 Syntax (import/export)

**⚠️ IMPORTANT:** Before using import/export, add this to `package.json`:
```json
{
  "type": "module"
}
```

#### 📝 Creating Module (ES6 Style)

```javascript
// userService.js
export function createUser(name, email) {
    return {
        id: Date.now(),
        name: name,
        email: email,
        createdAt: new Date()
    };
}

export function deleteUser(userId) {
    console.log(`User ${userId} deleted`);
}

export const MAX_USERS = 1000;
```

#### 📥 Importing Module

```javascript
// app.js

// Import specific functions (Recommended)
import { createUser, deleteUser, MAX_USERS } from './userService.js';

const newUser = createUser('John', 'john@example.com');
console.log(newUser);
console.log(`Max allowed users: ${MAX_USERS}`);

// Import everything
import * as UserService from './userService.js';
UserService.createUser('Jane', 'jane@example.com');
```

**🤔 When to use which syntax?**

**Use CommonJS (require) when:**
- Working with older Node.js projects
- Using npm packages that don't support ES6
- Quick scripts and simple projects

**Use ES6 (import) when:**
- Starting new projects (modern approach)
- Want better code organization
- Building scalable applications
- Need tree-shaking (removes unused code)

---

## Predefined Modules

### 1. File System Module (fs)

#### 🎯 Real-World Use Cases

**Use Case 1: Save User Uploaded Data**
```javascript
const fs = require('fs');

// User uploads profile picture
function saveProfilePicture(imageData, userId) {
    const filename = `profile_${userId}.jpg`;
    fs.writeFile(filename, imageData, (err) => {
        if(err) {
            console.log("Error saving image:", err);
        } else {
            console.log("Profile picture saved!");
        }
    });
}
```

**Use Case 2: Read Configuration File**
```javascript
const fs = require('fs');

// Read app configuration at startup
fs.readFile('config.json', (err, data) => {
    if(err) {
        console.log("Config file not found!");
        return;
    }
    const config = JSON.parse(data.toString());
    console.log("App running on port:", config.port);
});
```

**Use Case 3: Generate Reports**
```javascript
const fs = require('fs');

function generateSalesReport(salesData) {
    const report = `
        Sales Report - ${new Date()}
        Total Sales: ${salesData.total}
        New Customers: ${salesData.newCustomers}
        Revenue: $${salesData.revenue}
    `;
    
    fs.writeFileSync('reports/sales_report.txt', report);
    console.log("Report generated!");
}
```

#### 🔄 Async vs Sync - When to Use?

**Use ASYNC (Non-blocking) - Recommended for most cases:**
```javascript
// ✅ User clicks "download report" button
app.get('/download-report', (req, res) => {
    fs.readFile('report.pdf', (err, data) => {
        if(err) {
            res.send("Error reading file");
        } else {
            res.send(data);
        }
    });
    // Server can handle other requests while reading file!
});
```

**Use SYNC (Blocking) - Only for startup tasks:**
```javascript
// ✅ Read config file when server starts (before handling requests)
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json').toString());

const app = express();
app.listen(config.port);  // Use config immediately
```

**❌ Bad Example - Don't use sync in request handlers:**
```javascript
// BAD! This blocks the entire server!
app.get('/users', (req, res) => {
    const data = fs.readFileSync('users.json');  // 😱 Everyone waits!
    res.send(data);
});
```

---

### 2. HTTP Module

#### 🎯 Understanding IP, Port, and Socket

**Think of it like a building:**
- **IP Address** = Building Address (192.168.1.1)
- **Port Number** = Apartment Number (5000)
- **Socket** = Complete Address (192.168.1.1:5000)

**Real-World Analogy:**
```
Your Computer (IP: 192.168.1.100)
├── Netflix App (Port: 8080) → 192.168.1.100:8080
├── Spotify App (Port: 9000) → 192.168.1.100:9000
└── Your Node Server (Port: 5000) → 192.168.1.100:5000
```

#### 🌐 Localhost Explained

**Localhost = Your Own Computer**
- IP: `127.0.0.1`
- Alias: `localhost`
- Only accessible from your machine

**Development vs Production:**
```javascript
// Development (your laptop)
http://localhost:3000  // Only you can access

// Production (deployed on server)
http://api.myapp.com   // Everyone can access
```

#### 📝 Creating a Basic Server

```javascript
const http = require('http');

// Create server that responds to all requests
const server = http.createServer((request, response) => {
    // request = incoming request from browser
    // response = what we send back
    
    console.log(`Someone visited: ${request.url}`);
    
    response.write("Welcome to my server!");
    response.end();  // Must call end() to finish response
});

// Start server on port 5000
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
```

**🔍 What happens when you visit http://localhost:5000?**
1. Browser sends request to your computer
2. Node.js receives it on port 5000
3. Callback function executes
4. Response is sent back to browser
5. Browser displays "Welcome to my server!"

#### 🚀 Practical Example - Simple API

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
    if(request.url === '/') {
        response.write("Home Page");
        response.end();
    } 
    else if(request.url === '/api/users') {
        const users = [
            {id: 1, name: 'John'},
            {id: 2, name: 'Jane'}
        ];
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(users));
    }
    else {
        response.writeHead(404);
        response.end("Page not found");
    }
});

server.listen(3000);
```

**Visit these URLs:**
- `http://localhost:3000/` → Shows "Home Page"
- `http://localhost:3000/api/users` → Shows user data in JSON
- `http://localhost:3000/anything` → Shows "Page not found"

---

## Package Management

### 📦 Understanding package.json

**Think of package.json as your project's ID card**

#### What it contains:
```json
{
  "name": "my-ecommerce-app",           // Project name
  "version": "1.0.0",                    // Version number
  "description": "Online shopping app",  // What it does
  "main": "server.js",                   // Entry point
  "scripts": {                           // Commands you can run
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {                      // Packages your app needs
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  }
}
```

#### 🎯 Why is it Important?

**Scenario: Sharing your project with a teammate**

**Without package.json:**
```
You: "Install these packages: express, mongoose, bcrypt, jsonwebtoken..."
Teammate: "What versions? How do I install?"
You: "Uh... I forgot the versions..."
```

**With package.json:**
```
You: "Here's the project. Run 'npm install'"
Teammate: *runs npm install*
Computer: *installs all packages with correct versions automatically*
Teammate: "Done! It works!"
```

### 📥 NPM Commands Explained

#### Initialize Project
```bash
# Interactive setup (asks questions)
npm init
# Answer: name, version, description, etc.

# Quick setup (uses defaults)
npm init --y
# Creates package.json instantly with default values
```

**💡 When to use which?**
- Use `npm init` for serious projects (asks important questions)
- Use `npm init --y` for practice/quick projects

---

### 📦 Installing Packages

#### Local Installation (90% of the time)
```bash
# Install one package
npm install express
npm i express        # Short form

# Install multiple packages
npm i express mongoose dotenv bcrypt

# What happens:
# ✅ Package downloaded to node_modules/
# ✅ Added to package.json dependencies
# ✅ Ready to use in your code
```

**Example - Building a REST API:**
```bash
# You need these packages
npm i express          # Web framework
npm i mongoose         # Database
npm i jsonwebtoken     # Authentication
npm i bcrypt          # Password hashing
npm i dotenv          # Environment variables

# All installed in node_modules/
# Listed in package.json
# Now you can use them in code!
```

#### Global Installation (10% of the time)
```bash
# Install globally (system-wide)
npm install nodemon -g
npm i typescript -g

# Used for CLI tools that you run from terminal
```

**🤔 When to install globally?**

**Install Globally (CLI tools):**
- `nodemon` - Auto-restart server on file changes
- `typescript` - Compile TypeScript to JavaScript
- `create-react-app` - Create React projects
- `pm2` - Process manager for production

**Install Locally (code libraries):**
- `express` - You import it in code
- `mongoose` - You import it in code
- `bcrypt` - You import it in code

---

### 🗂️ Understanding node_modules

**What is node_modules?**
Folder containing all installed packages and their dependencies

**Example:**
```
your-project/
├── node_modules/          (Can be 100+ MB!)
│   ├── express/           (1,000 files)
│   ├── mongoose/          (500 files)
│   ├── bcrypt/           (200 files)
│   └── ...hundreds more
├── package.json          (1 KB)
└── server.js            (Your code)
```

#### ⚠️ Critical Rule: Never Commit node_modules!

**Why not?**
1. **Huge size** - Can be 100-500 MB
2. **Unnecessary** - Can be regenerated
3. **Slow uploads** - Takes forever to push to Git

**Correct Workflow:**

**On Your Computer:**
```bash
# 1. Install packages
npm install express mongoose

# 2. Create .gitignore file
echo "node_modules/" > .gitignore

# 3. Commit to Git (node_modules not included)
git add .
git commit -m "Added project"
git push
```

**Teammate Downloads Your Project:**
```bash
# 1. Clone project (no node_modules)
git clone your-repo-url

# 2. Install all dependencies (reads package.json)
npm install

# 3. All packages installed! Ready to run!
npm start
```

**✨ Magic:** `npm install` reads package.json and installs everything!

---

## Express.js Framework

### 🚀 Why Express Instead of HTTP Module?

**HTTP Module (Hard Way):**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/users' && req.method === 'GET') {
        // Handle GET users
    } else if(req.url === '/users' && req.method === 'POST') {
        // Handle POST users
    } else if(req.url.startsWith('/users/') && req.method === 'GET') {
        // Handle GET single user
    } else if(req.url === '/products' && req.method === 'GET') {
        // Handle GET products
    }
    // 😱 50 more routes... nightmare!
});
```

**Express (Easy Way):**
```javascript
const express = require('express');
const app = express();

app.get('/users', (req, res) => { });        // Clean!
app.post('/users', (req, res) => { });       // Simple!
app.get('/users/:id', (req, res) => { });    // Elegant!
app.get('/products', (req, res) => { });     // Beautiful!
```

### 🎯 When to Use Express?

**Use Express for:**
- ✅ REST APIs for mobile/web apps
- ✅ Backend for React/Angular/Vue apps
- ✅ Server-side rendered websites
- ✅ Real-time applications
- ✅ Microservices

**Real Companies Using Express:**
- Uber (ride-sharing API)
- PayPal (payment processing)
- IBM (various APIs)
- Accenture (client projects)

---

### 📝 Basic Express Setup

```javascript
// 1. Import Express
const express = require('express');

// 2. Create Express app (this is your server)
const app = express();

// 3. Define routes (what happens when someone visits URLs)
app.get('/', (req, res) => {
    res.send('Welcome to homepage!');
});

app.get('/about', (req, res) => {
    res.send('About us page');
});

// 4. Start server (listen for requests)
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

**🔍 What happens when you run this?**
1. Server starts on port 3000
2. Open browser: `http://localhost:3000` → See "Welcome to homepage!"
3. Open: `http://localhost:3000/about` → See "About us page"

---

## Routing & Data Handling

### 🗺️ Understanding Routes

**Route = URL + HTTP Method + Handler Function**

Think of routes like a restaurant menu:
- `/menu` (GET) → Show menu
- `/order` (POST) → Place new order
- `/order/:id` (GET) → Check order status
- `/order/:id` (PUT) → Update order
- `/order/:id` (DELETE) → Cancel order

### 🔤 HTTP Methods Explained

#### GET - Retrieve Data
**When:** User wants to see/read information
**Real Examples:**
- View product list
- Check user profile
- See order history
- Load homepage

```javascript
// Get all products
app.get('/api/products', (req, res) => {
    const products = [
        {id: 1, name: 'Laptop', price: 50000},
        {id: 2, name: 'Phone', price: 30000}
    ];
    res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    // Find product from database
    res.json({id: productId, name: 'Laptop', price: 50000});
});
```

#### POST - Create New Data
**When:** User submits new information
**Real Examples:**
- Register new user
- Add product to cart
- Post a comment
- Upload a file

```javascript
// Register new user
app.post('/api/register', (req, res) => {
    const userData = req.body;  // Get data from request body
    // Save to database
    res.json({message: 'User registered successfully'});
});

// Add to cart
app.post('/api/cart', (req, res) => {
    const item = req.body;  // {productId: 1, quantity: 2}
    // Add to cart in database
    res.json({message: 'Added to cart'});
});
```

#### PUT - Update Existing Data
**When:** User wants to modify existing information
**Real Examples:**
- Update profile information
- Change password
- Edit post/comment
- Update product quantity

```javascript
// Update user profile
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updates = req.body;  // {name: 'New Name', phone: '1234567890'}
    // Update in database
    res.json({message: 'Profile updated'});
});
```

#### DELETE - Remove Data
**When:** User wants to delete something
**Real Examples:**
- Delete account
- Remove from cart
- Delete post
- Cancel order

```javascript
// Remove from cart
app.delete('/api/cart/:itemId', (req, res) => {
    const itemId = req.params.id;
    // Delete from database
    res.json({message: 'Item removed from cart'});
});
```

---

### 📊 Data Transfer Methods

#### Method 1: URL Parameters (Route Parameters)

**✅ Use URL parameters when:**
- Identifying specific resources (user ID, product ID)
- Non-sensitive data
- Simple values
- RESTful API design

**Syntax:**
```javascript
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Viewing user ${userId}`);
});

// Visit: http://localhost:3000/users/123
// Output: "Viewing user 123"
```

**Real-World Examples:**
```javascript
// E-commerce site
app.get('/products/:productId', (req, res) => {
    // GET /products/456
    const id = req.params.productId;  // "456"
    // Fetch product from database
});

// Social media
app.get('/profile/:username', (req, res) => {
    // GET /profile/john_doe
    const username = req.params.username;  // "john_doe"
    // Show user profile
});

// Blog
app.get('/posts/:year/:month/:slug', (req, res) => {
    // GET /posts/2024/03/my-first-post
    const {year, month, slug} = req.params;
    // year: "2024", month: "03", slug: "my-first-post"
});
```

**Multiple Parameters:**
```javascript
app.get('/orders/:userId/:orderId', (req, res) => {
    // GET /orders/123/456
    const userId = req.params.userId;      // "123"
    const orderId = req.params.orderId;    // "456"
    res.send(`User ${userId}'s order ${orderId}`);
});
```

#### Method 2: Query Parameters

**✅ Use query parameters when:**
- Filtering data
- Searching
- Pagination
- Optional parameters

**Syntax:**
```javascript
app.get('/products', (req, res) => {
    const category = req.query.category;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    res.json({category, minPrice, maxPrice});
});

// Visit: http://localhost:3000/products?category=electronics&minPrice=1000&maxPrice=5000
// Output: {category: "electronics", minPrice: "1000", maxPrice: "5000"}
```

**Real-World Examples:**
```javascript
// Search
app.get('/search', (req, res) => {
    // GET /search?q=laptop&sort=price
    const searchQuery = req.query.q;        // "laptop"
    const sortBy = req.query.sort;          // "price"
    // Search database and return results
});

// Pagination
app.get('/api/products', (req, res) => {
    // GET /api/products?page=2&limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // Return products for that page
});

// Filters
app.get('/api/jobs', (req, res) => {
    // GET /api/jobs?location=mumbai&type=fulltime&experience=2
    const filters = {
        location: req.query.location,
        type: req.query.type,
        experience: req.query.experience
    };
    // Filter and return jobs
});
```

#### Method 3: Request Body

**✅ Use request body when:**
- Sensitive data (passwords, personal info)
- Large amount of data
- Complex data structures
- POST, PUT, DELETE requests

**⚠️ IMPORTANT:** Must enable body parser first!
```javascript
const express = require('express');
const app = express();

// Enable JSON body parsing (REQUIRED!)
app.use(express.json());

// Enable form data parsing
app.use(express.urlencoded({extended: true}));
```

**Examples:**
```javascript
// User registration (sensitive data)
app.post('/api/register', (req, res) => {
    const userData = req.body;
    // req.body = {
    //   username: "john_doe",
    //   email: "john@example.com",
    //   password: "secret123",
    //   phone: "9876543210"
    // }
    
    // Save to database
    res.json({message: 'User registered'});
});

// Place order (complex data)
app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    // req.body = {
    //   userId: 123,
    //   items: [
    //     {productId: 1, quantity: 2},
    //     {productId: 5, quantity: 1}
    //   ],
    //   address: {...},
    //   paymentMethod: "card"
    // }
    
    res.json({message: 'Order placed', orderId: 789});
});
```

---

### 🎯 Decision Tree: Which Method to Use?

```
Need to send data to server?
│
├─ Is it a simple ID/identifier?
│  └─ Use URL Parameter: /users/:id
│
├─ Is it optional filter/search data?
│  └─ Use Query Parameter: /products?category=phones
│
├─ Is it sensitive or complex data?
│  └─ Use Request Body with POST/PUT
│
└─ Is it a form submission?
   └─ Use Request Body with POST
```

---

## Real-World Project Implementation

### 🏗️ Complete E-Commerce API Example

```javascript
// server.js
const express = require('express');
const app = express();

// Middleware - Enable body parsing
app.use(express.json());

// Dummy database (in real project, use MongoDB/MySQL)
let products = [
    {id: 1, name: 'Laptop', price: 50000, stock: 10},
    {id: 2, name: 'Phone', price: 30000, stock: 25},
    {id: 3, name: 'Headphones', price: 2000, stock: 50}
];

let users = [];
let cart = [];

// ==================== PRODUCT ROUTES ====================

// GET all products (with optional filtering)
app.get('/api/products', (req, res) => {
    try {
        let result = products;
        
        // Filter by price range (query parameters)
        if(req.query.minPrice) {
            const minPrice = parseInt(req.query.minPrice);
            result = result.filter(p => p.price >= minPrice);
        }
        
        if(req.query.maxPrice) {
            const maxPrice = parseInt(req.query.maxPrice);
            result = result.filter(p => p.price <= maxPrice);
        }
        
        res.status(200).json({
            success: true,
            count: result.length,
            products: result
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// GET single product (URL parameter)
app.get('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            product: product
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// POST - Add new product (Request body)
app.post('/api/products', (req, res) => {
    try {
        const {name, price, stock} = req.body;
        
        // Validation
        if(!name || !price || !stock) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, price, and stock'
            });
        }
        
        // Create new product
        const newProduct = {
            id: products.length + 1,
            name: name,
            price: price,
            stock: stock
        };
        
        products.push(newProduct);
        
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// PUT - Update product
app.put('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if(productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Update product
        const {name, price, stock} = req.body;
        if(name) products[productIndex].name = name;
        if(price) products[productIndex].price = price;
        if(stock) products[productIndex].stock = stock;
        
        res.status(200).json({
            success: true,
            message: 'Product updated',
            product: products[productIndex]
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// DELETE - Remove product
app.delete('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if(productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        products.splice(productIndex, 1);
        
        res.status(200).json({
            success: true,
            message: 'Product deleted'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ==================== USER ROUTES ====================

// POST - Register user
app.post('/api/users/register', (req, res) => {
    try {
        const {username, email, password, phone} = req.body;
        
        // Validation
        if(!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        
        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            username: username,
            email: email,
            password: password,  // In real app, hash this!
            phone: phone
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ==================== CART ROUTES ====================

// POST - Add to cart
app.post('/api/cart', (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        
        // Validation
        if(!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Please provide userId, productId, and quantity'
            });
        }
        
        // Check if product exists
        const product = products.find(p => p.id === productId);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Check stock
        if(product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }
        
        // Add to cart
        const cartItem = {
            id: cart.length + 1,
            userId: userId,
            productId: productId,
            productName: product.name,
            price: product.price,
            quantity: quantity,
            total: product.price * quantity
        };
        
        cart.push(cartItem);
        
        res.status(201).json({
            success: true,
            message: 'Added to cart',
            cartItem: cartItem
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// GET - View cart
app.get('/api/cart/:userId', (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userCart = cart.filter(item => item.userId === userId);
        
        const totalAmount = userCart.reduce((sum, item) => sum + item.total, 0);
        
        res.status(200).json({
            success: true,
            count: userCart.length,
            items: userCart,
            totalAmount: totalAmount
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// DELETE - Remove from cart
app.delete('/api/cart/:itemId', (req, res) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if(itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }
        
        cart.splice(itemIndex, 1);
        
        res.status(200).json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ==================== UTILITY ROUTES ====================

// Search products
app.get('/api/search', (req, res) => {
    try {
        const searchQuery = req.query.q;
        
        if(!searchQuery) {
            return res.status(400).json({
                success: false,
                message: 'Please provide search query'
            });
        }
        
        const results = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        res.status(200).json({
            success: true,
            count: results.length,
            results: results
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET    /api/products`);
    console.log(`   GET    /api/products/:id`);
    console.log(`   POST   /api/products`);
    console.log(`   PUT    /api/products/:id`);
    console.log(`   DELETE /api/products/:id`);
    console.log(`   POST   /api/users/register`);
    console.log(`   POST   /api/cart`);
    console.log(`   GET    /api/cart/:userId`);
    console.log(`   DELETE /api/cart/:itemId`);
    console.log(`   GET    /api/search?q=laptop`);
});
```

---

## 🧪 Testing the API

### Using Browser (GET requests only)

```
http://localhost:5000/api/products
http://localhost:5000/api/products/1
http://localhost:5000/api/products?minPrice=2000&maxPrice=40000
http://localhost:5000/api/search?q=phone
http://localhost:5000/api/cart/1
```

### Using Postman/Thunder Client (All methods)

**1. Get All Products**
```
Method: GET
URL: http://localhost:5000/api/products
Response: List of all products
```

**2. Add New Product**
```
Method: POST
URL: http://localhost:5000/api/products
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "Mouse",
  "price": 500,
  "stock": 100
}
```

**3. Update Product**
```
Method: PUT
URL: http://localhost:5000/api/products/1
Headers: Content-Type: application/json
Body (JSON):
{
  "price": 48000,
  "stock": 15
}
```

**4. Register User**
```
Method: POST
URL: http://localhost:5000/api/users/register
Body (JSON):
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "9876543210"
}
```

**5. Add to Cart**
```
Method: POST
URL: http://localhost:5000/api/cart
Body (JSON):
{
  "userId": 1,
  "productId": 2,
  "quantity": 2
}
```

---

## 🗂️ Project Structure Best Practices

### Small Project Structure
```
my-ecommerce-api/
├── server.js              # Main entry point
├── package.json          # Dependencies
├── .gitignore           # Ignore node_modules
└── node_modules/        # Installed packages
```

### Medium Project Structure
```
my-ecommerce-api/
├── server.js                    # Entry point
├── routes/
│   ├── productRoutes.js        # Product endpoints
│   ├── userRoutes.js           # User endpoints
│   └── cartRoutes.js           # Cart endpoints
├── controllers/
│   ├── productController.js    # Product logic
│   ├── userController.js       # User logic
│   └── cartController.js       # Cart logic
├── models/
│   ├── Product.js              # Product schema
│   ├── User.js                 # User schema
│   └── Cart.js                 # Cart schema
├── middleware/
│   ├── auth.js                 # Authentication
│   └── errorHandler.js         # Error handling
├── config/
│   └── database.js             # DB connection
├── package.json
└── .gitignore
```

### Large Project Structure
```
my-ecommerce-api/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/              # Business logic
│   ├── utils/                 # Helper functions
│   └── config/
├── tests/                     # Test files
├── docs/                      # Documentation
├── logs/                      # Log files
├── uploads/                   # User uploads
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🎯 Step-by-Step Implementation Guide

### Creating Your First API - Complete Walkthrough

#### Step 1: Initialize Project
```bash
# Create project folder
mkdir my-first-api
cd my-first-api

# Initialize package.json
npm init -y

# Install Express
npm install express

# Create main file
touch server.js
```

#### Step 2: Write Basic Server (server.js)
```javascript
const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({message: 'API is working!'});
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

#### Step 3: Run Server
```bash
node server.js
# Visit: http://localhost:3000
```

#### Step 4: Add First Endpoint
```javascript
// Add this to server.js
app.get('/api/users', (req, res) => {
    const users = [
        {id: 1, name: 'John', email: 'john@example.com'},
        {id: 2, name: 'Jane', email: 'jane@example.com'}
    ];
    res.json(users);
});
```

#### Step 5: Test in Browser
```
Visit: http://localhost:3000/api/users
You'll see the users array in JSON format!
```

#### Step 6: Add POST Endpoint
```javascript
// Add this to server.js
let users = [];  // Store users temporarily

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'User created',
        user: newUser
    });
});
```

#### Step 7: Test with Postman
```
Method: POST
URL: http://localhost:3000/api/users
Headers: Content-Type: application/json
Body:
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## 🔧 Common Issues and Solutions

### Issue 1: "Cannot GET /"
**Problem:** No route defined for root URL
**Solution:**
```javascript
app.get('/', (req, res) => {
    res.send('Server is running!');
});
```

### Issue 2: "req.body is undefined"
**Problem:** Body parser not enabled
**Solution:**
```javascript
app.use(express.json());  // Add this line!
```

### Issue 3: "Port already in use"
**Problem:** Another app using same port
**Solution:**
```javascript
// Change port number
app.listen(5001, () => {  // Try different port
    console.log('Server on port 5001');
});
```

### Issue 4: "Module not found"
**Problem:** Package not installed
**Solution:**
```bash
npm install express  # Install the package
```

### Issue 5: Server doesn't restart on changes
**Problem:** Need to manually restart
**Solution:**
```bash
# Install nodemon globally
npm install -g nodemon

# Run with nodemon
nodemon server.js

# Now changes auto-restart server!
```

---

## 📚 Complete Project Examples

### Example 1: Simple Todo API

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let todos = [
    {id: 1, task: 'Learn Node.js', completed: false},
    {id: 2, task: 'Build API', completed: false}
];

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Add new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Mark todo as complete
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if(!todo) {
        return res.status(404).json({message: 'Todo not found'});
    }
    todo.completed = true;
    res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1) {
        return res.status(404).json({message: 'Todo not found'});
    }
    todos.splice(index, 1);
    res.json({message: 'Todo deleted'});
});

app.listen(3000, () => console.log('Todo API running on port 3000'));
```

---

### Example 2: Student Management API

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let students = [
    {id: 1, name: 'Rahul', age: 20, course: 'Computer Science', grade: 'A'},
    {id: 2, name: 'Priya', age: 21, course: 'Electronics', grade: 'B'}
];

// Get all students
app.get('/api/students', (req, res) => {
    // Optional filtering by course
    if(req.query.course) {
        const filtered = students.filter(s => 
            s.course.toLowerCase() === req.query.course.toLowerCase()
        );
        return res.json(filtered);
    }
    res.json(students);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) {
        return res.status(404).json({message: 'Student not found'});
    }
    res.json(student);
});

// Add new student
app.post('/api/students', (req, res) => {
    const {name, age, course, grade} = req.body;
    
    if(!name || !age || !course) {
        return res.status(400).json({message: 'Missing required fields'});
    }
    
    const newStudent = {
        id: students.length + 1,
        name, age, course, grade: grade || 'N/A'
    };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update student grade
app.put('/api/students/:id/grade', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) {
        return res.status(404).json({message: 'Student not found'});
    }
    
    student.grade = req.body.grade;
    res.json(student);
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if(index === -1) {
        return res.status(404).json({message: 'Student not found'});
    }
    
    const deletedStudent = students.splice(index, 1);
    res.json({
        message: 'Student deleted',
        student: deletedStudent[0]
    });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    const stats = {
        totalStudents: students.length,
        averageAge: students.reduce((sum, s) => sum + s.age, 0) / students.length,
        gradeDistribution: {
            A: students.filter(s => s.grade === 'A').length,
            B: students.filter(s => s.grade === 'B').length,
            C: students.filter(s => s.grade === 'C').length
        }
    };
    res.json(stats);
});

app.listen(4000, () => console.log('Student API running on port 4000'));
```

---

## 🎓 Learning Progression

### Week 1: Basics
- ✅ Understand Node.js and modules
- ✅ Learn require/import syntax
- ✅ Practice with fs module
- ✅ Create simple HTTP server

### Week 2: Express Fundamentals
- ✅ Install and setup Express
- ✅ Create basic routes (GET)
- ✅ Understand request/response
- ✅ Handle URL parameters

### Week 3: CRUD Operations
- ✅ Implement POST endpoints
- ✅ Implement PUT endpoints
- ✅ Implement DELETE endpoints
- ✅ Add validation and error handling

### Week 4: Real Project
- ✅ Build complete API (Todo/Student/E-commerce)
- ✅ Test with Postman
- ✅ Add search and filtering
- ✅ Implement proper status codes

### Week 5: Advanced
- ✅ Connect to database (MongoDB/MySQL)
- ✅ Add authentication (JWT)
- ✅ File uploads
- ✅ Deploy to cloud

---

## 🚀 Quick Reference Cheat Sheet

### Essential Commands
```bash
# Initialize project
npm init -y

# Install packages
npm install express
npm i nodemon -g

# Run server
node server.js
nodemon server.js
```

### Basic Express Template
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/resource', (req, res) => {
    // GET logic
});

app.post('/api/resource', (req, res) => {
    // POST logic
});

app.put('/api/resource/:id', (req, res) => {
    // UPDATE logic
});

app.delete('/api/resource/:id', (req, res) => {
    // DELETE logic
});

app.listen(3000, () => console.log('Server running'));
```

### Status Codes
- `200` - OK (success)
- `201` - Created (resource created)
- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (server problem)

---

*🎉 You're now ready to build Node.js APIs! Happy Coding! 🚀* 