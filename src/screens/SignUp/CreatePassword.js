import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../global/images';
import {
  FONTS,
  FONTS_SIZE,
  heightScale,
  myHeight,
  widthScale,
} from '../../global/Utils';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../../global/Colors';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SignupModal from '../../modals/SignupDropdown/SignupDropdown';

const CreatePassword = ({navigation}) => {
  const [ismodal, setIsModal] = useState(false);
  return (
    <>
      <ImageBackground source={images.loginbg} style={StyleSheet.absoluteFill}>
        <View style={styles.topImgContainer}>
          <CustomFastImage
            img={images.loginlogo}
            imageStyle={styles.logo}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Account Password</Text>
          <KeyboardAwareScrollView>
            <View style={{marginTop: 40}}>
              <CustomTextInput placeholder={'Create New password'} />
            </View>

            <View style={{marginTop: 20}}>
              <CustomTextInput placeholder={'Confirm Password'} />
            </View>
            <CustomButton
              title={'Activate your account'}
              backgroundColor={COLORS.Primary_Green}
              onPress={() => {
                setIsModal(true);
              }}
            />
            <View style={styles.SignupTxtContainer}>
              <Text style={styles.txtStyle}>Don’t have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.signup}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
      {ismodal && (
        <SignupModal
          onPress={() => {
            setIsModal(false);
          }}
          containrStyle={styles.modalContainerStyle}
          children={
            <View style={styles.topContainer}>
              <Image source={images.adminIcon} style={styles.img} />
              <Text style={styles.modalCotationTxt}>
                Administration will review your account
              </Text>
              <Text style={styles.conditionalTxtStyle}>
                New registration request has been sent to admin for approval
              </Text>
              <View style={styles.txtContainer}>
                <Text style={styles.btnTxtStyle}>
                  You will receive updates on your Registered email id
                </Text>
              </View>
              <CustomButton
                backgroundColor={COLORS.Primary_Green}
                title={'close'}
                onPress={() => navigation.goBack()}
              />
            </View>
          }
        />
      )}
    </>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  topImgContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
    resizeMode: 'contain',
  },
  container: {
    flex: 0.2,
    backgroundColor: '#ffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.light_white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  txt: {
    fontSize: FONTS_SIZE.h1,
    fontWeight: '700',
    fontFamily: FONTS.regular,
    color: COLORS.Primary_Blue,
    alignSelf: 'center',
    marginTop: 30,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
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
  modalContainerStyle: {
    backgroundColor: COLORS.light_white,
    height: myHeight * 0.5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: myHeight * 0.2,
    borderRadius: 20,
  },
  topContainer: {
    alignItems: 'center',
  },
  img: {
    height: heightScale(120),
    width: widthScale(120),
    resizeMode: 'contain',
  },
  modalCotationTxt: {
    fontSize: FONTS_SIZE.h2,
    fontWeight: '700',
    fontFamily: FONTS.regular,
    color: COLORS.Primary_Blue,
    textAlign: 'center',
    marginTop: 10,
  },
  conditionalTxtStyle: {
    fontSize: FONTS_SIZE.body3,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    textAlign: 'center',
    width: '90%',
    marginTop: 20,
  },
  txtContainer: {
    width: '85%',
    height: 35,
    backgroundColor: COLORS.secondary_blue,
    borderRadius: widthScale(5),
    marginTop: 10,
    justifyContent: 'center',
  },

  btnTxtStyle: {
    fontSize: FONTS_SIZE.body4,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
  },
});
