import PropTypes from 'prop-types'

import DoctorHome from "./DoctorHome";
import DocSidebar from './DocSidebar';
import Navbar from '../Navbar';
import Schedule from './Schedule';
import DocAppointments from './DocAppointments';
import Consult from './Consult';

DocMain.propTypes = {
  value: PropTypes.string,
};

function DocMain({ value }) {
  return (
    <>
      <div className="docConts"   style={{background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)",height:'112vh'}}>
              <Navbar value='doctor' />
        <div className="row">
          <div className="col-md-2 text-center bg-white side col-lg-2"> 
              <DocSidebar />
           </div>
          <div className="col-md-10">
            <div style={{ width: "100%" }}>
              {value == "home" ? 
              <DoctorHome />
                :value == 'schedule' ?
                    <Schedule/>
                    :value == 'appointments' ?
                    <DocAppointments/>
                    : value == 'consult' ?
                    <Consult />
                    :''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocMain;
