import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from "../components/Signup"
import Otp from '../components/Otp'
import Login from "../components/Login";
import DocMain from '../components/DoctorComponents/DocMain';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import DoctorReg from '../components/DoctorComponents/DoctorReg';
import RequireDoctor from '../context/auth/RequireDoctor';
import Navbar from '../components/Navbar';
import SetProfile from '../components/DoctorComponents/SetProfile';

function Doctor() {


  return (
    <>
     <Routes>
     <Route path='/signup' element={<Signup value={'doctor'} />} />
     <Route path='/otp/:token' element={<Otp value={'doctor'} />} />
     <Route path='/login' element={<Login value={'doctor'} />} />
     <Route path='/registration' element={<DoctorReg value={'doctor'} />} />
     <Route path='/forgotPassword' element={<ForgotPassword value={'doctor'} />} />
     <Route path='/newPassword/:email' element={<ResetPassword value={'doctor'} />} />

     <Route  element={<RequireDoctor />}>

     <Route path='/' element={<DocMain value={'home'}/>} />
     <Route path='/setprofile' element={<SetProfile />} />

     </Route>


     </Routes>
    </>


  )
}

export default Doctor