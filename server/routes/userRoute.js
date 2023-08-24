
const express = require ("express") 
const userRoute = express.Router();
const userController = require ("../controllers/userController");
const { validateToken } = require("../middlewares/jwt");
const { authUser } = require("../middlewares/auth.js");
require("dotenv").config();



userRoute.post("/signup", userController.signup);
userRoute.post("/verify/:token", userController.verify);
userRoute.post("/login", userController.login);







// //REGISTRATION------
// user_route.get('/register',userController.loadRegister);
// user_route.post('/register',userController.insertUser);
// user_route.get('/verify',userController.verifyMail);

// user_route.get('/otpverification', userController.loadverifyotp)
// user_route.post('/otpverification',userController.verifyotp)



// //LOGIN------------------
// user_route.get('/login',userController.loginLoad);
// user_route.post('/login',userController.verifyLogin);
// user_route.get('/logout',auth.isLogin,userController.userLogout);


module.exports = userRoute;
