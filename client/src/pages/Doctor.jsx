import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from "../components/Signup"


function Doctor() {


  return (
    <>
     <Routes>
     <Route path='/signup' element={<Signup value={'doctor'} />} />
     <Route path='/otp' element={<Otp value={'doctor'} />} />

     </Routes>
    </>


  )
}

export default Doctor