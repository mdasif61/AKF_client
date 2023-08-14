import React, { useContext, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import render from "../../../public/loginTwo.json";
import formLogo from "../../../public/Images/navLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mainContext } from "./AuthProvider";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login")
  const [error, setError] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn, forgot} = useContext(mainContext);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result);
        toast.success("successfully login");
        navigate(from);
        // if (result.user.emailVerified) {
        //   setTimeout(() => {
        //     navigate(from);
        //   }, 1000);
        //   return;
        // } else {
        //   alert("please verify your email");
        // }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const forgotPassword = () => {
    forgot(emailRef.current.value)
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="h-auto register">
      <div className="flex p-30 w-full h-full">
        <div className="w-[50%] flex p-20 justify-center flex-col">
          <form onSubmit={handleLogin} className="regiForm">
            <div className="formLogo">
              <img src={formLogo} alt="" />
            </div>
            <h1 className="text-center text-xl font-bold py-3 border-b mb-5">
              Please Login
            </h1>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Email"
              id=""
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              id=""
            />
            <button className="btn w-full">Login</button>
            <p className="mt-2">
              Not A Member?{" "}
              <Link to="/register">
                <span className="text-blue-500 underline">Register</span>
              </Link>
            </p>
            <p
              onClick={forgotPassword}
              className="text-blue-500 underline text-right cursor-pointer"
            >
              Forgot?
            </p>
            <p className="text-red-500">{error}</p>
          </form>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <Lottie animationData={render} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
