import React from 'react'

function ResetPassword() {
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
          {/* {errorMsg ? (
            <div className=" mt-1 alert alert-danger text-10" role="alert">
              {errorMsg}
            </div>
          ) : (
            ""
          )} */}

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
                <input
                  type="number"
                  max={9999}
                  min={1000}
                 
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
  )
}

export default ResetPassword