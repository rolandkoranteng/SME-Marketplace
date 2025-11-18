// DOM Elements
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
