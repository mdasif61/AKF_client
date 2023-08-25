import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllBlogs = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: allBlog = [], refetch, isLoading, isError, isFetching } = useQuery({
        queryKey: ['all-blog'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blog`)
            return res.data;
        }
    });
    return { allBlog, refetch, isLoading, isError, isFetching }
};

export default useAllBlogs;