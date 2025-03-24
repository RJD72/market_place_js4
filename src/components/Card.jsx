import { NavLink } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="shadow-sm">
      <div
        key={item.id}
        className="border p-4 rounded h-full flex flex-col justify-evenly"
      >
        <img src={item.image} alt={item.title} className="rounded max-h-48" />
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="line-clamp-3">{item.description}</p>
        <NavLink to={`/details/${item.id}`}>
          <p className="text-blue-500 hover:underline mt-2">View Details</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
