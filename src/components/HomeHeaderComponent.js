import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView,FlatList,
    TouchableOpacity,SafeAreaView
  } from 'react-native';
  import React, { useState,useRef, useEffect } from 'react'
  import { Mycolors,dimensions } from '../utility/Mycolors';
  import COLORS from '../global/Colors';
import DrawerPic from '../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, widthScale} from '../global/Utils';
import {  useSelector, useDispatch } from 'react-redux';

  const HomeHeaderComponent = (props) => {
    const dispatch =  useDispatch();
    const user  = useSelector(state => state.user.user_details)
    return (
    //   <View style={{backgroundColor:'#E8ECF2'}}>
    //       <ImageBackground source={require('../assets/images/Icons/gbhb.png')} style={{width:dimensions.SCREEN_WIDTH+18,height:185,resizeMode:'stretch',left:-9,justifyContent: 'center',}}>
    //  <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:25,top:-10}}>
    //  <TouchableOpacity onPress={props.press1 ? props.press1 :()=>{}}>
    //   <Image source={props.icon1 ? props.icon1 : require('../assets/images/Icons/hback.png')} style={{height:50,width:50,resizeMode:'stretch'}}></Image>
    //  </TouchableOpacity>
    //  <TouchableOpacity onPress={()=>{props.navigation.navigate('Notification')}}>
    //   <Image source={require('../assets/images/Icons/hbel.png')} style={{height:50,width:50,resizeMode:'stretch'}}></Image>
    //  </TouchableOpacity>
    //  </View>
  
    //  <Text style={{position:'absolute',textAlign:'center',bottom:6,color:'#fff',alignSelf:'center',fontWeight:'600'}}>{props.title}</Text>
    //      </ImageBackground>
  
    //   </View>
    <View style={styles.container}>
    <View style={styles.subContainer}>
    <TouchableOpacity style={styles.Btn} onPress={props.press1 ? props.press1 :()=>{}}>
    <Image source={props.icon1 ? props.icon1 : require('../assets/images/Icons/hback.png')} style={{height:30,width:30,resizeMode:'stretch'}}></Image>
    </TouchableOpacity>
    
      <DrawerPic />
      <View>
        <Text style={styles.headerText}>{user.fullname}</Text>
        <Text style={[styles.headerText, {fontSize: FONTS_SIZE.h2,color: COLORS.Primary_Green,fontWeight:'600'}]}>
        {user.designation}
        </Text>
      </View>
    </View>

    <TouchableOpacity style={styles.Btn} onPress={props.press2 ? props.press2 :()=>{}} >
    <Image source={require('../assets/images/Icons/notificationicons.png')} style={{height:30,width:30,resizeMode:'stretch'}}></Image>
    </TouchableOpacity>
  </View>
    )
  }
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Primary_Blue,
    height: widthScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthScale(15),
  },
  subContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    gap: widthScale(15),
  },
  headerText: {
    fontSize: FONTS_SIZE.h4,
    color: COLORS.light_white,
    fontFamily: FONTS.regular,
  },
  Btn: {
    // backgroundColor: COLORS.Primary_Green,
    width: widthScale(50),
    height: widthScale(25),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontSize: FONTS_SIZE.h3,
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});

  export default HomeHeaderComponent