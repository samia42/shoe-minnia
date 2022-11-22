import React from "react";
import { CreditCard, EventIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input, Button, Container, Box, Typography } from "@mui/material";
import "./payment.css";
import axios from "axios";
import { useEffect, useRef } from "react";
import { clearErrors, createOrder } from "../../actions/orderAction";

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const { state } = useLocation();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: state.totalPrice,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    user,

    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      dispatch(createOrder(order));
      navigate("/success");
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearErrors);
    }
  });

  return (
    <Container
      sx={{
        display: "flex",
        margin: "auto",
        width: "100vw",

        justifyContent: "center",
        marginTop: "2vmax",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          //   alignContent: "center",
          //   backgroundColor: "primary.dark",
        }}
      >
        <div className="payment-outer">
          <Typography>Payment</Typography>

          <div
            className="payment-elements"
            style={{
              display: "flex",
              alignItems: "center",
              //   alignContent: "center",
            }}
          >
            <CreditCard sx={{ marginTop: "10px", paddingRight: "10px" }} />
            <Input
              placeholder="Price of Product"
              value={state.totalPrice}
              sx={{ width: "100vw" }}
            />
          </div>

          <Button variant="contained" onClick={submitHandler} ref={payBtn}>
            Pay
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default Payment;
