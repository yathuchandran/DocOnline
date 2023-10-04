import React from 'react'
import Navbar from '../components/Navbar'
import UserHome from '../components/userComponents/UserHome';
import useAuth from '../context/hooks/useAuth';

function HomePage() {

  const {  doctor, admin,user, setDoctor, setAdmin, setUser } = useAuth(); // Destructure once


  console.log(doctor,"doctor------", admin,"admin-------", user," =================================================================11");

  return (
    <div>
      <Navbar />
      <UserHome />

    </div>
   
  )
}

export default HomePage
