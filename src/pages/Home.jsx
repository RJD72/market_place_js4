import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../database/getDocuments";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router-dom";
import Card from "../components/Card";

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

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <main className="min-h-screen p-4">
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl text-center font-bold mb-4">
            {capitalize(category)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryProducts[category]?.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Home;
