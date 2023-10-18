
import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/socket/socketProvider'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function Consult() {
    const [consult, setConsult] = useState([])
    const docToken = localStorage.getItem('doctorToken')
    const socket = useSocket()
    const navigate = useNavigate()


    const dispatch = useDispatch()
    const email = useSelector(state => state.doctor.data.email)

    
  return (
    <div>Consult</div>
  )
}

export default Consult