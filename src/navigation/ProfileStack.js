// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ServiceDetails from '../screens/Home/ServiceDetails'
import Profile from '../screens/Profile/Profile'
import ServiceLogs from '../screens/ServiceLogs/ServiceLogs';
import MyServices from '../screens/MyServices/MyServices';
import TimeCard from '../screens/Home/TimeCard';
import IncompletedServices from '../screens/IncompletedService/IncompletedServices'

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ServiceLogs" component={ServiceLogs} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
       <Stack.Screen name="TimeCard" component={TimeCard} />
       <Stack.Screen name="IncompletedServices" component={IncompletedServices} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
