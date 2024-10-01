import {Button, View} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {Text} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

export const Profile = () => {
  const {logout} = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
  }, []);
  return (
    <View>
      <Button onPress={handleLogout}>logout</Button>
    </View>
  );
};
