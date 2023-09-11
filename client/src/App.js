// import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Doctor from './pages/Doctor';
import Admin from './pages/Admin';


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<User />} />
        <Route path='/doctor/*' element={<Doctor />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
