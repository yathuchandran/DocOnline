import React, { useEffect, useCallback, useState,useRef } from "react";
import ReactPlayer from "react-player";
import peer from "./services/peer";
import { useSocket } from "../context/socket/SocketProvider";
import { useNavigate } from 'react-router-dom'
import axios from '../Services/axios'
import PropTypes from 'prop-types'
import { BsFillTelephoneFill, BsFillTelephoneXFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

// RoomPage.propTypes = {
//     value: PropTypes.string
//   }

const RoomPage = ({value}) => {
  const socket = useSocket();
  const navigate = useNavigate()
  const appoint = useSelector(state => state.consult.slot)
  const remoteRef = useRef()

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [callActive, setCallActive] = useState(false)
  const [muted, setMuted] = useState(true)
  const [accepted, setAccepted] = useState(false)


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    if (callActive) {
        myStream?.getTracks().forEach((track) => track.stop());
        setMyStream(null);
        socket.emit('call:end', { to: remoteSocketId })
        setCallActive(false)
        setRemoteStream('')
        if (value==='doctor') {
          console.log("appointment");
         const res= await axios.patch(`doctor/endAppointment/${appoint}`)
         console.log(res.data,46,"vedicall");
        }
        socket.emit('socket:disconnect', { socketId: remoteSocketId });
        if (value == 'doctor') {
          navigate('/doctor/success')
        } else if (value == "user") {
          navigate('/feedback')
        }
  
      } else {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setCallActive(true)
}
  }, [remoteSocketId, socket,appoint, callActive,myStream, navigate, remoteSocketId,value]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      setCallActive(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    setAccepted(true)
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setCallActive(true)
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
      setCallActive(true)
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

    const handleMute = useCallback(() => {
    setMuted(!muted)
  }, [muted])


  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="text-center  p-2">
        <h3><b>CONSULTING STATION</b></h3>
        {
          value == 'user' ? (!remoteSocketId && 'Please wait till the call arrives') : (
            !callActive && <h5>{remoteSocketId ? 'Patient online' : 'No one in room'}</h5>)
        }
                <div className="container">
                <div className="row text-start">
                <div className="col-md-6">
                {
                myStream &&
                <h1>My stream</h1>}
              {

                myStream && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted width={'80%'} height={'80%'} />
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
            myStream && <>
              <button className={!muted ? 'btn btn-primary ms-3' : 'btn btn-dark ms-3'} onClick={handleMute}>{muted ? <BsMicMuteFill /> : <BsMicFill />}</button>
            </>
          }


          {value == 'user' && myStream && <><button className={accepted ? 'd-none' : 'btn btn-success ms-3'} onClick={sendStreams}><BsFillTelephoneFill /></button></>}
          {
            !callActive ? (value === 'doctor' && (remoteSocketId && <button className='btn btn-outline-success' onClick={handleCallUser}>Call</button>)) : ''
          }
                </div>

      {/* <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )} */}
    </div>
  );
};

export default RoomPage;
