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
    const isuserBlocked = user.isBlocked
    useEffect(() => {
        if (user.isBlocked == false) setBlockButton("Block")
        else setBlockButton("Unblock")
    }, [user.isApproved, user.isBlocked, value])


   
    

    const handlePatient = async (e) => {
        const adminToken = localStorage.getItem('adminToken')
        await axios.patch( `admin/managePatient/${e.target.value}`, { isuserBlocked: isuserBlocked }, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data == "blocked") {
                    setMsg("This account is blocked successfully.")
                    user.isBlocked = true
                } else if (res.data == "unblocked") {
                    setMsg("This account has been unbloacked.")
                    user.isBlocked = false
                } else setMsg("There was an unexpected error.")

                setSelected(user)
                setTimeout(() => {
                    setMsg('')
                }, 4000)
            })
    }

    return (
        <>



            <div className='container' style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div style={{ width: "90%", outline: "2px solid #28a745", borderRadius: '10px' }} className='m-auto p-3 bg-white'>
                            <button className='btn btn-outline-success bg-light' style={{ backgroundColor: "#002147", color: 'white' }} onClick={() => setSelected('')}>back</button>
                            <div className='text-center '>
                                {/* {
                                    user?.image ?
                                        <img width={'200px'} src={import.meta.env.VITE_BASE_URL + `images/${user.image}`} alt="sdf" />
                                        :
                                        <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="dedf" />
                                } */}
                                <h1>{user.name}</h1>
                                {/* {
                                    msg == "There was an unexpected error." ?
                                        <div className='alert alert-danger'>{msg}</div>
                                        : msg == '' ?
                                            ''
                                            :
                                            <div className='alert alert-success'>{msg}</div>
                                } */}
                                <div className="row">
                                    <div className="col-lg-6 text-start ">

                                        <b>Email</b>:{user?.email} <br />
                                        <b>ID</b>:{user?._id} <br />

                                        {/* <b>Contact</b>:{user?.contact}<br />
                                        <b>Age</b>:{user?.age}<br />
                                        <b>Gender</b>:{user?.gender}<br />
                                        <b>Created</b> : {user?.timeStamp}<br />
                                        {
                                            value == "doc" && <div> <b>Is-Approved</b> : {!user.isApproved ? "Not Approved" : "Approved"} <br /></div>
                                        }
                                        {
                                            <div><b>Is-Blocked</b> : {!user.isBlocked ? "Not Blocked" : "Blocked"} <br /></div>
                                        } */}
                                    </div>
                                   
                                </div>
                                <div className='mt-2'>
                                    {
                                        value == "doc" ?
                                            <>
                                                {/* {!user.isApproved && <button className='btn  btn-success me-2' value={user._id} onClick={(e) => handleDoctor(e, "approve")}>Approve</button>} */}
                                                {/* {!user.isApproved && <button className='btn  btn-danger me-2' value={user._id} onClick={(e) => handleDoctor(e, "reject")}>Reject</button>} */}
                                                {/* {!user.isBlocked && user.isApproved == 'approved' && <button className='btn block btn-danger' data-bs-toggle="modal" ref={docIdRef} data-bs-target="#exampleModal" value={user._id}>{blockButton}</button>} */}
                                                {/* {user.isBlocked && user.isApproved == 'approved' && <button className='btn block btn-danger' ref={docIdRef} onClick={(e) => handleDoctor(e, 'block')} value={user._id}>{blockButton}</button>} */}
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