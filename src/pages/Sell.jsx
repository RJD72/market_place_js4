import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

const Sell = () => {
  const { itemId } = useParams(); // For editing an existing item
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronics");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch item data if editing
  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        try {
          const itemDoc = await getDoc(doc(db, "products", itemId));
          if (itemDoc.exists()) {
            const itemData = itemDoc.data();
            setTitle(itemData.title);
            setPrice(itemData.price);
            setDescription(itemData.description);
            setCategory(itemData.category);
            setImage(itemData.image);
          }
        } catch (error) {
          console.error("Error fetching item:", error);
          setError("Failed to load item details.");
        }
      };
      fetchItem();
    }
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        throw new Error("You must be logged in to post an item.");
      }

      const itemData = {
        title,
        price: parseFloat(price),
        description,
        category,
        image,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };

      if (itemId) {
        // Update existing item
        await setDoc(doc(db, "products", itemId), itemData, { merge: true });
      } else {
        // Create new item
        await setDoc(doc(collection(db, "products")), itemData);
      }

      navigate("/profile"); // Redirect to profile page after submission
    } catch (error) {
      console.error("Error submitting item:", error);
      setError("Failed to submit item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {itemId ? "Edit Item" : "Sell Item"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Paste an image URL or leave blank"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : itemId ? "Update Item" : "Post Item"}
        </button>
      </form>
    </div>
  );
};

export default Sell;
