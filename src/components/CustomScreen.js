import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import images from '../global/images';
import { FONTS, FONTS_SIZE, widthScale } from '../global/Utils';

const CustomScreen = ({image, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>

      <Image source={images.rightArrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   

  },
  image: {
    width: widthScale(20),
    height: widthScale(20),
    marginRight: widthScale(15),
  },
  title: {
    flex: 1,
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color:'#4F5168',
    fontWeight:'600'

    
  },
  arrow: {
    width: widthScale(15),
    height: widthScale(15),
  },
};

export default CustomScreen;
