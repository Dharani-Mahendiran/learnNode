import express from 'express';
const router = express.Router();
import {registerUser, loginUser, updateProfile, deleteProfile, reactivateProfile, getCurrentUser} from '../controllers/user.controller.js';
import {isAuth} from '../middlewares/auth.middleware.js';


router.post('/register', registerUser);
router.post('/login', loginUser);

// Apply middleware for below routes
router.use(isAuth);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);
router.patch('/reactivate/:id', reactivateProfile);
router.get('/', getCurrentUser);


export default router;