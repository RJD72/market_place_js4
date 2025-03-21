import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../database/getDocuments";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        const productsByCategory = {};
        for (const category of categories) {
          const products = await fetchProductsByCategory(category, 4);
          productsByCategory[category] = products;
        }
        setCategoryProducts(productsByCategory);
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
    <main className="min-h-screen p-4">
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryProducts[category]?.map((item) => (
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
        </div>
      ))}
    </main>
  );
};

export default Home;
