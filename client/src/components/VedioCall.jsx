import {useState,useEffect,useRef,useCallback} from 'react'
import { useSocket } from '../context/socket/SocketProvider'

function VedioCall({value}) {
  const socket=useSocket()

  const [remoteSocketId, setRemoteSocketId] = useState()
  const docToken = localStorage.getItem('doctorToken')
  const [myStream, setMyStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState()


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined`);
    console.log("joined");
    setRemoteSocketId(id)
  }, [])









  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
   



    return () => {
      socket.off('user:joined', handleUserJoined)
     

    }
  }, [socket, handleUserJoined,])

  return (
    <>
        <div className="text-center mt-4 p-2">
        <h3><b>CONSULTING STATION</b></h3>


        <div className="container">
        <div className="row text-start ">
        <div className="col-md-6 ">
          <h1>My streame</h1>
        </div>


        <div className="col-md-6">
          <h1>remote</h1>
        </div>

        </div>
        </div>
        <br />
        <h6>hei</h6>

        </div>


    </>
  )
}

export default VedioCall