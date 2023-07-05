import React, { useContext } from 'react';
import { mainContext } from '../NavPage/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(mainContext);

    const location=useLocation()

    if(loading){
       return <div style={{maxWidth:"1240px",margin:"0 auto"}}><Skeleton /></div>
    }
    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;