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
  <Route  element={<Navbar />} />
  <Route  element={<RequireUser />}>
    <Route path='/profile' element={<ProfilePageStructure user="user" />} />
    <Route path='/findDoctor' element={<DoctorSearchPageStructure />} />

  </Route>
</Routes>
    </>
  )
}

export default User