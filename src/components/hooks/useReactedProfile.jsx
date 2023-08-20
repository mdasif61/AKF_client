import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReactedProfile = (reaction,id) => {
    const [axiosSecure]=useAxiosSecure();
    const keys=Object.keys(reaction);
    
    const {data:reacted=[],refetch}=useQuery(['reacted-profile',id], async()=>{
        try {
            const res=await axiosSecure.get(`/reacted-profile/${id}?react=${keys}`)
            return res.data;
        } catch (error) {
            throw new Error ('reacted-profile :', error)
        }
    });
    return {reacted,refetch}
};

export default useReactedProfile;