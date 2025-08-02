const express=require('express');
const productRouter=express.Router();
const {addProduct,getProducts,removeProduct,singleProduct}=require('../controllers/productController');
const upload = require('../config/multer');
const {adminAuth}=require('../middleware/adminAuth')

//here multer use
const image=[ 
    { name:'image1',maxCount:1},
    { name:'image2',maxCount:1},
    { name:'image3',maxCount:1},
    { name:'image4',maxCount:1},
]
productRouter.post('/product/add',adminAuth,upload.fields(image),addProduct)
productRouter.get('/product/showAllProducts',adminAuth,getProducts)
productRouter.post('/product/removeProduct',removeProduct)
productRouter.get('/product/single-product/:id',singleProduct)


module.exports=productRouter;