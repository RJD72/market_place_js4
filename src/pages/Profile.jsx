import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!user) {
          throw new Error("You must be logged in to view your profile.");
        }

        const q = query(
          collection(db, "products"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const userItems = [];
        querySnapshot.forEach((doc) => {
          userItems.push({ id: doc.id, ...doc.data() });
        });

        setItems(userItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to load your items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user]);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "products", itemId));
      setItems(items.filter((item) => item.id !== itemId)); // Remove deleted item from state
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <p className="mb-4">Welcome, {user?.email}!</p>

      <h3 className="text-xl font-bold mb-4">Your Items for Sale</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600">${item.price}</p>
              <p className="text-sm">{item.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => navigate(`/sell/${item.id}`)} // Navigate to edit page
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no items for sale.</p>
      )}
    </div>
  );
};

export default Profile;
