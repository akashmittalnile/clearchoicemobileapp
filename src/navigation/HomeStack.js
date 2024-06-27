// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ServiceDetails from '../screens/Home/ServiceDetails'
import TimeCard from '../screens/Home/TimeCard'
import ChatDetails from '../screens/Chats/ChatDetails';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
     <Stack.Screen name="TimeCard" component={TimeCard} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
    {/*    <Stack.Screen name="CreatePassword" component={CreatePassword} /> */}
    </Stack.Navigator>
  );
}

export default HomeStack;
