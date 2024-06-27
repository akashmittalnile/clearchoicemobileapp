import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import images from '../../global/images';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import {
  FONTS,
  FONTS_SIZE,
  heightScale,
  myHeight,
  widthScale,
} from '../../global/Utils';
import COLORS from '../../global/Colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { dimensions } from '../../utility/Mycolors';
const TutorialScreen = ({navigation}) => {
  return (
    <>
      <Video
        source={require('../../assets/video/Janitorial-Cleaning-Video-1.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />

      <LinearGradient
        style={{flex: 1}}
        colors={['#23356F61', '#23356F61', '#23356F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{flex: 0.7}}></View>
        <View>
          <View style={styles.container}>
            <CustomFastImage imageStyle={styles.logo} img={images.loginlogo} />
          </View>
          <Text style={styles.txt}>Janitorial & Maintenance Services</Text>
          <Text style={styles.txtStyle}>
            Our goal is to provide all of your janitorial, floor care, window &
            power washing needs
          </Text>
          <CustomButton
            title={'Sign In'}
            backgroundColor={COLORS.Primary_Green}
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            title={'Sign Up'}
            backgroundColor={COLORS.light_white}
            txtStyle={styles.singUpTxt}
            onPress={() => navigation.navigate('SignUp')} 
          />
          <View style={{width:dimensions.SCREEN_WIDTH*90/100,alignSelf:'center'}}>
            <Text style={styles.bottomTxt}>
              By Creating Your Account You Agree To Our
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width:dimensions.SCREEN_WIDTH*90/100,
                alignSelf:'center'
              }}>
              <Text
                style={styles.termsTxt}
                onPress={() => {
                  {
                  }
                }}>
                Terms Of Use
              </Text>
              <Text style={styles.conditionTxtStyle}>
                & Confirm You Have Read Our{' '}
              </Text>
              <Text style={styles.termsTxt}>Privacy Policy</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}></View>
        </View>
      </LinearGradient>
    </>
   
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(206),
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: FONTS.regular,
    width: '90%',
    textAlign: 'center',
    color: COLORS.light_white,
    marginTop: 10,
    alignSelf: 'center',
  },
  txtStyle: {
    fontSize: FONTS_SIZE.body3,
    width: '85%',
    color: COLORS.light_white,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    alignSelf: 'center',
  },
  bottomTxt: {
    fontSize: FONTS_SIZE.h4,
    fontWeight: '600',
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
    opacity: 0.9,

    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    bottom: 3,
  },
  backgroundVideo: {
    height: myHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  termsTxt: {
    fontSize: FONTS_SIZE.h4,
    color: COLORS.light_white,
  },
  conditionTxtStyle: {
    fontSize: FONTS_SIZE.body3,
    color: COLORS.primary_white,

    opacity: 0.9,
    marginLeft: 4,
  },
  singUpTxt: {
    color: COLORS.Primary_Green,
  },
});
