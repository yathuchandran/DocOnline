import React, { useRef, useState } from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import axios from '../Services/axios'
import {validatePassword} from './validator'

ResetPassword.propTypes = {
  value: PropTypes.string,
};

function ResetPassword({ value }) {
  const { email } = useParams();
  const passRef = useRef();
  const confirmRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passRef.current.value;
    const confirmPassword = confirmRef.current.value;

   
    if (!password || !confirmPassword) {
      setErrorMsg("Passwords do not match");
    } else if (password !== confirmPassword) {
      setErrorMsg("Password did not match. Please re-enter both fields");
    } else if (!validatePassword(password)) {
      setErrorMsg("Invalid password. Please follow password requirements.");
    } else {
      async function resetPassword() {

        if (value=='doctor') {
          try {
            const res = await axios.patch(`/doctor/resetPassword`, {
              password: password,
              email: email,})
              if (res.status === 200) {
                setSuccess(true);
                setErrorMsg("Password changed successfully.");
                setTimeout(() => {
                  navigate("/doctor/login");
                }, 2000);
              }
          } catch (error) {
            console.error("Password reset failed:", error);

          }
        } else if (!value) {
        try {
          const res = await axios.patch(`/resetPassword`, {
            password: password,
            email: email,
          });
          if (res.status === 200) {
            setSuccess(true);
            setErrorMsg("Password changed successfully.");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        } catch (error) {
          console.error("Password reset failed:", error);
        }
      }
    }
    resetPassword();

  }
  };

  return (
    <section className="resetForm">
      <div
        className="otp-container text-center d-flex  align-items-center justify-content-center min-vh-100 "
        style={{
          background: "linear-gradient(to bottom, rgb(190, 181, 199), #002147)",
        }}
      >
        <div
          className="signu-form bg-white row d-flex justify-content-center align-items-center h-100 col-md-4"
          style={{
            border: "1px solid rgb(219, 217, 217)",
            borderRadius: "15px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h1 style={{ fontFamily: "Times New Roman, serif" }}>
              RESET-PASSWORD
            </h1>

            <h6>
              Please Reset your password
              <br /> to verify your account
            </h6>

            <br />
            <input
              placeholder="New Password"
              className="form-controlll"
              ref={passRef}
            />
            <br />
            <br />
            <input
              placeholder="Confirm Password"
              className="form-controlll"
              ref={confirmRef}
            />

            {errMsg && (
              <div className="mt-4 alert alert-danger" role="alert">
                {errMsg}
              </div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-md"
                style={{
                  backgroundColor: "#002147",
                  color: "white",
                }}
              >
                Confirm
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
