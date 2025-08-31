<<<<<<< HEAD
import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
export const ShopContext=createContext();
import axios from 'axios'
=======
import { createContext, useEffect, useState } from "react";
import {products} from '../assets/frontend_assets/assets.js';
import { toast } from "react-toastify";
export const ShopContext=createContext();
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c

 const ShopContextProvider=({children})=>{
    const currency="₹";
    const delivery_fee=10;
<<<<<<< HEAD
    const backend_url=import.meta.env.VITE_BACKEND_URL
    const [token,setToken]=useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch,setShowSearch]=useState(false)
    const [products,setProdcuts]=useState([]);
    const [cartItems, setcartItems] = useState([])
    const navigate=useNavigate();
    
    const getProdcuts=async()=>{
        try{
            let res=await axios.get(backend_url+"/api/v1/product/getProducts")
            console.log(res.data.products,'response context')
            if(res.data.success){
                setProdcuts(res.data.products);
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getProdcuts()
    },[]);
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    },[])

=======
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems, setcartItems] = useState([])
    
    
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error("Please select the size")
            return;
        }
<<<<<<< HEAD
=======
        else{
            toast.success('Item added into cart')
        }
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
        //copy the cartItems
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            //if size is already present so increase the size val
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
<<<<<<< HEAD
=======
                console.log('kooo')
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
            }
            else{
                cartItems[itemId]={};
                cartData[itemId][size]=1;
            }
        }//first create obj then add size
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setcartItems(cartData)
<<<<<<< HEAD
        if(token){
            try{
                let res=await axios.post(backend_url+"/api/v1/cart/add",{itemId,size},{headers:{Authorization:`Bearer ${token}`}})
                if(res.data.success){
                    toast.success(res.data.message)
                    console.log(res.data.cartData,'cartdata')
                }else{
                    toast.error(res.data.message)
                }
            }catch(err){
                console.log(err)
            }
    }
}
const getCartCount=()=>{
=======
    }
     const getCartCount=()=>{
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
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
<<<<<<< HEAD
        //console.log(totalCount);
        return totalCount;
    }
 const getCartAmount=()=>{
    let totalAmount=0;
    for(let items in cartItems){
                let productData=products.find((product)=>product._id==items)
        for(let item in cartItems[items]){
            if(cartItems[items][item]>0){
                totalAmount+=cartItems[items][item]*productData.price
            }
        }
    }
    return totalAmount;
 }   
=======
        console.log(totalCount);
        return totalCount;
     }
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
     useEffect(() => {
      getCartCount();
    }, [cartItems])

     const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        console.log(cartData,'cartdata')
        cartData[itemId][size]=quantity;
        setcartItems(cartData);
<<<<<<< HEAD
        if(token){
            try{
                let res=await axios.post(backend_url+"/api/v1/cart/update",{itemId,size,quantity},{headers:{Authorization:`Bearer ${token}`}})
                console.log(res,'res update')
                
            }catch(err){
                console.log(err)
                toast.error(res.data.message)       
            }
        }   
        getCartCount();
     }
    const getUserCart=async(token)=>{
            try{
                let res=await axios.post(backend_url+"/api/v1/cart/getCart",{},{headers:{Authorization:`Bearer ${token}`}})
                console.log(res,'get cart response')
                if(res.data.success){
                    setcartItems(res.data.cartData)
                }
            }catch(err){
                console.log(err)
            }
        
    }

    const value={
        products,currency,delivery_fee,searchQuery,setSearchQuery,
        showSearch,setShowSearch,addToCart,cartItems,setcartItems,getCartCount,
        updateQuantity,navigate,backend_url,token,setToken,getCartAmount
=======
        getCartCount();
     }
    

    const value={
        products,currency,delivery_fee,searchQuery,setSearchQuery,
        showSearch,setShowSearch,addToCart,cartItems,getCartCount,
        updateQuantity
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
    }
    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
    
 }

 export default ShopContextProvider;