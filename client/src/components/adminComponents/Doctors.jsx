import React, { useEffect, useState } from 'react'
import View from "./View";
import DataTables from "../dataTables";
import axios from 'axios';

function Doctors() {
  const [doctorList,setDoctorList]=useState()
  const [search,setSearch]=useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('')

  const adminToken = localStorage.getItem("adminToken");


  const viewDoctor = (row) => {
    const doc = doctorList.filter((el) => el._id == row._id);
    console.log(doc, "doctorList");
    setDoctorList(doc[0])
  };


  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "name",
      selector: (row) => row.userName,
    },
    {
      name: "contact",
      selector: (row) => row.contact,
    },
    // {
    //   name: "age",
    //   selector: (row) => row.age,
    // },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn "
          style={{
            backgroundColor: "#002147",
            
          }}
          onClick={() => viewPatient(row)}
        >
          View
        </button>
      ),
    },
  ];

  useEffect(()=>{
    const doctorData=async()=>{
      try {
        const res=await axios.get('admin/doctors')
        setDoctorList(res.data)
        console.log(res.data,"DoctorList=====res.data--------------61");
        if (res.status === 200) {
          console.log("successs doctors");
        } else {
          console.log("patient failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);

      }
    }
    doctorData()
  })

  return (
    <div>
    {
    //  selectedPatient ? <View user={selectedPatient} setSelected={setSelectedPatient} value="patient" /> :
     (
     <div>
       <h1>Doctors</h1>
       <input
         type="text"
        
         placeholder="search.."
         className="form-control w-25 mb-2"
       />

           <DataTables  title='Patients'  />
     </div>
       )}
 </div>
  )
}

export default Doctors