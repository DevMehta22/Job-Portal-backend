require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send({msg: 'Authorization denied!'});
        }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        }catch(err){
            console.log(err);
            res.status(403).send({msg:'Invalid Token'});
        };
}

module.exports = authMiddleware;