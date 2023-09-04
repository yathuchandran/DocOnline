import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import PropTypes from "prop-types"; // Make sure 'PropTypes' is spelled correctly with a lowercase 'p'
import axios from "../Services/axios";
import Otp from "../pages/Otp";
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "./validator";

Signup.propTypes = {
  value: PropTypes.string,
};
function Signup({ value }) {
  const navigate = useNavigate();
  const [Name, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  // const [Age, setAge] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!Name || !Email || !Mobile || !Password) {
    setErrorMsg('Please fill all the blanks...!')
    return
    } else {

    if (!validateEmail(Email)) {
    setErrorMsg('Invalid Email id,Please enter valid email id...!')
    return;
    }

    if (!validateMobileNumber(Mobile)) {
    setErrorMsg("Mobile number can only have 10 digits,Please enter valid mobile number...!")
    return;
    }

    if (!validatePassword(Password)) {
    setErrorMsg('Password should have a capital letter,symbol,number and atleast have 6 charectors...!')
    return
    }

    if (Password != cPassword) {
    setErrorMsg("Passwords are not matching,Please try again...!")
    return;
    }

    const res = await axios
      .post("/signup", { Name, Email, Mobile, Password })

      .then((res) => {
        console.log(res, ">>>>>>>>>>>>>");
        try {
          if (res.data.message === "Check mail") {
            navigate("/otp");
          } else {
            setErrorMsg(res.data)
            throw new Error("eroor occured");
          }
        } catch (error) {
          console.log(error.message);
        }
      });
   
  };
  }
  //value == 'doctor' ?
  // await axios.post(import.meta.env.VITE_BASE_URL + 'doctor/signup', {
  //     Name,
  //     Email,
  //     Age,
  //     Mobile,
  //     Password
  // }).then(res => {
  //     if (res.data.message === 'Check mail') history(`/doctor/verify/${res.data.string}`)
  //     else setErrorMsg(res.data)
  // })
  // :
  // await axios.post('http://localhost:3000/signup', {
  //     Name,
  //     Email,
  //     Age,
  //     Mobile,
  //     Password
  // }).then(res => {
  //     if (res.data.message === 'Check mail') history(`/verify/${res.data.string}`)
  //     else setErrorMsg(res.data)
  // })

  return (
    <section className="logForm  ">
      <div
        className="form-container text-center d-flex align-items-center justify-content-center min-vh-100"
        style={{
          background: "linear-gradient(to bottom, rgb(190, 181, 199), #002147)",
        }}
      >
        <div className="signup-form bg-white row d-flex justify-content-center align-items-center h-100  ">
          <h1 style={{ fontFamily: "Times New Roman, serif" }}>SIGNUP</h1>

          <div className="col-md-9 text-center  col-lg-6 col-xl-5  text-align-start">
            <div className="row "></div>
            <img
              src="/derek-finch-bD1bK7IUvd8-unsplash.jpg"
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
            <form>
              {errorMsg ? (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ textAlign: "center" }}
                >
                  {errorMsg}
                </div>
              ) : (
                ""
              )}
              <div className="form-outline mb-4">
                <label
                  className="form-label small"
                  htmlFor="form3Example3"
                  style={{ textAlign: "center" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="form3Example3"
                  value={Name}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control form-control-m"
                  placeholder="Name..."
                  required
                />
              </div>
                  <label className="form-label small" htmlFor="form3Example3">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="form3Example3"
                    value={Mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control form-control-m"
                    placeholder="Mobile..."
                    required
                  />
              <div
                className="form-outline mb-4"
                style={{ textAlign: "center" }}
              >
                <label
                  className="form-label small"
                  htmlFor="form3Example3"
                  style={{ textAlign: "center" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="form3Example3"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-m"
                  placeholder="Email address..."
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <div className="row">
                  <div className="col-6">
                    <label className="form-label small" htmlFor="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-m"
                      placeholder="Enter password..."
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label
                      className="form-label small "
                      htmlFor="form3Example4"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-m"
                      placeholder="Confirm"
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      required
                    />
                    {/* <input type="password" id="form3Example4" value={cPassword} onChange={(e) => setCPassword(e.target.value)} className="form-control form-control-lg"
                            placeholder="Confirm" required /> */}
                  </div>
                </div>
              </div>

              <div className="text-center  mt-4 pt-2 m-auto  ">
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-md"
                  style={{
                    backgroundColor: "#002147", // Add the background color here
                    color: "white", // Optionally, set the text color
                  }}
                  onClick={handleSubmit}
                >
                  Signup
                </button>
                {/* <button type="button" className="btn btn-success btn-lg"
                            style={{ "paddingLeft": " 2.5rem", "paddingRight": "2.5rem" }} onClick={handleSubmit}>Signup</button> */}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  {" "}
                  Already have an account?{" "}
                  <span className="text-primary">
                    {" "}
                    <Link to={"/login"}>Login</Link>{" "}
                  </span>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
