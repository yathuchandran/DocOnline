import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from "../components/Signup"
import Otp from '../components/Otp'
import Login from "../components/Login";


function Doctor() {


  return (
    <>
     <Routes>
     <Route path='/signup' element={<Signup value={'doctor'} />} />
     <Route path='/otp/:token' element={<Otp value={'doctor'} />} />
     <Route path='/login' element={<Login value={'doctor'} />} />

     </Routes>
    </>


  )
}

export default Doctor