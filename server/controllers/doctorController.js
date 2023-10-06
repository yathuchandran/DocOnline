require("dotenv").config();
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const mailSender = require("../config/nodeMailer");
const { createDoctorTokens } = require("../middlewares/jwt");
const department = require("../models/department");
const cloudinary = require("cloudinary");


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
        res.status(200).json({ message: "verified" });
      }
    }
  } catch (error) {
    console.log(error);
    // Handle errors and respond appropriately (e.g., res.status(500).json({ error: "Internal server error" }))
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "==email,password 96==DOC");
    const docData = await Doctor.findOne({ email: email });
    if (docData) {
      console.log(docData, "docdat=============99");
      const passwordMatch = await bcrypt.compare(password, docData?.password);
      console.log(password,docData?.password,"password,docData?.password============== 101");
      if (passwordMatch) {
        if (docData.isVerified === true) {
          if (!docData.isBlocked) {
            const token = createDoctorTokens(docData._id);
            console.log(token, "token  106");
            res.json({ docData, token });
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
    res.json("error");
    console.log(error, "error--129");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const emailData = await Doctor.find({ email: email });
    console.log(email, "------", emailData);

    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp, "otp+++++++++++++++++++++++++++");
      const mailupdated = await Doctor.updateOne(
        { email: email },
        { $set: { otp: otp } }
      );
      await mailSender(email, otp, "forgotpassword");
      console.log(email, "=======emailData.email");

      console.log(mailupdated, "mailupdated--docto--------");
      res.status(200).json("success");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: " " });
  }
};

const verifyOtpp = async (req, res) => {
  console.log("otpppppppppppp");
  try {
    const { otp } = req.body;
    const doctor = await Doctor.findOne({ otp });
    if (doctor.otp != otp) {
      res.json("invalid");
    } else {
      console.log("inside else");
      await Doctor.findOneAndUpdate({ $set: { otp: "" } });
      res.status(200).json({ message: "user otp correct" });
    }
    console.log(doctor, "Doctor 107");
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  console.log("reset doct");
  try {
    const { email, password } = req.body;
    console.log(email, "-----", password, "email,password");
    await Doctor.findByIdAndUpdate(
      { email: email },
      { $set: { password: password } }
    ).then(res.status(200).json("success"));
  } catch (error) {}
};

const registration = async (req, res) => {
  console.log("registration");
  try {
    const {
      address,
      liceNum,
      department,
      exp,
      profile, 
      docs,
      docId,
      gender
    } = req.body;
    const exist = await Doctor.findOne({ liceNum: liceNum });

    if (exist) {
      return res.status(400).json({ message: "License number already exists" });
    }

    const docprofile = await cloudinary.v2.uploader.upload(profile,);
    const Certificate = await cloudinary.v2.uploader.upload(docs,);

    const doctor =await  Doctor.findByIdAndUpdate(
       {_id:docId},
      {
        $set:{
          address: address,
          liceNum: liceNum,
          department: department,
          exp: exp,
          image:docprofile.url,
          document: Certificate.url,
          gender:gender
        },
    },
    { new: true }
    );
    const docData = await doctor.save();
    console.log(docData, "docData------------");

    res.status(200).json({docData, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};


const deptList=async(req,res)=>{
  try {
    const dept= await department.find()
    if (dept) {
      res.json(
        {
          dept,
          message:'okey success'
        }
      )
    }else{
      res.status(404).json("there is no such data")
    }
  } catch (error) {
    console.log(error);
  }
}


const setProfile = async (req, res) => {
  try {
    console.log("setprofile-------");

    const { name, age, address, contact, gender, _id, qualification, fee, department, profileChange, exp } = req.body;
    console.log(req.body, "req.body---------------------256");

    const uploadedImage = await cloudinary.v2.uploader.upload(profileChange);
    console.log(uploadedImage); // Remove quotes around "uploadedImage" to log the actual object.

    const updatedData = await Doctor.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          name: name,
          age: age,
          address: address,
          contact: contact,
          gender: gender,
          image: uploadedImage.url,
          fee: fee,
          department: department,
          education: qualification,
          // exp: exp,
          // You have an empty document field, you can remove it if not needed.
          // document: {},
        },
      },
      { new: true }
    );
      const docotorData=await updatedData.save()
    console.log(docotorData, "updatedData---------------276");

    if (!docotorData) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(docotorData, "updatedData");
    res.status(200).json(docotorData);
  } catch (error) {
    console.error(error); // Log the error for debugging.
    res.status(500).json({ error: "Internal Server Error" }); // Respond with an appropriate error status.
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  verifyOtpp,
  resetPassword,
  registration,
  deptList,
  setProfile,
};
