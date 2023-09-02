import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Css/Header.css";
import navlogo from "/public/Images/navLogo.png";
import { mainContext } from "../NavPage/AuthProvider";
import toast from "react-hot-toast";
import Container from "../Container";
import useAllUser from "../hooks/useAllUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowRightToBracket, faBars, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, logOut } = useContext(mainContext);
  const [showMenu, setShowMenu] = useState(false)
  const { users } = useAllUser();

  const signOut = () => {
    setTimeout(() => {
      logOut()
        .then((result) => {
          toast.success("successfully sign out!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }, 1000);
  };

  return (
    <div className="bg-color relative backdrop-blur-lg z-50">
      <Container>
        <div className="relative z-50 h-[70px] flex justify-between items-center">
          <img className="md:h-[60%] h-[40%] ml-4" src={navlogo} alt="" />
          <nav className="flex relative items-center">
            <div className='hidden md:block'>
              <NavLink className={({ isActive }) => isActive ? 'bg-[#CBE4DE] py-2 px-4 text-[#2C3333] rounded-full' : 'py-2 px-4'} to="/">Home</NavLink>
              <NavLink className={({ isActive }) => isActive ? 'bg-[#CBE4DE] py-2 px-4 text-[#2C3333] rounded-full' : 'py-2 px-4'} to="/blog">Blogs</NavLink>
              <NavLink className={({ isActive }) => isActive ? 'bg-[#CBE4DE] py-2 px-4 text-[#2C3333] rounded-full' : 'py-2 px-4'} to="/about">About</NavLink>
              <NavLink className={({ isActive }) => isActive ? 'bg-[#CBE4DE] py-2 px-4 text-[#2C3333] rounded-full' : 'py-2 px-4'} to="/contact">Contact</NavLink>
              {user && <NavLink to="/dashboard/diposite">Dashboard</NavLink>}
              {!user && <NavLink to="/login">
                <button className="login">Login</button>
              </NavLink>}
              {!user && (
                <span>
                  <NavLink to="/register">
                    <button className="registers">Register</button>
                  </NavLink>
                </span>
              )}
            </div>
            <div onClick={() => setShowMenu(!showMenu)} className="flex relative items-center mx-5 justify-center">
              {user && (
                <div className="avatar md:block hidden cursor-pointer">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
              )}
              <div className="md:hidden ml-3" onClick={() => setShowMenu(!showMenu)}>
                <span>
                  {showMenu ? <FontAwesomeIcon className="text-xl" icon={faXmark} /> : <FontAwesomeIcon className="text-xl" icon={faBars} />}
                </span>
              </div>
              {
             showMenu&& <div className={`absolute duration-500 flex flex-col items-center justify-center md:top-11 top-6 w-96 right-0 h-auto rounded-xl bg-white backdrop-blur-2xl bg-opacity-90 p-3`}>

                  {user && users && <div className="w-full flex items-center flex-col justify-center mb-3">
                    <div className="avatar mb-3 flex justify-center w-full cursor-pointer">
                      <div className="w-16 rounded-full">
                        <img src={user?.photoURL} />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="text-black font-semibold">{user?.displayName}</h1>
                      <h1 className="text-black font-semibold">ID: {users?._id.slice(0, 6)}</h1>
                    </div>
                  </div>}

                  <div className="w-full mb-5 md:hidden block border-b pb-2 border-gray-400 space-y-2">
                    <p className="text-black font-semibold">
                      <Link to='/'>Home</Link>
                    </p>
                    <p className="text-black font-semibold">
                      <Link to='/blog'>Blogs</Link>
                    </p>
                    <p className="text-black font-semibold">
                      <Link to='/about'>About</Link>
                    </p>
                    <p className="text-black font-semibold">
                      <Link to='/contact'>Contact</Link>
                    </p>
                    <p className="text-black font-semibold">
                      <Link to='/dashboard/diposite'>Dashboard</Link>
                    </p>
                  </div>
                  {user ? <button onClick={signOut} className="btn btn-block bg-[#118388] border-none outline-none hover:bg-[#2F4F4F]">
                    <Link to='/'><FontAwesomeIcon className="mr-2" icon={faArrowRightFromBracket}/>Logout</Link>
                  </button> :
                    <div className="flex justify-start w-full">
                      <NavLink to="/login">
                        <button className="btn bg-[#118388] border-none outline-none hover:bg-[#2F4F4F]"><FontAwesomeIcon className="mr-2" icon={faArrowRightToBracket}/> Login</button>
                      </NavLink> <NavLink to="/register">
                        <button className="btn bg-[#2F4F4F] border-none outline-none hover:bg-[#118388]"><FontAwesomeIcon className="mr-2" icon={faUserPlus}/> Register</button>
                      </NavLink>
                      </div>}
                </div>
              }
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
