import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import axios from "../../Services/axios";

function View({ user, setSelected, value }) {
  const [msg, setMsg] = useState("");
  const [blockButton, setBlockButton] = useState(
    user.isBlocked ? "Unblock" : "Block"
  );
  const [reason, setReason] = useState("");

  const docIdRef = useRef();

  console.log(user._id, "docIdRef------------14");

  const handleDoctor = async () => {
    const isDocBlocked = !user.isBlocked;
    try {
      const res = await axios.put(`admin/manageDoctor/${user._id}`, {
        isDocBlocked,
      });
      if (res.data === "blocked" || res.data === "unblocked") {
        const newMsg = `This account has been ${
          res.data === "blocked" ? "blocked" : "unblocked"
        } successfully.`;

        setMsg(newMsg);

        setSelected({ ...user, isBlocked: isDocBlocked });

        setTimeout(() => {
          setMsg("");
        }, 4000);
      } else {
        setMsg("There was an unexpected error.");
      }
    } catch (error) {}
  };

  const handlePatient = async () => {
    const adminToken = localStorage.getItem("adminToken");
    const isUserBlocked = !user.isBlocked;
    try {
      const res = await axios.put(
        `admin/managePatient/${user._id}`,
        { isUserBlocked },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data === "blocked" || res.data === "unblocked") {
        const newMsg = `This account has been ${
          res.data === "blocked" ? "blocked" : "unblocked"
        } successfully.`;

        setMsg(newMsg);

        setSelected({ ...user, isBlocked: isUserBlocked });

        setTimeout(() => {
          setMsg("");
        }, 4000);
      } else {
        setMsg("There was an unexpected error.");
      }
    } catch (error) {
      console.error(error);
      setMsg("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    if (user.isBlocked === true) setBlockButton("Block");
    else setBlockButton("Unblock");
  }, [user.isApproved, user.isBlocked, value]);

  return (
    <>
      <div
        className="container"
        
      >
        {/* <div
          className="card"
          
        > 
        */}
          {/* <div className="card-header">
            <h1 className="fs-5">Are you sure...?</h1>
          </div>
          <div className="card-body" >
            <p>Mention the reason for blocking.</p>
            <textarea
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
              className="form-control"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              name="reason"
              rows="3"
            /> 
          </div>*/}
          {/* <div className="card-footer">
            <button type="button" className="btn btn-secondary">
              Close
            </button>
           
          </div> 
          </div>*/}
        
  

      <div className="container">
        <div className="row">
          <div className="col-13">
            <div
              style={{
                width: "90%",
                // outline: "2px solid #28a745",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Add this line for box shadow
              }}
              className="m-auto p-5 bg-white"
            >
              <button
                className="btn btn-outline-success "
                onClick={() => setSelected("")}
              >
                Back
              </button>
              <div className="text-center">
                {user?.image ? (
                  <img
                    width={"200px"}
                    height={"250px"}
                    src={`${user.image}`}
                    alt="sdf"
                  />
                ) : (
                  <img
                    width={"200px"}
                    src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                    alt="dedf"
                  />
                )}
                <h1>{user.name}</h1>
                {msg === "There was an unexpected error." ? (
                  <div className="alert alert-danger">{msg}</div>
                ) : msg === "" ? (
                  ""
                ) : (
                  <div className="alert alert-success">{msg}</div>
                )}
                <div className="row text-center ">
                  <div className="col-lg-6 text-start">
                    <b>Email: {user?.email}</b>
                    <br />
                    <b>Contact: {user?.contact}</b>
                    <br />
                    {value === "user" ? (
                      <>
                        <b>Age: {user.age}</b>
                        <br />
                      </>
                    ) : null}
                    <b>Gender: {user?.gender}</b>
                    <br />
                    {value === "doctor" && (
                      <>
                        <b>
                          Is-Approved:{" "}
                          {!user.isApproved ? "Not Approved" : "Approved"}
                        </b>
                        <br />
                      </>
                    )}
                    <b>
                      Is-Blocked: {!user.isBlocked ? "Not Blocked" : "Blocked"}
                    </b>
                    <br />
                  </div>
                  <div className="col-lg-6 text-center">
                    {value === "doctor" ? (
                      <>
                        <b>Consultation fee: {user?.fee}</b>
                        <br />
                        <b>Department: {user?.department}</b>
                        <br />
                        <b>Qualification: {user?.qualification}</b>
                        <br />
                        <b>Documents:</b>
                        <div className=" d-flex flex-wrap">
                          {user && user.document ? (
                            <div className="d-flex flex-column align-items-center">
                              <img
                                className="me-2 mt-2"
                                width={"150px"}
                                height={"150px"}
                                src={`${user.document}`}
                                alt=""
                              />
                              <button
                                className="me-2 mt-2 btn btn-outline-success p-1"
                                style={{ fontSize: "10px" }}
                              >
                                Download
                              </button>
                            </div>
                          ) : (
                            "Oopsie...! No Data found"
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <b>Address:</b> {user?.address}
                        <br />
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-center">
                  {value === "doctor" ? (
                    <>
                      {!user.isApproved && (
                        <button
                          className="btn btn-success me-2"
                          value={user._id}
                          onClick={(e) => handleDoctor(e, "approve")}
                        >
                          Approve
                        </button>
                      )}
                      {!user.isApproved && (
                        <button
                          className="btn btn-danger me-2"
                          value={user._id}
                          onClick={(e) => handleDoctor(e, "reject")}
                        >
                          Reject
                        </button>
                      )}
                      {!user.isBlocked && user.isApproved === "approved" && (
                        <button
                          className="btn block btn-danger"
                          data-bs-toggle="modal"
                          ref={docIdRef}
                          data-bs-target="#exampleModal"
                          value={user._id}
                        >
                          {blockButton}
                        </button>
                      )}
                      {user.isBlocked && user.isApproved === "approved" && (
                        <button
                          className="btn block btn-danger"
                          ref={docIdRef}
                          onClick={(e) => handleDoctor(e, "block")}
                          value={user._id}
                        >
                          {blockButton}
                        </button>
                      )}
                      {user.isApproved === "rejected" && "Rejected"}
                    </>
                  ) : (
                    <button
                      className="btn block btn-danger"
                      value={user._id}
                      onClick={handlePatient}
                    >
                      {blockButton}
                    </button>
                  )}
                   <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => handleDoctor(e, "block")}
            >
              {blockButton}
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

View.propTypes = {
  user: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default View;
