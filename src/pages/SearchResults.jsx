import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom"; // Import NavLink
import { fetchAllProducts } from "../database/getDocuments"; // Adjust the import path

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const allProducts = await fetchAllProducts();

        // Filter products whose title includes the search query (case-insensitive)
        const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(filteredProducts);
      } catch (error) {
        console.error("Error searching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchProducts();
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "{searchQuery}"
      </h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
              {/* Update the "View Details" link */}
              <NavLink
                to={`/details/${item.id}`} // Use dynamic route
                className="text-blue-500 hover:underline"
              >
                View Details
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
