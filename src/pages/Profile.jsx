import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchUserItems } from "../database/getDocuments";
import { deleteProduct } from "../database/addDocuments";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user profile info
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (!user) throw new Error("You must be logged in.");

        const data = await fetchUserProfile(user.uid);
        setUserData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load profile info.");
      }
    };

    loadUserProfile();
  }, [user]);

  // Fetch user's items
  useEffect(() => {
    const loadUserItems = async () => {
      try {
        if (!user) throw new Error("You must be logged in.");

        const items = await fetchUserItems(user.uid);
        setItems(items);
      } catch (error) {
        console.error(error);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    loadUserItems();
  }, [user]);

  // Handle Delete
  const handleDelete = async (itemId) => {
    try {
      confirm("Are you sure you want to delete this item?");
      await deleteProduct(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error);
      setError("Failed to delete item.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      {userData && (
        <div className="mb-6 border p-4 rounded-lg bg-gray-50">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}, {userData.city},{" "}
            {userData.province}, {userData.country}
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/sell")}
        className="bg-green-500 text-white p-2 rounded mb-8"
      >
        Sell an Item
      </button>

      <h3 className="text-xl font-bold mb-4">Your Items for Sale</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg bg-white shadow-md"
            >
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600">${item.price}</p>
              <p className="text-sm line-clamp-3">{item.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => navigate(`/sell/${item.id}`)}
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
