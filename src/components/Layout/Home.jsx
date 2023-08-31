import React from "react";
import "./Css/Home.css";
import logo from "/public/Images/logo.png";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home")
  return (
    <div className="home flex flex-col items-center justify-center w-full">
      <div className="w-full flex items-center justify-center">
        <img className="md:w-[65%] w-[95%]" src={logo} alt="" />
      </div>
    <div className="flex relative items-center md:mb-10 h-8 md:h-12 w-[95%] sm:w-[80%] md:w-[70%] justify-center mx-auto">
        <input
          className="emailInput h-12 md:h-14 px-5 rounded-full"
          type="email"
          name="email"
          id=""
          placeholder="Your Email Address"
        />
        <div className="sendBtnDiv">
        <button className="send ml-3 h-8 md:h-10 w-32 rounded-full text-white">
          Send
        </button>
        </div>
      </div>
      <div className="md:my-10 my-7">
        <Link to='/diposite'><button className="get">Diposite Now</button></Link>
      </div>
    </div>
  );
};

export default Home;
