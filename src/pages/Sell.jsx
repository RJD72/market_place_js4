import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchProductById, fetchUserProfile } from "../database/getDocuments";
import { addOrUpdateProduct } from "../database/addDocuments";

const Sell = () => {
  const { id } = useParams();
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

  // Load existing product when editing
  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (id) {
          const product = await fetchProductById(id);
          setTitle(product.title);
          setPrice(product.price);
          setDescription(product.description);
          setCategory(product.category);
          setImage(product.image);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load item.");
      }
    };

    loadProduct();
  }, [id]);

  // Handle image upload (Base64 conversion)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) throw new Error("You must be logged in.");

      // Fetch user's profile info
      const profileData = await fetchUserProfile(user.uid);

      const itemData = {
        title,
        price: parseFloat(price),
        description,
        category,
        image,
        userId: user.uid,
        sellerName: profileData.name,
        sellerEmail: profileData.email,
        sellerPhone: profileData.phone,
        createdAt: new Date().toISOString(),
      };

      await addOrUpdateProduct(id, itemData);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError("Failed to submit item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Item" : "Sell Item"}
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
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : id ? "Update Item" : "Post Item"}
        </button>
      </form>
    </div>
  );
};

export default Sell;
