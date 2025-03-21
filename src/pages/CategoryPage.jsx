import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../database/getDocuments";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";

const CategoryPage = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        const categoryProducts = await fetchProductsByCategory(category);
        setProducts(categoryProducts);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

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
        <h2 className="text-2xl font-bold mb-4">{category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
              {/* Ensure the "Buy Now" link uses the correct dynamic route */}
              <NavLink to={`/details/${item.id}`}>
                <button className="btn btn-primary mt-2">Buy Now</button>
              </NavLink>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
