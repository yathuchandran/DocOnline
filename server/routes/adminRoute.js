const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");
require("dotenv").config();


adminRoute.post("/login", adminController.login);
//adminRoute.get("/adminData", validateAdminToken,(()=>{console.log("admindata route")}), adminController.adminData);
adminRoute.get("/patients", adminController.patientsss);






module.exports = adminRoute;
