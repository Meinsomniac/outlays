/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

if (__DEV__) {
  import('./ReactotronConfig');
}

import 'react-native-gesture-handler';
import React from 'react';

import {AppNavigator} from './src/routes/AppNavigator';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/sheets/sheets';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {AlertProvider} from './src/contexts/AlertContext';

function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NativeBaseProvider>
          <SheetProvider>
            <AlertProvider>
              <AppNavigator />
            </AlertProvider>
          </SheetProvider>
        </NativeBaseProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
