
const User = require('../models/userModel.js');
exports.addToCart = async (req, res) => {
    try{
        const{userId,itemId,size}=req.body
        console.log(itemId,size,'itemId,size')
        const userData=await User.findById(userId);
        if(!userData){  
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }   
        let cartData = await userData.cartData || {};
        console.log(cartData,'cartData')
        console.log('cartData item',cartData[itemId])
        if(cartData[itemId]){
            if(!cartData[itemId][size]){
            cartData[itemId][size] = 1; // Initialize quantity to 1 if size doesn't exist
        } else {
            cartData[itemId][size] += 1; // Increment quantity by 1 if size exists
        }
        } 
        else{
            cartData[itemId] = {}; // Initialize the item if it doesn't exist
            cartData[itemId][size] = 1; // Set the quantity for the size to 1
        }          
           
         await User.findByIdAndUpdate(userId, { cartData }, { new: true });      
        
        res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
            cartData
        }); 
    }catch(err){
        console.log(err)
            res.status(500).json({  
        success: false, 
        message: 'Server error while adding to a cart'            
   })
    }
}
exports.updateCart = async (req, res) => {
    try{
        const{userId,itemId,size,quantity}=req.body
        const userData=await User.findById(userId);
        if(!userData){  
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }
        let cartData = await userData.cartData || {};
        cartData[itemId][size]=quantity

        await User.findByIdAndUpdate(userId, { cartData }, { new: true });
        console.log(userData,'userdata')
        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cartData
        });
    }catch(err){
        console.log(err)
          res.status(500).json({
      success: false,   
        message: 'Server error while updating to a cart'            
   })
    }

}
exports.getUserCart = async (req, res) => { 
    try{
        const userId = req.body.userId;
        const userData = await User.findById(userId);
        console.log(userData,'userData')
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const cartData = userData.cartData || {};
        res.status(200).json({
            success: true,
            cartData
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching cart data'
        });
    }
}



