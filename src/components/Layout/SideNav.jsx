import React, { useEffect, useState } from "react";
import "./Css/SideNav.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faDiamondTurnRight,
  faGear,
  faHouseSignal,
  faMoneyCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SideNav = ({ children }) => {
  const [show, setShow] = useState(false);
  const [showSideBar,setShowSideBar]=useState(false)

  return (
    <div className="sideNav relative">
      <div className={`manu absolute h-screen bg-white backdrop-blur-xl bg-opacity-60 z-50 ${showSideBar?' left-0 duration-500':'-left-96 duration-500'} w-auto md:sticky md:block md:w-[25%]`}>
        <p>
          <NavLink
            to="/dashboard/diposite"
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            <FontAwesomeIcon icon={faMoneyCheck} /> Diposite Now
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/dashboard/history"
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} /> Diposite History
          </NavLink>
        </p>
        <p onMouseOver={() => setShow(true)} onClick={() => setShow(!show)}>
          <NavLink className="manu-p">
            <FontAwesomeIcon icon={faGear} /> Settings
          </NavLink>
        </p>
        <ul className={`${show ? "block pl-10" : "hidden"}`}>
          <li className="my-2">
            <NavLink
              className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
              to="/dashboard/profile-setting"
            >
              Profile setting
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
              to="/dashboard/security"
            >
              Security
            </NavLink>
          </li>
        </ul>
        <p>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            <FontAwesomeIcon icon={faUser} /> Profile
          </NavLink>
        </p>
        <p>
          <Link className="manu-p" to="/">
            <FontAwesomeIcon icon={faHouseSignal} />{" "}
            <button className=" text-black">Back To Home</button>
          </Link>
        </p>
      </div>
      <div onClick={()=>setShowSideBar(!showSideBar)} className="absolute ml-5 mt-5 z-50">
        <div className="avatar placeholder fixed md:hidden">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <FontAwesomeIcon className="text-xl" icon={faDiamondTurnRight} />
          </div>
        </div>
      </div>
      <div className="md:w-[75%] w-full">{children}</div>
    </div>
  );
};

export default SideNav;
