import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { Status } from ".";

export const selectAllPosts = createSelector(
    (state: RootState) => state.posts,
    (state: RootState) => state.getPostsStatus,
    (state: RootState) => state.error,
    (posts, status, error) => ({
        posts,
        isLoading: status === Status.Loading,
        isError: error !== null,
        error
    })
);

export const selectCreatePost = createSelector(
    (state: RootState) => state.createPostStatus,
    (state: RootState) => state.error,
    (createPostStatus, error) => ({
        isLoading: createPostStatus === Status.Loading,
        isError: createPostStatus === Status.Failed && error !== null,
        error
    })
);