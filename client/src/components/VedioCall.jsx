import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../context/socket/SocketProvider'
import ReactPlayer from 'react-player'
import peer from '../components/services/peer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../Services/axios'
import { BsFillTelephoneFill, BsFillTelephoneXFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import PropTypes from 'prop-types'


VedioCall.propTypes = {
  value: PropTypes.string
}

function VedioCall({value}) {
  const navigate = useNavigate()
  const socket = useSocket()
  const remoteRef = useRef()
  const [remoteSocketIds, setRemoteSocketIds] = useState([])
  const docToken = localStorage.getItem('doctorToken')
  const [myStreams, setMyStream] = useState()
  const [remoteStream, setRemoteStream] = useState()
  const [callActive, setCallActive] = useState(false)
  const appoint = useSelector(state => state.consult.slot)
  const [muted, setMuted] = useState(true)
  const [accepted, setAccepted] = useState(false)

  
  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketIds(prevIds => [...prevIds, id]);
  }, []);

  


  const handleCallUser = useCallback(async () => {
    if (callActive) {
      myStreams?.getTracks().forEach((track) => track.stop());
      setMyStream(null);
      socket.emit('call:end', { to: remoteSocketIds })
      setCallActive(false)
      setRemoteStream('')
      if (value==='doctor') {
       const res= await axios.patch(`doctor/endAppointment/${appoint}`)
      }
      socket.emit('socket:disconnect', { socketId: remoteSocketIds });
      if (value == 'doctor') {
        navigate('/doctor/success')
      } else if (value == "user") {
        navigate('/feedback')
      }

    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      const offer = await peer.getOffer()
      socket.emit('user:call', { to: remoteSocketIds, offer })
      setMyStream(stream)
      setCallActive(true)
    }
  }, [appoint, callActive, docToken, myStreams, navigate, remoteSocketIds, socket, value])



  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketIds(from);
    setCallActive(true);
    try {
     

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

      setMyStream(stream);
      const ans = await peer.getAnswer(offer);

      socket.emit('call:accepted', { to: from, ans });
    } catch (error) {
      console.error(error);
    }
  }, [socket]);
  

  const sendStreams = useCallback(() => {
    setAccepted(true)
    for (const track of myStreams.getTracks()) {
      peer.peer.addTrack(track, myStreams);
    }
    setCallActive(true)
  }, [myStreams]);


  const handleCallAccepted = useCallback((from,ans)=>{
    peer.setLocalDescription(ans);
      setCallActive(true)
      sendStreams()

  },[sendStreams]
  
  );

  const handleNegoNeeded = useCallback(async () => {
    try {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketIds })
  } catch (error) {
    console.error(error);
  }
  }, [remoteSocketIds, socket])

  const handleNegoIncoming = useCallback(async ({ from, offer }) => {
    try {
      
      const ans = await peer.getAnswer(offer)  
      socket.emit('peer:nego:done', { to: from, ans })
    } catch (error) {
      console.error( error);

    }
  }, [socket])


  const handleNegoFinal = useCallback(async ({ ans }) => {

    try {
      await peer.setLocalDescription(ans);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleMute = useCallback(() => {
    setMuted(!muted)
  }, [muted])



  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
    }
  }, [handleNegoNeeded])

  useEffect(() => {
    peer.peer.addEventListener('track', async ev => {
      const remoteStream = ev.streams
      setRemoteStream(remoteStream[0])
    })
  }, [])

  useEffect(() => {
    socket.on('user:joined', (data) => {
      handleUserJoined(data);});
       socket.on('incoming:call',(data)=>{ handleIncomingCall(data)})
       socket.on('call:accepted',(data)=>{ handleCallAccepted(data)})       
       socket.on('peer:nego:needed', (data)=>{ handleNegoIncoming(data)})
       socket.on('peer:nego:final', (data)=>{handleNegoFinal(data)})

    return () => {
      socket.off('user:joined', (data) => {
        handleUserJoined(data)})
      socket.off('incoming:call', (data)=>{ handleIncomingCall(data)})
      socket.off('call:accepted', (data)=>{ handleCallAccepted(data)})
      socket.off('peer:nego:needed', (data)=>{ handleNegoIncoming(data)})
      socket.off('peer:nego:final', (data)=>{ handleNegoFinal(data)})

    }
  }, [socket, handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted])

  return (
    <>
      <div className="text-center  p-2">
        <h3><b>CONSULTING STATION</b></h3>
        {
          value == 'user' ? (!remoteSocketIds && 'Please wait till the call arrives') : (
            !callActive && <h5>{remoteSocketIds ? 'Patient online' : 'No one in room'}</h5>)
        }
        {/* {myStream&&<ReactPlayer url={myStream}/>} */}
        <h6>ihef</h6>
        <div className="container">
          <div className="row text-start">
            <div className="col-md-6">
              {
                myStreams &&
                <h1>My stream</h1>}
              {

                myStreams && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStreams} playing muted width={'80%'} height={'80%'} />
              }
            </div>
            <div className="col-md-6">
              {remoteStream &&
                <h1>Remote stream</h1>
              }
              {

                remoteStream && <ReactPlayer style={{ backgroundColor: 'black' }} ref={remoteRef} url={remoteStream} playing muted={muted} width={'80%'} height={'80%'} />
              }

            </div>
          </div>

          <br />
          {callActive && <button className='btn bg-danger text-white' onClick={handleCallUser}><BsFillTelephoneXFill /></button>}
          {
            myStreams && <>
              <button className={!muted ? 'btn btn-primary ms-3' : 'btn btn-dark ms-3'} onClick={handleMute}>{muted ? <BsMicMuteFill /> : <BsMicFill />}</button>
            </>
          }


          {value == 'user' && myStreams && <><button className={accepted ? 'd-none' : 'btn btn-success ms-3'} onClick={sendStreams}><BsFillTelephoneFill /></button></>}
          {
            !callActive ? (value === 'doctor' && (remoteSocketIds && <button className='btn btn-outline-success' onClick={handleCallUser}>Call</button>)) : ''
          }
        </div>
      </div>
    </>
  )
}

export default VedioCall




















































