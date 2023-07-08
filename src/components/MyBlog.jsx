import React from 'react';
import useAllUser from './hooks/useAllUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const MyBlog = ({ blog }) => {
    const { users } = useAllUser()
    return (
        <div className='w-full border p-5 mb-5 rounded-xl'>
            <div className='flex items-center mb-4'>
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={users?.image} alt="" />
                    </div>
                </div>
                <div className='flex-1 ml-4'>
                    <h3 className='font-bold'>{users?.name}</h3>
                </div>
                <div>
                    <FontAwesomeIcon className='cursor-pointer hover:bg-gray-200 p-2 h-4 w-4 duration-300 rounded-full' icon={faEllipsis}/>
                </div>
            </div>

            <p className='font-semibold'>{blog.text}</p>
            <div className='h-56 overflow-hidden rounded-xl mt-4'>
                <img className='w-full' src={blog.photo} alt="" />
            </div>
        </div>
    );
};

export default MyBlog;