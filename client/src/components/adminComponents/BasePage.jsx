import AdminHome from "./AdminHome";
import AdminSidebar from "./AdminSidebar";
import Patients from "./Patients";

function BasePage({ value }) {
  return (
    <div>
      <div className="adminCont">
        <div className="row">
          <div className="col-md-2 z- text-start m- bg-white side">
            <AdminSidebar />
          </div>
          <div className="col-md-9 p-">
            <div className="row mt-4 ps-2 pe-3">
              <div className="col-12 m-1">
                {value === 'home' ? 
                <AdminHome /> 
                :value==="patients"?
                 <Patients />:''
                 
                 }
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
