import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from '../../../types/post'
import { getAllPosts } from "./thunk";

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
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
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
})
export const { removePost } = postsSlice.actions;

export default postsSlice.reducer