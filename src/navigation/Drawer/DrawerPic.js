import {StyleSheet, Image, View} from 'react-native';
import React, { useEffect } from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {widthScale} from '../../global/Utils';
import {  useSelector, useDispatch } from 'react-redux';

const DrawerPic = () => {
  const dispatch =  useDispatch();
  const user  = useSelector(state => state.user.user_details)
  useEffect(()=>{
console.log('==========user.profile_image==========================');
console.log(user.profile_image);
console.log('====================================');
  },[])
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={user.profile_image ? {uri:user.profile_image} : require('../../assets/images/Icons/Ellipse1.png')}
        style={styles.image}
      />
    </View>
  );
};

export default DrawerPic;

const styles = StyleSheet.create({
  ImageContainer: {
    height: widthScale(40),
    width: widthScale(40),

    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: widthScale(40),
    width: widthScale(40),
    resizeMode:'stretch',
    backgroundColor:'gray',
    borderRadius:6
  },
});
