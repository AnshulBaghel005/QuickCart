 const Order=require('../models/orderModel')
 const User=require('../models/userModel')
//placing orders using COD Methods

exports. placeOrder=async(req,res)=>{
   try{ 
    const {userId,items,amount,address}=req.body;
    if(!userId || !items || items.length==0 || !amount || !address){
        return res.status(400).json({success:false,message:"All fields are required"})
    }
    const order=new Order({
        userId,items,amount,address,
        paymentMethod:"COD",    
        paymentStatus:false,
        date:Date.now()
    })
    await order.save();
    await User.findByIdAndUpdate(userId,{cartData:{}}) 
    return res.status(200).json({success:true,message:"Order placed successfully"})
   }catch(err){
    console.log(err)
    return res.status(500).json({success:false,message:"Error in placing order"})
   }
}
//placing orders using Stripe Methods
exports. placeOrderStripe=async(req,res)=>{

}

exports. placeOrderRazorpay=async(req,res)=>{

}
//All orders data for admin panel
exports.getAllOrders=async(req,res)=>{

}
//USER orders data
exports.getUserOrders=async(req,res)=>{
}

//update order status by admin
exports.updateOrderStatus=async(req,res)=>{
}

