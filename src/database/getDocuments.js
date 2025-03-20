import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

/**
 * 🔥 Generic Function: Fetch documents with options
 * @param {string} collectionName - The name of the Firestore collection to fetch documents from.
 * @param {string} [orderByField="createdAt"] - The field to order the documents by.
 * @param {number} [limitNumber=4] - The maximum number of documents to fetch.
 * @returns {Promise<Array<{ id: string, [key: string]: any }>>} - A promise that resolves to an array of documents.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchDocuments = async (collectionName, limitNumber = 4) => {
  try {
    const q = query(collection(db, collectionName), limit(limitNumber));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No documents found in collection: ${collectionName}`);
      return [];
    }

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error(
      `Error fetching documents from ${collectionName}:`,
      error.message
    );
    throw new Error(`Failed to fetch documents: ${error.message}`);
  }
};
