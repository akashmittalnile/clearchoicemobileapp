import React, { Component, useEffect, useState } from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DrawerHeader from '../../components/DrawerHeader';
import CustomScreen from '../../components/CustomScreen';
import images from '../../global/images';
import {heightScale, widthScale} from '../../global/Utils';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import COLORS from '../../global/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useSelector, useDispatch } from 'react-redux';
import { setLoading,onLogoutUser,saveUserResult} from '../../redux/actions/user_action';
const CustomDrawer = props => {

  const dispatch =  useDispatch();
  const [name,setname]=useState('John Dev.')
  const [loder, setLoder] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [subExp,setsubExp]=useState(false)
  const [loading, setLoading] = useState(false)
  const [dd,setdd]=useState({
    "service_name": "Test",
    "service_id": 12,
})
return(
  <SafeAreaView style={{flex:1,backgroundColor:COLORS.Primary_Blue}}>
   <View style={{flex:1,backgroundColor:'#fff'}}>
    <DrawerHeader />
    <View style={styles.drowerComponentStyle}>
      <CustomScreen image={images.home} title={'Home'} onPress={()=>{props.navigation.navigate('HomeStack')}}/>
    </View>
    <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
      <CustomScreen image={images.calandertick} title={'Attendance'} onPress={()=>{props.navigation.navigate('TimeCard',{data:dd,from:'sidebar'})}}/>
    </View>
    <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
      <CustomScreen image={images.message} title={'Chat Support'} onPress={()=>{props.navigation.navigate('Chat',{data:dd,from:'sidebar'})}}/>
      
    </View>
    <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
      <CustomScreen image={images.document} title={'Terms & Conditions'} />
    </View>
    <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
      <CustomScreen image={images.note} title={'Privacy Policy'} />
    </View>
    <View style={[styles.drowerComponentStyle, {marginTop: 15}]} >
      <CustomScreen image={images.logout} title={'Logout'} onPress={()=>{
       AsyncStorage.clear(); 
       dispatch(onLogoutUser())
    }} />
    </View>

    <View style={styles.imgContainer}>
      <Image style={styles.imageStyle} source={images.applogo}></Image>
    </View>
    </View>
  </SafeAreaView>
)
  };


const styles = StyleSheet.create({
  drowerComponentStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  imageStyle: {
    height: heightScale(156),
    width: widthScale(195),
    resizeMode: 'stretch',
   
  },
  imgContainer: {
    alignItems: 'center',
   position:'absolute',
    // marginTop: 100,
    bottom:30,
    alignSelf:'center'
  },
});
export default CustomDrawer