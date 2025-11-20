/*// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle between Login and Signup forms
loginBtn.addEventListener('click', () => {
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// Hamburger menu toggle for mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the data to your server
    console.log('Login Data:', {
        email,
        password,
        rememberMe
    });
    
    alert('Login successful! (This is a demo)');
    
    // Reset form
    loginForm.reset();
});

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Terms agreement validation
    if (!agreeTerms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }
    
    // Here you would typically send the data to your server
    console.log('Signup Data:', {
        name,
        email,
        password
    });
    
    alert('Account created successfully! (This is a demo)');
    
    // Reset form and switch to login
    signupForm.reset();
    loginBtn.click();
});

// Google Sign In (placeholder)
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Google Sign In would be implemented here');
        console.log('Google Sign In clicked');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

 // A simple JS effect (you can expand later)
    const cards = document.querySelectorAll(".benefit-card");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => card.style.boxShadow = "0 10px 25px rgba(0,128,0,0.2)");
      card.addEventListener("mouseleave", () => card.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)");
    });
*/

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// ========== LOCAL STORAGE HELPER FUNCTIONS ==========

// Get all vendors from localStorage
function getAllVendors() {
    const vendors = localStorage.getItem('vendors');
    return vendors ? JSON.parse(vendors) : [];
}

// Save vendors array to localStorage
function saveVendors(vendors) {
    localStorage.setItem('vendors', JSON.stringify(vendors));
}

// Get currently logged in vendor
function getCurrentVendor() {
    const currentVendor = localStorage.getItem('currentVendor');
    return currentVendor ? JSON.parse(currentVendor) : null;
}

// Set current vendor
function setCurrentVendor(vendor) {
    localStorage.setItem('currentVendor', JSON.stringify(vendor));
}

// Clear current vendor (logout)
function clearCurrentVendor() {
    localStorage.removeItem('currentVendor');
}

// Check if email already exists
function emailExists(email) {
    const vendors = getAllVendors();
    return vendors.some(vendor => vendor.email === email);
}

// Find vendor by email and password
function findVendor(email, password) {
    const vendors = getAllVendors();
    return vendors.find(vendor => vendor.email === email && vendor.password === password);
}

// Create initial vendor data structure
function createVendorData(name, email, password) {
    return {
        id: Date.now(), // Simple unique ID using timestamp
        name: name,
        email: email,
        password: password, // In production, NEVER store plain passwords!
        businessName: name + "'s Store",
        joinDate: new Date().toISOString(),
        // Dashboard metrics
        totalSales: 0,
        totalRevenue: 0,
        totalProfit: 0,
        totalOrders: 0,
        activeProducts: 0,
        completedOrders: 0,
        pendingOrders: 0,
        // Sample sales data for charts
        salesData: [
            { month: 'Jan', sales: 0 },
            { month: 'Feb', sales: 0 },
            { month: 'Mar', sales: 0 },
            { month: 'Apr', sales: 0 },
            { month: 'May', sales: 0 },
            { month: 'Jun', sales: 0 }
        ],
        // Recent orders
        recentOrders: [],
        // Top products
        topProducts: []
    };
}

// ========== FORM TOGGLE FUNCTIONALITY ==========

loginBtn.addEventListener('click', () => {
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// ========== MOBILE MENU FUNCTIONALITY ==========

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== LOGIN FORM SUBMISSION ==========

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Find vendor in localStorage
    const vendor = findVendor(email, password);
    
    if (vendor) {
        // Login successful
        setCurrentVendor(vendor);
        
        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        alert('Login successful! Redirecting to your dashboard...');
        
        // Redirect to vendor dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
    
    // Reset form
    loginForm.reset();
});

// ========== SIGNUP FORM SUBMISSION ==========

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Terms agreement validation
    if (!agreeTerms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }
    
    // Check if email already exists
    if (emailExists(email)) {
        alert('An account with this email already exists. Please login instead.');
        return;
    }
    
    // Create new vendor
    const newVendor = createVendorData(name, email, password);
    
    // Get existing vendors and add new one
    const vendors = getAllVendors();
    vendors.push(newVendor);
    saveVendors(vendors);
    
    // Auto-login the new vendor
    setCurrentVendor(newVendor);
    
    alert('Account created successfully! Redirecting to your dashboard...');
    
    // Redirect to vendor dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
    
    // Reset form
    signupForm.reset();
});

// ========== GOOGLE SIGN IN (PLACEHOLDER) ==========

const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Google Sign In would be implemented here with OAuth 2.0');
        console.log('Google Sign In clicked');
    });
});

// ========== SMOOTH SCROLL BEHAVIOR ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== BENEFIT CARDS HOVER EFFECT ==========

const cards = document.querySelectorAll(".benefit-card");
cards.forEach(card => {
    card.addEventListener("mouseenter", () => card.style.boxShadow = "0 10px 25px rgba(0,128,0,0.2)");
    card.addEventListener("mouseleave", () => card.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)");
});

// ========== CHECK IF ALREADY LOGGED IN ==========

// If user is already logged in, show option to go to dashboard
window.addEventListener('DOMContentLoaded', () => {
    const currentVendor = getCurrentVendor();
    if (currentVendor) {
        // Optional: Show a notification that they're already logged in
        console.log('Vendor already logged in:', currentVendor.name);
        // You could add a banner here saying "Already logged in as [name]. Go to Dashboard"
    }
});