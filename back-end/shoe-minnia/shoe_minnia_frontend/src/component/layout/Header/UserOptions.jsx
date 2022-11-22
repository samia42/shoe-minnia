import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast/Toast";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { Home } from "@mui/icons-material";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = [
    { icon: <Home />, name: "Home", func: home },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function home() {
    navigate("/");
  }
  function account() {
    navigate("/account");
  }
  function orders() {
    navigate("/orders");
  }
  function logoutUser() {
    dispatch(logout());
    Toast("Logout Successfully", "success");
    navigate("/");
  }
  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "fixed",
          zIndex: 11,
          bottom: "0px",
          right: 50,
          "& .css-118zhtq-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab": {
            backgroundColor: "purple",
          },
        }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
