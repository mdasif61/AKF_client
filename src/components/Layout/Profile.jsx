import React, { useContext } from 'react';
import SideNav from './SideNav';
import { mainContext } from '../NavPage/AuthProvider';
import useTitle from '../hooks/useTitle';

const Profile = () => {
    useTitle("Profile")
    const {user}=useContext(mainContext);
    console.log(user)

    return (
        <div>
            <SideNav>
                <div className='flex items-center justify-center p-20'>
                    <h1 className='text-5xl font-bold'>Your <span className='text-red-500'>Profile</span></h1>

                    <div>
                        
                    </div>

                </div>
            </SideNav>
        </div>
    );
};

export default Profile;