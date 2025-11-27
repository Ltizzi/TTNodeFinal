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
import { isAdmin, isAuth } from "../utils/jwtUtils.js";

const router = express.Router();

router.get("/", isAuth, httpGetAllProducts);
router.get("/byArtist", isAuth, httpGetProductsByArtist);
router.get("/byTitle", isAuth, httpGetProductByName);
router.get("/:id", isAuth, httpGetProductById);

router.post("/create", isAuth, isAdmin, httpCreateProduct);
router.delete("/:id", isAuth, isAdmin, httpDeleteProduct);
router.patch("/:id", isAuth, isAdmin, httpUpdateProduct);

export default router;
