import { RootState } from "@/store/store";

export const selectAllPosts = (state: RootState) => (
    {
        posts: state.posts,
        isLoading: state.status === 'loading',
        isError: state.error !== null,
        error: state.error
    })

