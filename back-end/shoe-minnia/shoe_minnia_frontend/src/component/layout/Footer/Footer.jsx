import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    footerStyles: {
      position: "inherit",
      right: 0,
      bottom: 0,
      left: 0,
      marginBottom: "0px",
      color: "white",
      background: "#bb84e8",
    },
    linkContainer: {
      display: "flex",
    },
    links: {
      display: "flex",
      flexDirection: "column",
      padding: "2%",
      paddingTop: "1%",
    },
    aStyles: {
      color: "white",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
      lineHeight: "180%",
    },
    bottom: {
      textAlign: "center",
      padding: "1%",
    },
  })
);
const theme = createTheme();

export default function Footer() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <footer className={classes.footerStyles}>
        <div className={classes.linkContainer}>
          <div className={classes.links}>
            <h3>Company</h3>
            <Link to="#" className={classes.aStyles}>
              Home
            </Link>
            <Link to="#" className={classes.aStyles}>
              About Us
            </Link>
            <Link to="#" className={classes.aStyles}>
              Products
            </Link>
          </div>
          <div className={classes.links}>
            <h4>Support</h4>
            <Link to="#" className={classes.aStyles}>
              FAQs
            </Link>
            <Link to="#" className={classes.aStyles}>
              Email Us
            </Link>
            <Link to="#" className={classes.aStyles}>
              Refund Policy
            </Link>
          </div>
        </div>
        <h5 className={classes.bottom}>Most Trusted Brand</h5>
      </footer>
    </ThemeProvider>
  );
}
