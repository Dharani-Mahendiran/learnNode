import JWT from 'jsonwebtoken';
import 'dotenv/config';
import {sendSuccess, sendError} from '../config/utils.js';

export const isAuth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return sendError(res, 'UnAuthorized', 'Invalid Token', 401);
        }
        const token = authHeader.split(' ')[1];
        const verifytoken = JWT.verify(token, process.env.JWT_SECRET);
        if(!verifytoken){
            return sendError(res, 'UnAuthorized Access', null, 401);
        }
        req.user = verifytoken;
        next();
    }catch(error){
        return sendError(res, 'JWT Token verification failed', error.message, 500);
    }
};
