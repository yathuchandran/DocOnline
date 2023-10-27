import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../Services/axios'
import { Link, useNavigate } from 'react-router-dom'

function CreatePrescription() {
  const userData = useSelector(state => state.prescription.data)
  const descriptionRef = useRef()
  const [medicines, setMedicines] = useState()
  const [dose, setDose] = useState('')
  const [description, setdescription] = useState('')

  
  const [medDetails, setMedDetails] = useState(new Map())
  const navigate = useNavigate()
  const [mor, setMor] = useState(false)
  const [aft, setAft] = useState(false)
  const [evg, setEvg] = useState(false)


  useEffect(() => {
    if(!userData){
        navigate('/doctor/consult')
    }
  }, [navigate, userData])




const handleUpload = useCallback(async () => {
    const id=userData._id
    const playload = Array.from(medDetails).map(([medicine, selectedDose,description]) => ({
        medicine,
        selectedDose,
        description,
      }));
     const res= await axios.patch('/doctor/addPrescription', {playload,id:id})
        if (res.data == 'done') {
            navigate('/doctor/consult')
        }
    },[medDetails,userData.user._id])

 

const handleAddClick = useCallback(() => {
  let med = ''
  if (mor) {
      med = '1'
  } else {
      med = '0'
  }
  if (aft) {
      med = med + '-' + '1'
  } else {
      med = med + '-' + '0'
  }
  if (evg) {
      med = med + '-' + '1'
  } else {
      med = med + '-' + '0'
  }
 
  if (medicines && dose&&description) {
    setMedDetails(prev => {
        const updated = new Map(prev)

        updated.set(medicines+' ' ,dose + ' ' + med + ' '+description )

        return updated
    })
    setMedicines('');
    setDose('');
    setdescription('')
}

}, [aft, dose, evg, mor, medicines,description])





  return (
    <>
     <div className=" container      "style={{ width: "100%", paddingLeft: "20px", marginLeft:"15px", }}>
     <div className='bg-white p-5 m-4 mb-0' style={{
              width: "100%",
              paddingLeft: "10px",
              background: "",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}>

          <div className="row mb-1 ">
                <div className="col-md-6  ">
                <h4>Patient : {userData.user.userName}</h4>
    
                    <h5>Date : {userData?.date}</h5>
                    <h5>Time : {userData?.time}</h5>
                </div>
                <div className="col-md-6">
                    <h5>Health issue :</h5>
                    <p>{userData?.issues}</p>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <div className="row mb-0 ">
                <div className="col-md-5    ">
                <div className="col-md-10  mt-0">
                   <span>Medicine</span>
                <input className='form-control mt-2' placeholder='Description...' type="text" 
                value={medicines}
                onChange={(e)=>setMedicines(e.target.value)}
                />
                </div>
                
             
                </div>
                <div className="col-md-2 custom-padding ">
                    <span>dose</span>
                <input className='form-control mt-2 ' placeholder='Description...' type="text" 
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                />
                </div>
                <div className="col-md-5  m-3 mt-0 ">
                <div className="col-md-11  m-5 mt-0">

                   <span>Description</span>
                <input className='form-control mt-2 '  placeholder='Description...' type="text" value={description}
                onChange={(e) => setdescription(e.target.value)} />
                </div>


                
                </div>

            </div>

            <div className="col-md-3 mt-0 mb-0 d-flex justify-content-center align-items-center">
                        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                            <div className='mt-3'>
                                <input className="form-check-input" onChange={() => setMor(!mor)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Mor
                                </label>
                            </div>
                            <div className='mt-3'>

                                <input className="form-check-input" onChange={() => setAft(!aft)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Aft
                                </label>
                            </div>
                            <div className='mt-3'>

                                <input className="form-check-input" onChange={() => setEvg(!evg)} type="checkbox" value="" id="" />
                                <label className="form-check-label" htmlFor="">
                                    Evg
                                </label>
                            </div>
                        </div>
                      
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                    <button className='mx-auto mt-3 btn btn-success' onClick={handleAddClick} style={{ maxWidth: "100px" }}>Add</button>

                    </div>
                    <h4>Prescription</h4>
                {Array.from(medDetails).map(([medicine, selectedDose,description]) => (
                    <div key={medicine}>
                        <p>{medicine}: {selectedDose}:{description}</p>
                        {/* <p>hai{description}</p> */}
                    </div>
                ))}
                <div className="row">
                    <button className='btn btn-outline-success mx-auto' onClick={handleUpload} style={{ maxWidth: '200px' }}>Upload</button>
                </div>
            </div>
     </div>
    </>
  )
}

export default CreatePrescription























































// <div className=" container      "style={{ width: "100%", paddingLeft: "20px", marginLeft:"15px", }}>
        
//         <div className='bg-white p-5 m-4' style={{
//               width: "100%",
//               paddingLeft: "10px",
//               background: "",
//               borderRadius: "10px",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//             }}>
    
//             <div className="row  ">
//                 <div className="col-md-6  ">
//                     <h4>Patient : {userData.userData?userData?.userData[0]?.userName:''}</h4>
//                                     <h4>Patient : {userData.user.userName}</h4>
    
//                     <h5>Date : {userData?.date}</h5>
//                     <h5>Time : {userData?.time}</h5>
//                 </div>
//                 <div className="col-md-6">
//                     <h5>Health issue :</h5>
//                     <p>{userData?.issues}</p>
//                 </div>
//                 <div className="col-md-6">
//                     <input className='form-control mt-2 ' ref={descriptionRef} placeholder='Description...' type="text" />
//                 </div>
//             </div>
            
//             <div className="row">
//             <div>
//           <h2>Prescription Form</h2>
//           <form onSubmit= ''>
//             <div className="form-group">
//               <label>Patient Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 // value={patientName}
//                 // onChange={(e) => setPatientName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Patient Age</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 // value={patientAge}
//                 // onChange={(e) => setPatientAge(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Prescription Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 // value={prescriptionDate}
//                 // onChange={(e) => setPrescriptionDate(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Medication</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 // value={medication}
//                 // onChange={(e) => setMedication(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Dosage</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 // value={dosage}
//                 // onChange={(e) => setDosage(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Instructions</label>
//               <textarea
//                 className="form-control"
//                 // value={instructions}
//                 // onChange={(e) => setInstructions(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//           </form>
//         </div>
               
//                 <div className="col-md-3 ml-auto">
//                     <div className="d-flex" style={{ justifyContent: 'space-between' }}>                  
//                         <div className='mt-4'>
//                             <input className="form-check-input" onChange={() => setMor(!mor)} type="checkbox" value="" id="" />
//                             <label className="form-check-label" htmlFor="">
//                                 Mor
//                             </label>
//                         </div>
//                         <div className='mt-4'>
    
//                             <input className="form-check-input" onChange={() => setAft(!aft)} type="checkbox" value="" id="" />
//                             <label className="form-check-label" htmlFor="">
//                                 Aft
//                             </label>
//                         </div>
//                         <div className='mt-4 mt-0'>
    
//                             <input className="form-check-input" onChange={() => setEvg(!evg)} type="checkbox" value="" id="" />
//                             <label className="form-check-label" htmlFor="">
//                                 Evg
//                             </label>
//                         </div>
//                     </div>
//                     <button className='mx-auto mt-3   btn btn-success' onClick={handleAddClick} style={{ maxWidth: "100px" ,}}>Add</button>
    
//                 </div>
                
//                 {/* <div className="col-md-5   mt-0">
//                     <input className='form-control mt-2 ' ref={descriptionRef} placeholder='Description...' type="text" />
//                 </div> */}
//             </div>
    
//             {/* <h4>Prescription</h4>
//             {Array.from(medDetails).map(([medicine, selectedDose]) => (
//                 <div key={medicine}>
//                     <p>{medicine}: {selectedDose}</p>
//                 </div>
//             ))} */}
//             <div className="row">
//                 <button className='btn btn-outline-success mx-auto' onClick={handleUpload} style={{ maxWidth: '200px' }}>Upload</button>
//             </div>
//         </div>
//         </div>


