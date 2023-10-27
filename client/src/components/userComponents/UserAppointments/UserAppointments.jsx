import {useCallback, useEffect, useState} from "react";
import { useSelector } from 'react-redux'
import axios from "../../../Services/axios";
import { Navigate, useNavigate } from "react-router";
import { useSocket } from "../../../context/socket/SocketProvider";
import Loader from "../../loader";

function UserAppointments() {

  const  doctor=useSelector((state)=>state.selectedDoc.doc)
  const user=useSelector((state)=>state.user.data)
  const email = useSelector(state => state.user.data.email)
 

  const socket = useSocket()
    const navigate = useNavigate()

  const [appointments, setAppointments] = useState('');
  const [refresh,setRefresh]=useState(false)
  const [isLoading, setIsLoading] = useState(true);




  const data=user._id

  useEffect(()=>{
    async function dataCall(){
      const res=await axios.post(`/appointments`,{data})
      if (res.status===200) {
        setAppointments(res.data)

      }else{
        navigate('/findDoctor')
      }
    }
    dataCall()
  },[refresh])


  const handleAppointments=useCallback(async(id)=>{
    try {
      const res=await axios.post(`/cancelAppoint`,{id})
      setRefresh(!refresh)
      // setAppointments(res.data)

    } catch (error) {
      console.log(error);
    }
  },[])


  const handleJoin = useCallback((roomId) => {
    const room = roomId
    socket.emit("room:join", { email, room })
}, [socket, email])

const handleJoinRoom = useCallback((data) => {
    const { room } = data
    navigate(`/call/${room}`)
}, [navigate])

useEffect(() => {
  socket.on('room:join', handleJoinRoom)
  return () => {
      socket.off('room:join', handleJoinRoom)
  }
}, [socket, handleJoinRoom,refresh])


useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <Loader />;
}

  return (
    <div className=" container   d-flex justify-content-center ">

              <div className=" text-center  m-5 " style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                width:'100%'
              }}>
               <h2>Appointments</h2>
               {/* {appointments && Array.isArray(appointments) && appointments.length != 0 ? ( */}
               {appointments && appointments.length > 0 ? (
                  appointments.map((el) => (
                    <div className="card text-center m-3" key={el._id}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3 text-start">
                            <h4>Dr.{el?.doctor.name}</h4>
                            <h6 className='subText'>Bachelor of Medicine, Bachelor of Surgery (MBBS)</h6>
                            <h6 className='subText'>New Delhi, 2021 14:26 IST The Ayushman Bharat Digital Mission (ABDM)</h6>
                          </div>
                          <div className="col-md-3 mt-4 p-4">
                            <h6>Date : {el?.date}</h6>
                            <h6>Time : {el?.time}</h6>
                          </div>
                          <div className="col-md-3 mt-4 p-4">
                            {new Date(el.date) < new Date() ? (
                              'Unavailable'
                            ) : el?.isAttended ? (
                              'Attended'
                            ) : !el?.isCancelled ? (
                              <>
                                <button className='btn bg-danger text-white ps-2 pe-2' onClick={() => handleAppointments(el._id)} style={{ fontSize: "15px" }}>Cancel</button>
                                {/* {el.time === new Date(el.time) && ( */}
                                  <button style={{ fontSize: "15px" }} className='btn ps-2 pe-2 btn-outline-success' onClick={() => handleJoin(el._id + el.user)}>Join</button>
                                {/* )} */}
                              </>
                            ) : (
                              'Cancelled'
                            )}
                          </div>
                          <div className="col-md-3  ">
                            <img src="online-doctor-consultation-via-smartphone-concept-medical-application-websites-vector-flat-illustration-254988566.webp" alt="" style={{ height: '200px' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No appointments found.</p>
                )}

            </div>
    </div>
  );
}

export default UserAppointments;
