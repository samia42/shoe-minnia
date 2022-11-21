import React from "react";

import { addItemsToCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import "./cart.css";
import image from "../../images/Profile.png";
import { Button } from "@mui/material";
function cartItem({ item, deleteCartItems }) {
  console.log(item)
  return (
    <div className="cartItemCard">
      <img src={item.image} />
      <div className="item-name">
        <Link to={`/${item.product}`}>{item.name}</Link>
        <span>{`Price Rs${item.price}`} </span>
        <Button varient="outlined" onClick={() => deleteCartItems(item.product)}>Remove</Button>
      </div>
    </div>
  );
}

export default cartItem;
