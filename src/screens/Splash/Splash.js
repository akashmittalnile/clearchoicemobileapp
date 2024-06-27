import {View, Text,Image} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './Splash.style';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import images from '../../global/images';

const Splash = props => {
  let {navigation} = props;
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('AuthRoute');
    // }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {/* <CustomFastImage img={images.applogo} imageStyle={styles.imageStyle} /> */}
        <Image style={styles.imageStyle} source={images.applogo}></Image>   
           </View>
      <View style={styles.bottomLogoContainer}>
        <CustomFastImage
          img={images.bbblogo}
          imageStyle={styles.bbblogoStyle}
          resizeMode="stretch"
        />
              

        <CustomFastImage
          img={images.certifiedfirmlogo}
          imageStyle={styles.bbblogoStyle}
          resizeMode="stretch"
        />
        <CustomFastImage
          img={images.isnlogo}
          imageStyle={styles.bbblogoStyle}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default Splash;
