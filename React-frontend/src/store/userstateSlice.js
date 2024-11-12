import { createSlice } from '@reduxjs/toolkit';

const userstateSlice = createSlice({
  name: 'userstate',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Remove token on logout
    },
  },
});

export const { loginSuccess, logout } = userstateSlice.actions;
export default userstateSlice.reducer;