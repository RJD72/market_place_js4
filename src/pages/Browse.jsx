import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchCategories, fetchAllProducts } from "../database/getDocuments";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";

const Browse = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar categories={categories} />
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
              <NavLink
                to="/details"
                state={{ id: item.id }} // Pass the product ID
              >
                <button className="btn btn-primary mt-2">Buy Now</button>
              </NavLink>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;
