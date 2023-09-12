import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from "../components/Signup"
import Otp from '../components/Otp'
import Login from "../components/Login";
import DocMain from '../components/DoctorComponents/DocMain';


function Doctor() {


  return (
    <>
     <Routes>
     <Route path='/signup' element={<Signup value={'doctor'} />} />
     <Route path='/otp/:token' element={<Otp value={'doctor'} />} />
     <Route path='/login' element={<Login value={'doctor'} />} />
     <Route path='/registration' element={<Login value={'doctor'} />} />


     <Route path='/' element={<DocMain value={'home'}/>} />

     </Routes>
    </>


  )
}

export default Doctor