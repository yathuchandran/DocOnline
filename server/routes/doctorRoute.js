const express = require("express");
const doctorRoute = express();
const doctorController = require("../controllers/doctorController");
require("dotenv").config();
const { validateDoctorToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");

console.log("heelloo docRoute");
doctorRoute.post("/signup", doctorController.signup);
doctorRoute.post("/otp/:token", doctorController.verifyOtp);
doctorRoute.post("/login", doctorController.login);





module.exports = doctorRoute;
