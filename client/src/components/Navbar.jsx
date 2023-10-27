import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./adminComponents/AdminSidebar";
import DocSidebar from "./DoctorComponents/DocSidebar";
import { IoIosContact } from "react-icons/io";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import useAuth from "../context/hooks/useAuth";
import { setUserData } from "../redux/userData";
import { setDoctorData } from "../redux/doctorData";
import { setAdminData } from "../redux/adminData";
import { BiNotepad } from "react-icons/bi";

import "./Navbar.css";

Navbar.propTypes = {
  value: PropTypes.string,
};

function Navbar({ value }) {
  const { doctor, admin, setDoctor, setAdmin, setUser } = useAuth(); // Destructure once
  const { user } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (value === "doctor") {

      localStorage.removeItem("doctorToken");
      dispatch(setDoctorData({}));
      setDoctor(false);
    } else if (value === "admin") {
      localStorage.removeItem("adminToken");
      dispatch(setAdminData({}));
      setAdmin(false);
    } else {
      localStorage.removeItem("userToken");
      dispatch(setUserData({}));
      setUser(false);
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light" style={
        value === 'doctor'
          ? {
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#002147", 
              color: 'white',
            }
          :value==='admin'? {
            backgroundColor: "#002147", 
            color: 'white',
          }: {
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
            backgroundColor: '#5F6E9D',
            color: 'white',
          }
      }
    >
        <div className="container" >
        <div className="d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">
            
            <img
              className="small-logo"
              onClick={() => {
                value === "doctor"
                  ? navigate("/doctor/")
                  : value === "admin"
                  ? navigate("/admin/")
                  : navigate("/");
              }}
              src="/DocLogo.jpeg"
              alt=""
            />
          </Link>

          {value === "doctor" ? (
            <>
              {/* <button
                className="btn btn-outline-success text-dark doc_nav"
                onClick={() => navigate("/doctor/prescriptions")}
              >
                <BiNotepad style={{ marginTop: "-7px" }} /> Prescriptions
              </button> */}
            </>
          ) : (
            ""
          )}

          <div className="d-flex navMine" >
            {value === "doctor" ? (
              <button
                className="btn doc btn-outline-white"
                onClick={() => navigate("/doctor/consult")}
              >
                Consult
              </button>
            ) : value === "admin" ? (
              <div></div>
            ) : (
              <button
                type="button"
                className="btn btn-white btn-lg btn-md"
                onClick={() => navigate("/findDoctor")}
                style={{
                  backgroundColor: "#5F6E9D",
                  color: "white",
                }}
              >
                Doctors
              </button>
            )}

            <div>{"   "}</div>

          
          </div>

         
        </div>
                  
<div className="dropdown">
          {value === "admin" ? (
            admin ? (
              <Link onClick={handleLogout}>
                <button className="btn btn-outline-success">
                  <IoIosContact size={40} /> Logout
                </button>
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
              style={
              value === 'doctor'
              ? {
                  backgroundColor: "#002147", 
                  color: 'white',
                }
              :value==='admin'? {
                backgroundColor: "#002147", 
                color: 'white',
              }:{
                backgroundColor: '#5F6E9D',
                color: 'white',
              }
          }
            >
              <IoIosContact size={40} />
            </a>
          )}

          {!value && user ? (
            <ul
              className="dropdown-menu right-0"
              style={{
                marginLeft: "0px",
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
                marginLeft: "0px",
                width: "10px",
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
                marginLeft: "0px",
                width: "10px",
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
          )
           : (
            <ul
              className="dropdown-menu right-0"
              style={{ marginLeft: "7px", textAlign: "center" }}
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
          {/* {
                value === 'admin' ?
                    <Sidebar />
                    : value == 'doctor' ?
                        <DocSidebar /> : '  '
            } */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;











