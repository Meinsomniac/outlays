import {createSlice} from '@reduxjs/toolkit';
import {authApi} from './authActions';
import {jwtDecode} from '../../utils/common';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userDetails: {},
  },
  reducers: {
    setUserDetails: (state, {payload}) => {
      state.userDetails = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, {payload}) => {
        const tokenDecoded = jwtDecode(payload.accessToken);
        state.userDetails = tokenDecoded?.payload || {};
      },
    );
    builder.addMatcher(
      authApi.endpoints.signInWithGoogle.matchFulfilled,
      (state, {payload}) => {
        const tokenDecoded = jwtDecode(payload.accessToken);
        state.userDetails = tokenDecoded?.payload || {};
      },
    );
  },
});

export const {setUserDetails} = authSlice.actions;
