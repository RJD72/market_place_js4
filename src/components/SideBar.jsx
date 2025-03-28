import { NavLink } from "react-router-dom";

const Sidebar = ({ categories }) => {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <NavLink
              to={`/category/${category}`}
              className="text-blue-500 hover:underline"
            >
              {capitalize(category)}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
