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
    const { id } = req.params;
    const product = await prodService.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpGetProductByName(req, res) {
  try {
    const name = req.query.title;
    const product = await prodService.getProductByTitle(name);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpGetProductsByArtist(req, res) {
  try {
    const artist = req.query.artist;
    const products = await prodService.getProductsByArtist(artist);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpCreateProduct(req, res) {
  try {
    const prod = req.body;
    const response = await prodService.saveProduct(prod);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpDeleteProduct(req, res) {
  try {
    const { id } = req.params;
    const response = await prodService.deleteProductById(id);
    if (response === "OK") return res.status(200).json("OK");
    else throw new Error("Something went wrong, " + res.message);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export async function httpUpdateProduct(req, res) {
  try {
    const { id } = req.params;
    const prod = req.body;
    const response = await prodService.updatedProduct(id, prod);
    if (response === "OK") return res.status(200).json(prod);
    else throw new Error("Something went wrong, " + res.message);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}
