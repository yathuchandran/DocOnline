import React from "react";
import "./ResetPassword.css";

function ResetPassword() {



  
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
          <form action="">
            <h1 style={{ fontFamily: "Times New Roman, serif" }}>
              RESET-PASSWORD
            </h1>

            {/* {errorMsg ? (
            <div className=" mt-1 alert alert-danger text-10" role="alert">
              {errorMsg}
            </div>
          ) : (
            ""
          )} */}
            <h6>
              Please Reset your password
              <br /> to verify your account
            </h6>
            {/* <div>
                  <span>A code has been sent to</span>{" "}
                  <small>*******@gmail.com</small>
                </div> */}
            <br />
            <input
             
              placeholder="New Password"
              className="form-control "
            />
            <br />
            <br />
            <input
             
              placeholder="confirm Password"
              className="form-control   "
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
