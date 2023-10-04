import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../components/Login'
import RequireAdmin from '../context/auth/requireAdmin'
import BasePage from '../components/adminComponents/BasePage'
import Navbar from '../components/Navbar'

function Admin() {
  return (
    <div>
      <Navbar value='admin' />
        <Routes>
            <Route path="/login" element={<Login value={'admin'}/>} />

            <Route element={<RequireAdmin />}/>
            <Route path="/" element={<BasePage value={'home'} user={'admin'}/>} />
            <Route path="/doctors" element={<BasePage value={"doctors"} user={"admin"} />} />
            <Route path="/departments" element={<BasePage value={"departments"} user={"admin"} />} />
            <Route path="/patients" element={<BasePage value={"patients"} user={"admin"} />} />


        </Routes>
    </div>
  )
}

export default Admin