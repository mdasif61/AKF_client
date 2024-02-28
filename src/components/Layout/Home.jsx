import React from "react";
import "./Css/Home.css";
import logo from "/public/Images/logo.png";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div className="home flex flex-col items-center justify-center w-full">
      <div className="w-full flex items-center justify-center">
        <img className="md:w-[65%] w-[95%]" src={logo} alt="" />
      </div>
    </div>
  );
};

export default Home;
