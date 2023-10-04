import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad, BiRupee } from 'react-icons/bi';
import { MdPerson, MdOutlineSick, MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const DocSidebar = () => {

  const doctor = useSelector(state => state.doctor.data)
  console.log(doctor.docData.name,"doctor sidebar");
  const [nav, setNav] = useState(false)
  const navigate = useNavigate()

  const handleDashboard = () => {
    setNav(!nav)
    navigate('/doctor/')
  }

  const handleAppointments = () => {
    setNav(!nav)
    navigate('/doctor/appointments')
  }
  const handlePatient = () => {
    setNav(!nav)
    navigate('/doctor/patients')
  }
  const handlePrescriptions = () => {
    setNav(!nav)
    navigate('/doctor/prescriptions')
  }

  const handleSchedule = () => {
    setNav(!nav)
    navigate('/doctor/schedule')
  }

  const handleAdmins = () => {
    setNav(!nav)
    navigate('/doctor/admins')
  }
  return (
    <div className='fixed bg-dark top-0 navbar flex justify-between items-center p-3 text-white' style={{ zIndex: 10 }}>

      {!nav ?
        <div className=' sm:flex items-center  docham bg-dark ms-0 mt-0 text-[18px]'>
          <div onClick={() => setNav(!nav)} className='cursor-pointer '>
            <AiOutlineMenu size={30} />
          </div>
        </div>


        : <div className='bg-grey  docham  z-10  left-0' style={{ position: "fixed", left: '0%', top: '0%' }}>
          <div className='sidebar text-center  fixed   text-white  z-10 duration-300' style={{ width: '25vw' ,backgroundColor: "#002147",height:'100vh'}}>
            <AiOutlineClose onClick={() => setNav(!nav)} size={20} className='absolute  ' style={{ marginLeft: '10vw' }} />
            <h2 className='text '>
              doctor<br /><span className='text-white'><h1>{doctor.docData.name}</h1></span>
            </h2>
            <nav >
              <div className='flex flex-col  text-white'>
              <div className='text-xl buttons py-1 flex' onClick={handleDashboard}  >   <MdPerson size={25} className='mr-4' /> <p>Dashboard</p></div>
                <div className='text-xl sideItem py-1 flex' onClick={handleAppointments}><FaStethoscope size={25} className='mr-4' /> <p>Appointments</p></div>
                <div className='text-xl sideItem py-1 flex' onClick={handlePatient}><MdOutlineSick size={25} className='mr-4' /> <p>Patients</p></div>
                <div className='text-xl sideItem py-1 flex' onClick={handlePrescriptions}><BiNotepad size={25} className='mr-4' /> <p>Prescriptions</p></div>
                <div className='text-xl sideItem py-1 flex' onClick={handleSchedule}><MdCalendarMonth size={25} className='mr-4' /> <p>My Schedule</p></div>
                <div className='text-xl sideItem py-1 flex' onClick={handleAdmins}><BiRupee size={25} className='mr-4' /> Admins</div>
              </div>
            </nav>
          </div>
        </div>}
    </div>
  );
};

export default DocSidebar;