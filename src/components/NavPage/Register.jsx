import React, { useContext, useState } from "react";
import "./NavCss/Register.css";
import Lottie from "lottie-react";
import render from "../../../public/login.json";
import formLogo from "../../../public/Images/navLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from "./AuthProvider";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import useTitle from "../hooks/useTitle";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const imageUploadKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY

const Register = () => {
  useTitle("Register");
  const navigate = useNavigate()

  const { createUser, fbLogin, emailVerify, googleLogin, upDateProfile } =
    useContext(mainContext);

  const { handleSubmit, register, formState: { errors }, watch } = useForm()

  const onSubmit = (data) => {

    const hosting_url = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`;

    const formData = new FormData();
    formData.append('image', data.photo[0]);

    fetch(hosting_url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imageData => {
        if (imageData.success) {
          const imageUrl = imageData.data.display_url;
          const { name, email, password } = data;
          const userInfo = { name, email, password, image: imageUrl };
          axios.post('http://localhost:5000/users', userInfo)
            .then((res) => {
              console.log(res)
            })
        }

        createUser(data.email, data.password)
          .then((result) => {
            console.log(result)
            // emailVerify(result.user)
            toast.success(`successfully register ${data.name}`)
            setTimeout(() => {
              navigate('/login')
            }, 1000);

            upDateProfile(data.name, imageData.data.display_url)
              .then(res => {
                console.log(res)
              })
              .catch(error => {
                console.log(error)
              })

          })
          .catch(error => {
            console.log(error)
          })

      })
  }

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
        const user = result.user;
        const userInfo = { name: user.displayName, email: user.email, image:user.photoURL }
        axios.post('http://localhost:5000/users', userInfo)
          .then((res) => {
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
          <div className="regiForm">
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="formLogo">
                <img src={formLogo} alt="" />
              </div>
              <h1 className="text-center text-xl font-bold py-3 border-b mb-5">
                Please Register
              </h1>

              <label htmlFor="name">Name</label>
              <input type="text" {...register('name', { required: true })} placeholder="Name" id="" />
              {errors.name?.type === 'required' && <p className="text-red-500 mt-0">Name is required*</p>}

              <label htmlFor="email">Email</label>
              <input type="email" {...register('email', { required: true })} placeholder="Email" id="" />
              {errors.email?.type === 'required' && <p className="text-red-500 mt-0">Email is required*</p>}

              <label htmlFor="password">Password</label>

              <input
                type="password"
                {...register('password', { required: true, maxLength: 10, minLength: 6 })}
                placeholder="Password"
                id=""
              />
              {errors.password?.type === 'required' && <p className="text-red-500 mt-0">Password is required*</p>}
              {errors.password?.type === 'maxLength' && <p className="text-red-500 mt-0">Maximum password is 10*</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-500 mt-0">Minimum password is 6*</p>}

              <label htmlFor="confirm">Confirm Password</label>

              <input
                type="password"
                {...register('confirm', { required: true, validate: (value) => value === watch('password') || 'Password do not match' })}
                placeholder="Confirm Password"
                id=""
              />
              {errors.confirm && <p className="text-red-500">{errors.confirm.message}</p>}
              <input
                type="file"
                className="mt-4"
                {...register('photo')}
                id=""
              />

              <button type="submit" className="btn w-full">
                Register
              </button>
              <p className="mt-2">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-500 underline">login here</span>
                </Link>
              </p>
            </form>
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
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <Lottie animationData={render} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
