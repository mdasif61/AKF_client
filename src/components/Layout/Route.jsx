import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Service from "../NavPage/Service";
import Blog from "../NavPage/Blog";
import About from "../NavPage/About";
import Contact from "../NavPage/Contact";
import Login from "../NavPage/Login";
import Register from "../NavPage/Register";
import Diposite from "./Diposite";
import History from "./History";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import SinglePost from "./SinglePost";
import ProfileSetting from "./ProfileSetting";
import Security from "./Security";
import SeeProfile from "./SeeProfile";
import PostEdit from "../PostEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <Blog></Blog>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/blog/:id",
        element: <SinglePost></SinglePost>,
      },
      {
        path:'/blog/see-profile/:id',
        element:<SeeProfile></SeeProfile>
      }
    ],
  },

  // dashboard routes

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Service></Service>
      </PrivateRoute>
    ),
    children: [
      {
        path: "diposite",
        element: (
          <PrivateRoute>
            <Diposite></Diposite>
          </PrivateRoute>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoute>
            <History></History>
          </PrivateRoute>
        ),
      },
      {
        path: "profile-setting",
        element: <ProfileSetting></ProfileSetting>,
      },
      {
        path:'security',
        element:<Security></Security>
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path:'postedit/:id',
        element:<PrivateRoute><PostEdit></PostEdit></PrivateRoute>
      }
    ],
  },
]);

export default router;
