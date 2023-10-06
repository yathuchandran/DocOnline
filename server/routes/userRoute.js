
const express = require ("express") 
const userRoute = express.Router();
const userController = require ("../controllers/userController");
const { validateToken } = require("../middlewares/jwt");
const { authUser } = require("../middlewares/auth.js");
const upload=require("../middlewares/multer.js")
require("dotenv").config();


userRoute.post("/signup", userController.signup);
userRoute.post("/otp", userController.verifyOtp);
userRoute.post("/login", userController.login);
userRoute.get("/forgotPassword/:email",userController.forgotPassword)
userRoute.patch("/verifyOtp",userController.verifyOtp)
userRoute.patch("/resetPassword",userController.resetPassword)
userRoute.get("/departments", userController.department);

userRoute.get("/userData",validateToken,authUser, userController.userData);
userRoute.put("/setProfile",validateToken,authUser,userController.setProfilee)


module.exports = userRoute;
