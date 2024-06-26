import { Post } from '@/types/post';
import { db } from '@/config/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';


export const getAllPosts = createAsyncThunk<Post[]>('posts/getAllPosts', async () => {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    let fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    fetchedPosts.sort(
      (a, b) => b.lastUpdate.toMillis() - a.lastUpdate.toMillis()
    );
    return fetchedPosts
});
