const express=require('express');
const app=express();
const Cors=require('cors');
//middleware
app.use(Cors());
app.use(express.json());
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//port
require('dotenv').config();
const PORT=process.env.PORT||4000;
//routes 
const userRoutes=require('./Routers/userRoutes')
app.use('/api/v1/user',userRoutes);

const productRoutes=require('./Routers/productRoutes');
app.use('/api/v1/product',productRoutes)
const cartRoutes=require('./Routers/cartRoutes');
app.use('/api/v1/cart',cartRoutes)

const orderRoutes=require('./Routers/orderRoutes');
app.use('/api/v1/order',orderRoutes)


=======
//port
require('dotenv').config();
const PORT=process.env.PORT||4000;
//routes
const userRoutes=require('./Routers/userRoutes')
app.use('/api/v1',userRoutes);

const productRoutes=require('./Routers/productRoutes');
app.use('/api/v1',productRoutes)
app.use('/',(req,res)=>{
    res.send('api working')
})
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
//cloudinary
const cloudinary=require('./config/cloudinary');
cloudinary.connectCloudinary();

const dbConnect=require('./config/database');
dbConnect();

//server start
app.listen(PORT,()=>{
     console.log(`Server Started at port no ${PORT}`);
})