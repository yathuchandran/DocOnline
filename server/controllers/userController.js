require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const mailSender = require("../config/nodeMailer");
const config = require("../config/config")
const randomstring = require("randomstring")


async function securePassword(password) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      return hashPassword;
    } catch (error) {
      res.json("error");
    }
  }

  const signup=async (req,res)=>{
    console.log("<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    try {
      console.log("//////////?????????????????????????????????????????????")
        const { Name,Email,Age,Mobile,Password } = req.body;
        console.log(Name,Email,Age,Mobile,Password ,"Name,Email,Age,Mobile,Password 22");
        
        const exist = await User.findOne({ email: Email });
        if (exist){res.json("email already exist")
          }
        else {
        const hashedPassword=await securePassword(Password)
        const otp =Math.floor(1000+Math.random()*9000)
        console.log(">>>>>>>>>>>>>>>>",otp)
        console.log(otp,"otp 32");
        const string =randomstring.generate()
        const user=new User({
            userName:Name,
            email:Email,
            age:Age,
            contact:Mobile,
            password:hashedPassword,
            otp:otp,
            token:string,
        });    

        const userData = await user.save();
      if (userData) {
        console.log(userData,"51 userData");

        await mailSender(Email, otp, "signup");
        const data = {
          message: "Check mail",
          string: string,
        };
        res.json(data);
        console.log(data,"data 58");
      }
    }
    } catch (error) {
      console.log(error.message, 68);
        res.json("error");

    }
  }

  





  

  const verifyOtp = async (req, res) => {
    console.log("hello otp ")
    console.log(req.body,"body fo the otp")
    try {
      const {  otp } = req.body;
      console.log(req.body,"body fo the otp in the try block")
      const user = await User.findOne({ otp });
      console.log(user,"????????????????????????????????????")
      if (user.otp != otp) {
        res.json("invalid");
        
      }else{
        console.log("inside else")
        await User.findOneAndUpdate(
          
          { $set: { otp: "" } }
        );
        res.status(201).json({message:"user otp correct"})
      }
      console.log(user,"user 107")

  
    } catch (error) {
      console.log(error);
    }
  };

const login = async (req,res)=>{
  try {
    const {email,password}=req.body;
    const userData=await User.findOne({email:email});
    if(userData){
      const passwordMatch = await bcrypt.compare(password,userData.password)
      if (passwordMatch) {
        if (userData.isVerified === true) {
          if (!userData.isBlocked) {
            const token = createTokens(userData._id);
            res.json({ userData, token });
          } else {
            res.json("blocked");
          }
        } else {
          res.json("unverified");
        }
      } else {
        res.json("unauthorized");
      }
    }else {
      res.json("unauthorized");
    }
  } catch (error) {
    res.json("error")
  }
}













































// let userRegData;
// function generateOTP(){
// return otp = `${Math.floor(1000 + Math.random() * 90000)}`
// }

// let resetMail

// //for send mail  function-------------------------------------------------------------------------------------------

// const sendVerifyMail = async (name, email, res) => {
//   console.log("sendVerifyMail to this account of yathesh ");
//   try {
//     console.log("transporter");
//     const transporter = nodemailer.createTransport({
//       // host: 'smtp.gmail.com',
//       // port: 587,
//       // secure: false,
//       // requireTLS: true,
//       service:'gmail',
//       auth: {
//         user: "yatheesh.bc8@gmail.com",
//         pass: "cslrrwsbkjxphibf"
//       }
//     });
//     const otp = generateOTP(); // Assuming you have a function to generate the OTP
// console.log(otp,"otp",45);
    
//     const mailOptions = {
//       from: "yatheesh.bc8@gmail.com",
//       to: email,
//       subject: 'Verification Email',
//       text: `${otp}`
//     }


//     const info = await transporter.sendMail(mailOptions);
//     console.log(info, 54);
//     console.log("Email has been sent:", info.response);
//     res.redirect("/otpverification");
//     console.log('Mail sent successfully');
//     return otp;
   
//   } catch (error) {
//     console.log("Error while sending email:", error);
//     console.log(error.message);
//   }
// };

// //reset-passwrd -fun---------------
// const securePassword = async (password) => {
//     try {

//         const passwordHash = await bcrypt.hash(password, 10);
//         return passwordHash;

//     } catch (error) {
//         console.log(error.message);
//     }
// }








// //for reset send mail function--------------------------------------------------------------------------
// const sendResetPasswordMail = async (name, email, token) => {
//     try {
 
//       console.log("sendResetPasswordMail",89);

//         const transporter = nodemailer.createTransport({
//           service:'gmail',
//           auth: {
//             user: "yatheesh.bc8@gmail.com",
//             pass: "cslrrwsbkjxphibf"
//           }
//         });
//         console.log(transporter,"transporter",98);

//         const otp = generateOTP(); // Assuming you have a function to generate the OTP
//         console.log(otp,"otp",101);
        
//         const mailoptions = {
//           from: "yatheesh.bc8@gmail.com",
//           to: email,
//             subject: 'for Reset Password mail',
//             text: `${otp}`
            
//             //html: '<p>hii' + name + ', please click to <a href="http://127.0.0.1:3000/forget-password?token=' + token + '">Reset  </a> your password</p>'

//         }
//         console.log(mailoptions,"mailoptions",110);
//         transporter.sendMail(mailoptions, function (error, info) {
//             if (error) {
//                 console.log("error while sending email:" , error)
//             }
//             else {
//                 console.log("Email has been sent:", info.response);
//                 res.redirect("/otpverification")
//             }
//             return otp;
//         })

//         console.log(transporter,"transporter",122);
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// // LOAD REGISTERATION---------------------------------------------------------------
// const loadRegister = async (req, res) => {
//     try {
//         res.json('registration')
//     } catch (error) {
//         console.log(error.message);
//     }

// }

// // USER INSERT (ADDING)--------
// const insertUser = async (req, res) => {
//     try {
//       console.log(128);
//         const name = req.body.name
//         const email = req.body.email
//         console.log('name is ',name, 'email is ', email)
//         userRegData = req.body
//         console.log(132, email);
//         const existUser = await User.findOne({ email: email })

//         if (existUser == null) {
//           console.log('verify email send cheyyunnathinu munne')
//             await sendVerifyMail(name, email)
//             res.redirect('/otpverification')

//         }
//         else {
//             if (existUser.email == email) {
//                 res.render('users/registration', { message1: 'User Alredy Exist' })
//             }
//         }
//     }
//     catch (error) {
//         console.log(error.message)
//     }
// }


// // OTP VERIFICATION IN E-MAIL --------------------------------------------------------------------------------------------------------------
// const loadverifyotp = async (req, res) => {

//     try {
//       console.log(155);
//         res.render('users/otpverification')
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// //OTP VERIFY-------------
// const verifyotp = async (req, res) => {
//   //.log("yathukhg");
//     try {
//         //conosle.log(userRegData,'user registrtation data')
//         const password = await bcrypt.hash(userRegData.password, 10);
//         const enteredotp = req.body.otp;
//         // console.log(enteredotp,'entered otp is this')
//         // console.log('checking otp page')
//         if (otp == enteredotp) {
//             const user = new User({
//                 name: userRegData.name,
//                 mobile: userRegData.mobile,
//                 email: userRegData.email,
//                 password: password,
//                 is_blocked: false,
//                 is_verified: 1,
//                 is_admin: 0
//             })
//             const userData = await user.save();
//             res.render('users/login', { message2: "Registration successful" })
//         }
//         else {
//             res.render('users/otpverification', { message1: "Invalid otp" })
//         }
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }

// const verifyMail = async (req, res) => {
//     try {
//         const updateInfo = await User.updateOne({ _id: req.query.id }, { $set: { is_verified: 1 } })
//         res.render("users/email-verified")
//     } catch (error) {
//         console.log(error.message);
//     }
// }




// //login user methods start -------------------------------------------------------
// const loginLoad = async (req, res) => {
//     try {
//         if (req.session.user_id) {
//             res.redirect('/home')
//         } else {
//             res.render('users/login')
//         }

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// //VERIFY LOGIN CHECKING---------------
// const verifyLogin = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const userData = await User.findOne({ email: email })
//         console.log(userData);
//         if (userData) {
//             const is_blocked = userData.is_blocked

//                 if(is_blocked===true){
//                     res.render('users/login', { message: "User is already blocked" })
//                     }
//             req.session.userName = userData.name
//             const passwordMatch = await bcrypt.compare(password, userData.password)
            
//             if (passwordMatch) {
//                 if (userData.is_verified === 0) {
//                     res.render('users/login', { message: "Please verify your mail" })
//                 } else {
//                     req.session.user_id = userData._id;
//                     res.redirect('/home')
//                 }
//             } else {
//                 res.render('users/login', { message: "Email and password is incorect" })
//             }
//         } else {
//             res.render('users/login', { message: "Email and password is incorect" })
//         }

//     } catch (error) {
//         console.log(error.message);
//     }
// }


// //USER LOG-OUT----------------------------------------
// const userLogout = async (req, res) => {
//     try {

//         req.session.destroy()
//         res.redirect('/')

//     } catch (error) {
//         console.log(error.message);
//     }
// }




module.exports = {

    signup,
    verifyOtp,
    
    login,

    // loadRegister,
    // insertUser,
    // verifyMail,
    // loginLoad,
    // verifyLogin,
    // //loadHome,
    // verifyotp,
    // loadverifyotp,
    // userLogout

}