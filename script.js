// Product data array - In a real scenario, this would come from a database or API
const products = [
    {
        id: 1,
        title: "Wireless Noise-Canceling Headphones",
        description: "Premium sound quality with active noise cancellation. Perfect for work and travel.",
        price: "$299.99",
        category: "electronics",
        icon: "🎧",
        affiliateLink: "https://example.com/product1" // Replace with actual affiliate link
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        description: "Track your health metrics, workouts, and stay connected on the go.",
        price: "$249.99",
        category: "fitness",
        icon: "⌚",
        affiliateLink: "https://example.com/product2"
    },
    {
        id: 3,
        title: "4K Streaming Device",
        description: "Stream your favorite content in stunning 4K resolution with HDR support.",
        price: "$49.99",
        category: "electronics",
        icon: "📺",
        affiliateLink: "https://example.com/product3"
    },
    {
        id: 4,
        title: "Smart Air Purifier",
        description: "Clean air for healthier living. Removes 99.97% of airborne particles.",
        price: "$199.99",
        category: "home",
        icon: "💨",
        affiliateLink: "https://example.com/product4"
    },
    {
        id: 5,
        title: "Mechanical Keyboard",
        description: "Premium typing experience with customizable RGB lighting.",
        price: "$159.99",
        category: "electronics",
        icon: "⌨️",
        affiliateLink: "https://example.com/product5"
    },
    {
        id: 6,
        title: "Yoga Mat & Block Set",
        description: "Non-slip, eco-friendly yoga mat with matching blocks for perfect practice.",
        price: "$59.99",
        category: "fitness",
        icon: "🧘",
        affiliateLink: "https://example.com/product6"
    },
    {
        id: 7,
        title: "Smart LED Light Bulbs (4-Pack)",
        description: "Control your lighting with voice or app. 16 million colors available.",
        price: "$79.99",
        category: "home",
        icon: "💡",
        affiliateLink: "https://example.com/product7"
    },
    {
        id: 8,
        title: "Portable Bluetooth Speaker",
        description: "Waterproof speaker with 360° sound and 24-hour battery life.",
        price: "$129.99",
        category: "electronics",
        icon: "🔊",
        affiliateLink: "https://example.com/product8"
    },
    {
        id: 9,
        title: "Resistance Bands Set",
        description: "Complete set of 5 resistance bands for full-body workouts at home.",
        price: "$34.99",
        category: "fitness",
        icon: "💪",
        affiliateLink: "https://example.com/product9"
    }
];

// Current filter state - tracks which category is active
let currentFilter = 'all';

/**
 * Initialize the page when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilterButtons();
});

/**
 * Render products to the page
 * @param {Array} productsToRender - Array of product objects to display
 */
function renderProducts(productsToRender) {
    const grid = document.getElementById('productGrid');
    
    // Clear existing products
    grid.innerHTML = '';
    
    // Check if there are products to display
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found in this category.</p>';
        return;
    }
    
    // Create and append product cards
    productsToRender.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

/**
 * Create a product card element
 * @param {Object} product - Product data object
 * @returns {HTMLElement} - Complete product card element
 */
function createProductCard(product) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    // Build the card HTML structure
    card.innerHTML = `
        <div class="product-image">
            <span>${product.icon}</span>
            <span class="category-badge">${product.category}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <a href="${product.affiliateLink}" 
               class="cta-button" 
               target="_blank" 
               rel="noopener noreferrer"
               onclick="trackClick('${product.title}')">
                View Product →
            </a>
        </div>
    `;
    
    return card;
}

/**
 * Setup event listeners for filter buttons
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get selected category and filter products
            const category = button.getAttribute('data-category');
            currentFilter = category;
            filterProducts(category);
        });
    });
}

/**
 * Filter products by category
 * @param {string} category - Category to filter by ('all' or specific category)
 */
function filterProducts(category) {
    let filtered;
    
    if (category === 'all') {
        filtered = products;
    } else {
        filtered = products.filter(product => product.category === category);
    }
    
    renderProducts(filtered);
}

/**
 * Track when a user clicks on an affiliate link
 * In a real application, this would send data to analytics
 * @param {string} productTitle - Name of the product clicked
 */
function trackClick(productTitle) {
    console.log(`User clicked on: ${productTitle}`);
    // In production, you would send this to Google Analytics, Facebook Pixel, etc.
    // Example: gtag('event', 'click', { 'product_name': productTitle });
}

/**
 * Optional: Add search functionality
 * Uncomment and add a search input to HTML to enable
 */
/*
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}
*/