import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import images from '../../global/images';
import styles from './LoginScreenStyle';

import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import {ColorProperties} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import COLORS from '../../global/Colors';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomButton from '../../components/CustomButton/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useSelector, useDispatch } from 'react-redux';
import { setLoading,saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import { baseUrl, login,forget_password,reset_password, requestPostApi } from '../../WebApi/Service'
import useKeyboard from '../../components/useKeyboard';
import { dimensions } from '../../utility/Mycolors';
import {FONTS, FONTS_SIZE, checkPlatForm, heightScale, widthScale} from '../../global/Utils';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setcPass] = useState('');
  const dispatch =  useDispatch();
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const isKeyboardOpen = useKeyboard();
  const [forgotPassClick,setforgotPassClick]=useState(false)
  const [otpModel,setotpModel]=useState(false)
  const [resetPassModel,setresetPassModel]=useState(false)
  const [otp,setotp]=useState('')
  const [textOtp,settextOtp]=useState('')
  const [dvtoken,setdvtoken]=useState('')

useEffect(()=>{
  gettoken()
},[])


  const gettoken = () => {
    messaging().getToken().then((token) => {
      setdvtoken(token)
      console.log('Device token is:==>>',token)
   });
    };



  const LoginPressed = async () => {
    // Login_Pressed({id:email})
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email')
      setMy_Alert(true)
      
    } else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter Password')
      setMy_Alert(true)
     
    }
    // else if (number.length < 10 || number.length > 12) { 
    //   Toast.show('Please Enter Valid Mobile Number')
    // }
    else {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("email", email); //code+
      formdata.append("device_key", dvtoken);
      formdata.append("password", pass);


      
      // formdata.append("email", "niteshkoy@gmail.com");
      // formdata.append("password", "Nitesh@123");
      
      // const requestOptions = {
      //   method: "POST",
      //   body: formdata,
      //   redirect: "follow"
      // };
      
      // fetch("https://nileprojects.in/clearchoice-janitorial/api/login", requestOptions)
      //   .then((response) => response.text())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.error(error));


      const { responseJson, err } = await requestPostApi(login, formdata, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          loginPress(responseJson.data)
        } else {
          setalert_sms(responseJson.message)
          setMy_Alert(true)
        }
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }
  const forgotPass = async () => {
    // Login_Pressed({id:email})
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email')
      setMy_Alert(true)
      
    } 
    else {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("email", email); //code+
      // formdata.append("device_id", mapdata.devicetoken);
      //formdata.append("password", pass);

      const { responseJson, err } = await requestPostApi(forget_password, formdata, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          setotp(responseJson.data)
         setotpModel(true)

        } else {
          setalert_sms(responseJson.message)
          setMy_Alert(true)
        }
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }
  const resetPass = async () => {
    // Login_Pressed({id:email})
    if (email == '' || email.trim().length == 0) {
     setalert_sms('Please Enter Email')
       setMy_Alert(true)
    }else if(pass==''){
      setalert_sms('Please Enter Password')
      setMy_Alert(true)
    } else if(cpass==''){
      setalert_sms('Please Enter Confirm Password')
      setMy_Alert(true)
    } else if(pass!=cpass){
      setalert_sms('Password and Confirm Password should be same')
      setMy_Alert(true)
    } 
    else {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("email", email); //code+
       formdata.append("password", pass);
      formdata.append("password_confirmation", cpass);

      const { responseJson, err } = await requestPostApi(reset_password, formdata, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          setforgotPassClick(false)
          setotpModel(false)
          setresetPassModel(false)
        } else {
          setalert_sms(responseJson.message)
          setMy_Alert(true)
        }
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }
  const loginPress=(data)=>{
            
  
    AsyncStorage.setItem("clearchoice", JSON.stringify(data));
    dispatch(saveUserResult(data))
  }
  const submitOtp=()=>{
    if (textOtp == '' || textOtp.trim().length == 0) {
      setalert_sms('Please Enter Otp')
      setMy_Alert(true)
      
    } else{
      if(textOtp==otp){
        setresetPassModel(true)
      }else{
        setalert_sms('Invalid Otp')
        setMy_Alert(true)
      }
    }
  }
  const resetStacks=(page)=>{
  
    navigation.reset({
      index: 0,
      routes: [{name: page}],
    });
   }
  
  return (
    <ImageBackground source={images.loginbg} style={StyleSheet.absoluteFill}>
      <View style={styles.topImgContainer}>
        <CustomFastImage
          img={images.loginlogo}
          imageStyle={styles.logo}
          resizeMode={'contain'}
        />
      </View>
      <View style={[styles.container,{ top: isKeyboardOpen ? 'auto' : 'auto',height:checkPlatForm()=='android'?'49%':isKeyboardOpen ? '65%' : '53%'}]}>
            
      <Text style={styles.loginTxt}>Login</Text>
        <KeyboardAwareScrollView >
      
          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Email Address'}
              leftView={
                <View>
                  <Image source={images.smsicon} />
                </View>
              }
            />
          </View>

          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setPass(txt);
              }}
              placeholder={'Password'}
              leftView={
                <View>
                  <Image source={images.lockicon} />
                </View>
              }
            />
          </View>
          <TouchableOpacity style={styles.forgotContainer} onPress={()=>{setforgotPassClick(true)}}>
            <Text style={styles.forgotTxt}>Forgot your password?</Text>
          </TouchableOpacity>
          <CustomButton
            title={'Sign In'}
            onPress={()=>{LoginPressed()}}
            backgroundColor={COLORS.Primary_Green}
          />
          
          <View style={styles.SignupTxtContainer}>
            <Text style={styles.txtStyle}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => resetStacks('SignUp')}>
              <Text style={styles.signup}>Signup</Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAwareScrollView>
      </View>

      {forgotPassClick ? 
     <View style={{width:'100%',height:dimensions.SCREEN_HEIGHT,position:'absolute',backgroundColor:'rgba(0,0,0,0.4)',flex:1}}>
     <View style={{width:'100%',height:isKeyboardOpen? dimensions.SCREEN_HEIGHT*65/100 : dimensions.SCREEN_HEIGHT*30/100,backgroundColor:'#fff',position:'absolute',bottom:0,alignSelf:'center',borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:20}}>
         
     <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Email Address'}
              leftView={
                <View>
                  <Image source={images.smsicon} />
                </View>
              }
            />
          </View>
          <CustomButton
            title={'Submit'}
            onPress={()=>{forgotPass()}}
            backgroundColor={COLORS.Primary_Green}
          />
        
     </View>
     </View>
     : null}

   {otpModel ? 
     <View style={{width:'100%',height:dimensions.SCREEN_HEIGHT,position:'absolute',backgroundColor:'rgba(0,0,0,0.4)',flex:1}}>
     <View style={{width:'100%',height:isKeyboardOpen? dimensions.SCREEN_HEIGHT*65/100 : dimensions.SCREEN_HEIGHT*30/100,backgroundColor:'#fff',position:'absolute',bottom:0,alignSelf:'center',borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:20}}>
         
     <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                settextOtp(txt);
              }}
              placeholder={'Enter Otp'}
              leftView={
                <View>
                  <Image source={images.smsicon} />
                </View>
              }
            />
          </View>
          <CustomButton
            title={'Submit'}
            onPress={()=>{submitOtp()}}
            backgroundColor={COLORS.Primary_Green}
          />
        
     </View>
     </View>
     : null}

{resetPassModel ? 
     <View style={{width:'100%',height:dimensions.SCREEN_HEIGHT,position:'absolute',backgroundColor:'rgba(0,0,0,0.4)',flex:1}}>
     <View style={{width:'100%',height:isKeyboardOpen? dimensions.SCREEN_HEIGHT*65/100 : dimensions.SCREEN_HEIGHT*30/100,backgroundColor:'#fff',position:'absolute',bottom:0,alignSelf:'center',borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:20}}>
         
     <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setPass(txt);
              }}
              placeholder={'Password'}
              leftView={
                <View>
                  <Image source={images.lockicon} />
                </View>
              }
            />
          </View>

          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setcPass(txt);
              }}
              placeholder={'Confirm Password'}
              leftView={
                <View>
                  <Image source={images.lockicon} />
                </View>
              }
            />
          </View>

          <CustomButton
            title={'Submit'}
            onPress={()=>{resetPass()}}
            backgroundColor={COLORS.Primary_Green}
          />
        
     </View>
     </View>
     : null}


 {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}

          </ImageBackground>
  );
};

export default LoginScreen;
