/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isLoggedIn: false,
  },
  reducers: {
    userInfo(state, action) {
      state.currentUser = action.payload
    },
    loginStatus(state, action) {
      state.isLoggedIn = action.payload
    },
  },
})

export default userSlice.reducer
export const { userInfo, loginStatus } = userSlice.actions
