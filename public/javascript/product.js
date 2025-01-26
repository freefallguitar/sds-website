const API_BASE_URL = "http://localhost:5000/api/products";

// Get product ID from URL
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log("Fetched Product ID:", id); // Debugging info
  return id;
}

// Fetch and display product details
async function loadProductDetails() {
  const productId = getProductIdFromURL();
  if (!productId) {
    console.error("Product ID not found in URL");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");
    const product = await response.json();
    console.log("Fetched Product Data:", product); // Debugging info
    renderProductDetails(product);
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

// Render product details to the page
function renderProductDetails(product) {
  const productContainer = document.getElementById("productDetails");
  if (!productContainer) {
    console.error("Product details container not found");
    return;
  }

  // Debugging: Check image path before rendering
  console.log("Product Image Path:", product.image);

  // Handle product image as a single string
  productContainer.innerHTML = `
    <div class="product-wrapper">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='/public/images/default-image.jpg';" />
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Subcategory:</strong> ${product.subcategory}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Estimated Cost:</strong> $${product.estimatedCost}</p>
      </div>
    </div>
  `;
}

// Initialize product page functionality
function initProductPage() {
  loadProductDetails();
}

document.addEventListener("DOMContentLoaded", initProductPage);
