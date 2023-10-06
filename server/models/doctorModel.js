const mongoose = require("mongoose");
const objectid = mongoose.Types.ObjectId
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    // required: true,

  },
  email: {
    type: String,
    // required: true,
  },
  fee: {
    type: Number,
  },
  exp: {
    type: Number,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
  },
  password: {
    type: String,
    // required: true,
  },
  department: {
    type:String,
  },
  education: {
    type: String,
  },
  isApproved:{
    type:String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isRegister: {
    type: Boolean,
    default: false,
  },

  // timeStamp: {
  //   type: String,
  //   required: true,
  // },
  image: {
    type: String,
  },
 
  otp: {
    type: Number,
  },
  token: {
    type: String,
  },
  blockReason:{
    type:String
  },
  liceNum: {
    type: Number,

  },
  availability: {
    type: Number,
  },
  document:{
    type:String
  }
});

module.exports = mongoose.model("doctor", doctorSchema);
