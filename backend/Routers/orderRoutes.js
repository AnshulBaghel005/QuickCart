const express = require("express");
const { placeOrder,placeOrderStripe,placeOrderRazorpay, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const orderRouter = express.Router();

const {adminAuth}=require('../middleware/adminAuth')
const {authUser}=require('../middleware/auth')
//ADMIN Features
orderRouter.get('/list',adminAuth,getAllOrders)
orderRouter.post('/update-status',adminAuth,updateOrderStatus)

//Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/place-stripe',authUser,placeOrderStripe)
orderRouter.post('/place-razorpay',authUser,placeOrderRazorpay)
//USER Features
orderRouter.get('/user-orders',authUser,getUserOrders)

module.exports=orderRouter