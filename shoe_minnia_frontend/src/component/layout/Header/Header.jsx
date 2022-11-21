import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../logo/Logo";
// import { Router, Switch, Route } from "react-router-dom";
// import Products from "../../Product/Products";
// import Login from "../../User/Login";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { logout } from "../../../actions/userAction";
import Toast from "../../Toast/Toast";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function logoutUser() {
    dispatch(logout());
    Toast("Logout Successfully", "success");
    navigate("/");
  }

  return (
    <AppBar
      sx={{ backgroundImage: "linear-gradient(to right, #35185a, #bb84e8)" }}
      position="static"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            "& ..css-hip9hq-MuiPaper-root-MuiAppBar-root": {
              background: "transparent",
            },
          }}
        >
          <Link to="/">
            <Logo />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginLeft: "40px",
              }}
            >
              <Link to="/products" style={{ color: "white" }}>
                Products
              </Link>
            </Button>
            {/* ))} */}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              boxSizing: "border-box",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <Link to="/cart">
                {location.pathname === "/login" ? (
                  " "
                ) : (
                  <Badge
                    badgeContent={
                      location.pathname === "/login" ? " " : cartItems.length
                    }
                    color="secondary"
                  >
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                )}
              </Link>
            </div>
            <Button>
              <Link to="/login" style={{ color: "white" }}>
                {isAuthenticated ? "" : "Login"}
              </Link>
            </Button>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}
              <Link
                to={"/login"}
                style={{ color: "Black", textDecoration: "none" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  SignIn
                </MenuItem>
              </Link>
              <Link
                to="/signup"
                style={{ color: "Black", textDecoration: "none" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  SignUp
                </MenuItem>
              </Link>

              <MenuItem onClick={logoutUser}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
