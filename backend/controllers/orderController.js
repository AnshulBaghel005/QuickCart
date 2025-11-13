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
      try{
        const orders=await Order.find().sort({date:-1})
        console.log(orders,'orders')
        return res.status(200).json({
            success:true,
            orders
        })
      }catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in fetching all orders"
        })
      }
}
//USER orders data
exports.userorders=async(req,res)=>{
    try{
        const {userId}=req.body
        if(!userId){
            return res.status(400).json({success:false,message:"UserId is required"})
        }
        const orders=await Order.find({userId}).sort({date:-1})
        return res.status(200).json({
            success:true,
            orders
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Error in fetching user orders"})
    }

}

//update order status by admin
exports.updateOrderStatus=async(req,res)=>{

    try{
        const {orderId,status}=req.body
        if(!orderId || !status){
            return res.status(400).json({success:false,message:"All fields are required"})
        }   
        await Order.findByIdAndUpdate(orderId,{status})
        return res.status(200).json({success:true,message:"Order status updated successfully"})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Error in updating order status"})
    }
}

