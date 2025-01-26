const API_BASE_URL = 'http://localhost:5000/api/products';

// Fetch and render products
async function loadProducts() {
  try {
    const response = await fetch(API_BASE_URL);
    const products = await response.json();
    renderFilters(products);
    renderGallery(products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Render the gallery
function renderGallery(products) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing products

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Subcategory:</strong> ${product.subcategory}</p>
      <p>${product.description}</p>
      <p><strong>Estimated Cost:</strong> $${product.estimatedCost}</p>
      <a href="product.html?id=${product.id}" class="view-details">View Details</a>
    `;
    gallery.appendChild(productCard);
  });
}

// Render filters
function renderFilters(products) {
  const categorySelect = document.getElementById('filterCategory');
  const subcategorySelect = document.getElementById('filterSubcategory');

  const categories = [...new Set(products.map(product => product.category))];
  const subcategories = [...new Set(products.map(product => product.subcategory))];

  categorySelect.innerHTML = '<option value="">All</option>';
  subcategorySelect.innerHTML = '<option value="">All</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  subcategories.forEach(subcategory => {
    const option = document.createElement('option');
    option.value = subcategory;
    option.textContent = subcategory;
    subcategorySelect.appendChild(option);
  });
}

// Apply sorting and filtering
function applySortAndFilter() {
  const sortValue = document.getElementById('sort').value;
  const filterCategory = document.getElementById('filterCategory').value;
  const filterSubcategory = document.getElementById('filterSubcategory').value;

  fetch(API_BASE_URL)
    .then(response => response.json())
    .then(products => {
      let filteredProducts = products;

      if (filterCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === filterCategory);
      }

      if (filterSubcategory) {
        filteredProducts = filteredProducts.filter(product => product.subcategory === filterSubcategory);
      }

      if (sortValue === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortValue === 'category') {
        filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
      } else if (sortValue === 'subcategory') {
        filteredProducts.sort((a, b) => a.subcategory.localeCompare(b.subcategory));
      }

      renderGallery(filteredProducts);
    })
    .catch(error => console.error('Error applying sort and filter:', error));
}

// Event listeners
document.getElementById('sort').addEventListener('change', applySortAndFilter);
document.getElementById('filterCategory').addEventListener('change', applySortAndFilter);
document.getElementById('filterSubcategory').addEventListener('change', applySortAndFilter);

// Initialize
document.addEventListener('DOMContentLoaded', loadProducts);
