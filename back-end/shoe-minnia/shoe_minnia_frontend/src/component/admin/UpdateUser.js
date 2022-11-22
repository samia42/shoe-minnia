import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Select from "../Selector/Select";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors } from "../../actions/productAction";
import Toast from "../Toast/Toast";
import SideBar from "./SideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser } from "../../actions/userAction";
import Loader from "../Loader/Loader";

const UpdateUser = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  //   const {user} = useSelector(state=>state.user)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { error, user, loading } = useSelector((state) => state.userDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(user ? user.role : "");
  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
      getUserDetails(userId);
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      Toast(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      Toast(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      Toast("User Updated Successfully", "success");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, user, userId, isUpdated]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  const options = [
    { id: "admin", title: "Admin", value: "admin" },
    { id: "user", title: "User", value: "user" },
  ];

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
              {/* <SideBar /> */}
              {loading ? (
                <Loader />
              ) : (
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
                    Update User
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={updateUserSubmitHandler}
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
                          label="User Name"
                          autoFocus
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="given-name"
                          name="email"
                          required
                          fullWidth
                          label="Email"
                          autoFocus
                          color="secondary"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Select
                          required
                          fullWidth
                          color="secondary"
                          value={role}
                          label="Role"
                          onChange={(e) => setRole(e.target.value)}
                          options={options}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      color="secondary"
                      variant="contained"
                      disabled={
                        updateLoading
                          ? true
                          : false || role === ""
                          ? true
                          : false
                      }
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              )}
            </Container>
          </ThemeProvider>
        </Box>
      </>
    </React.Fragment>
  );
};

export default UpdateUser;
