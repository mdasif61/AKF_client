import { useParams } from "react-router-dom";
import SideNav from "./Layout/SideNav";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "./hooks/useAxiosSecure";
import axios from "axios";
import useAllUser from "./hooks/useAllUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const postImage = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

const PostEdit = () => {
  const { users } = useAllUser();
  const [axiosSecure] = useAxiosSecure();
  const { id } = useParams();
  const [editPost, setEditPost] = useState(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleSubmit, register, setValue } = useForm();
  const [deleteLoad, setDeleteLoad] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchEditPost = async () => {
      try {
        const response = await axiosSecure.get(`/editpost/${id}`, {
          cancelToken: source.token,
        });
        setEditPost(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled :", error.message);
        } else {
          console.error("Error fetching post :", error);
          setLoading(false);
        }
      }
    };
    fetchEditPost();

    return () => {
      source.cancel("component unmounted");
    };
  }, [id, deleteLoad]);

  const handleChange = (event) => {
    setLoading(true);
    setValue("photo", event.target.files);

    const imageHostinUrl = `https://api.imgbb.com/1/upload?key=${postImage}`;
    const formData = new FormData();

    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("image", event.target.files[i]);
    }

    fetch(imageHostinUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const imageUrl = imageData.data.display_url;
          setImage((prevImg) => [imageUrl, ...prevImg]);
          const response = axiosSecure.patch(
            `/update-blog/${encodeURIComponent(imageUrl)}?blogId=${id}`
          );
        }
        setLoading(false);
      });
  };

  const removeImg = async (img) => {
    const response = await axiosSecure.delete(
      `/delete-photo/${encodeURIComponent(img)}`,
      { params: { id: id } }
    );
    if (response.data.modifiedCount > 0) {
      setDeleteLoad(response.data);
    }
  };

  const updateMutation = useMutation(async (data) => {
    return axiosSecure.patch(`/updateBlog/${id}`, data).then(res.data);
  });

  const handleUpdateBlog = () => {};

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <SideNav>
      <div className="md:my-5 md:ml-5 bg-white md:rounded-2xl md:p-10 p-5 shadow-lg">
        <div className="flex items-center mb-4 relative">
          <div className="avatar hover:cursor-pointer">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={editPost?.userPhoto} alt="" />
            </div>
          </div>
          <div className="flex-1 ml-4">
            <h3 className="font-bold">{users?.name}</h3>
          </div>
        </div>
        <div>
          <textarea
            defaultValue={editPost?.text}
            className="w-full resize-none border-none outline-none p-2"
          ></textarea>
        </div>
        <div
          className={`relative ${
            editPost?.photo.length && "border rounded-xl"
          }`}
        >
          <div
            className={`overflow-hidden w-full avatar object-cover ${
              editPost?.photo.length < 3
                ? "grid-cols-2"
                : "md:grid-cols-3 grid-cols-2"
            } grid rounded-xl mt-4`}
          >
            {editPost?.photo?.map((img, index) => (
              <div key={index} className="h-full relative w-full">
                <button
                  onClick={() => removeImg(img)}
                  className="absolute z-50 right-3 top-3 bg-opacity-60 hover:bg-opacity-100 duration-300 bg-gray-300 btn-circle btn-xs"
                >
                  <FontAwesomeIcon className="" icon={faXmark} />
                </button>
                <img
                  className="w-full object-cover object-center"
                  src={img}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div
            onClick={handleClick}
            className={`absolute text-gray-400 flex items-center justify-center ${
              image &&
              "bg-zinc-800 hover:bg-opacity-100 bg-opacity-90 px-4 py-1 bottom-5 rounded-full right-5"
            }`}
          >
            <FontAwesomeIcon
              className="text-xl mr-2 cursor-pointer text-green-500 py-2"
              icon={faImage}
            />{" "}
            Add Photo
            <input
              {...register("photo")}
              className="hidden"
              onChange={handleChange}
              ref={fileInputRef}
              type="file"
              id=""
            />
          </div>
        </div>
        <button
          onClick={handleUpdateBlog}
          className="btn btn-block mt-5 bg-green-600 border-none outline-none hover:bg-green-700"
        >
          Done
        </button>
      </div>
    </SideNav>
  );
};

export default PostEdit;
