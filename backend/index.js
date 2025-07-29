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
const routes=require('./Routes/allRoutes');
app.use('/api/v1',routes);

app.use('/',(req,res)=>{
    res.send('api working')
})
//db connection
const dbConnect=require('./config/database');
dbConnect();

//server start
app.listen(PORT,()=>{
     console.log(`Server Started at port no ${PORT}`);
})