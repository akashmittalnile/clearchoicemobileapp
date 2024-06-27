import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home/HomeScreen';
import ServiceandSchedule from '../../screens/ServiceandSchedule/ServiceandSchedule';
import ChatScreen from '../../screens/Chats/ChatScreen';
import Profile from '../../screens/Profile/Profile';
import { Easing } from 'react-native-reanimated';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, ImageBackground, StyleSheet, Image,ScrollView, TouchableOpacity,} from 'react-native';
import HomeStack from '../HomeStack'
import ServiceScheduleStack from '../ServiceScheduleStack'
import ChatStack from '../ChatStack'
import ProfileStack from '../ProfileStack'
function BottomTabs({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map(
        (route: {key: string | number; name: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.reset({
                index: 0,
                routes: [{ name: route.name }],
              });
             //navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabButtonContainer,
                isFocused ? styles.tabActive : null,
              ]}>
              {label === 'HomeStack' ? (
                <View style={isFocused ? {width:60,height:60,backgroundColor:'#7BC043',padding:10,justifyContent: 'center',borderRadius:7} : {}}>
                  <Image
                    style={[styles.tabIcon]}
                    resizeMode="stretch"
                    tintColor={isFocused ? '#fff' : '#fff'}
                    source={require('../../assets/images/Icons/home.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Home
                  </Text>
                </View>
              ) : label === 'ServiceandSchedule' ? (
                <View style={isFocused ? {width:70,height:70,backgroundColor:'#7BC043',padding:1,justifyContent: 'center',borderRadius:7} : {}}>

                  <Image
                    style={styles.tabIcon}
                    tintColor={isFocused ? '#fff' : '#ff'}
                    resizeMode="stretch"
                    source={require('../../assets/images/Icons/calendarb.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Service Scheduler
                  </Text>
                </View>
              ) : label === 'Chat' ? (
                <View style={isFocused ? {width:60,height:60,backgroundColor:'#7BC043',padding:10,justifyContent: 'center',borderRadius:7} : {}}>

                  <Image
                    style={styles.tabIcon}
                    resizeMode="stretch"
                    tintColor={isFocused ? '#fff' : '#fff'}
                    source={require('../../assets/images/Icons/messages.png')}
                  />
                  <Text
                    style={
                    isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Chat
                  </Text>
                </View>
              ) : (
                <View style={isFocused ? {width:60,height:60,backgroundColor:'#7BC043',padding:10,justifyContent: 'center',borderRadius:7} : {}}>

                  <Image
                    style={styles.tabIcon}
                    resizeMode="stretch"
                    tintColor={isFocused ? '#fff' : '#fff'}
                    source={require('../../assets/images/Icons/profile.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                   Profile
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
}
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
 
  initialRouteName={'HomeStack'}
  tabBar={(
    props: JSX.IntrinsicAttributes & {
      state: any;
      descriptors: any;
      navigation: any;
    },
  ) => <BottomTabs {...props} />}
  >
    <Tab.Screen name="HomeStack" options={{headerShown: false}} component={HomeStack} />
    <Tab.Screen name="ServiceandSchedule" options={{headerShown: false}} component={ServiceScheduleStack} />
    <Tab.Screen name="Chat" options={{headerShown: false}} component={ChatStack} />
    <Tab.Screen name="Profile" options={{headerShown: false}} component={ProfileStack} />
  </Tab.Navigator>
);


export default TabNavigator;
const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    height: 22,
    width: 22,
    alignSelf:'center'
  },
  container: {
    backgroundColor: '#23356F',
    flexDirection: 'row',
    elevation: 24,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    height:90

  },
  tabActive: {
    // borderBottomWidth: 3,
    borderRadius:10,
    // borderBottomColor: 'transparent',
    // backgroundColor:'green',
    // height:70,top:10
  },
  image: {height: '100%', width: '100%'},
  iconText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textAlign:'center',top:3
  },
  iconTextDisable: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textAlign:'center',top:3
  },
});