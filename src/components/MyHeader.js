import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, FONTS_SIZE, widthScale} from '../global/Utils';
import COLORS from '../global/Colors';
import images from '../global/images';
const MyHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPress ? props.onPress :() => {
          
        }}>
        <Image source={images.arrowleft} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title} </Text>
      <TouchableOpacity 
      onPress={props.onPress2 ? props.onPress2 :() => {
          
      }}>
        <Image
          source={require('../assets/images/Icons/notificationicons.png')}
          style={{height: 30, width: 30, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: widthScale(90),
    backgroundColor: COLORS.Primary_Blue,
    padding: 15,
  },
  title: {
    fontSize: FONTS_SIZE.h3,
    color: COLORS.light_white,
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});
