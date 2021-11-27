import React from "react";
import "./App.scss";
import { usePosts } from "./providers/postsProvider";

const App = () => {
  const { posts, nextPage, previousPage } = usePosts();

  return (
    <div className="App">
      <button onClick={previousPage}>Previous page</button>
      <button onClick={nextPage}>Next page</button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
