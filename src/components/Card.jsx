import { NavLink } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={item.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="line-clamp-3">{item.description}</p>
        <div className="card-actions">
          <NavLink to={`/details/${item.id}`}>
            <p className="text-blue-500 hover:underline mt-2">View Details</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
