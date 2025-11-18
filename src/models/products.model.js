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

async function getProductByName(name) {
  return await dbCalls.getDocByFilter("products", "name", name);
}

async function saveProduct(product) {
  const res = await dbCalls.saveDoc("products", product);
  return { id: res.id, ...res.data() };
}

async function updateProduct(id, updatedProduct) {
  return await dbCalls.updateDoc("products", id, updatedProduct);
}

async function deleteProduct(id) {
  return await dbCalls.deleteDoc("products", id);
}

export const productModel = {
  getProducts,
  getProductById,
  getProductByName,
  getProductsByArtist,
  saveProduct,
  updateProduct,
  deleteProduct,
};
