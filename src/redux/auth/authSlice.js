import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userDetails: {},
  },
  reducers: {
    setUserDetails: (state, {payload}) => (state.userDetails = payload),
  },
});

export const {setUserDetails} = authSlice.actions;
