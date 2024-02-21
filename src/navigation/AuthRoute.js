// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import TutorialScreen from '../screens/Tutorial/TutorialScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import UPloadResume from '../screens/SignUp/UPloadResume';
import CreatePassword from '../screens/SignUp/CreatePassword';

const Stack = createNativeStackNavigator();

function AuthRoute() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UPloadResume" component={UPloadResume} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
    </Stack.Navigator>
  );
}

export default AuthRoute;
