import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'

const ProductItems = ({product}) => {
    let {_id, image, name, price} =product;
    const {currency}=useContext(ShopContext)
  return (
    <NavLink to={`/product/${_id}`} className='text-gray-700 hover:text-gray-900 transition-all duration-300 cursor-pointer'>
       <div className='overflow-hidden'>
        <img 
         className='hover:scale-110 transition-all  ease-in-out'
         src={image[0]} alt="" 
         />
       </div>
       <p className='pt-3 pb-1 text-sm'>{name}</p>
       <p className='text-sm font-medium'>{currency}{price}</p>
    </NavLink>
  )
}

export default ProductItems