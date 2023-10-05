import React from 'react';
import Navbar from '../components/Navbar';
import UserHome from '../components/userComponents/UserHome';
import useAuth from '../context/hooks/useAuth';
import DoctcorHome from '../components/DoctorComponents/DoctorHome';
import AdminHome from '../components/adminComponents/AdminHome';

function HomePage() {
  const { doctor, admin, user } = useAuth(); // Destructure once

  return (
    <div>
       <Navbar />
          <UserHome />
      {user === 'user' ? (
        <div>
          <Navbar />
          <UserHome />
        </div>
      ) : user === 'doctor' ? (
        <div>
          <Navbar />
          <DoctcorHome />
        </div>
      ) : user === 'admin' ? (
        <div>
          <Navbar />
          <AdminHome />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default HomePage;
