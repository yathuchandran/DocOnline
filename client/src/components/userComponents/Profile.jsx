import React, { useEffect } from 'react';
import axios from "../../Services/axios";
import { useSelector } from 'react-redux';


function Profile() {
   
      const user = useSelector(state => state.user.data);
      console.log(user,"===================");
      const { userName, email, _id, isBlocked, isApproved } = user;
      console.log(userName, email, _id, isBlocked,"---------------------------------------");

    
      async function fetchData() {
        try {
          const res = await axios.post(`/profile`, { user });
          console.log("==", res.data, "result user data = 18");
    
        } catch (error) {
          console.error(error);
          console.log("==error===");
        }
      }
          useEffect(() => {
        fetchData();
      }, []);
    

    
  return (
    
    <div>
      <div className="row">
        <div className="col-12 col-md-3">
          <div
            className="row text-center text-dark"
            style={{
              backgroundColor: "#002147",
              color: "white",
            }}
          >
            <div className="list-group p-5   mt-5">
              <div className="list-group-item  btn-outline-success lists list-group-item-action text-wrap text-break">
                Profile
              </div>
              <div className="list-group-item  btn-outline-success lists list-group-item-action text-wrap text-break">
                Appointments
              </div>
              <div className="list-group-item  btn-outline-success lists list-group-item-action text-wrap text-break">
                Prescriptions
              </div>
            </div>
          </div>
        </div>
      
        <div className='text-center '>
                <h1>{userName}</h1>
                <div className="row">
                  <div className="col-lg-6 text-start ">
                    <b>Email</b>: {email} <br />
                    <b>ID</b>: {_id} <br />
                    <b>name</b>: {userName} <br />


                  </div>
                </div>
                <div className='mt-2'>
                  
                  
{/* //                        {msg && <div>{msg}</div>} */}

                </div>
              </div>
      </div>
      <div>
      <h1>
       {userName} 
      </h1>

      </div>

    </div>
  );
}

export default Profile;
