const express=require('express');
const app=express();
const Cors=require('cors');
const mongoose=require('mongoose');
//middleware
app.use(Cors());
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/',(_req,res)=>{
     const connected=mongoose.connection.readyState===1;
     res.status(connected?200:503).json({
          success:connected,
          status:connected?'ok':'database_unavailable'
     });
});
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

//cloudinary
const cloudinary=require('./config/cloudinary');
cloudinary.connectCloudinary();

const dbConnect=require('./config/database');

// Start accepting requests only after MongoDB is ready.
const startServer=async()=>{
     try{
          await dbConnect();
          app.listen(PORT,()=>{
               console.log(`Server Started at port no ${PORT}`);
          });
     }catch(err){
          console.error('Database connection failed. Check DATABASE_URL and MongoDB network access.',err.name,err.code||'');
          process.exit(1);
     }
}

startServer();
