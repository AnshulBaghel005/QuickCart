const express=require('express');
const router=express.Router();
const {registerUser,loginUser,adminLogin}=require('../controllers/userController')
const {adminAuth}=require('../middleware/adminAuth')

router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.post('/user/adminLogin',adminLogin);



module.exports=router;
