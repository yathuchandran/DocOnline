

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSchedule } from '../../redux/doctorSchedule'
import './schedule.css'
import axios from '../../Services/axios'

function Schedule() {

  const timeSlots = ['8.00 AM', '8.30 AM', '9.00 AM', '9.30 AM', '10.00 AM', '10.30 AM', "11.00 AM", "11.30 AM", "12.00 PM", '12.30 PM', '1.00 PM', '1.30 PM', '2.00 PM', '2.30 PM', '3.00 PM', '3.30 PM', '4.00 PM', '4.30 PM', '5.00 PM', '5.30 PM', '6.00 PM', '6.30 PM', '7.00 PM', '7.30 PM', '8.00 PM', '8.30 PM', '9.00 PM', '9.30 PM', '10.00 PM']
  const days = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [freeDate, setFreeDate] = useState('')
  const [freeTime, setFreeTime] = useState([])
  const [msg, setMsg] = useState('')
  const [scheduleLists,setScheduleLists]=useState('')

  const dispatch = useDispatch()



useEffect(()=>{
const dataCall=async ()=>{
try {
  const res=await axios.get(`/doctor/schedule`,)
  console.log(res.data,"res.data----------------------------------------27");
  dispatch(setSchedule(res))
  console.log(res,"res.data.doctorSchedule-------------------------------29");

} catch (error) {
  console.log(error);
}
}
dataCall()
},[dispatch])


const handleSchedule=async(e)=>{
  e.preventDefault()
  console.log("res-------------40");

  try {
    if(!freeDate||!freeTime){
      setMsg('Please fill date and time')
      setTimeout(() => {
        setMsg('')
      }, 3000)
      return
      }
  
      const res=await axios.post(`/doctor/setSchedule`, { date: freeDate, time: freeTime, action: e.target.value })
      console.log(res.data,"res-------------50");
      if (res.data == 'error') {
        setMsg("Something went wrong")
      } else {
        setMsg('Slot added successfully')
        setScheduleLists(res.data)
         setTimeout(() => {
          setMsg('')
        }, 3000)
        return
      }
  } catch (error) {
    setMsg("An error occurred");

  }
  
}

const removeSlot = async (e) => {
  e.preventDefault()
  try {
    const data = e.target.value.split('_')
  const res =await axios.post('/doctor/setSchedule', { date: data[0], time: data[1], action: 'remove' })
  
  if (res.data == 'error') {
    setMsg("Something went wrong")
  } else {
    setMsg('Slot removed successfully')
    dispatch(setSchedule(res))
    setTimeout(() => {
      setMsg('')
    }, 3000)
    return
  }
  } catch (error) {
    setMsg("An error occurred");

  }
  
}

    
  return (
<>
      <div className=" container  ms-auto " style={{ width:'86%',paddingLeft:'10px'}}>
        <h2>My Schedule</h2>
        <div className=' text-center 'style={{   background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",}}>
          {msg == 'Please fill date and time' || msg == 'error' ?
            <div className='alert alert-danger'>{msg}</div>
            : !msg ? '' : <div className='alert alert-success'>{msg}</div>

          }
          <div className='d-flex p-3' style={{ maxWidth: '100%', justifyContent: 'center' }} >
            <div className="row">
              <div className="col-md-6 m-0">
                <div className="dropdown">
                  <button className="btn dropd dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {freeDate ? freeDate : 'Day'}
                  </button>
                  <ul className="dropdown-menu">
                    {days && days.map((el, index) =>
                      <li key={index}><a className="dropdown-item" onClick={() => setFreeDate(el)} href="#">{el}</a></li>
                    )
                    }
                  </ul>
                </div>
              </div>
              <div className="col-md-6 m-0">
                <div className="dropdown">
                  <button type="button" className="btn dropd dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Slot
                  </button>
                  <ul className="dropdown-menu  dropdown-toggle-split">
                    {timeSlots.map((el) => (
                      <li key={el}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={el}
                            id={el}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFreeTime((prevFreeTime) => [...prevFreeTime, el]);
                              } else {
                                setFreeTime((prevFreeTime) =>
                                  prevFreeTime.filter((time) => time !== el)
                                );
                              }
                            }}
                          />
                          <label className="form-check-label" htmlFor={el}>
                            {el}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className='btn bg-success text-white ms-auto ' value={'add'} 
          onClick={handleSchedule}
          >Add</button>
          <div>
  <div style={{ maxWidth: "200px" }}>Selected Time:<br /> {freeTime.map((el, index) => (
    <span key={index}>{el}, </span>
  ))}</div>
  {scheduleLists && scheduleLists.map((el, index) => (
    <div key={index} className="card text-start m-3 p-3">
      <div>
        <b style={{ fontSize: '20px' }}>Date : </b>{el.date}
      </div>
      <div>
        <h5>Time Slots :</h5>{el.time.map((time, timeIndex) => (
          <div className='btn p-1 m-2 text-white dropd' key={timeIndex}>
            {time}
            <button className='btn mt-0 ms-1 text-danger' value={el.date + '_' + time} 
              onClick={removeSlot}
            >X</button>
          </div>
        ))}
        <br />
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </>
      )
}

export default Schedule