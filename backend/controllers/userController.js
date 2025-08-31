const User=require('../models/userModel')
const validator = require("email-validator");
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
require('dotenv').config();
<<<<<<< HEAD

const cookieParser = require('cookie-parser')
exports.registerUser=async(req,res)=>{
    try{
        //console.log(process.env.SECRET_KEY,"hiii")
=======
const cookieParser = require('cookie-parser')
exports.registerUser=async(req,res)=>{
    try{
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
        const {name,email,password}=req.body;
        if(!name||!email||!password){
             return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
        }
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({
            success:false,
            message:'User already registered'
        })
        }
        if(!validator.validate(email)){
             return res.status(400).json({
            success:false,
            message:'Email is invaild'
        })
        }

        if(password.length<6){
             return res.status(400).json({
            success:false,
            message:'Password is weak please make strong password'
        })
        }

        let hashPassword=await bcrypt.hash(password,10);

        await User.create({name,email,password:hashPassword})
        
         return res.status(200).json({
            success:true,
            message:'User register successfully'
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'something went wrong in registertion'
        })
    }
}

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        if(!validator.validate(email)){
             return res.status(400).json({
            success:false,
            message:'Email is invaild'
        })
        }
        const userData=await User.findOne({email})
        if(!userData){
            return res.status(400).json({
                success:false,
                message:'User does not exists'
            })
        }
        let checkPassword=await bcrypt.compare(password,userData.password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:'Incorrect Password'
            })
        }

        const payload={
            email:userData.email,
            id:userData._id,
        }

<<<<<<< HEAD
        let token=await JWT.sign(payload,process.env.SECRET_KEY,{expiresIn:'300h'})
=======
        let token=await JWT.sign(payload,process.env.SECRET_KEY,{expiresIn:'2h'})
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
        userData.password=undefined
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        return res.cookie('loginCookie',token,options).status(200).json({
            success:true,
            message:'User login successfully',
            token
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'something went wrong in login'
        })
        
    }
}

exports.adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
<<<<<<< HEAD
        console.log(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD,'hiiiiii')
=======
        console.log(email,password)
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })
        }
        const payload = { email }; 
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
<<<<<<< HEAD
        let token=await JWT.sign(payload,process.env.SECRET_KEY);
=======
        let token=JWT.sign(payload,process.env.SECRET_KEY);
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
        return res.status(200).json({
            success:true,
            message:"admin login",
            token
        })

    }
    else{
            return res.status(400).json({
                success:false,
                message:"Please provide correct email & password"
            })
        }
       
    }catch(err){
        console.log(err);
    }
}
