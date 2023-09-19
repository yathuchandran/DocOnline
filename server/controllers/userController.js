require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailSender = require("../config/nodeMailer");
const { createTokens } = require("../middlewares/jwt");
const cloudinary = require("cloudinary");
const randomstring = require("randomstring");

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
      console.log("inside else");
      await User.findOneAndUpdate({ $set: { otp: "" } });
      res.status(201).json({ message: "user otp correct" });
    }
    console.log(user, "user 107");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.isVerified === false) {
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
















module.exports = {
  signup,
  verifyOtp,
  login,
  userData,
  setProfilee,
};
