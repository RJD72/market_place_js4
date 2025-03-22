import { db } from "./firebaseConfig";
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";

// Add or update a product
export const addOrUpdateProduct = async (itemId, itemData) => {
  try {
    if (itemId) {
      await setDoc(doc(db, "items", itemId), itemData, { merge: true });
    } else {
      const newDocRef = doc(collection(db, "items"));
      await setDoc(newDocRef, itemData);
    }
  } catch (error) {
    console.error("Error adding/updating product:", error.message);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (itemId) => {
  try {
    await deleteDoc(doc(db, "items", itemId));
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};

// Save user profile data after registration
export const registerUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.error("Error saving user profile:", error.message);
    throw error;
  }
};
