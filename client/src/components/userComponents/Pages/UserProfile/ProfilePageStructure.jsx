import React, { useState } from "react";
import Profile from "../../Profile";
import './lists.css'
import UserAppointments from "../../UserAppointments/UserAppointments";

function ProfilePageStructure() {
  const [profile, setProfile] = useState(true);
  const [appointments, setAppointments] = useState(false)
  const [prescriptions, setPrescriptions] = useState(false)

  const profileHandle = () => {
    setProfile(true);
    setAppointments(false)
    setPrescriptions(false)
  };
  const appointHandle = () => {
    setProfile(false)
    setAppointments(true)
    setPrescriptions(false)
}
  return (
    <div className="row" style={{ backgroundColor: "#002147" }}>
      <div className="col-12 col-md-3 ">
        <div className="row text-center" >
          <div
            className="list-group p-4 mt-5"
           
          >
            <div className="list-group-item btn btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break" onClick={profileHandle}>
              {" "}
              profile
            </div>{" "}
            <br />
            <div className="list-group-item btn btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break" onClick={appointHandle}>
              {" "}
              Appointments
            </div>{" "}
            <br />
            <div className="list-group-item btn btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break">
              Prescriptions{" "}
            </div>{" "}
            <br />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-9 bg-light">
        {profile && <Profile />}
      {appointments && <UserAppointments />}
</div>
    </div>
  );
}

export default ProfilePageStructure;
