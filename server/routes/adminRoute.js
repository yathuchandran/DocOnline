const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");
require("dotenv").config();

adminRoute.post("/login", adminController.login);
//adminRoute.get("/adminData", validateAdminToken,(()=>{console.log("admindata route")}), adminController.adminData);
adminRoute.get("/patients",validateAdminToken, adminController.patientsss);
adminRoute.put("/managePatient/:patientId",validateAdminToken, adminController.managePatients);
adminRoute.get("/departments", adminController.departments);

module.exports = adminRoute;
