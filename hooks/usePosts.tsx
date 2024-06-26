import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllPosts } from "@/store/slices/posts/selector";
import { deletePost, getAllPosts } from "@/store/slices/posts/thunk";
import useUser from "./useUser";

const usePosts = (isUserProfile: boolean = false) => {
  
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch()
  const { posts, isLoading, isError } = useAppSelector(selectAllPosts)

  useEffect(() => {
    dispatch(getAllPosts);
  }, [isUserProfile]);

  const handleEditPost = (postId: string) => {
    console.log('delete post', postId);    
  }

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId));
  }


  const filteredPosts = posts.filter(
    (post) =>
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!isUserProfile || post.userEmail.toLowerCase() === user?.email?.toLowerCase())
  );

  return {
    posts: filteredPosts,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleDeletePost,
    handleEditPost
  };
};

export default usePosts;
