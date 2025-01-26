const API_BASE_URL = 'http://localhost:5000/api/products';

async function loadProducts() {
  try {
    const response = await fetch(API_BASE_URL);
    const products = await response.json();
    renderProductList(products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function renderProductList(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Subcategory:</strong> ${product.subcategory}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Estimated Cost:</strong> $${product.estimatedCost}</p>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productList.appendChild(productItem);
  });
}

async function addOrUpdateProduct(event) {
  event.preventDefault();
  const id = document.getElementById('productId').value;
  const product = {
    name: document.getElementById('name').value,
    image: document.getElementById('image').value,
    category: document.getElementById('category').value,
    subcategory: document.getElementById('subcategory').value,
    description: document.getElementById('description').value,
    estimatedCost: document.getElementById('estimatedCost').value,
  };

  try {
    const response = id
      ? await fetch(`${API_BASE_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      : await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
    if (!response.ok) throw new Error('Failed to save product');
    await loadProducts();
    document.getElementById('productForm').reset();
  } catch (error) {
    console.error('Error saving product:', error);
  }
}

async function editProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const product = await response.json();
    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;
    document.getElementById('subcategory').value = product.subcategory;
    document.getElementById('description').value = product.description;
    document.getElementById('estimatedCost').value = product.estimatedCost;
  } catch (error) {
    console.error('Error loading product for edit:', error);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete product');
    await loadProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

document.getElementById('productForm').addEventListener('submit', addOrUpdateProduct);
document.addEventListener('DOMContentLoaded', loadProducts);
