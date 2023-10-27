import React, { useState, useEffect } from "react";
import axios from "../../Services/axios";
import { useDispatch, useSelector } from "react-redux";
import "./Pages/UserProfile/lists.css";
import { useNavigate } from "react-router";
import { setUserData } from "../../redux/userData";

function Profile() {
  const userData = useSelector((state) => state.user.data);
  const [preview, setPreview] = useState(userData?.image || "");
  const [name, setName] = useState(userData?.userName || "");
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState(userData?.address || "");
  const [contact, setContact] = useState(userData?.contact || ""); // Fixed '|' to '||'
  const [gender, setGender] = useState(userData?.gender || "");
  const [age, setAge] = useState(userData?.age || "");
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [image, setImage] = useState(userData?.image || null); // Initialize image state with null

  useEffect(() => {
    async function dataCall() {
      if (userToken) {
        await axios
          .get(`/userData`)
          .then((res) => {
            if (res.data === "blocked") {
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
    dataCall();
  }, [navigate, userToken]); // Added dependencies to useEffect

  const dispatch = useDispatch();

  const userform = {
    name: name,
    address: address,
    contact: contact,
    gender: gender,
    age: age,
    _id: userData._id,
    image: image, // Use the selected image here
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the image state to the reader result
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="row">
      <form
        className="mx-auto w-75 setProfile bg-light"
        encType="multipart/form-data"
        style={{
          border: "1px solid rgb(219, 217, 217)",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
        }}
      >
        <div className="text-center text-bold mb-0 mt-3">SET PROFILE</div>
        <div className="text-center  mb-0 mt-0">
          <div className="d-flex flex-column align-items-center text-center ">
            {/* <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="User Profile" /> */}
            {preview != [] ? (
              <img
                width={"150px"}
                height={"200px"}
                className="text-wrap rounded-circle mt-0"
                src={preview}
                alt=""
              />
            ) : userData.image ? (
              <img
                width={"150px"}
                height={"200px"}
                src={`images/${userData.image}`}
                alt="profile"
                className="rounded-circle mt-0"
              />
            ) : (
              <img
                width={"150px"}
                height={"200px"}
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                alt="default"
                className="rounded-circle mt-0"
              />
            )}
            <span className="font-weight-bold">{name}</span>
            <span className="text-black-50">{address}</span>
            <input
              type="file"
              className="form-control w-25 m-auto mt-0"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <br />
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
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-2  "
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
              className="form-control mb-2 "
              placeholder="Age..."
            />
            <div className="row">
              <div className="col-md-6 m-1">
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
              className="form-control mb-2 "
              placeholder="Contact..."
            />
          </div>
          <div className="col-lg-5 m-1">
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

        <div className=" text-center">
          <button
            className="btn btn-outline-success mb-3"
            style={{ backgroundColor: "#002147" }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>



    </div>
  );
}

export default Profile;
