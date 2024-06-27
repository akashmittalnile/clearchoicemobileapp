import React, { useEffect,useState ,useRef} from 'react';
import {Platform, View,useColorScheme,} from 'react-native';
import {  useSelector, useDispatch } from 'react-redux';
// import * as types  from '../redux/types';

 export const baseUrl = 'https://nileprojects.in/clearchoice-janitorial/api/'
 export const imgUrl = 'https://nileprojects.in/clearchoice-janitorial/upload/chat/'
 


//API END POINT LISTS  

export const register = 'register'
export const login = 'login'
export const verify_otp_res = 'apicontroller/verify_otp_res'
export const facilities = 'apicontroller/facilities'
export const forgotPassword = 'apicontroller/forgotPassword'
export const verify_otp = 'apicontroller/verify_otp'
export const country = 'country'
export const state = 'state'
export const city = 'city'
export const profile='profile'
export const update_profile='update-profile'
export const home='home';
export const servic_details='service-details';
export const update_status='update-status'
export const DateOfWeek='DateOfWeek'
export const designation='designation'
export const submit_review='submit-review'
export const service_timecard='service_timecard'
export const ChatService_list='service-list'
export const Submit_chat_count='submit-chat-count'
export const Update_chat_count='update-chat-count'
export const Uploadchatimage='uploadchatimage'
export const Service_logs='service-logs'
export const Notifications='notifications'
export const Incompleted_services='incompleted-services'
export const forget_password='forget-password'
export const reset_password='reset-password'
export const update_service_item_status='update-service-item-status'
export const feedback='feedback'
export const timesheet_request='timesheet-request'

export const requestPostApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    if(Platform.OS=='android'){
      header = {  "Content-Type": `multipart/form-data`,'Accept':'application/json'}
    }else{
      header = {  "Content-Type": `multipart/form-data`, 'Content-Type': 'application/json','Accept':'application/json','Accept': 'application/x-www-form-urlencoded'}
    }
  }

  var url = baseUrl + endPoint
  console.log('post Request Url:-' + url + '\n')
  console.log(body)
  // console.log(header + '\n')
  try {
      let response = await fetch(url, {
        method: method,
        body:body,
        headers:header,
      }
      )
      let code = await response.status 
       //let responseJ = await response.json();
       console.log('the api responce is',code)
     //  console.log("response.text()",response.text());
      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400 || code == 402)
      {
        let responseJson = await response.json();
        //Completion block 
        return {responseJson:null,err:responseJson.message}
      }else{
          // let responson = await response.json();
          // console.log(responson)
        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      console.log('the error is',error)
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
   // return {responseJson:null,err:error}
    }
  }

  export const requestGetApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  var url = baseUrl + endPoint

  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    header = {}
  }

   //url = url + objToQueryString(body)
  console.log('Request Url:-' + url + '\n')
  try {
      let response = await fetch(url, {
        method: method,
        headers:header,
      }
      )
      let code = await response.status
      console.log(code)   
      if(code==200){
        let responseJson = await response.json();
        console.log('Code 200==>>',responseJson)
        return {responseJson:responseJson,err:null,code:code}
      }else if(code == 400)
      {
        return {responseJson:null,err:responseJson.message,code:code}

      }else if(code == 500)
      {
        console.log(response)   

        return {responseJson:null,err:'Something Went Wrong',code:code}

      }else{
        console.log(response)   

        return {responseJson:null,err:'Something went wrong!',code:code}
      }
    } catch (error) {
      console.error(error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.',code:500}
      
    }
  }

  export const requestPostApiMedia = async (endPoint,formData,method,token) => 
{
  var header = {}
 
  if(token!='' && token!=undefined)
  {
    header = {'Content-type': 'multipart/form-data','apitoken':token,'Cache-Control': 'no-cache'
  }
  }else{
    if(endPoint != signUpApi){
      header = { 'Content-type': 'multipart/form-data' , 'Cache-Control': 'no-cache'
    }
  }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
      let response = await fetch(url, {
        method: method,
        body:formData,
        
        headers:header,
       
      }
      )

      let code = await response.status
      console.log(code )   

      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400)
      {
        let responseJson = await response.json();
        return {responseJson:null,err:responseJson.message}

      }else{

        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      console.error('the error of the uploade image is ==>>',error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
      
    }
  }

  export const requestPostApiSignUp = async (endPoint,formData,method) => 
  {
    var url = baseUrl + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')
  
    try {
        let response = await fetch(url, {
          method: method,
          body:formData,
        }
        )
  
        let code = await response.status
        console.log(code )   
  
        if(code==200){
          let responseJson = await response.json();
          console.log( responseJson)
          return {responseJson:responseJson,err:null}
        }else if(code == 400 || 402)
        {
          let responseJson = await response.json();
          console.log( responseJson)

          return {responseJson:null,err:responseJson.msg}
  
        }else{
  
          return {responseJson:null,err:'Something went wrong!'}
        }
      } catch (error) {
  
        return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
        console.error(error);
      }
    }  
  
  const objToQueryString=(obj)=> {

    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.length==0 ? '' :  '?'+  keyValuePairs.join('&');
  }
