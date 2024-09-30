import React, {createContext, useCallback, useEffect} from 'react';
import {getStorage} from '../utils/storageUtils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {paths} from '../routes/paths';
import {setIsAuthenticated, setUserDetails} from '../redux/auth/authSlice';

export const AuthContext = createContext();
export default function AuthProvider({children}) {
  //Global State
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  //functions
  const checkToken = useCallback(async () => {
    const accessToken = await getStorage('token');
    if (!accessToken) navigate(paths.signIn);
    else {
      navigate(paths.home);
    }
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
