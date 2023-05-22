import express from 'express'; 
import {UserController,userlogin, changeUserPassword } from '../controllers/UserController.js';
import checkUserAuth from '../middlewares/auth-middlewares.js';



const router=express.Router();


router.use('/changepassword',checkUserAuth);


//Public Routes

router.post('/register',UserController)
router.post('/login',userlogin);

//Private Routes
router.post('/changepassword',changeUserPassword);




export default router;