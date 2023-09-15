import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver';
// import './view.css'
import axios from '../../Services/axios';
import PropTypes from 'prop-types'

View.propTypes = {
    user: PropTypes.object,
    setSelected: PropTypes.func,
    value: PropTypes.string

}

function View({ user, setSelected, value }) {

    console.log(user,setSelected, value,"valuesss view 16");
    const [msg, setMsg] = useState('')
    const [blockButton, setBlockButton] = useState('')
    const [reason, setReason] = useState('')
    const docIdRef = useRef()
    const isuserBlocked = user.isBlocked; // Use isuserBlocked here

    console.log(user.isBlocked,"user 23==============");

        useEffect(() => {
        if (user.isBlocked === false) {
            setBlockButton("Block");
        } else {
            setBlockButton("Unblock");
        }
    }, [user.isApproved, user.isBlocked, value]);

console.log(user.isApproved, user.isBlocked, value,"user.isApproved, user.isBlocked, value");
   
    

const handlePatient = async (e) => {
    const adminToken = localStorage.getItem('adminToken')
    await axios.patch( `admin/managePatient/${e.target.value}`, { isuserBlocked: isuserBlocked }, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    })
    .then(res => {
      console.log(res.data ,"res,data 40");
      if (res.data == "blocked") {
        setMsg("This account is blocked successfully.")
        user.isBlocked = true
        **// Update the user.isBlocked state variable**
        setSelected(user)
      } else if (res.data == "unblocked") {
        setMsg("This account has been unbloacked.")
        user.isBlocked = false
        **// Update the user.isBlocked state variable**
        setSelected(user)
      } else setMsg("There was an unexpected error.")
  
      setSelected(user)
      setTimeout(() => {
        setMsg('')
      }, 4000)
    })
  }

    return (
        <>

<button className='btn block btn-danger' value={user._id} onClick={handlePatient}>{blockButton}</button>


            <div className='container' style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div style={{ width: "90%", outline: "2px solid #28a745", borderRadius: '10px' }} className='m-auto p-3 bg-white'>
                            <button className='btn btn-outline-success bg-light' style={{ backgroundColor: "#002147", color: 'white' }} onClick={() => setSelected('')}>back</button>
                            <div className='text-center '>
                               
                                <h1>{user.name}</h1>
                              
                                <div className="row">
                                    <div className="col-lg-6 text-start ">

                                        <b>Email</b>:{user?.email} <br />
                                        <b>ID</b>:{user?._id} <br />

                                    </div>
                                   
                                </div>
                                <div className='mt-2'>
                                    {
                                        value == "doc" ?
                                            <>
                                                {!user.isBlocked && user.isApproved == 'approved' && <button className='btn block btn-danger' data-bs-toggle="modal" ref={docIdRef} data-bs-target="#exampleModal" value={user._id}>{blockButton}</button>}
                                                {user.isApproved == 'rejected' && "rejected"}
                                            </>
                                            :
                                            <button className='btn block btn-danger' value={user._id} onClick={handlePatient}>{blockButton}</button>
                                    }
                                                                                

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View