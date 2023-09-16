const Admin = require("../models/adminModel");
const Patients = require("../models/userModel");
const User = require("../models/userModel");


const bcrypt = require("bcrypt");
require("dotenv").config();
const { createAdminTokens } = require("../middlewares/jwt");


const login = async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body;
    console.log(req.body, "req.body 12");

    const adminData = await Admin.findOne({ email: email });
    
    console.log(adminData, "adminData =15");

    if (adminData) {
      if (password === adminData.password) { // Direct password comparison
        console.log(password, adminData.password, "passwordMatch21");
        if (!adminData.isBlocked) {
          const token = createAdminTokens(adminData._id);
          console.log(token, "token==25");
          res.status(200).json({ token, name: adminData.name, email: adminData.email });
        } else {
          res.status(403).json({ error: "Your access has been blocked." });
        }
      } else {
        res.status(401).json({ error: "Invalid email or password." });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

const adminData = async (req, res) => {
  console.log("adminData===40");
  try {
    const data = await Admin.findOne({ _id: req._id.id });
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};




const patientsss = async (req, res) => {
  console.log("patients controll");
  try {
    const patients = await Patients.find();
    console.log(patients, "patients 59");
    res.status(200).json(patients); // Send status 200 (OK) and the JSON data
  } catch (error) {
    console.error("Error in fetching patients:", error);
    res.status(500).json({ error: "Internal server error" }); // Send a 500 (Internal Server Error) status and an error JSON object
  }
};


const managePatients = async (req, res) => {
  console.log("managePatient70");
  try {
    const { isUserBlocked } = req.body;
    console.log(isUserBlocked,"isuserBlocked");
    const id = req.params.patientId;
    console.log(id,"ID 75");
    if (isUserBlocked == false) {

      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      );
      res.json("blocked");
      console.log("blocked");
    } else {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
      res.json("unblocked");
    }
  } catch (error) {
    res.json("error");
  }
};





  module.exports = {
    login,
    adminData,
    patientsss,
    managePatients,
  }