import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    logout: (state, {payload}) => (state.isAuthenticated = payload),
  },
});

export const {logout} = authSlice.actions;
