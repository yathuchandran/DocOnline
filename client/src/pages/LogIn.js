// import React from 'react'
// import '../pages/style/Login.css'
// import {Link} from 'react-router-dom'
// import { Input, Form, Button } from 'antd';

// function LogIn() {
//    // Form Handler
//    const onFinishHandler = (values) => {
//     console.log(values);
//   };
//   return (
//     <div>
//       <div className="form-container">
//         <Form layout="vertical" onFinish={onFinishHandler} className='signup-form'>
//           <h3 className='text-center'>Login</h3>
//           <Form.Item label="Email" name="email">
//             <Input type="email" required />
//           </Form.Item>
//           <Form.Item label="Password" name="password">
//             <Input type="password" required />
//           </Form.Item>
//           <Link to='/login' className='m-2'>user already login here</Link>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default LogIn



import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../pages/style/Login.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

// import loginImage from "../path_to_your_image/login-image.jpg"; // Update with the correct image path and extension

function LogIn() {
  // Form Handler
  const onFinishHandler = (values) => {

    console.log(values);
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
      <img src={" "} alt="Login" className="login-image" />
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Login
          </h1>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <Form layout="vertical" onFinish={onFinishHandler} className='signup-form'>
                <Form.Item label="Email" name="email">
                  <MDBInput wrapperClass='mb-4' type='email' required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <MDBInput wrapperClass='mb-4' type='password' required />
                </Form.Item>
                <Link to='/signup' className='m-2'>Don't have an account? Sign up here</Link>
                <Form.Item>
                  <MDBBtn className='w-100 mb-4' size='md' type="primary" htmlType="submit">Login</MDBBtn>
                </Form.Item>
              </Form>
              <div className="text-center">
                <p>or login with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>
                
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
      </MDBRow>
    </MDBContainer>
  );
}

export default LogIn;
