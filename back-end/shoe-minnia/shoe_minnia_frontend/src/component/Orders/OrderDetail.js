import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearErrors, getOrdersDetails } from "../../actions/orderAction";
import "./order.css";

function OrderDetail(props) {
  const location = useParams();

  const navigate = useNavigate();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (error)
    // {
    //   alert(error)
    //   dispatch(clearErrors())
    // }
    dispatch(getOrdersDetails(location.id));
  }, [dispatch]);

  return (
    <Container className="order-detail-container">
      <Box className="order-heading">
        <Typography>Order Id #{order?._id}</Typography>
      </Box>
      <Box className="shipping-info">
        <Typography>Shipping Info</Typography>
        <div></div>
        <Typography>Address: {order?.shippingInfo?.address}</Typography>
        <Typography>City: {order?.shippingInfo?.city}</Typography>
        <Typography>State: {order?.shippingInfo?.state}</Typography>
        <Typography>Phone No: {order?.shippingInfo?.phoneNo}</Typography>
      </Box>
      <Box className="shipping-info">
        <Typography>Order Status</Typography>
        <Typography>{order?.orderStatus}</Typography>
      </Box>
      <Typography className="order-item">Ordered Items</Typography>
      <Box className="order-item">
        {order?.orderItems &&
          order?.orderItems.map((item) => (
            <>
              <Typography>Product Name: {item.name}</Typography>
              <Typography>{item.price}</Typography>
              <div className="item-image">
                <img src={item.image} alt="image" />
              </div>
            </>
          ))}
      </Box>
      <Box className="price">
        <Typography>Total Price</Typography>
        {order?.totalPrice}
        <Typography
          sx={{ marginTop: "40px", textAlign: "center", color: "#bb84e8" }}
        >
          Thank you for your purchase
        </Typography>
      </Box>
    </Container>
  );
}

export default OrderDetail;
