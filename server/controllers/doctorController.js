require("dotenv").config();
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const mailSender = require("../config/nodeMailer");
const { createDoctorTokens } = require("../middlewares/jwt");
const department = require("../models/department");
const cloudinary = require("cloudinary");
const Schedule = require("../models/scheduleModel");
const Appointment = require("../models/appointmentModel");
const Review=require("../models/reviewModel")



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

    const exist = await Doctor.findOne({ email: Email });
    if (exist) {
      res.json("email already exist");
    } else {
      const hashedPassword = await securePassword(Password);
      const otp = Math.floor(1000 + Math.random() * 9000);
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
        await mailSender(Email, otp, "signup");
        const data = {
          message: "Check mail",
          string: token,
        };
        res.json(data);
      }
    }
  } catch (error) {
    res.json("error");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { token } = req.params;
    const doctor = await Doctor.findOne({ token: token });
    if (!doctor) {
      res.json("invalid");
    } else {
      if (doctor.otp != req.body.otp) {
        // If OTP doesn't match, respond with "invalid"
        res.json("invalid otp");
      } else {

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
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const docData = await Doctor.findOne({ email: email });
    if (docData) {
      const passwordMatch = await bcrypt.compare(password, docData?.password);
      if (passwordMatch) {
        if (docData.isVerified === true) {
          if (!docData.isBlocked) {
            const token = createDoctorTokens(docData._id);
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
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const emailData = await Doctor.find({ email: email });

    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp, "otp+++++++++++++++++++++++++++");
      const mailupdated = await Doctor.updateOne(
        { email: email },
        { $set: { otp: otp } }
      );
      await mailSender(email, otp, "forgotpassword");

      res.status(200).json("success");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: " " });
  }
};

const verifyOtpp = async (req, res) => {
  try {
    const { otp } = req.body;
    const doctor = await Doctor.findOne({ otp });
    if (doctor.otp != otp) {
      res.json("invalid");
    } else {
      await Doctor.findOneAndUpdate({ $set: { otp: "" } });
      res.status(200).json({ message: "user otp correct" });
    }
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await Doctor.findByIdAndUpdate(
      { email: email },
      { $set: { password: password } }
    ).then(res.status(200).json("success"));
  } catch (error) {}
};

const registration = async (req, res) => {
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
          gender:gender,
          isRegister:true,
        },
    },
    { new: true }
    );
    const docData = await doctor.save();

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

    const { name, age, address, contact, gender, _id, qualification, fee, department, profileChange, document } = req.body;

    const uploadedImage = await cloudinary.v2.uploader.upload(profileChange);
    const documents = await cloudinary.v2.uploader.upload(document);

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
          document:documents.url,
        },
      },
      { new: true }
    );
      const docotorData=await updatedData.save()

    if (!docotorData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(docotorData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); // Respond with an appropriate error status.
  }
};

const schedule=async(req,res)=>{
  try {
const data=await Schedule.find({doctor:req._id.id}).sort({date:1});
res.json(data)

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); // Respond with an appropriate error status.
  }
}


const manageSchedule=async(req,res)=>{
  try {
    const { date, time, action } = req.body;
    const docId = req.body.id;

    const DocData = await Schedule.find({ doctor: docId });

    if (action == 'add') {
      const exist = DocData.filter((el) => el.date == date);

      if (exist != "") { 
        const ind = exist[0].time.indexOf(time);
        if (ind == -1) {
          let timeData = [...time];
          const datas = await Schedule.findOneAndUpdate(
            { doctor: docId, date: date },
            { $set: { time: timeData } }
          );
        }
      } else {
        const schedule = new Schedule({
          doctor: docId,
          date: date,
          time: time,
        });
        await schedule.save();
      }
    } else {
      const exist = DocData.filter((el) => el.date == date);
      if (exist != "") {
        if (exist[0].time.length == 1) {
          const updated = await Schedule.deleteOne({
            doctor: docId,
            date: date,
          });
        } else {
          const updated = await Schedule.findOneAndUpdate(
            { doctor: docId, date: date },
            { $pull: { time: time } }
          );
        }
      }

      const data = await Schedule.find({ doctor: docId });
    }

    const scheduleData = await Schedule.find({ doctor: docId });
    res.json(scheduleData);
  } catch (error) {
    res.json("error");
  }
}



const appointments = async (req, res) => {
  try {
    const docId = req.body.docId; 
    const appointments = await Appointment.find({ doctor: docId }).populate('user').populate("doctor").exec() 
      if (!appointments ) {
      return res.status(404).json("Appointments not found"); 
    }
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); 
  }
};


const dash = async(req,res)=>{
  try {
    const docId = req.body.docId; 
    const data = await Appointment.find({ doctor: docId })
    res.json(data)
  } catch (error) {
    console.log(error);
  }
}


const consult=async(req,res)=>{
try {
  const id=req.body.id
  const appointment = await Appointment.find({ doctor: id })
  .populate('user')
  .sort({ date: -1, time: 1 });
  const data = appointment.filter((app) => new Date(app.date) != new Date());

  res.json(data);
} catch (error) {
  console.log(error);

}
}


const endAppointment = async (req, res) => {
  try {
    const appId = req.params.appId;
    const deleteAppoint = await Appointment.findOneAndUpdate(
      { _id: appId },
      { isAttended: true }
    );
    res.json("success");
  } catch (error) {
    console.log(error);
  }
};

const addPrescription = async (req, res) => {
  try {
    const data = req.body.playload;
    const id = req.body.id;
    const update = await Appointment.findOneAndUpdate(
      { _id: id }, // Correct the filter conditions here
      { medicines: data },
      { new: true }
    );


    res.json('done');
  } catch (error) {
    console.log(error);
  }
};

const review=async(req,res)=>{
  try {
    const id=req.body.id
    const data=await Review.find({doctorId:id})
    res.json(data)

  } catch (error) {
    console.log(error);
  }
}

const payments=async(req,res)=>{
  try {
    const id=req.body.docData._id
    const pay=await Appointment.find({ doctor: id }).populate('user')

    res.json(pay)
  } catch (error) {
    console.log(error);
  }
}



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
  schedule,
  manageSchedule,
  appointments,
  dash,
  consult,
  endAppointment,
  addPrescription,
  review,
  payments,
};
