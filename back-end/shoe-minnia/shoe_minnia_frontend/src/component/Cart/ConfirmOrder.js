import { Typography, Box, Grid, Paper, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./checkoutSteps";
import { Link, useNavigate } from "react-router-dom";
import "./confirmOrder.css";
import { styled } from "@mui/material/styles";

import { Fragment } from "react";
import { Container } from "@mui/system";

function ConfirmOrder({ navigation }) {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;

  const totalPrice = subTotal + tax + shippingCharges;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const PaymentHandler = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <Container>
      <CheckoutSteps activeStep={1} />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <div className="confirmShippingArea">
                <Typography sx={{ color: "#35185a", fontWeight: 600 }}>
                  Shipping Info
                </Typography>
                <div>
                  <p>Name:</p>
                  <span>{user?.name}</span>
                </div>
                <div>
                  <p>phone:</p>
                  <span>{shippingInfo?.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
              <div className="cofirmCartItems">
                <Typography>Your Cart Items</Typography>
                <div className="confirmCartItemContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product} className="cart-items">
                        <img src={item.image} alt="product" />
                        <Link to={`/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X RS {item.price}=
                          <b>RS{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <div className="orderSummary">
              <Typography>Order Summary</Typography>
              <div className="order-summary">
                <div>
                  <p>SubTotal:</p>
                  <span>RS{subTotal}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>RS:{shippingCharges}</span>
                </div>
                <div>
                  <p>GST:</p>
                  <span>RS:{Math.round(tax)}</span>
                </div>
              </div>
              <div className="">
                <p>
                  <b>Total</b>
                  <span>RS :{totalPrice}</span>
                </p>

                <Button sx={{}} onClick={PaymentHandler}>
                  Proceed To Payment
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ConfirmOrder;
