import SideNav from "./SideNav";
import useTitle from "../hooks/useTitle";
import useAllUser from "../hooks/useAllUser";
import "./Css/Profile.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faFemale, faGroupArrowsRotate, faLocation, faMale, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { useState } from "react";
import useMyBlog from "../hooks/useMyBlog";
import MyBlog from "../MyBlog";

const Profile = () => {
  useTitle("Profile");
  const { users } = useAllUser();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null)

  const { blogs, isLoading } = useMyBlog()

  const handleOpen = (data) => {
    setIsOpen(true)
    setModalData(data)
  }

  const handleClose = () => {
    setIsOpen(false)
    setModalData(null)
  }

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
                <h1 className="text-2xl border-b border-black pb-1">
                  {users.name}
                </h1>
                <h3 className="text-gray-500">{users.bio}</h3>
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
                <Link to='/dashboard/profile-setting'><h1 className="text-center bg-gray-700 py-3 rounded-xl hover:bg-gray-600 mb-3">Edit Details</h1></Link>
                <p>
                  <span className="font-normal"><FontAwesomeIcon className="mr-2" icon={faPhone} /> Phone :</span> {users.phone}
                </p>
                <p>
                  <span className="font-normal"><FontAwesomeIcon className="mr-2" icon={faEnvelope} /> E-mail : </span> {users.email}
                </p>
                <p>
                  <span className="font-normal"><FontAwesomeIcon className="mr-2" icon={faLocation} /> Address :</span> {users.address}
                </p>
                <p>
                  <span className="font-normal"><FontAwesomeIcon className="mr-2" icon={faGroupArrowsRotate} /> Blood Group : </span>{" "}
                  {users.blood}
                </p>
                <p>
                  <span className="font-normal"><FontAwesomeIcon className="mr-2" icon={users.gender == 'Male' ? faMale : faFemale} /> Gender : </span> {users.gender}
                </p>
              </div>
              {
                blogs.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-7 bg-gray-700 p-4 rounded-xl">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="avatar">
                      <div className="w-24 rounded-xl">
                        <img src={blog.photo} />
                      </div>
                    </div>
                  ))}
                </div> : <h1 className="mt-5 text-xl text-gray-400">No Photos</h1>
              }
            </div>
            <div className="md:col-span-3">
              {
                blogs.length > 0 ? <>{
                  !isLoading ? blogs.map((blog) => <MyBlog
                    key={blog._id}
                    blog={blog}
                  ></MyBlog>) : <h1 className="text-blue-500">Loading...</h1>
                }</> : <div className="flex items-center justify-center h-1/3">
                  <h1 className="text-xl font-bold text-gray-400 text-center">Content Not Found</h1>
                </div>
              }
            </div>
          </div>
        </div>
      </SideNav>
    </>
  );
};

export default Profile;
