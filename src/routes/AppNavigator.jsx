import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy} from 'react';
// import CustomizedBottomTabs from './CustomizedBottomTabs';
import {AddExpensePage} from '../pages/common/AddExpensePage';
// import SignUp from '../pages/auth/SignUp';
import AuthProvider from '../contexts/AuthContext';
import {Loadable} from '../components/constants/ReactLazyLoading';
import {paths} from './paths';
import SignIn from '../pages/auth/SignIn';
import {StyleSheet} from 'react-native';

const SignUp = Loadable(lazy(() => import('../pages/auth/SignUp')));
const CustomizedBottomTabs = Loadable(
  lazy(() => import('./CustomizedBottomTabs')),
);

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="LoadingScreen">
          <Stack.Screen
            name={paths.home}
            component={CustomizedBottomTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={paths.signUp}
            component={SignUp}
            options={({route}) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#E5E5E5',
              },
              headerShadowVisible: false,
              headerTintColor: '#000',
              headerTitleAlign: 'center',
              title: 'Sign Up',
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name={paths.signIn}
            component={SignIn}
            options={({route}) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#E5E5E5',
              },
              headerShadowVisible: false,
              headerTintColor: '#000',
              headerTitleAlign: 'center',
              title: 'Sign In',
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name={paths.addExpense}
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
      </AuthProvider>
    </NavigationContainer>
  );
};
