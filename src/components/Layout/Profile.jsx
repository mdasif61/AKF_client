import SideNav from "./SideNav";
import useTitle from "../hooks/useTitle";
import useAllUser from "../hooks/useAllUser";
import "./Css/Profile.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEnvelope,
  faFemale,
  faGroupArrowsRotate,
  faLocation,
  faMale,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { useState } from "react";
import useMyBlog from "../hooks/useMyBlog";
import MyBlog from "../MyBlog";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Profile = () => {
  useTitle("Profile");
  const [axiosSecure] = useAxiosSecure();
  const { users } = useAllUser();
  const { blogs, isLoading, refetch } = useMyBlog();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showBio,setShowBio]=useState(false);

  const handleOpen = (data) => {
    setIsOpen(true);
    setModalData(data);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalData(null);
  };

  const mutation = useMutation(
    async (blog) => {
      const res = await axiosSecure.delete(`/remove-blog/${blog._id}`);
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (data.deletedCount > 0) {
          refetch();
        }
      },
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const modalDeletePost = (blog) => {
    mutation.mutate(blog);
  };

  return (
    <>
      <SideNav>
        <div className="profile shadow-lg">
          <div className="w-full flex sticky top-0 h-[200px] z-50 bg-white items-center justify-between">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img src={users.image} />
              </div>
            </div>
            <div className="flex-1 ml-6 flex items-center">
              <div>
                <h1 className="text-2xl">
                  {users.name}
                </h1>
                <h3 onClick={()=>setShowBio(!showBio)} className={` text-gray-500 text-sm ${showBio?'w-10/12':'w-auto'}`}>{showBio?users.bio:<>
                {users?.bio?.slice(0,20)}
                {" "}
                {users?.bio?.length>20&& <button onClick={()=>setShowBio(!showBio)} className="text-gray-400">...see bio</button>}
                </>}</h3>
              </div>
            </div>
            <div>
              <Link to="/dashboard/profile-setting">
                <button className="btn bg-black">
                  {" "}
                  <FontAwesomeIcon className="mr-2" icon={faEdit} /> Edit
                  Profile
                </button>
              </Link>
              <button
                onClick={() => handleOpen(users)}
                className="btn bg-black ml-2"
              >
                <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add Your Blog
              </button>
              {isOpen && <Modal handleClose={handleClose} data={modalData} />}
            </div>
          </div>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-5 h-full mt-7">
            <div className="md:col-span-2 font-semibold h-[100vh] sticky top-[200px] bg-gray-800 text-white p-5 rounded-xl">
              <div className="space-y-2">
                <Link to="/dashboard/profile-setting">
                  <h1 className="text-center bg-gray-700 py-3 rounded-xl hover:bg-gray-600 mb-3">
                    Edit Details
                  </h1>
                </Link>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faPhone} /> Phone :
                  </span>{" "}
                  {users.phone}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faEnvelope} />{" "}
                    E-mail :{" "}
                  </span>{" "}
                  {users.email}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faLocation} />{" "}
                    Address :
                  </span>{" "}
                  {users.address}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faGroupArrowsRotate}
                    />{" "}
                    Blood Group :{" "}
                  </span>{" "}
                  {users.blood}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={users.gender == "Male" ? faMale : faFemale}
                    />{" "}
                    Gender :{" "}
                  </span>{" "}
                  {users.gender}
                </p>
              </div>
              {blogs?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-7 bg-gray-700 p-3 rounded-xl">
                  {blogs.map((blog) =>
                    blog.photo.map((img, index) => (
                      <div key={index} className="avatar">
                        <div className="w-24 hover:scale-95 duration-200 relative cursor-pointer rounded-xl">
                          <span className="absolute w-full h-full opacity-0 hover:bg-zinc-300 z-50 hover:opacity-30"></span>
                          <img src={img} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <h1 className="mt-5 text-xl text-gray-400">No Photos</h1>
              )}

            </div>
            <div className="md:col-span-3">
              {blogs.length > 0 ? (
                <>
                  {!isLoading ? (
                    blogs.map((blog) => (
                      <>
                        <MyBlog
                          key={blog._id}
                          blog={blog}
                          modalDeletePost={modalDeletePost}
                        ></MyBlog>
                      </>
                    ))
                  ) : (
                    <h1 className="text-blue-500">Loading...</h1>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-1/3">
                  <h1 className="text-xl font-bold text-gray-400 text-center">
                    Content Not Found
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </SideNav>
    </>
  );
};

export default Profile;
