import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";

const ProtectedRoute = ( {children , isAdmin}) => {
    const {loading,isAuthenticated,user}= useSelector(state=>state.user)
    if(loading===false){
        if(isAuthenticated===false){
            return <Navigate to='/login' replace={true}/>
        }
        if(isAdmin === true && user.role !== "admin"){
            return <Navigate to='/login' replace={true}/>
        }
        else return children;
    }
    
};

export default ProtectedRoute;
