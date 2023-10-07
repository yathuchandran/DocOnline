import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../Services/axios";

import DocSidebar from "./DocSidebar";
import Navbar from "../Navbar";

function Slot() {
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
  ];

  const doctorData = useSelector((state) => state.doctor.data);
  const dispatch = useDispatch();

  console.log(doctorData.docData._id,"doctorData------37");

  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState("9:00 AM");
  const [addedDates, setAddedDates] = useState(doctorData?.availableSlots);

  const today = new Date();
  const minSelectableDate = new Date(today);
  const maxSelectableDate = new Date(today);
  minSelectableDate.setDate(today.getDate() + 1);
  maxSelectableDate.setDate(today.getDate() + 10);

  const handleAdd = async () => {
    try {
     
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

        const dateTimeString = `${selectDate.toDateString()} ${selectTime}`;
        const res = await axios.post("/doctor/slots", {
          doctorId: doctorData?._id,
          
        });
        console.log(res,"ressssssssssssssssssssss");
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <>
      {/* <div
        className="docCont"
        style={{
          background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)",
        }}
      >
        <Navbar value="doctor" />
        <div className="row">
          <div className="col-md-3 text-center bg-white side col-lg-3">
            <DocSidebar />
          </div> */}



          <div className="col-md-9 p-3 display-flex justify-content-center  align-item-center  m-0">
            <div className="text-center" style={{ width: "90%" ,padding:'40px',  }}>


            <div className="col-md-8 col-lg-9 m-4 mt-0 p-3 mb-1" style={{ width:'100%', height:'60vh', borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",  }}>

              {/* <Header userType={userType} /> */}
              <div className="addslot-container">
                <form className="form-container1">
                  <h2>ADD YOUR AVAILABLE SLOTS</h2>
                  <div className="form-inputs">
                    <DatePicker
                      className="date-picker"
                      selected={selectDate}
                      onChange={(date) => setSelectDate(date)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select Date"
                      minDate={minSelectableDate}
                      maxDate={maxSelectableDate}
                    />
                    <select
                      value={selectTime}
                      onChange={(e) => setSelectTime(e.target.value)}
                    >
                      {timeSlots?.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
                    </select>
                    <button type="btn button " onClick={handleAdd}>
                      Add
                    </button>
                  </div>
                  <div className="added-dates">
                    <h3>ADDED SLOTS</h3>
                    <ul>
                      {addedDates?.map((slot, index) => (
                  <li key={index}>
                    {slot}
                    <button type="button" >
                      Delete
                    </button>
                  </li>
                ))}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>

          

        {/* </div>
      </div> */}
    </>
  );
}

export default Slot;
