import { useParams } from "react-router-dom";
import useSeeProfile from "../hooks/useSeeProfile";
import SeePost from "./SeePost";

const SeeProfile = () => {
  const { id } = useParams();
  const { member, isLoading } = useSeeProfile(id);

  if (isLoading) {
    return (
      <div className="text-blue-500 flex items-center justify-center w-full h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex gap-5">
      <div className="w-[30%]">
        <h1>Left content</h1>
      </div>
      <div className="w-[40%]">
        {member.result.map((post) => (
          <SeePost key={post._id} post={post}></SeePost>
        ))}
      </div>
      <div className="w-[30%]">
        <h1>Right content</h1>
      </div>
    </div>
  );
};

export default SeeProfile;
