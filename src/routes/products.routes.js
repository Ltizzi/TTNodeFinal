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
import { isAdmin, authenticate } from "../utils/jwtUtils.js";

const router = express.Router();

router.get("/", authenticate, httpGetAllProducts);
router.get("/byArtist", authenticate, httpGetProductsByArtist);
router.get("/byTitle", authenticate, httpGetProductByName);
router.get("/:id", authenticate, httpGetProductById);

router.post("/create", authenticate, isAdmin, httpCreateProduct);
router.delete("/:id", authenticate, isAdmin, httpDeleteProduct);
router.patch("/:id", authenticate, isAdmin, httpUpdateProduct);

export default router;
