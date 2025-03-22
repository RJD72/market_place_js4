import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useParams
import { fetchProductById } from "../database/getDocuments"; // Adjust the import path
import Spinner from "../components/Spinner";

const Details = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error("Product ID is missing.");
        }

        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error.message);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-gray-500 text-center mt-8">
        Product not found. Please go back and try again.
      </div>
    );
  }

  return (
    <article className="p-4 min-h-screen">
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-4 text-blue-500 hover:underline cursor-pointer"
      >
        &larr; Back
      </button>
      <div className="max-w-[1200px] mx-auto mt-24">
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Product Details */}
          <div className="">
            <img src={product.image} alt={product.title} className="rounded" />
          </div>
          <div className="flex justify-center items-center pr-4">
            <div className="">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="mt-4">{product.description}</p>
              <p className="mt-2">Price: ${product.price}</p>
              <p className="mt-2">Category: {product.category}</p>
              <div className="mt-4">
                <button>Contact Seller</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Details;
