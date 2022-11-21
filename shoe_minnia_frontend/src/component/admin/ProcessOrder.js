import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Typography, Button, Box, Paper, Grid } from "@mui/material";
import SideBar from "./SideBar";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import {
  getOrdersDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import Toast from "../Toast/Toast";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const navigate = useNavigate();
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.singleOrder
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();
  const params = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      Toast(error, "error");
      dispatch(clearErrors());
    }
    if (updateError) {
      Toast(updateError, "error");
      dispatch(clearErrors());
    }
    if (isUpdated === true) {
      Toast("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrdersDetails(params.id));
  }, [dispatch, Toast, params.id, updateError, isUpdated === true]);

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={order.orderStatus === "Delivered" ? 12 : 8}>
                    <Item>
                      {" "}
                      <div>
                        <div className="confirmshippingArea">
                          <Typography>Shipping Info</Typography>
                          <div className="orderDetailsContainerBox">
                            <div>
                              <p>Name:</p>
                              <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                              <p>Phone:</p>
                              <span>
                                {order.shippingInfo &&
                                  order.shippingInfo.phoneNo}
                              </span>
                            </div>
                            <div>
                              <p>Address:</p>
                              <span>
                                {order.shippingInfo &&
                                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                              </span>
                            </div>
                          </div>
                          <div className="payment">
                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                              <p>PAID</p>

                              <div>
                                <p>Amount:</p>
                                <span>
                                  {order.totalPrice && order.totalPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="orders-status">
                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                              <div>
                                <p
                                  className={
                                    order.orderStatus &&
                                    order.orderStatus === "Delivered"
                                      ? "greenColor"
                                      : "redColor"
                                  }
                                >
                                  {order.orderStatus && order.orderStatus}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="confirmCartItems">
                          <Typography>Your Cart Items:</Typography>
                          <div className="confirmCartItemsContainer">
                            {order.orderItems &&
                              order.orderItems.map((item) => (
                                <div key={item.product} className="cart-items">
                                  <div>
                                    <img src={item.image} alt="Product" />
                                  </div>
                                  <div>
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>{" "}
                                    <span>
                                      {item.quantity} X RS {item.price} ={" "}
                                      <b>RS {item.price * item.quantity}</b>
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={order.orderStatus === "Delivered" ? 0 : 4}>
                    <Item>
                      {" "}
                      <div
                        className=""
                        style={{
                          display:
                            order.orderStatus === "Delivered"
                              ? "none"
                              : "block",
                        }}
                      >
                        <form
                          className="updateOrderForm"
                          onSubmit={updateOrderSubmitHandler}
                        >
                          <h1>Process Order</h1>

                          <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setStatus(e.target.value)}>
                              <option value="">Choose Category</option>
                              {order.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                              )}

                              {order.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                              )}
                            </select>
                          </div>

                          <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                              loading
                                ? true
                                : false || status === ""
                                ? true
                                : false
                            }
                          >
                            Process
                          </Button>
                        </form>
                      </div>
                    </Item>
                  </Grid>
                </Grid>
              </Box>

              {/* <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >

              </div> */}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
