import React, { useState,useRef, useEffect } from 'react'
import COLORS from '../../global/Colors';
import images from '../../global/images';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,TextInput,
  ScrollView,FlatList,
  TouchableOpacity,SafeAreaView, Linking,Platform
} from 'react-native';
import { Mycolors,dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import {  useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading,saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import Datepicker from '../../components/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl,country,DateOfWeek,ChatService_list,update_status,home,update_profile, register,requestGetApi, requestPostApi } from '../../WebApi/Service'

const ChatScreen = (props) => {

  const [DATA2,setDATA2]=useState(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'])
  const [click1,setclick1]=useState('Mon')  
  const dispatch =  useDispatch();
  const user  = useSelector(state => state.user.user_details)
  const [data, setDATA] = useState([])
  const [edit, setedit] = useState(false)
  const [name,setname]=useState('')
  const [phone,setphone]=useState('')
  const [email,setemail]=useState('')
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [lod, setlod] = useState(false)
  const [opendateModal, setopenDateModal] = useState(false);
  const [search,setSearch]=useState('')
  const [lode,setlode]=useState(true)
  const [date, setDate] = useState(new Date());
  const [displaydate,setdisplaydate]=useState('')
  const [filteredData, setFilteredData] = useState([]);
  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      getHome(new Date(),'date')
      // getServiceList()
      getdates()
       })
       return () =>{
        unsubscribe
      }
  },[])

  const getHome = async (dat,withs) => {
    setLoading(true)
    var mm = dat.toString().substring(4, 7)
    var dd = dat.toString().substring(8, 10)
    var yy = dat.toString().substring(11, 15)
    var mydate2 = dateformates2(mm, dd, yy)
    var mydate = dateformates(mm, dd, yy)
    
    console.log('============mydate27========================',mydate2);

    let formdata = new FormData();
   // formdata.append("date", withs=='date' ? mydate2 : dat);
    formdata.append("date", ' ');
    const { responseJson, err } = await requestPostApi(ChatService_list, formdata, 'POST', user.token)
      setLoading(false)
    console.log('the home==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
       setDATA(responseJson.data)
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
    const monthformates=(month)=>{
    
      if(month=='01'){
      return 'Jan'
      }else if(month=='02'){
        return 'Feb' 
      }else if(month=='03'){
        return 'Mar' 
      }else if(month=='04'){
        return 'Apr' 
      }else if(month=='05'){
        return 'May' 
      }else if(month=='06'){
        return 'Jun' 
      }else if(month=='07'){
        return 'Jul' 
      }else if(month=='08'){
        return 'Aug' 
      }else if(month=='09'){
        return 'Sep'
      }else if(month=='10'){
        return 'Oct' 
      }else if(month=='11'){
        return 'Nov' 
      }else if(month=='12'){
        return 'Dec' 
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
  // setopenDateModal(Platform.OS === 'ios');
  if(Platform.OS=='android'){
    setopenDateModal(false)
    getHome(currentDate,'date')
  }
   console.log('====================================');
   console.log(currentDate);
   console.log('====================================');
 
  var mm = currentDate.toString().substring(4, 7)
  var dd = currentDate.toString().substring(8, 10)
  var yy = currentDate.toString().substring(11, 15)
  var mydate = dateformates(mm, dd, yy)
  setdisplaydate(mydate)
  // getHome(currentDate,'date')
  setDate(currentDate)
  //setopenDateModal(false)
  setlode(!lode)
};



  return (
    <SafeAreaView style={{backgroundColor:'#E8ECF2',flex:1}}>
    
       <HomeHeaderComponent icon1={require('../../assets/images/Icons/firstline2.png')} press1={()=>{props.navigation.openDrawer()}} press2={()=>{props.navigation.navigate('Notification')}}/>
<View style={{width:'96%',alignSelf:'center'}}>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
<View style={{width:'82%',height:50,backgroundColor:'#fff',borderRadius:10,marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10}}>
{/* <Text style={{color:'#000',fontSize:13,textAlign:'center',fontWeight:'300'}}>{displaydate}</Text> */}
{/* <TouchableOpacity onPress={()=>{setopenDateModal(true)}}>
<Image source={require('../../assets/images/Icons/calendra.png')} style={{height:25,width:25,resizeMode:'stretch',alignSelf:'center'}}></Image>
</TouchableOpacity> */}
 <TextInput
        style={{paddingHorizontal:10}}
        onChangeText={(text)=>{
          setSearch(text)
          let filteredData = data.filter((item) => {
            return item.service_name.toUpperCase().includes(text.toUpperCase());
          });
          setFilteredData(filteredData);
          setlod(!lod)
        }}
        value={search}
        placeholder="Search by service name..."
      
      />
</View>

<TouchableOpacity style={{width:60,height:50,backgroundColor:COLORS.Primary_Green,justifyContent: 'center',borderRadius:10,marginTop:15}}
onPress={()=>{
  getHome(new Date(),'date')
  // setclick1(DATA2[0])
  // setdisplaydate('Choose Date')
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
                                 
                                   <TouchableOpacity style={{borderRadius:18,alignSelf: 'center',
                                    backgroundColor:click1==item ? '#7BC043' :'#fff',borderColor:'#7BC043',borderWidth:1,
                                   justifyContent:'center',margin:4,height:60,width:60}} onPress={()=>{
                                    setclick1(item)
                                    getHome(item.substring(0,10),'design')}}>
                                  <Text style={{color:click1==item ?'#fff':'#23356F',fontWeight:'600',fontSize:12,alignSelf:'center'}}>{monthformates(item.substring(5,7))}</Text>
                                  <Text style={{color:click1==item ?'#fff':'#23356F',fontWeight:'700',fontSize:15,alignSelf:'center'}}>{item.substring(8,10)}</Text>
                                  <Text style={{color:click1==item ?'#fff':'#23356F',fontWeight:'500',fontSize:12,alignSelf:'center'}}>{item.substring(11,15)}</Text>
                                  </TouchableOpacity>
                                  
                                  </>
                                   
                                )
                            }} />
                            </View>     */}
        
<ScrollView>
  {data.length>0 ?
                              <View style={{marginTop:10}}>
                          <FlatList
                            
                            showsVerticalScrollIndicator={false}
                            data={filteredData && filteredData.length > 0 ? filteredData : data}
                              renderItem={({ item, index }) => {
                                  return (
                                    <> 
                                     <TouchableOpacity style={{width:dimensions.SCREEN_WIDTH*90/100,borderRadius:10,alignSelf: 'center',
                                    backgroundColor:'#fff',
                                   shadowColor: '#000',
                                   shadowRadius: 2,
                                   shadowOpacity: 0.2,
                                   elevation: 3,
                                   marginTop:15,}} onPress={()=>{props.navigation.navigate('ChatDetails',{data:item}) }}>
                  
                                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                                    <Text style={{color:'#000',fontWeight:'600',fontSize:12,margin:15}}>Service {index+1}: {item.service_name}</Text>
                                  {item.msg_count>0 ?
                                    <View style={{width:25,height:25,borderRadius:15,backgroundColor:'red',margin:15,justifyContent: 'center',}}>
                                    <Text style={{color:'#fff',fontWeight:'600',fontSize:12,textAlign:'center'}}>{item.msg_count}</Text>
                                    </View>
                                    : null
                                    }
                                    </View>
                  <View style={{width:'100%',height:1,backgroundColor:'#E7EAF1'}} />

                      <View style={{padding:15,}}>
          
                      <View style={{ flexDirection: 'row', alignItems:'center',}}>
                      <Image style={{ width: 25, height: 25, resizeMode: 'stretch',borderRadius:15 }} source={{uri:item.admin_image}} />
                        <View style={{marginLeft:10 }}>
                        <Text style={{ color: COLORS.Primary_Blue, fontWeight: '400', fontSize: 11, }}>{item.admin_name}</Text>
                          <Text style={{ color: COLORS.grey, fontWeight: '300', fontSize: 10,  marginTop:3 }}>Did you make sure to clean…</Text>
                        </View>
                      </View>
                            </View>

                                   </TouchableOpacity>
                                    </>
                                     
                                  )
                              }} />
                              </View>

       :
       <View style={{alignSelf:'center',width:'100%',marginTop:50}}>
       <Image style={{width:150,height:150,resizeMode:'stretch',alignSelf:'center'}} source={require('../../assets/images/Icons/emptyService.png')}></Image>
      <Text style={{textAlign:'center',fontWeight:'600',fontSize:20,marginTop:10}}>No Chat Found</Text>
     </View>
}        
      {/* {opendateModal ?
            <View style={{backgroundColor:'#fff'}}>
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
          display="spinner"
          onChange={onChange}
        />
         </View>

        : null} */}
                 
    <View style={{width:100,height:200}} /> 
   </ScrollView>

</View>
     
{opendateModal ?
            <View style={{backgroundColor:'#fff',zIndex:999,position:'absolute',width:'100%',bottom:0}}>
            <View style={{width:'85%',flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:10}}>
             <TouchableOpacity onPress={()=>{setopenDateModal(false)}}>
              <Text>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{
              getHome(date,'date')
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
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}

    </SafeAreaView>
  )
}

export default ChatScreen