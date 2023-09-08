import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../components/Login'
import RequireAdmin from '../context/auth/requireAdmin'

function Admin() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login value={'admin'}/>} />
            <Route element={<RequireAdmin />}/>

        </Routes>
    </div>
  )
}

export default Admin