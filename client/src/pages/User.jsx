import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Signup from '../components/Signup'
import Otp from '../components/Otp'
import HomePage from './HomePage'

function User() {
  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage />} ></Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
  </Routes>
    </>
  )
}

export default User