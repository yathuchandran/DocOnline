import React, { useCallback } from 'react'
import { MdPerson, MdOutlineSick } from 'react-icons/md';
import { FaStethoscope } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';



import './admin.css'
import { useNavigate } from 'react-router';

function AdminSidebar() {
    const navigate =useNavigate()

    const handleDashboard = useCallback(() => {
        navigate('/admin/')
    }, [navigate])
    const handleDoctor = useCallback(() => {
        navigate('/admin/doctors')
    }, [navigate])
    const handlePatient=useCallback(()=>{
       
        navigate('/admin/patients')
    },[navigate])

    const handleDepartment = useCallback(() => {
        navigate('/admin/departments')
    }, [navigate])
  return (
    <>
        <div className='bg-black z-10 top-0 left-0' style={{ left: '0%', top: '100%' ,}}>
                <div className='sidebar adminSide bg-dark fixed top-0 right-0 h-100 z-10  '>
                    <h2 className=' p-4 text-white'style={{backgroundColor: "#002147", color:'blue'}}>
                        Admin
                    </h2>
                    <nav >
                        <div className='flex flex-col text-white t'  style={{ backgroundColor: "#002147", color: 'white',height: '85rem' }}>
                            <div className='text-xl buttons py-4 flex'onClick={handleDashboard}  ><button className='btn'><MdPerson size={25} className='mr-4'/> Dashboard</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handleDoctor}><button className='btn'><FaStethoscope size={25} className='mr-4' /> Doctors</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handlePatient}><button className='btn'><MdOutlineSick size={25} className='mr-4' /> Patients</button></div>
                            <div className='text-xl buttons py-4 flex' onClick={handleDepartment}><button className='btn'><BiBuildings size={25} className='mr-4' />Department</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'>Payments</button></div>
                            <div className='text-xl buttons py-4 flex' > <button className='btn'>Medicines</button></div>
                        </div>
                    </nav>
                    </div>
                    </div>
    </>

  )
}

export default AdminSidebar