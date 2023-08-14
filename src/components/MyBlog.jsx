import React, { useState } from "react";
import useAllUser from "./hooks/useAllUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faEllipsis,
  faShare,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";
import like from "../../public/Icon/like.svg";
import love from "../../public/Icon/love.svg";
import care from "../../public//Icon/care.svg";
import haha from "../../public//Icon/haha.svg";
import sad from "../../public/Icon/sad.svg";
import wow from "../../public/Icon/wow.svg";
import angry from "../../public/Icon/angry.svg";
import moment from "moment";
import useAxiosSecure from "../../src/components/hooks/useAxiosSecure";
import useReaction from "../../src/components/hooks/useReaction";
import { useMutation } from "@tanstack/react-query";
import useMyBlog from "./hooks/useMyBlog";

const MyBlog = ({ blog, modalDeletePost }) => {
  const [axiosSecure] = useAxiosSecure()
  const { users } = useAllUser();
  const [open, setOpen] = useState(false);
  const [deleteCon, setDeleteCon] = useState(false);
  const [likeBox, setLikeBox] = useState(false);
  const [reaction, setReaction] = useState('');
  const { refetch: myRefetch } = useMyBlog()
  const { single_react, reactLoading, refetch } = useReaction(blog?.reaction, blog._id);

  const confirmData = {
    header: "Are You Sure?",
    title: "Do you want to delete this post!",
  };

  let check;
  if (!reactLoading) {
    single_react?.map((name) => {
      console.log(name.reaction)
      check = (Object.keys(name.reaction).join(''))
    });
  }

  const getReactionLogo = () => {
    switch (check) {
      case 'like': return <img src={like} alt="like" />;
      case 'love': return <img src={love} alt="love" />;
      case 'care': return <img src={care} alt="care" />;
      case 'haha': return <img src={haha} alt="haha" />;
      case 'sad': return <img src={sad} alt="sad" />;
      case 'wow': return <img src={wow} alt="wow" />;
      case 'angry': return <img src={angry} alt="angry" />;
      default: return null;
    }
  }

  const mutation = useMutation(
    async (data) => {
      return await axiosSecure.patch(`/blog/reaction/${blog._id}?react=${reaction}&&user=${users._id}`, data).then(res => res.data);
    },
    {
      onSuccess: (data) => {
        refetch();
        myRefetch()
      }
    },
    {
      onError: (error) => {
        console.log(error)
      }
    }
  )

  return (
    <div className="w-full border mb-5">
      <div className="p-5 w-full">
        <div className="flex items-center mb-4">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={users?.image} alt="" />
            </div>
          </div>
          <div className="flex-1 ml-4">
            <h3 className="font-bold">{users?.name}</h3>
            <h3>
              <small>{moment().utc(blog.date).format("DD-MM-YYYY")}</small>
              <br />
              {/* <small>{moment(postDate).fromNow()}</small> TODO */}
            </h3>
          </div>
          <div className="relative">
            <FontAwesomeIcon
              onClick={() => setOpen(!open)}
              className={`cursor-pointer ${open && "bg-gray-200"
                } hover:bg-gray-200 p-2 h-4 w-4 duration-300 rounded-full`}
              icon={faEllipsis}
            />

            {open && (
              <div className="bg-white border z-50 w-36 rounded-lg p-3 absolute right-0">
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
        {blog.photo.length && <div
          className={`overflow-hidden avatar ${blog.photo.length && "h-56"
            } object-cover ${blog.photo.length > 2 && blog.photo.length <= 4
              ? "grid-cols-2"
              : blog.photo.length > 4
                ? "grid-cols-3"
                : ""
            } grid grid-cols-1 rounded-xl mt-4`}
        >
          {blog?.photo?.map((img, index) => (
            <div key={index} className="h-full w-full">
              <img
                className="w-full object-cover object-center"
                src={img}
                alt=""
              />
            </div>
          ))}
        </div>}
      </div>
      {deleteCon && (
        <CustomModal
          blog={blog}
          modalDeletePost={modalDeletePost}
          setDeleteCon={setDeleteCon}
          data={confirmData}
        />
      )}

      <div className="w-full relative mt-4 border-t p-2">
        <div className="w-full flex justify-between items-center">
          <div
            onClick={() => {
              setReaction(check ? check : 'like'),
                mutation.mutate(blog)
            }}
            onMouseOver={() => setLikeBox(true)}
            onMouseOut={() => setLikeBox(false)}
            className="hover:bg-gray-200 duration-300 cursor-pointer p-2 font-semibold text-gray-500 text-center flex items-center rounded-md"
          >
            {check ? (
              <div className=" hover:scale-125 duration-300 mx-1 text-gray-400 rounded-full w-5">
                <span>
                  {getReactionLogo()}
                </span>
              </div>
            ) : <FontAwesomeIcon icon={faThumbsUp} />}
            <span className="ml-1">{check ? check : 'Like'}</span>
          </div>
          <div className="hover:bg-gray-200 duration-300 cursor-pointer p-2 font-semibold text-gray-500 text-center rounded-md">
            <FontAwesomeIcon icon={faComment} />{" "}
            <span className="ml-1">Comment</span>
          </div>
          <div className="hover:bg-gray-200 duration-300 cursor-pointer p-2 font-semibold text-gray-500 text-center rounded-md">
            <FontAwesomeIcon icon={faShare} />{" "}
            <span className="ml-1">Share</span>
          </div>
        </div>

        {likeBox && (
          <div
            onMouseOver={() => setLikeBox(true)}
            onMouseOut={() => setLikeBox(false)}
            className="absolute flex -top-10 shadow-md justify-between items-center bg-white border rounded-full px-3 py-2"
          >
            <div className="avatar placeholder">
              <div onClick={() => {
                setReaction('like'),
                  mutation.mutate(blog)
              }} className="bg-blue-600 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={like} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('love')
                mutation.mutate(blog)
              }} className="bg-red-500 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={love} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('care'),
                  mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={care} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('haha'),
                  mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={haha} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('wow'),
                  mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={wow} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('sad'),
                  mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={sad} alt="" />
                </span>
              </div>
              <div onClick={() => {
                setReaction('angry'),
                  mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={angry} alt="" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlog;
