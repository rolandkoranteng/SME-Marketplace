
SME Marketplace - Project Documentation
Table of Contents

    Project Overview
    Features
    Technology Stack
    Project Structure
    System Architecture
    Page Descriptions
    Key Functionalities
    Installation & Setup
    Usage Guide
    Code Documentation
    Future Enhancements
    Known Issues & Limitations

Project Overview

SME Marketplace is a comprehensive e-commerce platform designed to empower small and medium enterprises (SMEs) in Ghana. The platform connects local vendors with customers, enabling them to showcase and sell their products online with integrated Mobile Money (MoMo) payment support.
Project Goals

    Support local businesses in Ghana through digital transformation
    Provide an easy-to-use platform for SMEs to sell products online
    Connect customers with authentic local products and services
    Enable secure and convenient payment through Mobile Money

Target Audience

    Vendors: Small business owners, farmers, artisans, and entrepreneurs
    Customers: Local shoppers looking for authentic products from trusted vendors

Features
For Customers

    ✅ Browse products across 16+ categories
    ✅ Search and filter products by name or vendor
    ✅ Add products to shopping cart
    ✅ View cart with quantity management
    ✅ Secure checkout process
    ✅ Responsive design for mobile and desktop
    ✅ Product ratings and vendor information

For Vendors

    ✅ Vendor registration and authentication
    ✅ Comprehensive dashboard with analytics
    ✅ Sales tracking and revenue metrics
    ✅ Order management system
    ✅ Product management capabilities
    ✅ Business performance charts

General Features

    ✅ Fully responsive design
    ✅ Local storage for cart persistence
    ✅ User authentication system
    ✅ Mobile-first approach
    ✅ Fast and lightweight

Technology Stack
Frontend

    HTML5: Semantic markup and structure
    CSS3: Styling with modern features (Grid, Flexbox, animations)
    JavaScript (ES6+): Client-side functionality and DOM manipulation

Libraries & Frameworks

    Font Awesome 6.5.0: Icons and visual elements
    Chart.js: Data visualization for vendor dashboard
    Google Fonts (Poppins): Typography

Data Storage

    localStorage: Client-side data persistence for cart and user sessions

Design Approach

    Mobile-first responsive design
    CSS Grid and Flexbox layouts
    Custom CSS animations
    No backend dependency (static site)

Project Structure

sme-marketplace/
│
├── index.html              # Landing/home page
├── styles.css              # Home page styles
├── script.js               # Home page scripts
│
├── products.html           # Products catalog page
├── products.css            # Products page styles
├── products.js             # Products page functionality
│
├── cart.html               # Shopping cart page
│
├── login.html              # Authentication page
├── login.css               # Login/signup page styles
├── login.js                # Authentication logic
│
├── dashboard.html          # Vendor dashboard
├── dashboard.css           # Dashboard styles
├── dashboard.js            # Dashboard functionality
│
└── README.md               # Project documentation

System Architecture
Data Flow

User Action → JavaScript Event Handler → localStorage/Session Management → UI Update

Key Components

    Authentication System
        User registration and login
        Session management via localStorage
        Vendor profile creation
    Product Catalog
        Category-based organization
        Search and filter functionality
        Pagination ("Show More/Less")
    Shopping Cart
        Add/remove items
        Quantity management
        Price calculation with tax and shipping
    Vendor Dashboard
        Sales analytics
        Order tracking
        Revenue visualization

Page Descriptions
1. Home Page (index.html)

Purpose: Landing page introducing the platform

Key Sections:

    Hero section with call-to-action
    About SME Marketplace
    Mission & Vision
    What to Expect
    Product categories overview
    Customer testimonials
    Authentication prompts
    Footer with contact information

Features:

    Responsive navigation with hamburger menu
    Smooth scrolling
    Category quick links
    Social media integration

2. Products Page (products.html)

Purpose: Browse and purchase products

Key Sections:

    Fixed navigation with search bar
    Category filters (16 categories)
    Product grid with cards
    "Show More/Less" pagination per category

Product Categories:

    Electronics
    Fashion
    Home & Living
    Arts & Crafts
    Food & Beverages
    Groceries
    Pet Products
    Books
    Sports
    Furniture
    Beauty
    Baby Products
    Jewelry
    Automotive (coming soon)
    Tools & Equipment (coming soon)
    Other

Product Card Information:

    Product image
    Product name
    Vendor name
    Star rating
    Price (in GH₵)
    "Add to Cart" button

3. Shopping Cart Page (cart.html)

Purpose: Review and manage cart items

Features:

    Empty cart state with call-to-action
    Cart items list with:
        Product image
        Name and price
        Quantity controls (+/-)
        Remove button
        Item total
    Order summary with:
        Subtotal
        Shipping cost
        Tax calculation (12.5%)
        Promo code input
        Total amount
    Secure checkout button
    Toast notifications for actions

Price Calculations:
javascript

Subtotal = Sum of (price × quantity) for all items
Shipping = ₵10.00 (flat rate)
Tax = Subtotal × 0.125
Total = Subtotal + Shipping + Tax

4. Login/Signup Page (login.html)

Purpose: User authentication

Features:

    Toggle between Login and Signup forms
    Form validation
    Remember me option
    Forgot password link
    Google Sign-In placeholder
    Benefits section
    Terms & Conditions checkbox

Login Form Fields:

    Email
    Password
    Remember me checkbox

Signup Form Fields:

    Full Name
    Email
    Password
    Confirm Password
    Terms agreement

5. Vendor Dashboard (dashboard.html)

Purpose: Vendor business management

Key Sections:

    Sidebar Navigation
        Vendor profile display
        Navigation links (Overview, Products, Orders, Analytics, Settings)
    Overview Section
        Welcome message with current date
        Stats cards:
            Total Revenue
            Total Profit
            Total Orders
            Active Products
    Sales Chart
        Line chart showing 6-month sales trend
        Interactive tooltips
        Period selector
    Recent Orders
        Order ID
        Customer name
        Date and time
        Order amount
        Status (Completed/Pending/Processing)
    Top Products
        Product name and image
        Price
        Units sold
    Quick Actions
        Add New Product
        Create Promotion
        Announce Sale
        Download Report
    Account Information
        Business name
        Join date
        Account status

Key Functionalities
1. Cart Management

Location: products.js, cart.html
javascript

// Cart structure
cart = [
  {
    name: "Product Name",
    price: 100.00,
    quantity: 2,
    image: "image-url.jpg"
  }
]

Key Functions:

    updateCartCount(): Updates cart badge
    addToCart(): Adds item to cart
    changeQuantity(): Increases/decreases quantity
    removeItem(): Removes item from cart

Storage: Uses localStorage.setItem('cart', JSON.stringify(cart))
2. User Authentication

Location: login.js

Vendor Data Structure:
javascript

{
  id: timestamp,
  name: "Vendor Name",
  email: "vendor@email.com",
  password: "password", // Plain text (not production-ready)
  businessName: "Business Name",
  joinDate: "ISO date string",
  totalRevenue: 0,
  totalProfit: 0,
  totalOrders: 0,
  activeProducts: 0,
  salesData: [...],
  recentOrders: [...],
  topProducts: [...]
}

Key Functions:

    getAllVendors(): Retrieves all vendors from localStorage
    saveVendors(): Saves vendors array
    getCurrentVendor(): Gets logged-in vendor
    setCurrentVendor(): Sets current session
    emailExists(): Checks for duplicate emails
    findVendor(): Authenticates vendor

3. Product Search & Filter

Location: products.js

Features:

    Real-time search by product name or vendor
    Category-based filtering
    Case-insensitive search
    Search result highlighting

Implementation:
javascript

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  // Filter products by name or vendor
  // Hide non-matching products
  // Show matching products
}

4. Pagination System

Location: products.js

Configuration:
javascript

const ITEMS_PER_PAGE = 4;
const INITIAL_ITEMS = 4;

Features:

    Shows 4 items initially per category
    "Show More" button loads 4 more items
    "Show Less" button collapses to initial view
    Maintains scroll position on collapse
    Disable state when all items shown

5. Dashboard Analytics

Location: dashboard.js

Sample Data Generation:
javascript

generateSampleData() {
  // Creates demo data for:
  // - Revenue and profit
  // - Order statistics
  // - Sales chart data
  // - Recent orders
  // - Top products
}

Chart Implementation:

    Uses Chart.js for line charts
    6-month sales visualization
    Responsive canvas
    Custom tooltips
    Gradient background

Installation & Setup
Prerequisites

    Modern web browser (Chrome, Firefox, Safari, Edge)
    Local web server (optional, for better development experience)

Steps

    Download/Clone Project

bash

   # If using Git
   git clone <repository-url>
   cd sme-marketplace

    Open Project
        Simply open index.html in a web browser
        Or use a local server:

bash

   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click index.html → Open with Live Server

    Access the Application
        Navigate to http://localhost:8000 (if using server)
        Or open index.html directly

Usage Guide
For Customers

    Browse Products
        Visit products page from navigation
        Browse by category or search
        Click "Show More" to see more products
    Add to Cart
        Click "Add to Cart" on any product
        Cart count updates in navigation
    Manage Cart
        Click cart icon to view cart
        Adjust quantities with +/- buttons
        Remove unwanted items
        Apply promo codes (demo: SAVE10, WELCOME20)
    Checkout
        Review order summary
        Click "Secure Checkout"
        Follow payment instructions

For Vendors

    Register/Login
        Click "Login" in navigation
        Toggle to "Sign Up" tab
        Fill registration form
        Agree to terms and submit
    Access Dashboard
        Redirected automatically after signup/login
        View business metrics and charts
    Manage Business
        Track sales and revenue
        View recent orders
        Monitor top products
        Access quick actions
    Logout
        Click "Logout" in navigation
        Confirms logout action

Code Documentation
Critical Code Sections
1. Cart Persistence
javascript

// Save cart to localStorage
localStorage.setItem('cart', JSON.stringify(cart));

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

2. Vendor Authentication Check
javascript

function checkAuth() {
  const vendor = getCurrentVendor();
  if (!vendor) {
    alert('Please login to access the dashboard');
    window.location.href = 'login.html';
    return null;
  }
  return vendor;
}

3. Dynamic Product Display
javascript

const syncVisibleProducts = () => {
  products.forEach((product, index) => {
    if (index < currentVisible) {
      product.classList.remove('hidden');
      product.style.display = 'block';
    } else {
      product.classList.add('hidden');
      product.style.display = 'none';
    }
  });
};

4. Price Calculation
javascript

const shipping = cart.length > 0 ? 10 : 0;
const tax = subtotal * 0.125; // 12.5% tax
const total = subtotal + shipping + tax;

Future Enhancements
High Priority

    Backend Integration
        Node.js/Express server
        MongoDB/PostgreSQL database
        RESTful API development
        Real authentication with JWT
    Payment Gateway
        Mobile Money API integration
        Paystack/Flutterwave integration
        Payment confirmation system
        Transaction history
    Security Improvements
        Password hashing (bcrypt)
        HTTPS implementation
        Input sanitization
        CSRF protection

Medium Priority

    Advanced Features
        Real-time chat support
        Email notifications
        Product reviews and ratings
        Wishlist functionality
        Order tracking system
    Vendor Tools
        Inventory management
        Advanced analytics
        Bulk product upload
        Marketing tools
        Promotional campaigns
    User Experience
        Advanced filters (price range, ratings)
        Product comparison
        Recently viewed items
        Personalized recommendations

Low Priority

    Additional Features
        Multi-language support
        Dark mode
        PWA capabilities
        Push notifications
        Social media integration

Known Issues & Limitations
Current Limitations

    No Backend
        All data stored in browser's localStorage
        Data not synchronized across devices
        No real user authentication
    Security Concerns
        Passwords stored in plain text
        No server-side validation
        Vulnerable to XSS attacks
        No data encryption
    Payment System
        Checkout is simulated
        No actual payment processing
        No transaction records
    Data Persistence
        Clearing browser cache deletes all data
        No backup mechanism
        Limited storage capacity (5-10MB)
    Scalability
        Cannot handle real vendor management
        No multi-vendor coordination
        Limited product catalog size

Browser Compatibility

    ✅ Chrome 90+
    ✅ Firefox 88+
    ✅ Safari 14+
    ✅ Edge 90+
    ⚠️ IE 11 (not supported)

Mobile Responsiveness

    ✅ Fully responsive on mobile devices
    ✅ Touch-friendly interface
    ⚠️ Some animations may be slower on older devices

Credits & Acknowledgments
Resources Used

    Images: Pexels (free stock photos)
    Icons: Font Awesome
    Fonts: Google Fonts (Poppins)
    Charts: Chart.js

Development

    Project Type: Educational/Portfolio Project
    Purpose: Demonstrate full-stack web development skills
    Target Market: Ghana SME ecosystem

License

This project is created for educational purposes. Feel free to use it as a learning resource or template for your own projects.
Contact & Support

For questions, suggestions, or contributions:

    Email: support@smemarketplace.com
    Phone: +233 24 123 4567
    Location: Accra, Ghana

Last Updated: November 30, 2025
Version: 1.0.0
Status: Development/Demo


