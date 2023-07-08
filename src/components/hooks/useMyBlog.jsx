import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { mainContext } from '../NavPage/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useMyBlog = () => {

    const { user } = useContext(mainContext);
    const [axiosSecure]=useAxiosSecure()

    const {data:blogs=[],refetch, isLoading} = useQuery({
        queryKey: ['my-blog', user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/my-blog?email=${user?.email}`)
            return res.data;
        }
   })
   return {blogs,refetch,isLoading}
};

export default useMyBlog;