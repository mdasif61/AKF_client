import React, { useState } from "react";
import useAllUser from "./hooks/useAllUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";

const MyBlog = ({ blog, modalDeletePost }) => {
  const { users } = useAllUser();
  const [open, setOpen] = useState(false);
  const [deleteCon, setDeleteCon] = useState(false);

  const confirmData = {
    header: "Are You Sure?",
    title: "Do you want to delete this post!",
  };

  return (
    <div className="w-full border p-5 mb-5 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={users?.image} alt="" />
          </div>
        </div>
        <div className="flex-1 ml-4">
          <h3 className="font-bold">{users?.name}</h3>
        </div>
        <div className="relative">
          <FontAwesomeIcon
            onClick={() => setOpen(!open)}
            className={`cursor-pointer ${
              open && "bg-gray-200"
            } hover:bg-gray-200 p-2 h-4 w-4 duration-300 rounded-full`}
            icon={faEllipsis}
          />

          {open && (
            <div className="bg-white border w-36 rounded-lg p-3 absolute right-0">
              <ul className="text-gray-500">
                <li
                  onClick={() => setDeleteCon(true)}
                  className="py-2 border-b cursor-pointer"
                >
                  <FontAwesomeIcon className="mr-2" icon={faTrash} /> Delete
                </li>
                <li className="py-2 border-b cursor-pointer">
                  <FontAwesomeIcon className="mr-2" icon={faEdit} /> Edit
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="font-semibold">{blog.text}</p>
      <div className="h-56 overflow-hidden rounded-xl mt-4">
        <img className="w-full" src={blog.photo} alt="" />
      </div>
      {deleteCon && (
        <CustomModal
          blog={blog}
          modalDeletePost={modalDeletePost}
          setDeleteCon={setDeleteCon}
          data={confirmData}
        />
      )}
    </div>
  );
};

export default MyBlog;
