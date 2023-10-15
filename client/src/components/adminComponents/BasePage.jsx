import { Suspense } from 'react'

import AdminSidebar from "./AdminSidebar";
import Departments from "./Departments";
import Doctors from "./Doctors";
import Patients from "./Patients";
import Loader from "../loader";
import Navbar from '../Navbar'
import AdminHome from "./AdminHome";


function BasePage({ value }) {
  return (
    <div>
      <div className="adminCont "style={{background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)",}}>
        <div className="row">
        <Navbar value='admin'  />
          <div className="col-md-2  text-center  ps-2 m-0 pe-2  side">
            <AdminSidebar />

          </div>
          <div className="col-md-9 p-0">
            <div className="row mt-4 ps-5 pe-2 ">
              <div className="col-12 m-1" style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", 
          
        }}>
                <Suspense fallback={<Loader />}>
                  {value == "doctors" ? (
                    <Doctors />
                  ) : value == "patients" ? (
                    <Patients />
                  ) : value == "departments" ? (
                    <Departments />
                  ) :value == "home" ?(
                    <AdminHome />
                  ) : (
                    ""
                  )}
                </Suspense>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePage;
