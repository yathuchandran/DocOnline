import React from "react";
import { useRef, useState } from "react";
import axios from "../Services/axios";
import PropTypes from "prop-types";
// import "../index.css";
import "./ForgotPassword.css";
import { useNavigate } from "react-router";
import { validateEmail } from "./validator";

// ForgotPassword.propTypes = {
//   value: PropTypes.string
// }
function ForgotPassword({ value }) {
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef(null);
  const btnRef = useRef(null);
  const otpRef = useRef(null);
  const otpBtnRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validate = validateEmail(emailRef.current.value);

    if (!validate) {
      setErrorMsg("Please enter a valid email address");
    } else {
      try {
        if (value=='doctor') {
          const email=emailRef.current.value;
          const res=await axios.get( `/doctor/forgotPassword/${email}`)

          if (res.status === 200) {
            setErrorMsg("");
            btnRef.current.style.display = "none";
            otpRef.current.style.display = "block";
            otpBtnRef.current.style.display = "block";
          } else {
            setErrorMsg("Email not found");
          }
        
        }else if (!value) {
          const email = emailRef.current.value;
          const res = await axios.get(`/forgotPassword/${email}`);
          if (res.status === 200) {
            setErrorMsg("");
            btnRef.current.style.display = "none";
            otpRef.current.style.display = "block";
            otpBtnRef.current.style.display = "block";

          } else {
            setErrorMsg("Email not found");
          }
        }
      } catch (error) {
        setErrorMsg("An error occurred");
        console.error("An error occurred:", error);
      }
    }
  };






  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      if (value=='doctor') {
        const email = emailRef.current.value;
        const otp = otpRef.current.value;
        const res = await axios.patch(`/doctor/verifyOtp`, { email, otp });
        if (res.status === 200) {
          navigate(`/doctor/newPassword/${emailRef.current.value}`)
        }else{
          setErrorMsg("Invalid OTP")
        }

      }else if (!value) {
        const email = emailRef.current.value;
        const otp = otpRef.current.value;
        const res = await axios.patch(`/verifyOtp`, { email, otp });
        if (res.status === 200) {
          navigate(`/newPassword/${emailRef.current.value}`)
        }else{
          setErrorMsg("Invalid OTP")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="logForm  ">
      <form>
        <div
          className="form-container text-center d-flex align-items-center justify-content-center min-vh-100"
          style={{
            background:
              "linear-gradient(to bottom, rgb(190, 181, 199), #002147)",
          }}
        >

          <div className="signup-formm bg-white row d-flex justify-content-center align-items-center h-100">
            <h1>Forgot Password</h1>

            <div className="col-md-3  col-lg-2 col-xl-5  ">
              <img
                src="/medical.jpg"
                className="img img-fluid logimg mb-5"
                alt="Sample image"
              />
            </div>
            <div className="box col-md-3  col-lg-2 col-xl-5  offset-xl-1    ">
              {errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              ) : (
                ""
              )}
              <div className="row">
                <label className="form-label small " htmlFor="email">
                  Email address
                </label>
                <div className="col-8 ">
                  <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    name="email"
                    className="form-control form-control-m"
                    placeholder="Email address..."
                    required
                  />
                </div>
                <div className="col-5 ">
                  <button
                    type="submit"
                    className="btn btn-block"
                    ref={btnRef}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>

                <label className="form-label small " htmlFor="form3Example3">
                  Enter OTP
                </label>

                <div className="col-8">
                  <input
                    type="email"
                    id="form3Example3"
                    name="email"
                    ref={otpRef}
                    className="form-control form-control-m"
                    placeholder="Enter otp..."
                    required
                  />
                </div>
                <div className="col-5">
                  <button
                    type="submit"
                    className="btn btn-block"
                    ref={otpBtnRef}
                    onClick={(e) => handleOtp(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ForgotPassword;
