const express=require('express');
const app=express();
const Cors=require('cors');
//middleware
app.use(Cors());
app.use(express.json());
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
//cloudinary
const cloudinary=require('./config/cloudinary');
cloudinary.connectCloudinary();

<<<<<<< HEAD
//db connection
=======
>>>>>>> e57e1f7 (db connection)
const dbConnect=require('./config/database');
dbConnect();

//server start
app.listen(PORT,()=>{
     console.log(`Server Started at port no ${PORT}`);
})