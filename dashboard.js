// ========== AUTHENTICATION CHECK ==========

// Get current vendor from localStorage
function getCurrentVendor() {
    const currentVendor = localStorage.getItem('currentVendor');
    return currentVendor ? JSON.parse(currentVendor) : null;
}

// Check if vendor is logged in, redirect to login if not
function checkAuth() {
    const vendor = getCurrentVendor();
    if (!vendor) {
        alert('Please login to access the dashboard');
        window.location.href = 'login.html';
        return null;
    }
    return vendor;
}

// Logout function
function logout() {
    localStorage.removeItem('currentVendor');
    alert('You have been logged out successfully');
    window.location.href = 'login.html';
}

// ========== DOM ELEMENTS ==========

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const logoutBtn = document.getElementById('logoutBtn');

// ========== INITIALIZE DASHBOARD ==========

let currentVendor = checkAuth();
let salesChart = null;

// Format currency
function formatCurrency(amount) {
    return `GH₵ ${amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
}

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-GB', options);
}

// Load vendor data into the dashboard
function loadVendorData() {
    if (!currentVendor) return;

    // Update vendor profile in sidebar
    document.getElementById('vendorName').textContent = currentVendor.name;
    document.getElementById('vendorEmail').textContent = currentVendor.email;
    
    // Update welcome message
    document.getElementById('welcomeName').textContent = currentVendor.name;
    
    // Update stats cards
    document.getElementById('totalRevenue').textContent = formatCurrency(currentVendor.totalRevenue);
    document.getElementById('totalProfit').textContent = formatCurrency(currentVendor.totalProfit);
    document.getElementById('totalOrders').textContent = currentVendor.totalOrders;
    document.getElementById('activeProducts').textContent = currentVendor.activeProducts;
    
    // Update account information
    document.getElementById('businessName').textContent = currentVendor.businessName;
    document.getElementById('joinDate').textContent = formatDate(currentVendor.joinDate);
    
    // Load recent orders
    loadRecentOrders();
    
    // Load top products
    loadTopProducts();
    
    // Initialize sales chart
    initializeSalesChart();
}

// Load recent orders
function loadRecentOrders() {
    const ordersList = document.getElementById('recentOrdersList');
    
    if (!currentVendor.recentOrders || currentVendor.recentOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <p>No orders yet. Start selling to see orders here!</p>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = currentVendor.recentOrders.map(order => `
        <div class="order-item">
            <div class="order-info">
                <h4>Order #${order.id}</h4>
                <p>${order.customer} • ${order.date}</p>
            </div>
            <div>
                <p style="font-weight: 600; color: #333; margin-bottom: 0.5rem;">${formatCurrency(order.amount)}</p>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
        </div>
    `).join('');
}

// Load top products
function loadTopProducts() {
    const productsList = document.getElementById('topProductsList');
    
    if (!currentVendor.topProducts || currentVendor.topProducts.length === 0) {
        productsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box"></i>
                <p>No products yet. Add products to your store!</p>
            </div>
        `;
        return;
    }
    
    productsList.innerHTML = currentVendor.topProducts.map(product => `
        <div class="product-item">
            <div class="product-image">
                <i class="fas fa-image"></i>
            </div>
            <div class="product-details">
                <h4>${product.name}</h4>
                <p class="product-price">${formatCurrency(product.price)}</p>
                <p>Sold: ${product.sold} units</p>
            </div>
        </div>
    `).join('');
}

// Initialize sales chart
function initializeSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (salesChart) {
        salesChart.destroy();
    }
    
    const labels = currentVendor.salesData.map(data => data.month);
    const data = currentVendor.salesData.map(data => data.sales);
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales (GH₵)',
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Sales: ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [5, 5]
                    },
                    ticks: {
                        callback: function(value) {
                            return 'GH₵' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ========== SAMPLE DATA GENERATOR ==========

// Generate sample data for demo purposes
function generateSampleData() {
    if (!currentVendor) return;
    
    // Update vendor with sample data
    currentVendor.totalRevenue = 15750.50;
    currentVendor.totalProfit = 4525.25;
    currentVendor.totalOrders = 127;
    currentVendor.activeProducts = 23;
    currentVendor.completedOrders = 98;
    currentVendor.pendingOrders = 29;
    
    // Sample sales data
    currentVendor.salesData = [
        { month: 'Jan', sales: 2500 },
        { month: 'Feb', sales: 3200 },
        { month: 'Mar', sales: 2800 },
        { month: 'Apr', sales: 3500 },
        { month: 'May', sales: 2900 },
        { month: 'Jun', sales: 3750 }
    ];
    
    // Sample recent orders
    currentVendor.recentOrders = [
        {
            id: '10245',
            customer: 'Kwame Mensah',
            date: '2 hours ago',
            amount: 245.00,
            status: 'completed'
        },
        {
            id: '10244',
            customer: 'Akosua Agyeman',
            date: '5 hours ago',
            amount: 180.50,
            status: 'processing'
        },
        {
            id: '10243',
            customer: 'Kofi Asante',
            date: '1 day ago',
            amount: 325.75,
            status: 'pending'
        },
        {
            id: '10242',
            customer: 'Ama Boateng',
            date: '1 day ago',
            amount: 156.00,
            status: 'completed'
        }
    ];
    
    // Sample top products
    currentVendor.topProducts = [
        {
            name: 'Organic Palm Oil',
            price: 45.00,
            sold: 89
        },
        {
            name: 'Handwoven Kente Cloth',
            price: 250.00,
            sold: 34
        },
        {
            name: 'Fresh Garden Eggs',
            price: 12.50,
            sold: 156
        },
        {
            name: 'Shea Butter (Natural)',
            price: 35.00,
            sold: 67
        }
    ];
    
    // Update localStorage with sample data
    localStorage.setItem('currentVendor', JSON.stringify(currentVendor));
    
    // Update all vendors array as well
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const vendorIndex = vendors.findIndex(v => v.id === currentVendor.id);
    if (vendorIndex !== -1) {
        vendors[vendorIndex] = currentVendor;
        localStorage.setItem('vendors', JSON.stringify(vendors));
    }
}

// ========== EVENT LISTENERS ==========

// Logout button
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        logout();
    }
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // In a real application, you would load different content here
        alert('This feature is coming soon! Currently showing: ' + link.querySelector('span').textContent);
    });
});

// Quick action buttons
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        alert(`${action} feature is coming soon!`);
    });
});

// Chart period selector
const chartPeriod = document.getElementById('chartPeriod');
if (chartPeriod) {
    chartPeriod.addEventListener('change', (e) => {
        alert(`Chart period changed to: ${e.target.options[e.target.selectedIndex].text}`);
        // In a real app, you would load different data here
    });
}

// ========== INITIALIZE ON PAGE LOAD ==========

window.addEventListener('DOMContentLoaded', () => {
    // Check if vendor has sample data, if not, generate it
    if (currentVendor && currentVendor.totalRevenue === 0) {
        generateSampleData();
        currentVendor = getCurrentVendor(); // Reload the updated data
    }
    
    // Update current date
    updateCurrentDate();
    
    // Load all vendor data
    loadVendorData();
    
    // Add welcome animation
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            welcomeSection.style.transition = 'all 0.5s ease';
            welcomeSection.style.opacity = '1';
            welcomeSection.style.transform = 'translateY(0)';
        }, 100);
    }
});