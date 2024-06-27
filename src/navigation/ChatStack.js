// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../screens/Chats/ChatScreen'
import ChatDetails from '../screens/Chats/ChatDetails';

const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="ChatDetails" component={ChatDetails} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
     
      {/* 
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UPloadResume" component={UPloadResume} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} /> */}
    </Stack.Navigator>
  );
}

export default ChatStack;
