import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad, BiRupee } from 'react-icons/bi';
import { MdPerson, MdOutlineSick, MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const DocSidebar = () => {

  const doctor = useSelector(state => state.doctor.data)
  const [nav, setNav] = useState(false)
  const navigate = useNavigate()

  const handleDashboard = () => {
    navigate('/doctor/')
}

const handleDoctor = () => {
  navigate('/doctor/appointments')
}

const handlePatient = () => {
  navigate('/doctor/patients')
}

const handleDepartment = () => {
  navigate('/doctor/createPrscription')
}

const handlePayments = () => {
  navigate('/doctor/schedule')
}

const handleAdmins = () => {
  navigate('/doctor/payments')
}
const handleReview=()=>{
  navigate('/doctor/review')
}
  return (
    <>
            <div className=' z-10 docSide ' >
                <div className='sidebar   fixed top-0 right-0 h-100 z-10 'style={{backgroundColor: "#002147"}}>
                    <h2 className='  text-white text-center' style={{backgroundColor: "#002147",width:'19vw',height:'20vh'}}>
                        Welcome<br /><span className='text-white'><h1>{doctor.docData?.name}</h1></span>
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-white ps-2 text-center'style={{backgroundColor: "#002147",width:'20vw'}}>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDashboard}  ><button className='btn buttons'><MdPerson size={25} className='mr-4' /> Dashboard</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDoctor}><button className='btn buttons'><FaStethoscope size={25} className='mr-4' /> Appointments</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePayments}><button className='btn buttons'><MdCalendarMonth size={25} className='mr-4' /> My Schedule</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePatient}><button className='btn buttons'><MdOutlineSick size={25} className='mr-4' /> Patients</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDepartment}><button className='btn buttons'><BiNotepad size={25} className='mr-4' /> Prescriptions</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleReview}><button className='btn buttons'><FaStar size={25} className='mr-4' /> Reviews</button></div>

                            <div className='text-xl sideItem py-4 flex' onClick={handleAdmins}><button className='btn buttons'><BiRupee size={25} className='mr-4' /> Payments</button></div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
  );
};

export default DocSidebar;