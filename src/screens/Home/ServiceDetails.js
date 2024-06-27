import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView, FlatList, Linking,
  TouchableOpacity, SafeAreaView, Alert, TextInput,Platform
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { Mycolors, dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import { baseUrl, country, state, city, home, feedback, update_service_item_status, update_status, submit_review, servic_details, requestGetApi, requestPostApi } from '../../WebApi/Service'
import COLORS from '../../global/Colors';
import MyHeader from '../../components/MyHeader';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import useKeyboard from '../../components/useKeyboard';

const axios = require('axios');
const ServiceDetails = (props) => {
  const [DATA2, setDATA2] = useState(
    [
      {
        id: '1',
        title: 'Dusting',
        title2: 'Rate your experience with this Service',
        title3: 'Service Pay period',
        title4: DATA?.service.frequency,
        img: require('../../assets/images/Icons/hdoler.png')
      },
      {
        id: '2',
        title: '4 Bathrooms',
        title2: 'Equipment',
        title3: 'Service Start Time',
        title4: DATA?.service.service_start_time,
        img: require('../../assets/images/Icons/hcclock.png')
      },
      {
        id: '3',
        title: '10 Offices',
        title2: 'Burnisher Clock Hours',
        title3: 'Service End Time',
        title4: DATA?.service.service_end_time,
        img: require('../../assets/images/Icons/hcclockk.png')
      },
      {
        id: '4',
        title: '1 Breakroom',
        title2: 'Supplies',
        title3: 'Total Worked Hours Till Now',
        title4: DATA?.service.total_duration,
        img: require('../../assets/images/Icons/hclock.png')
      },
      {
        id: '5',
        title: '1 ConferenceRoom',
        title2: 'Service Inspection',
        title3: 'This Week Hours Till Now',
        title4: '25.5',
        img: require('../../assets/images/Icons/hclock.png')
      },
    
    ])
  const [selected, setselected] = useState(true)
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details)
  const [DATA, setDATA] = useState(null)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [lod, setlod] = useState(false)
  const [rate, setrate] = useState(false)
  const [opendateModal, setopenDateModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateplace, setdateplace] = useState('')
  const [lode, setlode] = useState(true)
  const [opendateModal2, setopenDateModal2] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [dateplace2, setdateplace2] = useState('')
  const [myindex, setmyindex] = useState('0')
  const [myindex2, setmyindex2] = useState('0')
  const [serviceItems, setserviceItems] = useState([])
  const [viewrate, setviewrate]=useState(false)
  const [machinetype,setmachinetype]=useState(null)
  const [report,setreport]=useState(false)
  const [reportData,setreportData]=useState('')
  const [textedit,settextedit]=useState(true)
  const isKeyboardOpen = useKeyboard();
  useEffect(() => {
    service_Details()
  }, [])

  const service_Details = async (id) => {

    setLoading(true)
    let formdata = new FormData();
    formdata.append("service_id", props.route.params.data.service_id);
    const { responseJson, err } = await requestPostApi(servic_details, formdata, 'POST', user.token)
    setLoading(false)
    console.log('the res Ashish==>>', responseJson.data.ServicesItems)
    if (err == null) {
      if (responseJson.status) {
        setDATA(responseJson.data)
        // var sdata=[]
        // for(let i=0;i<responseJson.data.ServicesItems.length;i++){
        //   sdata.push({...responseJson.data.ServicesItems[i]})
        // }
        setserviceItems(responseJson.data.ServicesItems)
        setlod(!lod)
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }

  }

  const submit = async () => {

    let data = new FormData();

    for (let i = 0; i < serviceItems.length; i++) {
      data.append('service_id[]', DATA.service_id);
      data.append('rating[]', serviceItems[i].rate);
      data.append('service_item_id[]', serviceItems[i].id);
      data.append('review[]', serviceItems[i].comment);
    }

    setLoading(true)

    const { responseJson, err } = await requestPostApi(feedback, data, 'POST', user.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        service_Details()
        setrate(false)
        setalert_sms(responseJson.message)
        setMy_Alert(true)


      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const updateStatus = async (code) => {

    if (true) {
      const currentDate = new Date();
      var yy = currentDate.toString().substring(16, 21)
      var mt = convertTimeTo12HourFormat(yy)
      var dd=serviceDate2(currentDate)
      setLoading(true)
      let formdata = new FormData();
      formdata.append("status", code);
      formdata.append("service_id", DATA.service_id); 
      formdata.append("date", dd);
      formdata.append("time", mt);
      const { responseJson, err } = await requestPostApi(update_status, formdata, 'POST', user.token)
      setLoading(false)
      console.log('the home==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          service_Details('')
        } else {
          setalert_sms(responseJson.message)
          setMy_Alert(true)
        }
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    } else {
      // setalert_sms(responseJson.message)
      // setMy_Alert(true)
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
  
  const serviceDate2=(currentDate)=>{
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = dateformates(mm, dd, yy)
    var mydate2 = dateformates2(mm, dd, yy)
    return mydate2
  
  }


  const dialCall = (phoneNumber) => {
    console.log('numbers', phoneNumber);
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, '');
    const phoneNumberUrl = `tel:${phoneNumberWithoutSpaces}`;

    Linking.canOpenURL(phoneNumberUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneNumberUrl);
        } else {
          console.error("Don't know how to open URI: " + phoneNumberUrl);
        }
      })
      .catch((error) => console.error('An error occurred', error));

  };

  const sendEmail = (myMail) => {
    console.log('sendEmail email', myMail);
    Linking.openURL(`mailto:${myMail}`)
  }

  const openGoogleMaps = (lat, lan) => {
    const origin = '37.7749,-122.4194'; // Replace with the starting location (latitude,longitude)
    const destination = lat + ',' + lan;  //37.7749,-122.5113'// Replace with the destination location (latitude,longitude)
    const travelMode = 'driving'; // You can use 'walking', 'transit', or 'bicycling'
    //const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${travelMode}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${travelMode}`;
    // Linking.    'https://www.google.com/maps/dir/?api=1&destination=lat,long&dir_action=navigate')
    Linking.openURL(url);
  };
  const dateformates = (month, day, year) => {
    if (month == 'Jan') {
      return '01-' + day + '-' + year
    } else if (month == 'Feb') {
      return '02-' + day + '-' + year
    } else if (month == 'Mar') {
      return '03-' + day + '-' + year
    } else if (month == 'Apr') {
      return '04-' + day + '-' + year
    } else if (month == 'May') {
      return '05-' + day + '-' + year
    } else if (month == 'Jun') {
      return '06-' + day + '-' + year
    } else if (month == 'Jul') {
      return '07-' + day + '-' + year
    } else if (month == 'Aug') {
      return '08-' + day + '-' + year
    } else if (month == 'Sep') {
      return '09-' + day + '-' + year
    } else if (month == 'Oct') {
      return '10-' + day + '-' + year
    } else if (month == 'Nov') {
      return '11-' + day + '-' + year
    } else if (month == 'Dec') {
      return '12-' + day + '-' + year
    }
  }
  const convertTimeTo12HourFormat = (time24) => {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':');

    // Convert hours to 12-hour format
    let hours12 = parseInt(hours, 10) % 12;
    hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight (00:00)

    // Determine whether it's AM or PM
    const meridiem = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';

    // Return the time in 12-hour format
    return `${hours12}:${minutes} ${meridiem}`;
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if(Platform.OS=='android'){
      setopenDateModal(false)
    }
    setDate(currentDate);
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(16, 21)
    // console.log('====================================',currentDate.toString());
    // console.log(dd);
    // console.log('====================================',yy);
    // var mydate = dateformates(mm, dd, yy)
    var mt = convertTimeTo12HourFormat(yy)
    // setdateplace2(mt)
    console.log('====================================');
    console.log(mt);
    console.log('====================================');
    setdateplace(mt)
    setlode(!lode)
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
 
    if(Platform.OS=='android'){
      setopenDateModal2(false)
    }
    setDate2(currentDate);
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(16, 21)
    //var mydate = dateformates(mm, dd, yy)
    var mt = convertTimeTo12HourFormat(yy)
    setdateplace2(mt)
    setlode(!lode)
    if(Platform.OS=='android'){
      submitTime(currentDate)
    }
  };

  const submitTime = async (cdata) => {

    let data = new FormData();
    data.append('status', '4');
    data.append('service_id', DATA.service_id);
    data.append('service_item_id', myindex.id);
    data.append('start_time', date.toString().substring(16, 21));
    data.append('end_time',Platform.OS=='android'? cdata.toString().substring(16, 21) : date2.toString().substring(16, 21));
    if(machinetype!=null){
      data.append('machine_type', machinetype.name);
    }
    // details:''  [["status", "4"], ["service_id", 72], ["service_item_id", undefined], ["start_time", "04:30"], ["end_time", "19:00"], ["machine_type", "Scrubber"]]
                 //[["status", "4"], ["service_id", 72], ["service_item_id", undefined], ["start_time", "05:30"], ["end_time", "17:28"], ["machine_type", "Scrubber"]]
    console.log('====================================submit_Time');
    console.log(data);
    console.log('====================================');
    setLoading(true)


    const { responseJson, err } = await requestPostApi(update_service_item_status, data, 'POST', user.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
        service_Details()
        // console.log('====================================');
        // console.log(responseJson);
        // console.log('====================================');
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const submitReport = async () => {

    let data = new FormData();
    data.append('status', '4');
    data.append('service_id',DATA.service_id);
    data.append('service_item_id','0');
    data.append('start_time',null);
    data.append('end_time', null);
    data.append('details', reportData);
    data.append('machine_type', 'incident_report');
    
    setLoading(true)


    const { responseJson, err } = await requestPostApi(update_service_item_status, data, 'POST', user.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
        setreport(false)
        service_Details()
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }


const serviceDate=(currentDate)=>{
  var mm = currentDate.toString().substring(4, 7)
  var dd = currentDate.toString().substring(8, 10)
  var yy = currentDate.toString().substring(11, 15)
  var mydate = dateformates(mm, dd, yy)
  var mydate2 = dateformates2(mm, dd, yy)
  return mydate

}
  return (
    <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>

      <MyHeader title={'Service Details'} onPress={() => { props.navigation.goBack() }} onPress2={() => { props.navigation.navigate('Notification') }} />


      <View style={{ width: '96%', alignSelf: 'center' }}>

        <ScrollView>

          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>
            <View style={{ padding: 10, width: '95%', alignSelf: 'center', marginTop: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: 14, }}>Service Name:</Text>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: 14, marginLeft: 7 }}>{DATA?.service_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', alignSelf: 'center', marginTop: 8 }}>
                <Text style={{ color: '#000', fontWeight: '400', fontSize: 12, }}>Service Type:</Text>
                <Text style={{ color: '#426FB5', fontWeight: '500', fontSize: 14, marginLeft: 7 }}>{DATA?.service_type}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', alignSelf: 'center', marginTop: 8 }}>
                <Text style={{ color: '#000', fontWeight: '400', fontSize: 12, }}>Service Frequency:</Text>
                <Text style={{ color: '#426FB5', fontWeight: '500', fontSize: 14, marginLeft: 7 }}>{DATA?.service_frequency}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', alignSelf: 'center', marginTop: 8 }}>
                <Text style={{ color: '#000', fontWeight: '400', fontSize: 12, }}>Service Status:</Text>
                <Text style={{ color: '#426FB5', fontWeight: '500', fontSize: 14, marginLeft: 7 }}>{DATA?.status}</Text>
              </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

            <View style={{ padding: 10, }}>

              <View style={{}}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>{DATA?.clientname}</Text>
                  </View>



                </View>

              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginTop: 10 }} />
              <View style={{ marginTop: 10, }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                    <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hlocation.png')} />
                    <Text style={{ color: 'gray', fontWeight: '500', fontSize: 11, left: 3, lineHeight: 16 }}>{DATA?.address}</Text>
                  </View>

                  <TouchableOpacity style={{ width: 100, height: 30, borderRadius: 15, backgroundColor: '#7BC043', justifyContent: 'center', }}
                    onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${DATA?.service?.service_latlng}&dir_action=navigate`) }}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13, alignSelf: 'center' }}>Navigate</Text>
                  </TouchableOpacity>

                </View>
              </View>


              <ImageBackground style={{ width: 125, height: 15, resizeMode: 'stretch', justifyContent: 'center', marginTop: 10 }} source={require('../../assets/images/Icons/stripIcon.png')}>
                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 10, alignSelf: 'center' }}>Status: {DATA?.status}</Text>
              </ImageBackground>
              <View style={{ position: 'absolute', right: 10, top: 10 }}>
                <Image style={{ width: 20, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hl.png')} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                <TouchableOpacity style={{}} onPress={() => {

                  if(serviceDate(new Date())==props.route.params?.selectedDate && DATA?.on_the_way_time== '' && DATA.status != 'Finish'){
                    updateStatus('2')
                  }
                }}>
                  <View style={{ alignItems: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={DATA?.on_the_way_time != '' ? require('../../assets/images/Icons/hc.png') : require('../../assets/images/Icons/hc2.png')} />
                    <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', }} />
                  </View>
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>On the way</Text>
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5, left: 5 }}>{DATA?.on_the_way_time != '' ? DATA?.on_the_way_time : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                  if(serviceDate(new Date())==props.route.params?.selectedDate && DATA?.start_time== '' && DATA.status != 'Finish' && DATA?.on_the_way_time!= ''){
                    updateStatus('3')
                  }
                }}>
                  <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={DATA?.start_time != '' ? require('../../assets/images/Icons/hp.png') : require('../../assets/images/Icons/hp2.png')} />
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Start</Text>
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{DATA?.start_time != '' ? DATA?.start_time : ' '}</Text>
                </TouchableOpacity>
                <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', top: -20 }} />
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                  if(serviceDate(new Date())==props.route.params?.selectedDate && DATA?.finish_time== '' && DATA.status != 'Finish' && DATA?.start_time!= '' && DATA?.on_the_way_time!= ''){
                    updateStatus('4')
                  }
                }}>
                  <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={DATA?.finish_time != '' ? require('../../assets/images/Icons/hf.png') : require('../../assets/images/Icons/hf2.png')} />
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Finish</Text>
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{DATA?.finish_time != '' ? DATA?.finish_time : ' '}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ImageBackground style={{ width: '100%', height: 150, resizeMode: 'stretch', justifyContent: 'center', marginTop: 5 }} source={{ uri: DATA?.service_image }}>
              <ImageBackground style={{ height: 15, resizeMode: 'stretch', justifyContent: 'center', position: 'absolute', bottom: 5, paddingLeft: 8, paddingRight: 15 }} source={require('../../assets/images/Icons/strip.png')}>
                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 10, alignSelf: 'center' }}>{DATA?.service_name}</Text>
              </ImageBackground>
            </ImageBackground>
            <View style={{ padding: 10, }}>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                  <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>{DATA?.admin_name}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => {
                    sendEmail(DATA?.clientemail)
                    // setalert_sms(DATA?.clientemail)
                    // setMy_Alert(true)
                  }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hsms.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    props.navigation.navigate('ChatDetails', { data: { service_id: DATA.service_id } })
                  }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', marginHorizontal: 7 }} source={require('../../assets/images/Icons/hchat.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    dialCall(DATA?.clientphone)
                    // setalert_sms(DATA?.clientphone)
                    // setMy_Alert(true)
                  }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hcall.png')} />
                  </TouchableOpacity>
                </View>

              </View>

            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1' }} />

          </View>

          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>
            <View style={{ width: '90%', alignSelf: 'center', height: 40, flexDirection: 'row', justifyContent: 'space-between', borderColor: selected ? Mycolors.AppGreen : Mycolors.RED, borderWidth: 1, borderRadius: 30, marginTop: 20, alignItems: 'center' }}>
              <TouchableOpacity style={{ width: '48%', height: 30, borderRadius: 20, backgroundColor: selected ? Mycolors.AppGreen : 'transparent', justifyContent: 'center', marginLeft: 5 }} onPress={() => { setselected(true) }}>
                <Text style={{ color: selected ? '#fff' : '#000', textAlign: 'center', fontWeight: '600', fontSize: 12 }}>In Scope</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '48%', height: 30, borderRadius: 20, backgroundColor: !selected ? Mycolors.RED : 'transparent', justifyContent: 'center', marginRight: 5 }} onPress={() => { setselected(false) }}>
                <Text style={{ color: !selected ? '#fff' : '#000', textAlign: 'center', fontWeight: '600', fontSize: 12 }}>Out Of Scope</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <FlatList
                data={selected ? DATA?.inscope : DATA?.OutScope}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center' }}>
                        <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: '#000' }} />
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginLeft: 13 }}>{item.name}</Text>
                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                    </>

                  )
                }} />
            </View>
          </View>

          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>

            <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <TouchableOpacity style={{ width: '40%', height: 30, alignItems: 'center', flexDirection: 'row', left: 30, top: -5 }} onPress={() => { }}>
                <Image style={{ width: 35, height: 35, resizeMode: 'stretch', alignSelf: 'center', }} source={require('../../assets/images/Icons/calendra.png')} />
                <Text style={{ color: '#000', textAlign: 'center', fontWeight: '600', fontSize: 14, left: 4 }}>Scheduled</Text>
              </TouchableOpacity>
              {/* <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{width:60,height:30,borderRadius:20,backgroundColor:'transparent',justifyContent: 'center',marginRight:5,borderColor:Mycolors.AppGreen,borderWidth:1}} onPress={()=>{}}>
              <Text style={{color:Mycolors.AppGreen,textAlign:'center',fontWeight:'600',fontSize:12}}>Edit</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={{width:50,height:50,marginRight:5,top:-10}} onPress={()=>{}}>
              <Image style={{ width: 50, height: 50, resizeMode: 'stretch',alignSelf:'center',}} source={require('../../assets/images/Icons/hcuti.png')} />
              </TouchableOpacity>
            </View> */}

            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginBottom: 10, marginTop: 5 }} />
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#000', fontSize: 12 }}>From:</Text>
              <Text style={{ color: COLORS.Primary_Blue, fontSize: 14, fontWeight: '600' }}>{DATA?.scheduled_list?.from.date}</Text>
              <Text style={{ color: COLORS.Primary_Blue, fontSize: 14, fontWeight: '600' }}>{DATA?.scheduled_list?.from.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ color: '#000', fontSize: 12 }}>To:      </Text>
              <Text style={{ color: COLORS.Primary_Blue, fontSize: 14, fontWeight: '600' }}>{DATA?.scheduled_list?.to.date}</Text>
              <Text style={{ color: COLORS.Primary_Blue, fontSize: 14, fontWeight: '600' }}>{DATA?.scheduled_list?.to.time}</Text>
            </View>
            {/* <View style={{width:'100%',height:1,backgroundColor:'#E7EAF1',marginBottom:5,marginTop:10}} />
                                   <Text style={{color:'gray',fontSize:13,marginLeft:'8%',marginVertical:8}}>Plan to arrive between 02:00 PM - 02:00 PM</Text> */}
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginBottom: 5, marginTop: 10 }} />

            <View style={{ marginTop: 10 }}>
              <FlatList
                data={DATA?.scheduled_list?.list}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ flexDirection: 'row', width: '95%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: COLORS.Primary_Blue, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>{item.name.substring(0, 1)}</Text>
                          </View>
                          <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, marginLeft: 13 }}>{item.name}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', }}>
                          <TouchableOpacity>
                            {/* <Image style={{width:25,height:25,resizeMode:'stretch'}} source={require('../../assets/images/Icons/hchat.png')}></Image> */}
                          </TouchableOpacity>
                          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
                            dialCall(item.phone)
                          }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'stretch' }} source={require('../../assets/images/Icons/hcall.png')}></Image>
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                    </>

                  )
                }} />
            </View>





          </View>
          {/**********************Service Items************************ */}
          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>

            <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <TouchableOpacity style={{ width: '40%', height: 30, justifyContent: 'center', }} onPress={() => { }}>
                <Text style={{ color: '#000', textAlign: 'center', fontWeight: '600', fontSize: 14 }}>Service Items</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                {/* <TouchableOpacity style={{width:100,height:30,borderRadius:20,backgroundColor:'transparent',justifyContent: 'center',marginRight:5,borderColor:Mycolors.AppGreen,borderWidth:1}} onPress={()=>{}}>
              <Text style={{color:Mycolors.AppGreen,textAlign:'center',fontWeight:'600',fontSize:12}}>+ Add item</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={{width:50,height:50,marginRight:5,top:-10}} onPress={()=>{}}>
              <Image style={{ width: 50, height: 50, resizeMode: 'stretch',alignSelf:'center',}} source={require('../../assets/images/Icons/hcuti.png')} />
              </TouchableOpacity>*/}
              </View>

            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginBottom: 10, marginTop: 5 }} />
            {/* <View style={{flexDirection:'row',width:'90%',alignItems:'center',paddingHorizontal:10,alignSelf:'center'}}>
                                    <Text style={{color:'gray',fontWeight:'500',fontSize:12,marginLeft:13}}>SERVICES</Text>
                                  </View> 
                                   <View style={{width:'100%',height:1,backgroundColor:'#E7EAF1',marginBottom:5,marginTop:10}} />
                                    */}

            <View style={{ marginTop: 0 }}>
              <FlatList
                data={DATA?.ServicesItems}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                          <View style={{ width: 6, height: 6, borderRadius: 5, backgroundColor: '#000' }}></View>
                          <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginLeft: 13 }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Image style={{ width: 15, height: 15, resizeMode: 'stretch', marginHorizontal: 3 }} source={require('../../assets/images/Icons/clock.png')} />
                          <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 12, alignSelf: 'flex-end' }}
                            onPress={() => {
                              setmachinetype(null)
                              setopenDateModal(true)
                              setmyindex(item)
                            }}>
                            {item.start_time && myindex == item ? dateplace : item.start_time && myindex != item ? item.start_time : dateplace != '' && myindex == item ? dateplace : 'Start Time'}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image style={{ width: 15, height: 15, resizeMode: 'stretch', marginHorizontal: 3, top: 2 }} source={require('../../assets/images/Icons/clock.png')} />
                          <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 12, alignSelf: 'flex-end', marginTop: 5 }}
                            onPress={() => {
                              setmachinetype(null)
                              setopenDateModal2(true)
                              setmyindex2(item)
                            }}>
                            {item.end_time && myindex2 == item ? dateplace2 : item.end_time && myindex2 != item ? item.end_time : dateplace2 != '' && myindex2 == item ? dateplace2 : 'End Time'}
                            {/* {dateplace2!=''? dateplace2 : 'Select End Time'} */}
                          </Text>
                        </View>

                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                    </>

                  )
                }} />
             
             
            </View>

                        {/* <View style={{flexDirection:'row',width:'90%',alignItems:'center',paddingHorizontal:10,alignSelf:'center',justifyContent:'space-between',marginBottom:20,marginTop:5}}>
                                      <Text style={{color:'#000',fontWeight:'500',fontSize:12,marginLeft:13}}>TOTAL</Text>
                                    <Text style={{color:Mycolors.BlueText,fontWeight:'700',fontSize:12,marginLeft:13}}>{DATA?.total}</Text>
                                  </View> */}

          </View>
          {/***********************Machin Parts********** */}
          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>

            <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <TouchableOpacity style={{ width: '40%', height: 30, justifyContent: 'center', }} onPress={() => { }}>
                <Text style={{ color: '#000', textAlign: 'center', fontWeight: '600', fontSize: 14 }}>Machine Parts</Text>
              </TouchableOpacity>
           
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginBottom: 10, marginTop: 5 }} />
          
            <View style={{ marginTop: 0 }}>
              <FlatList
                data={DATA?.machine_type}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                          <View style={{ width: 6, height: 6, borderRadius: 5, backgroundColor: '#000' }}></View>
                          <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginLeft: 13 }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Image style={{ width: 15, height: 15, resizeMode: 'stretch', marginHorizontal: 3 }} source={require('../../assets/images/Icons/clock.png')} />
                          <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 12, alignSelf: 'flex-end' }}
                            onPress={() => {
                              setmachinetype(item)
                              setopenDateModal(true)
                              setmyindex(item)
                            }}>
                            {item.start_time && myindex == item ? dateplace : item.start_time && myindex != item ? item.start_time : dateplace != '' && myindex == item ? dateplace : 'Start Time'}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image style={{ width: 15, height: 15, resizeMode: 'stretch', marginHorizontal: 3, top: 2 }} source={require('../../assets/images/Icons/clock.png')} />
                          <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 12, alignSelf: 'flex-end', marginTop: 5 }}
                            onPress={() => {
                              setmachinetype(item)
                              setopenDateModal2(true)
                              setmyindex2(item)
                            }}>
                            {item.end_time && myindex2 == item ? dateplace2 : item.end_time && myindex2 != item ? item.end_time : dateplace2 != '' && myindex2 == item ? dateplace2 : 'End Time'}
                            {/* {dateplace2!=''? dateplace2 : 'Select End Time'} */}
                          </Text>
                        </View>

                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                    </>

                  )
                }} />
             
            </View>

          </View>
          {/****************Rate Your Exp***************** */}
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.Primary_Green, marginTop: 10, width: '45%', borderRadius: 10,}}
            onPress={() => { 
              if(DATA?.rating_submitted){
              setviewrate(true)
              } else{
                setrate(true)
              }
               }}>
            <Text style={{ fontSize: 13, color: '#fff', textAlign: 'center' }}>{DATA?.rating_submitted ? 'View Your Rating' :'Rate your experience'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: COLORS.Primary_Green, marginTop: 10, width: '45%', borderRadius: 10,}}
            onPress={() => { 
              setreport(true)
              if(DATA?.incident_report?.details!=''){
              setreportData(DATA?.incident_report?.details)
              settextedit(false)
              } 
               }}>
            <Text style={{ fontSize: 13, color: '#fff', textAlign: 'center' }}>{DATA?.incident_report?.details!=''? 'View Incident Report':'Submit Incident Report'}</Text>
          </TouchableOpacity>
          </View>
          

          {/* **************Bottum fletList***************** */}
          <View style={{ marginTop: 10 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA2}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <View style={{ padding: 16, backgroundColor: index == 4 ? Mycolors.AppGreen : '#fff', marginHorizontal: 5, borderRadius: 7 }}>
                      <Image style={{ width: 25, height: 25, resizeMode: 'stretch', backgroundColor: '#fff', borderRadius: 13, }} source={item.img} />
                      <Text style={{ color: index == 4 ? '#fff' : '#000', fontWeight: '400', fontSize: 11, marginTop: 4 }}>{item.title3}</Text>
                      <Text style={{ color: index == 2 ? 'red' : index == 4 ? '#fff' : '#000', fontWeight: '700', fontSize: 14, marginTop: 7 }}>{index == 0 ? DATA?.service.frequency : index == 1 ? DATA?.service.service_start_time : index == 2 ? DATA?.service.service_end_time : index == 3 ? DATA?.service.total_duration : DATA?.service.total_duration}</Text>
                    </View>
                    {index == 4 ?
                      <View style={{ position: 'absolute', right: -10, marginTop: 40 }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('TimeCard', { data: DATA, from: 'ServiceDetail' }) }}>
                          <Image style={{ width: 30, height: 30, resizeMode: 'stretch', backgroundColor: '#fff', borderRadius: 20, }} source={require('../../assets/images/Icons/hleftArrow.png')} />
                        </TouchableOpacity>
                      </View> : null}

                  </>

                )
              }} />
          </View>


          <View style={{ width: 100, height: 300 }} />
        </ScrollView>

      </View>
       {/* **************Calender Picket for Time ***************** */}
          {opendateModal ?
                <View style={{position:'absolute',zIndex:999,bottom:5,alignSelf:'center',backgroundColor:'#fff',width:'100%'}}>
                  <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => { setopenDateModal(false) }}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setopenDateModal(false) }}>
                      <Text>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker

                    testID="dateTimePicker"
                    value={date}
                    //timeZoneName={'IST'}
                    mode="time"
                    is24Hour={false}
                    // maximumDate={new Date()}
                    display="spinner"
                    onChange={onChange}
                  />
                </View>

                : null}
                 {opendateModal2 ?
            <View style={{position:'absolute',zIndex:999,bottom:5,alignSelf:'center',backgroundColor:'#fff',width:'100%'}}>

                  <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => { setopenDateModal2(false) }}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      submitTime('')
                      setopenDateModal2(false)
                    }}>
                      <Text>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    // testID="dateTimePicker"
                    value={date2}
                    mode="time"
                    is24Hour={false}
                    // maximumDate={new Date()}
                    display="spinner"
                    onChange={onChange2}
                  />
                </View>

                : null}
      {/* **************rating section***************** */}
      {rate ?
        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
          <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 80 / 100, backgroundColor: '#fff', position: 'absolute', bottom: 0, alignSelf: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 20 }}>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text></Text>
              <Text style={{ fontSize: 20, color: Mycolors.AppBlue, fontWeight: 'bold', left: 10 }}>Submit Feedback</Text>
              <TouchableOpacity style={{ width: 50, height: 50, marginRight: 5, top: -10, }} onPress={() => { setrate(false) }}>
                <Image style={{ width: 50, height: 50, resizeMode: 'stretch', alignSelf: 'center', }} source={require('../../assets/images/Icons/hcuti.png')} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{zIndex:999}}>
              <View style={{
                width: '98%', borderRadius: 7, alignSelf: 'center',
                backgroundColor: '#fff',
              }}>
                {/* ******************************** */}
                <FlatList
                  data={serviceItems}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <View style={{ width: '98%', borderRadius: 7, alignSelf: 'center', paddingVertical: 15, backgroundColor: '#fff', }}>
                          <Text style={{ fontSize: 13, color: Mycolors.AppBlue, marginLeft: 15, }}>Rate your experience with {item.name}</Text>
                          <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: '85%', alignSelf: 'center' }}>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '1' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                                serviceItems[index].rate = 1
                                setlod(!lod)
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/imojeered.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '1' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Bad</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '2' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                                serviceItems[index].rate = 2
                                setlod(!lod)
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/fair.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '2' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Fair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '3' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                                serviceItems[index].rate = 3
                                setlod(!lod)
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/boximojee.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '3' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Good</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ width: '90%', height: 40, borderRadius: 12, borderWidth: 2, borderColor: '#E7EAF1', alignSelf: 'center', marginTop: 10, justifyContent: 'center', }}>
                            <TextInput
                              placeholder={serviceItems[index].comment != '' ? serviceItems[index].comment : "Type your comment"}
                              placeholderTextColor={serviceItems[index].comment != '' ? '#000' : "gray"}
                              // value={serviceItems[index].comment}
                              onChangeText={(tex) => {
                                serviceItems[index].comment = tex
                              }}
                              style={{ fontSize: 14, paddingLeft: 15 }}
                            />
                          </View>
                        </View>
                      </>
                    )
                  }}
                />
                {/* ******************************** */}
              
                <CustomButton
                  title={'Submit'}
                  backgroundColor={COLORS.Primary_Green}
                  onPress={() => { submit() }}
                />
               
              </View>
              <View style={{ width: 100, height:isKeyboardOpen? 430:100}} />
            </ScrollView>
          </View>
        </View>
        : null}
 {/* **************View rating section***************** */}
        {viewrate ?
        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
          <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 80 / 100, backgroundColor: '#fff', position: 'absolute', bottom: 0, alignSelf: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text></Text>
              <Text style={{ fontSize: 20, color: Mycolors.AppBlue, fontWeight: 'bold', left: 10 }}>Submitted Feedback</Text>
              <TouchableOpacity style={{ width: 50, height: 50, marginRight: 5, top: -10, }} onPress={() => { setviewrate(false) }}>
                <Image style={{ width: 50, height: 50, resizeMode: 'stretch', alignSelf: 'center', }} source={require('../../assets/images/Icons/hcuti.png')} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={{
                width: '98%', borderRadius: 7, alignSelf: 'center',
                backgroundColor: '#fff',
              }}>
                {/* ******************************** */}
                <FlatList
                  data={serviceItems}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                      { item.rate!=0 ?
                        <View style={{ width: '98%', borderRadius: 7, alignSelf: 'center', paddingVertical: 15, backgroundColor: '#fff', }}>
                          <Text style={{ fontSize: 13, color: Mycolors.AppBlue, marginLeft: 15, }}>Your experience with {item.name}</Text>
                          <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: '85%', alignSelf: 'center' }}>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '1' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/imojeered.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '1' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Bad</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '2' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/fair.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '2' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Fair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 65, height: 65, backgroundColor: item.rate == '3' ? Mycolors.AppGreen : 'transparent', justifyContent: "center", borderRadius: 10 }}
                              onPress={() => {
                              }}>
                              <Image style={{ width: 40, height: 40, alignSelf: "center" }} source={require("../../assets/images/Icons/boximojee.png")} ></Image>
                              <Text style={{ fontSize: 13, color: item.rate == '3' ? '#fff' : '#000', textAlign: "center", fontWeight: '600' }}>Good</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ width: '90%', height: 40, borderRadius: 12, borderWidth: 2, borderColor: '#E7EAF1', alignSelf: 'center', marginTop: 10, justifyContent: 'center', }}>
                           
                            <Text style={{ fontSize: 14, paddingLeft: 15 }}>{item.comment}</Text>
                          </View>
                        </View>
                         : null}
                      </>
                    )
                  }}
                />
                {/* ******************************** */}
               {!DATA?.rating_submitted ?
                <CustomButton
                  title={'Submit'}
                  backgroundColor={COLORS.Primary_Green}
                  onPress={() => { submit() }}
                />
                : null
                }

              </View>
              <View style={{ width: 100, height: 100 }} />
            </ScrollView>
          </View>
        </View>
        : null}
{/* **************Report section***************** */}
{report ?
        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
          <View style={{ width: '100%', height:isKeyboardOpen? dimensions.SCREEN_HEIGHT * 70 / 100:dimensions.SCREEN_HEIGHT * 40 / 100, backgroundColor: '#fff', position: 'absolute', bottom: 0, alignSelf: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text></Text>
              <Text style={{ fontSize: 20, color: Mycolors.AppBlue, fontWeight: 'bold', left: 10 }}>{textedit? 'Submit Incident Report' :'Submitted Incident Report'}</Text>
              <TouchableOpacity style={{ width: 50, height: 50, marginRight: 5, top: -10, }} onPress={() => { setreport(false) }}>
                <Image style={{ width: 50, height: 50, resizeMode: 'stretch', alignSelf: 'center', }} source={require('../../assets/images/Icons/hcuti.png')} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={{
                width: '98%', borderRadius: 7, alignSelf: 'center',
                backgroundColor: '#fff',
              }}>
                 <View style={{marginTop: 20}}>
                 <CustomTextInput
                 value={reportData}
              onChangeText={txt => {
                setreportData(txt);
              }}
              placeholder={'Enter Incident Report'}
              editable={textedit}
            />
          </View>
              {textedit ? 
                <CustomButton
                  title={'Submit'}
                  backgroundColor={COLORS.Primary_Green}
                  onPress={() => { submitReport() }}
                />
               :null}
              </View>
              <View style={{ width: 100, height: 100 }} />
            </ScrollView>
          </View>
        </View>
        : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  )
}

export default ServiceDetails