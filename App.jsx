/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';

import {AppNavigator} from './src/routes/AppNavigator';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/sheets/sheets';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';

function App() {
  return (
    <GestureHandlerRootView>
      <NativeBaseProvider>
        <SheetProvider>
          <AppNavigator />
        </SheetProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
