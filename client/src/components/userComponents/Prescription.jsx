import { useCallback, useEffect, useState } from "react";
import DownloadButton from './Download';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../Services/axios";

function Prescription() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const [prescriptions, setPrescriptions] = useState([]);
  console.log(prescriptions?.[0], "userData", 10);

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
        <h1>Prescription</h1>
        {Array.isArray(prescriptions) &&
          prescriptions.length > 0 &&
          prescriptions.map((el, index) => {
            return (
              <>
                <div key={index} className="card " style={{height:'200px'}}>
                  <div className="row">
                    <div className="col-md-4 p-3">
                      <h4>Dr.{el.doctor.name}</h4>
                      <h6>{el.date}</h6>
                      <h6>{el.time}</h6>
                      <h5> </h5>
                    </div>
                    <div className="col-md-4 mt-2 ">
                    
                      <div key={index}>
                        <b>Medicine{"   :  "}</b> <p> {prescriptions?.[0]?.medicines[0].medicine},{" "} </p>  
                       
                        <b>Descriptions{"   :  "}</b><p>{prescriptions?.[0]?.medicines[0].selectedDose} </p>  
                        
                        {/* <b>Descriptions{"   :  "}</b><p>{prescriptions?.[0]?.medicines[0].feedback} </p>   */}


                      </div>
                    
                    </div>

                    <div className="col-md-4 mt-3">
                    {
                      el.medicines &&
                      <DownloadButton el={el} user={userData} />
                    }
                  </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Prescription;
