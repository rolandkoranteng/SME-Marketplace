/*// =========================
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
const sectionStates = [];

productSections.forEach(productSection => {
  const products = Array.from(productSection.querySelectorAll('.product'));
  if (!products.length) return;

  const container = productSection.nextElementSibling;
  if (!container || !container.classList.contains('show-more-container')) return;

  const showMoreBtn = container.querySelector('.show-more-btn');
  const showLessBtn = container.querySelector('.show-less-btn');

  let currentVisible = Math.min(INITIAL_ITEMS, products.length);

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

  const updateButtons = () => {
    if (products.length <= INITIAL_ITEMS) {
      container.style.display = 'none';
      return;
    }

    container.style.display = container.dataset.forceHidden === 'true' ? 'none' : 'flex';
    showLessBtn.disabled = currentVisible <= INITIAL_ITEMS;

    if (currentVisible >= products.length) {
      showMoreBtn.disabled = true;
      showMoreBtn.style.opacity = '0.5';
    } else {
      showMoreBtn.disabled = false;
      showMoreBtn.style.opacity = '1';
    }
  };

  syncVisibleProducts();
  updateButtons();

  if (products.length <= INITIAL_ITEMS) {
    return;
  }

  showMoreBtn.addEventListener('click', () => {
    currentVisible = Math.min(products.length, currentVisible + ITEMS_PER_PAGE);
    syncVisibleProducts();
    updateButtons();
  });

  showLessBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const beforeTop = productSection.getBoundingClientRect().top;
    document.documentElement.classList.add('no-scroll-smooth');

    currentVisible = Math.max(INITIAL_ITEMS, currentVisible - ITEMS_PER_PAGE);
    syncVisibleProducts();
    const shouldDisableShowLess = currentVisible === INITIAL_ITEMS;
    updateButtons();

    requestAnimationFrame(() => {
      const afterTop = productSection.getBoundingClientRect().top;
      window.scrollBy(0, afterTop - beforeTop);

      setTimeout(() => {
        document.documentElement.classList.remove('no-scroll-smooth');
        if (shouldDisableShowLess) {
          try {
            showMoreBtn.focus({ preventScroll: true });
          } catch (err) {
            showMoreBtn.focus();
          }
        }
      }, 100);
    });
  });

  sectionStates.push({
    reset() {
      currentVisible = Math.min(INITIAL_ITEMS, products.length);
      delete container.dataset.forceHidden;
      syncVisibleProducts();
      updateButtons();
    },
    hideControls() {
      container.dataset.forceHidden = 'true';
      container.style.display = 'none';
      showLessBtn.disabled = true;
    }
  });
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

  if (searchTerm === "") {
    allProducts.forEach(product => {
      product.style.display = "block";
    });
    sectionStates.forEach(state => state.reset());
    return;
  }

  sectionStates.forEach(state => state.hideControls());

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
}*/


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
  button.addEventListener('click', (e) => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    // Get the image from the product card
    const productCard = button.closest('.product');
    const image = productCard.querySelector('img').src;
    
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ 
        name, 
        price, 
        quantity: 1,
        image: image // Add image to cart item
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Better visual feedback
    button.textContent = 'Added!';
    button.style.background = '#43a047';
    
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.style.background = '';
    }, 1500);
  });
});

updateCartCount();


// =========================
// SHOW MORE / SHOW LESS
// =========================

const ITEMS_PER_PAGE = 4;
const INITIAL_ITEMS = 4;
const productSections = document.querySelectorAll('.products');
const sectionStates = [];

productSections.forEach(productSection => {
  const products = Array.from(productSection.querySelectorAll('.product'));
  if (!products.length) return;

  const container = productSection.nextElementSibling;
  if (!container || !container.classList.contains('show-more-container')) return;

  const showMoreBtn = container.querySelector('.show-more-btn');
  const showLessBtn = container.querySelector('.show-less-btn');

  let currentVisible = Math.min(INITIAL_ITEMS, products.length);

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

  const updateButtons = () => {
    if (products.length <= INITIAL_ITEMS) {
      container.style.display = 'none';
      return;
    }

    container.style.display = container.dataset.forceHidden === 'true' ? 'none' : 'flex';
    showLessBtn.disabled = currentVisible <= INITIAL_ITEMS;

    if (currentVisible >= products.length) {
      showMoreBtn.disabled = true;
      showMoreBtn.style.opacity = '0.5';
    } else {
      showMoreBtn.disabled = false;
      showMoreBtn.style.opacity = '1';
    }
  };

  syncVisibleProducts();
  updateButtons();

  if (products.length <= INITIAL_ITEMS) {
    return;
  }

  showMoreBtn.addEventListener('click', () => {
    currentVisible = Math.min(products.length, currentVisible + ITEMS_PER_PAGE);
    syncVisibleProducts();
    updateButtons();
  });

  showLessBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const beforeTop = productSection.getBoundingClientRect().top;
    document.documentElement.classList.add('no-scroll-smooth');

    currentVisible = Math.max(INITIAL_ITEMS, currentVisible - ITEMS_PER_PAGE);
    syncVisibleProducts();
    const shouldDisableShowLess = currentVisible === INITIAL_ITEMS;
    updateButtons();

    requestAnimationFrame(() => {
      const afterTop = productSection.getBoundingClientRect().top;
      window.scrollBy(0, afterTop - beforeTop);

      setTimeout(() => {
        document.documentElement.classList.remove('no-scroll-smooth');
        if (shouldDisableShowLess) {
          try {
            showMoreBtn.focus({ preventScroll: true });
          } catch (err) {
            showMoreBtn.focus();
          }
        }
      }, 100);
    });
  });

  sectionStates.push({
    reset() {
      currentVisible = Math.min(INITIAL_ITEMS, products.length);
      delete container.dataset.forceHidden;
      syncVisibleProducts();
      updateButtons();
    },
    hideControls() {
      container.dataset.forceHidden = 'true';
      container.style.display = 'none';
      showLessBtn.disabled = true;
    }
  });
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

  if (searchTerm === "") {
    allProducts.forEach(product => {
      product.style.display = "block";
    });
    sectionStates.forEach(state => state.reset());
    return;
  }

  sectionStates.forEach(state => state.hideControls());

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


