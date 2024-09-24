import React, {createContext, useCallback, useEffect} from 'react';
import {getStorage} from '../utils/storageUtils';
import {useNavigation} from '@react-navigation/native';

export const AuthContext = createContext();
export default function AuthProvider({children}) {
  const {navigate} = useNavigation();
  const checkToken = useCallback(async () => {
    const data = await getStorage('token');
    if (!data) navigate('sign-up');
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
