import express from 'express';
const router= express.Router();
import { authUser,
    registerUser,
    logoutrUser,
    getUserProfile,
    updateUserProfile ,
    applyLoan} from '../controllers/userController.js';


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutrUser);
router.post('/applyloan/:id', applyLoan);
router.route('/profile/:id').get(getUserProfile).put(updateUserProfile)


export default router;