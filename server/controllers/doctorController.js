require("dotenv").config();
const Doctor = require("../model/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { dateTime } = require("../config/dateAndTime");
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


  const signup=async (req,res)=>{
    try {
      //AGE KALANJ
        const { Name,Email,Mobile,Password } = req.body;
        console.log(Name,Email,Mobile,Password ,"Name,Email,Age,Mobile,Password 22");
        
        const exist = await Doctor.findOne({ email: Email });
        if (exist){res.json("email already exist")
          }
        else {
        const hashedPassword=await securePassword(Password)
        const otp =Math.floor(1000+Math.random()*9000)
        console.log(otp,"otp 32");
        const token =randomString.generate()
        const doctor=new Doctor({
            name:Name,
            email:Email,
            contact:Mobile,
            password:hashedPassword,
            otp:otp,
            token:token,
        });    

        const docData = await doctor.save();
      if (docData) {
        console.log(docData,"51 userData");

        await mailSender(Email, otp, "signup");
        const data = {
          message: "Check mail",
          string: token,
        };
        res.json(data);
        console.log(data,"data 58");
      }
    }
    } catch (error) {
      console.log(error.message, "68");
        res.json("error");

    }
  }

  const verifyOtp = async (req, res) => {
    
    try {
      const {  otp } = req.body;
      const user = await User.findOne({ otp });
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






  module.exports = {
    signup,
    verifyOtp,
   
}