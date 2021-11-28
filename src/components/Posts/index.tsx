import React from "react";
import { usePosts } from "../../providers/postsProvider";
import Pagination from "../Pagination";
import "../../styles/posts.scss";
import Loading from "../Loading";
import FailToLoad from "../FailToLoad";

const Posts = () => {
  const { posts, error } = usePosts();

  return (
    <>
      {posts.length === 0 && error === false ? (
        <Loading />
      ) : error === true ? (
        <FailToLoad />
      ) : (
        <div className="Container">
          <h2>Últimas postagens</h2>
          <div className="PostContainer">
            <div className="PostContainer__Header">
              <span className="PostContainer__Title">Título</span>
              <span className="PostContainer__Content">Conteúdo</span>
            </div>
            {posts.map((post) => (
              <div className="PostContainer__Post" key={post.id}>
                <span className="PostContainer__Title">{post.title}</span>
                <span className="PostContainer__Content">{post.body}</span>
              </div>
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </>
  );
};

export default Posts;
