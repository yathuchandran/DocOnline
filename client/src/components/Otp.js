import axios from "../Services/axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import './Otp.css'

Otp.propTypes = {
  value: PropTypes.string,
};

function Otp({ value }) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(parseInt(otp)) || parseInt(otp) < 1000 || parseInt(otp) > 9999) {
      setErrorMsg("Invalid OTP");
    } else {
      try {
        if (value === "doctor") {
          const res = await axios.post(`/doctor/otp/${token}`, { otp: parseInt(otp) });

          if (res.status === 200) {
            navigate("/doctor/login");
          } else {
            setErrorMsg("Invalid OTP");
          }
        } else {
          const res = await axios.post("/otp", { otp });

          if (res.data.message === "user otp correct") {
            navigate("/login");
          } else {
            throw new Error("OTP incorrect");
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <section className="otpForm">
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
          <form action="">
            <h1 style={{ fontFamily: "Times New Roman, serif" }}>ENTER-OTP</h1>

            <label htmlFor="otp">Enter otp</label>
            {errorMsg ? (
              <div className=" mt-1 alert alert-danger text-10" role="alert">
                {errorMsg}
              </div>
            ) : (
              ""
            )}

            <div className=" text-center    ">
              <div class="position-relative">
                <div class=" otp" >
                  <h6>
                    Please enter the one-time password <br /> to verify your
                    account
                  </h6>
                  <div>
                    <span>A code has been sent to</span>{" "}
                    <small>*******@gmail.com</small>
                  </div>
                  <input
                    type="number"
                    value={otp}
                    max={9999}
                    min={1000}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                  />


                  <div class="mt-4">
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-md"
                      style={{ backgroundColor: "#002147", color: "white" }} // Correct usage of style prop

                      onClick={handleSubmit}
                    >
                      Validate
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Otp;



