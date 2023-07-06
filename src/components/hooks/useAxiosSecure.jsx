import axios from "axios";
import { useContext, useEffect } from "react";
import { mainContext } from "../NavPage/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosSecure = () => {
    const {logOut}=useContext(mainContext);
    const navigate=useNavigate()

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
        (response)=>response,
        async(error)=>{
            if(error.response && (error.response.status===401 || error.response.status===403)){
                await logOut();
                navigate('/login')
            }
            return Promise.reject(error)
        }
    );
  }, [navigate, logOut]);

  return [axiosSecure]

};

export default useAxiosSecure;
