import React, { useState,useEffect } from 'react';
import axios from "../../Services/axios";
import { useDispatch, useSelector } from 'react-redux';
import './Pages/UserProfile/lists.css'
import { useNavigate } from 'react-router';
import { setUserData } from '../../redux/userData';

function Profile() {
   
      const user = useSelector(state => state.user.data);
      const [preview, setPreview] = useState('')
      const [profile, setProfile] = useState(user.image)
      const [name, setName] = useState(user.userName)
      const [msg, setMsg] = useState('');
      const [address, setAddress] = useState(user.address);
      const [contact, setContact] = useState(user.contact);
      const [gender, setGender] = useState(user.gender);
      const [age, setAge] = useState(user.age);
      const navigate=useNavigate()
      const { userName, email, _id, isBlocked, isApproved } = user;

      useEffect(() => {
        async function dataCall() {
            
                // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                await axios.get(`/userData`)
                    .then(res => {
                        if (res.data == 'blocked') {
                            navigate('/login')

                        }
                    })
        }
        dataCall()
    })

    const dispatch=useDispatch()

    const handleSubmit =async(e)=>{
      console.log("handleSubmit");
      e.preventDefault()
      const formData =new FormData();
      formData.append('name',name);
      formData.append('age', age)
      formData.append('images', profile)
      formData.append('address', address)
      formData.append('contact', contact)
      formData.append("gender", gender)
console.log(formData,"formData-----49");
      try {
        axios.put(`/setProfile`,formData)
        .then(res=>{
          if (res.data==='error') {
            setMsg("Something went wrong")
          }else if(res.data=='blocked'){
            navigate('/login')
            localStorage.removeItem('userToken')
          }else{
            dispatch(setUserData(res.data))
            setMsg('Profile updated Successfully')
            setTimeout(()=>{
              setMsg('')
            },4000)
          }
        })
      } catch (error) {
        console.log(error);
      }





    }

    
      async function fetchData() {
        try {
          const res = await axios.post(`/profile`, { user });
          console.log("==", res.data, "result user data = 18");
    
        } catch (error) {
          console.error(error);
          console.log("==error===");
        }
      }
          useEffect(() => {
        fetchData();
      }, []);
    

    
  return (
    
    <div>
      <div className="row">
      <form className="mx-auto w-75 setProfile" encType="multipart/form-data">
                <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
                <div className="text-center  mb-3 mt-3">
                    {preview != [] ? (
                        <img width={'150px'} height={"200px"} className='text-wrap' src={preview} alt="" />
                    ) : user.image ? (
                        <img
                            width={'150px'}
                            height={"200px"}
                            src={import.meta.env.VITE_BASE_URL + `images/${user.image}`}
                            alt="profile"
                        />
                    ) : (
                        <img
                            width={'150px'}
                            height={"200px"}
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                            alt="default"
                        />
                    )}
                    <br />
                    <input
                        className="form-control w-25 m-auto mt-3"
                        type="file"
                        onChange={(e) => {
                            setProfile(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                    {msg == "Profile updated successfully" ?
                        <div className="alert mt-3 alert-success" role="alert">
                            Profile updated successfully
                        </div>
                        : msg ?
                            <div className="alert mt-3 alert-danger" role="alert">
                                {msg}
                            </div>
                            : ''
                    }
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="name">Name<span className="text-danger">*</span></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control mb-2 form-control-sm"
                            placeholder="Name..."
                        />
                        <label htmlFor="age">Age<span className="text-danger">*</span></label>
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
                                <div className="">Gender<span className="text-danger">*</span></div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={gender === 'male'}
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
                                        checked={gender === 'female'}
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
                        <label htmlFor="contact">Contact<span className="text-danger">*</span></label>
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
                        <label htmlFor="address">Address<span className="text-danger">*</span></label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control h-25  mb-2 form-control-sm"
                            placeholder="Address..."
                        />

                        Created : {user && user.timeStamp}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <button className="btn btn-outline-success mb-3" onClick={handleSubmit}>
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
