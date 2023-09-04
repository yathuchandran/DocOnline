const express = require("express");
const cors = require('cors'); // Import the cors middleware
const app = express();
const userRoute = require('./routes/userRoute')
const dotenv= require("dotenv")
const path = require("path");
const connectDB = require('./config/config');


//mongoDB connection
connectDB();
//dotenv cofig
dotenv.config()






// app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"))); //Register your public folder to express in your .js file by

const createError = require('http-errors')


// Use the cors middleware to allow requests from localhost:3001
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
      credentials: true, // If you are sending cookies or authentication headers
      // Add the extended option as well
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  

app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, no-store');
    next();
});
 
//register partial route setup
app.use(express.static(__dirname + '/public'));


app.use('/', userRoute)



const PORT=process.env.PORT || 5000

app.listen(PORT, function () {
    console.log(`server is running...${process.env.NODE_MODE} Mode on port ${process.env.PORT}` );
})
