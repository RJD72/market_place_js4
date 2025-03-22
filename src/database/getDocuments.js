import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Fetch categories
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

// Fetch products by category
export const fetchProductsByCategory = async (category, limitNumber = 4) => {
  try {
    const q = query(
      collection(db, "items"),
      where("category", "==", category),
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

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No products found.");
      return [];
    }

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

// Fetch single product
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

// Fetch logged-in user's profile info
export const fetchUserProfile = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    throw error;
  }
};

// Fetch items posted by logged-in user
export const fetchUserItems = async (userId) => {
  try {
    const q = query(collection(db, "items"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userItems = [];
    querySnapshot.forEach((doc) => {
      userItems.push({ id: doc.id, ...doc.data() });
    });

    return userItems;
  } catch (error) {
    console.error("Error fetching user items:", error.message);
    throw error;
  }
};
