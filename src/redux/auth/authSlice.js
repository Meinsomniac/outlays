import {createSlice} from '@reduxjs/toolkit';
import {setStorage} from '../../utils/storageUtils';
import {NavigationRouteContext} from '@react-navigation/native';

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
