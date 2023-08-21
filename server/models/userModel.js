const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    is_blocked: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        default: ''
    },


});
module.exports = mongoose.model("User", userschema)