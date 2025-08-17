import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import Title from '../Title';

const CartTotal = () => {
    const {currency,getCartAmount,delivery_fee}=useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className='mt-10 flex flex-col gap-4 text-sm sm:text-base'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr />
        <div className='flex justify-between font-semibold text-lg'>
         <b>Total</b>
         <b>{currency} {getCartAmount()===0?0:getCartAmount()+delivery_fee}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
