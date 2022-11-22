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
import {clearErrors,loadUser,updateProfile} from '../../actions/userAction'
import Toast from '../Toast/Toast';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
  const theme = createTheme();
  const navigate = useNavigate()
  const [name,setName]= useState('');
  const [email,setEmail]= useState('')

  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user)
  const {error,loading,isUpdated} = useSelector(state=>state.profile)



  const updateProfileSubmit = (event) => {
    event.preventDefault();
    const data={name,email}
    dispatch(updateProfile(data))
  };
  React.useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email)
    }
    if(error){
        Toast(error,"error");
        dispatch(clearErrors());
    }
    if(isUpdated){
        Toast("Profile Updated Successfully",'success')
        dispatch(loadUser());
        navigate("/account")

        dispatch({type:UPDATE_PROFILE_RESET})
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[dispatch , error ,user,isUpdated]);


    return (
        <React.Fragment>
        {loading ? <Loader/>:
              <>
              <Box>
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
                     
                      <Typography component="h1" variant="h5" color="secondary">
                            Update Profile
                      </Typography>
                      <Box component="form" noValidate onSubmit={updateProfileSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} >
                            <TextField
                              value={name}
                              onChange={(e)=>setName(e.target.value)}
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
                              onChange={(e)=>setEmail(e.target.value)}
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              color="secondary"
                            />
                          </Grid>
                        
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          color="secondary"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update
                        </Button>
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

export default UpdateProfile;