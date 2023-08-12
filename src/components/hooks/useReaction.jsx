import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAllUser from "./useAllUser";

const useReaction = (reaction,id) => {

    const [axiosSecure]=useAxiosSecure();
    const {users}=useAllUser()
    const keys=Object.keys(reaction)

    const {data:single_react, refetch, isLoading:reactLoading}=useQuery(['single-reaction',users?._id,id],
    async()=>{
        try {
            const res=await axiosSecure.get(`/single-reaction/${users?._id}?reaction=${keys}&&ids=${id}`);
            return res.data;
        } catch (error) {
            throw new Error ('single error: ', error)
        }
    });

    return {single_react,refetch,reactLoading}
};

export default useReaction;