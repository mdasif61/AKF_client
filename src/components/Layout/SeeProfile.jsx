import { useParams } from "react-router-dom";
import useSeeProfile from "../hooks/useSeeProfile";
import SeePost from "./SeePost";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFemale, faGroupArrowsRotate, faLocation, faMale, faPhone, faSearch, faVideo, faXmark } from "@fortawesome/free-solid-svg-icons";
import Container from "../Container";
import useProfile from "../hooks/useProfile";
import useSelfSearch from "../hooks/useSelfSearch";

const SeeProfile = () => {
  const { id } = useParams();
  const { member, isLoading } = useSeeProfile(id);
  const [showBio, setShowBio] = useState(false);
  const [postUser, setPostUser] = useState([]);
  const { profile } = useProfile(postUser);
  const [selfBlogSearch, setSelfBlogSearch] = useState('');
  const { selfBlog } = useSelfSearch(selfBlogSearch, id);
  const [displayBlog, setDisplayBlog] = useState([])
  const [showImg, setShowImg] = useState(false)
  const [imgData, setImgData] = useState(null)

  useEffect(() => {
    if (selfBlogSearch) {
      setDisplayBlog(selfBlog)
    } else {
      setDisplayBlog(member.result)
    }
  }, [selfBlogSearch, member.result, selfBlog])

  if (isLoading) {
    return (
      <div className="text-blue-500 flex items-center justify-center w-full h-screen">
        Loading...
      </div>
    );
  };

  const handleShowImg = (img) => {
    setShowImg(true)
    setImgData(img)
  }

  return (
    <>
      {showImg && <div className="w-full bg-zinc-300 backdrop-blur-sm bg-opacity-60 z-[100] h-screen fixed flex items-center justify-center">
        <div className="w-5/12 h-auto relative p-3 bg-white shadow-2xl">
          <button onClick={() => setShowImg(false)} className="btn bg-red-500 right-5 top-5 btn-sm btn-circle border-none outline-none absolute">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img className="w-full" src={imgData} alt="" />
        </div>
      </div>}
      <Container>
        <div className="mb-5">
          <div className="w-full flex md:flex-row flex-col items-center bg-gradient-to-t from-black to-gray-800 md:px-10 px-5 md:py-16 py-8 justify-between">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img src={profile.image} />
              </div>
            </div>
            <div className="flex-1 ml-6 my-5 flex items-center">
              <div>
                <h1 className="text-2xl text-white">
                  {profile.name}
                </h1>
                <h3 onClick={() => setShowBio(!showBio)} className={` text-gray-500 text-sm ${showBio ? 'w-10/12' : 'w-auto'}`}>{showBio ? profile.bio : <>
                  {profile?.bio?.slice(0, 20)}
                  {" "}
                  {profile?.bio?.length > 20 && <button onClick={() => setShowBio(!showBio)} className="text-gray-400">...see bio</button>}
                </>}</h3>
              </div>
            </div>
            <div className="flex">
              <button className="btn bg-black">
                {" "}
                <FontAwesomeIcon className="mr-2" icon={faVideo} /> Videos
              </button>
              <div className="ml-2 relative h-12 border flex items-center rounded-md border-gray-600">
                <FontAwesomeIcon className="absolute text-gray-400 px-4 left-0" icon={faSearch} />
                <input onChange={(e) => setSelfBlogSearch(e.target.value)} className="focus:outline-none text-gray-400 w-full h-full bg-black rounded-md pl-10 focus:border-2 focus:bg-gray-800 pr-4 py-2" placeholder="Search" type="search" name="" id="" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 grid-cols-1 md:w-9/12 w-full mx-auto md:grid-cols-5 h-full mt-7">
            <div className="md:col-span-2 font-semibold max-h-screen md:sticky top-0 bg-gray-800 text-white p-5 rounded-xl">
              <div className="space-y-2">
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
              </div>
              {member?.result?.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 my-7 bg-gray-700 p-3 rounded-xl">
                  {member?.result?.map((blog) =>
                    blog.photo.map((img, index) => (
                      <div key={index} className="avatar">
                        <div onClick={() => handleShowImg(img)} className="w-24 hover:scale-95 duration-200 relative cursor-pointer rounded-xl">
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
              {displayBlog?.map((post) => (
                <>
                  <SeePost
                    key={post._id}
                    post={post}
                    setPostUser={setPostUser}
                  ></SeePost>
                </>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SeeProfile;
