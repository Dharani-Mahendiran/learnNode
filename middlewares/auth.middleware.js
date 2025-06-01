import JWT from 'jsonwebtoken';
import 'dotenv/config';

export const isAuth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:`Invalid Token`});
        }
        const token = authHeader.split(' ')[1];
        const verifytoken = JWT.verify(token, process.env.JWT_SECRET);
        if(!verifytoken){
            return res.status(401).json({message:`Unauthorized Access`});
        }
        req.user = verifytoken;
        next();
    }catch(error){
        return res.status(500).json({message:`JWT Token verification failed ${error.message}`});
    }
};
