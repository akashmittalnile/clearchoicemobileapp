import {StyleSheet, View} from 'react-native';
import {heightScale, widthScale} from '../../global/Utils';
import COLORS from '../../global/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.White
  },
  imageStyle: {
    height: heightScale(218),
    width: widthScale(220),
    resizeMode: 'stretch',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    bottom: 30,
    gap: 8,
  },
  bbblogoStyle: {
    height: heightScale(70),
    width: widthScale(72),
  },
});
