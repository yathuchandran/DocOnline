import axios from "../Services/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Otp.propTypes = {
  value: PropTypes.string,
};

function Otp({ value }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(otp) < 1000 || parseInt(otp) > 9999 || !parseInt(otp)) {
      setErrorMsg("Invalid otp");
    }

    try {
      if (value === "doctor") {
        const res = await axios.post('/otp', { otp });
        console.log('=====doctor=result========25');
    
        if (res.data === "verified") {
          console.log("verified");
          navigate("/login");
        } else {
          setErrorMsg("Invalid otp");
        }
      } else {
        const res = await axios.post("/otp", { otp });
        console.log(res, "==========result============");
    
        if (res.data.message === "user otp correct") {
          console.log("user otp correct");
          navigate("/login");
        } else {
          throw new Error("otp incorrect");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
    

    // value == "doctor"
    //   ? await axios
    //       .post('/otp', {otp})
    //       .then((res) => {
    //         console.log('=====doctor=result========25');
    //         if (res.data == "verified") navigate("/doctor/login");
    //         else setErrorMsg("Invalid otp");
    //       })
    //   : await axios.post("/otp", { otp }).then((res) => {
    //       console.log(res, "==========result============");

    //       try {
    //         if (res.data.message === "user otp correct") {
    //           console.log("user otp correct");
    //           navigate("/login");
    //         } else {
    //           throw new Error("otp incoorect");
    //         }
    //       } catch (error) {}
    //     });
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
                <div class="   ">
                  <h6>
                    Please enter the one-time password <br /> to verify your
                    account
                  </h6>
                  <div>
                    <span>A code has been sent to</span>{" "}
                    <small>*******@gmail.com</small>
                  </div>
                  {/* <div
                    id="otp"
                    class="inputs d-flex flex-row justify-content-center mt-2"
                  >
                    <input
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="otp-input-0"
                      max={9}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="otp-input-1"
                      max={9}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="otp-input-2"
                      max={9}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="otp-input-3"
                      max={9}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div> */}
                  <input
                    type="number"
                    value={otp}
                    max={9999}
                    min={1000}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control "
                  />

                  <div class="mt-4">
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-md"
                      style={{
                        backgroundColor: "#002147", // Add the background color here
                        color: "white", // Optionally, set the text color
                      }}
                      onClick={handleSubmit}
                    >
                      Validate
                    </button>
                  </div>
                </div>
                {/* <div className="card-2">
                  <div className="content d-flex justify-content-center align-items-center">
                    <span>Didn't get the code</span>
                    <a href="#" className="text-decoration-none ms-3">
                      Resend(1/3)
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Otp;
