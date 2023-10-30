
const express = require ("express") 
const userRoute = express.Router();
const userController = require ("../controllers/userController");
const { validateToken } = require("../middlewares/jwt");
const { authUser } = require("../middlewares/auth.js");
const upload=require("../middlewares/multer.js")
require("dotenv").config();


userRoute.post("/signup", userController.signup);
userRoute.post("/otp", userController.verifyOtp);
userRoute.post("/login",(()=>console.log("user login")), userController.login);
userRoute.get("/forgotPassword/:email",userController.forgotPassword)
userRoute.patch("/verifyOtp",userController.verifyOtp)
userRoute.patch("/resetPassword",userController.resetPassword)
userRoute.get("/departments", userController.department);
userRoute.get("/findDoctors", userController.findDoctors);

userRoute.get("/userData",validateToken,authUser, userController.userData);
userRoute.put("/setProfile",validateToken,authUser,userController.setProfilee)
userRoute.get("/searchDoc/:searchKey",userController.searchDoc)
userRoute.get("/docSchedule/:docId", validateToken,authUser, userController.docSchedule);
userRoute.post('/create-checkout-session',validateToken,authUser, userController.stripeSession);
userRoute.post("/appointments", validateToken,authUser, userController.loadAppointments);
userRoute.post("/cancelAppoint", validateToken,authUser, userController.cancelAppointments);
userRoute.post("/priscriptions",validateToken,authUser,userController.prescriptions)
userRoute.post("/rating" ,validateToken,authUser,userController.rating)


// userRoute.post('/webhook',express.raw({type:'application/json'}),userController.webhooks);


// userRoute.get("/appointments",validateToken,authUser,userController.loadAppointments)


module.exports = userRoute;
