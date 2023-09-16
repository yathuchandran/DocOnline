import PropTypes from 'prop-types'

import DoctorHome from "./DoctorHome";
import DocSidebar from './DocSidebar';

DocMain.propTypes = {
  value: PropTypes.string,
};

function DocMain({ value }) {
  return (
    <>
      <div className="docCont">
        <div className="row">
          <div className="col-md-3 text-center bg-white side col-lg-3"> 
              <DocSidebar />
                    </div>
          <div className="col-md-9 p-5">
            <div style={{ width: "100%" }}>
              {value == "home" ? <DoctorHome /> : ""}
            </div>
          </div>
          <h1>haiii</h1>

        </div>
      </div>
    </>
  );
}

export default DocMain;
