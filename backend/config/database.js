const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=async()=>{
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not configured');
    }

    await mongoose.connect(process.env.DATABASE_URL);
    console.log('DB connected successfully');
}

module.exports=dbConnect;
