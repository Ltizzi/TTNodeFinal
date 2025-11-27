import { dbCalls } from "../data/dbCalls.js";

async function getProducts() {
  return await dbCalls.getAll("products");
}

async function getProductById(id) {
  if (!id) throw new Error("Bad Request. Id can't be undefined or null.");
  return await dbCalls.getDocById("products", id);
}

async function getProductsByArtist(artist) {
  if (!artist)
    throw new Error("Bad Request. Artist can't be undefined or null.");
  return await dbCalls.getDocByFilter("products", "artist", artist);
}

async function getProductByTitle(name) {
  if (!name) throw new Error("Bad Rquest. Title can't be undefined or null.");
  return await dbCalls.getDocByFilter("products", "title", name);
}

async function saveProduct(product) {
  return await dbCalls.saveDocument("products", product);
}

async function updateProduct(id, updatedProduct) {
  if (!id) throw new Error("Bad Request. Id can't be undefined or null.");
  return await dbCalls.updateDocument("products", id, updatedProduct);
}

async function deleteProduct(id) {
  if (!id) throw new Error("Bad Request. Id can't be undefined or null.");
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
