import React from "react";
import axios from "../../Services/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap"; // Import Bootstrap components
import "./UserHome.css";

function UserHome() {
  const [departments, setDepartments] = useState([]);
  const history = useNavigate();

  useEffect(() => {
   const  fetchData=async()=> {
      try {
        const res = await axios.get(`/departments`);
        setDepartments(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <div className=" mt-0">

      <div className="banner relative"  >
        <img
          className="banner-image"
          src="/WhatsApp Image .jpeg"
          alt=""
          style={{height:'90vh'}}
        />
        
        <div className="hero-text ">
          <p className="text-bold mt-0 font-bold"style={{paddingRight:'90px'}}>RELAX FIND YOUR DOCTOR</p>
          <button
            type="button"
            className="btn btn-success btn-lg btn-md"
            onClick={() => history("/findDoctor")}
            style={{
              backgroundColor: "#002147", // Add the background color here
              color: "white", // Optionally, set the text color
            }}
          >
            Find doctor
          </button>
        </div>
      </div>

            
           
      
      <div className="container card mt-5 mb-5 py-5 "style={{background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)", paddingLeft:'1rem', boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", 
}}>
        <h3>Departments Available</h3>
        <p>You can select the department you need to checkout.</p>
        <div className=" row " >
        {departments && Array.isArray(departments) && departments.map(dep => (
  <div className="col-md-3 text-center mx-0 col-sm-4 col-6 h-25" key={dep._id}>
    <div className='card mt-3 mb-3' style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)" }}>
      <img className='depImage' src={dep.image} alt="" />
      <h4 className='mt-0'>{dep.name}</h4>
    </div>
  </div>
))}

        </div>

        </div>
        
      <div className="container">
        <div className="row">
          <div className="col-12 card p-4">
            <h6>We provide you the best services</h6>
            <p>We consider your entire wellness and we are intended to provide you the best doctors and services.</p>
            <div className="card docCardImg">
              <p className='m-5 par' ><b>Qualified and experienced doctors are available for each department. Book a slot for online consult.</b></p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserHome;
