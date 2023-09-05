import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#002147", color: "white" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="small-logo" src="/Screenshotfrom.png" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: "white" }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/services"
                style={{ color: "white" }}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                style={{ color: "white" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ backgroundColor: "#002147", color: "white" }}
          >
            Profile
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <Link className='dropdown-item' to={'/profile'} >Profile</Link>
            <Link className='dropdown-item' to={'/logout'} >Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
