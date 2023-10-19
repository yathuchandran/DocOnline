import {useCallback, useEffect, useState} from "react";
import { useSelector } from 'react-redux'
import axios from "../../../Services/axios";
import { useNavigate } from "react-router";
import { useSocket } from "../../../context/socket/SocketProvider";

function UserAppointments() {

  const  doctor=useSelector((state)=>state.selectedDoc.doc)
  const user=useSelector((state)=>state.user.data)
  const email = useSelector(state => state.user.data.email)
 
  console.log(email,13);

  const socket = useSocket()
    const navigate = useNavigate()

  const [appointments, setAppointments] = useState('');
  const userToken = localStorage.getItem('userToken');

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
  },[])


  const handleAppointments=useCallback(async(id)=>{
    console.log(id,"id--9");
    try {
      const res=await axios.post(`/cancelAppoint`,{id})
      console.log(res.data,34);
      setAppointments(res.data)

    } catch (error) {
      console.log(error);
    }
  })


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
}, [socket, handleJoinRoom])

  return (
    <div className=" container   d-flex justify-content-center ">

              <div className=" text-center  m-5 " style={{
                border: "1px solid rgb(219, 217, 217)",
                borderRadius: "15px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                width:'80%'
              }}>
               <h2>Appointments</h2>
                  {appointments ? (appointments?.length != 0 &&
                    appointments.map(el => (
                        <div className="appointCard text-center  m-5    " key={el._id}>
                            <div className="row">
                                <div className="col-md-4 text-start">
                                    <h4>{el?.doctor.name}</h4>
                                    <h6 className='subText p-0 m-0'>zsfg</h6>
                                    <h6 className='subText'>sd</h6>
                                </div>
                                <div className="col-md-4">
                                    <h6>Date : {el?.date}</h6>
                                    <h6>Time : {el?.time}</h6>
                                </div>
                                <div className="col-md-4">
                                    {
                                        <>
                                            { } <br />
                                            {new Date(el.date) < new Date() ? 'Unavailable' : el?.isAttended ? "Attended" : !el?.isCancelled ? <><button className='btn bg-danger text-white ps-2 pe-2 ' onClick={() => handleAppointments(el?._id)} style={{ fontSize: "15px" }}>Cancel</button>
                                             <button style={{ fontSize: "15px" }} className='btn ps-2 pe-2 btn-outline-success'onClick={() => handleJoin(el._id + el.user)} >Join</button></> : 'cancelled'}
                                        </>
                                    }

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
