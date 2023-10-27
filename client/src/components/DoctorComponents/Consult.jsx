import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socket/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSlot } from '../../redux/consult'
import axios from "../../Services/axios";
import { setData } from '../../redux/prescriptionData'


function Consult() {
  const [consult, setConsult] = useState([]);
  const docToken = localStorage.getItem("doctorToken");
  const socket = useSocket();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const email = useSelector((state) => state.doctor.data.docData.email);
  const id = useSelector((state) => state.doctor.data.docData._id);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.post(`/doctor/consult`,{id});
        setConsult(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[])


  const handlePrescribe = useCallback((el) => {
    dispatch(setData(el))
    navigate('/doctor/createPrscription')
}, [dispatch, navigate])


    const handleJoin = useCallback((id, room) => {

      dispatch(setSlot(id))
      socket.emit("room:join", { email, room })
  }, [dispatch, socket, email])

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/doctor/call/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join" , (data)=>{handleJoinRoom(data)});
    return () => {
      socket.off("room:join",  (data)=>{handleJoinRoom(data)});
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div
        className=" container mt-4 ms-auto  "
        style={{
          width: "87%",
          paddingLeft: "0",
          // background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="row m-auto p-4 text-center ">
          <h1 style={{ fontFamily: "Times New Roman, serif" }}>Consult</h1>

          <div className="bg-white p-3">
            {consult.length !== 0 ? (
              consult.map((el) => (

                <div className="card mt-3 p-1" key={el.id}>
                  <div className="row text-start m-0">
                    <div className="col-sm-3 mt-5">
                    <b> <h3>{el.user.userName}</h3></b>
                    </div>
                    <div className="col-sm-3 mt-4">
                        <p>{el.date}</p>
                        <p>{el.time}</p>
                    </div>
                    <div className="col-sm-3 mt-5">                                 
                    {
                        <>
                    
                            {new Date(el.date) < new Date() ? 'Unavailable' : el.isAttended ? "Attended" : !el.isCancelled ? <> <button style={{ fontSize: "15px" }} className='btn ps-2 pe-2 btn-outline-success' onClick={() => handleJoin(el._id, el._id + el.user._id)}>Join</button><span>{' '}</span></> : 'cancelled'}
                            {!el.medicines ? <button className='btn btn-success p-2 mt-1' style={{ fontSize: '14px' }} onClick={() => handlePrescribe(el)} >Prescribe</button> : "Presciption added"}
                        </>
                    }
                    </div>
                    <div className="col-sm-3 ">
                      <img src="/medical-conference-23-2148901289.jpg" width={'200px'} alt="" />
                      </div>                           


                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consult;
