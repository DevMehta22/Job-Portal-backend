const express= require('express');
const {getalljobs,getjobabyid,createJob} = require('../controllers/jobportalControllers');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');

router.get('/',getalljobs);
router.get('/:id',getjobabyid);
router.post('/add',authmiddleware,createJob);

module.exports= router;



