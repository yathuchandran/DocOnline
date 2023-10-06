require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailSender = require("../config/nodeMailer");
const { createTokens } = require("../middlewares/jwt");
const cloudinary = require("cloudinary");
const randomstring = require("randomstring");
const Department = require("../models/department");


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
    const { Name, Email, Mobile, Password } = req.body;
    const exist = await User.findOne({ email: Email });
    if (exist) {
      res.json("email already exist");
    } else {
      const hashedPassword = await securePassword(Password);
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp, "otp 32");
      const string = randomstring.generate();
      const user = new User({
        userName: Name,
        email: Email,
        contact: Mobile,
        password: hashedPassword,
        otp: otp,
        token: string,
      });
      console.log(user,"user----------");

      const userData = await user.save();
      console.log(userData,"userdat----------");

      if (userData) {
        await mailSender(Email, otp, "signup");
        const data = {
          message: "Check mail",
          string: string,
        };
        res.json(data);
      }
    }
  } catch (error) {
    res.json("error");
  }
};

const verifyOtp = async (req, res) => {
  console.log("verifyOtp=user");
  try {
    const { otp } = req.body;
    const user = await User.findOne({ otp });
    if (user.otp != otp) {
      res.json("invalid");
    } else {
      console.log("inside else");
      await User.findOneAndUpdate({ $set: { otp: "" } });
      res.status(200).json({ message: "user otp correct" });
    }
    console.log(user, "user 107");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.isVerified === false) {
          if (!userData.isBlocked) {
            const token = createTokens(userData._id);
            res.status(200).json({ userData, token });
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
    res.status(500).json({ error: "An error occurred" });
  }
};

const userData = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req._id.id });
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json(userData);
    }
  } catch (error) {}
};

const setProfilee = async (req, res) => {
  try {
    const { name, age, address, contact, gender, _id, image } = req.body;
    const uploadedImage = await cloudinary.v2.uploader.upload(image);
    const updatedData = await User.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          userName: name,
          age: age,
          address: address,
          contact: contact,
          gender: gender,
          image: uploadedImage.url,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(updatedData, "updatedData");
    res.status(200).json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const department = async (req, res) => {
  console.log("department");
  try {
    const dep = await Department.find();
    console.log(dep,"dep--",153);
    res.json(dep);
  } catch (error) {
    res.json("error");
  }
};








const forgotPassword = async (req, res) => {
  console.log("forgotPassword");
  try {
    const email = req.params.email;
    const emailData = await User.find({ email: email });

    console.log(emailData, "emailData====",);
    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp,"otp+++++++++++++++++++++++++++");
      const mailupdated= await User.updateOne({email:email},{$set:{otp:otp}})
      await mailSender(email,otp,"forgotpassword")
      console.log(email,"=======emailData.email");

      console.log(mailupdated,"mailupdated----------");
      res.status(200).json("success");
    }else{
      res.status(404).json("Not Found")
    }
  } catch (error) {
    res.status(500).json({ error: " " });
  }
};

const resetPassword=async(req,res)=>{
 try {
  const {email,password}=req.body
  console.log(email,"-----",password,"email,password");
  await User.findByIdAndUpdate({email:email},{$set:{password:password}}).then(
    res.status(200).json("success"))
    
 } catch (error) {
  res.status(500).json({ error: " " });
}
}

module.exports = {
  signup,
  verifyOtp,
  login,
  userData,
  setProfilee,
  department,
  forgotPassword,
  resetPassword
};
