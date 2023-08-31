import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useTitle from "../hooks/useTitle";
import Container from "../Container";

const Main = () => {
  useTitle("Home");
  return (
    <>
      {/* <Header></Header> */}
      <div className="min-h-screen">
        <Container>
          <Outlet></Outlet>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
