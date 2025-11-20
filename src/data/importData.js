import fs from "fs";
import { db } from "./dbConfig.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeBatch, doc, collection } from "firebase/firestore";

//script utilizado para importar la lista de productos usada en el curso React para el proyecto final

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function importData() {
  const filepath = join(__dirname, "./albums175.json");
  const data = fs.readFileSync(filepath, "utf-8");
  const items = JSON.parse(data);

  const batch = writeBatch(db);
  console.log("Procesando...\n\n");
  items.forEach((obj) => {
    console.log("Album: " + obj.title);
    console.log("Artist: " + obj.artist + "\n\n");

    delete obj.id;
    const ref = doc(collection(db, "products"));
    batch.set(ref, obj);
  });

  await batch.commit();
  console.log("Importación completa.");
}
