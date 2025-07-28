import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const ReleatedProducts = ({category,subCategory}) => {
    const {products}=useContext(ShopContext);
     const [related, setrelated] = useState([])
     useEffect(()=>{
        if(products.length > 0) {
            
            let relatedProducts = products.filter((product) => category === product.category);
            relatedProducts=relatedProducts.filter((product) => subCategory === product.subCategory);
            setrelated(relatedProducts.slice(0, 5)); 
            //.log(related,'hii')// Get first 4 related products
        }
     },[products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=>(
                    <ProductItems product={item} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default ReleatedProducts