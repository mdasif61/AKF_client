import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { mainContext } from "../NavPage/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {

    const [axiosSecure]=useAxiosSecure()

    const {user, loading}=useContext(mainContext)
    const {data:users={}, refetch}=useQuery({
        queryKey:['users',user?.email],
        enabled:!loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    })
    return {users, refetch}
};

export default useAllUser;