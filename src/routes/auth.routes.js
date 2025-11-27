import express from "express";
import { httpAuthUser, httpCreateUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/login", httpAuthUser);
router.post("/signin", httpCreateUser);

export default router;
