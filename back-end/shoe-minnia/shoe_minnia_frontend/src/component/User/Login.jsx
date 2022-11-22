import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";

// const redirect = location.search ? location.search.split("=")[1] : "/account";
const Login = ({ history }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = createTheme();
  const [loginEmail, setEmail] = React.useState("");
  const [loginPassword, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  React.useEffect(() => {
    if (error) {
      Toast(error, "error");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    navigate("/");
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box className="main_container">
            <ThemeProvider theme={theme}>
              <Container
                sx={{ backgroundColor: "white" }}
                component="main"
                maxWidth="xs"
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 4,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      pr: 2,
                      mb: 3,
                      backgroundColor: "transparent",
                      width:"150px",
                      height:"auto"
                    }}
                  >
                    <div>
                      <img src={logo} alt="logo" />
                    </div>
                  </Avatar>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      className="input"
                      value={loginEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      color="secondary"
                    />
                    <TextField
                      className="input"
                      value={loginPassword}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      color="secondary"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      color="secondary"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid container>
                      {/* <Grid item xs>
                                    <Link to="/password/forgot" variant="body2" >
                                    Forgot password?
                                    </Link>
                                </Grid> */}
                      <Grid item>
                        <Link to="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default Login;
