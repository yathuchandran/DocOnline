import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socket/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSlot } from '../../redux/consult'
import axios from "../../Services/axios";

function Consult() {
  const [consult, setConsult] = useState([]);
  const docToken = localStorage.getItem("doctorToken");
  const socket = useSocket();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const email = useSelector((state) => state.doctor.data.docData.email);
  const id = useSelector((state) => state.doctor.data.docData._id);

  console.log(id,18,"---------------------------------------------",email);

  useEffect(()=>{
    const fetchData = async () => {
      console.log("helooo");
      try {
        const res = await axios.post(`/doctor/consult`,{id});
        console.log(res.data,25,"-----");
        setConsult(res.data)

      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  },[])





    const handleJoin = useCallback((id, room) => {
      dispatch(setSlot(id))
      console.log(room);
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
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div
        className=" container mt-4 ms-auto bg-dark "
        style={{
          width: "87%",
          paddingLeft: "0",
          background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="row m-auto p-4 ">
          <h1>Consult</h1>
          <div className="bg-white p-3">
            {consult.length !== 0 ? (
              consult.map((el) => (
                <div className="card mt-3 p-1" key={el.id}>
                  <div className="row text-center">
                    <div className="col-sm-6 mt-1">
                    <b>
                        <h3>{el.user.userName}</h3>
                    </b>
                    </div>
                    <div className="col-sm-3 mt-4">
                        <p>{el.date}</p>
                        <p>{el.time}</p>
                    </div>
                    <div className="col-sm-3 mt-4">                                 
                    {
                        <>
                    
                            {new Date(el.date) < new Date() ? 'Unavailable' : el.isAttended ? "Attended" : !el.isCancelled ? <> <button style={{ fontSize: "15px" }} className='btn ps-2 pe-2 btn-outline-success' onClick={() => handleJoin(el._id, el._id + el.user)}>Join</button></> : 'cancelled'}
                            {!el.medicines ? <button className='btn btn-success p-2 mt-1' style={{ fontSize: '14px' }} >Prescribe</button> : "Presciption added"}
                        </>
                    }
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
