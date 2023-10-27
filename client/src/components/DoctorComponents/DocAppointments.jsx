import { useEffect, useState } from 'react';
import DataTables from '../dataTables';
import axios from '../../Services/axios';
import {  useSelector } from 'react-redux';



function DocAppointments() {
    const [search, setSearch] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const docData = useSelector((state) => state.doctor.data);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
    
        const filtered = appointments.filter((appointment) =>
          appointment.user.name.toLowerCase().startsWith(searchValue)
        );
        setFilteredData(filtered);
      };


      const docId=docData.docData._id

  const columns = [
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true
    },
    {
      name: 'Patient',
      selector: (row) => row.user?.userName
    },
    {
      name: 'Address',
      selector: (row) => row.user?.address
    },
    {
      name: 'Phone',
      selector: (row) => row.user?.contact
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          {row.isAttended ? 'Attended' : new Date(row.createdAt) < new Date() ? 'Unavailable' : 'Pending'}
        </div>
      )
    }
  ];

  useEffect(() => {
    try {
      const getAppointments = async () => {
      const res = await axios.post('/doctor/appointments',{docId});
      setFilteredData(res.data)
      setAppointments(res.data);
    };
    getAppointments();
    } catch (error) {
      console.error("An error occurred:", error);

    }
  }, []);


  return (
<>
<div className=" container mt-5 ms-auto " style={{ width:'77%',paddingLeft:'0', background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",}}>
<div className='row m-auto' >



      <h3>Appointments</h3>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
        className="form-control  mb-2"
        style={{ width: "110px" }} // Adjust the width as needed

      />
      <DataTables
        columns={columns}
        title="Appointments"
        data={filteredData}
      />
    </div>
    </div>


    </>
      )
}

export default DocAppointments