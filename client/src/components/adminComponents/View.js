import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import axios from '../../Services/axios';

function View({ user, setSelected, value }) {
  const [msg, setMsg] = useState('');
  const [blockButton, setBlockButton] = useState(user.isBlocked ? 'Unblock' : 'Block');

  const docIdRef = useRef();

  const handlePatient = async () => {
    const adminToken = localStorage.getItem('adminToken');
    const isUserBlocked = !user.isBlocked;
    console.log(isUserBlocked,"isUserBlocked");

    try {
        console.log("handlePatient 17");
        
        const res = await axios.put(
            `admin/managePatient/${user._id}`,
            { isUserBlocked },
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
      

      if (res.data === 'blocked' || res.data === 'unblocked') {
        const newMsg = `This account has been ${
            res.data === 'blocked' ? 'blocked' : 'unblocked'
        } successfully.`;

        setMsg(newMsg);

        setSelected({ ...user, isBlocked: isUserBlocked });

        setTimeout(() => {
          setMsg('');
        }, 4000);
      } else {
        setMsg('There was an unexpected error.');
      }
    } catch (error) {
      console.error(error);
      setMsg('An error occurred while processing your request.');
    }
  };


  useEffect(() => {
    if (user.isBlocked == true) setBlockButton("Block")
    else setBlockButton("Unblock")
}, [ user.isBlocked])



  const { name, email, _id, isBlocked, isApproved } = user;
  return (
    <>
         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure...?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Mention the reason for blocking.</p>
                            <textarea className='w-100'name="reason" id="" rows="3" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" >{blockButton}</button>
                        </div>
                    </div>
                </div>
            </div>

      <div className='container' style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col-12">
            <div style={{ width: "90%", outline: "2px solid #28a745", borderRadius: '10px' }} className='m-auto p-3 bg-white'>
              <button className='btn btn-outline-success ' style={{ backgroundColor: "#002147" }} onClick={() => setSelected('')}>back</button>
              <div className='text-center '>
                <h1>{name}</h1>
                <div className="row">
                  <div className="col-lg-6 text-start ">
                    <b>Email</b>: {email} <br />
                    <b>ID</b>: {_id} <br />
                  </div>
                </div>
                <div className='mt-2'>
                  {value === "doc" && !isBlocked && isApproved === 'approved' && (
                    <button className='btn block btn-danger' data-bs-toggle="modal" ref={docIdRef} data-bs-target="#exampleModal" value={_id}>
                      {blockButton}
                    </button>
                  )}
                  {isApproved === 'rejected' && "rejected"}
                  {value !== "doc" && (
                    <button className='btn block btn-danger' value={_id} onClick={handlePatient}>
                      {blockButton}
                    </button>
                  )}
                        {msg && <div>{msg}</div>}

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
