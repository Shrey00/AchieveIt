import jwt from 'jsonwebtoken';
import User from '../DbModel/model.js';
const authenticate = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]; //returns an array out of which the element with index is having the token i.e after 'Bearer' word in autorization property.
            
            //verify token
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            
            //gets user from token and looks for it in database
            req.decodedUserId = decodedToken;
            req.user = await User.findById(decodedToken.id).select('-password');
            next();
        }catch(err){        
            console.log(err.message);
            res.status(401);
        }
    }

    if(!token){
        res.status(401).json({status:401, error:'Not Authorized'});
    }
}
export default authenticate;