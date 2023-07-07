import SideNav from "./SideNav";
import useTitle from "../hooks/useTitle";
import useAllUser from "../hooks/useAllUser";
import "./Css/Profile.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { useState } from "react";

const Profile = () => {
  useTitle("Profile");
  const { users } = useAllUser();
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, register } = useForm();

  return (
    <div>
      <SideNav>
        <div className="profile shadow-lg">
          <div className="w-full h-full flex items-center justify-between">
            <div className="w-36 h-36 bg-white shadow-xl border-2 rounded-full flex items-center justify-center overflow-hidden">
              <img className="w-full" src={users.image} alt="" />
            </div>
            <div className="flex-1 ml-8 flex items-center">
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
                onClick={() => window.my_modal_3.showModal()}
                className="btn bg-black ml-2"
              >
                <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add Your Blog
              </button>
              <Modal/>
            </div>
          </div>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-5 h-full mt-7">
            <div className="md:col-span-2 font-semibold space-y-2 bg-gray-100 p-5 rounded-xl">
              <p>
                <span className="font-normal">Phone :</span> {users.phone}
              </p>
              <p>
                <span className="font-normal">E-mail : </span> {users.email}
              </p>
              <p>
                <span className="font-normal">Address :</span> {users.address}
              </p>
              <p>
                <span className="font-normal">Blood Group : </span>{" "}
                {users.blood}
              </p>
              <p>
                <span className="font-normal">Gender : </span> {users.gender}
              </p>
            </div>
            <div className="md:col-span-3 bg-white border rounded-xl p-5">
              <h1>All Post</h1>
            </div>
          </div>
        </div>
      </SideNav>
    </div>
  );
};

export default Profile;
