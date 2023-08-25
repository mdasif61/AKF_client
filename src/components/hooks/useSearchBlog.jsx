import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSearchBlog = (searchText) => {
    const [axiosSecure]=useAxiosSecure()
    const {data:searchData=[],refetch}=useQuery(['search-blog',searchText],
    async()=>{
        try {
            const res=await axiosSecure.get(`/search-blog/${searchText}`)
            return res.data;
        } catch (error) {
            throw new Error('Search Error :', error)
        }
    }
    );
    return {searchData,refetch}
};

export default useSearchBlog;