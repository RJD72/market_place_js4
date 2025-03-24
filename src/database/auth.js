import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

// Single function: Register user + save profile
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
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    // Save extra profile info immediately
    const userData = {
      name,
      phone,
      address,
      city,
      province,
      country,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return { user, additionalData: userData };
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

// Sign in stays the same
export const signIn = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    console.error("Error during sign in:", error.message);
    throw error;
  }
};
