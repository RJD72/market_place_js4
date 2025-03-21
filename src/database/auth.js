import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const auth = getAuth();

/**
 * Register a new user with email and password, and save their details to Firestore.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} name - The user's full name.
 * @param {string} phone - The user's phone number.
 * @param {string} address - The user's address.
 * @param {string} city - The user's city.
 * @param {string} province - The user's province/state.
 * @param {string} country - The user's country.
 * @returns {Promise<{ user: object, additionalData: object }>} - The user credentials and additional user data.
 * @throws {Error} - Throws an error if registration or Firestore operation fails.
 */
export const registerUser = async (
  email,
  password,
  name,
  phone,
  address,
  city,
  province,
  country
) => {
  try {
    // Step 1: Create the user with email and password
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    // Step 2: Save additional user details to Firestore
    const userData = {
      name,
      phone,
      address,
      city,
      province,
      country,
      email,
      uid: user.uid,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    // Step 3: Return the user credentials and additional data
    return { user, additionalData: userData };
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error; // Re-throw the error for handling in the calling component
  }
};

/**
 * Sign in a user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - The user credentials.
 * @throws {Error} - Throws an error if sign-in fails.
 */
export const signIn = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Optionally, you can return the entire userCredentials object
    return userCredentials;
  } catch (error) {
    console.error("Error during sign in:", error.message);
  }
};
