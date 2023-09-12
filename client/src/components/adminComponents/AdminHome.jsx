import axios from "../../Services/axios";
import { FaIdCard } from 'react-icons/fa';

import React, { useEffect, useState } from 'react'

function AdminHome() {

    // const [patients,setPatients]=useState('')
    // const adminToken=localStorage.getItem('adminToken')

    // const dataCall = async () => {
    //     const res = await axios.get('admin/incom', {
    //       headers: {
    //         authorization: `Bearer ${adminToken}`,
    //       },
    //     });
    //     setPatients(res.data.length);
    //   };
      
    //   useEffect(() => {
    //     dataCall();
    //   }, [adminToken]);
      
  return (
    <div>
        <div className="col-md-9 col-lg-9 m-0">
        <div className='row m-auto' >
        <div className="col-lg-6">
            {/* <div className='dataButton m-4'>
              <h5><FaIdCard /> Total appointments</h5>
              <h4>{patients && patients}</h4>
            </div> */}
          </div>

        </div>
        </div>

        njkdsfndkdkjfg
    </div>
  )
}

export default AdminHome