const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createAdminTokens } = require("../middlewares/jwt");



const login = async (req, res) => {
    console.log("login");
    try {
      console.log(1);
      const { email, password } = req.body;
      console.log();
      const adminData = await Admin.findOne({ email: email });
      console.log(adminData,"adminData 14.fn");
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
      }else {
        res.json("unauthorized");
    }
  } catch (error) {
    res.json("error");
  }
  }










  module.exports = {
    login,
  }