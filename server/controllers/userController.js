require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailSender = require("../config/nodeMailer");
const { createTokens } = require("../middlewares/jwt");
const { dateTime } = require("../config/dateAndTime");

const cloudinary = require("cloudinary");
const randomstring = require("randomstring");
const Department = require("../models/department");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Review=require("../models/reviewModel")
const Schedule = require("../models/scheduleModel");
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);




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
      const string = randomstring.generate();
      const user = new User({
        userName: Name,
        email: Email,
        contact: Mobile,
        password: hashedPassword,
        otp: otp,
        token: string,
        timeStamp: dateTime,
      });
      const userData = await user.save();

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
  try {
    const { otp } = req.body;
    const user = await User.findOne({ otp });
    if (user.otp != otp) {
      res.json("invalid");
    } else {
      await User.findOneAndUpdate({ $set: { otp: "" } });
      res.status(200).json({ message: "user otp correct" });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
console.log("login 83");
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      console.log(userData,"login 83");

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


const findDoctors = async (req, res) => {
  try {
    const docs = await Doctor.aggregate([
      {
        $match: {
          isRegister: true,
          isBlocked: false,
          isVerified: true,
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "name",
          as: "doctorData",
        },
      },
    ]);

    const deps = await Department.find({ isBlocked: false });
    res.json({ docs, deps });


  } catch (error) {
    res.json("error");
  }
};



const searchDoc = async (req, res) => {
  try {
    const searchKey = req.params.searchKey;
    let data =[]
    if (searchKey == "all") {
      data = await Doctor.aggregate([
        {
          $match: {
            isRegister: true,
            isBlocked: false,
            isVerified: true,
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "name",
            as: "doctorData",
          },
        },
      ]);
    } else {
      data = await Doctor.aggregate([
        {
          $match: {
            isRegister: true,
            isBlocked: false,
            isVerified: true,
            name: { $regex: new RegExp(`^${searchKey}`, "i") },
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "name",
            as: "doctorData",
          },
        },
      ]);
    }
    // const data = await Doctor.find({ name: { $regex: new RegExp(`^${searchKey}`, 'i') } });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
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
    res.status(200).json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const department = async (req, res) => {
  try {
    const dep = await Department.find();
    res.json(dep);
  } catch (error) {
    res.json("error");
  }
};



const docSchedule = async (req, res) => {
  try {
    const docId=req.params.docId;
    const data = await Schedule.find({ doctor: docId }, { _id: 0, doctor: 0 });

    const appoint = await Appointment.find(
      { doctor: docId },
      { date: 1, time: 1 }
    );

    const availableSlots = data.reduce((result, dataItem) => {
      const { date, time } = dataItem;

      const existingSlot = result.find((slot) => slot.date === date);
      const appointTimes = appoint
        .filter((appointItem) => appointItem.date === date)
        .map((appointItem) => appointItem.time);

      if (!existingSlot) {
        result.push({
          date,
          time: time.filter((slot) => !appointTimes.includes(slot)),
        });
      } else {
        existingSlot.time = existingSlot.time.filter(
          (slot) => !appointTimes.includes(slot)
        );
      }

      return result;
    }, []);

    const slot = availableSlots.filter(async (el) => {
      if (new Date(el.date) < new Date()) {
        await Schedule.deleteOne({ date: el.date });
      }
      return new Date(el.date) >= new Date();
    });
    res.json(slot);
  } catch (error) {
console.log(error);
  }
}


function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}


const stripeSession = async (req, res, next) => {
  const { doctor, user, doctorName,  issues, fee,  date, time } = req.body;
    const existAppointment = await Appointment.findOne({ doctor: doctor, user:user, date:date,time:time});
    if (existAppointment)
      // return next(createError(409, " Appointment already exist"));
      return res.status(409).json("Appointment already exist")
        const customer = await stripe.customers.create({
      metadata: {
        userId: user._id,
        doctorId: doctor._id,
        date: date,
        time:time,
      },
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Dr.${doctorName}`,
            },
            unit_amount: `${fee * 100}`,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}sucess`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    if (session) {
      const appointment = new Appointment({
        doctor: doctor,
        user: user,
        date: date,
        time: time,
        issues: issues,
        amount: fee,
        createdAt: dateTime,
      });
      await appointment.save();

  
  }else{
  res.json({ message: "No session" });
    
  }
  res.send({ url: session.url });


};


const loadAppointments = async (req, res) => {
  try {
    const id = req.body.data
    const appointments = await Appointment.find({ user: id })
      .populate('doctor')
      .sort({ date: -1, time: 1 });

      
    res.status(200).json(appointments);
  } catch (error) {
    res.json("error");
  }
};



const cancelAppointments=async(req,res)=>{
  try {
    const id=req.body.id
   const data= await Appointment.findByIdAndUpdate(
      { _id: id },
      { $set: { isCancelled: true } }
    );
    res.json(data);
    // res.status(200).json({data:data,message: "cancelled"});

  } catch (error) {
    res.json("error");

  }
}


const prescriptions=async(req,res)=>{
  console.log("prescriptions");
try {
  const id=req.body._id
  const data = await Appointment.find({ user:id }).populate('doctor');
 res.json(data)
} catch (error) {
  console.log(error);
}
}

const rating = async (req, res) => {
  try {
    const data = req.body;
    const ratings = new Review({
      userId: data.userId,
      doctorId: data.docId,
      feedback: data.review,
      rating: data.rating, 
      userName:data.userName
    });

    const datas= await ratings.save();
   res.json(datas)

  } catch (error) {
    console.log(error);
  }
};



const forgotPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const emailData = await User.find({ email: email });

    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp,"otp+++++++++++++++++++++++++++");
      const mailupdated= await User.updateOne({email:email},{$set:{otp:otp}})
      await mailSender(email,otp,"forgotpassword")

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
  findDoctors,
  searchDoc,
  docSchedule,
  setProfilee,
  department,
  stripeSession,
  loadAppointments,
cancelAppointments,
prescriptions,
rating,



  forgotPassword,
  resetPassword,
  
};
