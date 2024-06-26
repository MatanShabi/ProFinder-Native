import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllPosts } from "@/store/slices/posts/selector";
import { getAllPosts } from "@/store/slices/posts/thunk";

const usePosts = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch()
  const {posts, isLoading, isError} = useAppSelector(selectAllPosts)

  useEffect(() => {
    dispatch(getAllPosts);
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    posts: filteredPosts,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery
  };
};

export default usePosts;
