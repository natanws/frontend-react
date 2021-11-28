import React, { useState } from "react";
import { usePosts } from "../../providers/postsProvider";
import "../../styles/pagination.scss";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Pagination = () => {
  const { previousPage, nextPage, posts, totalPages, jumpToPage, page } =
    usePosts();
  const pagesArray = [] as number[];
  const [ellipsisBefore, setEllipsisBefore] = useState<boolean>(false);
  const [ellipsisAfter, setEllipsisAfter] = useState<boolean>(false);

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const checkForEllipsis = (pageNumber: number) => {
    if (pageNumber < page && ellipsisBefore === false && page > 4) {
      setEllipsisBefore(true);
    }
    if (pageNumber > page && ellipsisAfter === false && page + 3 < totalPages) {
      setEllipsisAfter(true);
    }
  };

  const callNewPage = (pageNumber: number) => {
    setEllipsisBefore(false);
    setEllipsisAfter(false);
    jumpToPage(pageNumber);
  };

  const callPreviousPage = () => {
    setEllipsisBefore(false);
    setEllipsisAfter(false);
    previousPage();
  };
  const callNextPage = () => {
    setEllipsisBefore(false);
    setEllipsisAfter(false);
    nextPage();
  };

  return (
    <div className="PaginationContainer">
      {posts.length > 1 ? (
        <span className="PageCount">Exibindo {posts.length} postagens</span>
      ) : (
        <span className="PageCount">Exibindo {posts.length} postagem</span>
      )}
      <div>
        <button
          className={page === 1 ? "Button Disabled" : "Button"}
          onClick={callPreviousPage}
        >
          <MdArrowBackIos />
        </button>
        <button
          className={page === 1 ? "Button CurrentPage" : "Button"}
          onClick={() => callNewPage(1)}
        >
          1
        </button>
        {ellipsisBefore && <span>...</span>}
        {pagesArray.map((pageNumber) =>
          Math.abs(pageNumber - page) < 3 &&
          pageNumber !== 1 &&
          pageNumber !== totalPages ? (
            <button
              key={pageNumber}
              className={page === pageNumber ? "Button CurrentPage" : "Button"}
              onClick={() => callNewPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ) : (
            checkForEllipsis(pageNumber)
          )
        )}
        {ellipsisAfter && <span>...</span>}
        <button
          className={page === totalPages ? "Button CurrentPage" : "Button"}
          onClick={() => callNewPage(totalPages)}
        >
          {totalPages}
        </button>
        <button
          className={page === totalPages ? "Button Disabled" : "Button"}
          onClick={callNextPage}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
