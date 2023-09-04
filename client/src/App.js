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
import Login from './components/Login';
import Otp from './components/Otp';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/login' element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
