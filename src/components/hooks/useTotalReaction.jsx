import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTotalReaction = (id) => {
    const [axiosSecure]=useAxiosSecure();
    const {data:totalReactCount=[],refetch}=useQuery(['total-reaction-count',id], async()=>{
        try {
            const res=await axiosSecure.get(`/total-reaction-count/${id}`);
            return res.data;
        } catch (error) {
            throw new Error ('total reaction error :', error)
        }
    });
    return {totalReactCount,refetch}
};

export default useTotalReaction;