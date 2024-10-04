import {Button, View} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {Text} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

export const Profile = () => {
  const {logout} = useContext(AuthContext);

  return (
    <View>
      <Button onPress={logout}>logout</Button>
    </View>
  );
};
