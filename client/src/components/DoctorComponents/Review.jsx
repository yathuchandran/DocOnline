import axios from '../../Services/axios';
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useSelector } from 'react-redux'

function Review() {
    const doc=useSelector(state=>state.doctor.data)
    const [review,setReview]=useState()
    console.log(doc.docData._id,6);
    const id = doc.docData._id;

const dataCall = useCallback(async () => {
  try {
    const res = await axios.post('/doctor/reviews',{id});
    console.log(res.data, "datassssssssssssss", 13);
    setReview(res.data)
    review.forEach(element => {
        console.log(element.rating,"19-----------");
        console.log(element.feeedback);
    });
  } catch (error) {
    console.log(error);
  }
}, [id]);

useEffect(() => {
  dataCall();
}, []);

  return (
<div className="card">
      <div className="card-body">
      {review.length !==0?(
        review.map((el) => (
        <div className="card" key={el._id}>
          <div className="card-body">
          <h5 className="card-title">Rating: {el.rating}/5</h5>
          {/* <p className="card-text">{el.feedback}</p> */}
          {/* <p className="card-text">By: {el.author}</p> */}

          </div>
        </div>
        ))
      ):(
        <p>No data available</p>
      )}
      </div>
    </div>
      )
}

export default Review