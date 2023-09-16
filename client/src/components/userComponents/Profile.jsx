import React from 'react'

function Profile() {
  return (
    <div>
    <div className="row">
            <div className="col-12 col-md-3">
                <div className="row text-center text-dark"  style={{
                    backgroundColor: "#002147", 
                    color: "white", 
                  }}>
                    <div className="list-group p-5   mt-5" >
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" >Profile</div>
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" >Appointments</div>
                        <div className="list-group-item btn btn-outline-success lists list-group-item-action text-wrap text-break" >Prescriptions</div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-9 bg-light">
            <form className="mx-auto w-75 setProfile" encType="multipart/form-data">
                <div className="text-center text-bold mb-3 mt-3">SET PROFILE</div>
                <div className="text-center  mb-3 mt-3">
                    
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="name">Name<span className="text-danger">*</span></label>
                        <input
                            type="text"
                            id="name"
                           
                            className="form-control mb-2 form-control-sm"
                            placeholder="Name..."
                        />
                        <label htmlFor="age">Age<span className="text-danger">*</span></label>
                        <input
                            type="text"
                            id="age"
                            
                            className="form-control mb-2 form-control-sm"
                            placeholder="Age..."
                        />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="">Gender<span className="text-danger">*</span></div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        value="male"
                                        
                                        className="form-check-input"
                                        id="male"
                                    />
                                    <label htmlFor="male" className="form-check-label">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        value="female"
                                     
                                        className="form-check-input"
                                        id="female"
                                    />
                                    <label htmlFor="female" className="form-check-label">
                                        Female
                                    </label>
                                </div>
                                <br />
                            </div>

                        </div>
                        <label htmlFor="contact">Contact<span className="text-danger">*</span></label>
                        <input
                            type="tel"
                            id="contact"
                    
                            className="form-control mb-2 form-control-sm"
                            placeholder="Contact..."
                        />

                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="address">Address<span className="text-danger">*</span></label>
                        <textarea
                            id="address"
                           
                            placeholder="Address..."
                        />

                        Created 
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <button className="btn btn-outline-blue mb-3" style={{backgroundColor:"#002147"}}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Profile