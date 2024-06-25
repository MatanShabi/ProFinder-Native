import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '@/types/post';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Sample Post 1',
    description: 'Description for Sample Post 1',
    imageURL: 'https://example.com/image1.jpg',
    link: 'https://example.com/post1',
    price: 100,
    userEmail: 'user@example.com',
    lastUpdate: new Date(),
  },
  {
    id: '2',
    title: 'Sample Post 2',
    description: 'Description for Sample Post 2',
    imageURL: 'https://example.com/image2.jpg',
    link: 'https://example.com/post2',
    price: 150,
    userEmail: 'user@example.com',
    lastUpdate: new Date(),
  },
];

export const getAllPosts = createAsyncThunk<Post[]>('posts/getAllPosts', async () => {
  return mockPosts;
});
