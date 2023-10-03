import React, { useEffect } from "react";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slice/postSlice";
const PostsList = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const { loading, posts, error } = useSelector(state => {
    return state.posts;
  });
  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>Total Posts 100</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error !== "" ? (
          <h2>{error}</h2>
        ) : (
          posts.map((e, ind) => {
            return (
              <div key={`post${ind + 1}`} className="post-details">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default PostsList;
