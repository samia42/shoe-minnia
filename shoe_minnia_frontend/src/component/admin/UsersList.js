import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Typography, CssBaseline } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Toast from "../Toast/Toast";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (error) {
      Toast(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      Toast(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted === true) {
      Toast(message, "success");
      navigate("/admin/users");

      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, Toast, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Box
        sx={{
          mt: 5,
          p: 5,
          display: "flex",
        }}
      >
        <CssBaseline />
        <SideBar />
        <Box
          sx={{
            flexGrow: 2,
          }}
        >
          <Typography> All Users</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default UsersList;
