import React from 'react';
import SideNav from '../Layout/SideNav';
import { Navigate } from 'react-router-dom';

const Service = () => {
    return (
        <div className='service'>
            <Navigate to='/diposite'></Navigate>
            <SideNav></SideNav>
        </div>
    );
};

export default Service;