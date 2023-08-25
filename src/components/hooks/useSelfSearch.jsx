import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSelfSearch = (selfSearch,id) => {
    const [axiosSecure]=useAxiosSecure()
    const {data:selfBlog=[]}=useQuery(['self-blog',selfSearch,id],
    async()=>{
        try {
            const res=await axiosSecure.get(`/self-blog/${id}?selfBlog=${selfSearch}`)
            return res.data;
        } catch (error) {
           throw new Error('Self-Blog: ', error) 
        }
    }
    );
    return {selfBlog}
};

export default useSelfSearch;