import { prodService } from "../services/products.service.js";

export async function httpGetAllProducts(req, res) {
  try {
    const products = await prodService.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpGetProductById(req, res) {
  try {
    const id = req.query.id;
    const product = await prodService.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpGetProductByName(req, res) {
  try {
    const name = req.query.name;
    const product = await prodService.getProductByName(name);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpGetProductsByArtist(req, res) {
  try {
    const artist = req.query.artist;
    const products = await prodService.getProductsByArtist(artist);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpCreateProduct(req, res) {
  try {
    const prod = req.body;
    const res = await prodService.saveProduct(prod);
    return res.status(200).json(res);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpDeleteProduct(req, res) {
  try {
    const id = req.query.id;
    const res = await prodService.deleteProductById(id);
    if (res === "OK") return res.status(200).json("OK");
    else throw new Error("Something went wrong, " + res.message);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpUpdateProduct(req, res) {
  try {
    const id = req.query.id;
    const prod = req.body;
    const res = await prodService.updatedProduct(id, prod);
    if (res === "OK") return res.status(200).json(prod);
    else throw new Error("Something went wrong, " + res.message);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}
