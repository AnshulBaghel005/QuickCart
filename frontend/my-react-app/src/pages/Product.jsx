import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import assets from '../assets/frontend_assets/assets';
import ReleatedProducts from '../componets/ReleatedProducts';

const Product = () => {
  const{productId}=useParams();
  const {products,currency,cartItems,addToCart}=useContext(ShopContext);
  console.log(cartItems)
  const [productData, setproductData] = useState(null);
  const [image,setImage]=useState('');
  const [size,setSize]=useState('');
  const getProductData=()=>{
    const foundProduct = products.find(item => item._id === productId);
      if(foundProduct){
        setproductData(foundProduct)
        setImage(foundProduct.image[0])
      }
   
  }
  useEffect(()=>{
    getProductData();
  },[productData,products,productId]);
  
  return productData? (
    <div className='border-t pt-10 transition-opacity duration-500 ease-in-out'>
      {/* product data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>
        {/* products image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-auto-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Product ${index + 1}`} 
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover cursor-pointer' 
                onClick={() => setImage(image)} 
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
           <img 
           className='w-full h-auto object-cover'
           src={image} alt="" />
          </div>
        </div>
        {/* products info */}
        <div className='flex-1'>
           <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
           </h1>
           <div className='flex items-center gap-1 mt-2'>
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_icon} alt="" />
            <img className='w-3' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
           </div>
           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
           <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
             {
              productData.sizes.map((s,index)=>(
                <button key={index} 
                onClick={()=>setSize(s)}
                className={`border px-4 py-2 rounded-md hover:bg-gray-100 ${s===size ? "border-orange-500" : "border-gray-300" } transition-colors duration-200`}
                >{s}</button>
              ))
             }
            </div>
           </div>
           <button 
           onClick={()=>addToCart(productData._id,size)}
           className='bg-black uppercase text-white px-8 py-3 text-sm active:bg-gray-700'>Add to cart</button>
            <hr className='mt-8 sm:w-4/5'  />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is avilable on this product.</p>
              <p>Easy return and exchange policy withing 7days.</p>
            </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-4 py-2  hover:bg-gray-100 transition-colors duration-200`'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex  flex-col gap-4 border mt px-6 py-6 text-sm text-gray-500'>
          <p>Discover a seamless and enjoyable shopping experience at [YourStoreName], where quality meets convenience. Whether you're looking for the latest fashion trends, top tech gadgets, home essentials, or unique gifts  we’ve got everything you need, all in one place.</p>
          <p>.....</p>
        </div>

      </div>
      <ReleatedProducts category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ):(<div className='opacity-0'></div>)
}

export default Product