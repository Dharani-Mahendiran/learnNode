import express from 'express';
const router = express.Router();
import {registerUser, loginUser, updateProfile, deleteProfile, reactivateProfile} from '../controllers/user.controller.js';



router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);
router.patch('/reactivate/:id', reactivateProfile);


export default router;