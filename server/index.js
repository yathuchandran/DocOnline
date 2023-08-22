//import userRoute from './routes/userRoute.js'
 const mongoose = require('mongoose')
const express = require("express");
const app = express();
const userRoute = require('./routes/userRoute')



const path = require("path");



mongoose.connect("mongodb+srv://yatheeshbc8:tDRpoZqglS7GfVVp@cluster0.sjvvmgl.mongodb.net/?retryWrites=true&w=majority");
mongoose.set("strictQuery", false);



// app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"))); //Register your public folder to express in your .js file by

const createError = require('http-errors')


//view engine setup
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, no-store');
    next();
});
 
//register partial route setup
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))




app.use('/', userRoute)



const PORT=3000 || 4000

app.listen(PORT, function () {
    console.log(`server is running...${PORT}`);
})
