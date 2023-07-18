import React from "react";
import useTitle from "../hooks/useTitle";
import useAllBlogs from "../hooks/useAllBlogs";
import Container from "../Container";

import SingleBlog from "./SingleBlog";

const Blog = () => {
  useTitle("Blog");
  const { allBlog } = useAllBlogs();
  return (
    <div>
      <Container>
        <div className="flex gap-5">
          <div className="sticky top-0 h-screen w-[30%]">
            <h1>Left Content</h1>
          </div>
          <div className="w-[40%]">
            {allBlog.map((blog) => (
              <SingleBlog
              key={blog._id}
              blog={blog}
              ></SingleBlog>
            ))}
          </div>
          <div className="sticky w-[30%] top-0 h-screen">
            <h1>Left Content</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
