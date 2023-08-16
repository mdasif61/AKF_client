import React from "react";
import useAllUser from "../hooks/useAllUser";
import useTitle from "../hooks/useTitle";
import SideNav from "./SideNav";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";

const ProfileSetting = () => {
  useTitle("Profile Setting");
  const { users } = useAllUser()
  const [axiosSecure] = useAxiosSecure();
  const [profileLoading,setPorfileLoading]=useState(false);
  
  const { handleSubmit, register } = useForm()
  const [bioText,setBioText]=useState('')

  const mutation = useMutation(async (data) => {
    return await axiosSecure.patch(`/profile-update?email=${users?.email}`, data)
      .then(res => res.data)
  },
    {
      onSuccess: (data) => {
        setPorfileLoading(false)
        console.log(data)
      }
    })

  const onSubmit = (data) => {
    setPorfileLoading(true)
    mutation.mutate(data)
  }

  return (
    <div>
      <SideNav>
        <div className="profile shadow-lg">
          <div className="w-full h-full flex justify-between">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={users.image} />
              </div>
            </div>
            <div className="flex-1 ml-8 flex items-center">
              <div>
                <h1 className="text-2xl border-black">
                  {users.name}
                </h1>
                <h3 className="text-gray-500 text-sm">
                  <span className="font-semibold">E-mail :</span> {users.email}
                </h3>
              </div>
            </div>
          </div>
          <div className="my-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="w-full">
                  <label htmlFor="firstName">
                    <span className="font-semibold">First Name</span>
                  </label>
                  <br />
                  <input
                    className="w-full focus:outline-none border py-2 px-4 rounded-xl mt-2 h-12 focus:border-2"
                    placeholder="First Name"
                    type="text"
                    {...register("firstName")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="lastName">
                    <span className="font-semibold">Last Name</span>
                  </label>
                  <br />
                  <input
                    className="w-full focus:outline-none border py-2 px-4 rounded-xl mt-2 h-12 focus:border-2"
                    placeholder="Last Name"
                    type="text"
                    {...register("lastName")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="address">
                    <span className="font-semibold">Address</span>
                  </label>
                  <br />
                  <input
                    className="w-full focus:outline-none border py-2 px-4 rounded-xl mt-2 h-12 focus:border-2"
                    placeholder="Address"
                    type="text"
                    {...register("address")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="phone">
                    <span className="font-semibold">Phone</span>
                  </label>
                  <br />
                  <input
                    className="w-full focus:outline-none border py-2 px-4 rounded-xl mt-2 h-12 focus:border-2"
                    placeholder="Phone"
                    type="text"
                    {...register("phone")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="blood">
                    <span className="font-semibold">Blood</span>
                  </label>
                  <br />
                  <input
                    className="w-full focus:outline-none border py-2 px-4 rounded-xl mt-2 h-12 focus:border-2"
                    placeholder="Blood Group"
                    type="text"
                    {...register("blood")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="gender">
                    <span className="font-semibold">Gender</span>
                  </label>
                  <br />
                  <div className="flex w-full h-12 mt-2">
                    <div className="border py-2 px-4 h-12 flex items-center w-full rounded-xl mr-1 cursor-pointer">
                      <input type="radio" {...register("gender")} value='Male' id="" />
                      <span className="mx-3">Male</span>
                    </div>
                    <div className="border py-2 px-4 h-12 flex items-center w-full rounded-xl ml-1 cursor-pointer">
                      <input type="radio" {...register("gender")} value='Female' id="" />
                      <span className="mx-3">Female</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="bio">
                  <span className="font-semibold">Bio</span>
                </label>
                <br />
                <textarea
                  {...register("bio")}
                  onChange={(e)=>setBioText(e.target.value)}
                  className="w-full p-5 mt-2 focus:outline-none border resize-none rounded-xl"
                  placeholder="Bio"
                  id=""
                  maxLength={200}
                ></textarea>
                <p className="text-gray-400 text-sm text-right">Length : {bioText.length}/200</p>
              </div>

              <div className="w-full text-right mt-4">
                <input disabled={profileLoading} className="btn bg-green-500 border-none outline-none hover:bg-green-600" type="submit" value={profileLoading?'Saving...':'SAVE PROFILE'} />
              </div>
            </form>
          </div>
        </div>
      </SideNav>
    </div>
  );
};

export default ProfileSetting;
