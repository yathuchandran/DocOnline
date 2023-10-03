import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';


const DocSidebar = () => {

  const doctor = useSelector(state => state.doctor.data)
  const [nav, setNav] = useState(false)


  return (
    <div className='fixed bg-dark top-0 navbar flex justify-between items-center p-3 text-white' style={{ zIndex: 10 }}>

      {!nav ?
        <div className=' sm:flex items-center  docham bg-dark ms-0 mt-0 text-[18px]'>
          <div onClick={() => setNav(!nav)} className='cursor-pointer '>
            <AiOutlineMenu size={30} />
          </div>
        </div>


        : <div className='bg-grey  docham  z-10  left-0' style={{ position: "fixed", left: '0%', top: '10%' }}>
          <div className='sidebar text-center  fixed   text-white  z-10 duration-300' style={{ width: '100vw' ,backgroundColor: "#002147",}}>
            <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute  ' style={{ marginLeft: '40vw' }} />
            <h2 className='text-2xl p-4'>
              doctor<br /><span className='text-success'><h1>{doctor.name}</h1></span>
            </h2>
            <nav >
              <div className='flex flex-col  text-white'>
                <div className='text-xl sideItem py-4 flex'> Dashboard</div>
                <div className='text-xl sideItem py-4 flex'> Appointments</div>
                {/* <div className='text-xl sideItem py-4 flex'> Patients</div>
                <div className='text-xl sideItem py-4 flex'> Prescriptions</div>
                <div className='text-xl sideItem py-4 flex'> My Schedule</div>
                <div className='text-xl sideItem py-4 flex'> Admins</div> */}
              </div>
            </nav>
          </div>
        </div>}
    </div>
  );
};

export default DocSidebar;