// =========================
// MOBILE MENU TOGGLE
// =========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});


// =========================
// CART FUNCTIONALITY
// =========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');

function updateCartCount() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
  });
});

updateCartCount();


// =========================
// SHOW MORE / SHOW LESS
// =========================
const ITEMS_PER_PAGE = 4;
const INITIAL_ITEMS = 4;
const productSections = document.querySelectorAll('.products');

productSections.forEach(productSection => {
  const products = productSection.querySelectorAll('.product');
  const container = productSection.nextElementSibling;

  if (!container || !container.classList.contains('show-more-container')) return;

  const showMoreBtn = container.querySelector('.show-more-btn');
  const showLessBtn = container.querySelector('.show-less-btn');

  let currentVisible = INITIAL_ITEMS;

  function updateButtons() {
    showLessBtn.style.display = currentVisible > INITIAL_ITEMS ? 'inline-block' : 'none';

    if (currentVisible >= products.length) {
      showMoreBtn.disabled = true;
      showMoreBtn.style.opacity = '0.5';
    } else {
      showMoreBtn.disabled = false;
      showMoreBtn.style.opacity = '1';
    }
  }

  // Show More
  showMoreBtn.addEventListener('click', () => {
    const newVisible = Math.min(products.length, currentVisible + ITEMS_PER_PAGE);

    for (let i = currentVisible; i < newVisible; i++) {
      products[i].classList.remove('hidden');
      products[i].style.display = "block";
    }

    currentVisible = newVisible;
    updateButtons();
  });

  // Show Less (NO PAGE JUMP)
  showLessBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const currentScrollY = window.pageYOffset;

    // Disable smooth scroll
    document.documentElement.classList.add('no-scroll-smooth');

    const newVisible = Math.max(INITIAL_ITEMS, currentVisible - ITEMS_PER_PAGE);

    for (let i = newVisible; i < currentVisible; i++) {
      products[i].classList.add('hidden');
      products[i].style.display = "none";
    }

    currentVisible = newVisible;
    updateButtons();

    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollY);

      setTimeout(() => {
        document.documentElement.classList.remove('no-scroll-smooth');
      }, 100);
    });
  });

  updateButtons();
});


// =========================
// SEARCH FUNCTIONALITY
// =========================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');

searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const allProducts = document.querySelectorAll('.product');

  // ⭐ FULL RESET when search is empty
  if (searchTerm === "") {
    allProducts.forEach(product => {
      product.style.display = "block";
      product.classList.remove("hidden");
    });
    return;
  }

  let found = false;

  allProducts.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    const vendor = product.querySelector('.vendor').textContent.toLowerCase();

    if (productName.includes(searchTerm) || vendor.includes(searchTerm)) {
      product.style.display = "block";
      product.classList.remove("hidden");
      found = true;
    } else {
      product.style.display = "none";
    }
  });

  if (!found) {
    alert("No products found matching your search");
  }
}
