import { useEffect, useState } from 'react'
import './Appointments.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import axios from '../../../Services/axios'
// import { setAppointment } from '../../../redux/appointment'

function Appointment() {
  const dispatch = useDispatch()
    const navigate = useNavigate()

    const docData = useSelector(state => state.selectedDoc.doc)
    const userData = useSelector(state => state.user.data)

    console.log(docData,16);

const [schedule, setSchedule] = useState([])
const [sessionDate, setSessionDate] = useState('Date')
const [sessionTime, setSessionTime] = useState('Time')
const [errMsg, setErrMsg] = useState('')
const [timeList, setTimeList] = useState(['No data'])
const [issues, setIssues] = useState('')

useEffect(()=>{
  async function dataCall() {
    console.log("dataCall---fun");
    try {
      const res= await axios.get(`/docSchedule/${docData._id}`)
      console.log(res.data,"ressssssssssssssssssssssss----27")
      if (res.data=='blocked') {
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  dataCall()
  
})


  return (
    <div>Appointment</div>
  )
}

export default Appointment