// import axios from '../../Services/axios';
// import React, { useEffect, useState } from 'react'
// import { useCallback } from 'react';
// import { useSelector } from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';

// function Review() {
//     const doc=useSelector(state=>state.doctor.data)
//     const [review,setReview]=useState([])
//     console.log(doc.docData._id,6);
//     const id = doc.docData._id;

// const dataCall = useCallback(async () => {
//   try {
//     const res = await axios.post('/doctor/reviews',{id});
//     console.log(res.data, "datassssssssssssss", 13);
//     setReview([...res.data])
//     // review.forEach(element => {
//     //     console.log(element.rating,"19-----------");
//     //     console.log(element.feeedback);
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// }, [id]);

// useEffect(() => {
//   dataCall();
// }, []);
// console.log(review.length,29);
//   return (
// <div className=" row p-1 m-2">
//       <div className=" text-start">
//       {review.length !==0?(
//         review.map((el) => (
//         <div className="card " key={el._id}>
//           <div className="card-body">
//           <h5 className="card-title">Rating: {el.rating}/5</h5>
//           <p className="card-text">Feedback: {el.feedback}</p>
//           <p className="card-text">By: {el.author}</p>

//           </div>

//         </div>

//         ))
//       ):(
//         <p>No data available</p>
//       )}
//                         <p className="card-text">By:</p>

//       </div>
//     </div>
//       )
// }

// export default Review







import axios from '../../Services/axios';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Review() {
  const doc = useSelector(state => state.doctor.data);
  const [review, setReview] = useState([]);
  const id = doc.docData._id;

  const dataCall = useCallback(async () => {
    try {
      const res = await axios.post('/doctor/reviews', { id });
      setReview(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    dataCall();
  }, []);
console.log(review,90);
  return (
    <div className="row p-1 m-2">
  <div className="text-start">
    {review.length !== 0 ? (
      review.map((el) => (
        <div className="card" key={el._id}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
            <h5 className="card-title">
                  Rating: {el.rating}/5{' '}
                  {[...Array(el.rating)].map((_, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} />
                  ))}
                </h5>
              <p className="card-text">Feedback: {el.feedback}</p>
              <p className="card-text">By: {el.userName}</p>
            </div>
            <div className="image-container">
              <img
                src="/consultation-patient-doctor-via-smartphone-online-medical-support-diagnosis-dispensing-medicines-208371735.webp"
                alt=""
                style={{ height: '120px' }}
              />
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No data available</p>
    )}
  </div>
</div>

  );
}

export default Review;
