import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from '../components/Signup'
import Otp from '../components/Otp'
import Login from '../components/Login'


function User() {
  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage />} ></Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/login' element={<Login />} />

  </Routes>
    </>
  )
}

export default User