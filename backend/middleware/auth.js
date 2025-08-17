const JWT=require('jsonwebtoken');
require('dotenv').config();
exports.authUser=(req,res,next)=>{
   const token =
        req.headers.authorization?.split(" ")[1] ||
        req.body.token ||
        req.cookies.loginCookie;
    
  if(!token){
    return res.status(401).json({
      success:false,
      message:'No token provided, authorization denied'
    });
  }
  
  try{
    const decoded=JWT.verify(token,process.env.SECRET_KEY);
    // console.log(decoded,'decoded');
    req.user=decoded;
    req.body.userId=decoded.id;
    next();
  }catch(err){
    console.error(err);
    return res.status(401).json({
      success:false,
      message:'Token is not valid'
    });
  }
}
