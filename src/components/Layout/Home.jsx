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
        <img className="w-[65%]" src={logo} alt="" />
      </div>
      <div className="flex relative items-center mb-10 h-12 w-[65%] justify-center mx-auto">
        <input
          className="emailInput h-14 px-5 rounded-full"
          type="email"
          name="email"
          id=""
          placeholder="Your Email Address"
        />
        <div className="sendBtnDiv">
        <button className="send ml-3 h-10 w-32 rounded-full text-white">
          Send
        </button>
        </div>
      </div>
      <div className="my-10">
        <Link to='/diposite'><button className="get">Diposite Now</button></Link>
      </div>
    </div>
  );
};

export default Home;
