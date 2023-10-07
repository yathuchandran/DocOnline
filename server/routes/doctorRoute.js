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
doctorRoute.patch("/resetPassword",doctorController.resetPassword)


doctorRoute.post("/registration",validateDoctorToken,doctorController.registration);
doctorRoute.get("/department",validateDoctorToken,doctorController.deptList);
doctorRoute.post("/setprofile",validateDoctorToken,doctorController.setProfile);
doctorRoute.get('/schedule',validateDoctorToken,doctorController.schedule)
doctorRoute.post('/setSchedule',validateDoctorToken,doctorController.manageSchedule)









module.exports = doctorRoute;
