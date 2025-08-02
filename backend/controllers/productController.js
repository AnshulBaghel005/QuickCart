const Product=require('../models/ProductModel')
const cloudinary = require('cloudinary').v2

exports.addProduct=async(req,res)=>{
  try{
    const {name,description,price,category,subCategory,sizes,bestseller}=req.body;
    if(!name||!description||!price||!category||!subCategory||!sizes){
      return res.status(400).json({
        success:false,
        message:'Please fill all fileds'
      })
    }
    const image1=req.files.image1 &&req.files.image1[0];
    const image2=req.files.image2 &&req.files.image2[0];
    const image3=req.files.image3 &&req.files.image3[0];
    const image4=req.files.image4 &&req.files.image4[0];
    
    const images=[image1,image2,image3,image4].filter((item)=> item!==undefined)
    //imageurl
    let imageUrl=await Promise.all(
      images.map(async(img)=>{
        let res=await cloudinary.uploader.upload(img.path,{resource_type:'image'})
        return res.secure_url
      })
    )
    let s=JSON.parse(sizes);
    console.log(s,'jii')
    const prodcutData={
      name,
      description,
      category,
      subCategory,
      price:Number(price),
      sizes:s,
      bestseller:bestseller==="true"? true:false,
      image:imageUrl,
      date:Date.now()
    }

    const product=new Product(prodcutData);
    await product.save();
     console.log(prodcutData)
    return res.status(200).json({
      success:true,
      message:"Product Added "
    })

  }catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:'something went wrong in add prodcut'
    })
  }
}

exports.getProducts=async(req,res)=>{
    try{
      
      const products=await Product.find({});
      return res.status(200).json({
        success:true,
        message:'Products fetch successfully',
        products
      })

  }catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:'something went wrong in add prodcut'
    })
  }
}

exports.removeProduct=async(req,res)=>{
  try{
    
     await Product.findOneAndDelete(req.body.id);
     return res.status(200).json({
      success:true,
      message:"Product removed"
     })

  }catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:'something went wrong in add prodcut'
    })
  }
}

exports.singleProduct=async(req,res)=>{
    try{
      const productId=req.params.id
       if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }
    const product=await Product.findById(productId);
    console.log(product)
    if(!product){
      return res.status(404).json({
        success:false,
        message:'Product not found'
      })
    }
    return res.status(200).json({
        success:true,
        message:'Product fetch successfully',
        product
      })


  }catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:'something went wrong in add prodcut'
    })
  }

}