import { useEffect, useState } from 'react'
import './Appointments.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
// import { setAppointment } from '../../../redux/appointment'

function Appointment() {

    const docData = useSelector(state => state.selectedDoc.doc)
    const userData = useSelector(state => state.user.data)

console.log(docData,"=======================",userData);
  return (
    <div>Appointment</div>
  )
}

export default Appointment