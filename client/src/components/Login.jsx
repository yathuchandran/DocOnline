import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Services/axios";
import useAuth from '../context/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userData'
import { setDoctorData } from '../redux/doctorData'
import { setAdminData } from '../redux/adminData'

function Login({ value }) {
  const { setUser, setDoctor, setAdmin } = useAuth()
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (value === "doctor") {
        const res = await axios.post("/doctor/login", input);

        if (res.status === 200) {
          localStorage.setItem("doctorToken", res.data.token);
          setDoctor(true)
          dispatch(setDoctorData(res.data))          
          if (res.data.docData.isRegister===true) {
            navigate("/doctor/");

          }else{
            navigate("/doctor/registration");

          }
        } else {
          setErrorMsg("Invalid credentials"); // Handle other status codes or error messages from the server
        }




      } else if (value === "admin") {
        const res = await axios.post("/admin/login", input);

        if (res.status === 401) {
          setErrorMsg("Invalid email or password");
        } else if (res.status === 403) {
          setErrorMsg("Your access has been blocked...!");
        } else if (res.status === 200) {
          localStorage.setItem("adminToken", res.data.token);
          dispatch(setAdminData(res.data.adminData))
          setAdmin(true)

          navigate("/admin/");
        } else {
          setErrorMsg("An error occurred while logging in.");
        }
      } else {



        const res = await axios.post("/login", input);

        if (res.data === 'unauthorized') {
          setErrorMsg('Invalid email or password...!');
        } else if (res.data === 'unverified') {
          setErrorMsg("Mail not verified, please check your email...!");
        } else if (res.data === 'blocked') {
          setErrorMsg('This account has been blocked. Please contact the support team...!');
        } else if (res.status === 200) {
          localStorage.setItem("userToken", res.data.token);
          setUser(true)
          dispatch(setUserData(res.data.userData))
          navigate("/");
        } else {
          setErrorMsg("An error occurred while logging in."); // Handle other status codes or error messages from the server
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMsg("An error occurred while logging in."); // Handle network or other unexpected errors
    }
  };

  return (
    <section className="logForm  ">
      <div
        className="form-container text-center d-flex align-items-center justify-content-center min-vh-100"
        style={{
          background: "linear-gradient(to bottom, rgb(190, 181, 199), #002147)",
        }}
      >
        <div className="signup-form bg-white row d-flex justify-content-center align-items-center h-100  ">
          <h1 style={{ fontFamily: "Times New Roman, serif" }}>LOGIN</h1>

          <div className="col-md-9 text-center  col-lg-6 col-xl-5  text-align-start">
            <div className="row "></div>
            <img
              src="/medical.jpg"
              className="img-fluid logimg mb-5"
              alt="Sample image"
              style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
              }}
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1  ">
            <form onSubmit={handleLogin}>
              {errorMsg ? (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ textAlign: "center" }}
                >
                  {/* // <div className="alert alert-danger" role="alert" style={{ textAlign: 'center' }}> */}

                  {errorMsg}
                </div>
              ) : (
                ""
              )}
              <div className="form-outline mb-4" style={{ textAlign: "start" }}>
                <label
                  className="form-label small"
                  htmlFor="form3Example3"
                  style={{ textAlign: "start" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="form3Example3"
                  name="email"
                  value={input.email}
                  className="form-control form-control-m"
                  placeholder="Email address..."
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-outline mb-4" style={{ textAlign: "start" }}>
                <label
                  className="form-label small"
                  htmlFor="form3Example4"
                  style={{ textAlign: "start" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-m"
                  placeholder="Enter password..."
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="text-center  mt-4 pt-2 m-auto  ">
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-md"
                  style={{
                    backgroundColor: "#002147", // Add the background color here
                    color: "white", // Optionally, set the text color
                  }}
                >
                  Login
                </button>
              </div>
              Forgot Password ?<Link to={"/forgotpassword"}>Click Here</Link>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="/Signup" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
