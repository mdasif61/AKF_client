import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCommentProfile = (id) => {
    const [axiosSecure]=useAxiosSecure()
    const {data:commentProfile=[],refetch}=useQuery(['comment-profile',id],
    async()=>{
        try {
            const res=await axiosSecure.get(`/comment-profile/${id}`);
            return res.data;
        } catch (error) {
            
        }
    }
    );
    return {commentProfile,refetch}
};

export default useCommentProfile;