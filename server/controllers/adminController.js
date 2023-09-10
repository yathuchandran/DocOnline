const Admin = require("../models/adminModel");
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




  module.exports = {
    login,
  }