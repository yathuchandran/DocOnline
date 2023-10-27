import PropTypes from 'prop-types'

import DoctorHome from "./DoctorHome";
import DocSidebar from './DocSidebar';
import Navbar from '../Navbar';
import Schedule from './Schedule';
import DocAppointments from './DocAppointments';
import Consult from './Consult';
import CreatePrescription from './CreatePrescription';
import Review from './Review';
import Payments from './Payments';

DocMain.propTypes = {
  value: PropTypes.string,
};

function DocMain({ value }) {
  return (
    <>
      <div className="docConts bg-light"   >
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
                    : value == 'createPrescription' ?
                        <CreatePrescription />
                        : value == 'review' ?
                        <Review />
                        : value == 'payments' ?
                           <Payments />
                        :''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocMain;
