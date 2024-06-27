import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE} from '../../global/Utils';

const CustomButton = React.memo(props => {
  let {title, onPress, backgroundColor, txtStyle} = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={() => onPress()}>
      <Text style={[styles.title, {...txtStyle}]}> {title} </Text>
    </TouchableOpacity>
  );
});

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  title: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
    fontWeight: '700',
  },
});
