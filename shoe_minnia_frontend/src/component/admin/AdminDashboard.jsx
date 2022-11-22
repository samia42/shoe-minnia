import React from "react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import InfoCard from "./InfoCard";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllOrders } from "../../actions/orderAction";
import { getAdminProducts } from "../../actions/productAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <SideBar />

        <InfoCard name={"Total Ammount"} />
        <InfoCard name={"All Products"} data={products && products.length} />
        <InfoCard name={"All Orders"} data={orders && orders.length} />
        <InfoCard name={"All Users"} />
      </Box>
    </>
  );
};

export default AdminDashboard;
