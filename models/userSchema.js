const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String, requird: true },
    password: {
        type: String,
        required: true,
        minlength: [8, "minimun 8 characters required"],
    },
    role:{
        type:String,
        required:true,
        enum:[ 'applicant','recruter']
    },
    
},{timestamps:true});


module.exports = mongoose.model('user',UserSchema); 

