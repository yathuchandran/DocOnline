// import React from "react";
// import Navbar from "./pages/navbar/Navbar"

// import "./App.css"
// // import auth from "./pages/auth/Signup";
// //import LandingPage from "./pages/landingPage/LandingPage";

// function App() {
//   return (
//     <Router>
//     <div className="app_container">
//       hiiiiiiiiiiiiiiiiiii
//       <Navbar />
//     <LandingPage/>
//     </div>
//     </Router>

    
//     );
// }

// export default App;







import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import Otp from './components/Otp';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/login' element={<LogInPage />} />


      </Routes>
    </Router>
  );
}

export default App;
