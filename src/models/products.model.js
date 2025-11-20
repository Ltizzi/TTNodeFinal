import { dbCalls } from "../data/dbCalls.js";

async function getProducts() {
  return await dbCalls.getAll("products");
}

async function getProductById(id) {
  return await dbCalls.getDocById("products", id);
}

async function getProductsByArtist(artist) {
  return await dbCalls.getDocByFilter("products", "artist", artist);
}

async function getProductByTitle(name) {
  return await dbCalls.getDocByFilter("products", "title", name);
}

async function saveProduct(product) {
  return await dbCalls.saveDocument("products", product);
}

async function updateProduct(id, updatedProduct) {
  return await dbCalls.updateDocument("products", id, updatedProduct);
}

async function deleteProduct(id) {
  return await dbCalls.deleteDocument("products", id);
}

export const productModel = {
  getProducts,
  getProductById,
  getProductByTitle,
  getProductsByArtist,
  saveProduct,
  updateProduct,
  deleteProduct,
};
