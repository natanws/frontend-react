import React from "react";
import { usePosts } from "../../providers/postsProvider";
import Pagination from "../Pagination";

const Posts = () => {
  const { posts, error } = usePosts();

  return (
    <div className="PostContainer">
      {posts.length === 0 && error === false
        ? "Loading..."
        : error === true
        ? "Failed to load"
        : posts.map((post) => (
            <div className="PostContainer__Post" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
      <Pagination />
    </div>
  );
};

export default Posts;
