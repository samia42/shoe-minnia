import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Typography,
  Container,
  Rating,
  Card,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Toast from "../Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getProductDetails, newReview } from "../../actions/productAction";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ProductReviews from "./ProductReview";
import "./productDetail.css";
import Loader from "../Loader/Loader";
import { addItemsToCart } from "../../actions/cartAction";
import Header from "../layout/Header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const Img = styled("img")({
  margin: "none",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  height: "auto",
  width: "100",
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  paddingLeft: "20px",
  color: theme.palette.text.secondary,
}));

const ProdcutDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector((state) => state.productDetails);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { success } = useSelector((state) => state.newReviews);
  const itemPresent = cartItems.find((item) => item.product === product._id);
  const [productCount, setProductCount] = React.useState(1);
  const [rating, setRating] = useState(1);
  const [open, setOpen] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(getProductDetails(params.id));
    dispatch({ type: NEW_REVIEW_RESET });

    if (success) {
      Toast("Review Submitted Successfully", "Success");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, params, success]);

  const handleMinuse = () => {
    if (productCount <= 1) return;
    setProductCount(productCount - 1);
  };
  const handlePluse = () => {
    if (product.stock <= productCount) return;
    setProductCount(productCount + 1);
  };

  const submitReviewtoggle = () => {
    isAuthenticated
      ? open
        ? setOpen(false)
        : setOpen(true)
      : Toast("Please Login Frist", "error");
  };
  const cart = cartItems.filter((item) => item.product === product._id);
  let productCounts = 0;
  const addToCartHandler = () => {
    dispatch(
      addItemsToCart(
        params.id,
        (productCounts = cart[0]?.quantity
          ? cart[0].quantity + productCount
          : productCount)
      )
    );
    Toast("Item Added to Cart Successfully", "Success");
  };

  const reviewSubmitHandler = () => {
    if (isAuthenticated) {
      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", params.id);

      dispatch(newReview(myForm));

      setOpen(false);
    } else {
      Toast("Please Login to submit review", "error");
      // navigate("/login");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container sx={{ marginTop: "50px" }}>
            <Grid container spacing={2}>
              <Grid item sm={4} xs={12}>
                <Card>
                  <Carousel>
                    {product?.images &&
                      product.images.map((item, i) => (
                        <Img
                          alt={`${i} Slide`}
                          src={item.url}
                          key={item.url}
                          className="img"
                        />
                      ))}
                  </Carousel>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Item>
                  <Typography variant="h3">{product?.name}</Typography>
                  <Divider />
                  <div className="review">
                    <Rating
                      // name="simple-controlled"
                      value={product?.ratings}
                      readOnly
                    />
                    <Typography>({product?.reviews?.length}Reviews)</Typography>
                  </div>
                  <Divider />

                  <div className="price">
                    <Typography variant="h6">
                      RS:<span>{product?.price}</span>
                    </Typography>
                  </div>
                  <div className="no-of-items">
                    <div className="couter">
                      <IconButton
                        color="secondary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <RemoveIcon onClick={handleMinuse} />
                      </IconButton>
                      <Input value={productCount} readOnly={true} />
                      <IconButton
                        color="secondary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <AddIcon onClick={handlePluse} />
                      </IconButton>
                      {/* <Button sx={{color:"#35185a", backgroundColor:"#bb84e8"}} onClick={handleMinuse}>-</Button>
                    
                    <Button  sx={{color:"#35185a", backgroundColor:"#bb84e8"}} >+</Button> */}
                    </div>
                    <div>
                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="secondary"
                        // disabled={product.stock <= productCount}
                        disabled={
                          (itemPresent?.stock <= productCount &&
                            product?.stock <= productCount) ||
                          product.stock <= cart[0]?.quantity
                        }
                        onClick={addToCartHandler}
                      >
                        {product?.stock <= cart[0]?.quantity
                          ? "No Items"
                          : "Add To Cart"}
                        {/* Add to Cart */}
                      </Button>
                    </div>
                  </div>
                  <div className="status">
                    <Typography>
                      Status:
                      <b
                        style={{
                          color:
                            product?.stock <= cart[0]?.quantity
                              ? "red"
                              : product?.stock < 1
                              ? "red"
                              : "green",
                          marginLeft: "10px",
                        }}
                      >
                        {product?.stock <= cart[0]?.quantity
                          ? "Out of Stock"
                          : product?.stock < 1
                          ? "OutOfStock"
                          : "InStock"}
                      </b>
                    </Typography>
                  </div>

                  <div className="des">
                    <Typography varient="h1" className="description">
                      Description
                    </Typography>
                    <div>{product?.description}</div>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={submitReviewtoggle}
                  >
                    Submit Review
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container spacing={2}>
              <div className="review-heading">
                <Typography variant="h5">Product Reviews</Typography>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewtoggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submit-dialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                    />
                    <textarea
                      className="dialog-text-area"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewtoggle}>
                        Cancel
                      </Button>
                      <Button onClick={reviewSubmitHandler}>Submit</Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
                <Grid
                  item
                  sm={12}
                  xs={2}
                  lg={12}
                  color="secondary"
                  className="review-grid"
                >
                  {product?.reviews?.length ? (
                    <div className="reviews">
                      {product.reviews
                        .slice(0, reviewsToShow)
                        .map((reviews) => (
                          <ProductReviews reviews={reviews} />
                        ))}
                      {product.reviews.length > 3 ? (
                        <Button
                          variant="outlined"
                          sx={{
                            width: "20%",
                            display: "flex",
                            padding: "1rem",
                            justifyContent: "center",
                            alignItem: "center",
                            height: "50px",
                          }}
                          onClick={() => {
                            reviewsToShow > 3
                              ? setReviewsToShow(3)
                              : setReviewsToShow(product.reviews.length);
                          }}
                        >
                          {reviewsToShow > 3 ? "Show Less" : "Show More"}
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </Grid>
              </div>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default ProdcutDetails;
