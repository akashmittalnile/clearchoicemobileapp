import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../global/images';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import COLORS from '../../global/Colors';
import CustomButton from '../../components/CustomButton/CustomButton';

const UPloadResume = ({navigation}) => {
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
          <Text style={styles.Txt}>Upload your resume</Text>

          <KeyboardAwareScrollView>
            <View style={styles.viewContanier}>
              <Text style={styles.resumeTxt}>Upload your resume</Text>
              <Text>pdf, doc, docx, xlsx. Max. File are allowed</Text>
              <Text style={styles.sizeStyle}>Size: 5 MB</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.txt}>Choose File</Text>
                </TouchableOpacity>
                <Text style={[styles.txt, {color: COLORS.grey}]}>
                  No file chosen
                </Text>
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Accompanying Letter"
                style={styles.txtInput}
              />
            </View>
            <CustomButton
              title={'Next'}
              backgroundColor={COLORS.Primary_Green}
              onPress={() => navigation.navigate('CreatePassword')}
            />
            <View style={{height: 30}}></View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

export default UPloadResume;

const styles = StyleSheet.create({
  topImgContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
    resizeMode: 'contain',
  },
  container: {
    flex: 0.6,
    backgroundColor: '#ffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  Txt: {
    alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: widthScale(20),
    fontSize: FONTS_SIZE.h1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  viewContanier: {
    height: heightScale(155),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,

    alignItems: 'center',

    marginTop: 20,
  },
  resumeTxt: {
    color: COLORS.grey,
    marginTop: widthScale(20),
    fontSize: FONTS_SIZE.h4,
    fontWeight: '500',
    fontFamily: FONTS.regular,
  },
  instructionTxt: {
    fontSize: FONTS_SIZE.body5,
    fontFamily: FONTS.regular,
    fontWeight: '300',
    marginTop: 10,
  },
  sizeStyle: {
    fontSize: FONTS_SIZE.body4,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  btnContainer: {
    height: 40,
    borderWidth: 0.6,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
  },
  btn: {
    height: 25,
    width: 100,
    backgroundColor: COLORS.Primary_Blue,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: widthScale(30),
  },
  txt: {
    fontSize: FONTS_SIZE.body3,
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
  },
  textInputContainer: {
    height: heightScale(130),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 20,
  },
  txtInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
});
