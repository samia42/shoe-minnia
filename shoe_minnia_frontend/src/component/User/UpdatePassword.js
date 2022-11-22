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
import {useDispatch,useSelector} from 'react-redux';
import {clearErrors,loadUser,updatePassword} from '../../actions/userAction'
import Toast from '../Toast/Toast';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = () => {

    const theme = createTheme();
    const navigate = useNavigate()
    const [currentPassword,setCurrentPassword]= useState('');
    const [newPassword,setNewPassword]= useState('');
    const [confirmPassword,setConfirmPassword]= useState('');
  
    const dispatch = useDispatch();
    const {error,loading,isUpdated} = useSelector(state=>state.profile)

    const updatePasswordSubmit = (event) => {
        event.preventDefault();
        const data={currentPassword,newPassword,confirmPassword}
        dispatch(updatePassword(data))
      };
      React.useEffect(()=>{
        if(error){
            Toast(error,"error");
            dispatch(clearErrors());
        }
        if(isUpdated){
            Toast("Password Updated Successfully",'success')
            navigate("/account")
    
            dispatch({type:UPDATE_PASSWORD_RESET})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch , error ,isUpdated]);
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
                            Update Password
                      </Typography>
                      <Box component="form" noValidate onSubmit={updatePasswordSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}> 
                          <Grid item xs={12}>
                          <TextField
                            value={currentPassword}
                            onChange={(e)=>setCurrentPassword(e.target.value)}
                            required
                            fullWidth
                            name="password"
                            label="Current Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            color="secondary"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            color="secondary"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            required
                            fullWidth
                            name="password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
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
                          Change
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

export default UpdatePassword;