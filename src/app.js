import express from "express";
import productRouter from "./routes/products.routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Middlewares

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PULL", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Req: " + `${req.method} ${req.url}`);
  next();
});

app.use("/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

app.get("/", (_req, res) => {
  res.send("Hola Mundo desde Express + JavaScript");
});

export default app;
