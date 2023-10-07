import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";



function Slot() {

    const userType = "doctor";
    const timeSlots = [ "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", ];
    
    const doctorData = useSelector((state) => state.doctor.doctor);
    const dispatch = useDispatch();

    const [selectDate, setSelectDate] = useState(null)
    const [selectTime, setSelectTime] = useState("9:00 AM");
    const today = new Date();
    const minSelectableDate = new Date(today);
    const maxSelectableDate = new Date(today);
    minSelectableDate.setDate(today.getDate()+1);
    maxSelectableDate.setDate(today.getDate() + 10);
    
    
    const handleAdd=async()=>{
        if (selectDate) {
            const dateTimeString=`${selectDate.toDateString()}${selectedTime}`;
            docId:
            try {
                const res=await axios.post("/doctor/slots")
            } catch (error) {
                console.error(error)

            }
        }
    }
    
    return (
        <>
        <Header userType={userType} />
        <div className="addslot-container">
          <form className="form-container1">
            <h2>ADD YOUR AVAILABLE SLOTS</h2>
            <div className="form-inputs">
              <DatePicker
                className="date-picker"
                selected={selectedDate}
                // onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select Date"
                minDate={minSelectableDate}
                maxDate={maxSelectableDate}
              />
              <select
                value={selectedTime}
                // onChange={(e) => setSelectedTime(e.target.value)}
              >
                {/* {timeSlots?.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))} */}
              </select>
              <button type="button" onClick={handleAdd}>
                Add
              </button>
            </div>
            <div className="added-dates">
              <h3>ADDED SLOTS</h3>
              <ul>
                {/* {addedDates?.map((slot, index) => (
                  <li key={index}>
                    {slot}
                    <button type="button" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </li>
                ))} */}
              </ul>
            </div>
          </form>
        </div>
      </>
  )
}

export default Slot