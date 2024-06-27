import React, { useState, useEffect,useRef } from 'react'
//import { StyleSheet } from 'react-native';

// import Header from '../Component/Header';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,Modal,
    Image, Dimensions, ImageBackground,StatusBar,Keyboard,Button
} from 'react-native';
import MyAlert from '../../components/MyAlert'
import { dimensions, Mycolors } from '../../utility/Mycolors';
import firestore from '@react-native-firebase/firestore'
import { utils } from '@react-native-firebase/app';
import { GiftedChat,Bubble,InputToolbar,Send,Time,Actions,} from 'react-native-gifted-chat'
import {  useSelector, useDispatch } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE, widthScale} from '../../global/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading,saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import Datepicker from '../../components/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl,Submit_chat_count,DateOfWeek,ChatService_list,update_status,Uploadchatimage,update_profile, Update_chat_count,requestGetApi, requestPostApi } from '../../WebApi/Service'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useKeyboard from '../../components/useKeyboard';
const axios = require('axios');
//  import sendNotification from '../Component/SendNotification';
//  import ImagePicker from 'react-native-image-crop-picker';

const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
const ChatDetails = (props) => {
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')  
    const [sms,setsms]=useState('')
    const dispatch =  useDispatch();
    const [messages, setMessages] = useState([]);
    const [message,setMessage]=useState('')
    const user_details  = useSelector(state => state.user.user_details)
    const [userid,setuid]=useState('')
    const [driverid,setDriverid]=useState('')
    const [profileImg, setProfileImg] = useState('')
    const [modlevisual, setmodlevisual] = useState(false);
    const [image, setImage] = useState(null);
    const[image2,setimage2]=useState('')
    const [loading, setLoading] = useState(false)
    const giftedChatRef = useRef(null);
    const isKeyboardOpen = useKeyboard();
    const scrollviewref = useRef();

    useEffect(()=>{
      // console.log('props.route.params.data',props.route.params.data);
      console.log('user_details',user_details);
        updateCounterZero('useefect')
       var userId=user_details.userId
      //  var driverId=props.route.params.data.service_id
       var driverId='1'
       //mapdata.notificationdata.driver_id
       setuid(userId)
       setDriverid(driverId)
     //  const docid  = driverId > userId ? userId+ "-" + driverId : driverId+"-"+userId 
     const docid  = userId+"-" + driverId

     console.log('the DOC ID  is==>>',docid)
         setMessages([]);
       const messageRef = firestore().collection('chatrooms')
       .doc(docid)
       .collection('messages')
       .orderBy('createdAt',"desc")
       console.log('the messageRef data is==>>',messageRef)
     const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
    
        console.log('======================querySnap==============');
        console.log(querySnap.docs);
        console.log('====================================');
       
           const allmsg =   querySnap.docs.map(docSanp=>{
            console.log('====================================erer');
            console.log(docSanp.data());
            console.log('====================================');
            const data = docSanp.data()
            if(data.createdAt){
                return {
                   ...docSanp.data(),
                   createdAt:docSanp.data().createdAt.toDate()
               }
            }else {
               return {
                   ...docSanp.data(),
                   createdAt:new Date()
               }
            }
           })
          var dddd= allmsg.reverse();
            setMessages(dddd)
             handleScrollToEnd()
       })
       return ()=>{
         unSubscribe()
       }
       },[]) 
       const handleScrollToEnd = () => {
        scrollviewref.current.scrollToEnd({ animated: true });
      };
const onSend = (messageArray) => {
  if(message.trim().length!=0){
    setCounter()
    setMessages([])
 const msg=messageArray[0]
 const mymsg={
   ...msg,
   text:image==null? message:'',
   sendBy:userid,  //user id 
   sendto:driverid,  // driver id 
   createdAt: new Date(),
    adminName: "user",
    status:0,
   userName: user_details.fullname,
   image:image!=null?image:''
 }
   
 //   setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
   
  //  const docid  = driverid > userid ?  userid+ "-" + driverid :driverid+"-"+userid 
     // const docid  = '123'
     const docid  = userid+"-" + driverid
     console.log('the DOC 2 ID  is==>>',docid)
       //const docid='123'  //here use driverid and user id 
       firestore().collection('chatrooms') 
       .doc(docid)
       .collection('messages')
       .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
      
       setImage(null)
       setMessage('')
} 
}

       const setCounter = async () => {
        console.log('ssssssssssssssssssssssssssssssss')
        setLoading(true)
       
        let formdata = new FormData();
        formdata.append("service_id", '');
        const { responseJson, err } = await requestPostApi(Submit_chat_count, formdata, 'POST', user_details.token)
        setLoading(false)
        console.log('the Submit_chat_count==>>', responseJson)
        if (err == null) {
          if (responseJson.status) {
           
          } else {
            // setalert_sms(responseJson.message)
            // setMy_Alert(true)
          }
        } else {
        //   setalert_sms(err)
        //   setMy_Alert(true)
        }
      }
      const updateCounterZero = async (fr) => {
        console.log('====================================');
        console.log(ChatService_list);
        console.log('====================================');
        // 
        if(fr=='back'){
          setLoading(true)
         }
        let formdata = new FormData();
        // formdata.append("service_id", props.route.params.data.service_id);
        const { responseJson, err } = await requestPostApi(Update_chat_count, formdata, 'POST', user_details.token)
         setLoading(false)
        console.log('the Update_chat_count==>>', responseJson)
        if (err == null) {
          if (responseJson.status) {
           if(fr=='back'){
            props.navigation.goBack()
           }
          } else {
            // setalert_sms(responseJson.message)
            // setMy_Alert(true)
          }
        } else {
        //   setalert_sms(err)
        //   setMy_Alert(true)
        }
      }
      const uploadeImg = async (pto) => {
        setLoading(true)
        let formdata = new FormData();
        formdata.append("image", pto);
        const { responseJson, err } = await requestPostApi(Uploadchatimage, formdata, 'POST', user_details.token)
          setLoading(false)
        console.log('the uploadchatimage==>>', responseJson)
        if (err == null) {
          if (responseJson.status) {
          setImage(responseJson.url);
         
          } else {
            // setalert_sms(responseJson.message)
            // setMy_Alert(true)
          }
        } else {
        //   setalert_sms(err)
        //   setMy_Alert(true)
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
               setMessage(image.assets[0].fileName)
                uploadeImg(photo)
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
            type: "image/jpeg",
            name: image.assets[0].fileName
          };
          console.log('====================================');
          console.log(image);
          console.log('====================================');
        //   setpick(photo)
        //   setfilepath(image)
                // setImage(photo);
                setMessage(image.assets[0].fileName)
                uploadeImg(photo)
                // setimage2(image?.path)
                // setmodlevisual(false);
        }
      })
    
    }
    
    const senNoti= async()=>{
     let notidata={
       'data': {},
       'title':'Message from '+user_details.first_name,
       'body': 'new message',
       'token':'devicetken'
        }
        let result= await sendNotification.sendNotification(notidata)
}

    return (
        <>
        <SafeAreaView style={{backgroundColor: '#1C2B53', flex: 1 }} />
        <StatusBar backgroundColor="#1C2B53" barStyle="light-content" />

            {/* <ScrollView showsVerticalScrollIndicator={false} style={{}}> */}
                <View style={{}}>
                    <View style={{ width: W, height: H * 0.22, backgroundColor: '#1C2B53' }}>
                        <ImageBackground source={require('../../assets/images/Icons/geometri.png')} style={{ width: W, height: H * 0.22, resizeMode: 'cover', }} >
                        <View style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: widthScale(90),
                            backgroundColor: 'transparent',
                            padding: 15,}}>
      <TouchableOpacity
        onPress={() => {
          updateCounterZero('back')
            // props.navigation.goBack()
        }}>
        {/* <Image source={images.arrowleft} /> */}
      </TouchableOpacity>
      <Text style={{ 
        fontSize: FONTS_SIZE.h3,
    color: COLORS.light_white,
    fontWeight: '600',
    fontFamily: FONTS.regular,}}>Chats</Text>
      <TouchableOpacity 
      onPress={() => {
        props.navigation.navigate('Notification')
      }}>
        <Image
          source={images.notificationicons}
          style={{height: 30, width: 30, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
                      
                            <View style={{ width:'100%' ,position: 'absolute',top:120}} >
                                <Text style={{  fontWeight: '400', fontSize: 16, color: '#FFFFFF',textAlign:'center' }}>You need help? Let’s chat.</Text>
                            </View>
                      
                        </ImageBackground>

                    </View>
{/* <View style={{width:dimensions.SCREEN_WIDTH,height:isKeyboardOpen? H * 0.72 : H * 0.63}}>
 <GiftedChat
      messages={messages}
     
      onSend={messages => onSend(messages)}
      user={{
        _id: userid, //userId  and from driver side driver 
      }}
      renderTime={()=>{
        <Time
                textStyle={{
                    right: {
                        color: 'red',
                        // fontFamily: 'Montserrat-Light',
                        // fontSize: 14
                    },
                    left: {
                        color: 'black',
                      
                    }
                }}
            />
      }}
      alwaysShowSend={true}
      renderBubble={(props)=>{
        return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor:'#fff',
             right:8,
             shadowColor: '#042C5C',
             shadowRadius: 9,
             shadowOpacity: 0,
             elevation: 3,
             padding:10
          },
          left:{
            backgroundColor:"white",
             left:-33,
             shadowColor: '#042C5C',
             shadowRadius: 9,
             shadowOpacity: 0,
             elevation: 3,
             padding:10
          },
         
        }}
        textStyle={{
          right: {
            color:  Mycolors.TEXT_COLOR
          },
          left: {
            color: Mycolors.TEXT_COLOR
          }
        }}
      />
      }}
      // isKeyboardInternallyHandled={true}
      renderInputToolbar={(props)=>{
         return (
           <>
           <View style={{width:'80%',height:50,borderRadius:28,alignSelf:'center',backgroundColor:'#fff',justifyContent:'center',flexDirection:'row',right:25}}>
            <View style={{width:'100%',height:45,borderRadius:28,}}>
                <InputToolbar {...props}
                containerStyle={[{borderRadius:28}]} 
                textInputStyle={{ color: "black",top:5 }}
                placeholder="Type your message..."
                renderActions={() => {
                  return (
                    <View style={{position:'absolute',right:10,top:13,zIndex:999}}>
                    <TouchableOpacity onPress={()=>{
                      setmodlevisual(true);
                  }}>
                       <Image style={{  width: 20, height: 20,resizeMode:'stretch' }} source={
                          require('../../assets/images/Icons/whtsapp.png')}
                      />
                  </TouchableOpacity>
                  </View>
                  )
                } }
                />
            </View>
            </View>
           </>
             )
      }}
      // renderComposer={(props)=>{
      //   return(
      //      <View style={{width:'70%',height:50,borderRadius:28,alignSelf:'center',backgroundColor:'#000',justifyContent:'center',marginLeft:30}}>
      //       <View style={{width:'100%',height:45,borderRadius:28,}}>
      //            <TextInput
      //            {...props}
      //           onChangeText={(txt)=>{}}
      //           placeholderTextColor={'gray'}
      //           placeholder="Type your message..."
      //           style={{}} 
      //           // editable={editable}
      //     // maxLength={length}
      //   />
      //       </View>
      //       </View>
      //   )
      // }}
      text={message}
      onInputTextChanged={text => {
        console.log('====================================');
        console.log(text);
        console.log('====================================');
        setMessage(text)}}
      renderSend={(props) =>{
      return (
          <Send
              {...props}
          >
                          <View style={{left:50}}>
                           
                            
                                <Image style={{ top: 3, left: 3, width: 46, height: 46 }} source={
                                    require('../../assets/images/Icons/share.png')}
                                />
                            </View>
          </Send>
      );
      }}

     
    />

     <View style={{width:10,height:30}} />
                    </View> */}

<View style={{width:dimensions.SCREEN_WIDTH,height:isKeyboardOpen? H * 0.72 : H * 0.63}}>

<ScrollView 
      ref={scrollviewref}
       >
{messages.map((data,index)=>{
return(
<View style={{paddingHorizontal:10,marginTop:10}}>
{data.image!=''? 
<Image source={{uri:data.image}} style={{width:130,height:100,resizeMode:'stretch',borderRadius:10,alignSelf:data.adminName=='user'?'flex-end':'flex-start',overflow:'hidden'}}></Image>

:
<View style={{}}>
  {data.adminName=='user'?
  <View style={{backgroundColor:'#fff',padding:15,width:180,alignSelf:data.adminName=='user'?'flex-end':'flex-start',borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10}}>
  <Text style={{color:'#000',}}>{data.text}</Text>
</View>
:
<View style={{backgroundColor:'#fff',padding:15,width:180,alignSelf:data.adminName=='user'?'flex-end':'flex-start',borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:10}}>
<Text style={{color:'#000'}}>{data.text}</Text>
</View>
}

</View>
}

</View>
)
})}
<View style={{width:100,height:isKeyboardOpen ? 430 :100}}  />
</ScrollView>
</View>
<View style={{position:'absolute',bottom:'5',width:'80%',height:50,backgroundColor:'#fff',borderRadius:30,justifyContent:'center',paddingHorizontal:10,marginLeft:12,top:isKeyboardOpen? H * 0.39 :  H * 0.75,borderColor:'#000',borderWidth:0.5}}>
      <TextInput
        style={{paddingRight:40}}
        onChangeText={(text)=>{
          setMessage(text)
        }}
        value={message}
        placeholder="Type your message..."
      />
                    <View style={{position:'absolute',right:10}}>
                           
                        <TouchableOpacity onPress={()=>{
                          setmodlevisual(true);
                      }}>
                        <Image style={{  width: 20, height: 20,resizeMode:'stretch' }} source={
                              require('../../assets/images/Icons/whtsapp.png')}
                          />
                          </TouchableOpacity>
                       </View>

                       <View style={{position:'absolute',right:-50}}>
                       <TouchableOpacity onPress={()=>{
                     var abx=[{ "user": {"_id": 2}}]
                     onSend(abx)
                     
                      }}>
                            
                           <Image style={{ top: 3, left: 3, width: 46, height: 46 }} source={
                               require('../../assets/images/Icons/share.png')}
                           />
                           </TouchableOpacity>
                       </View>

</View>

 
          
          
                </View>
            {/* </ScrollView> */}

            

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

       {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
       {loading ? <Loader /> : null}
        </>
    )
}
export default ChatDetails;
const styles = StyleSheet.create({
    contList: {
        marginHorizontal: 6,
        marginTop: 100,
      
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
      
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 1,
        marginLeft: '37%',
        paddingVertical: 5,
    },
    messList: {
        marginHorizontal: 6,
        marginTop: '8%',
       paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRigthRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: 223,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 1,
        marginLeft: '7%',


    },
    assist: { fontFamily: 'Avenir LT Std', fontWeight: '400', fontSize: 14, color: '#676767' },
    time: { marginLeft: '82%', marginTop: -4, fontFamily: 'Cera Pro', fontWeight: '500', fontSize: 11, color: '#676767',  },
    text: { fontFamily: 'Avenir Lt Std', fontWeight: '400', fontSize: 14, width: 184, alignItems: 'center', marginTop: 8 },
    tim: { marginLeft: '7%', marginTop: -4, fontFamily: 'Cera Pro', fontWeight: '500', fontSize: 11, color: '#676767',  },
    textBox: {
        alignSelf:'center',
        marginHorizontal: 6,
        height: 50,
        borderRadius: 30,
        marginBottom: 7,
        backgroundColor: '#FFFFFF',
        width: '80%',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: { right: -22, fontFamily: 'Avenir LT Std', fontWeight: '400', fontSize: 14, color: '#999999' }

})












// import React, { useEffect, useState } from 'react';
// import {View,Image,Text,StyleSheet,SafeAreaView, TouchableOpacity, ScrollView,TextInput, Alert, PermissionsAndroid, Platform} from 'react-native';
// import { dimensions, Mycolors } from '../../utility/Mycolors';
// import firestore from '@react-native-firebase/firestore'
// import storage from '@react-native-firebase/storage'
// import { utils } from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth'
// import { GiftedChat,Bubble,InputToolbar,Send,Time} from 'react-native-gifted-chat'
// import {  useSelector, useDispatch } from 'react-redux';
// import sendNotification from '../../component/SendNotification';
// import {setNotificationData,setMessageCount} from '../../redux/actions/latLongAction';

// const Chat = (props) => {
//     const [sms,setsms]=useState('')
//     const dispatch =  useDispatch();
//     const [email,setemail]=useState('abc@yopmail.com')
//     const [password,setPassword] = useState('As@12345')
//     const [messages, setMessages] = useState([]);
//     const user_details  = useSelector(state => state.user.user_details)
//     const mapdata  = useSelector(state => state.maplocation)
//     const [userid,setuid]=useState('')
//     const [driverid,setDriverid]=useState('')
//       useEffect(()=>{
//         removeMessageCount()
//         // var userId=user_details.location[0] ? user_details.location[0].user_id : user_details.user_id
//         var userId=user_details.user_id
//         var driverId=mapdata.notificationdata.driver_id
//         setuid(userId)
//         setDriverid(driverId)
//      const docid  = driverId > userId ? userId+ "-" + driverId : driverId+"-"+userId 
//       //  const docid  = driverId > userId ? driverId+"-"+userId :userId+ "-" + driverId    //for testing only Uid 5,   D id149
//           // 5-149
//           console.log('the DOC ID  is==>>',docid)
//         const messageRef = firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")
//         console.log('the messageRef data is==>>',messageRef)
//       const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
//             const allmsg =   querySnap.docs.map(docSanp=>{
//              const data = docSanp.data()
//              if(data.createdAt){
//                  return {
//                     ...docSanp.data(),
//                     createdAt:docSanp.data().createdAt.toDate()
//                 }
//              }else {
//                 return {
//                     ...docSanp.data(),
//                     createdAt:new Date()
//                 }
//              }
//             })
//             setMessages(allmsg)
//         })
//         return ()=>{
//           unSubscribe()
//         }
       
//       },[]) 
//       const removeMessageCount=()=>{
//         dispatch(setMessageCount(0))
//       }

//  const getAllMessages = async ()=>{
//        // const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
//         const docid='123'   //here use driverid and user id 
//         const querySanp = await firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")
//         .get()
//        const allmsg =   querySanp.docs.map(docSanp=>{
//             return {
//                 ...docSanp.data(),
//                 createdAt:docSanp.data().createdAt.toDate()
//             }
//         })
//         console.log('the message is==>>',allmsg)
//         setMessages(allmsg)

//      }
//   const senNoti= async()=>{
//     console.log('hiihiiii==>',mapdata.notificationdata) 
//       let notidata={
//         'data': {},
//         'title':'Message from fling',
//         'body': 'new message',
//        'token':mapdata.notificationdata.driver_device_id
//       }
//       let result= await sendNotification.sendNotification(notidata)
//        // console.log('result')
//     }

// const onSend = (messageArray) => {
//   senNoti()
//   const msg=messageArray[0]
//   const mymsg={
//     ...msg,
//     sendBy:userid,  //user id 
//     sendto:driverid,  // driver id
//     createdAt: new Date()
//   }
//       setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
//      // const docid  = driverid > userid ?  driverid+"-"+userid :userid+ "-" + driverid 
//       const docid  = driverid > userid ?  userid+ "-" + driverid :driverid+"-"+userid 

//       console.log('the DOC 2 ID  is==>>',docid)
//         //const docid='123'  //here use driverid and user id 
//         firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
//       }

// const loginchaek=()=>{
//   auth().onAuthStateChanged(userExist=>{
//     if(userExist){
//      console.log('user deteils==>>',userExist)
//       // firestore().collection('users')
//       // .doc(userExist.uid)
//       // .update({
//       //   status:"online"
//       // })
//     } else {
//       console.log('user deteils==>>',userExist)
//     }
//   })
//       }


// const adddata=()=>{
//     firestore()
//   .collection('Users')
//   .doc('ABC')
//   .set({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });

// }

// const login=()=>{
 
//    auth().signInWithEmailAndPassword(email,password)
//     .then(() => {
//       console.log('User signed in!');
//     })
//       // firestore().collection('Users').doc(result.user.uid).set({
//       //     name:'name',
//       //     email:result.user.email,
//       //     uid:result.user.uid,
//       //     pic:'image',
//       //     status:"offline"
//       // })  
//       .catch(error => {
//     console.log(error)
//         })
// }

// const getUsers = async ()=>{
//   // const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
//   const querySanp = await firestore().collection('Users').get()
//   const allusers = querySanp.docs.map(docSnap=>docSnap.data())
 
 
//   console.log('All Users is',allusers)

// }

// const createaccount= async()=>{
//   try{
//     const result =  await auth().createUserWithEmailAndPassword(email,password)
//       firestore().collection('Users').doc(result.user.uid).set({
//           name:'UserName',
//           email:result.user.email,
//           uid:result.user.uid,
//           // pic:image,
//           status:"online"
//       })  
     
//   }catch(err){
//     console.log('err is',err)
//       // alert("something went wrong")
//   }
// }

// const loguot=()=>{
//   auth()
//   .signOut()
//   .then(() => console.log('User signed out!'));
// }
// const deletuser=()=>{
//     auth().currentUser.delete().then(function () {
//       console.log('delete successful?')
//       // console.log(app.auth().currentUser)
//     }).catch(function (error) {
//       console.error({error})
//     })
//   }

//   const pickImageAndUpload = ()=>{
//     launchImageLibrary({quality:0.5},(fileobj)=>{
//       console.log('jojojojojo',fileobj)
//      const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
//             uploadTask.on('state_changed', 
//              (snapshot) => {

//                 var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 if(progress==100) alert('image uploaded')
                
//             }, 
//             (error) => {
//                 alert("error uploading image")
//             }, 
//             () => {
//                 uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                 // setImage(downloadURL)
//                 });
//             }
//             );
//     })
// }


//      return(
//     <SafeAreaView style={styles.container}>
    
//   {/* ******** Header ********** */}

//   <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20, backgroundColor:Mycolors.BG_COLOR,
//   width:'100%',height:55,
//       shadowColor:  Mycolors.GrayColor,
//             shadowOffset: {
//               width:0,
//               height:3
//             }, 
//             shadowRadius: 5,
//             shadowOpacity: 3.0,
//             // justifyContent: 'center',
//             elevation: 5}}>
// <TouchableOpacity style={{}} onPress={()=>{props.navigation.goBack()}}>
// <Image source={Mycolors.BG_COLOR=='#fff'? require('../../assets/leftArrowH3.png'):require('../../assets/leftArrowW.png')} style={{ width: 24, height: 16,alignSelf:'center'}}></Image>
// </TouchableOpacity>
// <View style={{width:25,height:25,borderRadius:15,marginHorizontal:10,borderRadius:15}}>
// <Image source={{ uri: mapdata.notificationdata.driver_image }} style={{ width: 25, height: 25, alignSelf: 'center',borderRadius:15 }}></Image>
// </View>
// <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',}}>{mapdata.notificationdata.driver_name}</Text>
// </View>





// {/* ******** End Header ********** */}

// {/* 
// <TouchableOpacity onPress={() => {pickImageAndUpload()}}>
//   <Text>uploade img</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {loguot()}}>
//   <Text>log out</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {createaccount()}}>
//   <Text>Create Account</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {login()}}>
//   <Text>login</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {adddata()}}>
//   <Text>Add data</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {deletuser()}}>
//   <Text>delete User</Text>
// </TouchableOpacity>
               
// <TouchableOpacity onPress={() => {getUsers()}}>
//   <Text>GetAll User</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {loginchaek()}}>
//   <Text>Check login or not</Text>
// </TouchableOpacity> */}

// <View style={{flex:1,width:dimensions.SCREEN_WIDTH}}>
//  <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: userid, //userId  and from driver side driver 
//       }}

//       renderTime={()=>{
//         <Time
//                 textStyle={{
//                     right: {
//                         color: 'red',
//                         // fontFamily: 'Montserrat-Light',
//                         // fontSize: 14
//                     },
//                     left: {
//                         color: 'black',
                      
//                     }
//                 }}
//             />
//       }}

//       renderBubble={(props)=>{
//         return <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor:'#FF8C00',
//              right:8
//           },
//           left:{
//             backgroundColor:"white",
//              left:-33,
//           }
//         }}
//         textStyle={{
//           right: {
//             color: "white"
//           },
//           left: {
//             color: Mycolors.TEXT_COLOR
//           }
//         }}
//       />
//     }}
//     // renderMessageText={()=>{
//     //   color:'red'
//     // }}
//       renderInputToolbar={(props)=>{
//          return (
//            <>
//            <View style={{width:'100%',height:70,alignSelf:'center',backgroundColor:'#fff',justifyContent:'center',flexDirection:'row'}}>

//             <View style={{width:'90%',height:45,borderRadius:28,marginTop:15}}>
//                <InputToolbar {...props}
//                 containerStyle={styles.input} 
//                 textInputStyle={{ color: "black" }}
//                 />
//           </View>
//           </View>
//            </>
//          )
//     }}
//     renderSend={(props) =>{
//       return (
//           <Send
//               {...props}
//           >
//               <View style={{width: 35, height: 35,borderRadius:20,backgroundColor:Mycolors.ORANGE,justifyContent:'center',left:15,top:-5}}>
//                   <Image source={require('../../assets/send.png')} resizeMode={'center'}style={{ width: 19, height: 19, alignSelf: 'center' }}/>
//               </View>
//           </Send>
//       );
//      }}


//     />
//     <View style={{width:10,height:30}} />
    
// </View>
  

//     </SafeAreaView>
//      );
//   }
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,  
//     backgroundColor:Mycolors.DrawerBGcolor
//   },
//   input: {
//     paddingHorizontal: 10,
//     fontSize: 13,
//     borderColor: Mycolors.GrayColor,
//     backgroundColor: '#fff6e6',
//     borderRadius:8,
//     color:Mycolors.TEXT_COLOR,
//   },
// });
// export default Chat