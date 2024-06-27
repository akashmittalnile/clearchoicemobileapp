import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView, FlatList,
  TouchableOpacity, SafeAreaView, Linking, Platform
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { Mycolors, dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import Datepicker from '../../components/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl, country, DateOfWeek, city, update_status, home, update_profile, register, requestGetApi, requestPostApi } from '../../WebApi/Service'
import COLORS from '../../global/Colors';

const ServiceandSchedule = (props) => {
  const [DATA2, setDATA2] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const [click1, setclick1] = useState('Mon')
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details)
  const [DATA, setDATA] = useState(null)
  const [edit, setedit] = useState(false)
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [lod, setlod] = useState(false)
  const [opendateModal, setopenDateModal] = useState(false);
  const [lode, setlode] = useState(true)
  const [date, setDate] = useState(new Date());
  const [displaydate, setdisplaydate] = useState('Choose Date')
  const [filter, setfilter] = useState(true)
  const [assignedcount,setassignedcount]=useState(0)
  const [completedcount,setcompletedcount]=useState(0)

  useEffect(() => {
    var md=serviceDate(new Date())
   // setdisplaydate(md)
    getHome('', 'clear',false)
    getdates()
  }, [])
  const dateformates2 = (month, day, year) => {
    if (month == 'Jan') {
      return year + '-01-' + day
    } else if (month == 'Feb') {
      return year + '-02-' + day
    } else if (month == 'Mar') {
      return year + '-03-' + day
    } else if (month == 'Apr') {
      return year + '-04-' + day
    } else if (month == 'May') {
      return year + '-05-' + day
    } else if (month == 'Jun') {
      return year + '-06-' + day
    } else if (month == 'Jul') {
      return year + '-07-' + day
    } else if (month == 'Aug') {
      return year + '-08-' + day
    } else if (month == 'Sep') {
      return year + '-09-' + day
    } else if (month == 'Oct') {
      return year + '-10-' + day
    } else if (month == 'Nov') {
      return year + '-11-' + day
    } else if (month == 'Dec') {
      return year + '-12-' + day
    }
  }
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
  const monthformates = (month) => {

    if (month == '01') {
      return 'Jan'
    } else if (month == '02') {
      return 'Feb'
    } else if (month == '03') {
      return 'Mar'
    } else if (month == '04') {
      return 'Apr'
    } else if (month == '05') {
      return 'May'
    } else if (month == '06') {
      return 'Jun'
    } else if (month == '07') {
      return 'Jul'
    } else if (month == '08') {
      return 'Aug'
    } else if (month == '09') {
      return 'Sep'
    } else if (month == '10') {
      return 'Oct'
    } else if (month == '11') {
      return 'Nov'
    } else if (month == '12') {
      return 'Dec'
    }
  }
  const getHome = async (dat, withs,type) => {
    setLoading(true)
    var mm = dat.toString().substring(4, 7)
    var dd = dat.toString().substring(8, 10)
    var yy = dat.toString().substring(11, 15)
    var mydate2 = dateformates2(mm, dd, yy)
    console.log('============mydate2========================', mydate2);

    let formdata = new FormData();
    formdata.append("date", withs == 'date' ? mydate2 : '');
   // formdata.append("finish", type);
   
    // formdata.append("date", ' ');
    const { responseJson, err } = await requestPostApi(home, formdata, 'POST', user.token)
    setLoading(false)
    console.log('the home==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        setDATA(responseJson.data)
        setassignedcount(assignedcount+1) 
        var assigncount=0
        var completedcount=0
        responseJson.data.map((item)=>{
          if(item.status != 'Finish'){
            assigncount=assigncount+1
          }else
          {
            completedcount=completedcount+1
          }
        })
       setassignedcount(assigncount)
       setcompletedcount(completedcount)
        
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
  const updateStatus = async (item, code) => {

    if (true) {
      const currentDate = new Date();
      var yy = currentDate.toString().substring(16, 21)
      var mt = convertTimeTo12HourFormat(yy)
      var dd=serviceDate2(currentDate)
      setLoading(true)
      let formdata = new FormData();
      formdata.append("status", code);
      formdata.append("service_id", item.service_id); //status_id
      formdata.append("date", dd);
      formdata.append("time", mt);

      const { responseJson, err } = await requestPostApi(update_status, formdata, 'POST', user.token)
      setLoading(false)
      console.log('the home==>>', responseJson)
      if (err == null) {
        if (responseJson.status) {
          getHome('', 'clear',false)
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

  const getdates = async () => {
    setLoading(true)
    // let formdata = new FormData();
    // formdata.append("fullname", name);
    const { responseJson, err } = await requestGetApi(DateOfWeek, '', 'GET', user.token)
    setLoading(false)
    console.log('the country==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        setDATA2(responseJson.data)
        setclick1(responseJson.data[0])
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

    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = dateformates(mm, dd, yy)
    setdisplaydate(mydate)

    setDate(currentDate)
    //setopenDateModal(false)
    setlode(!lode)
    if(Platform.OS=='android'){
      if(filter){
        getHome(currentDate, 'date',false)
      }else{
        getHome(currentDate, 'date',true)
      }
    }
  };

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
  const serviceDate=(currentDate)=>{
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = dateformates(mm, dd, yy)
    var mydate2 = dateformates2(mm, dd, yy)
    return mydate
  
  }
  const serviceDate2=(currentDate)=>{
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = dateformates(mm, dd, yy)
    var mydate2 = dateformates2(mm, dd, yy)
    return mydate2
  
  }
  return (

    <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>

      <HomeHeaderComponent icon1={require('../../assets/images/Icons/firstline2.png')} press1={() => { props.navigation.openDrawer() }} press2={() => { props.navigation.navigate('Notification') }} />
      <View style={{ width: '96%', alignSelf: 'center' }}>
        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginTop: 15 }}>
          <TouchableOpacity style={{
            width: '47%', height: 35, backgroundColor: filter ? COLORS.Primary_Green : '#fff', borderRadius: 15, justifyContent: 'center',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
          }} onPress={() => { 
            setfilter(true) 
            getHome('', 'clear',false)
            setclick1(DATA2[0])
            setdisplaydate('Choose Date')
            }}>
            <Text style={{ color: filter ? '#fff' : '#000', fontWeight: '500', fontSize: 13, textAlign: 'center' }}>Assigned Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            width: '47%', height: 35, backgroundColor: filter ? '#fff' : COLORS.Primary_Green, borderRadius: 15, justifyContent: 'center', shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
          }} onPress={() => { 
            setfilter(false)
            getHome('', 'clear',true)
            setclick1(DATA2[0])
            setdisplaydate('Choose Date')
            }}>
            <Text style={{ color: filter ? '#000' : '#fff', fontWeight: '500', fontSize: 12, textAlign: 'center' }}>Completed Services</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: '82%', height: 50, backgroundColor: '#fff', borderRadius: 10, marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', fontWeight: '300' }}>{displaydate}</Text>
            <TouchableOpacity onPress={() => { setopenDateModal(true) }}>
              <Image source={require('../../assets/images/Icons/calendra.png')} style={{ height: 25, width: 25, resizeMode: 'stretch', alignSelf: 'center' }}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ width: 60, height: 50, backgroundColor: COLORS.Primary_Green, justifyContent: 'center', borderRadius: 10, marginTop: 15 }}
            onPress={() => {
              if(filter){
                getHome('', 'clear',false)
              }else{
                getHome('', 'clear',true)
              }
              setclick1(DATA2[0])
              setdisplaydate('Choose Date')
            }}>
            <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {DATA?.length > 0 ?
            <View style={{ marginTop: 10 }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      {item.status != 'Finish' && filter == true ?
                       <TouchableOpacity style={{
                          width: dimensions.SCREEN_WIDTH * 95 / 100, borderRadius: 7, alignSelf: 'center',
                          backgroundColor: '#fff',
                          shadowColor: '#000',
                          shadowRadius: 2,
                          shadowOpacity: 0.2,
                          elevation: 3,
                          marginTop: 20,
                        }} onPress={() => { props.navigation.navigate('ServiceDetails', { data: item ,selectedDate:displaydate}) }}>
                          <View style={{ padding: 10, }}>

                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>{item?.clientname}</Text>
                              </View>
                            </View>
                            {/* <View style={{flexDirection:'row',alignItems:'center',width:'100%',alignSelf:'center',left:5}}>
                            <Text style={{color:'#000',fontWeight:'500',fontSize:11,lineHeight:16}}>Service Scheduled :- </Text>
                            <Text style={{color:'gray',fontWeight:'500',fontSize:11,lineHeight:16}}>{displaydate=='Choose Date'? item.serviceScheduleEndDate :displaydate} from {item.service_start_time} to {item.service_end_time}</Text>
                            </View> */}
                            <View style={{ marginTop: 10 }}>
                              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                                  <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hlocation.png')} />
                                  <Text style={{ color: 'gray', fontWeight: '500', fontSize: 11, left: 3, lineHeight: 16 }}>{item?.address}</Text>
                                </View>
                                <TouchableOpacity style={{ width: 100, height: 30, borderRadius: 15, backgroundColor: '#7BC043', justifyContent: 'center', }}
                                  onPress={() => { openGoogleMaps(item.lat, item.long) }}>
                                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13, alignSelf: 'center' }}>Navigate</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <ImageBackground style={{ width: 125, height: 15, resizeMode: 'stretch', justifyContent: 'center', marginTop: 10 }} source={require('../../assets/images/Icons/stripIcon.png')}>
                              <Text style={{ color: '#fff', fontWeight: '500', fontSize: 10, alignSelf: 'center' }}>Status: {item?.status}</Text>
                            </ImageBackground>
                            <View style={{ position: 'absolute', right: 10, top: 10 }}>
                              <Image style={{ width: 20, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hl.png')} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                              <TouchableOpacity style={{}} onPress={() => { 
                                 if(item.on_the_way_time== ''){
                                  updateStatus(item,'2')
                                }
                               
                                }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                  <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.on_the_way_time != '' ? require('../../assets/images/Icons/hc.png') : require('../../assets/images/Icons/hc2.png')} />
                                  <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', }} />
                                </View>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>On the way</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5, left: 5 }}>{item.on_the_way_time != '' ? item.on_the_way_time : ''}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                 if(item.start_time== '' && item.on_the_way_time!= '' ){
                                  updateStatus(item,'3')
                                } 
                               
                                 }}>
                                <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.start_time != '' ? require('../../assets/images/Icons/hp.png') : require('../../assets/images/Icons/hp2.png')} />
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Start</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{item.start_time != '' ? item.start_time : ' '}</Text>
                              </TouchableOpacity>
                              <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', top: -20 }} />
                              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { 
                                 if(item.finish_time== '' && item.start_time!= '' && item.on_the_way_time!= ''){
                                  updateStatus(item,'4')
                                }
                                }}>
                                <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.finish_time != '' ? require('../../assets/images/Icons/hf.png') : require('../../assets/images/Icons/hf2.png')} />
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Finish</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{item.finish_time != '' ? item.finish_time : ' '}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          <ImageBackground style={{ width: '100%', height: 150, resizeMode: 'stretch', justifyContent: 'center', marginTop: 5 }} source={{ uri: item?.service_image }}>
                            {/* <ImageBackground style={{height:15,resizeMode:'stretch',justifyContent: 'center',position:'absolute',bottom:5,paddingLeft:8,paddingRight:15}} source={require('../../assets/images/Icons/strip.png')}>
                      <Text style={{color:'#fff',fontWeight:'500',fontSize:10,alignSelf:'center'}}>{item.service_name}</Text>
                      </ImageBackground>  */}
                          </ImageBackground>
                          <View style={{ padding: 10, }}>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>Service Name:- {item?.service_name}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                  sendEmail(item.clientemail)
                                  // setalert_sms(item.clientemail)
                                  // setMy_Alert(true)
                                }}>
                                  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hsms.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                  props.navigation.navigate('ChatDetails', { data: { service_id: item.service_id } })
                                }}>
                                  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', marginHorizontal: 7 }} source={require('../../assets/images/Icons/hchat.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                  dialCall(item.clientphone)
                                  // setalert_sms(item.clientphone)
                                  // setMy_Alert(true)
                                }}>
                                  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hcall.png')} />
                                </TouchableOpacity>
                              </View>

                            </View>

                          </View>
                          <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1' }} />

                        </TouchableOpacity>
                       
                        :
                        item.status == 'Finish' && filter == false ?
                          <TouchableOpacity style={{
                            width: dimensions.SCREEN_WIDTH * 95 / 100, borderRadius: 7, alignSelf: 'center',
                            backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            marginTop: 20,
                          }} onPress={() => { props.navigation.navigate('ServiceDetails', { data: item ,selectedDate:displaydate}) }}>
                            <View style={{ padding: 10, }}>
                              <View style={{}}>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>{item?.clientname}</Text>
                                  </View>

                                </View>

                              </View>
                              <View style={{flexDirection:'row',alignItems:'center',width:'100%',alignSelf:'center',left:5}}>
                            <Text style={{color:'#000',fontWeight:'500',fontSize:11,lineHeight:16}}>Service Scheduled :- </Text>
                              <Text style={{color:'gray',fontWeight:'500',fontSize:11,lineHeight:16}}>{displaydate=='Choose Date'? serviceDate(new Date()):displaydate} from {item.service_start_time} to {item.service_end_time}</Text>
                              </View>
                              {/* <View style={{width:'100%',height:1,backgroundColor:'#E7EAF1'}} /> */}
                              <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                                    <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hlocation.png')} />
                                    <Text style={{ color: 'gray', fontWeight: '500', fontSize: 11, left: 3, lineHeight: 16 }}>{item?.address}</Text>
                                  </View>
                                  <TouchableOpacity style={{ width: 100, height: 30, borderRadius: 15, backgroundColor: '#7BC043', justifyContent: 'center', }}
                                    onPress={() => { openGoogleMaps(item.lat, item.long) }}>
                                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13, alignSelf: 'center' }}>Navigate</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <ImageBackground style={{ width: 125, height: 15, resizeMode: 'stretch', justifyContent: 'center', marginTop: 10 }} source={require('../../assets/images/Icons/stripIcon.png')}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 10, alignSelf: 'center' }}>Status: {item?.status}</Text>
                              </ImageBackground>
                              <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                <Image style={{ width: 20, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hl.png')} />
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                                <TouchableOpacity style={{}} onPress={() => { }}>
                                  <View style={{ alignItems: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                    <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.on_the_way_time != '' ? require('../../assets/images/Icons/hc.png') : require('../../assets/images/Icons/hc2.png')} />
                                    <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', }} />
                                  </View>
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>On the way</Text>
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5, left: 5 }}>{item.on_the_way_time != '' ? item.on_the_way_time : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { }}>
                                  <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.start_time != '' ? require('../../assets/images/Icons/hp.png') : require('../../assets/images/Icons/hp2.png')} />
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Start</Text>
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{item.start_time != '' ? item.start_time : ' '}</Text>
                                </TouchableOpacity>
                                <View style={{ width: 95, height: 2, backgroundColor: '#7BC043', top: -20 }} />
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { }}>
                                  <Image style={{ width: 35, height: 35, resizeMode: 'stretch', }} source={item.finish_time != '' ? require('../../assets/images/Icons/hf.png') : require('../../assets/images/Icons/hf2.png')} />
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>Finish</Text>
                                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginTop: 5 }}>{item.finish_time != '' ? item.finish_time : ' '}</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <ImageBackground style={{ width: '100%', height: 150, resizeMode: 'stretch', justifyContent: 'center', marginTop: 5 }} source={{ uri: item?.service_image }}>
                              {/* <ImageBackground style={{height:15,resizeMode:'stretch',justifyContent: 'center',position:'absolute',bottom:5,paddingLeft:8,paddingRight:15}} source={require('../../assets/images/Icons/strip.png')}>
                      <Text style={{color:'#fff',fontWeight:'500',fontSize:10,alignSelf:'center'}}>{item.service_name}</Text>
                      </ImageBackground>  */}
                            </ImageBackground>
                            <View style={{ padding: 10, }}>
                              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/huser.png')} />
                                  <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, left: 3 }}>Service Name:- {item?.service_name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <TouchableOpacity onPress={() => {
                                    sendEmail(item.clientemail)
                                    // setalert_sms(item.clientemail)
                                    // setMy_Alert(true)
                                  }}>
                                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hsms.png')} />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('ChatDetails', { data: { service_id: item.service_id } })
                                  }}>
                                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', marginHorizontal: 7 }} source={require('../../assets/images/Icons/hchat.png')} />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {
                                    dialCall(item.clientphone)
                                    // setalert_sms(item.clientphone)
                                    // setMy_Alert(true)
                                  }}>
                                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/hcall.png')} />
                                  </TouchableOpacity>
                                </View>

                              </View>

                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1' }} />

                          </TouchableOpacity>
                          :
                          null}
                    </>

                  )
                }} />
            </View>
            :
            <View style={{ alignSelf: 'center', width: '100%', marginTop: 50 }}>
              <Image style={{ width: 150, height: 150, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../assets/images/Icons/emptyService.png')}></Image>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20, marginTop: 10 }}>No Service(s) Assigned</Text>
            </View>
          }

          {completedcount==0 && filter == false && DATA?.length > 0 ?
          <View style={{ alignSelf: 'center', width: '100%', marginTop: 50 }}>
          <Image style={{ width: 150, height: 150, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../assets/images/Icons/emptyService.png')}></Image>
          <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20, marginTop: 10 }}>No Service(s) Completed</Text>
        </View>
        : assignedcount ==0 && filter == true && DATA?.length > 0 ?
            <View style={{ alignSelf: 'center', width: '100%', marginTop: 50 }}>
              <Image style={{ width: 150, height: 150, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../assets/images/Icons/emptyService.png')}></Image>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20, marginTop: 10 }}>No Service(s) Assigned</Text>
            </View>
            : null
           }

          <View style={{ width: 100, height: 300 }} />
        </ScrollView>

      </View>

      {opendateModal ?
        <View style={{ backgroundColor: '#fff', zIndex: 999, position: 'absolute', width: '100%', bottom: 0 }}>
          <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={() => { setopenDateModal(false) }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if(filter){
                getHome(date, 'date',false)
              }else{
                getHome(date, 'date',true)
              }
              setopenDateModal(false)
            }}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </View>

        : null}

      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  )
}

export default ServiceandSchedule