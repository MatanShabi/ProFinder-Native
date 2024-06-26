import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from '../../../types/post';
import { getAllPosts, createPost, updatePost, deletePost } from "./thunk";

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface PostsState {
  posts: Post[];
  getPostsStatus: Status;
  createPostStatus: Status;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  getPostsStatus: Status.Idle,
  createPostStatus: Status.Idle,
  error: null,
};

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<{ id: string }>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.getPostsStatus = Status.Loading;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.getPostsStatus = Status.Succeeded;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.getPostsStatus = Status.Failed;
        state.error = action.error.message || null;
      })
      .addCase(createPost.pending, (state) => {
        state.createPostStatus = Status.Loading;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostStatus = Status.Succeeded;
        state.posts = [action.payload,...state.posts]
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostStatus = Status.Failed;
        state.error = action.error.message || null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.meta.arg);
      });
  },
});

export const { removePost } = postsSlice.actions;

export default postsSlice.reducer;
