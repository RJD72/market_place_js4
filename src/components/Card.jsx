import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <NavLink to={`/details/${item.id}`}>
            <button className="btn btn-primary">Buy Now</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
