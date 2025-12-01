import express from "express";
import productRouter from "./routes/products.routes.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import "dotenv/config";
//import { importData } from "./data/importData.js";

const app = express();

// Middlewares

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    methods: ["GET", "POST", "PATCH", "PULL", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Req: " + `${req.method} ${req.url}`);
  next();
});
app.use("/auth", authRouter);
app.use("/products", productRouter);

//este endpoint fue utilizado para importar la base de datos de un json a firestore
//app.get("/import", importData);

app.use((req, res) => {
  res.status(404).json("<h1>INVALID ROUTE!</h1>");
});

export default app;
