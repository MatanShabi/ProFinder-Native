import { Post } from "@/types/post";
import { db } from "@/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const getAllPosts = createAsyncThunk<Post[]>(
  "posts/getAllPosts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    let fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    fetchedPosts.sort(
      (a, b) => b.lastUpdate.toMillis() - a.lastUpdate.toMillis(),
    );
    return fetchedPosts;
  },
);

export const createPost = createAsyncThunk<Post, Post>(
  "posts/createPost",
  async (newPost) => {
    const docRef = await addDoc(collection(db, "Posts"), {
      ...newPost,
      createdAt: new Date(),
      lastUpdate: new Date(),
    });

    return {
      ...newPost,
      id: docRef.id,
    };
  },
);

export const updatePost = createAsyncThunk<
  Post,
  { id: string; updatedPost: Partial<Post> }
>("posts/updatePost", async ({ id, updatedPost }) => {
  const postRef = doc(db, "Posts", id);
  await updateDoc(postRef, {
    ...updatedPost,
    lastUpdate: new Date(),
  });

  return {
    id,
    ...updatedPost,
  } as Post;
});

export const deletePost = createAsyncThunk<void, string>(
  "posts/deletePost",
  async (id) => {
    const postRef = doc(db, "Posts", id);
    await deleteDoc(postRef);
  },
);
