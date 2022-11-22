import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../assets/logo.png";
import {useDispatch,useSelector} from 'react-redux';
import {clearErrors,Register} from '../../actions/userAction'
import Toast from '../Toast/Toast';
import Loader from '../Loader/Loader';


const SignUp = () => {
    const theme = createTheme();
    const navigate = useNavigate()
    const [user , setUser]= React.useState({
      name:"",
      email:"",
      password:"",
  });
  const {name, email, password} = user

  const dispatch = useDispatch();
  const {error,loading,isAuthenticated} = useSelector(state=>state.user)


  const registerSubmit = (event) => {
    event.preventDefault();
    dispatch(Register(user))
  };
  React.useEffect(()=>{
    if(error){
     
        Toast(error,"error");
        dispatch(clearErrors());
    }
    if(isAuthenticated){
      navigate("/account")
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[dispatch , error , isAuthenticated]);

const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user)
};


  return (
    <React.Fragment>
      {loading ? <Loader/>:
            <>
            <Box className='main_container'>
              <ThemeProvider theme={theme}>
                <Container  sx = {{ backgroundColor:"white"}}  component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 4,
                      mb:2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      
                  }}
                  >
                    <Avatar sx={{
                          pr:2,
                          mb:3,
                          backgroundColor:"transparent",
                          width:"70%",
                          height:"50%"
                          }}>
                          <div>
                              <img src={logo} alt="logo"  />
                          </div>
                      </Avatar>
                    <Typography component="h1" variant="h5" color="secondary">
                          Register Your Self
                    </Typography>
                    <Box component="form" noValidate onSubmit={registerSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} >
                          <TextField
                            value={name}
                            onChange={registerDataChange}
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="firstName"
                            label="Name"
                            autoFocus
                            color="secondary"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            value={email}
                            onChange={registerDataChange}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            color="secondary"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={password}
                            onChange={registerDataChange}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            color="secondary"
                          />
                        </Grid>
                        {/* <Grid item xs={12}>
                        <img src={avatarPreview} alt="Avatar Preview" />
                          <TextField
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                            required
                            fullWidth
                            id="avatar"
                            color="secondary"
                          />
                        </Grid> */}
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Register
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link to="/login" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </Box>
          </>
      }
    </React.Fragment>
  
  );
};

export default SignUp;