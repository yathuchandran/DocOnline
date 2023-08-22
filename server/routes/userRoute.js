
const express = require ("express") 
const user_route = express.Router();

const session = require("express-session")
const auth =require("../middlewares/auth")
const userController = require ("../controllers/userController");
user_route.use(session({secret: "mysecret",resave: false,saveUninitialized: false }));// or true, depending on your needs


//REGISTRATION------
user_route.get('/register',userController.loadRegister);
user_route.post('/register',userController.insertUser);
user_route.get('/verify',userController.verifyMail);

user_route.get('/otpverification', userController.loadverifyotp)
user_route.post('/otpverification',userController.verifyotp)



//LOGIN------------------
user_route.get('/login',userController.loginLoad);
user_route.post('/login',userController.verifyLogin);
user_route.get('/logout',auth.isLogin,userController.userLogout);


module.exports = user_route;
