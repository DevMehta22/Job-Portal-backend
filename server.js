require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/userRoutes');
const recuiterRoutes = require('./routes/recruiterRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/recruiter',recuiterRoutes);
app.use('/api/applicant',applicantRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to DB');
    const port = process.env.PORT || 3300;
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`server is listening on port:${port}`);
    })
}).catch((err)=>{
    console.log(err);
})


