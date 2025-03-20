import { useParams } from "react-router-dom";
import React from "react";

const Details = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Details Page</h1>
      <p>Id: {id}</p>
    </div>
  );
};

export default Details;
