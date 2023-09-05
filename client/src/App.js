



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import LogInPage from './pages/LogInPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<User />} ></Route>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LogInPage />} />


      </Routes>
    </Router>
  );
}

export default App;
