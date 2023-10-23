import { useCallback, useEffect, useState } from 'react';
// import DownloadButton from './download';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from '..//../Services/axios';

function Prescription() {
const navigate=useNavigate()
const userData=useSelector(state=>state.user.data)
const [prescriptions,setPrescriptions]=useState([])
console.log(prescriptions,"userData",10); 

const id=userData
const DataCall=useCallback(async()=>{
  try {
    const res=await axios.post(`/priscriptions`,id)
    setPrescriptions(res.data)
    console.log("hello",res.data[0]);


  } catch (error) {
    console.log(error);
  }
},[])

useEffect(()=>{
  DataCall()
},[DataCall])

  return (
  
    <div className=" container   d-flex justify-content-center ">
     <div className=" text-center  m-5 " style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                width:'80%',
                backgroundColor:'light'
              }}>
        <h1>priscription</h1>
        {
  Array.isArray(prescriptions) && prescriptions.length > 0 && prescriptions.map((el, index) => {
    return (
            <>
              <div key={index} className="card p-3">
                <div className="row">

                  <div className="col-md-4">
                    <h4>{el.doctor.name}</h4>
                    <h6>{el.date}</h6>
                    <h6>{el.time}</h6>
                    <h5> {el[0].medicines}</h5>
                  </div>
                  <div className="col-md-4">
                  
  <h5>hello {el.medicine}</h5>
  {el.medicines && Array.isArray(el.medicines) ? (
    el.medicines.map((medicine, index) => (
      <div key={index}>
        <b>Medicine</b>: {medicine.medicine}, <b>Selected Dose</b>: {medicine.selectedDose}
      </div>
    ))
  ) : (
    <div>
      <b>Medicine</b>: {el.medicines.medicine}, <b>Selected Dose</b>: {el.medicines.selectedDose}
    </div>
  )}


</div>





                  {/* <div className="col-md-4">
                    {
                      el.medicines &&
                      <DownloadButton el={el} user={userData} />
                    }
                  </div> */}
                </div>
              </div>
            </>
          )
        })}


      </div>
    </div>
  



 
  )
}

export default Prescription