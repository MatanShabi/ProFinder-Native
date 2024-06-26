import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllPosts = createSelector(
  (state: RootState) => state.posts,
  (state: RootState) => state.status,
  (state: RootState) => state.error,
  (posts, status, error) => ({
    posts,
    isLoading: status === 'loading',
    isError: error !== null,
    error
  })
);
