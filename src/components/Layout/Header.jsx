import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Css/Header.css";
import navlogo from "/public/Images/navLogo.png";
import { mainContext } from "../NavPage/AuthProvider";
import toast from "react-hot-toast";
import Container from "../Container";

const Header = () => {
  const { user, logOut } = useContext(mainContext);

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
    <div className="bg-color z-50">
      <Container>
        <div className="relative z-50 h-[70px] flex justify-between items-center">
          <img className="h-[60%] ml-4" src={navlogo} alt="" />
          <nav className="flex items-center">
            <NavLink to="/">Home</NavLink>
            {user && <NavLink to="/dashboard/diposite">Dashboard</NavLink>}
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {user ? (
              <NavLink to="/">
                <button onClick={signOut} className="login">Logout</button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <button className="login">Login</button>
              </NavLink>
            )}
            {!user && (
              <span>
                <NavLink to="/register">
                  <button className="registers">Register</button>
                </NavLink>
              </span>
            )}
            <div>
              {user && (
                <span>
                  <img
                    className="rounded-full bg-gray-300 w-10 h-10 ml-4"
                    src={user.photoURL}
                    alt=""
                  />
                </span>
              )}
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
