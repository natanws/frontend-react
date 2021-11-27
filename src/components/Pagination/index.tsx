import React from "react";
import { usePosts } from "../../providers/postsProvider";

const Pagination = () => {
  const { previousPage, nextPage } = usePosts();

  return (
    <div>
      <button onClick={previousPage}>Previous page</button>
      <div>1</div>
      <button onClick={nextPage}>Next page</button>
    </div>
  );
};

export default Pagination;
