import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../database/getDocuments";
import Spinner from "../components/Spinner";
import Sidebar from "../components/SideBar";
import Card from "../components/Card";

const CategoryPage = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="flex relative">
      {/* Hamburger Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-20 bg-blue-500 text-white p-2 rounded"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:block`}
      >
        <Sidebar categories={categories} />

        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 bg-red-500 text-white p-1 rounded"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {capitalize(category)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
