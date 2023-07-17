import { faImage, faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "./hooks/useAxiosSecure";
import { mainContext } from "./NavPage/AuthProvider";
import useMyBlog from "./hooks/useMyBlog";
import '../components/Layout/Css/Modal.css'

const postImage = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

const Modal = ({ handleClose, data }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([])
  const [axiosSecure] = useAxiosSecure();
  const closeRef = useRef(null);
  const { user } = useContext(mainContext);
  const { refetch } = useMyBlog();

  const fileInputRef = useRef(null);
  const { handleSubmit, register, setValue } = useForm();

  const mutation = useMutation(
    async (data) => {
      return await axiosSecure.post("/all-post", data).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        if (data.insertedId) {
          closeRef.current.close();
          refetch();
          setLoading(false)
        }
        setLoading(false);
      },
    },
    {
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    setImage(true)
    const { status } = data;
    const blogData = {
      text: status,
      photo: image,
      like: 0,
      status: "Pending",
      email: user.email,
      userPhoto:user.photoURL,
      userName:user.displayName
    };
    mutation.mutate(blogData);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  const handleChange = (event) => {
    setValue("photo", event.target.files);

    const imageHostinUrl = `https://api.imgbb.com/1/upload?key=${postImage}`;
    const formData = new FormData();

    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("image", event.target.files[i]);
    }
    // setLoading(true);

    fetch(imageHostinUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const imageUrl = imageData.data.display_url;
          setImage(prevImg => [imageUrl, ...prevImg])
          // setLoading(false);
        }
      });

  };

  const handleFileButton = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 flex items-center justify-center text-xl font-bold bg-zinc-300 bg-opacity-50 w-full h-screen">Posting...</div>
      ) : (
        <div
          onClick={handleClose}
          className="w-full z-50 min-h-screen bg-zinc-400 fixed top-0 left-0 bg-opacity-40 flex items-center justify-center"
        >
          <dialog
            ref={closeRef}
            open
            onClick={handleFileButton}
            className="w-5/12 p-5 rounded-xl"
          >
            <button
              onClick={handleClose}
              className="btn btn-circle btn-sm text-xl bg-red-600 border-none absolute right-2 top-2"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="border-b-2 py-2 text-xl mb-5">
              <h1 className="text-center font-bold text-gray-600">
                Create Blog
              </h1>
            </div>

            <div className="flex items-center">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={data?.image} alt="" />
                </div>
              </div>
              <div className="flex-1 ml-4">
                <h3>{data?.name}</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-5">
                <textarea
                  {...register("status")}
                  className="w-full h-auto postText resize-none border-none outline-none"
                  placeholder="Write your blog"
                  id=""
                ></textarea>
              </div>

              <div onClick={handleClick} className="border-green-200 relative text-green-600 border my-5 flex cursor-pointer items-center h-56 justify-center bg-gray-100 p-2 overflow-y-scroll rounded-lg">

                <div className={`grid grid-cols-1 ${image.length > 1 && image.length <= 2 ? 'grid-cols-2' : image.length >= 3 && image.length < 5 && 'grid-cols-2'} ${image.length > 4 && 'grid-cols-3'} gap-2 w-full object-cover h-full object-center`}>
                  {
                    image.length > 0 ? image.map((img, index) => (
                      <div key={index} className="w-full object-cover object-center h-auto overflow-hidden rounded-md">
                        <img className="w-full rounded-md" src={img} alt="" />
                      </div>
                    )) : ''
                  }
                </div>

                <div className={`absolute flex items-center justify-center ${image && 'bg-zinc-800 hover:bg-opacity-100 bg-opacity-90 px-4 py-1 top-5 right-5 rounded-full'}`}>
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

              <button type="submit" className="btn btn-block bg-black">
                Post
              </button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default Modal;
