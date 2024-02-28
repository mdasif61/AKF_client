import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import useAllBlogs from "../hooks/useAllBlogs";
import Container from "../Container";

import SingleBlog from "./SingleBlog";
import useSearchBlog from "../hooks/useSearchBlog";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Blog = () => {
  useTitle("Blog");
  const [axiosSecure] = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [blogsToDisplay, setBlogsToDisplay] = useState([]);
  const { allBlog } = useAllBlogs(searchText);
  const { searchData } = useSearchBlog(searchText);

  useEffect(() => {
    if (searchText) {
      setBlogsToDisplay(searchData);
    } else {
      setBlogsToDisplay(allBlog);
    }
  }, [searchText, allBlog, searchData]);

  const handleSearch = () => {
    axiosSecure
      .get(`/search-blog/${searchText}`)
      .then((res) => setBlogsToDisplay(res.data));
  };

  return (
    <div>
      <Container>
        <div className="flex gap-5">
          <div className="sticky top-0 h-screen md:block hidden w-[30%]">
            <h1>Left Content</h1>
          </div>
          <div className="md:w-[40%] w-full">
            <div className="w-full sticky top-20 z-50 my-4 flex h-12">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 focus:bg-slate-100 shadow-xl h-full px-5 focus:outline-none rounded-md"
                type="search"
                name=""
                id=""
                placeholder="search content..."
              />
              <button
                onClick={handleSearch}
                className="btn rounded-md bg-black ml-2"
              >
                Search
              </button>
            </div>
            {blogsToDisplay?.map((blog) => (
              <SingleBlog key={blog._id} blog={blog}></SingleBlog>
            ))}
          </div>
          <div className="sticky w-[30%] md:block hidden top-0 h-screen">
            <h1>Left Content</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
