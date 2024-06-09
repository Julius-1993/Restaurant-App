import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Cards = ({ item }) => {
  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };
  return (
    <div className="card sm:w-15  bg-base-100 shadow-xl gap-4 relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-success ${
          isHeartFillted ? "text-rose-400" : ""
        }`}
      >
        <FaHeart
          className="h-5 w-5, cursor-pointer "
          onClick={handleHeartClick}
        />
      </div>
      <Link to={`/menu/&#8358;{item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/&#8358;{item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between item-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red-500">&#8358;</span>
            {item.price}
          </h5>
          <button className="btn bg-success text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;