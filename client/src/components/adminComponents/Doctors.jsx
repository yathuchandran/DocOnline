import React, { useEffect, useState } from "react";
import axios from "../../Services/axios";
import DataTables from "../dataTables";
import View from "./View";

function Doctors() {
  const [doctorList,setDoctorList]=useState([])
  const [search,setSearch]=useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('')

  const adminToken = localStorage.getItem("adminToken");


  const viewDoctor = (row) => {
    const doc = doctorList.filter((el) => el._id == row._id);
    setSelectedDoctor(doc[0])
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = doctorList.filter((doctor) =>

    doctor.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  };


  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "name",
      selector: (row) => <div className="tip " data-bs-toggle="tooltip" title={row.name}> {row.name}</div>
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
      name: 'Department',
      selector: (row) => row.department,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn "
          style={{
            backgroundColor: "#002147",
            
          }}
          onClick={() => viewDoctor(row)}
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
        setFilteredData(res.data)

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
  },[])

  return (
    <div>
    {
      selectedDoctor ? <View user={selectedDoctor} setSelected={setSelectedDoctor} value="doctor" /> :
     (
     <>
       <h1>Doctors</h1>
       <input
         type="text"
         value={search}
         onChange={handleSearch}
         placeholder="search.."
         className="form-control w-25 mb-2"
       />

           <DataTables columns={columns} title='Doctors' data={filteredData} />
     </>
       )}
 </div>
  )
}

export default Doctors