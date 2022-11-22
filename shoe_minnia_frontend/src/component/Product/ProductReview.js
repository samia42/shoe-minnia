import React from "react";
import profilePng from "../../images/Profile.png";
import "./productDetail.css";
import { Rating, Grid } from "@mui/material";
function ProductReview({ reviews }) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Grid>
      <div className="review-card">
        <div>
          <img src={profilePng} alt="User" />
        </div>

        <Rating value={reviews.rating} readOnly />

        <h3>{capitalize(reviews.name)}</h3>

        <p>{reviews?.comment}</p>
      </div>
    </Grid>
  );
}

export default ProductReview;
