import {StyleSheet} from 'react-native';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import COLORS from '../../global/Colors';

const styles = StyleSheet.create({
  topImgContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
    resizeMode: 'contain',
  },
  container: {
    flex: 0.9,
    backgroundColor: '#ffff',
    bottom: 0,
    // height: '49%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
  },
  loginTxt: {
    alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: widthScale(20),
    fontSize: FONTS_SIZE.h1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
    bottom:10
  },
  txtStyle: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontWeight: '600',
  },
  signup: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    fontWeight: '600',
    color: COLORS.Primary_Green,
  },
});

export default styles;
