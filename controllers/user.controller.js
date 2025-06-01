import models from '../models/main.model.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const salt_rounds = Number(process.env.SALT_ROUNDS) || 10;

export const registerUser = async(req, res) => {
    try{
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);
        const user = await new models.User({
            name : req.body.name,
            email: req.body.email,
            country_code:req.body.country_code,
            mobile_number:req.body.mobile_number,
            dob:req.body.dob,
            password:hashedPassword
        }).save();
        return res.status(201).json({message:'User Registered Successfully', user});
    }catch(error){
        return res.status(500).json({message : `RegisterUser failed: ${error.message}`});
    }
};

export const loginUser = async(req, res) => {
    try{
        const {email, country_code, mobile_number, password} = req.body;
        if(!email){
            if((!country_code || !mobile_number)){
                return res.status(400).json({message: 'Email or country code with mobile number is required'});	
            }
        }else if(!password){
            return res.status(400).json({message: 'Password is required'});
        }

        let user;
        if(email){
            user = await models.User.findOne({email});
        }else if(country_code && mobile_number){
            user = await models.User.findOne({country_code, mobile_number});
        }

        if(!user){
              return res.status(404).json({message: 'User not found with the given credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid password'});
        }

        // Generate jwt token
        const payload = {
            id: user.id
        }

        const token = JWT.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn : process.env.JWT_EXPIRY || '1d'}
        )
        
        const userInfo = await userData(user.id);
        const userResponse = {...userInfo, token};
        return res.status(200).json({message: 'User logged in successfully', user:userResponse});
    }catch(error){
        return res.status(500).json({message: `User login failed ${error.message}`});
    }
};


export const updateProfile = async(req, res) => {
    try{
       const updatedData = {...req.body};
       updatedData.password = await bcrypt.hash(updatedData.password, salt_rounds);
       const updateUser =  await models.User.findOneAndUpdate({_id:req.params.id, is_active:true}, updatedData, {new:true});
       if(!updateUser){
        return res.status(400).json({message: `User not found with the given id: ${req.params.id}`});
       }
       const user = await userData(updateUser.id);
       return res.status(200).json({message: `User profile updated successfully`, user});
    }catch(error){
        return res.status(500).json({message: `User profile update failed ${error.message}`});
    }
}


export const deleteProfile = async(req, res) => {
    try{
        const deleteUser = await models.User.findOneAndUpdate(
            {_id: req.params.id,is_active:true}, 
            {is_active:false}, 
            {new:true}
        );

        if(!deleteUser){
            return res.status(404).json({message: `User not found with id ${req.params.id}`});
        }
        const user = await userData(deleteUser.id);
        return res.status(200).json({message: `User profile deleted successfully`, user});
    }catch(error){
        return res.status(500).json({message: `User profile deletion failed ${error.message}`});
    }
}

export const reactivateProfile = async (req, res) => {
    try{
        const reactivateUser = await models.User.findOneAndUpdate(
            {_id:req.params.id, is_active:false},
            {is_active:true},
            {new:true}
        )
        if(!reactivateUser){
            return res.status(404).json({message: `User not found with id ${req.params.id}`});
        }
        const user = await userData(reactivateUser.id);
        return res.status(200).json({message: `User profile reactivated successfully`, user});
    }catch(error){
        return res.status(500).json({message: `User profile reactivation failed ${error.message}`});
    }
}

export const getCurrentUser = async (req, res) => {
    try{
        const user = await userData(req.user.id);
        if(!user){
            return res.status(404).json({message: `User not found with id ${req.user.id}`});
        }
        console.log('user', user);
        return res.status(200).json({message: `Current user data`, user}); 
      }catch(error){
        return res.status(500).json({message: `Get current user failed ${error.message}`})
    }
}

export const userData = async(id) => {
    try{
        const userDoc = await models.User.findById(id);
        if(!userDoc) return null;
        const user = {
            id: userDoc.id,
            name: userDoc.name,
            email: userDoc.email,
            country_code: userDoc.country_code,
            mobile_number: userDoc.mobile_number,
            dob: userDoc.dob,
            created_at: userDoc.createdAt
        }
        return user;
    }catch(error){
        return error;
    }
}