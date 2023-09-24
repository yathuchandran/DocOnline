const express = require("express");
const doctorRoute = express();
const doctorController = require("../controllers/doctorController");
require("dotenv").config();
const { validateDoctorToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");

doctorRoute.post("/signup", doctorController.signup);
doctorRoute.post("/otp/:token", doctorController.verifyOtp);
doctorRoute.post("/login", doctorController.login);
doctorRoute.get("/forgotPassword/:email",doctorController.forgotPassword)
doctorRoute.patch("/verifyOtp",doctorController.verifyOtpp)





module.exports = doctorRoute;
