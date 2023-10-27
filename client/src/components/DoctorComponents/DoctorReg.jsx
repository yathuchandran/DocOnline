import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../Services/axios";
import PropTypes from "prop-types"; // Make sure 'PropTypes' is spelled correctly with a lowercase 'p'
import { useNavigate } from "react-router";
import useAuth from "../../context/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorData } from "../../redux/doctorData";

import {
  validateLiceNumber
} from "../validator";


function DoctorReg() {
  const docData = useSelector((state) => state.doctor.data);

  


  const [departments, setDepartments] = useState([]);
  const [gender, setGender] = useState("");

  const [address, setAddress] = useState("");
  const [liceNum, setLiceNum] = useState("");
  const [department, setDepartment] = useState("");
  const [exp, setExp] = useState("");
  const [profile, setProfile] = useState(null);
  const [docs, setDocs] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState("");

  const { setDoctor } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeptList = async () => {
      try {
        const res = await axios.get("/doctor/department");
        if (res.data.message === "okey success") {
          setDepartments(res.data.dept);
        }
      } catch (error) {}
    };
    fetchDeptList();
  }, []);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleFileChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocs(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address ||!liceNum ||!department ||!exp ||!docs ||!profile||!gender) {
      setErrorMsg("Please fill in all the fields.");
      return;
    }
    if (!validateLiceNumber(liceNum)) {
      setErrorMsg("Invalid Licence number. Please enter a valid 6-digit number.");
      return;
    }

    const docId=docData.docData._id
    const dataToSend = {address,liceNum,department,exp,profile,docs,docId,gender};
    try {
      const res = await axios.post(`/doctor/registration`, dataToSend);

      if (res.data.message === "Registration successful") {
        setErrorMsg("Registration successful")
        setDoctor(true);
        dispatch(setDoctorData(res.data.docData));
        navigate("/doctor/");
        
      } else if (res.data.message === "License number already exists") {
        setErrorMsg("License number already exists")
        navigate("/doctor/");
      }
    } catch (error) {
      setErrorMsg("An error occurred")
        }
  };

  return (
    <div className="container">
      <div className="card mt-2 border-radius-round-10 ">
        <div className="card-body p-3 border-radius-round-10">
          <div className="row rounded shadow border-dark">
            <div
              className="col-lg-6 col-md-8 p-0 pl-5 d-none d-md-block bg-cover rounded-10"
              style={{
                backgroundImage:
                  "url(https://1olestnice.ru/wp-content/uploads/2020/11/strah-2901-768x531.jpg)",
                backgroundSize: "cover",
              }}
            >
              <div className="d-flex align-items-center h-100 px-5 bg-opacity-40">
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    DOCTOR REGISTRATION
                  </h2>
                  <p className="max-w-md mt-3 text-gray-300">
                    Input valid documentation and move forward
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md">
              <div className="card-body d-flex flex-column justify-content-center align-items-center p-3 p-md-5">
                <div className="text-center">
                  <div className="d-flex justify-content-center mx-auto">
                    <img
                      className="w-50 h-auto"
                      src="https://i.pinimg.com/736x/e2/30/73/e23073991959d06865ade6efa89e38ff.jpg"
                      alt=""
                    />
                  </div>
                </div>

                {/* Doctor Verification Section */}
                <div className="mb-4">
                  <form className="mt-0">
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
                    {/* ... Other input fields */}

                    {/* Address Input */}
                    <div className="mb-0">
                      <label
                        htmlFor="address"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Your Address"
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    {/* License Number Input */}
                    <div className="mb-0">
                      <label
                        htmlFor="licenseNumber"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Medical License Number
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        id="licenseNumber"
                        placeholder="12345"
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={liceNum}
                        onChange={(e) => setLiceNum(e.target.value)}
                      />
                    </div>

                    <div className="row">
                <div className="col-md-6">
                  <div className="">
                    Gender<span className="text-danger">*</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-check-input"
                      id="male"
                    />
                    <label htmlFor="male" className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-check-input"
                      id="female"
                    />
                    <label htmlFor="female" className="form-check-label">
                      Female
                    </label>
                  </div>
                  <br />
                </div>
              </div>

                    {/* Specialty Input */}

                    {/* Years of Experience Input */}
                    <div className="mb-0">
                      <label
                        htmlFor="specialty"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Specialty or Medical Field
                      </label>
                      <select
                        name="specialty"
                        id="specialty"
                        className="form-control dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-0">
                      <label
                        htmlFor="yearsOfExperience"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        name="yearsOfExperience"
                        id="yearsOfExperience"
                        placeholder="5 years"
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                      />
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="text-center mb-0">
                      {preview != [] ? (
                        <img
                          width={"100px"}
                          height={"150px"}
                          className="text-wrap"
                          src={preview}
                          alt=""
                        />
                      ) : profile ? (
                        <img
                          width={"100px"}
                          height={"150px"}
                          src={`images/${profile}`}
                          alt="profile"
                        />
                      ) : (
                        <img
                          width={"150px"}
                          height={"200px"}
                          src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                          alt="default"
                        />
                      )}
                      <br />
                      <label
                        htmlFor="profilePhoto"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Profile Photo
                      </label>
                    </div>
                    <div className="mb-0 ps-4">
                      <input
                        type="file"
                        accept="image/*"
                        name="profilePhoto"
                        id="profilePhoto"
                        className="form-control-file"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </div>

                    {/* documents Photo Upload */}
                    <div className="mb-0">
                      <label
                        htmlFor="docs"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Certifications
                      </label>
                    </div>
                    <div className="mb-0 ps-4">
                      <input
                        type="file"
                        accept="image/*"
                        name="docs"
                        id="docs"
                        className="form-control-file"
                        onChange={(e) => handleFileChanges(e)}
                      />
                    </div>

                    {/* Availability Input */}
                    {/* <div className="mb-0">
                      <label
                        htmlFor="availability"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Availability
                      </label>
                      <input
                        type="text"
                        name="availability"
                        id="availability"
                        placeholder="Set your working hours or availability"
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                      />
                      {/* Submit Button 
                    </div> */}
                    <br />
                    <div className="mb-5 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary w-50"
                        style={{ paddingLeft: "10px" }}
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    </div>
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
                  </form>
                </div>

                {/* Sign-In Button */}
                {/* <div className="mb-4">
                    <button className="btn btn-primary w-100">Sign in</button>
                  </div> */}
                {/* </form> */}

                <p className="mt-2 text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="#"
                    className="text-blue-500 focus-text-decoration-none focus-text-decoration-underline"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DoctorReg.propTypes = {
  value: PropTypes.string,
};

export default DoctorReg;
