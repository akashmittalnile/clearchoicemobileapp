import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView, FlatList, Linking,
  TouchableOpacity, SafeAreaView, Alert, TextInput
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { FONTS, FONTS_SIZE, widthScale } from '../../global/Utils';
import images from '../../global/images';
import { Mycolors, dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import { baseUrl, country, DateOfWeek, Notifications, home, update_profile, update_status, submit_review, servic_details, requestGetApi, requestPostApi } from '../../WebApi/Service'
import COLORS from '../../global/Colors';
import MyHeader from '../../components/MyHeader';

const Notification = (props) => {
  const [DATA2, setDATA2] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const [selected, setselected] = useState(true)
  const [click1, setclick1] = useState('Mon')
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details)
  const [DATA, setDATA] = useState([])

  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [lode, setlode] = useState(true)


  useEffect(() => {

    getnotification()
  }, [])


  const getnotification = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(Notifications, '', 'GET', user.token)
    setLoading(false)
    console.log('the Notifications==>>', responseJson.data)
    if (err == null) {
      if (responseJson.status) {
        setDATA(responseJson.data)
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


  return (
    <SafeAreaView>
      <MyHeader title={'Notification Center'} onPress={() => { props.navigation.goBack() }} />

      {/* <View style={styles.container}>
        <Image source={images.notificationbell} />
        <View>
          <Text style={styles.text}>Youâ€™re Scheduled for 3 jobs today</Text>
          <Text style={styles.txt}>12:03pm</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image source={images.notificationbell} />
        <View>
          <Text style={[styles.text, {width: '90%'}]}>
            Reach out to your Area Lead Here for Any assistance.
          </Text>
          <Text style={styles.txt}>12:03pm</Text>
        </View>
      </View> */}

      <ScrollView>
        {DATA?.length > 0 ?
          <View style={{ marginTop: 10 }}>
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
                    <View style={styles.container}>
                      <Image source={images.notificationbell} />
                      <View>
                        <Text style={styles.text}>Youâ€™re Scheduled for 3 jobs today</Text>
                        <Text style={styles.txt}>12:03pm</Text>
                      </View>
                    </View>

                  </View>


                )
              }} />
          </View>
          :
          <View style={{ alignSelf: 'center', width: '100%', marginTop: '30%' }}>
            <Image style={{ width: 150, height: 150, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../assets/images/Icons/emptyService.png')}></Image>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20, marginTop: 10 }}>No Notification(s) Found</Text>
          </View>
        }
        <View style={{ width: 100, height: 300 }} />
      </ScrollView>


      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary_white,
    height: widthScale(80),
    width: widthScale(350),
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: FONTS_SIZE.body3,
    fontFamily: FONTS.regular,
    fontWeight: '400',
    color: COLORS.grey,
  },
  txt: {
    fontSize: FONTS_SIZE.body4,
    fontFamily: FONTS.regular,
    color: COLORS.secondary_grey,
    fontWeight: '400',
  },
});

export default Notification