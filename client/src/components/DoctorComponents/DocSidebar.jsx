import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { FaStethoscope } from 'react-icons/fa';
import { BiNotepad, BiRupee } from 'react-icons/bi';
import { MdPerson, MdOutlineSick, MdCalendarMonth } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


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
  navigate('/doctor/prescriptions')
}

const handlePayments = () => {
  navigate('/doctor/schedule')
}

const handleAdmins = () => {
  navigate('/doctor/payments')
}

  return (
    // <div className='fixed bg-dark top-0 navbar flex justify-between items-center p-3 text-white' style={{ zIndex: 10 }}>

    //   {!nav ?
    //     <div className=' sm:flex items-center  docham bg-dark ms-0 mt-0 text-[18px]'>
    //       <div onClick={() => setNav(!nav)} className='cursor-pointer '>
    //         <AiOutlineMenu size={30} />
    //       </div>
    //     </div>


    //     : <div className='bg-grey  docham  z-10  left-0' style={{ position: "fixed", left: '0%', top: '0%' }}>
    //       <div className='sidebar text-center  fixed   text-white  z-10 duration-300' style={{ width: '25vw' ,backgroundColor: "#002147",height:'100vh'}}>
    //         <AiOutlineClose onClick={() => setNav(!nav)} size={20} className='absolute  ' style={{ marginLeft: '10vw' }} />
    //         <h2 className='text '>
    //           doctor<br /><span className='text-white'><h1>{doctor.docData.name}</h1></span>
    //         </h2>
    //         <nav >
    //           <div className='flex flex-col  text-white'>
    //           <div className='text-xl buttons py-1 flex' onClick={handleDashboard}  >   <MdPerson size={25} className='mr-4' /> <p>Dashboard</p></div>
    //             <div className='text-xl sideItem py-1 flex' onClick={handleAppointments}><FaStethoscope size={25} className='mr-4' /> <p>Appointments</p></div>
    //             <div className='text-xl sideItem py-1 flex' onClick={handlePatient}><MdOutlineSick size={25} className='mr-4' /> <p>Patients</p></div>
    //             <div className='text-xl sideItem py-1 flex' onClick={handlePrescriptions}><BiNotepad size={25} className='mr-4' /> <p>Prescriptions</p></div>
    //             <div className='text-xl sideItem py-1 flex' onClick={handleSchedule}><MdCalendarMonth size={25} className='mr-4' /> <p>My Schedule</p></div>
    //             <div className='text-xl sideItem py-1 flex' onClick={handleAdmins}><BiRupee size={25} className='mr-4' /> Admins</div>
    //           </div>
    //         </nav>
    //       </div>
    //     </div>}
    // </div>


    <>
            <div className='bg-black z-10 docSide top-0 left-0' style={{ zIndex: 10, right:'10%', left: '10%', top: '10%', }}>
                <div className='sidebar   fixed top-0 right-0 h-100 z-10 'style={{backgroundColor: "#002147"}}>
                    <h2 className='  text-white text-center' style={{backgroundColor: "#002147",width:'28vw',height:'20vh'}}>
                        Wellcome<br /><span className='text-white'><h1>{doctor.docData}</h1></span>
                    </h2>
                    <nav >
                        <div className='flex flex-col  text-white ps-2 text-center'style={{backgroundColor: "#002147",width:'29vw'}}>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDashboard}  ><button className='btn buttons'><MdPerson size={25} className='mr-4' /> Dashboard</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDoctor}><button className='btn buttons'><FaStethoscope size={25} className='mr-4' /> Appointments</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePatient}><button className='btn buttons'><MdOutlineSick size={25} className='mr-4' /> Patients</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleDepartment}><button className='btn buttons'><BiNotepad size={25} className='mr-4' /> Prescriptions</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handlePayments}><button className='btn buttons'><MdCalendarMonth size={25} className='mr-4' /> My Schedule</button></div>
                            <div className='text-xl sideItem py-4 flex' onClick={handleAdmins}><button className='btn buttons'><BiRupee size={25} className='mr-4' /> Payments</button></div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
  );
};

export default DocSidebar;