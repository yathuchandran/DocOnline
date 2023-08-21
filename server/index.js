const express = require("express");
const app = express();

const path = require("path");


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://yatheeshbc8:sanidhya*88@cluster0.sjvvmgl.mongodb.net/ONLINEDOC");
mongoose.set("strictQuery", false);

//mongoose.connect("mongodb+srv://yatheeshbc8:sanidhya*88@cluster0.sjvvmgl.mongodb.net/?retryWrites=true&w=majority");


app.use(express.static(path.join(__dirname, "public"))); //Register your public folder to express in your .js file by

 
//register partial route setup
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))




const PORT=3000 || 4000

app.listen(PORT, function () {
    console.log(`server is running...${PORT}`);
})
