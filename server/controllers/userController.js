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
    try {
      //AGE KALANJ
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

const login = async (req,res)=>{
  try {
    const {email,password}=req.body;
    console.log(email,password,"email,password--92");
    const userData=await User.findOne({email:email});
    if(userData){
      console.log(userData,"userData--107");
      const passwordMatch = await bcrypt.compare(password,userData?.password)
      console.log(password,userData.password,"password,userData.password ---97");
      if (passwordMatch) {
        if (userData.isVerified === true) {
          if (!userData.isBlocked) {
            const token = createTokens(userData._id);
            console.log(token,"token 102");
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
    console.log(error,"error--129");
  }
}
















module.exports = {
    signup,
    verifyOtp,
    login,
}