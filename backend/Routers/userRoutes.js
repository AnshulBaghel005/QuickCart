const express=require('express');
const router=express.Router();
const {registerUser,loginUser,adminLogin}=require('../controllers/userController')
<<<<<<< HEAD

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/adminLogin',adminLogin);
=======
const {adminAuth}=require('../middleware/adminAuth')

router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.post('/user/adminLogin',adminLogin);
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c



module.exports=router;
