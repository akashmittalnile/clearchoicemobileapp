import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView, FlatList, Platform,
  TouchableOpacity, SafeAreaView, Alert, TextInput, Linking
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Mycolors, dimensions } from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import Datepicker from '../../components/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl, service_timecard, timesheet_request, ChatService_list, update_status, home, update_profile, register, requestGetApi, requestPostApi } from '../../WebApi/Service'
import COLORS from '../../global/Colors';
import { FONTS, FONTS_SIZE, myHeight, heightScale, widthScale } from '../../global/Utils';
import MyHeader from '../../components/MyHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { startOfMonth, endOfMonth, addDays, format } from 'date-fns';

const TimeCard = (props) => {
  const [DATA2, setDATA2] = useState([])

  const [tableHead, settableHead] = useState(['DATE', 'SERVICE NAME', 'IN', 'OUT', 'TOTAL'])
  const [widthArr, setwidthArr] = useState([100, 100, 100, 100, 100])

  const [totalHours, settotalHours] = useState('')
  const [rateSelected, setrateSelected] = useState('')
  const [rateSelected1, setrateSelected1] = useState('')
  const state = this.state;
  const [click1, setclick1] = useState('Mon')
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details)
  const [DATA, setDATA] = useState(null)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)
  const [lod, setlod] = useState(false)
  const [tabledataarray, settabledataarray] = useState([])
  const [opendateModal, setopenDateModal] = useState(false);
  const [dob, setdob] = useState(new Date())
  const [lode, setlode] = useState(true)
  const [date, setDate] = useState(new Date());
  const [sdate, setsDate] = useState(new Date());
  const [sdisplaydate, setsdisplaydate] = useState('');
  const [sApidate, setsApidate] = useState('');
  const [edate, seteDate] = useState(new Date());
  const [edisplaydate, setedisplaydate] = useState('');
  const [eApidate, seteApidate] = useState('');
  const [opendateModal2, setopenDateModal2] = useState(false);
  const [genderopen, setgenderOpen] = useState(false);
  const [gendervalue, setgenderValue] = useState(null);
  const [genderitems, setgenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const [durationopen, setdurationOpen] = useState(false);
  const [durationvalue, setdurationValue] = useState(null);
  const [durationvaluedata, setdurationValuedata] = useState(null);
  const [durationitems, setdurationItems] = useState([{ label: ' ', value: ' ' }]);

  const [monthopen, setmonthOpen] = useState(false);
  const [monthvalue, setmonthValue] = useState(null);
  const [monthitems, setmonthItems] = useState([
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November		', value: '11' },
    { label: 'December', value: '12' },

  ]);

  const [yearopen, setyearOpen] = useState(false);
  const [yearvalue, setyearValue] = useState(null);
  const [yearitems, setyearItems] = useState([{ label: 'Jan', value: '01' }]);

  const [clickeditem, setclickeditem] = useState('')
  const [seletedtime, setseletedtime] = useState('')
  const [timeModel, settimeModel] = useState(false)
  const [cellIndex, setcellIndex] = useState('')
  const [clickedDate, setclickedDate] = useState('')

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push({ label: `${i}`, value: i });
    }
    return years;
  };

  const handleSelectDate = (from, yea, mon) => {
    var startmonth = ''
    var endmonth = ''
    var newDate = ''
    if (from == 'month') {
      const selectedDate = new Date(yea, mon - 1);
      startmonth = startOfMonth(selectedDate)
      endmonth = endOfMonth(selectedDate)
      newDate = addDays(startmonth, 14);
    } else {
      startmonth = startOfMonth(new Date())
      endmonth = endOfMonth(new Date())
      newDate = addDays(startmonth, 14);
    }

    var mm = startmonth.toString().substring(4, 7)
    var dd = startmonth.toString().substring(8, 10)
    var yy = startmonth.toString().substring(11, 15)
    var mydate = displaydateformates(mm, dd, yy)
    var myApidate = dateformates(mm, dd, yy)

    var emm = newDate.toString().substring(4, 7)
    var edd = newDate.toString().substring(8, 10)
    var eyy = newDate.toString().substring(11, 15)
    var emydate = displaydateformates(emm, edd, eyy)
    var emyApidate = dateformates(emm, edd, eyy)


    var emydate1 = displaydateformates(emm, +edd + 1, eyy)
    var emyApidate1 = dateformates(emm, +edd + 1, eyy)

    var lmm = endmonth.toString().substring(4, 7)
    var ldd = endmonth.toString().substring(8, 10)
    var lyy = endmonth.toString().substring(11, 15)
    var lmydate = displaydateformates(lmm, ldd, lyy)
    var lmyApidate = dateformates(lmm, ldd, lyy)
    var itm = [{ label: mydate + ' To ' + emydate, value: myApidate, endDatas: emyApidate, startdats: myApidate },
    { label: emydate1 + ' To ' + lmydate, value: lmyApidate, endDatas: lmyApidate, startdats: emyApidate1 }]
    setdurationItems(itm)
    // setSelectedDate(newDate);
  };

  const handleCurrentDate = () => {
    var startmonth = startOfMonth(new Date())
    var endmonth = endOfMonth(new Date())
    var newDate = addDays(startmonth, 14);

    var mm = startmonth.toString().substring(4, 7)
    var dd = startmonth.toString().substring(8, 10)
    var yy = startmonth.toString().substring(11, 15)
    var mydate = displaydateformates(mm, dd, yy)
    var myApidate = dateformates(mm, dd, yy)

    var emm = newDate.toString().substring(4, 7)
    var edd = newDate.toString().substring(8, 10)
    var eyy = newDate.toString().substring(11, 15)
    var emydate = displaydateformates(emm, edd, eyy)
    var emyApidate = dateformates(emm, edd, eyy)


    var emydate1 = displaydateformates(emm, +edd + 1, eyy)
    var emyApidate1 = dateformates(emm, +edd + 1, eyy)

    var lmm = endmonth.toString().substring(4, 7)
    var ldd = endmonth.toString().substring(8, 10)
    var lyy = endmonth.toString().substring(11, 15)
    var lmydate = displaydateformates(lmm, ldd, lyy)
    var lmyApidate = dateformates(lmm, ldd, lyy)

    var ncurrentDate = new Date();
    var ndd = ncurrentDate.toString().substring(8, 10)
    var mm = ncurrentDate.toString().substring(4, 7) //jan
    var newmm = monthformates(mm)
    setmonthValue(newmm)
    if (ndd > 15) {
      getTimeCard(emyApidate1, lmyApidate)
      setdurationValue(emyApidate1)
      setdurationValuedata({ label: emydate1 + '   to   ' + lmydate, value: lmyApidate, endDatas: lmyApidate, startdats: emyApidate1 })
      setsdisplaydate(emyApidate1)
      setsApidate(emyApidate1)
      setedisplaydate(lmyApidate)
      seteApidate(lmyApidate)
    } else {
      getTimeCard(myApidate, emyApidate)
      setdurationValue(myApidate)
      setdurationValuedata({ label: mydate + '   to   ' + emydate, value: myApidate, endDatas: emyApidate, startdats: myApidate })
      setsdisplaydate(myApidate)
      setsApidate(myApidate)
      setedisplaydate(emyApidate)
      seteApidate(emyApidate)
    }

    // var itm=  [{label: mydate+'   to   '+emydate, value: myApidate,endDatas:emyApidate,startdats:myApidate},
    //             {label: emydate+'   to   '+lmydate, value: lmyApidate,endDatas:lmyApidate,startdats:emyApidate}]
    //             setdurationItems(itm)
    // setSelectedDate(newDate);
  };

  const myfun = async(ddd) => {
    settableHead(['DATE', 'SERVICE NAME', 'IN', 'OUT', 'TOTAL'])
    setwidthArr([100, 100, 100, 100, 100])
    var tablenumber = []
    var MytotalHours = 0
    var timesheet = ddd.timesheet
    console.log('====================================timesheet');
    console.log(timesheet);
    console.log('====================================');
    var headArr = tableHead
    var wiArr = widthArr

    //  ********************************Table Head Collection
    for (let i = 0; i < timesheet.length; i += 1) {
      for (let j = 0; j < timesheet[i].days.length; j += 1) {
        var loopdata = timesheet[i].days[j].service_items
        var loopdata2 = timesheet[i].days[j].machine_type
        for (let l = 0; l < loopdata2.length; l += 1) {
          if (!headArr.includes(loopdata2[l].name)) {
            headArr.push(loopdata2[l].name)
            wiArr.push(100)
          }
        }
        for (let k = 0; k < loopdata.length; k += 1) {
          if (!headArr.includes(loopdata[k].name)) {
            headArr.push(loopdata[k].name)
            wiArr.push(100)
          }
        }
       
      }
    }
   
    settableHead(headArr)
    setwidthArr(wiArr)
   
    //*****End Head Collection AND Start RowData Collection */

    for (let i = 0; i < timesheet.length; i += 1) {
      var tabledata = []
      var mytotal = 0
      for (let j = 0; j < timesheet[i].days.length; j += 1) {
        var loopdata = timesheet[i].days[j].service_items
        var loopdata2 = timesheet[i].days[j].machine_type
        var rowdata = []
        rowdata.push({ label: timesheet[i].days[j].date, serviceData: timesheet[i].days[j].service_id })
        rowdata.push({ label: timesheet[i].days[j].service_name, serviceData: timesheet[i].days[j].service_id })
        rowdata.push({ label: timesheet[i].days[j].start_time, serviceData: timesheet[i].days[j].service_id })
        rowdata.push({ label: timesheet[i].days[j].end_time, serviceData: timesheet[i].days[j].service_id })
        rowdata.push({ label: timesheet[i].days[j].total_hours_worked_on_day_format, serviceData: timesheet[i].days[j].service_id })

        for (let l = 5; l < headArr.length; l += 1) {
          var rdata = ' '
          for (let n = 0; n < loopdata2.length; n += 1) {
            if (headArr[l] == loopdata2[n]?.name && loopdata2[n].total_hours != null) {
              rdata = loopdata2[n].total_hours
            }
          }
          for (let m = 0; m < loopdata.length; m += 1) {
            if (headArr[l] == loopdata[m]?.name && loopdata[m].total_hours != null) {
              rdata = loopdata[m].total_hours
            }
          }
          rowdata.push({ label: rdata, serviceData: '' })
        }
        rowdata.push({ label: timesheet[i].days[j].incident_report.details, serviceData: timesheet[i].days[j].service_id })
        tabledata.push(rowdata)

        // mytotal=parseFloat(mytotal)+parseFloat(timesheet[i].days[j].total_hours_worked_on_day)
        // mytotal=parseFloat(mytotal)+parseFloat(timesheet[i].days[j].total_hours_worked_on_day)
      }

      tablenumber.push({ 'tablesData': tabledata, 'Total': timesheet[i].total_hours_in_week_format })
      //  MytotalHours=parseFloat(MytotalHours)+parseFloat(mytotal)
    }
    settabledataarray(tablenumber)
    // settotalHours(MytotalHours)
   
    

  }
  useEffect(() => {
    handleSelectDate('useefect', '', '')
    const currentYear = new Date().getFullYear();
    setyearValue(currentYear)
    setlod(!lod)
    handleCurrentDate()


    var currentDate = new Date();
    var startd = subtractDays(currentDate, 15)
    setsDate(startd)
  }, [])

  const updateStatus = async (tt) => {
    setLoading(true)
    const [d, m,y] = clickedDate[0].label.split('-');
    let formdata = new FormData();
    formdata.append("status", cellIndex);
    formdata.append("service_id", clickeditem.serviceData); //status_id  03-13-2024
    formdata.append("date", `${y}-${d}-${m}`); //y-m-d
    formdata.append("time",Platform.OS=='android'? tt : seletedtime);
    const { responseJson, err } = await requestPostApi(update_status, formdata, 'POST', user.token)
    setLoading(false)
    console.log('the update_status==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        handleCurrentDate()
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const submitforApproval = async (start, end) => {
    setLoading(true)

    let data = new FormData();
    data.append('start_date', start);
    data.append('end_date', end);
    data.append('duration', '15');
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(timesheet_request, data, 'POST', user.token)
    setLoading(false)
    console.log('the timesheet_request==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        handleCurrentDate()
        setalert_sms(responseJson.message)
        setMy_Alert(true)
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
  const getHome = async () => {
    setLoading(true)

    let formdata = new FormData();
    // formdata.append("date", withs=='date' ? mydate2 : dat);
    formdata.append("date", ' ');
    const { responseJson, err } = await requestPostApi(ChatService_list, formdata, 'POST', user.token)
    setLoading(false)
    console.log('the home==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {
        var myArr = []
        for (let i = 0; i < responseJson.data.length; i++) {
          myArr.push({ label: responseJson.data[i].service_name, value: responseJson.data[i].service_id })
        }
        // setgenderItems(myArr)
        //  setclick1(dat)
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
  const getTimeCard = async (start, end) => {

    setLoading(true)
    let formdata = new FormData();
    if (props.route.params.from != 'sidebar') {
      formdata.append("service_id", props.route.params.data.service_id);
    }
    formdata.append("pay_period_start", start);
    formdata.append("pay_period_end", end);
    console.log('===========================formdata=========service_name');
    console.log(formdata);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(service_timecard, formdata, 'POST', user.token)
    setLoading(false)
    console.log('the getTim=eCard==>>', responseJson)
    if (err == null) {
      if (responseJson.status) {

        const [y, m,d] = start.split('-');
        var newstart=`${m}-${d}-${y}`
        const [yy, mm,dd] = end.split('-');
        var newend=`${mm}-${dd}-${yy}`
        setDATA(responseJson.data)
        myfun(responseJson.data)
        var xyz = [
          {
            id: '1',
            title5: 'Pay Period',
            title6: newstart + '-' + newend,
          },
          {
            id: '2',
            title5: 'Team Member Name',
            title6: responseJson.data.name,
          },
          ]
        if (props.route.params.from != 'sidebar') {
          xyz.push(
            {
              id: '3',
              title5: 'Service',
              title6: props.route.params.data.service_name,
              
            }

          )
          xyz.push(
            {
              id: '3',
              title5: 'Service Location',
              title6: responseJson.data.job_location,
            }
          )
          xyz.push(
            {
              id: '4',
              title5: 'Client Name',
              title6: responseJson.data.store_name,
            }
          )
          xyz.push(
            {
              id: '5',
              title5: 'Client Number',
              title6: responseJson.data.store_number,
            }
          )
        }
        setDATA2(xyz)
      } else {
        setalert_sms(responseJson.message)
        setMy_Alert(true)
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }

  }
  const displaydateformates = (month, day, year) => {
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
  const dateformates = (month, day, year) => {
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
  const monthformates = (month) => {
    if (month == 'Jan') {
      return '01'
    } else if (month == 'Feb') {
      return '02'
    } else if (month == 'Mar') {
      return '03'
    } else if (month == 'Apr') {
      return '04'
    } else if (month == 'May') {
      return '05'
    } else if (month == 'Jun') {
      return '06'
    } else if (month == 'Jul') {
      return '07'
    } else if (month == 'Aug') {
      return '08'
    } else if (month == 'Sep') {
      return '09'
    } else if (month == 'Oct') {
      return '10'
    } else if (month == 'Nov') {
      return '11'
    } else if (month == 'Dec') {
      return '12'
    }
  }
  const subtractDays = (date, days) => {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() - days);
    return resultDate
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
  const onChangetime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if(Platform.OS=='android'){
      settimeModel(false)
      }
   
    // setDate(currentDate);
    var yy = currentDate.toString().substring(16, 21)
    console.log('====================================yy', yy);
   
    var mt = convertTimeTo12HourFormat(yy)
    // setdateplace2(mt)
    setseletedtime(mt)
    if(Platform.OS=='android'){
      updateStatus(mt)
      }
    setlode(!lode)
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || sdate;
    // setopenDateModal(Platform.OS === 'ios');
    if(Platform.OS=='android'){
      setopenDateModal(false)
    }
    setsDate(currentDate)
    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = displaydateformates(mm, dd, yy)
    var myApidate = dateformates(mm, dd, yy)
    setsdisplaydate(mydate)
    setsApidate(myApidate)
    // setopenDateModal(false)
    // setlode(!lode)
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || edate;
    // setopenDateModal2(Platform.OS === 'ios');
    if(Platform.OS=='android'){
      setopenDateModal2(false)
    }
    seteDate(currentDate);
    console.log('====================================');
    console.log(currentDate);
    console.log('====================================');

    var mm = currentDate.toString().substring(4, 7)
    var dd = currentDate.toString().substring(8, 10)
    var yy = currentDate.toString().substring(11, 15)
    var mydate = displaydateformates(mm, dd, yy)
    var myApidate = dateformates(mm, dd, yy)
    setedisplaydate(mydate)
    seteApidate(myApidate)

  };
  const checkCurrect=()=>{
    
        if (!DATA.timesheet_submitted) {
         
            var startd = new Date();
            var mm = startd.toString().substring(4, 7) //jan
            var dd = startd.toString().substring(8, 10)
            var yy = startd.toString().substring(11, 15)
            var newmm = monthformates(mm)
            var currentstartmonth = startOfMonth(startd)
            var currentmonth = endOfMonth(startd)
            var currentmonth = addDays(currentstartmonth, 14); 
            //privious month data
            const priviousdate = new Date(yy, parseInt(newmm-2),'01');
            var pmm = priviousdate.toString().substring(4, 7)
            var pdd = priviousdate.toString().substring(8, 10)
            var pyy = priviousdate.toString().substring(11, 15)
            var pnewmm = monthformates(pmm)
            var priviousstartmonth = startOfMonth(priviousdate)
            var priviousendmonth = endOfMonth(priviousdate)
            var m=parseInt(newmm-2)
            const halfmonth = new Date(yy, m, 16)
            var privioushalfmonth = addDays(priviousstartmonth, 14);
            //selected month data
            var durationEndDate = durationvaluedata.endDatas //2024-04-01
            var edate = durationEndDate.substring(8, 10)
            if (yearvalue == yy) {
              if (monthvalue != null && newmm == monthvalue || monthvalue==pnewmm && edate>15) {
             
              if(monthvalue==pnewmm && dd<15 && edate>15){
                //action
               return true
              }else if(monthvalue==newmm && dd>15 && edate==15){ 
                // action
                return true
              }else{
                //no action
                return false
              }
               
              } else {
                return false
              }
            } else {
              return false
            }
        } else {
          return true
        }
     
  }
  const editcheckCurrect=()=>{
    if (!DATA.timesheet_submitted) {
        var startd = new Date();
        var mm = startd.toString().substring(4, 7) //jan
        var dd = startd.toString().substring(8, 10)
        var yy = startd.toString().substring(11, 15)
        var newmm = monthformates(mm)
        var currentstartmonth = startOfMonth(startd)
        var currentmonth = endOfMonth(startd)
        var currentmonth = addDays(currentstartmonth, 14); 
        //privious month data
        const priviousdate = new Date(yy, parseInt(newmm-2),'01');
        var pmm = priviousdate.toString().substring(4, 7)
        var pdd = priviousdate.toString().substring(8, 10)
        var pyy = priviousdate.toString().substring(11, 15)
        var pnewmm = monthformates(pmm)
        var priviousstartmonth = startOfMonth(priviousdate)
        var priviousendmonth = endOfMonth(priviousdate)
        var m=parseInt(newmm-2)
        const halfmonth = new Date(yy, m, 16)
        var privioushalfmonth = addDays(priviousstartmonth, 14);
        //selected month data
        var durationEndDate = durationvaluedata.endDatas //2024-04-01
        var edate = durationEndDate.substring(8, 10)
        if (yearvalue == yy) {
          if (monthvalue != null && newmm == monthvalue || monthvalue==pnewmm && edate>15) {
         
          if(monthvalue==pnewmm && dd<15 && edate>15){
            //action
           return true
          }else if(monthvalue==newmm && dd>15 && edate==15){ 
            // action
            return true
          }else if(monthvalue==newmm){ 
            // action
            return true
          }else{
            //no action
            return false
          }
           
          } else {
            return false
          }
        } else {
          return false
        }
    } else {
      return true
    }
 
}
  return (
    <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>
      {/* <HomeHeaderComponent icon1={require('../../assets/images/Icons/firstline2.png')} press1={()=>{props.navigation.openDrawer()}} press2={()=>{props.navigation.navigate('Notification')}}/> */}

      <MyHeader title={'Time Cards'} onPress={() => { props.navigation.goBack() }} onPress2={() => { props.navigation.navigate('Notification') }} />


      {/* <View style={{width:'80%',alignSelf:'center',flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#D7E9F6',borderRadius:7,padding:5,marginTop:10,zIndex:-999}}>
                                 <TouchableOpacity style={{borderRadius:7,alignSelf: 'center',
                                     backgroundColor:'#fff',borderColor:'#7BC043',borderWidth:1,
                                    justifyContent:'center',margin:4,padding:7}} onPress={()=>{setopenDateModal(true)}}>
                                   <Image source={require('../../assets/images/Icons/calendra.png')} style={{height:25,width:25,resizeMode:'stretch',alignSelf:'center'}}></Image>
                                   </TouchableOpacity>

                                  <View style={{flexDirection:'row',justifyContent:'space-between',width:200,alignItems:'center'}}>
                                  <Text style={{color:'#23356F',fontWeight:'600',fontSize:12,alignSelf:'center'}}>{sdisplaydate}</Text>
                                  <View style={{width:20,height:1,backgroundColor:COLORS.Primary_Green}}  />
                                  <Text style={{color:'#23356F',fontWeight:'600',fontSize:12,alignSelf:'center'}}>{edisplaydate}</Text>
                                  </View>



                                   <TouchableOpacity style={{borderRadius:7,alignSelf: 'center',
                                     backgroundColor:'#fff',borderColor:'#7BC043',borderWidth:1,
                                    justifyContent:'center',margin:4,padding:7}} onPress={()=>{
                                      // setopenDateModal2(true)
                                      }}>
                                   <Image source={require('../../assets/images/Icons/calendra.png')} style={{height:25,width:25,resizeMode:'stretch',alignSelf:'center'}}></Image>
                                   </TouchableOpacity>
            </View> */}
      <ScrollView style={{ zIndex: -999 }}>
        <View style={{ width: '94%', alignSelf: 'center', zIndex: 999, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{
            width: '48%', alignSelf: 'center', zIndex: 999, marginTop: 15,
            shadowColor: '#000',
            backgroundColor: '#fff',
            borderRadius: widthScale(5),
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 3, borderWidth: 0.5,
            borderColor: COLORS.primary_white,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, width: '100%' }}>
              <Image style={{ width: 40, height: 40, resizeMode: 'stretch', marginRight: 5 }} source={require('../../assets/images/Icons/yearsCalender.png')}></Image>
              <DropDownPicker
                open={yearopen}
                value={yearvalue}
                items={generateYears()}
                setOpen={setyearOpen}
                setValue={setyearValue}
                setItems={setyearItems}
                onSelectItem={(item) => {
                  setlod(!lod)
                  console.log('====================================');
                  console.log(item);
                  console.log('====================================');
                }}
                placeholder='Year'
                placeholderStyle={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontFamily: FONTS.regular
                }}
                containerStyle={{
                  width: '75%'
                }}

                style={{
                  borderColor: 'transparent',
                  // borderRadius: widthScale(5),
                  // borderWidth: 0.5,
                  // borderColor: COLORS.primary_white,
                  // backgroundColor: '#fff',
                  width: '100%',
                  // alignSelf: 'center',
                  zIndex: 999,
                  // shadowColor: '#000',
                  // shadowOffset: {width: 1, height: 1},
                  // shadowOpacity: 0.4,
                  // shadowRadius: 2,
                  // elevation: 3,
                }}
              />
            </View>



          </View>


          <View style={{
            width: '48%', alignSelf: 'center', zIndex: 999, marginTop: 15,
            shadowColor: '#000',
            backgroundColor: '#fff',
            borderRadius: widthScale(5),
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 3, borderWidth: 0.5,
            borderColor: COLORS.primary_white,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, width: '100%' }}>
              <Image style={{ width: 40, height: 40, resizeMode: 'stretch', marginRight: 5 }} source={require('../../assets/images/Icons/calendress.png')}></Image>

              <DropDownPicker
                open={monthopen}
                value={monthvalue}
                items={monthitems}
                setOpen={setmonthOpen}
                setValue={setmonthValue}
                setItems={setmonthItems}
                onSelectItem={(item) => {
                  setlod(!lod)
                  handleSelectDate('month', yearvalue, item.value)
                }}
                placeholder='Month'
                placeholderStyle={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontFamily: FONTS.regular
                }}
                containerStyle={{
                  width: '75%'
                }}
                style={{
                  borderColor: 'transparent',
                  borderRadius: widthScale(5),
                  width: '100%',
                  // borderWidth: 0.5,
                  // borderColor: COLORS.primary_white,
                  // backgroundColor: '#fff',
                  // alignSelf: 'center',
                  zIndex: 999,
                  // shadowColor: '#000',
                  // shadowOffset: {width: 1, height: 1},
                  // shadowOpacity: 0.4,
                  // shadowRadius: 2,
                  // elevation: 3,
                }}
              />
            </View>
          </View>

        </View>


        <View style={{
          width: '94%', alignSelf: 'center', zIndex: 999, marginTop: 15,
          shadowColor: '#000',
          backgroundColor: Mycolors.AppGreen,
          borderRadius: widthScale(5),
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          elevation: 3, borderWidth: 0.5,
          borderColor: COLORS.primary_white, zIndex: -99
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, width: '100%', backgroundColor: Mycolors.AppGreen, borderRadius: widthScale(5), }}>
            <Image style={{ width: 25, height: 25, resizeMode: 'stretch', marginRight: 5, marginLeft: 7 }} source={require('../../assets/images/Icons/historye.png')}></Image>

            <DropDownPicker
              open={durationopen}
              value={durationvalue}
              items={durationitems}
              setOpen={setdurationOpen}
              setValue={setdurationValue}
              setItems={setdurationItems}
              onSelectItem={(item) => {
                setlod(!lod)
                setdurationValuedata(item)
                getTimeCard(item.startdats, item.endDatas)

              }}
              // textStyle={{
              //   color:'#fff'
              // }}
              labelStyle={{
                color: '#fff'
              }}
              placeholder='Select Duration'
              placeholderStyle={{
                color: '#fff',
                fontSize: 14,
                fontFamily: FONTS.regular
              }}
              containerStyle={{
                width: '89%'
              }}
              style={{
                borderColor: 'transparent',
                color: '#fff',
                // borderRadius: widthScale(5),
                // borderWidth: 0.5,
                // borderColor: COLORS.primary_white,
                backgroundColor: Mycolors.AppGreen,
                // alignSelf: 'center',
                zIndex: 999,
                width: '100%'
                // shadowColor: '#000',
                // shadowOffset: {width: 1, height: 1},
                // shadowOpacity: 0.4,
                // shadowRadius: 2,
                // elevation: 3,
              }}
            />
          </View>
        </View>
       

        <View style={{ width: '96%', alignSelf: 'center', zIndex: -999 }}>

          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20,
          }}>

            {/* <View style={{width:'90%',alignSelf:'center',marginTop:15,}}>
                <Image style={{ width: 30, height: 30, resizeMode: 'stretch',left:10}} source={require('../../assets/images/Icons/hclock.png')} />
                </View> */}

            <View style={{ marginTop: 15 }}>
              <FlatList
                data={DATA2}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ flexDirection: 'row', width: '95%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center' }}>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, marginLeft: 13 }}>{item.title5}:  </Text>
                        <View style={{ width: '70%' }}>
                          <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 12, }}>{item.title6}</Text>
                        </View>
                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                    </>

                  )
                }} />
            </View>





          </View>
          {DATA?.timesheet.length > 0 ?
            <>
              <View style={{
                width: '98%', borderRadius: 7, alignSelf: 'center',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowRadius: 2,
                shadowOpacity: 0.2,
                elevation: 3,
                marginTop: 20,
              }}>


                <View style={{ marginTop: 10 }}>
                  <FlatList
                    data={DATA?.timesheet}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          <View style={{ alignSelf: 'center', width: '90%', paddingHorizontal: 10 }}>
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, }}>Week: {index + 1}</Text>
                          </View>
                          <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />
                          <View style={{ flexDirection: 'row', width: '95%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '33%' }}>
                              <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, }}>Total hours</Text>
                              <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 14, marginTop: 7, }}>{item.total_hours_in_week_format}</Text>
                            </View>
                            <View style={{ width: '33%' }}>
                              <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, textAlign: 'center' }}>Total Days Worked</Text>
                              <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 14, marginTop: 7, textAlign: 'center' }}>{item.total_days_worked}</Text>
                            </View>
                            <View style={{ width: '33%' }}>
                              <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, textAlign: 'right' }}>Average hours</Text>
                              <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 14, marginTop: 7, textAlign: 'right' }}>{item.avg_hours_in_week}</Text>
                            </View>

                          </View>
                          <View style={{ width: '100%', height: 1, backgroundColor: '#E7EAF1', marginVertical: 10 }} />

                        </>

                      )
                    }} />
                </View>

                <View style={{ flexDirection: 'row', width: '96%', alignItems: 'center', paddingHorizontal: 10, alignSelf: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 5 }}>
                  <Text style={{ color: '#000', fontWeight: '600', fontSize: 12, marginLeft: 15 }}>TOTAL</Text>
                  <Text style={{ color: Mycolors.BlueText, fontWeight: '700', fontSize: 15, marginLeft: 13 }}>{DATA?.total_hours}</Text>
                </View>



              </View>
              <View style={{ width: '92%', alignSelf: 'center', borderRadius: 8, backgroundColor: '#426FB5', flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: 20 }}>
                <Image style={{ width: 25, height: 25, alignSelf: "center" }} source={require("../../assets/images/Icons/infocircle.png")} ></Image>
                <Text style={{ color: '#fff', marginLeft: 10, width: '84%' }}>1st Through the 15 Paid on the 22nd, 16th
                  through the 30th/31st paid on the 7th</Text>
              </View>
            </>
            :
            <Text style={{ color: '#000', fontWeight: '700', fontSize: 15, marginLeft: 13, textAlign: 'center', marginTop: 20 }}>No data found</Text>
          }


          {tabledataarray.map((data, index) => {
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

                <View style={{}}>
                  <Text style={{ color: '#000', fontWeight: '500', fontSize: 14, marginLeft: 13, marginVertical: 10 }}>Daily hours worked week {index + 1}</Text>

                  <View style={styles.container}>
                    <ScrollView horizontal={true}>
                      <View>
                    <View style={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Table >
                        {/* borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }} */}
                                <TableWrapper key={index} style={{ flexDirection: 'row', }}>
                                  {[...tableHead,'Incident Report'].map((cellData, cellIndex) => (
                                        <View style={{ height: 40, width: 100, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center' }}>
                                          <Text style={{ flexDirection: 'row', width: 100, textAlign: 'center',fontWeight:'bold' }}>{cellData!='' ? cellData:'Ashish'}</Text>
                                        </View>
                                  ))}
                                </TableWrapper>
                        </Table>
                        </View>
                        <ScrollView style={styles.dataWrapper}>
                        <View style={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                          <Table >
                            {
                              data.tablesData.map((rowData, index) => (
                                <TableWrapper key={index} style={{ flexDirection: 'row', }}>
                                  {rowData.map((cellData, cellIndex) => (
                                    <>
                                      {cellIndex > 1 && cellIndex < 4  && editcheckCurrect() && !DATA.timesheet_submitted?
                                        <TouchableOpacity style={{ height: 40, width: 100, borderWidth: 0.5, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}
                                          onPress={() => {
                                            setclickeditem(cellData)
                                            setclickedDate(rowData)
                                            setcellIndex(+cellIndex + 1)
                                            settimeModel(true)
                                          }}
                                        >
                                          <Image source={require('../../assets/images/Icons/hclock.png')} style={{ width: 20, height: 20, marginHorizontal: 5 }}></Image>
                                          <Text style={{ flexDirection: 'row', width: 100, }}>{cellData.label}</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ height: 40, width: 100, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center' }}>
                                          <Text style={{ flexDirection: 'row', width: 100, textAlign: 'center' }}>{cellData.label}</Text>
                                        </View>
                                      }
                                    </>
                                  ))}
                                </TableWrapper>
                              ))
                            }
                          </Table>
                          </View>
                        </ScrollView>
                      </View>
                    </ScrollView>
                  </View>


                </View>

                <View style={{ width: '100%', height: 50, alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: '#426FB5', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 20, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>TOTAL</Text>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{data.Total}</Text>
                </View>

              </View>
            )
          })}

          {DATA?.timesheet.length > 0 && props.route.params.from == 'sidebar' && checkCurrect()  ?
            <TouchableOpacity style={{ width: '98%', height: 50, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.AppGreen, marginTop: 15, justifyContent: 'center', }}
              onPress={() => {
                if (!DATA.timesheet_submitted) {
                  if (durationvalue != null) {
                    //current month data
                    var startd = new Date();
                    var mm = startd.toString().substring(4, 7) //jan
                    var dd = startd.toString().substring(8, 10)
                    var yy = startd.toString().substring(11, 15)
                    var newmm = monthformates(mm)
                    var currentstartmonth = startOfMonth(startd)
                    var currentmonth = endOfMonth(startd)
                    var currentmonth = addDays(currentstartmonth, 14); 
                    //privious month data
                    const priviousdate = new Date(yy, parseInt(newmm-2),'01');
                    var pmm = priviousdate.toString().substring(4, 7)
                    var pdd = priviousdate.toString().substring(8, 10)
                    var pyy = priviousdate.toString().substring(11, 15)
                    var pnewmm = monthformates(pmm)
                    var priviousstartmonth = startOfMonth(priviousdate)
                    var priviousendmonth = endOfMonth(priviousdate)
                    var m=parseInt(newmm-2)
                    const halfmonth = new Date(yy, m, 16)
                    var privioushalfmonth = addDays(priviousstartmonth, 14);
                    //selected month data
                    var durationEndDate = durationvaluedata.endDatas //2024-04-01
                    var edate = durationEndDate.substring(8, 10)
                    console.log('====================================halfmonth',halfmonth,priviousdate);
                    console.log('====================================priviousmonth',priviousstartmonth);
                    console.log('====================================monthvalue',monthvalue);
                    console.log('====================================newmm',newmm);
                    console.log('====================================pnewmm',pnewmm,pdd);
                    console.log('====================================edate',edate);
                    if (yearvalue == yy) {
                      if (monthvalue != null && newmm == monthvalue || monthvalue==pnewmm && edate>15) {
                     
                      if(monthvalue==pnewmm && dd<15 && edate>15){
                        //action
                        submitforApproval(durationvaluedata.startdats, durationvaluedata.endDatas)
                        console.log('====================================pass1');
                      }else if(monthvalue==newmm && dd>15 && edate==15){ 
                        // action
                        submitforApproval(durationvaluedata.startdats, durationvaluedata.endDatas)
                        console.log('====================================pass2');
                      }else{
                        //no action
                          setalert_sms('select perfact duration')
                          setMy_Alert(true)
                        console.log('====================================fail');
                      }
                       
                      } else {
                        setalert_sms('Month will be same as current month')
                        setMy_Alert(true)
                      }
                    } else {
                      setalert_sms('Year will be same as current year')
                      setMy_Alert(true)
                    }

                  } else {
                    var currentDate = new Date();
                    var ddc = currentDate.toString().substring(8, 10)
                    if (ddc > 15) {
                      submitforApproval(durationitems[1].startdats, durationitems[1].endDatas)
                    } else {
                      submitforApproval(durationitems[0].startdats, durationitems[0].endDatas)
                    }
                  }

                } else {
                  // setalert_sms('No TimeCard Found')
                  // setMy_Alert(true)
                }

              }}>
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: '600' }}>{!DATA.timesheet_submitted ? 'Submit Time Card For Approval' : DATA.timesheet_status=='Pending' ? 'This timesheet is already submited':DATA.timesheet_status=='Approved'? 'Timesheet Approved':DATA.timesheet_status=='Rejected'? 'Timesheet Rejected':''}</Text>
            </TouchableOpacity>

            : null}



        </View>
        <View style={{ width: 100, height: 100 }} />
      </ScrollView>

      {DATA?.timesheet.length > 0 ?
        <View style={{ width: '94%', height: 45, position: 'absolute', bottom: 5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}>
          <TouchableOpacity style={{ width: '80%', height: 45, borderRadius: 30, justifyContent: 'center' }}>

          </TouchableOpacity>

          <TouchableOpacity style={{ width: 45, height: 45, borderRadius: 30, justifyContent: 'center', backgroundColor: Mycolors.AppGreen }}
            onPress={() => { Linking.openURL(DATA.pdf) }}>
            <Image style={{ width: 30, height: 32, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../assets/images/Icons/storage.png')}></Image>
          </TouchableOpacity>

        </View>
        : null}
      {timeModel ?
        <View style={{ backgroundColor: '#fff', zIndex: 999, position: 'absolute', width: '100%', bottom: 0 }}>

          <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10, zIndex: 999 }}>
            <TouchableOpacity onPress={() => { settimeModel(false) }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              //FireAPI
              updateStatus('')
              settimeModel(false)
            }}>
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
            onChange={onChangetime}
          />
        </View>

        : null}

      {opendateModal ?
        <View style={{ backgroundColor: '#fff', zIndex: 999, position: 'absolute', width: '100%', bottom: 0 }}>
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
            value={sdate}
            mode="date"
            minimumDate={startOfMonth(new Date())}
            maximumDate={endOfMonth(new Date())}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </View>

        : null}
      {opendateModal2 ?
        <View style={{ backgroundColor: '#fff', zIndex: 999, position: 'absolute', width: '100%', bottom: 0 }}>
          <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={() => { setopenDateModal2(false) }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setopenDateModal2(false)
              // getTimeCard(sApidate,eApidate,sdisplaydate,edisplaydate,gendervalue)
            }}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={edate}
            mode="date"
            is24Hour={true}
            minimumDate={sdate}
            display="spinner"
            onChange={onChange2}
          />
        </View>
        : null}

      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 12 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' }
});
export default TimeCard

