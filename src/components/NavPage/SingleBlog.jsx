import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEnvelope,
  faFemale,
  faGroupArrowsRotate,
  faLocation,
  faMale,
  faPaperPlane,
  faPhone,
  faShare,
  faThumbsUp,
  faTrash,
  faXmark,
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
import useReaction from "../hooks/useReaction";
import useAllBlogs from "../hooks/useAllBlogs";
import useTotalReaction from "../hooks/useTotalReaction";
import useReactedProfile from "../hooks/useReactedProfile";
import useCommentProfile from "../hooks/useCommentProfile";

const SingleBlog = ({ blog }) => {
  const [axiosSecure] = useAxiosSecure()

  const [open, setOpen] = useState(false);
  const [likeBox, setLikeBox] = useState(false);
  const { profile } = useProfile(blog?.userId);
  const [profileShow, setProfileShow] = useState(false);
  const [showReactedName, setShowReactedName] = useState(false);
  const [send, setSend] = useState(false)
  const [reaction, setReaction] = useState('');
  const { users } = useAllUser();
  const { commentProfile, refetch: commentRefetch } = useCommentProfile(blog?._id);
  const { reacted, refetch: reactedRefetch } = useReactedProfile(blog?.reaction, blog?._id);
  const { refetch: blogRefetch } = useAllBlogs();
  const { single_react, reactLoading, isFetching, refetch } = useReaction(blog?.reaction, blog._id);
  const [showText, setShowText] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showCommentText, setShowCommentText] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const { totalReactCount, refetch: totalReactRefetch } = useTotalReaction(blog?._id);
  const commentRef = useRef(null);
  const [showImg, setShowImg] = useState(false)
  const [imgData, setImgData] = useState(null)

  let check;
  if (!reactLoading && !isFetching) {
    single_react?.map((name) => {
      check = (Object.keys(name.reaction).join(''));
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
        if (data.result.modifiedCount > 0) {
          refetch()
          totalReactRefetch()
          reactedRefetch()
          blogRefetch()
        }
      }
    },
    {
      onError: (error) => {
        console.log(error)
      }
    }
  );

  const commentMutation = useMutation(
    async (comment) => {
      return await axiosSecure.patch(`/blog/comments/${blog._id}?user=${users._id}`, { comment }).then(res => res.data)
    },
    {
      onSuccess: (data) => {
        if (data.modifiedCount > 0) {
          commentRef.current.value = ''
          refetch()
          totalReactRefetch()
          reactedRefetch()
          commentRefetch()
          blogRefetch()
        }
      }
    },
    {
      onError: (error) => {
        console.log(error)
      }
    }
  );

  const submitComment = () => {
    commentMutation.mutate(commentRef.current.value)
  }

  const handlePostImgShow = (img) => {
    console.log(img)
    setShowImg(true);
    setImgData(img)
  }

  return (
    <>
      {showImg && <div className="w-full h-screen bg-zinc-300 backdrop-blur-sm bg-opacity-60 z-[100] fixed top-1/2 flex items-center justify-center left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-5/12 h-auto relative p-3 bg-white shadow-2xl">
          <button onClick={() => setShowImg(false)} className="btn bg-red-500 right-5 top-5 btn-sm btn-circle border-none outline-none absolute">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img className="w-full" src={imgData} alt="" />
        </div>
      </div>}
      <div className="w-full relative bg-white rounded-lg mb-5">
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
            {/* profile start */}
            {profileShow && (
              <div
                onMouseOver={() => setProfileShow(true)}
                onMouseOut={() => setProfileShow(false)}
                className="p-5 bg-gray-100 shadow-md md:-left-1/2 top-10 flex items-center justify-center backdrop-blur-lg bg-opacity-70 z-40 rounded-xl absolute"
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

          <p onClick={() => setShowText(!showText)}>{showText ? blog.text : <>
            {blog.text.slice(0, 150)}
            {" "}
            {blog.text.length > 150 && <button className="text-gray-400 text-base" onClick={() => setShowText(!showText)}>see more</button>}
          </>}</p>
          <div
            className={`overflow-hidden avatar ${blog.photo.length && "h-56"
              } object-cover ${blog.photo.length > 2 && blog.photo.length <= 4
                ? "grid-cols-2"
                : blog.photo.length > 4
                  ? "grid-cols-3"
                  : ""
              } grid grid-cols-1 mt-4`}
          >
            {blog.photo.map((img, index) => (
              <div onClick={() => handlePostImgShow(img)} key={index} className="h-full w-full">
                <img
                  className="w-full hover:scale-95 duration-200 object-cover object-center"
                  src={img}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex ml-2">
              {totalReactCount[0]?.remainIcon.map((react) => (
                <div>
                  {react === 'like' && <img className="w-4" src={like} alt="" />}
                  {react === 'love' && <img className="w-4" src={love} alt="" />}
                  {react === 'care' && <img className="w-4" src={care} alt="" />}
                  {react === 'wow' && <img className="w-4" src={wow} alt="" />}
                  {react === 'sad' && <img className="w-4" src={sad} alt="" />}
                  {react === 'haha' && <img className="w-4" src={haha} alt="" />}
                  {react === 'angry' && <img className="w-4" src={angry} alt="" />}
                </div>
              ))}
            </div>
            {totalReactCount[0]?.totalReactionCount > 0 && <p onMouseOver={() => setShowReactedName(true)} onMouseOut={() => setShowReactedName(false)} className="text-gray-500 ml-2 hover:underline hover:cursor-pointer">{totalReactCount[0]?.totalReactionCount}</p>}
          </div>
          {blog.comments.length > 0 && <div onClick={() => setShowCommentBox(!showCommentBox)} className="mr-3 flex items-center hover:underline cursor-pointer justify-center">
            <p>{blog.comments.length}</p>
            <FontAwesomeIcon className="text-gray-400 ml-1" icon={faComment} />
          </div>}
        </div>

        {showReactedName && <div className="absolute left-10 bg-gray-200 bg-opacity-80 z-50 p-2 rounded-lg">
          {reacted.map((name) => <p className="text-sm">{name.name}</p>)}
        </div>}

        <div className="w-full relative border-t p-2">
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
            <div onClick={() => setShowCommentBox(!showCommentBox)} className="hover:bg-gray-200 duration-300 cursor-pointer p-2 font-semibold text-gray-500 text-center rounded-md">
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
        {
          // ref={commentBoxRef}
          showCommentBox && <div onClick={() => setSend(!send)} className={`w-11/12 flex flex-col h-10 mx-auto border overflow-hidden ${send ? 'h-20 rounded-2xl' : 'rounded-full'} border-gray-300 text-gray-500 my-4`}>

            <textarea ref={commentRef} name="" className={`${send ? 'h-[60%]' : 'h-full'} px-4 overflow-y-hidden py-2 resize-none focus:outline-none w-full`} id="" placeholder="Write a public comment..."></textarea>
            {
              send && <div className="text-right px-5">
                <button type="submit" onClick={submitComment} className="mb-3">
                  <FontAwesomeIcon className="text-blue-500 hover:text-blue-600" icon={faPaperPlane} />
                </button>
              </div>
            }
          </div>
        }

        {/* all-comment */}
        {
          showCommentBox && <div className="p-5">
            <>
              {
                showComment ? <>
                  {blog.comments.length > 3 && <button className="text-gray-500 font-semibold mb-3" onClick={() => setShowComment(!showComment)}>See less comments</button>}
                  {blog.comments.map((comment) => (
                    <div className="flex items-start justify-start">
                      <div>
                        {
                          commentProfile.flatMap((profile) => (
                            comment.user === profile._id && <div className="avatar">
                              <div className="w-7 rounded-full cursor-pointer">
                                <Link to={`/blog/see-profile/${profile?._id}`}><img src={profile.image} alt="" /></Link>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <div className="bg-gray-300 py-2 px-4 rounded-2xl ml-1 mb-2 bg-opacity-30">
                        {commentProfile.flatMap((profile) => (
                          comment.user === profile._id && <Link to={`/blog/see-profile/${profile?._id}`}>
                            <h3 className="font-semibold hover:underline">{profile.name}</h3></Link>
                        ))}
                        <p onClick={() => setShowCommentText(!showCommentText)}>{showCommentText ? comment.comment : <>
                          {comment.comment.slice(0, 200)}
                          {" "}
                          {comment.comment.length > 200 && <button onClick={() => setShowCommentText(!showCommentText)} className="text-gray-500 hover:underline font-semibold">...see more</button>}
                        </>}</p>
                      </div>
                    </div>

                  ))}
                  {blog.comments.length > 3 && <button className="text-gray-500 font-semibold" onClick={() => setShowComment(!showComment)}>See less comments</button>}
                </> : <>
                  {" "}
                  {blog.comments.slice(0, 3).map((comment) => (
                    <div className="flex items-start justify-start">
                      <div>
                        {
                          commentProfile.flatMap((profile) => (
                            comment.user === profile._id &&
                            <div className="avatar">
                              <div className="w-7 rounded-full cursor-pointer">
                                <Link to={`/blog/see-profile/${profile?._id}`}><img src={profile.image} alt="" /></Link>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <div className="bg-gray-300 py-2 px-4 rounded-2xl ml-1 mb-2 bg-opacity-30">
                        {commentProfile.flatMap((profile) => (
                          comment.user === profile._id && <Link to={`/blog/see-profile/${profile?._id}`}>
                            <h3 className="font-semibold hover:underline">{profile.name}</h3></Link>
                        ))}
                        <p onClick={() => setShowCommentText(!showCommentText)}>{showCommentText ? comment.comment : <>
                          {comment.comment.slice(0, 200)}
                          {" "}
                          {comment.comment.length > 200 && <button onClick={() => setShowCommentText(!showCommentText)} className="text-gray-500 hover:underline font-semibold">...see more</button>}
                        </>}</p>
                      </div>
                    </div>
                  ))}
                  {blog.comments.length > 3 && <button className="text-gray-500 font-semibold" onClick={() => setShowComment(!showComment)}>View more comments</button>}
                </>
              }
            </>
          </div>
        }

      </div>
    </>
  );
};

export default SingleBlog;
