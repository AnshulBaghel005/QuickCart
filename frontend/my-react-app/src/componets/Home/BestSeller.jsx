import React, {useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { products } from '../../assets/frontend_assets/assets'
import Title from '../Title'
import ProductItems from '../ProductItems'

const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [items, setItems] = useState([])
    useEffect(() => {
        let productArray=products.filter((item)=> item.bestseller==true)
      setItems(productArray.slice(0,5));
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'Best'} text2={'Seller'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
             best seller line
            </p>
        </div>

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

export default BestSeller