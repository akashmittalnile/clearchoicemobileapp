import { View, Text, SafeAreaView,TextInput, FlatList,Modal,Platform, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useRef, useEffect,useCallback } from 'react'
import { Mycolors, dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import COLORS from '../../global/Colors';
import images from '../../global/images';
import DrawerPic from '../../navigation/Drawer/DrawerPic';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {  useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading,saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useKeyboard from '../../components/useKeyboard';

import CustomFastImage from '../../components/FastImage/CustomFastImage';
import {FONTS, FONTS_SIZE,myHeight, heightScale, widthScale} from '../../global/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignupModal from '../../modals/SignupDropdown/SignupDropdown';
import Datepicker from '../../components/Datepicker';
import { baseUrl,country,state,city,designation,profile,update_profile, register,requestGetApi, requestPostApi } from '../../WebApi/Service'
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const Profile = (props) => {
  const dispatch =  useDispatch();
    const user  = useSelector(state => state.user.user_details)
    const [DATA, setDATA] = useState('')
    const [edit, setedit] = useState(false)
    const [name,setname]=useState('')
    const [phone,setphone]=useState('')
    const [email,setemail]=useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false)
    const [lod, setlod] = useState(false)
    const [profileImg, setProfileImg] = useState('')
    const [modlevisual, setmodlevisual] = useState(false);
    const [image, setImage] = useState(null);
    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)



    const [opendateModal, setopenDateModal] = useState(false);
    const [ismodal, setIsModal] = useState(false);
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
    const [isShowingResults, setisShowingResults] = useState(false)
    const [searchResults, setsearchResults] = useState([])


  useEffect(()=>{
    
    // getState('231')
    getJob()
    getprofile()
  },[])

const getprofile = async () => {
  setLoading(true)
  const { responseJson, err } = await requestGetApi(profile, '', 'GET', user.token)
  setLoading(false)
  console.log('the getprofile==>>', responseJson)
  if (err == null) {
    if (responseJson.status) {
     setDATA(responseJson.data)
     setname(responseJson.data.fullname)
     setemail(responseJson.data.emailid)
     setphone(responseJson.data.phonenumber)
     setmobile(responseJson.data.phonenumber)
     setgenderValue(responseJson.data.gender)
     setselectedJobValue(parseInt(responseJson.data.designation_id))
     setdobplace(responseJson.data.DOB)
   
     const [m, d,y] = responseJson.data.DOB.split('-');
      var apid=`${y}-${m}-${d}`
     setapidob(apid)
     setdependant(responseJson.data.dependents)
     setmaritalValue(responseJson.data.marital_status)
     setaddress(responseJson.data.address)
     setstateValue(parseInt(responseJson.data.state_id))
     setzip(responseJson.data.zipcode)
    //  getCity(responseJson.data.state_id)
     setcityValue(parseInt(responseJson.data.city))
    //  setpass()
    //  setcpass()

    } else {
      setalert_sms(responseJson.message)
      setMy_Alert(true)
    }
  } else {
    setalert_sms(err)
    setMy_Alert(true)
  }

}
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
      type: image.assets[0].type, //"image/jpeg",
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
  } else if (dob == '') {
    setalert_sms('Please Select DOB')
    setMy_Alert(true)
  } else if (dependant == '') {
    setalert_sms('Please Enter dependant')
    setMy_Alert(true)
  }else if (maritalvalue == null) {
    setalert_sms('Please Select marital status')
    setMy_Alert(true)
  }else if (address == '') {
    setalert_sms('Please Enter Address')
    setMy_Alert(true)
  }
  else if (zip == '') {
    setalert_sms('Please Enter zip code')
    setMy_Alert(true)
  } else {   
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
formdata.append("DOB", apidob);
formdata.append("marital_status", maritalvalue);
formdata.append("gender", gendervalue);
formdata.append("dependents", dependant); 
if(filepath!=null){
  formdata.append("profile_image", pick);
   }
formdata.append("address", address);
// formdata.append("country_id",contryvalue);
// formdata.append("state_id", statevalue);
// formdata.append("city", cityvalue);
formdata.append("zipcode",zip);
if(fileResponse!=null){
  formdata.append("resume",
{  name: 'eraobooko.pdf', //name: fileResponse[0].name,
type: fileResponse[0].type,
uri: fileResponse[0].uri,
});
}
console.log('====================================');
console.log(formdata);
console.log('====================================');
const response = await axios.post(baseUrl+update_profile, formdata, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    'Authorization': `Bearer ${ user.token}`,
   },
});
setLoading(false)
console.log('Upload successful:', response.data);

if(response.data.status){
        var responseJson=response.data
        setalert_sms(responseJson.message)
        setMy_Alert(true)
        AsyncStorage.setItem("clearchoice", JSON.stringify(responseJson.data));
        dispatch(saveUserResult(responseJson.data))
        getprofile()
        setedit(false);
        setlod(!lod)
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

const getJob = async () => {
setLoading(true)
const { responseJson, err } = await requestGetApi(designation, '', 'GET', '')
setLoading(false)
console.log('the designation==>>', responseJson)
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
var mydate2 = dateformates2(mm, dd, yy)
    setapidob(mydate2)
    setdobplace(mydate)
    setlode(!lode)
};
const formatPhoneNumber = input => {
// Remove all non-numeric characters
const cleanedInput = input.replace(/\D/g, '');
// Format the number in (XXX) XXX-XXXX
const formattedNumber = cleanedInput.replace(
  /(\d{3})(\d{3})(\d{4})/,
  '($1) $2-$3',
);
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
    <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>
      <HomeHeaderComponent icon1={require('../../assets/images/Icons/firstline2.png')} press1={() => { props.navigation.openDrawer() }} press2={() => { props.navigation.navigate('Notification') }} />
      <ScrollView>
        <View style={styles.container} onPress={() => { }}>       
        <View style={styles.container2}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={()=>{}}>
        
           <View style={{
             height: widthScale(50),
    width: widthScale(50),
    alignItems: 'center',
    justifyContent: 'center',borderRadius:30,
    overflow: 'hidden',}}>
      <Image
        source={{uri:DATA?.profile_image}}
        style={{ height: widthScale(50),resizeMode:'stretch',zIndex:999,overflow:'hidden',backgroundColor:'gray',
          width: widthScale(50),borderRadius:30}}
      />
    </View>
        </TouchableOpacity>
       
        <View>
          <Text style={[styles.headerText,{fontWeight:'600',fontSize:15}]}>{DATA.fullname}</Text>
          <Text style={[styles.headerText, {fontSize: FONTS_SIZE.body4,marginTop:5}]}>
            Emp ID: {DATA.userId?DATA.userId:DATA.userid}
          </Text>
          <View style={{ flexDirection: 'row', alignItems:'center',marginTop:10}}>
          <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={images.callgray} />
            <View style={{marginLeft:7 }}>
            <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 11, }}>Phone</Text>
              <Text style={{ color: COLORS.grey, fontWeight: '500', fontSize: 10,  marginTop:3 }}>{DATA.phonenumber}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems:'center',marginTop:10}}>
          <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={images.smsgray} />
            <View style={{marginLeft:7 }}>
            <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 11, }}>Email</Text>
              <Text style={{ color: COLORS.grey, fontWeight: '500', fontSize: 10,  marginTop:3 }}>{DATA.emailid}</Text>
            </View>
          </View>

        </View>
      </View>

      <TouchableOpacity style={styles.Btn} onPress={()=>{setedit(true)}}>
        <Text style={styles.BtnTxt}>Edit</Text>
      </TouchableOpacity>
    </View>

        </View>

<TouchableOpacity style={styles.container} onPress={() => { props.navigation.navigate('MyServices') }}>
  <View style={{ flexDirection: 'row', width: '100%',alignItems:'center'}}>
  <Image style={{ width: 40, height: 40, resizeMode: 'stretch', }} source={images.profileservice} />
    <View style={{width: '60%',marginLeft:10 }}>
    <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 14, lineHeight: 16 }}>My Services</Text>
      <Text style={{ color: COLORS.grey, fontWeight: '500', fontSize: 12,  lineHeight: 16,marginTop:5 }}>{DATA.service_count} Project</Text>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.container} onPress={() => { props.navigation.navigate('ServiceLogs') }}>
  <View style={{ flexDirection: 'row', width: '100%',alignItems:'center'}}>
  <Image style={{ width: 40, height: 40, resizeMode: 'stretch', }} source={images.profileservicelog} />
    <View style={{width: '60%',marginLeft:10 }}>
    <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 14, lineHeight: 16 }}>Services Logs</Text>
      <Text style={{ color: COLORS.grey, fontWeight: '500', fontSize: 12,  lineHeight: 16,marginTop:5 }}>{DATA.service_log} Project Completed</Text>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.container} onPress={() => { props.navigation.navigate('IncompletedServices') }}>
  <View style={{ flexDirection: 'row', width: '100%',alignItems:'center'}}>
  <Image style={{ width: 40, height: 40, resizeMode: 'stretch', }} source={images.profileservice} />
    <View style={{width: '60%',marginLeft:10 }}>
    <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 14, lineHeight: 16 }}>Scheduled Services</Text>
      <Text style={{ color: COLORS.grey, fontWeight: '500', fontSize: 12,  lineHeight: 16,marginTop:5 }}>{DATA.incomplete_service_count} Project</Text>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity style={[styles.container,{paddingVertical:15}]} onPress={() => {  }}>
  <View style={{ flexDirection: 'row', width: '100%',alignItems:'center',justifyContent:'space-between'}}>
  <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 14, lineHeight: 16,marginLeft:10 }}>Terms & Conditions</Text>
  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={images.rightArrow} />
  </View>
</TouchableOpacity>

<TouchableOpacity style={[styles.container,{paddingVertical:15}]} onPress={() => {  }}>
  <View style={{ flexDirection: 'row', width: '100%',alignItems:'center',justifyContent:'space-between'}}>
  <Text style={{ color: COLORS.Primary_Blue, fontWeight: '600', fontSize: 14, lineHeight: 16,marginLeft:10 }}>Privacy Policy</Text>
  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={images.rightArrow} />
  </View>
</TouchableOpacity>

      </ScrollView>
      {/* {edit ?
      <TouchableOpacity style={{position:'absolute',width:dimensions.SCREEN_WIDTH,height:dimensions.SCREEN_HEIGHT,backgroundColor:'rgba(0,0,0,0.4)',justifyContent: 'center',}} onPress={()=>{setedit(false)}}>
        <View style={{width:'80%',padding:15,backgroundColor:'#fff',borderRadius:15,alignSelf:'center',zIndex:999}}>
     
        <TouchableOpacity onPress={()=>{setmodlevisual(true)}} style={{alignSelf:'center'}}>
        
        <View style={{
          height: 100,
 width:100,
 alignItems: 'center',
 justifyContent: 'center',
 overflow: 'hidden',}}>
   <Image
     source={filepath !=null ? {uri:filepath.assets[0].uri}  :  {uri:DATA?.profile_image}}
     style={{ height: 80,
       width:80,borderRadius:40,resizeMode:'stretch'}}
   />
 </View>
 <View style={{width:20,height:20,position:'absolute',right:2,bottom:2}}>
 <Image source={require('../../assets/images/Icons/camera.png')}
     style={{ height: 20,
       width:20,borderRadius:10}}
   />
 </View>
     </TouchableOpacity>
     
     
        <View style={{marginTop: 10}}>
              <CustomTextInput
                onChangeText={txt => {
                 setname(txt);
                }}
                placeholder={name}
              />
            </View>

            <View style={{marginTop: 10}}>
              <CustomTextInput
              onChangeText={txt => {
                setemail(txt);
               }}
              placeholder={email} />
            </View>
            <View style={{marginTop: 10}}>
              <CustomTextInput 
              onChangeText={txt => {
                setphone(txt);
               }}
              placeholder={phone} />
            </View>
         
            <CustomButton
              title={'Save'}
              backgroundColor={COLORS.Primary_Green}
              onPress={()=>{updateProfile()}}
            />

        </View>
      </TouchableOpacity>
      : null
      } */}

 

{edit ? 
 <View style={[{
  backgroundColor: '#ffff',


  width: '100%',}]}>
 <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',width:dimensions.SCREEN_WIDTH*89/100,alignSelf:'center'}}>
 <TouchableOpacity onPress={()=>{setedit(false)}} style={{marginTop:20}}>
   <Image source={require('../../assets/images/Icons/hback.png')} style={{width:30,height:30,resizeMode:'stretch'}}></Image>
 </TouchableOpacity>
 <Text style={[styles.loginTxt,{right:10}]}>Update Profile</Text>
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
     source={filepath !=null ? {uri:filepath.assets[0].uri}  :  {uri:DATA?.profile_image}}
     style={{ height: 80,
       width:80,borderRadius:40,resizeMode:'stretch'}}
   />
 </View>
 <View style={{width:20,height:20,position:'absolute',right:2,bottom:2}}>
 <Image source={require('../../assets/images/Icons/camera.png')}
     style={{ height: 20,
       width:20,borderRadius:10}}
   />
 </View>
     </TouchableOpacity>
     
           <View style={{marginTop: 20}}>
             <CustomTextInput
               onChangeText={txt => {
                  setname(txt);
               }}
               value={name}
               placeholder={'Full Name'}
             />
           </View>
           <View style={{marginTop: 10}}>
             <CustomTextInput 
              onChangeText={txt => {
               setemail(txt);
            }}
            value={email}
            editable={false}
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
                editable={false}
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
            //  setOpen={setselectedJobOpen}
             setValue={setselectedJobValue}
             setItems={setselectedJobItems}
             placeholder='For Which Job are you applying?'
             placeholderStyle={{
               color: COLORS.grey,
               fontSize: FONTS_SIZE.h5,
               fontFamily: FONTS.regular
             }}
             textStyle={{color:'rgba(0,0,0,0.3)'}}
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
            value={dependant}
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
            
            onChangeText={txt => {
             StartsearchLocation(txt)
          }}
            value={address}
             placeholder={'Street Address'} />
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
           </View> */}

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
              value={zip}
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
             placeholder= {fileResponse ? fileResponse[0]?.name :DATA?.resume_file_name}
             rightView={
               <TouchableOpacity style={styless.btn} onPress={()=>{handleDocumentSelection()}}>
               <Text style={styless.txt}>Choose File</Text>
              </TouchableOpacity>
             }
             />
           </View>
          <Text style={{color:COLORS.Primary_Blue,fontSize:12,marginLeft:'8%',zIndex:-999}}>* pdf, doc, docx. file type are allowed</Text>

 {/*
          <View style={[styless.container,{zIndex:-999}]}>
        
           <View style={styless.textInputContainer}>
             <TextInput
              onChangeText={txt => {
               setlatter(txt);
              }}
              value={latter}
              multiline
              numberOfLines={4}
               placeholder="Accompanying Letter"
               style={styless.txtInput}
             />
           </View>
         
       </View>
           */}
            
           {/* <View style={{marginTop: 10}}>
             <CustomTextInput
              onChangeText={txt => {
               setpass(txt);
            }}
             value={pass}
             placeholder={'Create new password'} />
           </View>
           <View style={{marginTop: 10}}>
             <CustomTextInput
              onChangeText={txt => {
               setcpass(txt);
            }}
             value={cpass}
             placeholder={'Confirm password'} />
           </View>  */}
           <CustomButton
             title={'Update your account'}
             backgroundColor={COLORS.Primary_Green}
             onPress={() => {
               SignupPressed()
               
             }}
            
           />
           <View style={{width:100,height:200}} />
        
         </KeyboardAwareScrollView>
       </View>


: null }


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

       {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.SCREEN_WIDTH * 90 / 100, 
    borderRadius: 12, 
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginTop: 15,
    padding:10,
    paddingVertical:15
  },
  container2: {
    // backgroundColor: COLORS.Primary_Blue,
    // height: widthScale(120),
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthScale(0),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: widthScale(15),
  },
  headerText: {
    fontSize: FONTS_SIZE.h4,
    color: COLORS.Primary_Blue,
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
export default Profile