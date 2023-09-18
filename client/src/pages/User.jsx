import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from '../components/Signup'
import Otp from '../components/Otp'
import Login from '../components/Login'
import ProfilePageStructure from '../components/userComponents/Pages/UserProfile/ProfilePageStructure'


function User() {
  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage />} ></Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfilePageStructure user={"user"}/>} />


  </Routes>
    </>
  )
}

export default User