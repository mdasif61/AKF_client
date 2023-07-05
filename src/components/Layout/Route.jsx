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
import Settings from "./Settings";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import SinglePost from "./SinglePost";

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
        path: "/service",
        element: <PrivateRoute><Service></Service></PrivateRoute>,
      },
      {
        path: "/blog",
        element: <PrivateRoute><Blog></Blog></PrivateRoute>,
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
        path: "/diposite",
        element: <PrivateRoute><Diposite></Diposite></PrivateRoute>,
      },
      {
        path: "/history",
        element: <PrivateRoute><History></History></PrivateRoute>,
      },
      {
        path:'/settings',
        element:<PrivateRoute><Settings></Settings></PrivateRoute>
      },
      {
        path:'/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'/blog/:id',
        element:<SinglePost></SinglePost>,
      }
    ],
  },
]);

export default router;
