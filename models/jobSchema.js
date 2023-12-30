 const mongoose = require('mongoose');

 const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true},
    location: {type: String},
    description:{type:String,default:" "},
    skills:[{type:String}],
    status:{
        type:String,
        enum:['Pending','Applied','Interviewed'],
        default:'Pending',
        },
    dateCreated:{
            type:Date,
            default: Date.now()
        },
    contact:{
        name:{type:String},
        email:{type:String},
        phone:{type:Number}
    }    
},{timestamps:true})

module.exports = mongoose.model('Job',JobSchema);