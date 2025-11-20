import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./dbConfig.js";

const productsCollection = collection(db, "products");
const usersCollection = collection(db, "users");

function getCollectionByName(name) {
  if (name === "products") return productsCollection;
  if (name === "users") return usersCollection;
  throw new Error(`Collection '${name}' does not exist`);
}

async function getAll(collectionName) {
  const collection = getCollectionByName(collectionName);
  const response = await getDocs(collection);

  if (response.empty) return [];

  return response.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function getDocById(collectionName, id) {
  const collection = getCollectionByName(collectionName);
  const response = await getDoc(doc(collection, id));

  if (response.exists()) {
    return { id: response.id, ...response.data() };
  } else throw new Error(`Item with id ${id} not found in Firestore`);
}

async function getDocByFilter(collectionName, filter, value) {
  const collection = getCollectionByName(collectionName);
  const response = await getDocs(collection);
  if (response.empty) {
    throw new Error(`Item not found with filter ${filter} and value ${value}`);
  }
  return response.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((item) => {
      if (
        typeof item[filter] === "string" &&
        item[filter].toLowerCase().includes(value)
      )
        return item;
    });

  // .map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }))
  // .filter((item) => item[filter].includes(value));
}

async function saveDocument(collectionName, item) {
  const collection = getCollectionByName(collectionName);
  const res = await addDoc(collection, item);
  const newProduct = await getDoc(res);
  if (!newProduct.exists()) {
    throw new Error("Something went wrong creating new product");
  }
  return { id: newProduct.id, ...newProduct.data() };
}

async function deleteDocument(collectionName, id) {
  const collection = getCollectionByName(collectionName);
  const docRef = doc(collection, id);
  const response = await getDoc(docRef);
  if (!response.exists()) {
    throw new Error(`Document with id ${id} does not exist`);
  }
  await deleteDoc(docRef, id);
  return "OK";
}

async function updateDocument(collectionName, id, item) {
  const collection = getCollectionByName(collectionName);

  const docRef = doc(collection, id);

  const response = await getDoc(docRef);
  if (!response.exists()) {
    throw new Error(`Document with id ${id} does not exist`);
  }
  await updateDoc(docRef, item);
  return "OK";
}

export const dbCalls = {
  getAll,
  getDocById,
  getDocByFilter,
  saveDocument,
  deleteDocument,
  updateDocument,
};
