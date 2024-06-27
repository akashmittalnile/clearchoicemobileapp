import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,TextInput,Modal,Platform, Alert,FlatList,
} from 'react-native';
import React, {useEffect, useState,useCallback} from 'react';
import images from '../../global/images';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import styles from './SignUpScreenStyle';
import CustomButton from '../../components/CustomButton/CustomButton';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE,myHeight, heightScale, widthScale} from '../../global/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignupModal from '../../modals/SignupDropdown/SignupDropdown';
import Datepicker from '../../components/Datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useSelector, useDispatch } from 'react-redux';
import { setLoading,saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import { baseUrl,country,state,city,designation, register,requestGetApi, requestPostApi } from '../../WebApi/Service'
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import axios from 'axios';
import { dimensions } from '../../utility/Mycolors';
import DateTimePicker from '@react-native-community/datetimepicker';
import useKeyboard from '../../components/useKeyboard';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import messaging from '@react-native-firebase/messaging';

const SignUpScreen = (props) => {
  const [modalVisable, setModalVisible] = useState(false);
  const [opendateModal, setopenDateModal] = useState(false);
  const [ismodal, setIsModal] = useState(false);
  const dispatch =  useDispatch();
  const [My_Alert, setMy_Alert] = useState(false)
  const [My_Alert2, setMy_Alert2] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [mobile,setmobile]=useState('')
  const [lode,setlode]=useState(true)
  const [selectedJobopen, setselectedJobOpen] = useState(false);
  const [selectedJobvalue, setselectedJobValue] = useState(null);
  const [selectedJobitems, setselectedJobItems] = useState([
    {label: ' ', value: ' '},
  ]);
  const [dob,setdob]=useState(new Date())
  const [apidob,setapidob]=useState('')
  const [dobplace,setdobplace]=useState('Date of Birth (mm/dd/yyyy)')
  const [maritalopen, setmaritalOpen] = useState(false);
  const [maritalvalue, setmaritalValue] = useState(null);
  const [maritalitems, setmaritalItems] = useState([
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
  ]);
  const [genderopen, setgenderOpen] = useState(false);
  const [gendervalue, setgenderValue] = useState(null);
  const [genderitems, setgenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const [dependant,setdependant]=useState('')
  const [address,setaddress]=useState('')
  const [contry,setcontry]=useState('')
  const [contryopen, setcontryOpen] = useState(false);
  const [contryvalue, setcontryValue] = useState('231');
  const [contryitems, setcontryItems] = useState([
    {label: ' ', value: ' '},
  ]);
  const [stateopen, setstateOpen] = useState(false);
  const [statevalue, setstateValue] = useState(null);
  const [stateitems, setstateItems] = useState([
    {label: ' ', value: ' '},
  ]);
  const [cityopen, setcityOpen] = useState(false);
  const [cityvalue, setcityValue] = useState(null);
  const [cityitems, setcityItems] = useState([
    {label: ' ', value: ' '},
  ]);
  const [zip,setzip]=useState('')
  const [latter,setlatter]=useState('')
  const [pass,setpass]=useState('')
  const [cpass,setcpass]=useState('')
  const [fileResponse, setFileResponse] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const isKeyboardOpen = useKeyboard();
  const [pick, setpick] = useState('')
  const [filepath, setfilepath] = useState(null)
  const [modlevisual, setmodlevisual] = useState(false);
  const [isShowingResults, setisShowingResults] = useState(false)
  const [searchResults, setsearchResults] = useState([])
  const [dvtoken,setdvtoken]=useState('')
  useEffect(()=>{
    // getCountry()
    gettoken()
     getState('231')
     getJob()
  },[])
 const gettoken = () => {
    messaging().getToken().then((token) => {
      setdvtoken(token)
      console.log('Device token is:==>>',token)
   });
    };


  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
      console.log('====================================');
      console.log(response);
      console.log('====================================');
    } catch (err) {
      console.warn(err);
    }
  }, []);


  const onCamera = async () => {
   
  
    let options = {
      title: 'Select Image',
      // customButtons: [
      //   {
      //     name: 'customOptionKey',
      //     title: 'Choose Photo from Custom Option'
      //   },
      // ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
  
    launchCamera(options, (image) => {

     
      if (!image.didCancel) {
        console.log('the ddd==', image)
        var photo = {
          uri: image.assets[0].uri,
          type: "image/jpeg",
          name: image.assets[0].fileName
        };
        console.log('====================================');
        console.log(image);
        console.log('====================================');
       
        setpick(photo)
        setfilepath(image)
        setmodlevisual(false)
     }
    })
  }
 
  const onGallery = async () => {
  setmodlevisual(false)
  let options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose Photo from Custom Option'
      },
    ],
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  launchImageLibrary(options, (image) => {
    if (!image.didCancel) {
      console.log('the ddd==', image.assets[0].uri)
      var photo = {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: image.assets[0].fileName
      };
     
      console.log('====================================');
      console.log(image);
      console.log('====================================');
     
      setpick(photo)
      setfilepath(image)
      //uploadeImg(photo)
        
    }
  })
  
  }
  
  const dateformates=(month,day,year)=>{
    if(month=='Jan'){
    return '01-'+day+'-'+year
    }else if(month=='Feb'){
      return '02-'+day+'-'+year
    }else if(month=='Mar'){
      return '03-'+day+'-'+year
    }else if(month=='Apr'){
      return '04-'+day+'-'+year
    }else if(month=='May'){
      return '05-'+day+'-'+year
    }else if(month=='Jun'){
      return '06-'+day+'-'+year
    }else if(month=='Jul'){
      return '07-'+day+'-'+year
    }else if(month=='Aug'){
      return '08-'+day+'-'+year
    }else if(month=='Sep'){
      return '09-'+day+'-'+year
    }else if(month=='Oct'){
      return '10-'+day+'-'+year
    }else if(month=='Nov'){
      return '11-'+day+'-'+year
    }else if(month=='Dec'){
      return '12-'+day+'-'+year
    }
    }

  const dateformates2=(month,day,year)=>{
    if(month=='Jan'){
    return year+'-01-'+day
    }else if(month=='Feb'){
      return year+'-02-'+day
    }else if(month=='Mar'){
      return year+'-03-'+day
    }else if(month=='Apr'){
      return year+'-04-'+day
    }else if(month=='May'){
      return year+'-05-'+day
    }else if(month=='Jun'){
      return year+'-06-'+day
    }else if(month=='Jul'){
      return year+'-07-'+day
    }else if(month=='Aug'){
      return year+'-08-'+day
    }else if(month=='Sep'){
      return year+'-09-'+day
    }else if(month=='Oct'){
      return year+'-10-'+day
    }else if(month=='Nov'){
      return year+'-11-'+day
    }else if(month=='Dec'){
      return year+'-12-'+day
    }
    }

  const SignupPressed = async () => {
    if (name == '' || name.trim().length == 0) {
      setalert_sms('Please Enter Full Name')
      setMy_Alert(true)
    } 
    else if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email')
      setMy_Alert(true)
    } else if (mobile == '' || mobile.trim().length == 0) {
      setalert_sms('Please Enter Mobile Number')
      setMy_Alert(true)
    }else if (gendervalue == null) {
      setalert_sms('Please Select gender')
      setMy_Alert(true)
    } else if (dob == '') {
      setalert_sms('Please Select DOB')
      setMy_Alert(true)
    } else if (dependant == '') {
      setalert_sms('Please Enter dependant')
      setMy_Alert(true)
    }else if (maritalvalue == null) {
      setalert_sms('Please Select Maritial Status')
      setMy_Alert(true)
    }else if (address == '') {
      setalert_sms('Please Enter Address')
      setMy_Alert(true)
    }
    // else if (contryvalue == null) {
    //   setalert_sms('Please Select Country')
    //   setMy_Alert(true)
    // }
    // else if (statevalue == null) {
    //   setalert_sms('Please Select State')
    //   setMy_Alert(true)
    // }else if (cityvalue == null) {
    //   setalert_sms('Please Select City')
    //   setMy_Alert(true)
    // }
    else if (zip == '') {
      setalert_sms('Please Enter zip code')
      setMy_Alert(true)
    }else if (fileResponse == null) {
      setalert_sms('Please select resume')
      setMy_Alert(true)
    }else if (latter == '') {
      setalert_sms('Please Enter Accompanying Letter')
      setMy_Alert(true)}
    else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter Password')
      setMy_Alert(true)
    }else if (pass.trim().length < 6) {
      setalert_sms('Password should be more than 6 character')
      setMy_Alert(true)
    } else if (cpass == '' || cpass.trim().length == 0) {
      setalert_sms('Please Enter Confirm Password')
      setMy_Alert(true)
    }  else if (pass !=cpass) {
      setalert_sms('Password And Confirm Password should be same')
      setMy_Alert(true)
    } 
    else if (filepath ==null) {
      setalert_sms('Please select profile image')
      setMy_Alert(true)
    } 
    else {   
      var mm = dob.toString().substring(4, 7)
      var dd = dob.toString().substring(8, 10)
      var yy = dob.toString().substring(11, 15)
      var mydate = dateformates2(mm, dd, yy)
try {
  setLoading(true)
  let formdata = new FormData();
  formdata.append("fullname", name);
  formdata.append("email", email);
  formdata.append("phonenumber", mobile);
  formdata.append("designation_id", selectedJobvalue);
  formdata.append("DOB", mydate);
  formdata.append("marital_status", maritalvalue);
  formdata.append("gender", gendervalue);
  formdata.append("dependents", dependant); 
  formdata.append("device_key", dvtoken);
  if(filepath!=null){
    formdata.append("profile_image", pick);
     }
  formdata.append("address", address);
  // formdata.append("country_id",contryvalue);
  // formdata.append("state_id", statevalue);
  // formdata.append("city", cityvalue);
  formdata.append("zipcode",zip);
  formdata.append("password", pass);
  formdata.append("c_password",cpass);
     if(fileResponse!=null){
       formdata.append("resume",
  {  name: 'eraobooko.pdf', //name: fileResponse[0].name,
    type: fileResponse[0].type,
    uri: fileResponse[0].uri,
  });
     }
 
  const response = await axios.post(baseUrl+register, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
     },
  });
  setLoading(false)
  console.log('Upload successful:', response.data);
  // AsyncStorage.setItem("clearchoice", JSON.stringify(response.data.data));
  // dispatch(saveUserResult(response.data.data))
  // setIsModal(true);
  if(response.data.status){
    setalert_sms(response.data.message)
    setMy_Alert2(true)
   
  }else{
    setalert_sms(response.data.message)
    setMy_Alert(true)
  }
} catch (error) {
  setLoading(false)
  console.log('error:', error);
}
   
    }
  }

  const getCountry = async () => {
    setLoading(true)
    // let formdata = new FormData();
    // formdata.append("fullname", name);
    const { responseJson, err } = await requestGetApi(country, '', 'GET', '')
    setLoading(false)
    console.log('the country==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        // var dd=[]
        //  for(let i=0;i<responseJson.data.length;i++){
        //   let ab= {label:responseJson.data[i].name , value: responseJson.data[i].id}
        //   dd.push(ab)
        //  }
        setcontryItems(responseJson.data)
         setlode(!lode)
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  
}
const getJob = async () => {
  setLoading(true)
  const { responseJson, err } = await requestGetApi(designation, '', 'GET', '')
  setLoading(false)
  console.log('the country==>>', responseJson)
  if (err == null) {
    if (responseJson.status) {
      setselectedJobItems(responseJson.data)
       setlode(!lode)
    } else {
      setalert_sms(responseJson.message)
      setMy_Alert(true)
    }
  } else {
    setalert_sms(err)
    setMy_Alert(true)
  }

}
  const getState = async (id) => {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("country_id", id);
      const { responseJson, err } = await requestPostApi(state, formdata, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          setstateItems(responseJson.data)
          setlode(!lode)
        } else {
          setalert_sms(responseJson.message)
          setMy_Alert(true)
        }
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    
  }
  const getCity = async (id) => {
    setLoading(true)
    let formdata = new FormData();
    formdata.append("state_id", id);
    const { responseJson, err } = await requestPostApi(city, formdata, 'POST', '')
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        setcityItems(responseJson.data)
        setlode(!lode)
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  
}
const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setopenDateModal(Platform.OS === 'ios');
  setdob(currentDate);
   console.log('====================================');
   console.log(currentDate);
   console.log('====================================');
 
  var mm = currentDate.toString().substring(4, 7)
  var dd = currentDate.toString().substring(8, 10)
  var yy = currentDate.toString().substring(11, 15)
  var mydate = dateformates(mm, dd, yy)
  setdobplace(mydate)
  setlode(!lode)
};
const formatPhoneNumber = input => {
  // Remove all non-numeric characters

  const cleaned = input.replace(/\D/g, '');

    // Apply the desired format: (XXX) XXX-XXXX
    const regex = /^(\d{3})(\d{3})(\d{4})$/;
    const formattedNumber = cleaned.replace(regex, '($1) $2-$3');
  
  setmobile(formattedNumber);
  // setPhone(formattedNumber);
};

const StartsearchLocation = async (text) => {
  setaddress(text)
  axios
    .request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCDXuJl8qV7nsf-ynH3slL2iopSJm6y0mA&input=${text}`,
    })
    .then((response) => {
      setsearchResults(response.data.predictions)
      setisShowingResults(true)
    })
    .catch((e) => {
      console.log('error is==>>', e.response);
    });
};

const onPressaddress = (item) => {
  console.log('====================================');
  console.log(item);
  console.log('====================================');
  setisShowingResults(false)
  setaddress(item.description)
}


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
        <View style={[styles.container,{ top: isKeyboardOpen && Platform.OS=='ios' ? -dimensions.SCREEN_HEIGHT*15/100 : 'auto'}]}>
  <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',width:dimensions.SCREEN_WIDTH*89/100,alignSelf:'center'}}>
  <TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={{marginTop:20}}>
    <Image source={require('../../assets/images/Icons/hback.png')} style={{width:30,height:30,resizeMode:'stretch'}}></Image>
  </TouchableOpacity>
  <Text style={[styles.loginTxt,{right:10}]}>Sign Up</Text>
  <Text style={styles.loginTxt}></Text>
  </View>
          <KeyboardAwareScrollView>
                        <TouchableOpacity onPress={()=>{setmodlevisual(true)}} style={{alignSelf:'center'}}>
                      
                      <View style={{
                        height: 100,
              width:100,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',}}>
                <Image
                  source={filepath !=null ? {uri:filepath.assets[0].uri}  : require('../../assets/images/Icons/adminicon.png')}
                  style={{ height: 80,
                    width:80,borderRadius:40,resizeMode:'stretch'}}
                />
              </View>
              <View style={{width:20,height:20,position:'absolute',right:2,bottom:2}}>
              <Image source={require('../../assets/images/Icons/camera.png')}
                  style={{ height: 20,
                    width:20,}}
                />
              </View>
                  </TouchableOpacity>
            <View style={{marginTop: 20}}>
              <CustomTextInput
                onChangeText={txt => {
                   setname(txt);
                }}
                placeholder={'Full Name'}
              />
            </View>
            <View style={{marginTop: 10}}>
              <CustomTextInput 
               onChangeText={txt => {
                setemail(txt);
             }}
              placeholder={'Email Address'} />
            </View>
           <View style={[{height:45, 
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
    marginTop: 10,}]}>
              <TextInput
               onChangeText={txt => {
                formatPhoneNumber(txt)
                
               }}
               value={mobile}
               keyboardType='phone-pad'
               placeholderTextColor={COLORS.grey}
                 maxLength={Platform.OS=='android'? 14:10}
                placeholder="Phone Number"
                style={{ 
                   textAlignVertical: 'top',flex:1,
                  paddingLeft:10}}
              />
            </View>
            <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:999}}>
              <DropDownPicker
               open={genderopen}
               value={gendervalue}
               items={genderitems}
               setOpen={setgenderOpen}
               setValue={setgenderValue}
               setItems={setgenderItems}
              placeholder='Select Gender'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View>
            <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:988}}>
              <DropDownPicker
              open={selectedJobopen}
              value={selectedJobvalue}
              items={selectedJobitems}
              placeholder='For Which Job are you applying?'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              setOpen={setselectedJobOpen}
              setValue={setselectedJobValue}
              setItems={setselectedJobItems}

              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View>
           
            <View style={{marginTop: 10,zIndex:-888}}>
              <CustomTextInput
                placeholder={dobplace}
                editable={false}
                onPress={() => {
                  console.log('====================================');
                 
                   setopenDateModal(true);
                 
                }}
                rightView={
                  <View>
                    <Image source={images.calendar} />
                  </View>
                }
              />
            
            </View>
            {opendateModal ?
            <>
            <View style={{width:'85%',flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:10}}>
             <TouchableOpacity onPress={()=>{setopenDateModal(false)}}>
              <Text>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{setopenDateModal(false)}}>
              <Text>Confirm</Text>
             </TouchableOpacity>
            </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          maximumDate={new Date()}
          display="spinner"
          onChange={onChange}
        />
         </>

        : null}
           
            <View style={{marginTop: 10,zIndex:-999}}>
              <CustomTextInput
               onChangeText={txt => {
                setdependant(txt);
             }}
             keyboardType='phone-pad'
              placeholder={'No. Of dependents'} />
            </View>
            
             <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:888}}>
              <DropDownPicker
               open={maritalopen}
               value={maritalvalue}
               items={maritalitems}
               setOpen={setmaritalOpen}
               setValue={setmaritalValue}
               setItems={setmaritalItems}
              placeholder='Select Marital Status'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View>
           
            <View style={{marginTop: 10,zIndex:-999}}>
              <CustomTextInput
              value={address}
               onChangeText={txt => {
                StartsearchLocation(txt)
             }}
              placeholder={'Street Address'} />
              
    {/* <View style={[{zIndex:-999,
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
    marginTop: 10,}]}>
               <GooglePlacesAutocomplete
      placeholder='Street Address'
      onPress={(data, details) => {
        setaddress(data.description);
        console.log('Ashish',data);
        console.log('Ashish',details);
      }}
      styles={{
      
        textInputContainer: {
      // zIndex:999,
      //  backgroundColor: 'grey',
        },
        textInput: {
          color: '#000',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      query={{
        key: 'AIzaSyCDXuJl8qV7nsf-ynH3slL2iopSJm6y0mA',
        language: 'en',
      }}
    />

            </View> */}
            </View>
       
            {
          isShowingResults ?
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              style={mystyles.searchResultsContainer}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={mystyles.resultItem}
                    onPress={() => { onPressaddress(item) }}>
                    <Image source={require('../../assets/images/Icons/location.png')} style={{ width: 18, height: 18 }}></Image>
                    <Text style={{ color: '#000', left: 10 }}>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            : null
        }
       
       
       
       
       
       
       
            {/* <View style={{marginTop: 10,zIndex:-999}}>
              <CustomTextInput
               onChangeText={txt => {
                setaddress(txt);
             }}
             editable={false}
               placeholder={'United States'} />
            </View>
            <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:-555}}>
              <DropDownPicker
               open={contryopen}
               value={contryvalue}
               items={contryitems}
               setOpen={setcontryOpen}
               setValue={setcontryValue}
               setItems={setcontryItems}
              onSelectItem={(item) => { getState(item.value)}}
              placeholder='Select Country'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              dropDownContainerStyle={{borderColor:COLORS.Primary_Grey}}
              listItemContainerStyle={{
                height: 40,
                borderColor:COLORS.Primary_Grey,
                borderWidth:1
              }}
              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              color:'#000',
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View> 

           
            <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:-666}}>
              <DropDownPicker
               open={stateopen}
               value={statevalue}
               items={stateitems}
               setOpen={setstateOpen}
               setValue={setstateValue}
               setItems={setstateItems}
               onSelectItem={(item) => { getCity(item.value)}}
              placeholder='Select State'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              dropDownContainerStyle={{borderColor:COLORS.Primary_Grey}}
              listItemContainerStyle={{
                height: 40,
                borderColor:COLORS.Primary_Grey,
                borderWidth:1
              }}
              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View>
           
           
            <View style={{marginTop: 10,width:'90%',alignSelf:'center',zIndex:-777}}>
              <DropDownPicker
               open={cityopen}
               value={cityvalue}
               items={cityitems}
               setOpen={setcityOpen}
               setValue={setcityValue}
               setItems={setcityItems}
              placeholder='Select City'
              placeholderStyle={{
                color: COLORS.grey,
                fontSize: FONTS_SIZE.h5,
                fontFamily: FONTS.regular
              }}
              dropDownContainerStyle={{borderColor:COLORS.Primary_Grey}}
              listItemContainerStyle={{
                height: 40,
                borderColor:COLORS.Primary_Grey,
                borderWidth:1
              }}
              style={{borderColor:'transparent',
              borderRadius: widthScale(5),
              borderWidth: 0.5,
              borderColor: COLORS.primary_white,
              backgroundColor: '#fff',
              alignSelf: 'center',
              zIndex:999,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            />
            </View>
*/}
             <View style={[{height:45, zIndex:-999,
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
    marginTop: 10,}]}>
              <TextInput
               onChangeText={txt => {
                setzip(txt);
               }}
               keyboardType='phone-pad'
               placeholderTextColor={COLORS.grey}
                maxLength={6}
                placeholder="Zip Code"
                style={{ 
                   textAlignVertical: 'top',flex:1,
                  paddingLeft:10}}
              />
            </View>
            <View style={{marginTop: 10,zIndex:-999}}>
              <CustomTextInput
               onChangeText={txt => {
                // setzip(txt);
             }}
             editable={false}
              placeholder= {fileResponse ? fileResponse[0]?.name :'Upload Resume'}
              rightView={
                <TouchableOpacity style={styless.btn} onPress={()=>{handleDocumentSelection()}}>
                <Text style={styless.txt}>Choose File</Text>
               </TouchableOpacity>
              }
              />
            </View>
           <Text style={{color:COLORS.Primary_Blue,fontSize:12,marginLeft:'8%',zIndex:-999}}>* pdf, doc, docx. file type are allowed</Text>


           <View style={[styless.container,{zIndex:-999}]}>
        
            <View style={styless.textInputContainer}>
              <TextInput
               onChangeText={txt => {
                setlatter(txt);
               }}
               multiline
               numberOfLines={4}
                placeholder="Accompanying Letter"
                style={styless.txtInput}
              />
            </View>
          
        </View>
           
            <View style={{marginTop: 10}}>
              <CustomTextInput
               onChangeText={txt => {
                setpass(txt);
             }}
              placeholder={'Create new password'} />
            </View>
            <View style={{marginTop: 10}}>
              <CustomTextInput
               onChangeText={txt => {
                setcpass(txt);
             }}
              placeholder={'Confirm password'} />
            </View> 
            <CustomButton
              title={'Activate your account'}
              backgroundColor={COLORS.Primary_Green}
              onPress={() => {
                SignupPressed()
                
              }}
            />
            
            <View style={styles.SignupTxtContainer}>
              <Text style={styles.txtStyle}>Already have an account?</Text>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                <Text style={styles.signup}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
     
    
{  modlevisual ? 
            <Modal
        animationType="fade"
        transparent={true}
        visible={modlevisual}
        onRequestClose={() => {
            setmodlevisual(false);
        }}
       >
                       <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'rgba(140, 141, 142, 0.7)',
                            }}>       
                            <View style={{ width: '100%', height: '30%', backgroundColor: 'white',borderTopRightRadius:20,borderTopLeftRadius:20, }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',paddingTop: 50,paddingHorizontal: 30, }}>
                <TouchableOpacity style={{width:150,height:150}} 
                onPress={() => { onGallery() }}
                >
                  <Image
                source={require('../../assets/images/Icons/gallery.png')}
                style={{ width: 40, height: 40 ,alignSelf:'center'}}
                 />
                  <Text style={{textAlign:'center',color:'#000'}}>Open Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:150,height:150}}
                onPress={() => {Platform.OS=='android'? onCamera(): onCamera() }}
                >
                   <Image
                source={require('../../assets/images/Icons/cameraa.png')}
                style={{ width: 44, height: 35 ,alignSelf:'center'}}
                 />
                  <Text style={{textAlign:'center',color:'#000'}}>Open Camera</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{width:'80%',height:50,borderRadius:10,backgroundColor:'#0F265B',justifyContent:'center',alignSelf:'center',top:-30}} onPress={()=>{setmodlevisual(false)}}>
              <Text style={{textAlign:'center',fontSize:16,color:'#fff'}}>Cancel</Text>
              </TouchableOpacity>

            </View>
        </View>
            </Modal> 
     : null 
   } 

     {ismodal && (
        <SignupModal
          onPress={() => {
            setIsModal(false);
          }}
          containrStyle={mystyles.modalContainerStyle}
          children={
            <View style={mystyles.topContainer}>
              <Image source={images.adminIcon} style={mystyles.img} />
              <Text style={mystyles.modalCotationTxt}>
                Administration will review your account
              </Text>
              <Text style={mystyles.conditionalTxtStyle}>
                New registration request has been sent to admin for approval
              </Text>
              <View style={mystyles.txtContainer}>
                <Text style={mystyles.btnTxtStyle}>
                  You will receive updates on your Registered email id
                </Text>
              </View>
              <CustomButton
                backgroundColor={COLORS.Primary_Green}
                title={'close'}
                onPress={() => {
                  setIsModal(false);
                }
                  // navigation.goBack()
                }
              />
            </View>
          }
        />
      )}

      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {My_Alert2 ? <MyAlert sms={alert_sms} okPress={() => { 
        setMy_Alert2(false)
        props.navigation.navigate('Login')
       }} /> : null}

      {loading ? <Loader /> : null}
    </>
  );
};

const styless = StyleSheet.create({
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
    paddingLeft:15
  },
});
const mystyles = StyleSheet.create({
  topImgContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultItem: {
    width: '90%',
    alignItems: 'center',
    paddingLeft: '5%',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  searchResultsContainer: {
    width: '100%',
    alignSelf: 'center'
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

export default SignUpScreen;
