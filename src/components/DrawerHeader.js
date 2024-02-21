import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../global/Colors';
import DrawerPic from '../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, widthScale} from '../global/Utils';
import {  useSelector, useDispatch } from 'react-redux';

const DrawerHeader = () => {
  const dispatch =  useDispatch();
  const user  = useSelector(state => state.user.user_details)
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <DrawerPic />
        <View>
          <Text style={styles.headerText}>{user.fullname}</Text>
          <Text style={[styles.headerText, {fontSize: FONTS_SIZE.body3}]}>
            Emp ID: {user.userId?user.userId:user.userid}
          </Text>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.Btn}>
        <Text style={styles.BtnTxt}>Edit</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Primary_Blue,
    // height: widthScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthScale(15),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: widthScale(15),
  },
  headerText: {
    fontSize: FONTS_SIZE.h4,
    color: COLORS.light_white,
    fontFamily: FONTS.regular,
  },
  Btn: {
    backgroundColor: COLORS.Primary_Green,
    width: widthScale(50),
    height: widthScale(25),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontSize: FONTS_SIZE.h3,
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});
