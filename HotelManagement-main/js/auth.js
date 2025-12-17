// ===================================
// Authentication JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname;
    
    if (currentUser && (currentPage.includes('login.html') || currentPage.includes('signup.html'))) {
        window.location.href = 'dashboard.html';
    }

    initializeLoginForm();
    initializeSignupForm();
    initializePasswordToggle();
});

// ===================================
// Login Form
// ===================================
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validate inputs
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error', 'loginAlert');
                return;
            }

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
            
            // Check demo credentials
            if (email === 'demo@grandhotel.com' && password === 'demo123') {
                const demoUser = {
                    email: 'demo@grandhotel.com',
                    firstName: 'Demo',
                    lastName: 'User',
                    phone: '+1 (555) 123-4567',
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('currentUser', JSON.stringify(demoUser));
                showAlert('Login successful! Redirecting...', 'success', 'loginAlert');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                return;
            }

            // Check registered users
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Remove password from stored user object
                const userToStore = { ...user };
                delete userToStore.password;
                userToStore.loginTime = new Date().toISOString();
                
                localStorage.setItem('currentUser', JSON.stringify(userToStore));
                showAlert('Login successful! Redirecting...', 'success', 'loginAlert');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showAlert('Invalid email or password. Try demo credentials.', 'error', 'loginAlert');
            }
        });
    }
}

// ===================================
// Signup Form
// ===================================
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate inputs
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error', 'signupAlert');
                return;
            }

            if (!terms) {
                showAlert('Please agree to the Terms & Conditions', 'error', 'signupAlert');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long', 'error', 'signupAlert');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error', 'signupAlert');
                return;
            }

            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
            
            if (users.some(u => u.email === email)) {
                showAlert('Email already registered. Please login.', 'error', 'signupAlert');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                firstName,
                lastName,
                email,
                phone,
                password,
                createdAt: new Date().toISOString()
            };

            // Save to localStorage
            users.push(newUser);
            localStorage.setItem('hotelUsers', JSON.stringify(users));

            // Auto login
            const userToStore = { ...newUser };
            delete userToStore.password;
            userToStore.loginTime = new Date().toISOString();
            
            localStorage.setItem('currentUser', JSON.stringify(userToStore));

            showAlert('Account created successfully! Redirecting...', 'success', 'signupAlert');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
}

// ===================================
// Password Toggle
// ===================================
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling || this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// ===================================
// Show Alert
// ===================================
function showAlert(message, type, alertId) {
    const alertElement = document.getElementById(alertId);
    
    if (alertElement) {
        alertElement.textContent = message;
        alertElement.className = `alert alert-${type}`;
        alertElement.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// Social Login (Demo)
// ===================================
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
        alert(`${provider} login is not implemented in this demo. Please use the email login form.`);
    });
});

// ===================================
// Forgot Password (Demo)
// ===================================
document.querySelectorAll('.forgot-password').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email address:');
        if (email) {
            alert('A password reset link has been sent to ' + email);
        }
    });
});

