import axios from "../../../Services/axios";
import {useCallback, useEffect, useState} from "react";

function UserAppointments() {
  const [appointments, setAppointments] = useState('');
  const userToken = localStorage.getItem('userToken');


  useEffect(()=>{
    async function dataCall(){
      const res=await axios.get(`/appointments`)
      console.log(res,11,"res");
    }
    dataCall()
  })


  // const handleAppointments=useCallback(async(id)=>{
  //   console.log(id,"id--9");
  //   try {
  //     const res=await axios.post
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

  return (
    <div>
      
      <div className="appoints text-center p-3 m-5">
        <h1>UserAppointments</h1>
        <div className="appointCard text-center      mt-3 p-3">
          <div className="row">
            <div className="col-md-4 text-start"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAppointments;
