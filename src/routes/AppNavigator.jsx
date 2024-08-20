import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {CustomizedBottomTabs} from './CustomizedBottomTabs';
import {AddExpensePage} from '../pages/common/AddExpensePage';
import {StatusBar} from 'react-native';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={CustomizedBottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpensePage}
          options={({route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: route?.params?.color,
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            animation: 'fade_from_bottom',
            statusBarColor: route?.params?.color || '',
            title: route?.params?.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
