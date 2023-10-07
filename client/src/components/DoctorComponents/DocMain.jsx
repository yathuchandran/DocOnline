import PropTypes from 'prop-types'

import DoctorHome from "./DoctorHome";
import DocSidebar from './DocSidebar';
import Navbar from '../Navbar';
import Schedule from './Schedule';

DocMain.propTypes = {
  value: PropTypes.string,
};

function DocMain({ value }) {
  return (
    <>
      <div className="docCont"   style={{background: "linear-gradient(to bottom, rgb(240, 230, 245), #99ccff)",}}>
              <Navbar value='doctor' />
        <div className="row">
          <div className="col-md-3 text-center bg-white side col-lg-3"> 
              <DocSidebar />
           </div>
          <div className="col-md-9 p-0">
            <div style={{ width: "100%" }}>
              {value == "home" ? 
              <DoctorHome />
                :value == 'schedule' ?
                    <Schedule />: ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocMain;
