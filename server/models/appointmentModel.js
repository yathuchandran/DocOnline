const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"doctor",
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  issues:{
    type:String
  },
  amount: {
    type: Number,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
  isCancelled:{
    type:Boolean,
    default:false
  },
  medicines:{
    type:Object
  }

});

module.exports = mongoose.model("appointment", appointmentSchema);
