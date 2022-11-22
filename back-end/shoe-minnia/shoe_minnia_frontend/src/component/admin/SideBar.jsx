import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Create,
  HomeOutlined,
  ListAltOutlined,
  People,
  Reviews,
  StoreOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SideBar() {
  const data = [
    { name: "Home", icon: <HomeOutlined />, to: "/" },
    { name: "Products", icon: <StoreOutlined />, to: "/admin/products" },
    { name: "Create Product", icon: <Create />, to: "/admin/product" },
    { name: "All Orders", icon: <ListAltOutlined />, to: "/admin/orders" },
    { name: "Users", icon: <People />, to: "/admin/users" },
    { name: "Reviews", icon: <Reviews />, to: "/admin/reviews" },
  ];
  const list = () => (
    <Box role="presentation" sx={{ width: 250 }}>
      <List>
        {data.map((item, index) => (
          <Link to={item.to}>
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} sx={{ color: "gray" }} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          sx={{
            
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
          BackdropProps={{ invisible: true }}
          open={true}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
