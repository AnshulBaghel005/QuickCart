import { createContext, useEffect, useState } from "react";
import {products} from '../assets/frontend_assets/assets.js';
import { toast } from "react-toastify";
export const ShopContext=createContext();

 const ShopContextProvider=({children})=>{
    const currency="₹";
    const delivery_fee=10;
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems, setcartItems] = useState([])
    console.log(cartItems,'jii')
    const addToCart=(itemId,size)=>{
        if(!size){
            toast.error("Please select the size")
        }
        else{
            toast.success('Item added into cart')
        }
        //copy the cartItems
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            //if size is already present so increase the size val
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }//first create obj then add size
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setcartItems(cartData)
    }
     const getCartCount=()=>{
        let totalCount=0;
        for(let items in cartItems){
            for(let item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=1;
                    }
                } catch(err){
                    console.log(err)
                }
            }
        }
        console.log(totalCount);
        return totalCount;
     }
    

    const value={
        products,currency,delivery_fee,searchQuery,setSearchQuery,
        showSearch,setShowSearch,addToCart,cartItems,getCartCount
    }
    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
    
 }

 export default ShopContextProvider;