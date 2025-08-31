const express=require('express');
const productRouter=express.Router();
const {addProduct,getProducts,removeProduct,singleProduct}=require('../controllers/productController');
const upload = require('../config/multer');
const {adminAuth}=require('../middleware/adminAuth')

<<<<<<< HEAD

=======
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
//here multer use
const image=[ 
    { name:'image1',maxCount:1},
    { name:'image2',maxCount:1},
    { name:'image3',maxCount:1},
    { name:'image4',maxCount:1},
]
<<<<<<< HEAD
const {authUser}=require('../middleware/auth')
productRouter.post('/add',adminAuth,upload.fields(image),addProduct)
productRouter.get('/getProducts',getProducts)
productRouter.post('/remove/:id',removeProduct)
productRouter.get('/single-product/:id',singleProduct)
=======
productRouter.post('/product/add',adminAuth,upload.fields(image),addProduct)
productRouter.get('/product/getProducts',adminAuth,getProducts)
productRouter.post('/product/remove/:id',removeProduct)
productRouter.get('/product/single-product/:id',singleProduct)
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c


module.exports=productRouter;