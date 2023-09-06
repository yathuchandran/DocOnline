const express = require("express");
const doctorRoute = express();
const doctorController = require("../controllers/doctorController");
require("dotenv").config();
const { validateDoctorToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");


doctorRoute.post("/signup", doctorController.signup);
doctorRoute.post("/otp", doctorController.verifyOtp);
