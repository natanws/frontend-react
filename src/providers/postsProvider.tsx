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
}

const PostsContext = createContext<PostsData>({} as PostsData);

const PostsProvider = ({ children }: PostsProps) => {
  const [posts, setPosts] = useState<DataProps[]>([] as DataProps[]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);

  const nextPage = () =>
    page !== totalPages ? setPage(page + 1) : console.log("last page");

  const previousPage = () =>
    page !== 1 ? setPage(page - 1) : console.log("first page");

  useEffect(() => {
    api.get(`v1/posts?_format=json&page=${page}`).then((response) => {
      setPosts(response.data.data);
      setTotalPage(response.data.meta.pagination.pages);
    });
  }, [page]);

  return (
    <PostsContext.Provider value={{ posts, nextPage, previousPage }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);

export default PostsProvider;
