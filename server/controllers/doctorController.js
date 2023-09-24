require("dotenv").config();
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const mailSender = require("../config/nodeMailer");
const { createDoctorTokens } = require("../middlewares/jwt");

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    res.json("error");
  }
}

const signup = async (req, res) => {
  try {
    //AGE KALANJ
    const { Name, Email, Mobile, Password } = req.body;
    console.log(req.body, "===DOCTOR SIGNUP=== Name,Email,Mobile,Password 22");

    const exist = await Doctor.findOne({ email: Email });
    if (exist) {
      res.json("email already exist");
    } else {
      const hashedPassword = await securePassword(Password);
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp, "otp 32");
      const token = randomString.generate();
      const doctor = new Doctor({
        name: Name,
        email: Email,
        contact: Mobile,
        password: hashedPassword,
        otp: otp,
        token: token,
      });
      const docData = await doctor.save();
      if (docData) {
        console.log(docData, "41 docData ");
        await mailSender(Email, otp, "signup");
        const data = {
          message: "Check mail",
          string: token,
        };
        res.json(data);
        console.log(data, "data 48");
      }
    }
  } catch (error) {
    console.log(error.message, "52");
    res.json("error");
  }
};

const verifyOtp = async (req, res) => {
  console.log("verifyOtp===58");
  try {
    const { token } = req.params;
    console.log(req.params, "req.params==61");
    
    // Find the doctor using the provided token
    const doctor = await Doctor.findOne({ token: token });
    console.log(doctor, "doctor 69");
    
    if (!doctor) {
      // If the doctor with the provided token is not found, respond with "invalid"
      res.json("invalid");
    } else {
      // Check if the OTP from the request body matches the doctor's OTP
      if (doctor.otp != req.body.otp) {
        // If OTP doesn't match, respond with "invalid"
        res.json("invalid otp");
      } else {
        console.log("inside else");
        
        // If OTP is correct, clear the token, OTP, and set isVerified to true
        await Doctor.findOneAndUpdate(
          { token: token },
          { $set: { token: "", otp: "", isVerified: true } }
        );
        res.status(200).json({message:"verified"});

      }
    }
  } catch (error) {
    console.log(error);
    // Handle errors and respond appropriately (e.g., res.status(500).json({ error: "Internal server error" }))
  }
};

const login =async (req,res)=>{
  try {
    const {email,password}=req.body;
    console.log(email,password,"==email,password 96==DOC");
    const docData=await Doctor.findOne({email:email})
    if (docData) {
      console.log(docData,"docdat=99");
      const passwordMatch=await bcrypt.compare(password,docData?.password)
      console.log(password,docData?.password,"password,docData?.password 101");
      if (passwordMatch) {
        if (docData.isVerified ===true){
          if(!docData.isBlocked){
            const token=createDoctorTokens(docData._id)
            console.log(token,"token  106");
            res.json({docData,token})
          }else{
            res.json("blocked")
          }
        }else {
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
    console.log(error,"error--129");  
}
}

const forgotPassword=async(req,res)=>{
  try {
    const email = req.params.email;
  const emailData = await Doctor.find({ email: email });
  console.log(email,"------",emailData);

    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp,"otp+++++++++++++++++++++++++++");
      const mailupdated= await Doctor.updateOne({email:email},{$set:{otp:otp}})
      await mailSender(email,otp,"forgotpassword")
      console.log(email,"=======emailData.email");

      console.log(mailupdated,"mailupdated--docto--------");
      res.status(200).json("success");
    }else{
      res.status(404).json("Not Found")
    }
  } catch (error) {
    res.status(500).json({ error: " " });

  }
  
}

const verifyOtpp=async



module.exports = {
  signup,
  verifyOtp,
  login,
  forgotPassword,
};
