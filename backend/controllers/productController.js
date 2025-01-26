const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');
const products = require(filePath);

let productList = [...products];

function saveProductsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(productList, null, 2));
}

exports.getProducts = (req, res) => res.json(productList);

exports.addProduct = (req, res) => {
  const newProduct = { ...req.body, id: productList.length + 1 };
  productList.push(newProduct);
  saveProductsToFile();
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const index = productList.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Product not found');
  productList[index] = { ...productList[index], ...req.body };
  saveProductsToFile();
  res.json(productList[index]);
};

exports.deleteProduct = (req, res) => {
  const index = productList.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Product not found');
  const deletedProduct = productList.splice(index, 1);
  saveProductsToFile();
  res.json(deletedProduct);
};