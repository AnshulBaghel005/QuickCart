const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=()=>{
<<<<<<< HEAD
=======
    console.log(process.env.DATABASE_URL,'hello')
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('DB connected successfully')
    }).catch((err)=>{
        console.log(err);
        console.log('Error in db connection')
    })
}

module.exports=dbConnect;