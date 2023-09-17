require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const mailSender = require("../config/nodeMailer");
const { createTokens } = require("../middlewares/jwt");

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
    try {
        const { Name,Email,Mobile,Password } = req.body;
        console.log(Name,Email,Mobile,Password ,"Name,Email,Age,Mobile,Password 22");
        
        const exist = await User.findOne({ email: Email });
        if (exist){res.json("email already exist")
          }
        else {
        const hashedPassword=await securePassword(Password)
        const otp =Math.floor(1000+Math.random()*9000)
        console.log(otp,"otp 32");
        const string =randomstring.generate()
        const user=new User({
            userName:Name,
            email:Email,
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
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password, "email,password--92");
      const userData = await User.findOne({ email: email });
      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);
        console.log(password, userData.password, "password,userData.password ---97");
        if (passwordMatch) {
          console.log(userData.isVerified,"userData.isVerified==101");
          if (userData.isVerified === false) {
            console.log("keri");
            if (!userData.isBlocked) {
              const token = createTokens(userData._id);
              console.log(token, "token 102");
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
      } else {
        res.json("unauthorized");
      }
    } catch (error) {
      console.error(error, "error--129");
      res.status(500).json({ error: "An error occurred" });
    }
  };
  

const userData = async (req, res) => {

  try {
    const userData = await User.findOne({ _id: req._id.id });
    console.log(userData, req._id.id , "_id: req._id.id =135");

    res.json(userData);
  } catch (error) {}
};




const profile=async (req,res)=>{
  try {
    const userId = req.body?.user._id;
    console.log(req.body?.user._id,"==============142");
    const userData = await User.findById({  _id:userId });
    console.log(userData,"userdata +++++++143");
    if (userData) {
      res.json({userData})
      console.log("front");
    }
  } catch (error) {
    console.log(error);
  }
}








module.exports = {
    signup,
    verifyOtp,
    login,
    userData,
    profile
}