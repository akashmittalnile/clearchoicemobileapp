
// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceandSchedule from '../screens/ServiceandSchedule/ServiceandSchedule'
import ServiceDetails from '../screens/Home/ServiceDetails';
import TimeCard from '../screens/Home/TimeCard'
import ChatDetails from '../screens/Chats/ChatDetails';

const Stack = createNativeStackNavigator();

function ServiceScheduleStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceandSchedule" component={ServiceandSchedule} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
     <Stack.Screen name="TimeCard" component={TimeCard} />
     <Stack.Screen name="ChatDetails" component={ChatDetails} /> 
     
        </Stack.Navigator>
  );
}

export default ServiceScheduleStack;
