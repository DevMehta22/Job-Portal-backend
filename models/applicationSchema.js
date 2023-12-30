require('dotenv').config();
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    applicant:{
        type:Object,
        required:[true,'Applicant field is required']
    },
    job:{
        type:Object,
        required:[true,'Job field is required']
    }        
})

module.exports = mongoose.model('Application',ApplicationSchema)