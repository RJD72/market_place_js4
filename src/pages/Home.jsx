import { useEffect, useState } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { fetchDocuments } from "../database/getDocuments";

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [sports, setSports] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        // Fetch all data in parallel
        const [featured, vehicles, sports] = await Promise.all([
          fetchDocuments("featuredProducts", 4),
          fetchDocuments("vehicles", 4),
          fetchDocuments("sports", 4),
        ]);

        setFeaturedItems(featured);
        setVehicles(vehicles);
        setSports(sports);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success/error
      }
    };

    loadAll();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <main className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredItems.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vehicles.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sports.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
