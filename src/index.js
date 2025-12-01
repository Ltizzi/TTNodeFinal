import http from "http";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.API_PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}...`);
});

// export default function handler(req, res) {
//   app(req, res);
// }
