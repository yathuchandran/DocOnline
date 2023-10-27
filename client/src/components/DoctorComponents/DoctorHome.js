import React, { useEffect,useState } from 'react'
import BarChart from "../chart"

import { BiRupee } from "react-icons/bi"
import { FaIdCard } from "react-icons/fa"
import axios from '../../Services/axios'
import { useSelector } from 'react-redux'


function DoctorHome() {
  const [income, setIncome] = useState('')
  const [patients, setPatients] = useState('')
  const [patientss, setPatientss] = useState('')

  const [docAppoint, setDocAppoint] = useState([])
  const docData = useSelector((state) => state.doctor.data);

  const docId=docData.docData?._id


  useEffect(()=>{
   try {
    async function dataCall() {
      const res=await axios.post(`/doctor/dash`,{docId})
      setDocAppoint(res.data)
      setPatients(res.data.length)
      setPatientss(res.data.length)

      const inc=res.data.reduce((total,amount)=>{
        return total=total+amount.amount
      },0)
      setIncome(inc)
     }
     dataCall()
   } catch (error) {
    console.error("An error occurred:", error);

   }
  },[])
  return (
    <>
    <div className="col-md-8 col-lg-9 m-5 mt-0 " style={{ width:'96%', height:'110vh'}}>
    <div className='row m-auto justify-content-center align-items-center pl'>
  <div className="col-lg-4">
    <div className=' bg-light  m-3 text-center 'style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
              }}>
      <h5><BiRupee /> Total Income</h5>
      <h4 className='m-auto'>{income && income}</h4>
    </div>
  </div>
  <div className="col-lg-4">
  <div className=' bg-light  m-3 text-center 'style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
              }}>      <h5><FaIdCard />  Appointments</h5>
      <h4 className='m-auto'>{patients && patients}</h4>
    </div>
  </div>
  <div className="col-lg-4">
  <div className=' bg-light  m-3 text-center 'style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
              }}>      <h5><FaIdCard />  patients</h5>
      <h4 className='m-auto'>{patientss && patientss}</h4>
    </div>
  </div>
</div>

        

     
      <div style={{
          // background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Add this line for box shadow
          paddingRight:"35px",
        }}>
        <BarChart appoints={docAppoint}/>
        </div>
    </div>

  </>




  )
}

export default DoctorHome