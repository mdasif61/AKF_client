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
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <h1>Left Content</h1>
          </div>
          <div>
            {allBlog.map((blog) => (
              <SingleBlog
              key={blog._id}
              blog={blog}
              ></SingleBlog>
            ))}
          </div>
          <div>
            <h1>Left Content</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
