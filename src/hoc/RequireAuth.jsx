import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Error } from '../pages/Error/Error.jsx';




const RequireAuth = ({children, allowAccess=[]}) => {
    const location = useLocation();
    const {isAuth, role} = useAuth();

    let access = allowAccess.includes(role);

    if (!isAuth) return <Navigate to='/login' state = {{from: location}}/>

    if (!access) return <Error message={'Нет прав доступа. Обратитесь к администратору'}/>
    
    return children

}

export {RequireAuth};