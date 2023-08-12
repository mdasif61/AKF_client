import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAllBlogs = () => {
   const {data:allBlog=[],refetch,isLoading,isError, isFetching}=useQuery({
    queryKey:['all-blog'],
    queryFn:async()=>{
        const res=await axios.get('http://localhost:5000/all-blog')
        return res.data;
    }
   });
   return {allBlog,refetch,isLoading,isError, isFetching}
};

export default useAllBlogs;