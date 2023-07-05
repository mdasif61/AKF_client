import React from 'react';
import SideNav from './SideNav';
import useTitle from '../hooks/useTitle';

const Settings = () => {
    useTitle("Settings")
    return (
        <div>
            <SideNav>
                <div>
                    <h1>Settings</h1>
                </div>
            </SideNav>
        </div>
    );
};

export default Settings;