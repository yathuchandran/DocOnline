



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Doctor from './pages/Doctor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<User />} ></Route>
        <Route path='/doctor/*' element={<Doctor />}></Route> 

      </Routes>
    </Router>
  );
}

export default App;
