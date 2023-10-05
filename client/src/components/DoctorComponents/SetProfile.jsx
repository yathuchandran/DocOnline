import { useEffect, useState } from 'react';
import './setProfile.css';
import axios from '../../Services/axios';
import { setDoctorData } from '../../redux/doctorData';
import { useDispatch, useSelector } from 'react-redux';


function SetProfile() {
    const docData = useSelector((state) => state.doctor.data);
    console.log(docData,"docData.docData.name");

    const [name, setName] = useState(docData.docData?.name||"");
    const [age, setAge] = useState(docData.docData?.age||"");
    const [qualification, setQualification] = useState(docData.docData.qualification||"");
    const [gender, setGender] = useState(docData.docData.gender||"");
    const [fee, setFee] = useState(docData.docData.fee||"");
    const [contact, setContact] = useState(docData.docData.contact||"");
    const [department, setDepartment] = useState(docData.docData.department||"");
    const [address, setAddress] = useState(docData.docData.address||"");
    const [selectedImages, setSelectedImages] = useState(docData.docData.documents||"");
    const [profile, setProfile] = useState(docData.docData.image||"");
    const [preview, setPreview] = useState(docData.docData.image||'');
    const [msg, setMsg] = useState('');
    const [prChange, setPrChange] = useState(false);
    const [docChange, setDocChange] = useState(false);
    const [departments, setDepartments] = useState([]);

    const doctorToken = localStorage.getItem('doctorToken');


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

    const dispatch = useDispatch();


 

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

    const handlsubmit=async(e)=>{
        e.preventDefault()

        const userform = {
            name: name,
            address: address,
            contact: contact,
            gender: gender,
            age: age,
            _id: docData.docData._id,
            image: profile, 
            qualification:qualification,
            fee:fee,
            department:department,
            profileChange:prChange,
          };

          try {
            const res=await axios.post('/doctor/setprofile',userform)

            console.log(res,"resssssssssssssssssssssssssssssssssssssssssssssssssssss");

          } catch (error) {
            console.log(error);
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
                            <label htmlFor="department">Department<span className="text-danger">*</span></label>
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-success text-dark p-1 text-start dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ fontSize: "15px" }}
                                >
                                    {  department ? (    Array.isArray(departments) && departments.length > 0 ?  
                                        departments.find((el) => el._id === department)?.name || "Department"   
                                           : "No Departments Available"  ) : "Department"}

                                </button>
                                <ul className="dropdown-menu">

                                <ul className="dropdown-menu">
                                  {Array.isArray(departments) && departments.length > 0 ? (
                                    departments.map((dep, index) => (
                                      <li onClick={() => setDepartment(dep._id)} key={index}>
                                        {dep.name}
                                      </li>
                                    ))
                                  ) : (
                                    <li>No Departments Available</li>
                                  )}
                                </ul>

                                </ul>
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
                            <label htmlFor="doc" className="mt-2">
                                Documents
                            </label>
                            <br />
                            <input type="file" name="images" multiple  />
                            <br />
                            <div className='d-flex flex-wrap horizontal-scroll-container'>


                                <div className='horizontal-scroll-content flex-raw d-flex'>
                                {docData && docData.docData && docData.docData.documents ? (
                                      docData.docData.documents.map((doc, index) => (
                                        <div key={0 - index} className='d-flex flex-column'>
                                          <img
                                            key={index}
                                            className='me-2 mt-2'
                                            width={'100px'}
                                            height={'80px'}
                                            src={import.meta.env.VITE_BASE_URL + `images/${doc}`}
                                            alt=''
                                          />
                                          <button
                                            key={index + '.' + index}
                                            className='me-2 mt-1 btn btn-outline-success p-0'
                                            value={doc}
                                            style={{ fontSize: '10px' }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ))
                                    ) : (
                                      "Ooopsie..! No data found."
                                    )}


                                </div>
                            </div>


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