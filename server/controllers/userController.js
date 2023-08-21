const User = require("../model/userModel");
const bcrypt = require('bcrypt');




const securePassword = async (password) => {
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
}

// LOAD REGISTERATION---------------------------------------------------------------
const loadRegister = async (req, res) => {
    try {
        res.render('users/registration')
    } catch (error) {
        console.log(error.message);
    }

}
// USER INSERT (ADDING)--------
const insertUser = async (req, res) => {
    try {
      console.log(128);
        const name = req.body.name
        const email = req.body.email
        console.log('name is ',name, 'email is ', email)
        userRegData = req.body
        console.log(132, email);
        const existUser = await User.findOne({ email: email })

        if (existUser == null) {
          console.log('verify email send cheyyunnathinu munne')
            await sendVerifyMail(name, email)
            res.redirect('/otpverification')

        }
        else {
            if (existUser.email == email) {
                res.render('users/registration', { message1: 'User Alredy Exist' })
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }
}









module.exports = {
    loadRegister,
    insertUser,
    // verifyMail,
    // loginLoad,
    // verifyLogin,
    // loadHome,
}