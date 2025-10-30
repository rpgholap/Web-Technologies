# MVC, Authentication, JWT & bcrypt - Complete Guide

> **Focus**: Practical implementation, interview preparation, and understanding when to use what

---

## Table of Contents
1. [MVC Design Pattern](#mvc-design-pattern)
2. [Authentication - Making APIs Secure](#authentication---making-apis-secure)
3. [Login API Flow](#login-api-flow)
4. [Frontend Authentication Flow](#frontend-authentication-flow)
5. [Secured API - Token Validation](#secured-api---token-validation)
6. [JWT (JSON Web Token)](#jwt-json-web-token)
7. [bcrypt - Password Security](#bcrypt---password-security)
8. [When to Use What](#when-to-use-what)
9. [Interview Questions & Answers](#interview-questions--answers)

---

## MVC Design Pattern

### What is MVC?

MVC is an architectural pattern that separates application into three components:

#### 1. **Model** - Representation of Data
- Represents data structure (class, interface)
- Handles database operations
- Contains business logic
- Data validation

**What it does:**
```javascript
// User Model - Defines data structure
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

// Model methods
User.findOne({ username })
User.create({ username, email, password })
```

**Interview Point:**
> "Model represents how data is structured in our application. It's like a blueprint - it defines what a User should have (username, email, password) and provides methods to interact with the database. In authentication, the User Model stores user credentials and provides methods to find users and create new accounts."

#### 2. **View** - User Interface (UI)
- What users see
- Forms, buttons, pages
- Captures user input
- Displays data

**What it does:**
```javascript
// Login Form (React/HTML)
<form>
  <input type="text" placeholder="Username" />
  <input type="password" placeholder="Password" />
  <button>Login</button>
</form>
```

**Interview Point:**
> "View is the presentation layer - the login form, dashboard, etc. It doesn't contain any business logic. It just displays data and captures user input, then sends it to the Controller."

#### 3. **Controller** - Request & Response Processing
- Receives requests from View
- Processes business logic
- Interacts with Model
- Sends responses back

**What it does:**
```javascript
// Auth Controller - Handles login logic
exports.login = async (req, res) => {
  // 1. Get data from request
  const { username, password } = req.body;
  
  // 2. Find user (Model interaction)
  const user = await User.findOne({ username });
  
  // 3. Verify password
  const isValid = await bcrypt.compare(password, user.password);
  
  // 4. Generate token
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '24h' });
  
  // 5. Send response
  res.status(200).json({ token });
};
```

**Interview Point:**
> "Controller is where request and response processing happens. When a user submits the login form, the Controller receives the request, validates credentials using the Model, generates a JWT token, and sends the response back. It orchestrates the entire flow."

### MVC Flow

```
User (View) → Submits Login Form
              ↓
Controller → Receives username & password
              ↓
Controller → Calls Model to find user
              ↓
Model → Queries Database
              ↓
Model → Returns user data to Controller
              ↓
Controller → Verifies password with bcrypt
              ↓
Controller → Generates JWT token
              ↓
Controller → Sends response to View
              ↓
View → Displays success/error
```

**Interview Explanation:**
> "In MVC, the flow is: User interacts with View (login form) → View sends request to Controller → Controller processes logic and uses Model to access database → Model returns data → Controller generates response → View displays result. This separation makes code organized and maintainable."

---

## Authentication - Making APIs Secure

### Why Authentication?

**Problem:** Without authentication, anyone can access your APIs and data.

**Solution:** Make APIs secure with login authentication - only logged-in users can call APIs.

**How it works:**
1. User must login first
2. Server verifies credentials
3. If valid, server gives token
4. User sends token with every API request
5. Server checks token before processing request

### Authentication Flow

```
User not logged in → Calls Protected API → Server checks token → No token found → 
Response: "Please login first" (Status 401)

User logged in → Calls Protected API → Server checks token → Token found & valid → 
Process request → Send data (Status 200)
```

**Interview Point:**
> "Authentication secures our APIs by requiring users to prove their identity before accessing resources. Without a valid token, the server responds with 'Please login first'. This ensures only authenticated users can access protected data."

---

## Login API Flow

### Step-by-Step Process

#### Step 1: Take username and password in request body

```javascript
// Frontend sends request
POST /api/auth/login
{
  "username": "john",
  "password": "mypassword123"
}
```

**Interview Point:**
> "The login API receives credentials in the request body. We use POST method because credentials are sensitive and shouldn't be in the URL."

#### Step 2: Compare credentials with database record

```javascript
// Controller logic
const { username, password } = req.body;

// Find user in database
const user = await User.findOne({ username });

if (!user) {
  return res.status(400).json({ message: 'Invalid username or password' });
}

// Compare password with stored hash
const isPasswordValid = await bcrypt.compare(password, user.password);
```

**Interview Point:**
> "We query the database to find if the username exists, then use bcrypt to compare the provided password with the stored hashed password. We never compare plain text passwords - always use bcrypt.compare()."

#### Step 3a: If credentials match - Success Response

```javascript
if (isPasswordValid) {
  // Generate token with secret key
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }  // Set expiration time
  );
  
  // Send token in response with status 200
  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: token
  });
}
```

**What happens:**
1. Generate JWT token with secret key
2. Set expiration time (24 hours)
3. Send token in response
4. Status code: 200 (Success)

**Interview Point:**
> "If credentials match, we generate a JWT token using jwt.sign(). We include user information in the payload, sign it with a secret key, and set an expiration time. The token is sent in the response with status 200. The secret key must be kept secure - it's used to verify the token later."

#### Step 3b: If credentials don't match - Error Response

```javascript
if (!isPasswordValid) {
  return res.status(400).json({
    success: false,
    message: 'Invalid username or password'
  });
}
```

**What happens:**
1. Send error response
2. Message: "Username or password is invalid"
3. Status code: 400 (Bad Request)

**Interview Point:**
> "If credentials don't match, we return status 400 with a generic error message. We don't specify whether the username or password was wrong - this prevents attackers from identifying valid usernames."

### Complete Login API Code

```javascript
// routes/auth.js
router.post('/login', authController.login);

// controllers/authController.js
exports.login = async (req, res) => {
  try {
    // Step 1: Take username and password from request body
    const { username, password } = req.body;
    
    // Step 2: Compare credentials with database
    const user = await User.findOne({ username }).select('+password');
    
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid username or password' 
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Step 3a: If matched - generate token and send success response
    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return res.status(200).json({
        success: true,
        token: token
      });
    }
    
    // Step 3b: If not matched - send error response
    return res.status(400).json({ 
      message: 'Invalid username or password' 
    });
    
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
```

---

## Frontend Authentication Flow

### Complete Frontend Flow

```
1. User fills login form
   ↓
2. Frontend calls login API
   ↓
3. Read response from server
   ↓
4. Check if login successful
   ↓
5. Store token in localStorage
   ↓
6. Redirect to dashboard/home
```

### Step-by-Step Implementation

#### Step 1 & 2: Call Login API

```javascript
// Frontend - Login function
async function handleLogin(username, password) {
  // Call login API
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  // Read response
  const data = await response.json();
  
  // Check if login successful
  if (response.ok && data.success) {
    // Store token in localStorage
    localStorage.setItem('authToken', data.token);
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  } else {
    // Show error message
    alert(data.message);
  }
}
```

**Interview Explanation:**
> "The frontend calls the login API using fetch. When we get the response, we check if it's successful. If yes, we store the token in localStorage and redirect to the dashboard. If login fails, we show the error message to the user. localStorage persists the token even if the user closes the browser, so they stay logged in."

#### Why localStorage?

**Interview Point:**
> "We store the token in localStorage because it persists across browser sessions. This means the user stays logged in even if they close and reopen the browser. When they visit the site again, we can retrieve the token from localStorage and they don't need to login again until the token expires."

---

## Secured API - Token Validation

### How to Secure APIs

When a request comes to a **secured API**, we must check for the token **before processing the request**.

### Token Validation Flow

```
Request comes to secured API
         ↓
Check: Does request have a token?
         ↓
    YES        NO
     ↓          ↓
Is token    Send error:
valid?      "Please login first"
     ↓
YES    NO
 ↓      ↓
Process  Send error:
request  "Invalid token"
```

### Implementation

#### Sending Token from Frontend

```javascript
// When calling secured API, send token in request
const response = await fetch('http://localhost:3000/api/secured/data', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
  }
});
```

**Interview Point:**
> "For secured APIs, we send the token in the Authorization header with the format 'Bearer <token>'. We retrieve the token from localStorage where we stored it during login. The server will extract and verify this token before processing the request."

#### Validating Token on Backend (Middleware)

```javascript
// middleware/auth.js - Authentication Middleware
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    // Step 1: Check if incoming request has a token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Please login first. No token provided.' 
      });
    }
    
    // Step 2: Extract token
    const token = authHeader.split(' ')[1];
    
    // Step 3: Check token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Step 4: Token is valid - attach user info to request
    req.user = decoded;
    
    // Step 5: Allow request to proceed
    next();
    
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ 
      message: 'Invalid or expired token. Please login again.' 
    });
  }
};

module.exports = authenticate;
```

#### Using Middleware on Secured Routes

```javascript
// routes/secured.js
const authenticate = require('../middleware/auth');

// Apply authentication middleware to secured routes
router.get('/profile', authenticate, (req, res) => {
  // This code runs ONLY if token is valid
  res.json({
    message: 'Welcome to your profile',
    user: req.user  // User info from token
  });
});

router.get('/dashboard', authenticate, (req, res) => {
  res.json({ message: 'Dashboard data' });
});
```

**Interview Explanation:**
> "We create an authentication middleware that checks if the request has a token. If no token exists, we immediately respond with 'Please login first'. If token exists, we verify it using jwt.verify() with our secret key. If the token is valid, we extract user information from it, attach it to the request object, and call next() to proceed. If invalid or expired, we send an error response. We apply this middleware to all secured routes, so the token is checked before any route logic runs."

### What Happens in Each Case

**Case 1: No Token**
```
Request → Middleware checks → No token found → 
Response: "Please login first" (Status 401)
```

**Case 2: Invalid/Expired Token**
```
Request → Middleware checks → Token found → 
jwt.verify() fails → 
Response: "Invalid or expired token" (Status 401)
```

**Case 3: Valid Token**
```
Request → Middleware checks → Token found → 
jwt.verify() succeeds → 
Attach user info to request → 
Call next() → 
Route handler processes request → 
Send data (Status 200)
```

---

## JWT (JSON Web Token)

### What is JWT?

JWT is a token format used for authentication. It's a way to securely transmit information between client and server.

**Key Points:**
- Represented as a JSON object internally
- Encrypted/encoded as an alphanumeric string when transmitted
- Contains user information
- Can be verified to ensure it hasn't been tampered with

### JWT Structure - The 3 Parts

A JWT looks like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```

It has **3 parts separated by dots (.)**:

#### 1. Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
- Specifies the algorithm used (HS256, RS256, etc.)
- Specifies token type (JWT)

**Interview Point:**
> "The header tells us which algorithm was used to create the signature. HS256 means HMAC SHA-256 algorithm. This information is needed to verify the token later."

#### 2. Payload - Data stored inside the token
```json
{
  "userId": "1234567890",
  "username": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516325422
}
```
- Contains user information (claims)
- Your custom data: userId, username, role, etc.
- Standard claims: iat (issued at), exp (expiration)

**Interview Point:**
> "The payload is where we store data about the user. We include information like userId, username, and role. This data is encoded but NOT encrypted - anyone can decode and read it. That's why we never put sensitive information like passwords in JWT payload. We also include expiration time (exp) so the token automatically becomes invalid after a certain time."

#### 3. Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```
- Created by encoding header and payload with secret key
- Ensures token hasn't been tampered with
- Only server with secret key can verify

**Interview Point:**
> "The signature is the security mechanism. It's created by taking the encoded header and payload, combining them, and hashing with a secret key. When we receive a token, we recreate the signature using the same process. If it matches, the token is valid. If someone tries to change the payload (like changing role from 'user' to 'admin'), the signature won't match and we reject the token. This is why keeping the secret key secure is critical."

### How JWT Works

#### Creating JWT (Login)
```javascript
const jwt = require('jsonwebtoken');

// Create payload with user data
const payload = {
  userId: user._id,
  username: user.username,
  role: user.role
};

// Generate token with secret key and expiration
const token = jwt.sign(
  payload,                      // Data to store
  process.env.JWT_SECRET,       // Secret key
  { expiresIn: '24h' }          // Expires in 24 hours
);

// Send token to client
res.json({ token });
```

#### Verifying JWT (Secured API)
```javascript
try {
  // Verify token with secret key
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Token is valid - decoded contains payload data
  console.log(decoded.userId);    // Access user ID
  console.log(decoded.username);  // Access username
  console.log(decoded.role);      // Access role
  
} catch (error) {
  // Token is invalid or expired
  console.log('Invalid token');
}
```

**Interview Explanation:**
> "When a user logs in, we create a JWT by calling jwt.sign() with the user data (payload), secret key, and options like expiration time. The library automatically creates the header and signature. When we need to verify the token, we use jwt.verify() with the token and secret key. If valid, we get back the original payload data. If invalid or expired, it throws an error."

### JWT Format Breakdown

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  ← Header (base64 encoded)
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0  ← Payload (base64 encoded)
.
KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30  ← Signature
```

**Interview Point:**
> "JWT is a string with three parts separated by dots. Each part is base64 encoded. The first part is the header, second is the payload with user data, and third is the signature for verification. When sent from client to server, it's just this alphanumeric string. The server decodes it to read the data and verifies the signature to ensure it's valid."

---

## bcrypt - Password Security

### Why bcrypt?

**Problem:** We cannot store passwords in plain text in the database.
```
User password: "mypassword123"
Database stores: "mypassword123"  ❌ DANGEROUS!
If database is hacked, all passwords are exposed!
```

**Solution:** Hash passwords using bcrypt before storing.
```
User password: "mypassword123"
bcrypt hashes: "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
Database stores: "$2b$10$N9qo8uLOickgx2ZMRZoMye..."  ✅ SECURE!
Even if database is hacked, passwords are protected!
```

### What is bcrypt?

bcrypt is a password hashing function that:
- **Hashes passwords** - Converts password to encrypted string
- **Adds salt** - Makes each hash unique even for same password
- **Slow by design** - Prevents brute force attacks
- **One-way function** - Cannot reverse hash to get original password

### How bcrypt Works

#### Hashing Password (During Registration)
```javascript
const bcrypt = require('bcrypt');

// User registers with password
const plainPassword = "mypassword123";

// Hash the password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// Store hashed password in database
await User.create({
  username: 'john',
  password: hashedPassword  // $2b$10$N9qo8uLOickgx2ZMRZoMye...
});
```

**What happens:**
1. bcrypt generates a random salt
2. Combines salt with password
3. Hashes the combination
4. Returns hash that includes the salt
5. We store this hash in database

**Interview Point:**
> "When a user registers, we never store their plain password. We use bcrypt.hash() to create a hashed version. bcrypt automatically generates a random salt and includes it in the output. The same password will produce different hashes each time because of the unique salt. We store this hash in the database."

#### Verifying Password (During Login)
```javascript
// User tries to login with password
const loginPassword = "mypassword123";

// Get stored hash from database
const user = await User.findOne({ username: 'john' });
const storedHash = user.password;  // $2b$10$N9qo8uLOickgx2ZMRZoMye...

// Compare login password with stored hash
const isMatch = await bcrypt.compare(loginPassword, storedHash);

if (isMatch) {
  console.log('Password correct!');
} else {
  console.log('Password incorrect!');
}
```

**What happens:**
1. bcrypt extracts the salt from stored hash
2. Hashes the login password with same salt
3. Compares the two hashes
4. Returns true if they match, false otherwise

**Interview Point:**
> "During login, we use bcrypt.compare() to verify the password. We never decrypt the stored hash - that's impossible with bcrypt. Instead, bcrypt takes the login password, hashes it using the salt from the stored hash, and compares the results. If they match, the password is correct. This is secure because we never work with plain passwords after registration."

### Salt Rounds

```javascript
const saltRounds = 10;  // 2^10 = 1,024 iterations
```

**What it means:**
- Higher number = more secure but slower
- 10 rounds is default and recommended
- Each increase by 1 doubles the time

**Interview Point:**
> "Salt rounds determine how many times the hashing algorithm runs. With 10 rounds, it performs 2^10 = 1,024 iterations. This makes hashing slow, which is good for security because it prevents attackers from trying millions of passwords quickly. For login, the delay is acceptable (about 100ms), but for an attacker, trying billions of passwords becomes impractical."

### Complete bcrypt Implementation

```javascript
// Registration - Hash password before storing
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store hashed password in database
  await User.create({
    username,
    email,
    password: hashedPassword
  });
  
  res.status(201).json({ message: 'User registered successfully' });
};

// Login - Compare password with hash
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Find user and get password hash
  const user = await User.findOne({ username }).select('+password');
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Compare provided password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Password correct - generate JWT token
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '24h' });
  res.json({ token });
};
```

---

## When to Use What

### MVC Pattern

**Use MVC when:**
- Building large applications
- Need organized code structure
- Working in teams
- Application has complex business logic

**Example:**
> "For an e-commerce application with multiple features (user management, product catalog, orders, payments), MVC helps organize code. Models handle data (User, Product, Order), Views handle UI (product pages, checkout), and Controllers handle logic (processing orders, payment verification)."

### Authentication with JWT

**Use JWT Authentication when:**
- Building RESTful APIs
- Need stateless authentication
- Mobile app development
- Microservices architecture

**Example:**
> "For a mobile app that calls backend APIs, JWT is perfect. The app logs in once, gets a token, and includes it in all future requests. The server doesn't need to maintain sessions - it just verifies the token. This scales well because any server can verify the token."

### bcrypt for Passwords

**Always use bcrypt when:**
- Storing user passwords
- Any authentication system
- User registration and login

**Never do:**
- Store passwords in plain text
- Use simple hashing like MD5 or SHA-256 alone

**Example:**
> "For any application with user accounts - e-commerce, social media, banking - we must use bcrypt to hash passwords. Even if the database is compromised, hashed passwords are extremely difficult to crack. This is a fundamental security requirement, not optional."

---

## Interview Questions & Answers

### Basic Questions

#### Q1: What is MVC? Explain each component.

**Answer:**
> "MVC stands for Model-View-Controller. The Model represents data structure and handles database operations - it defines what fields our data has and provides methods to interact with the database. The View is the user interface - what users see and interact with, like forms and pages. The Controller is where request and response processing happens - it receives requests from the View, uses the Model to get or update data, and sends responses back. For example, in a login system: View is the login form, Model is the User data structure, and Controller handles the login logic."

#### Q2: How does the login API work step by step?

**Answer:**
> "First, the login API receives username and password in the request body. Second, it queries the database to find if that username exists. Third, it uses bcrypt to compare the provided password with the stored password hash. If credentials match, it generates a JWT token with a secret key and sets an expiration time, then sends the token in response with status 200. If credentials don't match, it sends an error message 'Invalid username or password' with status 400."

#### Q3: What is JWT and what are its three parts?

**Answer:**
> "JWT stands for JSON Web Token. It's used for authentication and is represented as an alphanumeric string. JWT has three parts separated by dots. First is the Header which specifies the algorithm and token type. Second is the Payload which contains the actual data like user ID, username, and role. Third is the Signature which is created by hashing the header and payload with a secret key - this ensures the token hasn't been tampered with. When we receive a token, we verify the signature to make sure it's valid."

#### Q4: Why do we use bcrypt for passwords?

**Answer:**
> "We use bcrypt because we cannot store passwords in plain text - if the database is hacked, all passwords would be exposed. bcrypt hashes passwords, which means it converts them to an encrypted string that cannot be reversed. It also adds a salt, which makes each hash unique even if two users have the same password. This prevents rainbow table attacks. Additionally, bcrypt is designed to be slow, which protects against brute force attacks where hackers try millions of passwords. It's a one-way function - we can't get the original password from the hash."

#### Q5: How do we secure an API with authentication?

**Answer:**
> "To secure an API, we use authentication middleware. When a request comes to a secured API, the middleware first checks if the request has a token in the Authorization header. If there's no token, it immediately responds with 'Please login first'. If a token exists, it verifies the token using jwt.verify() with our secret key. If the token is valid, the middleware allows the request to proceed to the actual API logic. If the token is invalid or expired, it sends an error response. This ensures only authenticated users with valid tokens can access protected resources."

### Intermediate Questions

#### Q6: Explain the complete authentication flow from login to accessing a secured API.

**Answer:**
> "First, the user enters credentials in the login form on the frontend. The frontend calls the login API with username and password in the request body. The Controller receives the request and uses the Model to find the user in the database. It then uses bcrypt to compare the provided password with the stored hash. If valid, the Controller generates a JWT token using jwt.sign() with a secret key and 24-hour expiration. The token is sent back to the frontend in the response. The frontend stores this token in localStorage and redirects the user to the dashboard. Now when the user tries to access a secured API, the frontend includes the token in the Authorization header as 'Bearer token'. The authentication middleware on the backend extracts the token, verifies it using jwt.verify(), and if valid, allows the request to proceed. If the token is missing or invalid, the middleware returns an error and the request is rejected."

#### Q7: How does JWT signature prevent tampering?

**Answer:**
> "The JWT signature is created by taking the encoded header and payload, combining them, and hashing with a secret key using the specified algorithm. This signature is appended as the third part of the JWT. When we receive a token, we verify it by recreating the signature - we take the header and payload from the received token, hash them with our secret key, and compare with the signature in the token. If someone tries to modify the payload, like changing their role from 'user' to 'admin', the signature won't match because they don't have the secret key to regenerate it. The verification will fail and we reject the token. This is why the secret key must be kept secure and never exposed."

#### Q8: Why do we use middleware for authentication instead of checking tokens in every route?

**Answer:**
> "Using middleware avoids code duplication and follows the DRY principle. If we checked tokens in every route, we'd repeat the same verification code dozens of times. With middleware, we write the authentication logic once and apply it to all secured routes. The middleware runs before the route handler, checking the token automatically. If the token is valid, it attaches user information to the request object and calls next() to proceed to the route handler. If invalid, it sends an error response immediately without executing the route logic. This makes code cleaner, more maintainable, and ensures consistent security across all protected routes. We just add 'authenticate' middleware to any route we want to secure."

#### Q9: What happens on the frontend after successful login?

**Answer:**
> "After the frontend calls the login API and receives a successful response, several things happen. First, it reads the response data which contains the JWT token. Second, it stores the token in localStorage using localStorage.setItem('authToken', token). We use localStorage because it persists across browser sessions, keeping the user logged in even if they close and reopen the browser. Third, it redirects the user to the dashboard or home page using window.location.href. From this point, whenever the user