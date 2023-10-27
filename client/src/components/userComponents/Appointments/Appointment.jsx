import { useEffect, useState } from 'react'
import './Appointments.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import axios from '../../../Services/axios'
 import { setAppointment } from '../../../redux/appointment'
//  import Stripe from 'stripe';


function Appointment() {
  const dispatch = useDispatch()
    const navigate = useNavigate()

    const docData = useSelector(state => state.selectedDoc.doc)
    const userData = useSelector(state => state.user.data)


const [schedule, setSchedule] = useState([])
const [sessionDate, setSessionDate] = useState('Date')
const [sessionTime, setSessionTime] = useState('Time')
const [errMsg, setErrMsg] = useState('')
const [timeList, setTimeList] = useState(['No data'])
const [issues, setIssues] = useState('')

useEffect(()=>{
     try {
      async function dataCall() {
      const res= await axios.get(`/docSchedule/${docData._id}`)
      if (res.data=='blocked') {
        navigate("/login")
        localStorage.removeItem('userToken')
      }
      setSchedule(res.data)
  }
  dataCall()
} catch (error) {
  console.log(error);
}
  
},[docData._id, docData.doctorData, navigate])


const handleDate = (date) => {
  setSessionDate(date)
  const list = schedule.filter(el => el.date == date)
  setTimeList(list[0].time)
}


const handlePayement=async()=>{

 try {
  if (sessionDate == 'Date' || sessionTime == 'Time') {
    setErrMsg('Please select session date and time')
} else {
  const data = {
    doctor: docData._id,
    user: userData._id,
    date: sessionDate,
    time: sessionTime,
    issues: issues,
    fee: docData.fee,
    doctorName:docData.name
}
dispatch(setAppointment(data))
 const res=await axios.post(`/create-checkout-session`,data)
 if (res.data.url) {
  window.location.href=res.data.url
  navigate('/sucess')
 }
}
 } catch (error) {
  navigate(-1)
 }
}



  return (
    <>
            <div className=" slice mx-auto text-center mt-5 p-4 app-div" style={{ maxWidth: "800px" }}>
                {errMsg ? <div className='mt-3 alert-danger alert'>{errMsg}</div> : ''}
                   <h3><b> Book Your Appointments</b></h3>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-12 mt-5 text-center">
                                <h4><b>Patient Details</b></h4>
                            </div>
                            <div className="col-5   text-end">
                                <p>         Name :</p>
                                <p>          Age :</p>
                                <p>       Gender :</p>
                                <p>      Address :</p>
                                <p>Health issues :</p>
                            </div>
                            <div className="col-7">
                                <p>{userData.userName?userData.userName:' '}</p>
                                <p>{userData?.age}</p>
                                <p>{userData.gender?userData.gender:' '}</p>
                                <p>{userData.address?userData.address:' '}</p>
                                <textarea name="issues" id="" value={issues} onChange={(e) => setIssues(e.target.value)} className='form-control' cols="30" rows="5" placeholder='Enter your health issues here...' />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-12 mt-5 text-center">
                                <h4><b>Doctor Details</b></h4>
                            </div>
                            <div className="col-12 text-center">
                                <h5>Dr.{docData?.name}</h5>
                                <div className='text-secondary'>{docData.doctorData ? docData?.doctorData[0]?.name : ''}</div>
                                <div className='text-secondary'>{docData?.qualification}</div>
                                <div><b>Fee : {'   '}   {' '} <span className='text-success'>{docData.fee}</span></b></div>
                                <div className=''>
                                    <b>Session Timing </b>
                                    <div className="dropdown">
                                        <button className="btn p-1 bg-light btn-outline-dark mt-2 text-dark drpp dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ maxWidth: '150px', minWidth: '100px', fontSize: "14px" }}>
                                            {sessionDate}
                                        </button>
                                        <ul className="dropdown-menu dateDrop">
                                            {schedule && schedule.map(el => {
                                                return (<li key={el.date} > <Link className='appLink' onClick={() => handleDate(el.date)}>{el.date}</Link></li>)
                                            })}
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn drpp p-1 bg-light btn-outline-dark mt-2  text-dark dropdown-toggle" style={{ maxWidth: '150px', minWidth: '100px', fontSize: "14px" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {sessionTime}
                                        </button>
                                        <ul className="dateDrop dropdown-menu">
                                            {timeList && timeList.map((el,index) => <li key={index}><Link className='appLink' onClick={() => setSessionTime(el)}>{el}</Link></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-center align-items-center">
                        <button className='btn p-1 btn-outline-success' onClick={handlePayement}>Book Appointment <BsPlusLg style={{ marginTop: '-2px' }} /></button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Appointment