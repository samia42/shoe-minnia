import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FilledInput,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Loader from "../Loader/Loader";
import Select from "../Selector/Select";
import { useNavigate } from "react-router-dom";
import { clearErrors, newProduct } from "../../actions/productAction";
import Toast from "../Toast/Toast";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import SideBar from "./SideBar";
import Uploader from "./Uploader";

const NewProduct = (props) => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const {user} = useSelector(state=>state.user)
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { images } = useSelector((state) => state.productImages);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  // const [images, setImages] = useState([]);
  const options = [
    { id: 1, title: "shoes" },
    { id: 2, title: "sneakers" },
    { id: 3, title: "Classic Shoes" },
    { id: 4, title: "Ankle Boots" },
    { id: 5, title: "Boots" },
    { id: 6, title: "Trainer" },
    { id: 7, title: "Mules & Sandals" },
    { id: 8, title: "Pumps" },
  ];

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      Toast("Product Created Successfully", "success");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const createProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);
    // myForm.append("product-image", images.imageFile.file.originFileObj);
    console.log(images);
    images.forEach((image) => {
      myForm.append(`image`, image.originFileObj);
    });

    dispatch(newProduct(myForm));
  };

  return (
    <React.Fragment>
      <>
        <Box>
          <ThemeProvider theme={theme}>
            <Container
              sx={{ backgroundColor: "#dec0ff" }}
              component="main"
              maxWidth="xs"
            >
              <CssBaseline />
              <SideBar />
              <Box
                sx={{
                  marginTop: 4,
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5" color="secondary">
                  Create Product
                </Typography>
                <Box
                  component="form"
                  onSubmit={createProductSubmit}
                  encType="multipart/form-data"
                  noValidate
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        label="Product Name"
                        autoFocus
                        color="secondary"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        fullWidth
                        label="Description"
                        name="description"
                        autoComplete="description"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        fullWidth
                        label="Price"
                        name="price"
                        autoComplete="price"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Select
                        required
                        fullWidth
                        color="secondary"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        options={options}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        fullWidth
                        label="Stock"
                        name="stock"
                        autoComplete="stock"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Uploader />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </>
    </React.Fragment>
  );
};

export default NewProduct;
