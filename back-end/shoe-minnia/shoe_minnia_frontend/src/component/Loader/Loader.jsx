import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
    return (
       <>
        <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',justifyItems:'center', marginTop:"10%" }}>
            <CircularProgress color="inherit"/>
        </Box>
       </> 
    );
};

export default  Loader ;