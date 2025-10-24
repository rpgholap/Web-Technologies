# AJAX - Asynchronous JavaScript And XML

## 📋 Table of Contents
- [What is AJAX?](#what-is-ajax)
- [Why Use AJAX?](#why-use-ajax)
- [How AJAX Works](#how-ajax-works)
- [XMLHttpRequest States](#xmlhttprequest-states)
- [Complete Implementation](#complete-implementation)
- [Real-World Use Cases](#real-world-use-cases)
- [Modern Alternatives](#modern-alternatives)
- [Best Practices](#best-practices)

---

## What is AJAX?

**AJAX** stands for **Asynchronous JavaScript And XML**. It's a technique that allows web pages to communicate with servers and update content **without reloading the entire page**.

### Key Features:
- ✅ **Asynchronous** - Doesn't block other operations
- ✅ **No Page Reload** - Updates content dynamically
- ✅ **Better UX** - Faster, smoother user experience
- ✅ **Reduces Server Load** - Only fetches necessary data

---

## Why Use AJAX?

### Traditional Web Request (Without AJAX):
```
User clicks → Page reload → White screen → New page loads → Data displayed
❌ Poor user experience
❌ Entire page reloads
❌ All resources downloaded again
```

### AJAX Request:
```
User clicks → Request sent in background → Page stays interactive → Data updates
✅ No page reload
✅ User can continue working
✅ Only necessary data fetched
```

---

## How AJAX Works

### The 3-Step Process

```javascript
// Step 1: Create XMLHttpRequest object
// This object is responsible for making HTTP requests to the server
var xhr = new XMLHttpRequest();

// Step 2: Initialize/Open the request
// Parameters: method (GET/POST/etc.), URL (where to send request), async (true = asynchronous)
xhr.open('GET', 'https://api.example.com/data', true);

// Step 3: Send the request
// For GET requests, send() has no parameters
// For POST requests, we pass data in send()
xhr.send();
```

---

## XMLHttpRequest States

Every AJAX request goes through **5 states** tracked by `readyState`:

| State | Value | Description | What's Happening |
|-------|-------|-------------|------------------|
| **UNSENT** | 0 | XMLHttpRequest object created | `new XMLHttpRequest()` called |
| **OPENED** | 1 | Request initialized | `open()` method called |
| **HEADERS_RECEIVED** | 2 | Request sent | `send()` called, headers received |
| **LOADING** | 3 | Processing | Server processing, partial data may be available |
| **DONE** | 4 | Complete | Response ready at client side |

### Monitoring States

```javascript
// This function is called every time the readyState changes
xhr.onreadystatechange = function() {
    // Log current state to console for debugging
    console.log('Current State: ' + xhr.readyState);
    
    // Check if request is complete (readyState 4 means DONE)
    if (xhr.readyState === 4) {
        console.log('Request complete!');
    }
};
```

---

## Complete Implementation

### Example 1: Basic GET Request

```javascript
/**
 * Function to fetch student data from server
 * This demonstrates a complete AJAX GET request with all steps
 */
function fetchStudentData() {
    // STEP 1: Create XMLHttpRequest object
    // This is the core object that handles all AJAX operations
    var xhr = new XMLHttpRequest();
    
    // STEP 2: Configure the request
    // open(method, url, async)
    // - 'GET' = we're requesting data (not sending)
    // - URL = where the data is located on the server
    // - true = asynchronous (don't freeze the browser while waiting)
    xhr.open('GET', 'https://api.example.com/student/1100', true);
    
    // STEP 3: Set up state change handler
    // This function runs every time readyState changes (0→1→2→3→4)
    xhr.onreadystatechange = function() {
        // Log both readyState and HTTP status for debugging
        console.log('ReadyState: ' + xhr.readyState + ', Status: ' + xhr.status);
        
        // STEP 4: Check if request is complete and successful
        // readyState 4 = request complete
        if (xhr.readyState === 4) {
            // status 200 = HTTP OK (success)
            if (xhr.status === 200) {
                // Success! Parse the JSON response text into a JavaScript object
                var response = JSON.parse(xhr.responseText);
                
                // Log the student name from the response
                console.log('Student Name:', response.name);
                
                // Call function to display student data on the page
                displayStudent(response);
            } else {
                // Something went wrong - log the error
                // status could be 404 (not found), 500 (server error), etc.
                console.error('Error:', xhr.status, xhr.statusText);
            }
        }
    };
    
    // STEP 5: Send the request to the server
    // For GET requests, we don't pass any data
    xhr.send();
}

/**
 * Function to display student information on the webpage
 * @param {Object} student - Student object containing id, name, phone
 */
function displayStudent(student) {
    // Find the HTML element with id 'studentInfo' and update its content
    document.getElementById('studentInfo').innerHTML = `
        <h3>Student Details</h3>
        <p>ID: ${student.id}</p>
        <p>Name: ${student.name}</p>
        <p>Phone: ${student.phone}</p>
    `;
}
```

### Example 2: POST Request (Sending Data)

```javascript
/**
 * Function to create a new student by sending data to server
 * @param {Object} studentData - Object containing student information
 */
function createStudent(studentData) {
    // Step 1: Create new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Step 2: Initialize POST request
    // POST is used when we're sending data to create/update resources
    xhr.open('POST', 'https://api.example.com/students', true);
    
    // Step 3: Set request headers
    // Tell the server we're sending JSON format data
    // This is IMPORTANT - server needs to know how to parse the data
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Step 4: Set up response handler
    xhr.onreadystatechange = function() {
        // Wait for request to complete
        if (xhr.readyState === 4) {
            // Status 201 = Created (resource successfully created)
            if (xhr.status === 201) {
                console.log('Student created successfully!');
                
                // Parse the response to get the newly created student data
                var newStudent = JSON.parse(xhr.responseText);
                
                // Server usually returns the new ID it assigned
                console.log('New Student ID:', newStudent.id);
            } else {
                // Failed to create student - log error
                console.error('Failed to create student');
            }
        }
    };
    
    // Step 5: Convert JavaScript object to JSON string
    // Server expects JSON format, but we have a JS object
    var jsonData = JSON.stringify(studentData);
    
    // Step 6: Send the request with data
    // Unlike GET, POST sends data in the body
    xhr.send(jsonData);
}

// Example Usage:
// Create an object with student information
createStudent({
    name: 'Rohan',
    phone: '888881111',
    course: 'Computer Science'
});
```

### Example 3: Complete Error Handling

```javascript
/**
 * Generic AJAX request function with comprehensive error handling
 * Returns a Promise for cleaner async code
 * 
 * @param {string} url - The API endpoint URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Data to send (optional, for POST/PUT)
 * @returns {Promise} Resolves with response data or rejects with error
 */
function makeAjaxRequest(url, method, data) {
    // Return a Promise to handle async operations cleanly
    return new Promise((resolve, reject) => {
        // Step 1: Create XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        
        // Step 2: Initialize request
        xhr.open(method, url, true);
        
        // Set content type header for JSON data
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        // Set timeout to prevent hanging requests
        // Request will fail if it takes longer than 10 seconds
        xhr.timeout = 10000; // 10 seconds in milliseconds
        
        // Step 3: Handle state changes
        xhr.onreadystatechange = function() {
            // Only process when request is complete
            if (xhr.readyState === 4) {
                // Check if status is in success range (200-299)
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Success! Parse JSON and resolve promise
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // HTTP error - reject with status info
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            }
        };
        
        // Handle network errors (no internet, DNS failure, etc.)
        xhr.onerror = function() {
            reject(new Error('Network Error: Could not connect to server'));
        };
        
        // Handle timeout errors (request took too long)
        xhr.ontimeout = function() {
            reject(new Error('Request Timeout: Server took too long to respond'));
        };
        
        // Step 4: Send request
        // If data exists, convert to JSON and send; otherwise send null
        xhr.send(data ? JSON.stringify(data) : null);
    });
}

// Example Usage with Promise handling:
makeAjaxRequest('https://api.example.com/students', 'GET')
    .then(data => {
        // This runs when request succeeds
        console.log('Success:', data);
    })
    .catch(error => {
        // This runs when request fails
        console.error('Error:', error);
    });
```

---

## Real-World Use Cases

### 1. **Form Submission Without Page Reload**
```javascript
/**
 * Handle login form submission with AJAX
 * Prevents default form behavior and uses AJAX instead
 */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    // Prevent default form submission (which would reload page)
    e.preventDefault();
    
    // Create XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Initialize POST request to login endpoint
    xhr.open('POST', '/api/login', true);
    
    // Set content type to JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Handle response
    xhr.onreadystatechange = function() {
        // Check if request is complete and successful
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse server response
            var response = JSON.parse(xhr.responseText);
            
            // Check if login was successful
            if (response.success) {
                // Redirect to dashboard on success
                window.location.href = '/dashboard';
            } else {
                // Show error message to user
                document.getElementById('error').innerText = 'Invalid credentials';
            }
        }
    };
    
    // Gather form data into an object
    var credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    
    // Send credentials as JSON
    xhr.send(JSON.stringify(credentials));
});
```

### 2. **Live Search (Autocomplete)**
```javascript
// Get references to search input and results container
var searchInput = document.getElementById('search');
var resultsDiv = document.getElementById('results');

/**
 * Perform live search as user types
 * Sends AJAX request on every input change
 */
searchInput.addEventListener('input', function() {
    // Get the current search query
    var query = this.value;
    
    // Only search if user has typed at least 3 characters
    // This reduces unnecessary server requests
    if (query.length < 3) {
        resultsDiv.innerHTML = ''; // Clear results
        return; // Exit function
    }
    
    // Create new AJAX request
    var xhr = new XMLHttpRequest();
    
    // Build URL with query parameter
    // encodeURIComponent prevents issues with special characters
    xhr.open('GET', '/api/search?q=' + encodeURIComponent(query), true);
    
    // Handle response
    xhr.onreadystatechange = function() {
        // When request completes successfully
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse results array from JSON
            var results = JSON.parse(xhr.responseText);
            
            // Display results on page
            displayResults(results);
        }
    };
    
    // Send the search request
    xhr.send();
});

/**
 * Display search results in the DOM
 * @param {Array} results - Array of result objects
 */
function displayResults(results) {
    // Map each result to HTML and join into single string
    resultsDiv.innerHTML = results.map(item => 
        `<div class="result-item">${item.name}</div>`
    ).join('');
}
```

### 3. **Loading More Content (Infinite Scroll)**
```javascript
/**
 * Implement infinite scroll functionality
 * Loads more content when user scrolls near bottom
 */
window.addEventListener('scroll', function() {
    // Calculate if user is near bottom of page
    // innerHeight = viewport height
    // scrollY = how far user has scrolled
    // offsetHeight = total page height
    // 100 = trigger when 100px from bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        // User is near bottom - load more content
        loadMoreContent();
    }
});

// Track current page number
var currentPage = 1;

// Flag to prevent multiple simultaneous requests
var loading = false;

/**
 * Load next page of content from server
 */
function loadMoreContent() {
    // If already loading, don't make another request
    if (loading) return;
    
    // Set loading flag to true
    loading = true;
    
    // Create AJAX request
    var xhr = new XMLHttpRequest();
    
    // Request next page of posts
    xhr.open('GET', '/api/posts?page=' + currentPage, true);
    
    // Handle response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse posts array from response
            var posts = JSON.parse(xhr.responseText);
            
            // Add new posts to page
            appendPosts(posts);
            
            // Increment page number for next request
            currentPage++;
            
            // Reset loading flag - ready for next request
            loading = false;
        }
    };
    
    // Send request
    xhr.send();
}
```

### 4. **Real-Time Notifications**
```javascript
/**
 * Check for new notifications from server
 * Called periodically to keep notifications updated
 */
function checkNotifications() {
    // Create AJAX request
    var xhr = new XMLHttpRequest();
    
    // Request unread notifications
    xhr.open('GET', '/api/notifications/unread', true);
    
    // Handle response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse notifications array
            var notifications = JSON.parse(xhr.responseText);
            
            // Update notification badge with count
            updateNotificationBadge(notifications.length);
        }
    };
    
    // Send request
    xhr.send();
}

// Set up interval to check notifications every 30 seconds
// 30000 milliseconds = 30 seconds
setInterval(checkNotifications, 30000);

// Also check immediately when page loads
checkNotifications();
```

### 5. **File Upload with Progress**
```javascript
/**
 * Upload file with progress tracking
 * Shows upload progress bar as file uploads
 * 
 * @param {File} file - File object from input element
 */
function uploadFile(file) {
    // Create XMLHttpRequest for upload
    var xhr = new XMLHttpRequest();
    
    // Create FormData to send file
    // FormData is used for multipart/form-data (file uploads)
    var formData = new FormData();
    
    // Add file to form data with key 'file'
    formData.append('file', file);
    
    // Track upload progress
    xhr.upload.addEventListener('progress', function(e) {
        // Check if we can calculate progress
        if (e.lengthComputable) {
            // Calculate percentage: (bytes uploaded / total bytes) * 100
            var percentComplete = (e.loaded / e.total) * 100;
            
            // Update progress bar width
            document.getElementById('progress').style.width = percentComplete + '%';
            
            // Optionally show percentage text
            document.getElementById('progressText').innerText = 
                Math.round(percentComplete) + '%';
        }
    });
    
    // Handle upload completion
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Upload successful
                console.log('Upload complete!');
                
                // Parse response to get file info
                var response = JSON.parse(xhr.responseText);
                console.log('File URL:', response.url);
            } else {
                // Upload failed
                console.error('Upload failed with status:', xhr.status);
            }
        }
    };
    
    // Initialize POST request to upload endpoint
    xhr.open('POST', '/api/upload', true);
    
    // Send file data
    // Note: Don't set Content-Type header - browser sets it automatically for FormData
    xhr.send(formData);
}

// Example: Handle file input change
document.getElementById('fileInput').addEventListener('change', function(e) {
    // Get the selected file
    var file = e.target.files[0];
    
    // Check if file exists
    if (file) {
        // Start upload
        uploadFile(file);
    }
});
```

---

## Modern Alternatives

While XMLHttpRequest is still widely used, modern alternatives provide cleaner syntax:

### Fetch API (Modern Approach)
```javascript
/**
 * Fetch API - Modern replacement for XMLHttpRequest
 * Cleaner syntax using Promises
 */

// GET Request Example
fetch('https://api.example.com/students')
    .then(response => {
        // First, check if response is OK (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        // Parse JSON from response
        return response.json();
    })
    .then(data => {
        // Use the data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred
        console.error('Error:', error);
    });

// POST Request Example
fetch('https://api.example.com/students', {
    method: 'POST', // Specify HTTP method
    headers: {
        'Content-Type': 'application/json' // Tell server we're sending JSON
    },
    body: JSON.stringify({ // Convert JS object to JSON string
        name: 'Rohan',
        phone: '888881111'
    })
})
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Async/Await (Cleanest Syntax)
```javascript
/**
 * Async/Await - Most modern and readable approach
 * Makes asynchronous code look synchronous
 * 
 * @param {number} id - Student ID to fetch
 * @returns {Promise<Object>} Student data
 */
async function fetchStudent(id) {
    try {
        // 'await' pauses execution until promise resolves
        // Makes code easier to read and understand
        const response = await fetch(`https://api.example.com/students/${id}`);
        
        // Check if request was successful
        if (!response.ok) {
            // Throw error if something went wrong
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON from response
        const student = await response.json();
        
        // Log and return student data
        console.log(student);
        return student;
        
    } catch (error) {
        // Catch any errors that occurred during fetch or parsing
        console.error('Error fetching student:', error);
        
        // Optionally show error to user
        alert('Failed to load student data. Please try again.');
    }
}

// Example usage:
// Call the async function (returns a Promise)
fetchStudent(1100);

// Or use with await in another async function:
async function displayStudentInfo() {
    const student = await fetchStudent(1100);
    if (student) {
        document.getElementById('name').textContent = student.name;
    }
}
```

---

## Best Practices

### ✅ DO:

#### 1. **Always handle errors**
```javascript
// Create request
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data', true);

// Handle network errors (connection issues)
xhr.onerror = function() {
    console.error('Network error - could not reach server');
    // Show user-friendly message
    alert('Connection error. Please check your internet.');
};

// Handle timeout errors
xhr.ontimeout = function() {
    console.error('Request timed out');
    alert('Request is taking too long. Please try again.');
};

// Handle HTTP errors in response
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Success
        } else {
            // HTTP error (404, 500, etc.)
            console.error('HTTP Error:', xhr.status);
        }
    }
};

xhr.send();
```

#### 2. **Set appropriate timeouts**
```javascript
// Create request
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/large-data', true);

// Set timeout to 5 seconds (5000 milliseconds)
// Prevents request from hanging forever
xhr.timeout = 5000;

// Handle timeout
xhr.ontimeout = function() {
    console.error('Request timed out after 5 seconds');
};

xhr.send();
```

#### 3. **Use HTTPS for secure data**
```javascript
// BAD: HTTP is not secure - data can be intercepted
xhr.open('POST', 'http://api.example.com/login', true);

// GOOD: HTTPS encrypts data in transit
xhr.open('POST', 'https://api.example.com/login', true);

// This is especially important for:
// - Passwords
// - Personal information
// - Payment details
// - Any sensitive data
```

#### 4. **Validate and sanitize data**
```javascript
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        try {
            // Try to parse JSON
            var data = JSON.parse(xhr.responseText);
            
            // Validate data structure
            if (data && data.name && data.email) {
                // Data is valid - use it
                displayUserData(data);
            } else {
                // Data structure is wrong
                console.error('Invalid data structure');
            }
            
        } catch (e) {
            // JSON parsing failed
            console.error('Invalid JSON received:', e);
        }
    }
};
```

#### 5. **Show loading indicators**
```javascript
/**
 * Load data with visual feedback
 * Improves user experience by showing progress
 */
function loadData() {
    // Show loading spinner before request starts
    document.getElementById('loader').style.display = 'block';
    
    // Optionally disable button to prevent multiple clicks
    document.getElementById('loadButton').disabled = true;
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/data', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // Request complete - hide loader
            document.getElementById('loader').style.display = 'none';
            
            // Re-enable button
            document.getElementById('loadButton').disabled = false;
            
            if (xhr.status === 200) {
                // Display data
                var data = JSON.parse(xhr.responseText);
                displayData(data);
            } else {
                // Show error message
                alert('Failed to load data');
            }
        }
    };
    
    xhr.send();
}
```

### ❌ DON'T:

#### 1. **Don't make synchronous requests (blocks UI)**
```javascript
// ❌ BAD: Synchronous request (third parameter is false)
// This FREEZES the entire browser until response arrives
// User can't click, scroll, or do anything!
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data', false); // false = synchronous
xhr.send();
var data = JSON.parse(xhr.responseText);

// ✅ GOOD: Asynchronous request (third parameter is true)
// Browser remains responsive while waiting
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data', true); // true = asynchronous
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        // Use data here
    }
};
xhr.send();
```

#### 2. **Don't ignore HTTP status codes**
```javascript
// ❌ BAD: Only checks readyState, ignores status
// Will try to parse even if request failed!
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        // This runs even for 404, 500, etc.
        var data = JSON.parse(xhr.responseText); // Might crash!
    }
};

// ✅ GOOD: Check both readyState AND status
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Only parse if request was successful
            var data = JSON.parse(xhr.responseText);
        } else {
            // Handle errors appropriately
            console.error('Request failed with status:', xhr.status);
        }
    }
};
```

#### 3. **Don't send sensitive data in GET requests**
```javascript
// ❌ BAD: Password visible in URL
// - Appears in browser history
// - Logged in server logs
// - Visible in network tab
xhr.open('GET', '/api/login?username=john&password=12345', true);
xhr.send();

// ✅ GOOD: Send sensitive data in POST body
xhr.open('POST', '/api/login', true);
xhr.setRequestHeader('Content-Type', 'application/json');

// Data is encrypted if using HTTPS
var credentials = {
    username: 'john',
    password: '12345'
};
xhr.send(JSON.stringify(credentials));

// Remember:
// - GET: For retrieving data (search, filter, read)
// - POST: For sending data (create, login, submit)
```

#### 4. **Don't forget to handle edge cases**
```javascript
// ✅ GOOD: Comprehensive error handling
function fetchData(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    // Set timeout
    xhr.timeout = 10000;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    // Handle empty response
                    if (!xhr.responseText) {
                        console.error('Empty response received');
                        return;
                    }
                    
                    var data = JSON.parse(xhr.responseText);
                    
                    // Handle empty data array
                    if (Array.isArray(data) && data.length === 0) {
                        console.log('No data available');
                        showEmptyState();
                        return;
                    }
                    
                    // Success - process data
                    processData(data);
                    
                } catch (e) {
                    console.error('JSON parse error:', e);
                }
            } else if (xhr.status === 404) {
                console.error('Resource not found');
            } else if (xhr.status === 500) {
                console.error('Server error');
            } else {
                console.error('Request failed:', xhr.status);
            }
        }
    };
    
    // Handle network errors
    xhr.onerror = function() {
        console.error('Network error');
    };
    
    // Handle timeout
    xhr.ontimeout = function() {
        console.error('Request timeout');
    };
    
    xhr.send();
}
```

---

## Benefits in Real-Time Projects

| Scenario | Without AJAX | With AJAX |
|----------|-------------|-----------|
| **Form Submission** | Page reloads, user loses scroll position | Instant feedback, no reload |
| **Search** | New page load for each search | Real-time results as you type |
| **Notifications** | Manual page refresh needed | Automatic background updates |
| **Shopping Cart** | Page reload to add items | Smooth addition with animation |
| **Comments** | Full page reload to post | Instant comment posting |

---


### HTTP Status Codes
```javascript
// Success Codes (2xx)
200 // OK - Request successful
201 // Created - New resource created
204 // No Content - Success but no data to return

// Client Error Codes (4xx)
400 // Bad Request - Invalid data sent
401 // Unauthorized - Login required
403 // Forbidden - Not allowed to access
404 // Not Found - Resource doesn't exist

// Server Error Codes (5xx)
500 // Internal Server Error - Server crashed
502 // Bad Gateway - Server got invalid response
503 // Service Unavailable - Server temporarily down
```

### Common HTTP Methods
```javascript
// GET - Retrieve data (no body)
xhr.open('GET', '/api/users', true);
xhr.send();

// POST - Create new resource (with body)
xhr.open('POST', '/api/users', true);
xhr.send(JSON.stringify({name: 'John'}));

// PUT - Update entire resource (with body)
xhr.open('PUT', '/api/users/123', true);
xhr.send(JSON.stringify({name: 'John', email: 'john@example.com'}));

// PATCH - Partial update (with body)
xhr.open('PATCH', '/api/users/123', true);
xhr.send(JSON.stringify({name: 'John'})); // Only update name

// DELETE - Remove resource (no body)
xhr.open('DELETE', '/api/users/123', true);
xhr.send();
```

---

## Summary

AJAX revolutionized web development by enabling:
- 🚀 **Faster, smoother user experiences**
- 💰 **Reduced server load and bandwidth**
- 📱 **App-like behavior in web pages**
- ⚡ **Real-time updates without page reloads**

--- 
