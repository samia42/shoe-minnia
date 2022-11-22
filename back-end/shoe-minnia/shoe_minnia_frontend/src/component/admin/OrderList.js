import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
// import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { deleteThisOrder } from "../../actions/deleteMyOrderAction";
import { getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);

  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.singleOrder);

  const { DeletedData } = useSelector((state) => state.delete);

  const deleteOrderHandler = (id) => {
    dispatch(deleteThisOrder(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (DeletedData === true) {
      // navigate("/admin/orders");
      Toast("Order Deleted Successfully", "success");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, DeletedData]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 100, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders?.length > 0 &&
    orders?.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      {isDeleted === true ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div style={{ position: "static" }}>
            <SideBar />
          </div>

          <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderList;
