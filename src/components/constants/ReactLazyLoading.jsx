import React, {Suspense} from 'react';

import {Text, View} from 'native-base';
import {defaultStyles} from '../../constants/defaultStyles';

// eslint-disable-next-line react/display-name
export const Loadable = Component => props => {
  return (
    <Suspense
      fallback={
        <View style={defaultStyles.mainLoader}>
          <Text variant={'2xl'}>Loading...</Text>
        </View>
      }>
      <Component {...props} />
    </Suspense>
  );
};
