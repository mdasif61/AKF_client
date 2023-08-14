import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSeeProfile = (id) => {
  const [axiosSecure] = useAxiosSecure();
  const {data:member={}, isLoading,refetch} = useQuery(["see-profile", id], async () => {
    try {
      const res = await axiosSecure.get(`/blog/see-profile/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(`see-profile: ${error}`);
    }
  });
  return {member,isLoading,refetch}
};

export default useSeeProfile;
