import React from 'react'
import BarChart from "../chart"

import { BiRupee } from "react-icons/bi"
import { FaIdCard } from "react-icons/fa"
function DoctorHome() {
  return (
  //   <>
  //   <div className="col-md-9 col-lg-9 m-0" style={{
  //         background: "linear-gradient(to bottom, rgb(190, 181, 199), #002147)",
  //       }}>
  //     <div className='row m-auto' >
  //       <div className="col-lg-6">
  //         <div className='dataButton m-4'>

  //           <h5> <BiRupee /> Total Income</h5>
  //           {/* <h4> {income && income}</h4> */}
  //         </div>
  //       </div>
  //       <div className="col-lg-6">
  //         <div className='dataButton m-4'>
  //           <h5><FaIdCard /> Total appointments</h5>
  //           {/* <h4>{patients && patients}</h4> */}
  //         </div>
  //       </div>
  //       <BarChart  />

  //     </div>
  //   </div>

  // </>


  <>
  <div className="col-md-9 col-lg-9 m-0">
    <div className='row m-auto' >
      <div className="col-lg-6">
        <div className='dataButton m-4'>

          <h5> <BiRupee /> Total Income</h5>
          <h4> </h4>
        </div>
      </div>
      <div className="col-lg-6">
        <div className='dataButton m-4'>
          <h5><FaIdCard /> Total appointments</h5>
          <h4></h4>
        </div>
      </div>

    </div>
    <BarChart  />
  </div>

</>

  )
}

export default DoctorHome