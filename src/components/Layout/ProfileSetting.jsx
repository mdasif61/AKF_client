import React from "react";
import useAllUser from "../hooks/useAllUser";
import useTitle from "../hooks/useTitle";
import SideNav from "./SideNav";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ProfileSetting = () => {
    useTitle("Profile Setting");
    const {users}=useAllUser()
    const [axiosSecure]=useAxiosSecure()

    const {handleSubmit, register}=useForm()

    const mutation=useMutation(async(data)=>{
        return await axiosSecure.patch(`/profile-update?email=${users?.email}`,data)
        .then(res=>res.data)
    },
    {
        onSuccess:(data)=>{
            console.log(data)
        }
    })

    const onSubmit=(data)=>{
        mutation.mutate(data)
    }

  return (
    <div>
      <SideNav>
        <div className="profile shadow-lg">
          <div className="w-full h-full flex justify-between">
            <div className="w-36 h-36 bg-white shadow-xl border-2 rounded-full flex items-center justify-center overflow-hidden">
              <img className="w-full" src={users.image} alt="" />
            </div>
            <div className="flex-1 ml-8 flex items-center">
              <div>
                <h1 className="text-2xl border-b-2 border-black pb-1">
                  {users.name}
                </h1>
                <h3 className="text-gray-500">
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
                  className="w-full p-5 mt-2 focus:outline-none border resize-none rounded-xl"
                  placeholder="Bio"
                  id=""
                ></textarea>
              </div>

              <div className="w-full text-right mt-4">
                <input className="btn" type="submit" value="SAVE PROFILE" />
              </div>
            </form>
          </div>
        </div>
      </SideNav>
    </div>
  );
};

export default ProfileSetting;
