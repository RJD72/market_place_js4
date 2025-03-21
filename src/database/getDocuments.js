/* eslint-disable no-unused-vars */
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "../database/firebaseConfig";

/**
 * Fetch all unique categories from the products collection.
 * @returns {Promise<string[]>} - A list of unique categories.
 */
export const fetchCategories = async () => {
  try {
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);

    const categories = new Set();
    querySnapshot.forEach((doc) => {
      const category = doc.data().category;
      if (category) {
        categories.add(category);
      }
    });

    return Array.from(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

/**
 * Fetch products by category.
 * @param {string} category - The category to filter by.
 * @param {number} limitNumber - The maximum number of items to fetch (default: 4).
 * @returns {Promise<Array<{ id: string, [key: string]: any }>>} - A list of products.
 */
export const fetchProductsByCategory = async (category, limitNumber = 4) => {
  try {
    const q = query(
      collection(db, "items"),
      where("category", "==", category),
      // orderBy("createdAt", "desc"),
      limit(limitNumber)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No products found in category: ${category}`);
      return [];
    }

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error(
      `Error fetching products in category ${category}:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch all products from the Firestore collection.
 * @returns {Promise<Array<{ id: string, [key: string]: any }>>} - A list of all products.
 */
export const fetchAllProducts = async () => {
  try {
    const q = query(
      collection(db, "items")
      // orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No products found in the database.");
      return [];
    }

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
};

/**
 * Fetch a single product by ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<{ id: string, [key: string]: any }>} - The product data.
 */
export const fetchProductById = async (id) => {
  try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw error;
  }
};
