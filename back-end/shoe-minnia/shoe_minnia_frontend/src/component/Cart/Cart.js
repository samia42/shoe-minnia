import React, { Fragment, useState } from "react";
import CartItem from "./cartItem";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";
// import { Toast } from "react-toastify/dist/components";

function Cart(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems)
  

  // const increaseQuantity = (id, quantity, stock) => {
  //   const newQty = quantity + 1;
  //   if (stock <= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  // const decreaseQuantity = (id, quantity) => {
  //   const newQty = quantity - 1;
  //   if (1 >= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  const redirect = location.search ? location.search.split("=")[1] : "";

  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // const result = cartItems.reduce(getSum, 0);
  // function getSum(total, num) {
  //   return total + parseInt(num.price);
  // }

  const cartHandler = () => {
    navigate("/login?redirect=shipping");
    // if (isAuthenticated) {
    //   navigate("/shipping");
    // } else {
    //   // Toast("first login ", "success");
    //   navigate("/login");
    // }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="no-cart-item">
          <RemoveShoppingCartIcon
            style={{ color: cartItems.length ? "red" : "unset" }}
          />
          <p>No Item in Cart</p>
          <Link to="/products">view Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <Typography>Product</Typography>
              <Typography>Quantity</Typography>
              <Typography>Sub Total</Typography>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItem item={item}  deleteCartItems={deleteCartItem} />
                  <div className="cartInput">
                    {console.log(item.quantity)}
                    <Typography variant="h6" >
                      {item?.quantity}
                    </Typography>
                  </div>
                  <Typography className="cartSubtotal">
                    {`RS: ${item.price * item.quantity}`}
                  </Typography>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <Typography>Gross Total</Typography>
                <Typography>
                  {`Rs:${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                  `}
                </Typography>
              </div>
              <div></div>
              <div className="checkOutButton">
                <Button onClick={cartHandler}>check out</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default Cart;
