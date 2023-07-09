import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "/public/Images/navLogo.png";
import "./Css/Footer.css";
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col w-[50%] items-center justify-center p-5">
            <div>
              <img className="w-48" src={footerLogo} alt="" />
            </div>
            <div className="mt-5">
              <Link to="/">Home</Link>
              <Link to="/service">Service</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[50%]">
            <div className="subscribe items-center relative flex w-[70%] h-10">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                id=""
                className="h-[100%] w-[100%] px-3 rounded-md subsInput"
              />
              <div className="subsBtn absolute right-1">
                <button className="h-8 px-3 rounded-md">Subscribe</button>
              </div>
            </div>
            <div className="flex icon">
              <span><FaFacebook /></span>
              <span><FaGoogle /></span>
              <span><FaInstagram /></span>
              <span><FaTwitter /></span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
