import AdminHome from "./AdminHome";
import { Suspense } from 'react'

import AdminSidebar from "./AdminSidebar";
import Departments from "./Departments";
import Doctors from "./Doctors";
import Patients from "./Patients";
import Loader from "../loader";

function BasePage({ value }) {
  return (
    <div>
      <div className="adminCont ">
        <div className="row bg-yellow">
          <div className="col-md-2  text-center  ps-5 pe-2 bg-white side">
            <AdminSidebar />
          </div>
          <div className="col-md-9 p-">
            <div className="row mt-4 ps-5 pe-2">
              <div className="col-12 m-1">
                <Suspense fallback={<Loader />}>
                  {value == "doctors" ? (
                    <Doctors />
                  ) : value == "patients" ? (
                    <Patients />
                  ) : value == "departments" ? (
                    <Departments />
                  ) : (
                    ""
                  )}
                </Suspense>
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePage;
