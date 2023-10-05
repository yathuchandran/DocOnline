import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./adminComponents/AdminSidebar"
import DocSidebar from './DoctorComponents/DocSidebar';
import { IoIosContact } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useAuth from '../context/hooks/useAuth';
import { setUserData } from '../redux/userData';
import { setDoctorData } from '../redux/doctorData';
import { setAdminData } from '../redux/adminData';
import { BiNotepad } from 'react-icons/bi'


import "./Navbar.css";

Navbar.propTypes = {
  value: PropTypes.string 
}

function Navbar({ value }) {
  const {  doctor, admin, setDoctor, setAdmin, setUser } = useAuth(); // Destructure once
  const { user } = useAuth();
console.log(value,"====24 value nav");



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (value === 'doctor') {
        localStorage.removeItem('doctorToken');
        dispatch(setDoctorData({}));
        setDoctor(false);
    } else if (value === 'admin') {
        localStorage.removeItem('adminToken');
        dispatch(setAdminData({}));
        setAdmin(false);
    } else {
      console.log("userrrrrrrr========");
        localStorage.removeItem('userToken');
        dispatch(setUserData({}));
        setUser(false);
    }
  }
console.log(user,"user=====41","/Screenshotfrom.png");
return (
  <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#002147", color: "white" }}>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
      <Link className="navbar-brand" to="/">
            <img className="small-logo" 
            onClick={() => {
              value === 'doctor' ? navigate('/doctor/') : value === "admin" ? navigate('/admin/') : navigate('/')
            }}
            src="/Screenshotfrom.png" alt="" />
          </Link>

        {value === 'doctor' ?<>
        <button className='btn btn-outline-success text-dark doc_nav' onClick={() => navigate('/doctor/prescriptions')}>
            <BiNotepad style={{ marginTop: '-7px' }} /> Prescriptions
          </button>
        </> 
         :''
        }

        <div className='d-flex navMine'>
          {value === "doctor" ? (
            <button className="btn doc btn-outline-white" onClick={() => navigate('/doctor/consult')}>
              Consult
            </button>
          ) : value === 'admin' ? (
            <div></div>
          ) : (
            <button type="button"
            className="btn btn-white btn-lg btn-md"
            onClick={() => navigate('/findDoctor')}
            style={{
              backgroundColor: "#002147", 
              color: "white",
            }} >
              Doctors
            </button>
          )}

          <div>{'   '}</div>

          

         

          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
        </div>

        {/* <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: "white" }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" style={{ color: "white" }}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: "white" }}>
                Contact
              </Link>
            </li>
          </ul>
        </div> */}
        </div>







        <div className="dropdown">
          {value === "admin" ? (
            admin ? (
              <Link onClick={handleLogout}>
                <button className="btn btn-outline-success">Logout</button>
              </Link>
            ) : (
              ""
            )
          ) : (
            <a
              className="btn me-0 ms-2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoIosContact size={40} />
            </a>
          )}

          {!value && user ? (
            <ul
              className="dropdown-menu right-0"
              style={{
                marginLeft: "-90px",
                width: "100px",
                textAlign: "center",
              }}
            >
              <li>
                <Link className="link" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : value === "doctor" && doctor ? (
            <ul
              className="dropdown-menu right-0"
              style={{
                marginLeft: "-90px",
                width: "100px",
                textAlign: "center",
              }}
            >
              <li>
                <Link className="link" to={"/doctor/setprofile"}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : value === "admin" && admin ? (
            <ul
              className="dropdown-menu right-0"
              style={{
                marginLeft: "-90px",
                width: "100px",
                textAlign: "center",
              }}
            >
              <li>
                <Link className="link" to={"/admin/appointments"}>
                  Appointments
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul
              className="dropdown-menu right-0"
              style={{ marginLeft: "-90px", textAlign: "center" }}
            >
              <li>
                {value === "doctor" ? (
                  <Link className="link" to={"/doctor/login"}>
                    Login
                  </Link>
                ) : value === "admin" ? (
                  ""
                ) : (
                  <Link className="link" to={"/login"}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          )}
           {
                        value === 'admin' ?
                            <Sidebar />
                            : value == 'doctor' ?
                                <DocSidebar /> : '  '
                    }
        </div>
      
    </div>
  </nav>
);

}

export default Navbar;
