import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView, FlatList,Linking,
    TouchableOpacity, SafeAreaView, Alert, TextInput, Platform
  } from 'react-native';
  import React, { useState, useRef, useEffect } from 'react'
  import { Mycolors, dimensions } from '../../utility/Mycolors';
  import HomeHeaderComponent from '../../components/HomeHeaderComponent'
  import {  useSelector, useDispatch } from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { setLoading,saveUserResult} from '../../redux/actions/user_action';
  import Loader from '../../WebApi/Loader';
  import MyAlert from '../../components/MyAlert';
  import { baseUrl,country,DateOfWeek,Service_logs,home,update_profile,update_status,submit_review, servic_details,requestGetApi, requestPostApi } from '../../WebApi/Service'
  import COLORS from '../../global/Colors';
  import MyHeader from '../../components/MyHeader';
  import CustomButton from '../../components/CustomButton/CustomButton';
  import DateTimePicker from '@react-native-community/datetimepicker';

  const axios = require('axios');
  const ServiceLogs = (props) => {
    const [DATA2,setDATA2]=useState(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'])
    const [click1,setclick1]=useState('Mon')  
    const dispatch =  useDispatch();
    const user  = useSelector(state => state.user.user_details)
    const [DATA, setDATA] = useState(null)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false)
    const [lode, setlode] = useState(false)
    const [opendateModal, setopenDateModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [displaydate,setdisplaydate]=useState('Choose Date')
    const [apidate,setapidate]=useState('')
    useEffect(()=>{
    //   getdates()
      getServicelogs('','clear')
    },[])
  
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
    const getServicelogs = async (dat,withs) => {
        setLoading(true)
        var mm = dat.toString().substring(4, 7)
        var dd = dat.toString().substring(8, 10)
        var yy = dat.toString().substring(11, 15)
        var mydate2 = dateformates2(mm, dd, yy)
        console.log('============mydate2========================',Service_logs+'?date='+mydate2);
    
       // let formdata = new FormData();
        // formdata.append("date", mydate2);
        // formdata.append("date", withs=='date' ? mydate2 : '');
         var ddata= withs=='date' ? mydate2 : ''
        const { responseJson, err } = await requestGetApi(Service_logs+'?date='+ddata, '', 'GET', user.token)
        setLoading(false)
        console.log('the Service_logs==>>', responseJson)//.data[0].service
        if (err == null) {
          if (responseJson.status) {
            if(responseJson.data.length>0){
              console.log('getdata');
              setDATA(responseJson.data)
            }else{
              console.log('nodata');
              setDATA(null)
            }
            
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
  
            const onChange = (event, selectedDate) => {
                const currentDate = selectedDate || date;
                 setopenDateModal(Platform.OS === 'ios');
                
                console.log('====================================');
                console.log(currentDate);
                console.log('====================================');
            
                var mm = currentDate.toString().substring(4, 7)
                var dd = currentDate.toString().substring(8, 10)
                var yy = currentDate.toString().substring(11, 15)
                var mydate = dateformates(mm, dd, yy)
                var mydate2 = dateformates2(mm, dd, yy)
                
                 setdisplaydate(mydate)
                 setDate(currentDate);
                 setapidate(mydate2)
                // getHome(currentDate)
                setlode(!lode)
                if(Platform.OS=='android'){
                  getServicelogs(currentDate,'date')
                }
            };
    return (
      <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>
       
         <MyHeader title={'Service logs'} onPress={()=>{props.navigation.goBack()}} onPress2={()=>{props.navigation.navigate('Notification')}}/>
         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'95%',alignSelf:'center'}}>
<View style={{width:'82%',height:50,backgroundColor:'#fff',borderRadius:10,marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10}}>
<Text style={{color:'#000',fontSize:13,textAlign:'center',fontWeight:'300'}}>{displaydate}</Text>
<TouchableOpacity onPress={()=>{setopenDateModal(true)}}>
<Image source={require('../../assets/images/Icons/calendra.png')} style={{height:25,width:25,resizeMode:'stretch',alignSelf:'center'}}></Image>
</TouchableOpacity>
</View>
<TouchableOpacity style={{width:60,height:50,backgroundColor:COLORS.Primary_Green,justifyContent: 'center',borderRadius:10,marginTop:15}}
onPress={()=>{
    setDate(new Date())
    setdisplaydate('Choose Date')
    getServicelogs('','clear')
   
  }}>
<Text style={{color:'#fff',fontSize:13,textAlign:'center',fontWeight:'700'}}>Clear</Text>
</TouchableOpacity>
</View>
         {/* <View style={{marginTop:10}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={DATA2}
                            renderItem={({ item, index }) => {
                                return (
                                  <> 
                                   {index==0 ? 
                                     <TouchableOpacity style={{borderRadius:15,alignSelf: 'center',
                                     backgroundColor:'#fff',borderColor:'#7BC043',borderWidth:1,
                                    justifyContent:'center',margin:4,height:60,width:100}} onPress={()=>{setopenDateModal(true)}}>
                                   <Text style={{color:'#23356F',fontWeight:'600',fontSize:12,alignSelf:'center'}}>Choose Date</Text>
                                   <Image source={require('../../assets/images/Icons/calendra.png')} style={{height:25,width:25,resizeMode:'stretch',alignSelf:'center'}}></Image>
                                   </TouchableOpacity>
                                    :null
                                    }
                                   <TouchableOpacity style={{borderRadius:18,alignSelf: 'center',
                                    backgroundColor:click1==item ? '#7BC043' :'#fff',borderColor:'#7BC043',borderWidth:1,
                                   justifyContent:'center',margin:4,height:60,width:60}} onPress={()=>{
                                    setclick1(item)
                                    getHome(item.substring(0,10)+'T06:50:43.618Z')}}>
                                  <Text style={{color:click1==item ?'#fff':'#23356F',fontWeight:'600',fontSize:12,alignSelf:'center'}}>{item.substring(11,15)}</Text>
                                  <Text style={{color:click1==item ?'#fff':'#23356F',fontWeight:'700',fontSize:15,alignSelf:'center'}}>{item.substring(8,10)}</Text>
                                  </TouchableOpacity>
                                  
                                  </>
                                   
                                )
                            }} />
                            </View> */}
        <View style={{ width: '96%', alignSelf: 'center' }}>
  
          <ScrollView>
          {DATA?.length>0 ? 
                           <View style={{marginTop:10}}>
                          <FlatList
                            
                            showsVerticalScrollIndicator={false}
                              data={DATA}
                              renderItem={({ item, index }) => {
                                  return (


            <View style={{
              width: '98%', borderRadius: 7, alignSelf: 'center',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              elevation: 3,
              marginTop: 20,
            }}>
              <View style={{  width: '100%', alignSelf: 'center', marginTop: 5 }}>
                 <Text style={{ color: '#000', fontWeight: '500', fontSize: 14,padding: 10,left:5 }}>Service {index+1}: {item?.service.name}</Text>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10,marginTop:5 }} />
              
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%',marginLeft:15 }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/calendar-tick.png')} />
                   <View style={{marginLeft:5}}>
                   <Text style={{ color: '#000', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16 }}>Service Schedule:</Text>
                   <Text style={{ color: 'gray', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16,top:2 }}>{item?.date}</Text>
                   </View>
                  </View>
              
              <View style={{ width: '100%',padding:5,backgroundColor:'#F3F7F0',paddingLeft:15,marginTop:10,paddingVertical:10 }}>
              <Text style={{ color: '#4F5168', fontWeight: '400', fontSize: 13, left: 3, lineHeight: 15, }}>Primary Instructions: {item?.service.description}</Text>
              </View>
               
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '45%',marginLeft:15 }}>
                    <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/clock.png')} />
                   <View style={{marginLeft:5}}>
                   <Text style={{ color: '#000', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16 }}>Check In Time</Text>
                   <Text style={{ color: 'gray', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16, }}>{item?.start_time?item?.start_time:'Not Available'}</Text>
                   </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '45%',marginLeft:15 }}>
                    <Image style={{ width: 22, height: 22, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/clock.png')} />
                   <View style={{marginLeft:5}}>
                   <Text style={{ color: '#000', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16 }}>Check Out Time</Text>
                   <Text style={{ color: 'gray', fontWeight: '400', fontSize: 11, left: 3, lineHeight: 16, }}>{item?.end_time?item?.end_time:'Not Available'}</Text>
                   </View>
                  </View>

            </View>

              </View>
  
              <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1',marginTop:10 }} />
              <View style={{ padding: 10, }}>
              <TouchableOpacity style={{ width: 120, height: 30, borderRadius: 15, backgroundColor: '#fff',borderWidth:1,borderColor:"#7BC043", justifyContent: 'center', }}
                  onPress={()=>{Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.service.service_latlng}&travelmode=driving`)}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:80,justifyContent:"center",alignSelf:"center"}}>
                    <Image style={{ width: 17, height:17, resizeMode: 'stretch',right:5}} source={require('../../assets/images/Icons/route-square.png')} />
                    <Text style={{ color: '#7BC043', fontWeight: '600', fontSize: 12, alignSelf: 'center' }}>Navigate</Text>
                    </View>
                  </TouchableOpacity>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between',marginTop:10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                    <Image style={{ width: 18, height: 18, resizeMode: 'stretch', }} source={require('../../assets/images/Icons/location.png')} />
                    <Text style={{ color: '#4F5168', fontWeight: '500', fontSize: 11, left: 3, lineHeight: 16 }}>{item?.service.service_address} </Text>
                  </View>
  
                </View>
              </View>
  
            </View>
  
  
                            )
                            }} />
                            </View>
            :
            <View style={{alignSelf:'center',width:'100%',marginTop:50}}>
            <Image style={{width:150,height:150,resizeMode:'stretch',alignSelf:'center'}} source={require('../../assets/images/Icons/emptyService.png')}></Image>
           <Text style={{textAlign:'center',fontWeight:'600',fontSize:20,marginTop:10}}>No Service Logs</Text>
          </View>
            }

      <View style={{width:100,height:300}} />
          </ScrollView>
  



          {opendateModal ?
            <View style={{backgroundColor:'#fff',position:'absolute',alignSelf:'center',bottom:150,width:'98%'}}>
            <View style={{width:'85%',flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:10}}>
             <TouchableOpacity onPress={()=>{setopenDateModal(false)}}>
              <Text>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{
                getServicelogs(date,'date')
                setopenDateModal(false)}}>
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



        </View>

        {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
        {loading ? <Loader /> : null}
      </SafeAreaView>
    )
  }
  
  export default ServiceLogs