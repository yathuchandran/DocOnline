import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes=()=> {
 
    const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to='/login' />;
    
}

export default ProtectedRoutes