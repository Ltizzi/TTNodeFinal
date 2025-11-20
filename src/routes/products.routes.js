import express from "express";
import {
  httpCreateProduct,
  httpDeleteProduct,
  httpGetAllProducts,
  httpGetProductById,
  httpGetProductByName,
  httpGetProductsByArtist,
  httpUpdateProduct,
} from "../controller/products.controller.js";

const router = express.Router();

router.get("/", httpGetAllProducts);
router.get("/byArtist", httpGetProductsByArtist);
router.get("/byTitle", httpGetProductByName);
router.get("/:id", httpGetProductById);

router.post("/create", httpCreateProduct);
router.delete("/:id", httpDeleteProduct);
router.patch("/:id", httpUpdateProduct);

export default router;
