const mongoose = require('mongoose');
const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,            
        ref:'User',
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true

    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:Boolean,
        required:true,
        default:"false"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Order",orderSchema);