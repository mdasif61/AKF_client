import SideNav from './SideNav';
import useTitle from '../hooks/useTitle';
import useAllUser from '../hooks/useAllUser';

const Profile = () => {
    useTitle("Profile")
    const {users}=useAllUser()
    console.log(users)

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