// ===== SEARCH FUNCTIONALITY =====
const searchData = {
  artworks: [
    { name: 'Traditional Calligraphy', category: 'calligraphy', page: 'art.html', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', price: null, artist: 'Ahmed Al-Mansoori', medium: 'Ink on Paper', year: '2023', description: 'Elegant Arabic calligraphy on premium paper', fullText: 'This stunning piece showcases traditional Islamic calligraphy techniques combined with modern artistic vision. Handcrafted with premium inks on high-quality paper, each stroke represents years of artistic mastery.' },
    { name: 'Handcrafted Pottery', category: 'pottery', page: 'art.html', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', price: null, artist: 'Fatima Hassan', medium: 'Ceramic', year: '2022', description: 'Traditional ceramic vase with intricate patterns', fullText: 'Handmade ceramic vase featuring intricate geometric patterns inspired by traditional Middle Eastern designs. Each piece is unique, crafted on the potters wheel with meticulous attention to detail.' },
    { name: 'Canvas Art', category: 'canvas', page: 'art.html', image: 'https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=800&q=80', price: null, artist: 'Maria Santos', medium: 'Acrylic on Canvas', year: '2024', description: 'Vibrant abstract painting on stretched canvas', fullText: 'A vibrant abstract composition featuring bold colors and dynamic brushstrokes. This contemporary piece explores the interplay of color and form, creating a mesmerizing visual experience.' },
    { name: 'Cultural Patterns', category: 'textile', page: 'art.html', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80', price: null, artist: 'Priya Sharma', medium: 'Handwoven Textile', year: '2023', description: 'Handwoven textile with traditional motifs', fullText: 'Traditional Indian textile handwoven on a wooden loom, featuring intricate patterns passed down through generations. The natural dyes used create a rich, authentic color palette.' },
    { name: 'Bronze Sculpture', category: 'sculpture', page: 'art.html', image: 'https://images.unsplash.com/photo-1600180758890-6d839d2b6eaa?auto=format&fit=crop&w=800&q=80', price: null, artist: 'James Wilson', medium: 'Bronze', year: '2022', description: 'Modern abstract bronze sculpture', fullText: 'A striking contemporary bronze sculpture that plays with form and shadow. The piece demonstrates masterful technique in casting and finishing, resulting in a sophisticated modern art statement.' },
    { name: 'Handmade Jewelry', category: 'jewelry', page: 'art.html', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', price: null, artist: 'Layla Al-Zahra', medium: 'Silver & Stones', year: '2024', description: 'Silver necklace with semi-precious stones', fullText: 'Elegant silver necklace featuring hand-selected semi-precious stones set in intricate patterns. Each piece is handcrafted with precision, combining traditional jewelry-making techniques with contemporary design.' },
  ],
  products: [
    { name: 'Ceramic Vase', category: 'vases', page: 'product.html', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80', price: 40, badge: 'New', availability: 'In Stock', fullText: 'Beautiful handcrafted ceramic vase featuring contemporary design elements. Perfect for displaying fresh flowers or as a standalone decorative piece. Each vase is individually crafted with premium ceramic materials.' },
    { name: 'Handmade Plate', category: 'plates', page: 'product.html', image: 'https://images.unsplash.com/photo-1523419400524-4c8b1c5c2f4c?auto=format&fit=crop&w=800&q=80', price: 25, availability: 'In Stock', fullText: 'Decorative ceramic plate with beautiful floral patterns hand-painted by skilled artisans. Ideal for serving or wall display. Made with food-safe glazes for versatile use.' },
    { name: 'Decorative Bowl', category: 'plates', page: 'product.html', image: 'https://images.unsplash.com/photo-1458530970867-aaa3700e966d?auto=format&fit=crop&w=800&q=80', price: 35, availability: 'In Stock', fullText: 'Artisan-made decorative serving bowl crafted from premium ceramic material. Features intricate detailing and a sophisticated glaze finish. Perfect for serving snacks or displaying as home decor.' },
    { name: 'Luxury Artwork', category: 'artwork', page: 'product.html', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80', price: 120, badge: 'Limited', availability: 'Limited Stock', fullText: 'Original framed canvas painting featuring stunning abstract composition. This limited edition piece comes with certificate of authenticity. A true collector\'s item for art enthusiasts.' },
    { name: 'Modern Vase', category: 'vases', page: 'product.html', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80', price: 55, availability: 'In Stock', fullText: 'Contemporary fusion of glass and ceramic materials creating a unique artistic expression. Features modern minimalist design suitable for any interior style.' },
    { name: 'Wall Art Set', category: 'decor', page: 'product.html', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', price: 85, availability: 'In Stock', fullText: 'Complete set of three coordinated wall art pieces designed to complement modern interiors. Includes hanging hardware for easy installation. Perfect for creating a gallery wall effect.' },
    { name: 'Limited Edition Print', category: 'prints', page: 'product.html', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', price: 65, badge: 'Limited', availability: 'Limited Stock', fullText: 'Exclusive limited edition fine art print numbered and signed by the artist. High-quality archival paper ensures longevity. Only 100 copies produced worldwide.' },
    { name: 'Oil Painting', category: 'artwork', page: 'product.html', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80', price: 200, availability: 'In Stock', fullText: 'Stunning oil painting on canvas featuring landscape elements with rich textures and color depth. Professionally framed and ready to hang. A masterpiece for serious collectors.' },
    { name: 'Table Sculpture', category: 'decor', page: 'product.html', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80', price: 95, availability: 'In Stock', fullText: 'Elegant modern sculpture perfect for tables, shelves, or countertops. Crafted with attention to detail using premium materials. Adds sophistication to any space.' },
    { name: 'Photography Print', category: 'prints', page: 'product.html', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80', price: 45, availability: 'In Stock', fullText: 'Professional-grade photography print capturing stunning natural landscapes. Museum-quality paper and archival inks ensure lasting beauty. Perfect for nature lovers.' },
    { name: 'Crystal Vase', category: 'vases', page: 'product.html', image: 'https://images.unsplash.com/photo-1600180758890-6d839d2b6eaa?auto=format&fit=crop&w=800&q=80', price: 150, badge: 'Premium', availability: 'Limited Stock', fullText: 'Exquisite crystal vase handcrafted by master artisans. Features intricate cut designs that sparkle when light passes through. An heirloom-quality piece.' },
  ]
};

// Initialize search
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchInput || !searchResults) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performSearch(query, searchResults);
    }, 300);
  });
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      performSearch(searchInput.value.trim().toLowerCase(), searchResults);
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
}

function performSearch(query, resultsContainer) {
  const allItems = [...searchData.artworks, ...searchData.products];
  const matches = allItems.filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );
  
  if (matches.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
  } else {
    resultsContainer.innerHTML = matches.slice(0, 8).map(item => `
      <div class="search-result-item" onclick="window.location.href='${item.page}'">
        <img src="${item.image}" alt="${item.name}">
        <div class="search-result-item-info">
          <h4>${item.name}</h4>
          <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
          ${item.price ? `<p class="price">$${item.price}</p>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  resultsContainer.classList.add('active');
}

// ===== FILTER FUNCTIONALITY =====
function initFilters() {
  const artFilter = document.getElementById('artFilter');
  const productFilter = document.getElementById('productFilter');
  
  if (artFilter) {
    artFilter.addEventListener('change', (e) => {
      filterItems('artGrid', e.target.value);
    });
  }
  
  if (productFilter) {
    productFilter.addEventListener('change', (e) => {
      filterItems('productGrid', e.target.value);
    });
  }
}

function filterItems(gridId, category) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ===== PRODUCT QUICK VIEW MODAL =====
function initQuickView() {
  const viewBtns = document.querySelectorAll('#productGrid .view-btn');
  const quickViewModal = document.getElementById('quickViewModal');
  const closeBtn = quickViewModal ? quickViewModal.querySelector('.close-modal') : null;
  
  if (!viewBtns.length || !quickViewModal) return;
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.card');
      const title = card.querySelector('h3').textContent;
      const image = card.querySelector('img').src;
      const description = card.querySelector('.card-description').textContent;
      const priceText = card.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      const badge = card.querySelector('.product-badge');
      
      // Find product details from data
      const productData = searchData.products.find(p => p.name === title);
      
      // Populate modal
      document.getElementById('quickViewImage').src = image;
      document.getElementById('quickViewTitle').textContent = title;
      document.getElementById('quickViewDescription').textContent = description;
      document.getElementById('quickViewPrice').textContent = `$${price}`;
      document.getElementById('quickViewCategory').textContent = productData?.category?.charAt(0).toUpperCase() + productData?.category?.slice(1) || 'Product';
      document.getElementById('quickViewAvailability').textContent = productData?.availability || 'In Stock';
      document.getElementById('quickViewStock').textContent = productData?.availability === 'Limited Stock' ? '⚠️ Only a few items left!' : '✓ Available';
      document.getElementById('quickViewFullText').textContent = productData?.fullText || 'Premium handcrafted product with exceptional quality and attention to detail.';
      
      // Show badge if exists
      const badgeEl = document.getElementById('quickViewBadge');
      if (badge) {
        badgeEl.textContent = badge.textContent;
        badgeEl.style.display = 'inline-block';
      } else {
        badgeEl.style.display = 'none';
      }
      
      quickViewModal.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
    });
  }
  
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.classList.remove('active');
    }
  });
  
  // Add to cart from quick view
  const quickViewAddBtn = document.getElementById('quickViewAddCart');
  if (quickViewAddBtn) {
    quickViewAddBtn.addEventListener('click', () => {
      const title = document.getElementById('quickViewTitle').textContent;
      const price = parseFloat(document.getElementById('quickViewPrice').textContent.replace('$', ''));
      const image = document.getElementById('quickViewImage').src;
      addToCart(title, price, image);
      quickViewModal.classList.remove('active');
    });
  }
  
  // Add to wishlist from quick view
  const quickViewWishBtn = document.getElementById('quickViewWishlist');
  if (quickViewWishBtn) {
    quickViewWishBtn.addEventListener('click', () => {
      alert('Added to your Wishlist! ❤️');
    });
  }
}

// ===== ART DETAILS MODAL =====
function initArtDetails() {
  const viewBtns = document.querySelectorAll('.view-btn');
  const detailsModal = document.getElementById('detailsModal');
  const closeBtn = detailsModal ? detailsModal.querySelector('.close-modal') : null;
  
  if (!viewBtns.length || !detailsModal) return;
  
  const artDetails = {
    'Traditional Calligraphy': {
      badge: 'Traditional',
      artist: 'Ahmed Al-Mansoori',
      medium: 'Ink on Paper',
      year: '2023',
      category: 'Calligraphy',
      fullText: 'This stunning piece showcases traditional Islamic calligraphy techniques combined with modern artistic vision. Handcrafted with premium inks on high-quality paper, each stroke represents years of artistic mastery. The composition balances classical Arabic script with contemporary visual design.'
    },
    'Handcrafted Pottery': {
      badge: 'Handmade',
      artist: 'Fatima Hassan',
      medium: 'Ceramic',
      year: '2022',
      category: 'Pottery',
      fullText: 'Handmade ceramic vase featuring intricate geometric patterns inspired by traditional Middle Eastern designs. Each piece is unique, crafted on the potters wheel with meticulous attention to detail. The glaze is specially formulated to achieve the perfect finish.'
    },
    'Canvas Art': {
      badge: 'Original',
      artist: 'Maria Santos',
      medium: 'Acrylic on Canvas',
      year: '2024',
      category: 'Canvas',
      fullText: 'A vibrant abstract composition featuring bold colors and dynamic brushstrokes. This contemporary piece explores the interplay of color and form, creating a mesmerizing visual experience that transforms any space.'
    },
    'Cultural Patterns': {
      badge: 'Cultural',
      artist: 'Priya Sharma',
      medium: 'Handwoven Textile',
      year: '2023',
      category: 'Textile',
      fullText: 'Traditional Indian textile handwoven on a wooden loom, featuring intricate patterns passed down through generations. The natural dyes used create a rich, authentic color palette that speaks of heritage and craftsmanship.'
    },
    'Bronze Sculpture': {
      badge: 'Sculpture',
      artist: 'James Wilson',
      medium: 'Bronze',
      year: '2022',
      category: 'Sculpture',
      fullText: 'A striking contemporary bronze sculpture that plays with form and shadow. The piece demonstrates masterful technique in casting and finishing, resulting in a sophisticated modern art statement that captures light beautifully.'
    },
    'Handmade Jewelry': {
      badge: 'Jewelry',
      artist: 'Layla Al-Zahra',
      medium: 'Silver & Stones',
      year: '2024',
      category: 'Jewelry',
      fullText: 'Elegant silver necklace featuring hand-selected semi-precious stones set in intricate patterns. Each piece is handcrafted with precision, combining traditional jewelry-making techniques with contemporary design sensibilities.'
    }
  };
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.card');
      const title = card.querySelector('h3').textContent;
      const image = card.querySelector('img').src;
      const description = card.querySelector('.card-description').textContent;
      const details = artDetails[title] || {};
      
      document.getElementById('detailsImage').src = image;
      document.getElementById('detailsTitle').textContent = title;
      document.getElementById('detailsDescription').textContent = description;
      document.getElementById('detailsBadge').textContent = details.badge || 'Artwork';
      document.getElementById('detailsArtist').textContent = details.artist || 'Unknown Artist';
      document.getElementById('detailsCategory').textContent = details.category || 'Art';
      document.getElementById('detailsMedium').textContent = details.medium || 'Mixed Media';
      document.getElementById('detailsYear').textContent = details.year || '2024';
      document.getElementById('detailsFullText').textContent = details.fullText || 'A beautiful piece of art.';
      
      detailsModal.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detailsModal.classList.remove('active');
    });
  }
  
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      detailsModal.classList.remove('active');
    }
  });
  
  // Add to wishlist button
  const addToCollectionBtn = document.getElementById('addToCollectionBtn');
  if (addToCollectionBtn) {
    addToCollectionBtn.addEventListener('click', () => {
      alert('Added to your Wishlist! ❤️');
    });
  }
}

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('artExplorerCart')) || [];
const cartApiBase = 'http://localhost:5000'; // Same server for frontend and backend

function initCart() {
  const purchaseButtons = document.querySelectorAll('.purchase-btn');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = cartModal ? cartModal.querySelector('.close-modal') : null;
  const closeCartBtn = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  purchaseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = btn.dataset.product;
      const price = parseFloat(btn.dataset.price);
      addToCart(product, price, btn.closest('.card').querySelector('img').src);
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      console.log('Close button clicked');
      if (cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      console.log('Continue Shopping clicked');
      if (cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      
      // Simple checkout flow
      const shippingAddress = prompt('Enter your shipping address:');
      if (!shippingAddress) return;
      
      const userEmail = prompt('Enter your email (for order confirmation):');
      if (!userEmail) return;
      
      const paymentMethod = confirm('Click OK for Card payment, Cancel for PayPal');
      
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      try {
        const response = await fetch(`${cartApiBase}/api/cart/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart,
            shippingAddress,
            userEmail,
            paymentMethod: paymentMethod ? 'card' : 'paypal',
            total: totalPrice
          })
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.success) {
          alert(`✅ Order placed successfully!\n\n📦 Order ID: ${data.orderId}\n💰 Total: $${data.total}\n📧 Confirmation sent to: ${userEmail}\n\n✨ You can track your order using the Order ID`);
          console.log('Order successfully saved to backend:', data);
          
          // Clear cart
          cart = [];
          localStorage.removeItem('artExplorerCart');
          await fetch(`${cartApiBase}/api/cart/clear`, { method: 'POST' });
          cartModal.classList.remove('active');
          updateCartDisplay();
        } else {
          const errorMsg = (data && data.error) ? data.error : 'Unknown error occurred';
          alert(`❌ Error: ${errorMsg}`);
          console.error('Checkout failed:', data);
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert(`❌ Connection failed: ${error.message}\nMake sure backend is running on http://localhost:5000`);
      }
    });
  }
  
  // Close modal on outside click
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }
  
  updateCartDisplay();
}

function addToCart(productName, price, imageUrl) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: price,
      image: imageUrl,
      quantity: 1
    });
  }
  
  localStorage.setItem('artExplorerCart', JSON.stringify(cart));
  updateCartDisplay();
  showCartModal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('artExplorerCart', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartBadge = document.getElementById('cartBadge');
  
  // Update cart badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Your cart is empty</p>';
    if (cartTotal) cartTotal.textContent = '0';
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.quantity}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">
        <i class="bx bx-trash"></i>
      </button>
    </div>
  `).join('');
  
  if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function showCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.classList.add('active');
  }
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelector('.nav-links-items');
  const searchBarContainer = document.querySelector('.search-bar-container');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const joinBtn = document.querySelector('.pill-btn');
  const cartLink = document.querySelector('.cart-link');
  
  if (!menuToggle) return;
  
  // Toggle menu open/close (WITHOUT search bar)
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const isActive = navLinks?.classList.contains('active');
    
    if (navLinks) navLinks.classList.toggle('active');
    if (navLinksItems) navLinksItems.classList.toggle('active');
    // DO NOT toggle search bar automatically
    
    // Update icon
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (!isActive) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
        menuToggle.style.color = '#d4b06a';
      } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
    }
  });
  
  // Close menu when clicking on a nav link
  navAnchors.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow normal navigation
      if (navLinks) navLinks.classList.remove('active');
      if (navLinksItems) navLinksItems.classList.remove('active');
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
    });
  });
  
  // Ensure Join button works (navigate to signup)
  if (joinBtn && joinBtn.tagName === 'A') {
    joinBtn.addEventListener('click', (e) => {
      // Close menu when Join is clicked
      if (navLinks) navLinks.classList.remove('active');
      if (navLinksItems) navLinksItems.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
    });
  }
  
  // Ensure Cart link works (navigate or show modal)
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      // Close menu when Cart is clicked
      if (navLinks) navLinks.classList.remove('active');
      if (navLinksItems) navLinksItems.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
      
      // Check if there's a cart modal on this page
      const cartModalElem = document.getElementById('cartModal');
      if (cartModalElem) {
        e.preventDefault();
        showCartModal();
      }
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menuToggle && navLinks && 
        !menuToggle.contains(e.target) && 
        !navLinks.contains(e.target) &&
        navLinks.classList.contains('active')) {
      
      navLinks.classList.remove('active');
      if (navLinksItems) navLinksItems.classList.remove('active');
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
    }
  });
  
  // Close menu on window resize (go back to desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (navLinks) navLinks.classList.remove('active');
      if (navLinksItems) navLinksItems.classList.remove('active');
      if (searchBarContainer) searchBarContainer.classList.remove('active');
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        menuToggle.style.color = '#fff';
      }
    }
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initFilters();
  initCart();
  initMobileMenu();
  initArtDetails();
  initQuickView();
  
  // Update cart badge on page load
  updateCartDisplay();
  
  // Make removeFromCart available globally
  window.removeFromCart = removeFromCart;
  
  // Make cart link open modal (or follow link if no modal on page)
  const cartLink = document.getElementById('cartLink');
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      const cartModalElem = document.getElementById('cartModal');
      if (cartModalElem) {
        e.preventDefault();
        showCartModal();
      }
      // if no modal is present on this page, let the link navigate (e.g., to product.html)
    });
  }
});

