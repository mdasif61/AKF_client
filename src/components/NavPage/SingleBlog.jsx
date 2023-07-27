import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faEllipsis,
  faEnvelope,
  faFemale,
  faGroupArrowsRotate,
  faLocation,
  faMale,
  faPhone,
  faShare,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import like from "../../../public/Icon/like.svg";
import love from "../../../public/Icon/love.svg";
import care from "../../../public//Icon/care.svg";
import haha from "../../../public//Icon/haha.svg";
import sad from "../../../public/Icon/sad.svg";
import wow from "../../../public/Icon/wow.svg";
import angry from "../../../public/Icon/angry.svg";
import useProfile from "../hooks/useProfile";
import { Link } from "react-router-dom";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAllUser from "../hooks/useAllUser";

const SingleBlog = ({ blog }) => {

  const [axiosSecure]=useAxiosSecure()

  const [open, setOpen] = useState(false);
  const [likeBox, setLikeBox] = useState(false);
  const [deleteCon, setDeleteCon] = useState(false);
  const { profile } = useProfile(blog.userId);
  const [profileShow, setProfileShow] = useState(false);
  const [reaction, setReaction] = useState('');
  const {users}=useAllUser()

  const getReactionLogo=()=>{
    switch(reaction){
      case 'like':return <img src={like} alt="like" />;
      case 'love':return <img src={love} alt="love" />;
      case 'care':return <img src={care} alt="care" />;
      case 'haha':return <img src={haha} alt="haha" />;
      case 'sad':return <img src={sad} alt="sad" />;
      case 'wow':return <img src={wow} alt="wow" />;
      case 'angry':return <img src={angry} alt="angry" />;
      default:return null;
    }
  }

  const mutation=useMutation(
    async(data)=>{
      return await axiosSecure.patch(`/blog/reaction/${blog._id}?react=${reaction}&&user=${users._id}`,data).then(res=>res.data);
    },
    {
      onSuccess:(data)=>{
        // if(data.result.modifiedCount>0){
        //  return axiosSecure.patch(`/blog/prev-react/${blog._id}`, {name:data.reactName,post:blog})
        //   .then(res=>console.log(res.data))
        // }
        console.log(data)
      }
    },
    {
      onError:(error)=>{
        console.log(error)
      }
    }
  )

  return (
    <div className="w-full border bg-white rounded-lg mb-5">
      <div className="p-5 w-full">
        <div className="flex items-center mb-4 relative">
          <Link to={`/blog/see-profile/${blog.userId}`}>
            <div
              onMouseOver={() => setProfileShow(true)}
              onMouseOut={() => setProfileShow(false)}
              className="avatar hover:cursor-pointer"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={blog?.userPhoto} alt="" />
              </div>
            </div>
          </Link>
          <div className="flex-1 ml-4">
            <h3 className="font-bold">{blog?.userName}</h3>
            <h3>
              <small>{moment().utc(blog.date).format("DD-MM-YYYY")}</small>
              <br />
              {/* <small>{moment(postDate).fromNow()}</small> TODO */}
            </h3>
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
          {/* profile start */}
          {profileShow && (
            <div
              onMouseOver={() => setProfileShow(true)}
              onMouseOut={() => setProfileShow(false)}
              className="p-5 bg-gray-100 shadow-md -left-1/2 top-10 flex items-center justify-center backdrop-blur-lg bg-opacity-70 z-40 rounded-xl absolute"
            >
              <Link to={`/blog/see-profile/${blog.userId}`}>
                <div className="avatar mr-4 p-5">
                  <div className="w-20 rounded-full">
                    <img src={profile.image} alt="" />
                  </div>
                </div>
              </Link>
              <div>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faPhone} /> Phone :
                  </span>{" "}
                  {profile.phone}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faEnvelope} />{" "}
                    E-mail :{" "}
                  </span>{" "}
                  {profile.email}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon className="mr-2" icon={faLocation} />{" "}
                    Address :
                  </span>{" "}
                  {profile.address}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faGroupArrowsRotate}
                    />{" "}
                    Blood Group :{" "}
                  </span>{" "}
                  {profile.blood}
                </p>
                <p>
                  <span className="font-normal">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={profile.gender == "Male" ? faMale : faFemale}
                    />{" "}
                    Gender :{" "}
                  </span>{" "}
                  {profile.gender}
                </p>
                <Link to={`/blog/see-profile/${blog.userId}`}>
                  <button className="btn btn-block bg-blue-600 border-none hover:bg-blue-500 mt-4">
                    See Profile
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* profile end */}
        </div>

        <p className="font-semibold">{blog.text}</p>
        <div
          className={`overflow-hidden avatar ${
            blog.photo.length && "h-56"
          } object-cover ${
            blog.photo.length > 2 && blog.photo.length <= 4
              ? "grid-cols-2"
              : blog.photo.length > 4
              ? "grid-cols-3"
              : ""
          } grid grid-cols-1 rounded-xl mt-4`}
        >
          {blog.photo.map((img, index) => (
            <div key={index} className="h-full w-full">
              <img
                className="w-full object-cover object-center"
                src={img}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full relative mt-4 border-t p-2">
        <div className="w-full flex justify-between items-center">
          <div
            // onClick={()=>setReaction('like')}
            onMouseOver={() => setLikeBox(true)}
            onMouseOut={() => {
              setTimeout(() => {
                setLikeBox(false);
              }, 2000);
            }}
            className="hover:bg-gray-200 duration-300 cursor-pointer p-2 font-semibold text-gray-500 text-center rounded-md"
          >
            {reaction ? (
              <div onClick={()=>setReaction('')} className="bg-blue-600 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-5">
                <span>
                  {getReactionLogo()}
                </span>
              </div>
            ) : (
              <FontAwesomeIcon icon={faThumbsUp} />
            )}
            <span className="ml-1">Like</span>
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
            className="absolute flex -top-10 shadow-md justify-between items-center bg-white border rounded-full px-3 py-2"
          >
            <div className="avatar placeholder">
              <div onClick={()=>{
                setReaction('like'),
                mutation.mutate(blog)
              }} className="bg-blue-600 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={like} alt="" />
                </span>
              </div>
              <div onClick={()=>{
                setReaction('love')
                mutation.mutate(blog)
              }} className="bg-red-500 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={love} alt="" />
                </span>
              </div>
              <div onClick={()=>{
                setReaction('care'),
                mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={care} alt="" />
                </span>
              </div>
              <div onClick={()=>{
                setReaction('haha'),
                mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={haha} alt="" />
                </span>
              </div>
              <div onClick={()=>{
                setReaction('wow'),
                mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={wow} alt="" />
                </span>
              </div>
              <div onClick={()=>{
                setReaction('sad'),
                mutation.mutate(blog)
              }} className="bg-orange-400 hover:scale-125 duration-300 mx-1 text-neutral-content rounded-full w-8">
                <span>
                  <img src={sad} alt="" />
                </span>
              </div>
              <div onClick={()=>{
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

export default SingleBlog;
