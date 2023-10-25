import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from '../components/Signup'
import Otp from '../components/Otp'
import Login from '../components/Login'
import ProfilePageStructure from '../components/userComponents/Pages/UserProfile/ProfilePageStructure'
import RequireUser from '../context/auth/RequireUser'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import Navbar from '../components/Navbar'
import UserHome from '../components/userComponents/UserHome'
import DoctorSearchPageStructure from '../components/userComponents/Pages/DoctorSearchPageStructure'
// import UserAppointments from '../components/userComponents/UserAppointments/UserAppointments'
import Appointment from '../components/userComponents/Appointments/Appointment'
import Payment from '../components/userComponents/Payment'
import Success from '../components/userComponents/sucess'
import VedioCall from '../components/VedioCall'
import FeedBack from '../components/userComponents/feedBack'
import RoomPage from '../components/RoomPage'
// import Ratings from '../components/Ratings'

function User() {
  return (
    <>
    
    <Routes>
  <Route path='/' element={<HomePage />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/otp' element={<Otp />} />
  <Route path='/login' element={<Login />} />
  <Route path='/forgotpassword' element={<ForgotPassword />} />
  <Route path='/newPassword/:email' element={<ResetPassword />}/>
  <Route path='/sucess' element={<Success />} />
  <Route path='/feedBack' element={<FeedBack />} />

  
  {/* <Route path="/feedbacks" element={<Ratings />} /> */}
  <Route path='/profile' element={<ProfilePageStructure user="user" />} />
  {/* <Route path='/call/:room' element={<VedioCall value='user' />} /> */}
  <Route path='/call/:room' element={<RoomPage value='user' />} />

  

  <Route  element={<Navbar />} />
  <Route  element={<RequireUser />}>
    <Route path='/findDoctor' element={<DoctorSearchPageStructure />} />
    <Route path='/appointments' element={<Appointment />} />
    <Route path='/payment' element={<Payment />} />
   



  </Route>
</Routes>
    </>
  )
}

export default User