import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from '../components/Signup'
import Otp from '../components/Otp'
import Login from '../components/Login'
import ProfilePageStructure from '../components/userComponents/Pages/UserProfile/ProfilePageStructure'
import RequireUser from '../context/auth/RequireUser'
import ForgotPassword from '../components/ForgotPassword'


function User() {
  return (
    <>
    <Routes>
  <Route path='/' element={<HomePage />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/otp' element={<Otp />} />
  <Route path='/login' element={<Login />} />
  <Route path='/forgotpassword' element={<ForgotPassword />} />

  <Route  element={<RequireUser />}>
    <Route path='/profile' element={<ProfilePageStructure user="user" />} />
  </Route>
</Routes>
    </>
  )
}

export default User