const express= require('express');
const {getalljobs,getjobabyid,Applicant} = require('../controllers/jobportalControllers');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');

router.get('/',getalljobs);
router.get('/:id',getjobabyid);
router.post('/apply/:id',authmiddleware,Applicant);

module.exports= router;



