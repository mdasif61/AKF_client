import React, { useEffect, useState } from "react";
import "./Css/SideNav.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faGear,
  faHouseSignal,
  faMoneyCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SideNav = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="sideNav">
      <div className="manu">
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
      <div className="diposite">{children}</div>
    </div>
  );
};

export default SideNav;
