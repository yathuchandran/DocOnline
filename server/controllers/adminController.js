const Admin = require("../models/adminModel");
const Patients = require("../models/userModel");
const User = require("../models/userModel");
const Departments = require("../models/department");
const cloudinary = require("cloudinary");
const Doctor = require("../models/doctorModel");

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
      if (password === adminData.password) {
        // Direct password comparison
        console.log(password, adminData.password, "passwordMatch21");
        if (!adminData.isBlocked) {
          const token = createAdminTokens(adminData._id);
          console.log(token, "token==25");
          res
            .status(200)
            .json({ token, name: adminData.name, email: adminData.email });
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
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
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

const Doctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors); // Send status 200 (OK) and the JSON data
  } catch (error) {
    console.error("Error in fetching doctors:", error);
    res.status(500).json({ error: "Internal server error" }); // Send a 500 (Internal Server Error) status and an error JSON object
  }
};

const managePatients = async (req, res) => {
  console.log("managePatient70");
  try {
    const { isUserBlocked } = req.body;
    const id = req.params.patientId;
    console.log(id, "ID 75");
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


const manageDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const { isDocBlocked, isDocVerify } = req.body;
    const id = req.params.docId;

    if (isDocVerify === false) {
      const verify = await Doctor.findOneAndUpdate(
        { _id: id },
        { $set: { isVerified: true } }
      );
      res.json("Verified");
      return; 
    } else {
      const doctor = await Doctor.findOneAndUpdate(
        { _id: id },
        { $set: { isVerified: false } }
      );
      res.json("Verify Reject");
    }

    
  } catch (error) {
    console.error(error);
    res.json("error");
  }
};


const blockDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const { isDocBlocked } = req.body;
    const id = req.params.docId;

    if (isDocBlocked === false) {
      const doctor = await Doctor.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      );
      res.json("blocked");
      console.log("blocked------------148");
    } else {
      const doctor = await Doctor.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
      res.json("unblocked");
    }
  } catch (error) {
    console.error(error);
    res.json("error");
  }
};




const departments = async (req, res) => {
  const data = await Departments.find();
  res.status(200).json(data);
};

const deleteImageFromDisk = (imagePath) => {
  fs.unlink(imagePath, (error) => {
    if (error) {
      console.error("Failed to delete image from disk:", error);
    } else {
      console.log("Image deleted from disk:", imagePath);
    }
  });
};

const createDepartment = async (req, res) => {
  try {
    const { newDep, image } = req.body;

    const exist = await Departments.findOne({ name: newDep });

    if (exist) {
      return res.json({ message: "Department already exists" });
    }

    const result = await cloudinary.v2.uploader.upload(image);

    const dep = new Departments({
      name: newDep,
      image: result.secure_url, // Use secure_url for HTTPS image link
    });

    const depData = await dep.save();

    res.json({ message: "Department created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An error occurred" });
  }
};

const manageDepartment = async (req, res) => {
  const { id, status } = req.body;
  try {
    let update;
    if (status === false) {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      );
      if (!update) {
        return res.status(404).json({ message: "Department not found" });
      }
      return res.json({ message: "Department blocked" });
    } else if (status === true) {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
      if (!update) {
        return res.status(404).json({ message: "Department not found" });
      }
      return res.json({ message: "Department unblocked" });
    } else {
      return res.status(400).json({ message: "Invalid status value" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  login,
  adminData,
  patientsss,
  manageDoctor,
  blockDoctor,
  Doctors,
  managePatients,
  departments,
  createDepartment,
  manageDepartment,
};
