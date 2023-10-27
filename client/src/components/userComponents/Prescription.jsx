import { useCallback, useEffect, useState } from "react";
import DownloadButton from './Download';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../Services/axios";

function Prescription() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const [prescriptions, setPrescriptions] = useState([]);

  const id = userData;
  const DataCall = useCallback(async () => {
    try {
      const res = await axios.post(`/priscriptions`, id);
      setPrescriptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    DataCall();
  }, [DataCall]);

  return (
    <div className=" container   d-flex justify-content-center ">
      <div
        className=" text-center  m-5 "
        style={{
          border: "1px solid rgb(219, 217, 217)",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
          width: "80%",
          backgroundColor: "light",
        }}
      >
        <h1 style={{ fontFamily: "Times New Roman, serif" }}>Prescription</h1>
        {Array.isArray(prescriptions) &&
          prescriptions.length != 0 ?(
          prescriptions.map((el, index) => {
            return (
              <>
                <div key={index} className="card " style={{height:'170px'}}>
                  <div className="row">
                    <div className="col-md-4 p-3">
                      <h4>Dr.{el.doctor.name}</h4>
                      <h6>{el.date}</h6>
                      <h6>{el.time}</h6>
                      <h5> </h5>
                    </div>
                    <div className="col-md-3 mt-2 ">
                    
                      <div key={index}>
                      {prescriptions && prescriptions.length > 0 ? (
                        <div>
                          <b>Medicine: </b>
                          <p>{prescriptions[0]?.medicines[0]?.medicine || "N/A"}</p>
                          <b>Descriptions: </b>
                          <p>{prescriptions[0]?.medicines[0]?.selectedDose || "N/A"}</p>
                        </div>
                      ) : (
                        <p>No such data</p>
                      )}

                      

                      </div>
                    
                    </div>

                    <div className="col-md-2 mt-5">
                    {
                      el.medicines &&
                      <DownloadButton el={el} user={userData}  />
                    }
                    <p>Download</p>
                  </div>
                  <div className="col-md-3 mt-1 m-1">
                  <img src="appointme.avif" alt="" style={{ height: '150px' }} />
                  </div>
                  </div>
                </div>
              </>
            );
          })
        ):(
          <p>No Such a Data</p>
        )}
      </div>
    </div>
  );
}

export default Prescription;
