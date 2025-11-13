const express=require('express');
const userRoutes=express.Router();
const {registerUser,loginUser,adminLogin}=require('../controllers/userController')

userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.post('/adminLogin',adminLogin);




module.exports=userRoutes;
