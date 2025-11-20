import { productModel } from "../models/products.model.js";

async function getAllProducts() {
  return await productModel.getProducts();
}

async function getProductById(id) {
  return await productModel.getProductById(id);
}

async function getProductByTitle(name) {
  return await productModel.getProductByTitle(name);
}

async function getProductsByArtist(artist) {
  return await productModel.getProductsByArtist(artist);
}

async function saveProduct(prod) {
  return await productModel.saveProduct(prod);
}

async function updatedProduct(id, prod) {
  return await productModel.updateProduct(id, prod);
}

async function deleteProductById(id) {
  return await productModel.deleteProduct(id);
}

export const prodService = {
  getAllProducts,
  getProductById,
  getProductByTitle,
  getProductsByArtist,
  saveProduct,
  updatedProduct,
  deleteProductById,
};
