
const express = require ("express") 
const userRoute = express.Router();
const userController = require ("../controllers/userController");
const { validateToken } = require("../middlewares/jwt");
const { authUser } = require("../middlewares/auth.js");
const upload=require("../middlewares/multer")
require("dotenv").config();


userRoute.post("/signup", userController.signup);
userRoute.post("/otp", userController.verifyOtp);
userRoute.post("/login", userController.login);
userRoute.get("/userData", validateToken,authUser, userController.userData);
userRoute.post("/setProfile",userController.setProfile)


module.exports = userRoute;
