import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";

import Profile from "../../Profile";
import './lists.css'
import UserAppointments from "../../UserAppointments/UserAppointments";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Prescription from "../../Prescription";



ProfilePageStructure.propTypes = {
  value: PropTypes.string,
};
function ProfilePageStructure({value}) {
  const [profile, setProfile] = useState(true);
  const [appointments, setAppointments] = useState(false);
  const [prescriptions, setPrescriptions] = useState(false);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  const profileHandle = () => {
    setActiveTab('profile');
    setProfile(true);
    setAppointments(false);
    setPrescriptions(false);
  };

  const appointHandle = () => {
    setActiveTab('appointments');
    setProfile(false);
    setAppointments(true);
    setPrescriptions(false);
  };

  const prescriptHandle = () => {
    setActiveTab('prescriptions');
    setProfile(false)
    setAppointments(false)
    setPrescriptions(true)
}
  return (
    <>
  <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#002147", color: "white" }}
    >
     <div className="container ">
  <div className="d-flex justify-content-between align-items-center">
    <Link className="navbar-brand" to="/">
      <img
        className="small-logo"
        src="/DocLogo.jpeg"
        alt=""
      />
    </Link>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>




  <div className="dropdown">
    <ul
      className="dropdown-menu right-0"
      style={{
        marginLeft: "0px",
        width: "100px",
        textAlign: "center",
      }}
    >
      <li>
        <Link className="link" to="/profile">
          <IoIosContact size={40} />
          Profile
        </Link>
      </li>
      <li>
        <Link className="link" to="/logout">
          <IoIosContact size={40} />
          Logout
        </Link>
      </li>
    </ul>
  </div>
  <div className="text-end ms-auto">
  <ul className="navbar-nav text-end">
    <li className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
      <span className="nav-link text-white" onClick={profileHandle}>Profile</span>
    </li>
    <li className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
      <span className="nav-link text-white" onClick={profileHandle}>Profile</span>
    </li>
    <li className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}>
      <span className="nav-link text-white" onClick={appointHandle}>Appointments</span>
    </li>
    <li className={`nav-item ${activeTab === 'prescriptions' ? 'active' : ''}`}>
      <span className="nav-link text-white" onClick={prescriptHandle}>Prescriptions</span>
    </li>
  </ul>
</div>
</div>


      </nav>
      <div className="col-12  mb-0  col-md-12">
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'appointments' && <UserAppointments />}
            {activeTab === 'prescriptions'&& <Prescription />}
          </div>
       <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-2">

    

  

   
          </div>
          
        </div>
      </div>
      
    </>
  );
}

export default ProfilePageStructure;



