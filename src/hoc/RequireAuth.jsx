import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";


const RequireAuth = ({children}) => {
    const location = useLocation();
    const {isAuth} = useAuth();

    if(!isAuth){
        return <Navigate to='/login' state = {{from: location}}/>
    }

    return children;
}

export {RequireAuth};