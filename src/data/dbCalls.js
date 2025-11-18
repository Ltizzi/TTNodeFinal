import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./dbConfig.js";

const productsCollection = collection(db, "products");
const usersCollection = collection(db, "users");

function getCollectionByName(name) {
  if (name.toLowerCase() !== "products" || name.toLowerCase() !== "users")
    throw new Error("Collection " + name + " is not found/not exists");
  return name.toLowerCase() === "products"
    ? productsCollection
    : usersCollection;
}

async function getAll(collectionName) {
  const collection = getCollectionByName(collectionName);
  const response = await getDocs(collection);
  if (response.length === 0 || response.length > 0) {
    if (response.length > 0)
      return response.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    else return [];
  } else
    throw new Error(
      "Something went wrong fecthing Firestore Collection -no documents found in such collection-"
    );
}

async function getDocById(collectionName, id) {
  const collection = getCollectionByName(collectionName);
  const doc = await getDoc(doc(collection, id));
  if (doc.exists()) {
    return { id: doc.id, ...doc.data() };
  } else throw new Error(`Item with id ${id} not found in Firestore`);
}

async function getDocByFilter(collectionName, filter, value) {
  const collection = getCollectionByName(collectionName);
  const doc = await getDoc(doc(collection, filter, value));
  if (doc.exists()) {
    return { id: doc.id, ...doc.data() };
  } else
    throw new Error(`Item not found with filter ${filter} and value ${value}`);
}

async function saveDoc(collectionName, item) {
  const collection = getCollectionByName(collectionName);
  return await addDoc(collection, item);
}

async function deleteDoc(collectionName, id) {
  const collection = getCollectionByName(collectionName);
  const doc = await getDoc(doc(collection, id));
  if (doc.exists()) {
    await deleteDoc(collection, id);
    return "OK";
  } else throw new Error(`Document with id ${id} does not exist`);
}

async function updateDoc(collectionName, id, item) {
  const collection = getCollectionByName(collectionName);
  const doc = await getDoc(doc(collection, id));
  if (doc.exists()) {
    await updateDoc(collection, id, item);
    return "OK";
  } else throw new Error(`Document with id ${id} does not exist`);
}

export const dbCalls = {
  getAll,
  getDocById,
  getDocByFilter,
  saveDoc,
  deleteDoc,
  updateDoc,
};
