import React from 'react';
import {defaultStyles} from '../../constants/defaultStyles';
import {Text, View} from 'native-base';

export const ScreenLoading = () => {
  return (
    <View style={defaultStyles.mainLoader}>
      <Text variant={'2xl'}>Loading...</Text>
    </View>
  );
};
