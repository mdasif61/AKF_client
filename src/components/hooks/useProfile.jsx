import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useProfile = (id) => {
    const [axiosSecure] = useAxiosSecure();

    const { data: profile = {} } = useQuery(
        ['profile', id],
        async () => {
            try {
                const res = await axiosSecure.get(`/user-profile/${id}`);
                return res.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    )
    return { profile }
};

export default useProfile;