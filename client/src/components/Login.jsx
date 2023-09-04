import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../axios"





function Login() {
  const navigate=useNavigate()
  const [input,setInput]=useState({
    email:"",
    password:""
  });
  const handleLogin =async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post("/login",input);
      if (res.status===200) {
        
      }
    }catch(error){
      console.log(error);
    }
  }
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
            <form>
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
                  value=""
                  className="form-control form-control-m"
                  placeholder="Email address..."
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
                  value=""
                  className="form-control form-control-m"
                  placeholder="Enter password..."
                  required
                />
              </div>

              <div className="text-center  mt-4 pt-2 m-auto  ">
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-md"
                  style={{
                    backgroundColor: "#002147", // Add the background color here
                    color: "white", // Optionally, set the text color
                  }}
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

export default Login;
