import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../components/Login'
import RequireAdmin from '../context/auth/requireAdmin'
import BasePage from '../components/adminComponents/BasePage'

function Admin() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login value={'admin'}/>} />
            <Route element={<RequireAdmin />}/>
            <Route path="/" element={<BasePage value={'home'} user={'admin'}/>} />


        </Routes>
    </div>
  )
}

export default Admin