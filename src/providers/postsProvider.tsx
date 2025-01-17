import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import api from "../services/api";

interface PostsProps {
  children: ReactNode;
}

interface DataProps {
  id: number;
  user_id: number;
  title: String;
  body: String;
}

interface PostsData {
  posts: DataProps[];
  nextPage: () => void;
  previousPage: () => void;
  jumpToPage: (value: number) => void;
  error: boolean;
  totalPages: number;
  page: number;
}

const PostsContext = createContext<PostsData>({} as PostsData);

const PostsProvider = ({ children }: PostsProps) => {
  const [posts, setPosts] = useState<DataProps[]>([] as DataProps[]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [token] = useState<String>(
    localStorage.getItem("@moovin:token") ||
      "32076aa84dcb8091eb0e9884c2f8235943c02a4ae061304baac1a68969035fee"
  );
  const [error, setError] = useState<boolean>(false);

  const nextPage = () => {
    if (page !== totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const jumpToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    api
      .get(`v1/posts?_format=json&token=${token}&page=${page}`)
      .then((response) => {
        setPosts(response.data.data);
        setTotalPage(response.data.meta.pagination.pages);
      })
      .catch((_) => setError(true));
  }, [page, token]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        nextPage,
        previousPage,
        error,
        totalPages,
        jumpToPage,
        page,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);

export default PostsProvider;
