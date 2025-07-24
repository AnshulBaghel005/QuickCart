import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import Title from '../Title';
import ProductItems from '../ProductItems';

const LatestCollections = () => {
    const {products } = useContext(ShopContext);
    const [items, setItems] = useState([])
    useEffect(() => {
      setItems(products.slice(0,10));
    },[])
    
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title  text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
             product line
            </p>
        </div>

        {/* Redering products */}
        <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            items.map((item,index)=>{
             return  <ProductItems key={index} product={item}/>
            })
          }
        </div>
         
    </div>
  )
}

export default LatestCollections