const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createAdminTokens } = require("../middlewares/jwt");


const login = async (req, res) => {
  console.log("login");
  try {
    console.log(1);
    const { email, password } = req.body;
    console.log(req.body,"req.body  12");
    const adminData = await Admin.findOne({ email:email }); // Use findOne instead of find
    console.log(adminData, "adminData 14.fn");
    if (adminData) {
      const passwordMatch = await bcrypt.compare(password, adminData.password);
      if (passwordMatch) {
        if (!adminData.isBlocked) {
          const token = createAdminTokens(adminData._id);
          res.json({ adminData, token });
        } else {
          res.json("blocked");
        }
      } else {
        res.json("unauthorized");
      }
    } else {
      res.json("unauthorized");
    }
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json("error"); // Return a 500 Internal Server Error status code
  }
};













  module.exports = {
    login,
  }