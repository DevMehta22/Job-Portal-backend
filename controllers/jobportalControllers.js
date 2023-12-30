const JobSchema = require('../models/jobSchema');
const ApplicationSchema = require('../models/applicationSchema');
const UserSchema = require('../models/userSchema');

const getalljobs = async(req,res)=>{
    try{
        let jobs=await JobSchema.find();
        res.status(200).json({
            success:true,
            count:jobs.length,
            data:jobs
            });
            }catch(err){
                console.log(err);
                res.status(401).json({success:false,msg:"Error in retrieving the job list"});
                }
} 
//get a single job by its id
const getjobabyid = async(req,res)=>{
    try {
        const job= await JobSchema.findById(req.params.id);
        if(!job) 
            return res.status(400).json({success: false, msg:'No job with such an ID'});
        else{
            res.status(200).json(job);
        }
        
    } catch (error) {
        console.log("Error : ", error);
        res.status(500).json({success: false, msg: 'Internal Error'});
    }
}
//create new job
const createJob = async (req,res)=> {
   const {title,company,location,description,skills,status,dateCreated,contact} = req.body;
   //validation
   if (!title || !company ||!location||!skills||!contact){
    return res.status(400).json({success: false,msg: "Please provide all fields."});
   }
   try{
    const userdata = await UserSchema.findById(req.user._id);
        // console.log(data.role);
    if(userdata.role=='recruter'){
        const newJob = new JobSchema({
            title, company, location, description, skills, status, dateCreated, contact
        });
        await newJob.save();
        return res.status(200).json({success: true,data:newJob});
    }
    else{
        return res.status(403).json({sucess:false,msg:"Unauthorized User"});
        }
   }catch(error){
    console.log('Error : ', error);
    return res.status(500).json({success: false, msg: 'Server Error'});
   }
}

const Applicant = async(req,res)=>{
    try{
        const jobexists = await JobSchema.findById(req.params.id);
        if(!jobexists){
            res.status(404).json({message:"Job type not available"});
        }
        else{
            const applicationexists = await ApplicationSchema.findOne({
                applicant: await UserSchema.findById(req.user._id),
                job:await JobSchema.findById(req.params.id)
            })
            if(applicationexists){
                return res.status(409).json({message:"You have already applied for this job!"});
                }else{
                    const userdata = await UserSchema.findById(req.user._id);
                    const jobdata = await JobSchema.findById(req.params.id);
                    console.log(userdata,jobdata)
                    let newApplicant = new ApplicationSchema({applicant:userdata,job:jobdata});
                    const result=await newApplicant.save();
                    res.status(200).json({success:true,message:"succesfully applied!"});
                    }
        }
    }catch(error){
        console.log("Error in applying to a job",error);
        res.status(500).json({success:false,message:"server error"});
    }
}

module.exports = {getalljobs,getjobabyid,createJob,Applicant};


