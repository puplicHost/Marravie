document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-select');

    if (!productGrid) return;

    // Convert HTMLCollection to Array
    let products = Array.from(productGrid.children);

    // Initial count update
    updateProductCount();

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            products.forEach(product => {
                const title = product.querySelector('h3')?.innerText.toLowerCase() || '';
                const description = product.querySelector('p')?.innerText.toLowerCase() || '';
                const matches = title.includes(searchTerm) || description.includes(searchTerm);

                if (matches) {
                    product.classList.remove('hidden');
                } else {
                    product.classList.add('hidden');
                }
            });

            updateProductCount();
        });
    }

    // Sort Functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const criteria = sortSelect.value;
            sortProducts(criteria);
        });
    }

    function sortProducts(criteria) {
        products.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            const ratingA = parseFloat(a.dataset.rating || 0);
            const ratingB = parseFloat(b.dataset.rating || 0);

            switch (criteria) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'newest':
                    return dateB - dateA;
                case 'featured':
                default:
                    // Sort by rating descending for featured
                    return ratingB - ratingA;
            }
        });

        // Re-append sorted products to the grid
        products.forEach(product => productGrid.appendChild(product));
    }

    function updateProductCount() {
        if (!productCount) return;
        const visibleProducts = products.filter(p => !p.classList.contains('hidden'));
        productCount.innerText = visibleProducts.length;
    }
});
