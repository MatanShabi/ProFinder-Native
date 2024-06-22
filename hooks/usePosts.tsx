import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export type Post = {
    id: string;
    title: string;
    description: string;
    imageURL?: string;
    link: string;
    price: number;
    userEmail: string;
    lastUpdate: any;
  };

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const querySnapshot = await getDocs(collection(db, "Posts"));
      const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      fetchedPosts.sort(
        (a, b) => b.lastUpdate.toMillis() - a.lastUpdate.toMillis()
      );

      setPosts(fetchedPosts);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    posts: filteredPosts,
    isLoading,
    isError,
    refreshing,
    searchQuery,
    setSearchQuery,
    handleRefresh,
    errorMessage,
    setIsError,
  };
};

export default usePosts;
