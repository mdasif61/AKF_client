import React from "react";
import "./Css/SideNav.css";
import { NavLink } from "react-router-dom";

const SideNav = ({ children }) => {
  return (
    <div className="sideNav h-[70vh]">
      <div className="manu">
        <p>
          <NavLink
            to="/diposite"
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            Diposite Now
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            Diposite History
          </NavLink>
        </p>
        <p>
          <NavLink to='/settings'
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            Settings
          </NavLink>
        </p>
        <p>
          <NavLink to='/profile'
            className={({ isActive }) => (isActive ? "manu-bg" : "manu-p")}
          >
            Profile
          </NavLink>
        </p>
      </div>
      <div className="diposite">
        {children}
      </div>
    </div>
  );
};

export default SideNav;
