import React, { useEffect, useState } from "react";
import axios from "../../Services/axios";
import DataTables from "../dataTables";
import View from "./View";


function Patients() {
  const [patientsList, setPatientsList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('')

  const adminToken = localStorage.getItem("adminToken");

  const viewPatient = (row) => {
    const doc = patientsList.filter((el) => el._id == row._id);
    console.log(doc, "patientsList");
     setSelectedPatient(doc[0])
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = patientsList.filter((patient) =>
      patient.userName.toLowerCase().startsWith(searchValue)
    );
    console.log(filtered);
    setFilteredData(filtered);
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

  useEffect(() => {
    const patientData = async () => {
      console.log("patientData");
      try {
        console.log("patientData======");

        const res = await axios.get("admin/patients", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          }
        })
        console.log(res, "res 10");
        console.log(res.data, "res.status 11");
        setPatientsList(res.data);

        if (res.status === 200) {
          console.log("successs patient");
        } else {
          console.log("patient failed");
        }
      } catch (error) {
        console.log("An error occurred");
        console.error("An error occurred:", error);
      }
    };

    patientData();
  }, [adminToken]); // Make sure to include an empty dependency array to run the effect only once

  return (
    <div>
       {
        selectedPatient ? <View user={selectedPatient} setSelected={setSelectedPatient} value="patient" /> :
          (
        <div>
          <h1>Patient</h1>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="search.."
            className="form-controll"
          />

          <DataTables columns={columns} title="Patients" data={filteredData} />
        </div>
          )}
    </div>
  );
}

export default Patients;
