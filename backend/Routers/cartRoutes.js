const express=require('express');   
const cartRouter=express.Router();
const {addToCart,updateCart,getUserCart}=require('../controllers/cartController')
const {authUser}=require('../middleware/auth')


cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)
cartRouter.get('/getcart',authUser,getUserCart)


module.exports=cartRouter;