import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  isHalf: true,
  size: window.innerWidth < 600 ? 13 : 25,
};
const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        sx={{ color: "black" }}
        className="productCard"
        to={`/${product?._id}`}
      >
        <img src={product?.images[0]?.url} alt={product?.name} />
        <p>{product?.name}</p>
        <div>
          <Rating value={product.ratings} />
          <span> {product?.reviews?.length} </span>
        </div>
        <span>{product?.price}</span>
      </Link>
    </>
  );
};

export default ProductCard;
