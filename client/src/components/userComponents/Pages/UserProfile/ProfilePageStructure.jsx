import React, { useState } from "react";
import Profile from "../../Profile";
import './lists.css'

function ProfilePageStructure() {
  const [profile, setProfile] = useState(true);

  const profileHandle = () => {
    setProfile(true);
  };
  return (
    <div className="row" style={{ backgroundColor: "red" }}>
      <div className="col-12 col-md-3 ">
        <div className="row text-center" style={{ backgroundColor: "blue" }}>
          <div
            className="list-group p-4 mt-5"
            style={{ backgroundColor: "yellow" }}
          >
            <div className="list-group-item btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break" onClick={profileHandle}>
              {" "}
              profile
            </div>{" "}
            <br />
            <div className="list-group-item btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break">
              {" "}
              Appointments
            </div>{" "}
            <br />
            <div className="list-group-item btn-color-grey btn-outline-dark lists list-group-item-action text-wrap text-break">
              Prescriptions{" "}
            </div>{" "}
            <br />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-9 bg-light">{profile && <Profile />}</div>
    </div>
  );
}

export default ProfilePageStructure;
