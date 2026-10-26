const Product=require('../models/ProductModel')
const cloudinary = require('cloudinary').v2

const logAddProductError=(err,req,stage)=>{
  const requestValues=[
    ...Object.values(req.body||{}),
    ...Object.values(req.files||{}).flat().map(file=>file.originalname),
    req.headers.authorization,
    process.env.DATABASE_URL,
    process.env.SECRET_KEY,
    process.env.ADMIN_PASSWORD,
    process.env.ADMIN_EMAIL,
    process.env.API_KEY,
    process.env.API_SECRET,
  ].filter(value=>typeof value==='string'&&value.length>=4)

  let message=typeof err?.message==='string'?err.message:'Unknown error'
  for(const value of requestValues){
    message=message.split(value).join('[REDACTED]')
  }
  message=message
    .replace(/Bearer\s+[^\s]+/gi,'Bearer [REDACTED]')
    .replace(/mongodb(?:\+srv)?:\/\/[^\s@]+@/gi,'mongodb://[REDACTED]@')

  console.error('[product:add] failed',{
    stage,
    name:err?.name||'Error',
    code:err?.code??err?.http_code,
    message,
  })
}

exports.addProduct=async(req,res)=>{
  let stage='read_request'
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
    stage='cloudinary_upload'
    let imageUrl=await Promise.all(
      images.map(async(img)=>{
        let res=await cloudinary.uploader.upload(img.path,{resource_type:'image'})
        return res.secure_url
      })
    )
    stage='parse_sizes'
    let s=JSON.parse(sizes);
    stage='build_product'
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
    stage='mongo_save'
    await product.save();
    return res.status(200).json({
      success:true,
      message:"Product Added "
    })

  }catch(err){
    logAddProductError(err,req,stage)
    return res.status(500).json({
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
    return res.status(500).json({
        success:false,
        message:'Failed to fetch products'
    })
  }
}

exports.removeProduct=async(req,res)=>{
  try{
      console.log(req.params.id)
     await Product.findByIdAndDelete(req.params.id);
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
