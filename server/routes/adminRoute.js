const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");
require("dotenv").config();

adminRoute.post("/login", adminController.login);





module.exports = adminRoute;
