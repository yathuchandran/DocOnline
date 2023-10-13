import React, { useState, useEffect } from "react";
import axios from "../../Services/axios";
import { useDispatch, useSelector } from "react-redux";
import "./Pages/UserProfile/lists.css";
import { useNavigate } from "react-router";
import { setUserData } from "../../redux/userData";

function Profile() {
  const userData = useSelector((state) => state.user.data);
  const [preview, setPreview] = useState(userData?.image ||"");
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
      console.log("dataCall");
      if (userToken) {
        await axios.get(`/userData`).then((res) => {
          if (res.data === "blocked") {
            navigate("/login");
          }
        }).catch((err)=>{
          console.log(err.message)
        })
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
        setPreview(reader.result)
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
        <form className="mx-auto w-75 setProfile bg-light" encType="multipart/form-data" style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Add box shadow
              }}>
          <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
          <div className="text-center  mb-3 mt-2">
            {preview != [] ? (
              <img
                width={"150px"}
                height={"200px"}
                className="text-wrap"
                src={preview}
                alt=""
              />
            ) : userData.image ? (
              <img
                width={"150px"}
                height={"200px"}
                src={`images/${userData.image}`}
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

            <input
              type="file"
              className="form-control w-25 m-auto mt-3"
              onChange={(e) => handleFileChange(e)}
            />
            
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
              <label htmlFor="name">
              Name
                </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3  "
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
            <div className="col-lg-5 m-1">
              <label htmlFor="address">
                Address<span className="text-danger">*</span>
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control h-55  mb-2 "
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










// import React from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
// import './profil.css'
// export default function EditButton() {
//   return (
//     <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
//       <MDBContainer className="py-5 h-100">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol lg="9" xl="7">
//             <MDBCard>
//               <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
//                 <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
//                   <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
//                     alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
//                   <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
//                     Edit profile
//                   </MDBBtn>
//                 </div>
//                 <div className="ms-3" style={{ marginTop: '130px' }}>
//                   <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
//                   <MDBCardText>New York</MDBCardText>
//                 </div>
//               </div>
//               <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="d-flex justify-content-end text-center py-1">
//                   <div>
//                     <MDBCardText className="mb-1 h5">253</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
//                   </div>
//                   <div className="px-3">
//                     <MDBCardText className="mb-1 h5">1026</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
//                   </div>
//                   <div>
//                     <MDBCardText className="mb-1 h5">478</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
//                   </div>
//                 </div>
//               </div>
//               <MDBCardBody className="text-black p-4">
//                 <div className="mb-5">
//                   <p className="lead fw-normal mb-1">About</p>
//                   <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
//                     <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
//                     <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
//                     <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
//                   <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
//                 </div>
//                 <MDBRow>
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBRow className="g-2">
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }