import React from 'react'
import BarChart from "../chart"

import { BiRupee } from "react-icons/bi"
import { FaIdCard } from "react-icons/fa"
function DoctorHome() {
  return (
    <>
    <div className="col-md-8 col-lg-9 m-5 mt-0 " style={{ width:'96%', height:'110vh'}}>
      <div className='row m-auto' >
        <div className="col-lg-6">
          <div className='dataButton m-4'>

            <h5> <BiRupee /> Total Income</h5>
            {/* <h4> {income && income}</h4> */}
          </div>
        </div>
        <div className="col-lg-6">
          <div className='dataButton m-4'>
            <h5><FaIdCard /> Total appointments</h5>
            {/* <h4>{patients && patients}</h4> */}
          </div>
        </div>
        

      </div>
      <div style={{
          background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Add this line for box shadow
          paddingRight:"35px",
        }}>
        <BarChart  />
        </div>
    </div>

  </>




  )
}

export default DoctorHome