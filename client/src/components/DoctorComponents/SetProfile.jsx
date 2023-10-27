import { useEffect, useState } from 'react';
import './setProfile.css';
import axios from '../../Services/axios';
import { setDoctorData } from '../../redux/doctorData';
import { useDispatch, useSelector } from 'react-redux';



function SetProfile() {
    const docData = useSelector((state) => state.doctor.data);
    const [name, setName] = useState(docData.docData?.name||"");
    const [age, setAge] = useState(docData.docData?.age||"");
    const [qualification, setQualification] = useState(docData.docData?.education || "");
    const [gender, setGender] = useState(docData.docData?.gender||"");
    const [fee, setFee] = useState(docData.docData?.fee||"");
    const [contact, setContact] = useState(docData.docData?.contact||"");
    const [department, setDepartment] = useState(docData.docData?.department||"");
    const [address, setAddress] = useState(docData.docData?.address||"");
    const [document,setDocument] = useState(docData.docData?.document||"");
    const [preview1, setPreview1] = useState(docData.docData?.document||'');

    const [profile, setProfile] = useState(docData.docData?.image||"");
    const [preview, setPreview] = useState(docData.docData?.image||'');
    const [msg, setMsg] = useState('');
    const [departments, setDepartments] = useState([]);

    const [exp,setExp]=useState(docData.docData?.exp||"")
    const doctorToken = localStorage.getItem('doctorToken');
    
    const dispatch = useDispatch();


    useEffect(() => {

        const fetchDepartments = async () => {
            try {
                if (doctorToken) {
                    const response = await axios.get('doctor/department');
                setDepartments(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDepartments();
    }, [doctorToken]);



 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            // Set the image state to the reader result
            setProfile(reader.result);
            setPreview(reader.result)
          };
          reader.readAsDataURL(file); // Read the selected file as a data URL
        }
      };


      const handleDocChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setDocument(reader.result);
            setPreview1(reader.result)
          };
          reader.readAsDataURL(file); 
        }
      };


      
    const handlsubmit=async(e)=>{
        e.preventDefault()

        if (!age ||!qualification||!fee) {
            setMsg("Please fill in all the fields.");
            return;
          }

        const userform = {
            name: name,
            address: address,
            contact: contact,
            gender: gender,
            age: age,
            _id: docData.docData?._id,
            // image: profile, 
            qualification:qualification,
            fee:fee,
            department:department,
            profileChange:profile,
            document:document,
          };

          try {
            const res=await axios.post('/doctor/setprofile',userform)

            if (res.status===200) {
                setMsg("profile succesfully updated")
                dispatch(setDoctorData(res.data));
            }else{
                setMsg("profile not updated")

            }
          } catch (error) {
            setMsg("An error occurred:");
        }


    }






  return (

    
 <div className=" "style={{background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)",}}>
            <div className="row">
                <form className="mx-auto w-75 setProfile" encType="multipart/form-data" style={{ background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}>
                    <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
                    <div className="text-center  mb-1 mt-3">
                        {preview ? (
                            <img width={'100px'} src={preview} alt="" />
                        ) : docData.docData.image ? (
                            <img
                                width={'100px'}
                                src={import.meta.env.VITE_BASE_URL + `images/${docData.docData.image}`}
                                alt="profile"
                            />
                        ) : (
                            <img
                                width={'100px'}
                                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                                alt="default"
                            />
                        )}
                        <br />
                        <input
                            className="form-control w-25 m-auto mt-3"
                            type="file"
                            onChange={(e) =>  handleFileChange(e)}
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
                    <div className="row pr-3 justify-content-center">
                        <div className="col-lg-6 mb-2">
                            <div className="col-md-9 text-center">
                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control mb-3  "
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
                            <label htmlFor="contact">Contact<span className="text-danger">*</span></label>
                            <input
                                type="tel"
                                id="contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Contact..."
                            />
                              <label htmlFor="qualification">Qualification<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className="form-control mb-2 form-control-sm"
                                placeholder="Qualification..."
                            />
                            </div>
                            
                            <div className="row item-center justify-content-center">
                                <div className="col-md-5">
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
                                   
                                </div>
                                <div className="col-md-6 item-end">
                                    <label htmlFor="fee"><span className="text-danger">*</span>Fees</label>
                                    <input
                                        type="number"
                                        value={fee}
                                        onChange={(e) => setFee(e.target.value)}
                                        id="fee"
                                        className="form-control w-50 mb-2 form-control-sm"
                                        placeholder="Cons. Fee..."
                                    />
                                </div>
                              
                                
                            </div>
                            <p>Department:-{docData.docData?.department}</p>

                            <div className="col-md-9 text-center mt- mb-0 item-end">
                                    <label htmlFor="fee">Expirience</label>
                                    <input
                                        type="number"
                                        value={exp}
                                        onChange={(e) => setExp(e.target.value)}
                                        id="fee"
                                        className="form-control w-60 mb-0 form-control-sm"
                                        placeholder="Expirience..."
                                    />
                                </div>
                            
                          
                          
                        </div>
                        <div className="col-lg-6 mb-2">
                            <label htmlFor="address">Address<span className="text-danger">*</span></label>
                            <textarea
                                id="address"
                                
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control h-25  mb-2 form-control-sm"
                                placeholder="Address..."
                            />
                            
                            <p>Please upload your medical qualifications so that your profile can be verified</p>
                            
                            {/* <div className='d-flex flex-wrap horizontal-scroll-container'> */}

                            <div className="text-center  mb-1 mt-1">
                            <h5>Documents</h5>

                                {preview1 ? (
                                    <img width={'250px'} src={preview1} alt="" />
                                ) : docData.docData?.document ? (
                                    <img
                                        width={'250px'}
                                        src={import.meta.env.VITE_BASE_URL + `images/${docData.docData?.document}`}
                                        alt="profile"
                                    />
                                ) : (
                                    <img
                                        width={'250px'}
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                                        alt="default"
                                    />
                                )}
                                <br />
                                <input
                                    className="form-control w-25 m-auto mt-1"
                                    type="file"
                                    onChange={(e) =>  handleDocChange(e)}
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
                            {/* </div> */}


                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-12 text-center">
                            <button className="btn btn-outline-success "onClick={handlsubmit} >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>  
        
    )
}

export default SetProfile