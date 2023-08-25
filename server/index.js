//import userRoute from './routes/userRoute.js'
//  const mongoose = require('mongoose')
const express = require("express");
const app = express();
const userRoute = require('./routes/userRoute')
const dotenv= require("dotenv")


const path = require("path");

//dotenv cofig
dotenv.config()






// app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"))); //Register your public folder to express in your .js file by

const createError = require('http-errors')




app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, no-store');
    next();
});
 
//register partial route setup
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
const connectDB = require('./config/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//mongoDB connection
connectDB();

app.use('/', userRoute)



const PORT=process.env.PORT || 3000

app.listen(PORT, function () {
    console.log(`server is running...${process.env.NODE_MODE} Mode on port ${process.env.PORT}` );
})
