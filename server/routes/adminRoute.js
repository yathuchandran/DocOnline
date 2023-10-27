const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");
require("dotenv").config();

adminRoute.post("/login", adminController.login);
adminRoute.get("/patients",validateAdminToken, adminController.patientsss);
adminRoute.get("/doctors",validateAdminToken, adminController.Doctors);

adminRoute.put("/managePatient/:patientId",validateAdminToken, adminController.managePatients);
adminRoute.put("/manageDoctor/:docId",validateAdminToken, adminController.manageDoctor);
adminRoute.put("/blockDoctor/:docId",validateAdminToken, adminController.blockDoctor);


adminRoute.get("/departments",validateAdminToken, adminController.departments);
adminRoute.post("/createDepartment",validateAdminToken,adminController.createDepartment);
adminRoute.patch("/manageDepartment",validateAdminToken,adminController.manageDepartment);
adminRoute.get("/dash",validateAdminToken,adminController.dash);



module.exports = adminRoute;
