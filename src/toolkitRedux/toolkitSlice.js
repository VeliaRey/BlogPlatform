/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit'

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    posts: [],
    totalPosts: 0,
    loading: false,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setTotalPosts(state, action) {
      state.totalPosts = action.payload
    },
    stopLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export default toolkitSlice.reducer
export const { setPosts, setTotalPosts, stopLoading } = toolkitSlice.actions
