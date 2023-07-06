import React from 'react';
import SideNav from '../Layout/SideNav';
import { Outlet } from 'react-router-dom';

const Service = () => {
    return (
        <div className='service'>
            <Outlet></Outlet>
        </div>
    );
};

export default Service;