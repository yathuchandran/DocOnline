import React, { useState, useEffect } from "react";
import axios from "../../Services/axios";
import { useDispatch, useSelector } from "react-redux";
import "./Pages/UserProfile/lists.css";
import { useNavigate } from "react-router";
import { setUserData } from "../../redux/userData";
import { Axios } from "axios";

function Profile() {
  const userData = useSelector((state) => state.user.data);
  const [preview, setPreview] = useState("");
  // const [profilee, setProfile] = useState(userData.image ? userData.image : null)
  const [name, setName] = useState(userData.userName);
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState(userData.address);
  const [contact, setContact] = useState(userData.contact);
  const [gender, setGender] = useState(userData.gender);
  const [age, setAge] = useState(userData.age);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [image, setImage] = useState("");

  console.log(userData,"userData",userData.userName);
  useEffect(() => {
    async function dataCall() {
      console.log("dataCalll");
      if (userToken) {
        await axios.get(`/userData`).then((res) => {
          if (res.data === "blocked") {
            navigate("/login");
          }
        });
      }
    }
    dataCall();
  }, []);
  

  const dispatch = useDispatch();

  const userform = {
    name: name,
    address: address,
    contact: contact,
    gender: gender,
    age: age,
    _id: userData._id,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Use Axios to upload the image to Cloudinary
        const cloudinaryURL = "https://api.cloudinary.com/v1_1/onlinedoc/image/upload";
        const uploadPreset = "onlinedoc"; // Replace with your Cloudinary upload preset

    
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", "dyvmqs56r");

        try {
          const cloudinaryResponse = await Axios.post(cloudinaryURL, formData);
    
          // Now you can access the Cloudinary response data
          console.log(cloudinaryResponse.data);
    
          // Continue with the rest of your form submission logic
          const res = await axios.put(`/setProfile`, userform);
    
          if (res.data === "error") {
            setMsg("Something went wrong");
          } else if (res.data === "blocked") {
            navigate("/login");
            localStorage.removeItem("userToken");
          } else {
            dispatch(setUserData(res.data));
            setMsg("Profile updated Successfully");
            setTimeout(() => {
              setMsg("");
            }, 4000);
            navigate("/");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };


  

  return (
    <div>
      <div className="row">
        <form className="mx-auto w-75 setProfile" encType="multipart/form-data">
          <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
          <div className="text-center  mb-3 mt-3">
            {/* {preview != [] ? (
                        <img width={'150px'} height={"200px"} className='text-wrap' src={preview} alt="" />
                    ) : userData.image ? (
                        <img
                            width={'150px'}
                            height={"200px"}
                            src={`images/${userData.image}`}
                            alt="profile"
                        />
                    ) : (
                        <img
                            width={'150px'}
                            height={"200px"}
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                            alt="default"
                        />
                    )} */}
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            {/* <input
                        className="form-control w-25 m-auto mt-3"
                        type="file"
                        onChange={(e) => {
                            setProfile(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    /> */}
            {msg == "Profile updated successfully" ? (
              <div className="alert mt-3 alert-success" role="alert">
                Profile updated successfully
              </div>
            ) : msg ? (
              <div className="alert mt-3 alert-danger" role="alert">
                {msg}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="name">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-2 form-control-sm"
                placeholder="Name..."
              />
              <label htmlFor="age">
                Age<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control mb-2 form-control-sm"
                placeholder="Age..."
              />
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
              <label htmlFor="contact">
                Contact<span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-control mb-2 form-control-sm"
                placeholder="Contact..."
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="address">
                Address<span className="text-danger">*</span>
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control h-25  mb-2 form-control-sm"
                placeholder="Address..."
              />
              Created : {userData && userData.timeStamp}
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-success mb-3"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
