import React, { useContext, useState } from "react";
import "./NavCss/Register.css";
import Lottie from "lottie-react";
import render from "../../../public/login.json";
import formLogo from "../../../public/Images/navLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from "./AuthProvider";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import useTitle from "../hooks/useTitle";
import axios from "axios";

const Register = () => {
  useTitle("Register");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [processing, setProcessing] = useState(0);
  const { createUser, user, fbLogin, emailVerify, googleLogin, upDateProfile } =
    useContext(mainContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (!email) {
      setError("Email is required");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    } else if (!(password == confirm)) {
      setError("confirm password not match! try again");
      return;
    }

    if (!photo) {
      setError("Photo is required");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
        emailVerify(result.user);
        setError("");
        toast.success(`Successfully register! ${name}`);
        setTimeout(() => {
          navigate("/login");
        }, 1000);

        upDateProfile(result.user, photo, name)
          .then((result) => {
            console.log(result);
            const user = { name, email, password };
            console.log(user)
            axios.post("http://localhost:5000/users", user)
            .then((userData)=>{
              console.log(userData)
            })
            
          })
          .catch((error) => {
            console.log(error);
          });

        form.reset();
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `user/${crypto.randomUUID()}/${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        setProcessing(progress);
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhoto(downloadURL);
        });
      }
    );
  };

  const handleFB = () => {
    const provider = new FacebookAuthProvider();
    fbLogin(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    googleLogin(googleProvider)
      .then((result) => {
        console.log(result);
        const user=result.user;
        const userInfo={name:user.displayName, email:user.email}
        axios.post('http://localhost:5000/users', userInfo)
        .then((res)=>{
          console.log(res)
        })
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="h-auto register">
      <div className="flex p-30 w-full h-full">
        <div className="w-[50%] flex p-20 justify-center flex-col">
          <form onSubmit={handleSubmit} className="regiForm">
            <div className="formLogo">
              <img src={formLogo} alt="" />
            </div>
            <h1 className="text-center text-xl font-bold py-3 border-b mb-5">
              Please Register
            </h1>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Name" id="" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" id="" />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              id=""
            />

            <label htmlFor="confirm">Confirm Password</label>

            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              id=""
            />
            <input
              onChange={handlePhoto}
              type="file"
              className="mt-4"
              name=""
              id=""
            />

            {processing > 0 && (
              <div
                className={`bg-gray-200 w-full rounded-full dark:bg-gray-700`}
              >
                <div
                  className="bg-blue-600 text-xs font-medium mb-4 text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${processing}%` }}
                >
                  {processing}
                </div>
              </div>
            )}

            <button disabled={!photo} className="btn w-full">
              Register
            </button>
            <p className="mt-2">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 underline">login here</span>
              </Link>
            </p>
            <p className="text-red-500">{error}</p>
            <div
              onClick={handleFB}
              className="flex cursor-pointer hover:bg-blue-700 items-center justify-center mt-5 bg-blue-500 py-2 px-3 rounded-full"
            >
              <FaFacebook className="text-white text-2xl" />{" "}
              <span className="ms-5 text-md font-semibold text-white">
                Sign Up with facebook
              </span>
            </div>
            <div
              onClick={handleGoogle}
              className="flex cursor-pointer items-center justify-center mt-5 bg-[#DB4437] py-2 px-3 rounded-full"
            >
              <FaGoogle className="text-white text-2xl"></FaGoogle>
              <span className="ms-5 text-md font-semibold text-white">
                Sign Up With Google
              </span>
            </div>
          </form>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <Lottie animationData={render} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
