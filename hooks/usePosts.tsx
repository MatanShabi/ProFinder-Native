import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllPosts } from "@/store/slices/posts/selector";
import { deletePost, getAllPosts } from "@/store/slices/posts/thunk";
import useUser from "./useUser";
import { Post } from "@/types/post";
import { useNavigation } from "expo-router";

const usePosts = (isUserProfile: boolean = false) => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>()
  const { posts, isLoading, isError } = useAppSelector(selectAllPosts);
  

  useEffect(() => {
    dispatch(getAllPosts);
  }, [isUserProfile]);

  const handleEditPost = (post: Post) => {
    navigation.navigate("AddPost", post);
  };

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const filteredPosts = posts.filter(
    (post) =>
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!isUserProfile ||
        post.userEmail.toLowerCase() === user?.email?.toLowerCase()),
  );

  return {
    posts: filteredPosts,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleDeletePost,
    handleEditPost,
  };
};

export default usePosts;
