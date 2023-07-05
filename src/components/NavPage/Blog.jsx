import React, { useEffect, useState } from "react";
import "./NavCss/Blog.css";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import useTitle from "../hooks/useTitle";

const Blog = () => {
  useTitle("Blog")
  const [post, setPost] = useState([]);
  const [rePost, setRepost] = useState([]);
  const [read, setRead] = useState(true);
  const navigate = useNavigate();
  const handlePost = (event) => {
    event.preventDefault();
    setRepost(event.target.post.value);
    const title = event.target.post.value;
    const random = Math.floor(Math.random() * 100000) + "";
    // storedPost(random);
    let rest = [];
    let posts = { title, random };
    const local = localStorage.getItem("Post");
    if (local) {
      rest = JSON.parse(local);
    }
    rest.push(posts);
    localStorage.setItem("Post", JSON.stringify(rest));

    event.target.reset();
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("Post"));
    if (local) {
      setPost(local);
    }
  }, [rePost]);

  const setId = (id) => {
    const local = JSON.parse(localStorage.getItem("Post"));

    const exist = local.find((pos) => pos.random == id);
    if (exist.random == id) {
      setRead(!read);
    }
  };

  return (
    <div className="h-[70vh] blog">
      <div className="allPost">
        {post ? (
          post.map((p) => (
            <div
              className="bg-gray-100 p-10 m-3 rounded-lg shadow-lg border"
              key={p.random}
            >
              {read ? (
                <>
                  <p>
                    {p.title.slice(0, 150)}
                    <span
                      className="text-blue-500"
                      onClick={() => {
                        // setRead(!read);
                        setId(p.random);
                      }}
                    >
                      {!p.title.length < 150 && "...read more"}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <img className="rounded-xl mb-3" src={url} alt="" />
                    {p.title}
                    <span
                      className="text-blue-500"
                      onClick={() => {
                        // setRead(!read);
                        setId(p.random);
                        // handleRead(p.random)
                      }}
                    >
                      read less...
                    </span>
                  </p>
                </>
              )}

              <button
                onClick={() => navigate(`/blog/${p.random}`)}
                className="btn"
              >
                Details Post
              </button>
            </div>
          ))
        ) : (
          <p>blog not found</p>
        )}
      </div>
      <form onSubmit={handlePost} className="w-full">
        <div className="flex w-full justify-between">
          <input
            type="text"
            placeholder="Share Your Blog"
            className="textArea"
            name="post"
            id=""
          />
          <button className="postBtn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
