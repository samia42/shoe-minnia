import React from "react";
import { Card as MyCard, Paper } from "@mui/material";
import styles from "./Card.css";

const Card = (props) => {
  return (
    <Paper elevation={3}>
      <div
        className={styles.padder}
        style={{ height: props.height ?? "100%", overflowY: "auto" }}
      >
        <MyCard
          className={styles.card}
          sx={{
            width: props.width ?? "100%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {props.children}
        </MyCard>
      </div>
    </Paper>
  );
};

export default Card;
