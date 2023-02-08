import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Error } from '../pages/Error/Error.jsx';




const RequireAuth = ({children, onlyAdmin = false}) => {
    const location = useLocation();
    const {isAuth, role} = useAuth();

    if(isAuth){

        if(onlyAdmin){
           return role == 'admin' ? children : <Error message={'Нет прав доступа. Обратитесь к администратору'}/>
        } else {
            return children;
        }

    } else{
         return <Navigate to='/login' state = {{from: location}}/>
    }


}

export {RequireAuth};