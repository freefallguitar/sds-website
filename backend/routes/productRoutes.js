const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Fetch all products
router.get('/', (req, res) => {
  res.json(products);
});

// Fetch a single product by ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// Add a new product
router.post('/', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

module.exports = router;
