import React, { useCallback } from 'react'
import { MdPerson, MdOutlineSick } from 'react-icons/md';

import './admin.css'
import { useNavigate } from 'react-router';

function AdminSidebar() {
    const navigate =useNavigate()

    const handlePatient=useCallback(()=>{
       
        navigate('/admin/patients')
    },[navigate])


  return (
    <div>
        <div className='bg-black z-10 top-0 left-0' style={{ left: '0%', top: '10%' ,}}>
                <div className='sidebar adminSide bg-white fixed top-0 right-0 h-100 z-10  '>
                    <h2 className=' p-4 text-white'style={{backgroundColor: "#002147", color:'blue'}}>
                        Admin
                    </h2>
                    <nav >
                        <div className='flex flex-col text-white' style={{ backgroundColor: "#002147", color: 'white' }}>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'> Dashboard</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'> Doctors</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handlePatient}><button className='btn'><MdOutlineSick size={25} className='btn' /> Patients</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'>Department</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'>Payments</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'>Medicines</button></div>
                        </div>
                    </nav>
                    </div>
                    </div>
    </div>

  )
}

export default AdminSidebar