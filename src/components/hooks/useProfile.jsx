import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { mainContext } from "../NavPage/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {

    const {axiosSecure}=useAxiosSecure();
    const {user}=useContext(mainContext)
    console.log(user)

    const { data: profile = {} } = useQuery({
        queryKey: ['user-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-profile/${user?.email}`);
            return res.data
        }
    })
    return {profile}
};

export default useProfile;