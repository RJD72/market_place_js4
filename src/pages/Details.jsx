import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../database/getDocuments";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleContact = () => {
    if (!isLoggedIn) {
      alert("Please sign in to contact the seller.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-gray-500 text-center mt-8">Product not found.</div>
    );
  }

  return (
    <article className="p-4 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline cursor-pointer"
      >
        &larr; Back
      </button>

      <div className="max-w-[1200px] mx-auto mt-24">
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div>
            <img src={product.image} alt={product.title} className="rounded" />
          </div>

          <div className="flex justify-center items-center pr-4">
            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="mt-4">{product.description}</p>
              <p className="mt-2">Price: ${product.price}</p>
              <p className="mt-2">Category: {product.category}</p>

              {/* Contact Seller Section */}
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">Contact Seller:</h2>
                <p>
                  <strong>Name:</strong> {product.sellerName}
                </p>
                <p>
                  <strong>Email:</strong> {product.sellerEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {product.sellerPhone}
                </p>

                <div className="flex gap-4 mt-4">
                  <button
                    className={`p-2 rounded ${
                      isLoggedIn
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (isLoggedIn) {
                        window.location.href = `mailto:${product.sellerEmail}`;
                      } else {
                        handleContact();
                      }
                    }}
                  >
                    Email Seller
                  </button>

                  <button
                    className={`p-2 rounded ${
                      isLoggedIn
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (isLoggedIn) {
                        window.location.href = `tel:${product.sellerPhone}`;
                      } else {
                        handleContact();
                      }
                    }}
                  >
                    Call Seller
                  </button>
                </div>

                {!isLoggedIn && (
                  <p className="mt-2 text-sm text-red-500">
                    You must be signed in to contact the seller.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Details;
