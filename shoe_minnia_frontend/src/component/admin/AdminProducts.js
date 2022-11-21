import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import { Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import {Delete,Edit} from "@mui/icons-material";
import SideBar from "./SideBar";
import { Box } from "@mui/system";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const navigate= useNavigate();

  const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

//   const deleteProductHandler = (id) => {
//     // dispatch(deleteProduct(id));
//   };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   Toast("Product Deleted Successfully",'success');
    //   navigate("/admin/dashboard");
    // dispatch({ type: DELETE_PRODUCT_RESET });
    // }
    dispatch(getAdminProducts());
    console.log(products)
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit/>
            </Link>

            <Button
            //   onClick={() =>
            //     deleteProductHandler(params.getValue(params.id, "id"))
            //   }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>

        
        <Box
         sx={{
            mt:5,
            p:5,
            display:'flex',
        }}
        >
            <CssBaseline />
            <SideBar />
            <Box
             sx={{
              flexGrow:2,
            }}
            >
              <Typography> All Products</Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
                components={{
                  Toolbar: GridToolbar
                }}
                />
            </Box>
            
        </Box>
         
    </Fragment>
  );

};

export default AdminProducts;