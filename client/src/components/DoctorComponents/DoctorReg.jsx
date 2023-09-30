import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function DoctorReg() {
  const [address,setAaddress]=useState(null)

  
  // State to store verification information
  const [verificationInfo, setVerificationInfo] = React.useState({
    address: "",
    licenseNumber: "",
    specialty: "",
    yearsOfExperience: "",
    education: "",
    profilePhoto: null, // For storing the profile photo file
    availability: "",
  });

  // Function to handle file upload for profile photo
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    setVerificationInfo({ ...verificationInfo, profilePhoto: file });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can submit the verificationInfo to your backend for further processing
    // Be sure to handle file uploads correctly, e.g., using FormData for the profile photo
    // Also, implement license verification logic here

    // Example of sending data to the backend using FormData:
    const formData = new FormData();
    formData.append("address", verificationInfo.address);
    formData.append("licenseNumber", verificationInfo.licenseNumber);
    formData.append("specialty", verificationInfo.specialty);
    formData.append("yearsOfExperience", verificationInfo.yearsOfExperience);
    formData.append("education", verificationInfo.education);
    formData.append("profilePhoto", verificationInfo.profilePhoto);
    formData.append("availability", verificationInfo.availability);

    // Send formData to your server for further processing
    // Example: axios.post('/api/doctor-verification', formData)
  };
  return (
    <div className="container">
      <div className="card mt-2 border-radius-round-10 ">
        <div className="card-body p-3 border-radius-round-10">
          <div className="row rounded shadow border-dark">
            {/* Left Column - Background Image */}
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

            {/* Right Column - Registration Form */}
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
                  <form className="mt-0" onSubmit={handleSubmit}>
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
                        value={verificationInfo.address}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            address: e.target.value,
                          })
                        }
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
                        value={verificationInfo.licenseNumber}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            licenseNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Specialty Input */}
                    <div className="mb-0">
                      <label
                        htmlFor="specialty"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Specialty or Medical Field
                      </label>
                      <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        placeholder="Cardiology, Pediatrics, Dermatology"
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={verificationInfo.specialty}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            specialty: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Years of Experience Input */}
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
                        value={verificationInfo.yearsOfExperience}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            yearsOfExperience: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Education and Qualifications Input */}
                    <div className="mb-0">
                      <label
                        htmlFor="education"
                        className="form-label text-sm text-gray-600 dark:text-gray-200"
                      >
                        Education and Qualifications
                      </label>
                      <textarea
                        name="education"
                        id="education"
                        rows="4"
                        placeholder="Medical School, Residency, Board Certifications, etc."
                        className="form-control dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                        value={verificationInfo.education}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            education: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="mb-0">
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
                        onChange={handleProfilePhotoUpload}
                      />
                    </div>

                    {/* Availability Input */}
                    <div className="mb-0">
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
                        value={verificationInfo.availability}
                        onChange={(e) =>
                          setVerificationInfo({
                            ...verificationInfo,
                            availability: e.target.value,
                          })
                        }
                      />
                      {/* Submit Button */}

                    
                    </div>
                    <br />
                    <div className="mb-5 d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-50"
                          style={{ paddingLeft: "10px" }}
                        >
                          Sign in
                        </button>
                      </div>
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

export default DoctorReg;
