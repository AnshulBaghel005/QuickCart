const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        image:{
            type:[String],
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
        subCategory:{
            type:String,
            required:true,
        },
        sizes:{
            type:[],
            required:true,
        },
        bestseller:{
            type:Boolean,
        },
        date:{
            type:Date,
        },

    })

module.exports=mongoose.model('Prodcut',ProductSchema)