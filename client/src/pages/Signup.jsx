


















import React from 'react'
import Signup from '../components/Signup'
function Signup() {
  return (
    <div>Signup</div>
  )
}

export default Signup














// import React, { useEffect } from "react";
// import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { userSchema } from "../../validation/userSignupValidation";
// import { useDispatch } from "react-redux";
// import axios from '../../services/axiosInterceptor.js'
// import { hideLoading } from "../../redux/AlertSlice";
// import { toast } from "react-hot-toast";
// import { setUser } from "../../redux/UserSlice";
// import PropTypes from 'prop-types'
// import Navbar from "../Navbar/Navbar";
// // import DoctorNavbar from "../Doctor/DoctorNavbar";

// const SignUp = ({value}) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("usertoken")) {
//       navigate("/");
//     } 
//   },);



//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       password: "",
//       cpassword: "",
//     },
//     validationSchema: userSchema,
//     onSubmit: async (values, helpers) => {
//       try {    //in axios.post wer posting directly to backend server 
//         const response = await axios.post(value==='doctor'?"/doctor/register":"/register", 
//           values
//         );
//         console.log(response,'response from signuppppp');
//         dispatch(hideLoading());
//         if (response.data.success) {
//           toast.success(response.data.message);
//           dispatch(setUser(values));//dispatches an action named setUser with the values object as its payload.
//           //This action presumably updates the Redux store with the user data that was submitted through the form. 
//           //By updating the Redux store with user data, you can access and manage that data across different components 
//           //in your application without the need to pass it down through props manually. This is particularly useful for 
//           //managing global state, such as user authentication and profile information, that needs to be accessed by multiple parts of your application.
//           const id=response.data.userid

//             // Redirect based on user's role
//             if (value === "doctor") {
//                    navigate('/doctor/otp',{state:id}) // Redirect to doctor OTP
//             }else{
//               navigate('/otp',{state:id}) // Redirect to user OTP
//             }
//         } else {
//           toast.error(response.data.message);
//         }
//       } 


//       catch (error) {
//         helpers.setErrors({ submit: error.message });
//         toast.error("something went wrong");
//       }
//     },
//   });


//   //PROPS
//   SignUp.propTypes = {
//     value: PropTypes.string

//   } 



//   return (
//     <div>
//    {value === 'doctor' ? <DoctorNavbar /> : <Navbar />}
     
//       <form onSubmit={formik.handleSubmit}>
//         <Box
//           sx={{
//             backgroundColor: "#F5FCFF",
//             display: "flex",
//             flexDirection: "column",
//             width:{xs:"75%",sm:500},
//             maxWidth: 500,
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "auto",
//             marginY: {xs:10,sm:14.5,md:26.3,lg:10},
//             padding: 3,
//             borderRadius: 5,
//             boxShadow: "5px 5px 10px #ccc ",
//             ":hover": {
//               boxShadow: "10px 10px 20px #ccc ",
//             },
//           }}
//         >
//           <Box mt={2}>

//           </Box>
//           <Typography variant="h4" padding={3} textAlign="center">
//             Sign up
//           </Typography>
//           <Grid
//             container
//             rowSpacing={1}
//             columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//           >
//             <Grid item sm={6}>
//               <TextField
//                 sx={{ backgroundColor: "white" }}
//                 margin="normal"
//                 type={"text"}
//                 label="Name"
//                 name="name"
//                 value={formik.values.name}
//                 error={formik.errors.name}
//                 helperText={formik.errors.name}
//                 onChange={formik.handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item sm={6}>
//               <TextField
//                 sx={{ backgroundColor: "white" }}
//                 margin="normal"
//                 type={"email"}
//                 name="email"
//                 value={formik.values.email}
//                 error={formik.errors.email}
//                 helperText={formik.errors.email}
//                 onChange={formik.handleChange}
//                 label="email"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item sm={6}>
//               <TextField
//                 sx={{ backgroundColor: "white" }}
//                 margin="normal"
//                 type={"text"}
//                 label="Mobile"
//                 name="mobile"
//                 value={formik.values.mobile}
//                 error={formik.errors.mobile}
//                 helperText={formik.errors.mobile}
//                 onChange={formik.handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item sm={6}>
//               <TextField
//                 sx={{ backgroundColor: "white" }}
//                 margin="normal"
//                 type={"password"}
//                 label="Password"
//                 name="password"
//                 value={formik.values.password}
//                 error={formik.errors.password}
//                 helperText={formik.errors.password}
//                 onChange={formik.handleChange}
//                 // error={}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item sm={6}>
//               <TextField
//                 sx={{ backgroundColor: "white" }}
//                 margin="normal"
//                 type={"password"}
//                 name="cpassword"
//                 value={formik.values.cpassword}
//                 error={formik.errors.cpassword}
//                 helperText={formik.errors.cpassword}
//                 onChange={formik.handleChange}
//                 label="Confirm Password"
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>

//           <Button
//             variant="contained"
//             color="warning"
//             type="submit"
//             sx={{ marginTop: 3, borderRadius: 3 }}
//             name="submit"
//           >
//             Sign up
//           </Button>
          
//           <Typography mt={2}>
            
//             Have an Account?&nbsp;<Link to={"/login"}>Log in</Link>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             Are you a doctor?&nbsp;<Link to={"/doctor/register"}>Register Here</Link>
 
//           </Typography>
//         </Box>
//       </form>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default SignUp;












































































// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { Input, Form, Button } from 'antd';
// // // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // // import Container from '@mui/material/Container';
// // // import CssBaseline from '@mui/material/CssBaseline';
// // // import Avatar from '@mui/material/Avatar';
// // // import Grid from '@mui/material/Grid';
// // // import Box from '@mui/material/Box';
// // // import Typography from '@mui/material/Typography';
// // // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// // // // Define a custom MUI theme (you can customize it further)
// // // const customTheme = createTheme();

// // // function Signup() {
// // //   const onFinishHandler = (values) => {
// // //     console.log(values);
// // //   };

// // //   return (
// // //     <ThemeProvider theme={customTheme}>
// // //       <Container component="main" maxWidth="xs">
// // //         <CssBaseline />
// // //         <Box
// // //           sx={{
// // //             marginTop: 8,
// // //             display: 'flex',
// // //             flexDirection: 'column',
// // //             alignItems: 'center',
// // //           }}
// // //         >
// // //           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// // //             <LockOutlinedIcon />
// // //           </Avatar>
// // //           <Typography component="h1" variant="h5">
// // //             Sign up
// // //           </Typography>
// // //           <Form layout="vertical" onFinish={onFinishHandler} className='signup-form'>
// // //             <Form.Item label="Name" name="name">
// // //               <Input type="text" required />
// // //             </Form.Item>
// // //             <Form.Item label="Email" name="email">
// // //               <Input type="email" required />
// // //             </Form.Item>
// // //             <Form.Item label="Mobile" name="mobil">
// // //               <Input type="mobile" required />
// // //             </Form.Item>
// // //             <Form.Item label="Password" name="password">
// // //               <Input type="password" required />
// // //             </Form.Item>
// // //             <Form.Item label="Confirm Password" name="confirmPassword">
// // //               <Input type="password" required />
// // //             </Form.Item>
// // //             <Link to='/login' className='m-2'>User already logged in here</Link>
// // //             <Form.Item>
// // //               <Button type="primary" htmlType="submit">
// // //                 Signup
// // //               </Button>
// // //             </Form.Item>
// // //           </Form>
// // //         </Box>
// // //       </Container>
// // //     </ThemeProvider>
// // //   );
// // // }

// // // export default Signup;

// // import React from "react";
// // // import "./style/Signup.css"
// // import { Form, Input, message } from "antd";
// // import axios from "../../src/axios";
// // import { Link, useNavigate } from "react-router-dom";

// // import {
// //   MDBBtn,
// //   MDBContainer,
// //   MDBRow,
// //   MDBCol,
// //   MDBCard,
// //   MDBCardBody,
// //   MDBIcon,
// //   MDBCardImage,
// // } from "mdb-react-ui-kit";

// // function Signup() {
// //   const navigate = useNavigate();
// //   const onFinishHandler = async (values) => {
// //     // Declare the function as async
// //     try {
// //       console.log(
// //         "96 signup",
// //         values.name,
// //         values.age,
// //         values.email,
// //         values.mobile,
// //         values.password
// //       );
// //       const res = await axios.post("/signup", values, {
// //         withCredentials: true,
// //       });
// //       if (res.data.success) {
// //         // Correct the typo in "success"
// //         message.success("Register successfully"); // Correct the typo in "success"
// //         navigate("/otp");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <MDBContainer fluid>
// //       <MDBCard className="text-black m-3" style={{ borderRadius: "15px" }}>
// //         <MDBCardBody>
// //           <MDBRow>
// //             <MDBCol
// //               md="8"
// //               lg="6"
// //               className="order-2 order-lg-1 d-flex flex-column align-items-center"
// //                           >
              
// // <MDBRow>
// //             <MDBCol
// //               md="4"
// //               lg="2"
// //               className="order-2 order-lg-1 d-flex flex-column align-items-center"
// //               >
// //                 <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-2 mt-3">
// //                     SignUp
// //                   </p>

// //                   <Form
// //                     onFinish={onFinishHandler}
// //                     labelCol={{ span: 20 }}
// //                     wrapperCol={{ span: 28 }}
// //                     layout="vertical"
// //                                       >
// //                                         <Form.Item
// //                       label="Name"
// //                       name="name"
// //                                             rules={[
// //                         { required: true, message: "Please input your name!" },
// //                       ]}
// //                     >
// //                       <Input />
// //                     </Form.Item>

// //                     <Form.Item
// //                       label="Age"
// //                       name="age"
// //                       rules={[
// //                         { required: true, message: "Please input your age!" },
// //                       ]}
// //                     >
// //                       <Input type="number" />
// //                     </Form.Item>

// //                     <Form.Item
// //                       label="Email"
// //                       name="email"
// //                       rules={[
// //                         { required: true, message: "Please input your email!" },
// //                         {
// //                           type: "email",
// //                           message: "Please enter a valid email address!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input type="email" />
// //                     </Form.Item>

// //                     <Form.Item
// //                       label="Mobile"
// //                       name="mobile"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please input your mobile number!",
// //                         },
// //                         {
// //                           pattern: /^[0-9]*$/,
// //                           message: "Please enter a valid mobile number!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input type="text" />
// //                     </Form.Item>

// //                     <Form.Item
// //                       label="Password"
// //                       name="password"
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please input your password!",
// //                         },
// //                         {
// //                           min: 6,
// //                           message: "Password must be at least 6 characters long!",
// //                         },
// //                       ]}
// //                     >
// //                       <Input.Password />
// //                     </Form.Item>

// //                     <Form.Item
// //                       label="Confirm Password"
// //                       name="confirmPassword"
// //                       dependencies={["password"]}
// //                       hasFeedback
// //                       rules={[
// //                         {
// //                           required: true,
// //                           message: "Please confirm your password!",
// //                         },
// //                         ({ getFieldValue }) => ({
// //                           validator(_, value) {
// //                             if (!value || getFieldValue("password") === value) {
// //                               return Promise.resolve();
// //                             }
// //                             return Promise.reject(
// //                               new Error("The two passwords do not match!")
// //                             );
// //                           },
// //                         }),
// //                       ]}
// //                     >
// //                       <Input.Password />
// //                     </Form.Item>

// //                                             <Link to="/login" className="m-2">
// //                           Already have an account? Login here
// //                         </Link>
                      
// //                     <div className="d-flex justify-content-center">
// // {" "}
// //                       {/* Center the button horizontally */}
// //                       <div className="d-flex align-items-center">
// //                         <MDBBtn htmlType="submit" className="mb-3" size="sm">
// //                           Signup
// //                         </MDBBtn>
// //                       </div>
// //                     </div>
// //                   </Form>
// //                             </MDBCol>

// //             <MDBCol
// //               md="10"
// //               lg="6"
// //               className="order-2 order-lg-2 d-flex align-items-center"
// //             >
// //               <div>
// //                 <MDBCardImage
// //                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
// //                   fluid
// //                 />
// //               </div>
// //             </MDBCol>
// //           </MDBRow>
// // </MDBCol>
// //           </MDBRow>
// //         </MDBCardBody>
// //       </MDBCard>
// //     </MDBContainer>
// //   );
// // }

// // export default Signup;
