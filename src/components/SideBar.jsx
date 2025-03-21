import { NavLink } from "react-router-dom";

const Sidebar = ({ categories }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <NavLink
              to={`/category/${category}`}
              className="text-blue-500 hover:underline"
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
